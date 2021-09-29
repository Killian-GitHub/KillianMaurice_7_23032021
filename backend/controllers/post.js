// Imports >
const jwtToken = require('../middleware/auth')
const models = require('../models')
const fs = require('fs')

// CREATE //
exports.createPost = (req, res) => {
  const userId = jwtToken.getUserId(req)
  let imageUrl
  try {
    const user = models.User.findOne({
      attributes: ['firstName', 'lastName', 'id', 'photo'],
      where: { id: userId },
    })
    if (user !== null) {
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`
      } else {
        imageUrl = null
      }
      const post = models.Post.create({
        include: [
          {
            model: models.User,
            attributes: ['firstName', , 'lastName', 'photo', 'id'],
          },
        ],
        message: req.body.message,
        image: imageUrl,
        userId: user.id,
      })
      res
        .status(201)
        .json({ post: post, message: 'Votre publication est ajouté' })
    } else {
      res.status(400).send({ error: 'La publication à échoué' })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}

// GET ALL POSTS //
exports.getAllPosts = (req, res) => {
  try {
    const posts = models.Post.findAll({
      attributes: ['id', 'message', 'image', 'createdAt'],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: models.User,
          attributes: ['firstName', 'lastName', 'id', 'photo'],
        },
        {
          model: models.Comment,
          attributes: ['message', 'firstName', 'lastName', 'userId', 'id'],
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: models.User,
              attributes: ['photo', 'firstName', 'lastName'],
            },
          ],
        },
      ],
    })
    res.status(200).send(posts)
  } catch (error) {
    return res.status(500).send({
      error: "Impossible d'afficher les publications",
    })
  }
}

// GET ONE POST //
exports.getOnePost = (req, res) => {
  try {
    const post = models.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: models.User,
          attributes: ['firstName', 'lastName', 'photo', 'id'],
        },
        {
          model: models.Comment,
          order: [['createdAt', 'DESC']],
          attributes: ['message', 'firstName', 'lastName', 'userId'],
          include: [
            {
              model: models.User,
              attributes: ['photo', 'firstName', 'lastName'],
            },
          ],
        },
      ],
    })
    res.status(200).json(post)
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}

// UPDATE //
exports.updatePost = (req, res) => {
  try {
    let newImageUrl
    const userId = jwtToken.getUserId(req)
    let post = models.Post.findOne({ where: { id: req.params.id } })
    if (userId === post.userId) {
      if (req.file) {
        newImageUrl = `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`
        if (post.imageUrl) {
          const filename = post.imageUrl.split('/images')[1]
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err)
            else {
              console.log(`Suppression du fichier: images/${filename}`)
            }
          })
        }
      }
      if (req.body.message) {
        post.message = req.body.message
      }
      post.imageUrl = newImageUrl
      const newPost = post.save({
        fields: ['message', 'firstName', 'lastName', 'imageUrl'],
      })
      res
        .status(200)
        .json({ newPost: newPost, message: 'Votre publication est modifiée' })
    } else {
      res
        .status(400)
        .json({ message: 'Vous ne pouvez pas modifié cette publication' })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}

// DELETE //
exports.deletePost = (req, res) => {
  try {
    const userId = jwtToken.getUserId(req)
    const IsAdmin = models.User.findOne({ where: { id: userId } })
    const post = models.Post.findOne({ where: { id: req.params.id } })
    if (userId === post.userId || IsAdmin.admin === true) {
      if (post.imageUrl) {
        // ------------------------------------------------------- IMAGE OU IMAGEURL ? //
        const filename = post.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          models.Post.destroy({ where: { id: post.id } })
          res.status(200).json({ message: 'Publication supprimée' })
        })
      } else {
        models.Post.destroy({ where: { id: post.id } }, { truncate: true })
        res.status(200).json({ message: 'Publiccation supprimée' })
      }
    } else {
      res
        .status(400)
        .json({ message: 'Vous ne pouvez pas supprimer cette publication' })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}

// ADD COMMENT //
exports.addComment = (req, res) => {
  try {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const message = req.body.message
    const newComment = models.Comment.create({
      firstName: firstName,
      lastName: lastName,
      message: message,
      userId: jwtToken.getUserId(req),
      postId: req.params.id,
    })

    res
      .status(201)
      .json({ newComment, message: 'Votre commentaire est publié' })
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}

// DELETE COMMENT //
exports.deleteComment = (req, res) => {
  try {
    const userId = jwtToken.getUserId(req)
    const isAdmin = models.User.findOne({ where: { id: userId } })
    const comment = models.Comment.findOne({
      where: { id: req.params.id },
    })

    if (userId === comment.userId || isAdmin.admin === true) {
      models.Comment.destroy(
        { where: { id: req.params.id } },
        { truncate: true }
      )
      res.status(200).json({ message: 'Ce commentaire est supprimé' })
    } else {
      res
        .status(400)
        .json({ message: 'Vous ne pouvez pas supprimer ce commentaire' })
    }
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' })
  }
}
