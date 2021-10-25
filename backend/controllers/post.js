// Imports
const models = require('../models')
const fs = require('fs')

// CREATE
exports.createPost = async (req, res) => {
  try {
    // Paramètres de l'image
    let imageUrl = req.file
    if (imageUrl) {
      imageUrl = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`
    } else {
      imageUrl = null
    }
    // Récupération de l'utilisateur
    const userId = res.locals.decodedToken.userId
    await models.User.findOne({
      where: { id: userId },
    })
    // Envoie du post a la Db
    models.Post.create({
      message: req.body.message,
      image: imageUrl,
      UserId: userId,
    })
    return res
      .status(201)
      .json({ message: 'Votre publication a bien été créé !' })
  } catch (error) {
    res.status(404).json({ error: 'Création de la publication impossible' })
    console.log(error)
  }
}

// GET
exports.getAllPosts = async (req, res) => {
  try {
    // Recherche des post
    const posts = await models.Post.findAll({
      order: [['updatedAt', 'DESC']],
      include: [
        // Recherche des utilisateurs
        {
          model: await models.User,
          attributes: ['firstName', 'lastName', 'id', 'photo'],
        },
      ],
    })
    return res.status(200).send(posts)
  } catch (error) {
    return res.status(500).send({
      error: "Impossible d'afficher les publications",
    })
  }
}

// GET
exports.getOnePost = async (req, res) => {
  try {
    // Recherche des post
    const post = await models.Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        // Recherche des utilisateurs
        {
          model: await models.User,
          attributes: ['firstName', 'lastName', 'id', 'photo'],
        },
      ],
    })
    console.log(post)
    return res.status(200).send(post)
  } catch (error) {
    return res.status(500).send({
      error: "Impossible d'afficher les publications",
    })
  }
}

// UPDATE
exports.updatePost = async (req, res) => {
  try {
    const userId = res.locals.decodedToken.userId
    const post = await models.Post.findOne({
      where: {
        id: req.params.id,
      },
    })
    let imageUrl = req.file
    if (imageUrl) {
      imageUrl = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`
    } else {
      imageUrl = post.image
    }
    if (userId === post.userId || userId.admin === true) {
      await models.Post.update(
        {
          message: req.body.message ? req.body.message : post.message,
          image: imageUrl,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      return res.status(200).send({ message: 'Modifications enrigistrés' })
    } else {
      return res
        .status(400)
        .json({ message: 'Vous ne pouvez pas modifier ce post' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}

// DELETE
exports.deletePost = async (req, res) => {
  // Recherche de l'utilisateur
  const userId = await res.locals.decodedToken.userId
  // Recherche du post
  const post = await models.Post.findOne({
    where: {
      id: req.params.id,
    },
  })
  // Condition de suppression du post (User ou Admin)
  if (userId === post.userId || userId === 1) {
    if (post.image) {
      const filename = post.image.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        models.Comment.destroy({
          where: {
            PostId: req.params.id,
          },
        }),
          models.Post.destroy({
            where: {
              id: req.params.id,
            },
          })
      })
      return res.status(200).json({ message: 'Post supprimé !' })
    } else {
      models.Comment.destroy({
        where: {
          PostId: req.params.id,
        },
      }),
        models.Post.destroy({
          where: {
            id: req.params.id,
          },
        })
      return res.status(200).json({ message: 'Post supprimé !' })
    }
  } else {
    return res
      .status(400)
      .json({ message: 'Vous ne pouvez pas supprimer ce post' })
  }
}
