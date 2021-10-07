// Imports >
const jwtToken = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const models = require('../models')
// const jwtCheck = require('../utils/jwt')
const fs = require('fs')

// CREATE POST //
exports.createPost = async (req, res) => {
  try {
    const content = req.body.message
    // Permet de vérifier que tous les champs sont complétés
    if (content == null || content == '') {
      return res
        .status(400)
        .json({ error: "Votre publication n'a pas de contenu" })
    }
    // Permet de contrôler la longueur du titre et du contenu du message
    if (content.length <= 3) {
      return res.status(400).json({
        error: 'Le contenu du message doit contenir au moins 3 caractères',
      })
    }
    const userId = req.body.decodedToken.userId
    await models.User.findOne({
      where: { id: userId },
    })
    models.Post.create({
      message: req.body.message,
      image: req.body.image
        ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        : req.body.image,
      UserId: userId,
    })
    res.status(201).json({ message: 'Votre message a bien été créé !' })
  } catch {
    res.status(404).json({ error: 'Erreur serveur' })
  }
}

// GET ALL POSTS //
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await models.Post.findAll({
      attributes: ['id', 'message', 'image', 'createdAt'],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: await models.User,
          attributes: ['firstName', 'lastName', 'id', 'photo'],
        },
        // {
        //   model: await models.Comment,
        //   attributes: ['message', 'userId'],
        //   order: [['createdAt', 'DESC']],
        //   include: [
        //     {
        //       model: await models.User,
        //       attributes: ['photo', 'firstName', 'lastName'],
        //     },
        //   ],
        // },
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
    const userId = req.body.decodedToken.userId
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
