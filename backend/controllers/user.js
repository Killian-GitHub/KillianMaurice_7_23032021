// Imports >
const bcrypt = require('bcrypt')
const fs = require('fs')
const emailValidator = require('email-validator')
const passwordValidator = require('password-validator')
const models = require('../models')
// const jwtUtils = require('../utils/jwt')
const jwt = require('jsonwebtoken')

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
exports.signup = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { email: req.body.email },
    })
    if (user !== null) {
      return res.status(400).json({ error: 'Cet utilisateur existe déjà' })
    } else {
      if (emailValidator.validate(req.body.email)) {
        if (passwordSchema.validate(req.body.password)) {
          const hash = await bcrypt.hash(req.body.password, 10)
          const newUser = await models.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
          })
          const userToken = jwt.sign(
            { userId: newUser.id },
            process.env.AUTH_TOKEN,
            {
              expiresIn: '2H',
            }
          )
          res.status(201).send({
            userId: newUser,
            userToken,
          })
        } else {
          return res.status(400).json({ error: 'Mot de passe invalide' })
        }
      } else {
        return res.status(400).json({ error: 'Adresse mail invalide' })
      }
    }
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

// LOGIN //
exports.login = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { email: req.body.email },
    }) // Recherche de l'adresse email dans la DB
    if (!user) {
      return res.status(403).send({ error: 'La connexion à échouée' })
    } else {
      const hash = await bcrypt.compare(req.body.password, user.password) //Comparaison des mots de passe
      if (!hash) {
        return res.status(401).send({ error: 'Mot de passe incorrect !' })
      } else {
        const userToken = jwt.sign(
          { userId: user.id },
          process.env.AUTH_TOKEN,
          {
            expiresIn: '2H',
          }
        )
        res.status(200).send({
          // Récupération du token utilisateur
          userId: user.id,
          userToken,
        })
      }
    }
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

// GET ACCOUNT //
exports.getAccount = async (req, res) => {
  try {
    const user = await models.User.findOne({
      // Recherche de l'uilisateur
      where: { id: req.params.id },
    })
    res.status(200).send(user)
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}

// UPDATE //
exports.updateAccount = async (req, res) => {
  const id = req.params.id
  try {
    const userId = jwtUtils.getUserId(req)
    let newPhoto
    const user = await models.User.findOne({ where: { id: id } }) // Recherche de l'utilisateur
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
exports.deleteAccount = async (req, res) => {
  // Comment récupré le id utilisateur ? + ajouté l'admin //
  try {
    const user = await models.User.findOne({ where: { id: req.params.id } })
    if (!user) {
      return res.status(400).json({ error: error })
    } else {
      models.User.destroy({ where: { id: req.params.id } })
      models.Post.destroy({ where: { id: req.params.id } })
      models.Comment.destroy({ where: { id: req.params.id } })
      res.status(200).json({ message: 'Ce compte a bien été supprimé' })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}
