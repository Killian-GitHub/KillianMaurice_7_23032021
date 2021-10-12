// Imports >
const bcrypt = require('bcrypt')
const models = require('../models')
const jwt = require('jsonwebtoken')

// - - - SIGNUP - - - //
exports.signup = async (req, res) => {
  try {
    // Vérification email existant
    const userEmail = req.body.email
    const user = await models.User.findOne({
      where: { email: userEmail },
    })
    if (user !== null) {
      return res.status(400).json({ error: 'Cet utilisateur existe déjà' })
    } else {
      // Hashage et création de l'utilisateur
      const hash = await bcrypt.hash(req.body.password, 10)
      await models.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        photo: req.body.photo,
      })
      return res.status(201).json({ message: 'Utilisateur créé !' })
    }
  } catch (error) {
    return res.status(400).json({ error: error })
  }
}

// - - - LOGIN - - - //
exports.login = async (req, res) => {
  try {
    // Recherche du mail
    const user = await models.User.findOne({
      where: { email: req.body.email },
    })
    // Utilisateur non trouvé
    if (!user) {
      return res
        .status(401)
        .json({ error: 'Nous ne trouvons pas cet utilisateur' })
    } else {
      // Comparaison des mots de passe
      const hash = await bcrypt.compare(req.body.password, user.password)
      if (!hash) {
        return res.status(401).send({ error: 'Mot de passe incorrect !' })
      } else {
        // Envoie du token et connexion
        const userToken = jwt.sign(
          { userId: user.id },
          process.env.AUTH_TOKEN,
          {
            expiresIn: '2H',
          }
        )
        res.status(200).send({
          photo: user.photo,
          userToken,
        })
      }
    }
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

// - - - GET - - - //
exports.getAccount = async (req, res) => {
  try {
    const userId = req.body.decodedToken.userId
    const user = await models.User.findOne({
      where: { id: userId },
    })
    res.status(200).send(user)
  } catch (error) {
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}

// // - - - UPDATE - - - //
// exports.updateAccount = async (req, res) => {
//   try {
//     const userId = req.body.decodedToken.userId
//     let newPhoto
//     const user = await models.User.findOne({ where: { id: req.params.id } }) // Recherche de l'utilisateur
//     if (userId === user.id) {
//       if (req.file && user.photo) {
//         newPhoto = `${req.protocol}://${req.get('host')}/api/upload/${
//           req.file.filename
//         }`
//         const filename = user.photo.split('/upload')[1]
//         fs.unlink(`upload/${filename}`, (err) => {
//           // Suppression de l'ancienne photo
//           if (err) console.log(err)
//           else {
//             console.log(`Deleted file: upload/${filename}`)
//           }
//         })
//       } else if (req.file) {
//         newPhoto = `${req.protocol}://${req.get('host')}/api/upload/${
//           req.file.filename
//         }`
//       }
//       if (newPhoto) {
//         user.photo = newPhoto
//       }
//       const newUser = user.save({ fields: 'photo' }) // Sauvegarde de la modification
//       res.status(200).json({
//         user: newUser,
//         message: 'Vous avez modifié votre photo de profile',
//       })
//     } else {
//       res.status(400).json({ message: "Vous n'avez pas les droits requis" })
//     }
//   } catch (error) {
//     return res.status(500).send({ error: 'Erreur serveur' })
//   }
// }

// - - - DELETE - - - //
exports.deleteAccount = async (req, res) => {
  // Recherche de l'utilisateur
  const userId = req.body.decodedToken.userId
  try {
    const user = await models.User.findOne({
      where: {
        id: userId,
      },
    })
    if (!user) {
      return res.status(400).json({ error: error })
    } else {
      models.User.destroy({
        where: {
          id: userId,
        },
      })
      models.Post.destroy({
        where: {
          userId: userId,
        },
      })
      models.Comment.destroy({
        where: {
          userId: userId,
        },
      })
      return res.status(200).json({ message: 'Ce compte a bien été supprimé' })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}
