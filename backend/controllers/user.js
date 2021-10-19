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
          id: user.id,
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
      where: {
        id: userId,
      },
    })
    return res.status(200).send(user)
  } catch (error) {
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}

// - - - UPDATE - - - //
exports.updateAccount = async (req, res) => {
  try {
    const userId = req.body.decodedToken.userId
    const user = await models.User.findOne({
      where: {
        id: userId,
      },
    })
    await models.User.update(
      {
        firstName: req.body.firstName ? req.body.firstName : user.firstName,
        lastName: req.body.lastName ? req.body.lastName : user.lastName,
        email: req.body.email ? req.body.email : user.email,
      },
      {
        where: {
          id: userId,
        },
      }
    )
    return res.status(200).send({ message: 'Modifications enrigistrés' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}

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
