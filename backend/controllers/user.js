// Imports >
const bcrypt = require('bcrypt')
const fs = require('fs')
const emailValidator = require('email-validator')
const passwordValidator = require('password-validator')
const models = require('../models')
const jwtUtils = require('../middleware/auth')

// Password schema config >
const passwordSchema = new passwordValidator()
passwordSchema
  .is()
  .min(8)
  .has()
  .not()
  .spaces()
  .has()
  .uppercase()
  .has()
  .lowercase()

// SIGNUP //
exports.signup = (req, res) => {
  try {
    const user = models.User.findOne({
      where: { email: req.body.email },
    })
    if (user !== null) {
      if (user.email === req.body.email) {
        return res.status(400).json({ error: 'Cet utilisateur existe déjà' })
      }
    } else {
      if (emailValidator.validate(req.body.email)) {
        if (passwordSchema.validate(req.body.password)) {
          const hash = bcrypt.hash(req.body.password, 10)
          const newUser = models.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            admin: false,
          })
          const tokenObject = jwtUtils.generateTokenForUser(newUser)
          res.status(201).send({
            userId: newUser,
            token: tokenObject,
            message: 'Votre utilisateur à bien été enregistré',
          })
        }
      }
    }
  } catch (error) {
    return res.status(400).send({ error: 'Utilisateur introuvable' })
  }
}

// LOGIN //
exports.login = (req, res) => {
  try {
    const user = models.User.findOne({
      where: { email: req.body.email },
    }) // Recherche de l'adresse email dans la DB
    if (!user) {
      return res.status(403).send({ error: 'La connexion à échouée' })
    } else {
      const hash = bcrypt.compare(req.body.password, user.password) //Comparaison des mots de passe
      if (!hash) {
        return res.status(401).send({ error: 'Mot de passe incorrect !' })
      } else {
        const tokenObject = jwtUtils.generateTokenForUser(user)
        res.status(200).send({
          // Récupération du token utilisateur
          userId: user,
          token: tokenObject.jwtUtils,
        })
      }
    }
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}

// GET ACCOUNT //
exports.getAccount = (req, res) => {
  try {
    const user = models.User.findOne({
      // Recherche de l'uilisateur
      where: { id: req.params.id },
    })
    res.status(200).send(user)
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}

// UPDATE //
exports.updateAccount = (req, res) => {
  const id = req.params.id
  try {
    const userId = jwtUtils.getUserId(req)
    let newPhoto
    let user = models.User.findOne({ where: { id: id } }) // Recherche de l'utilisateur
    if (userId === user.id) {
      if (req.file && user.photo) {
        newPhoto = `${req.protocol}://${req.get('host')}/api/upload/${
          req.file.filename
        }`
        const filename = user.photo.split('/upload')[1]
        fs.unlink(`upload/${filename}`, (err) => {
          // Suppression de l'ancienne photo
          if (err) console.log(err)
          else {
            console.log(`Deleted file: upload/${filename}`)
          }
        })
      } else if (req.file) {
        newPhoto = `${req.protocol}://${req.get('host')}/api/upload/${
          req.file.filename
        }`
      }
      if (newPhoto) {
        user.photo = newPhoto
      }
      const newUser = user.save({ fields: 'photo' }) // Sauvegarde de la modification
      res.status(200).json({
        user: newUser,
        message: 'Vous avez modifié votre photo de profile',
      })
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}

// DELETE //
exports.deleteAccount = (req, res) => {
  try {
    const id = req.params.id
    const user = models.User.findOne({ where: { id: id } })
    if (user.photo !== null) {
      const filename = user.photo.split('/upload')[1]
      fs.unlink(`upload/${filename}`, () => {
        // Suppression de la photo du compte
        models.User.destroy({ where: { id: id } })
        res.status(200).json({ message: 'Utilisateur supprimé' })
      })
    } else {
      models.User.destroy({ where: { id: id } }) // Suppression du compte
      res.status(200).json({ message: 'Utilisateur supprimé' })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}
