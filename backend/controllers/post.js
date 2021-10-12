// Imports >
const models = require('../models')
const fs = require('fs')

// - - -  CREATE - - - //
exports.createPost = async (req, res) => {
  try {
    // Vérification du contenu
    const content = req.body.message
    if (content == null || content == '') {
      return res
        .status(400)
        .json({ error: "Votre publication n'a pas de contenu" })
    }
    if (content.length <= 3) {
      return res.status(400).json({
        error: 'Le contenu du message doit contenir au moins 3 caractères',
      })
    }
    // Paramètres de l'image
    let imageUrl
    if (req.body.image) {
      imageUrl = `${req.protocol}://${req.get('host')}/images/${req.body.image}`
    } else {
      imageUrl = null
    }
    // Récupération de l'utilisateur
    const userId = req.body.decodedToken.userId
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

// - - - GET - - - //
exports.getAllPosts = async (req, res) => {
  try {
    // Recherche des post
    const posts = await models.Post.findAll({
      order: [['createdAt', 'DESC']],
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

// // - - - UPDATE - - - //
// exports.updatePost = (req, res) => {
//   try {
//     let newImageUrl
//     const userId = req.body.decodedToken.userId
//     let post = models.Post.findOne({ where: { id: req.params.id } })
//     if (userId === post.userId) {
//       if (req.file) {
//         newImageUrl = `${req.protocol}://${req.get('host')}/images/${
//           req.file.filename
//         }`
//         if (post.imageUrl) {
//           const filename = post.imageUrl.split('/images')[1]
//           fs.unlink(`images/${filename}`, (err) => {
//             if (err) console.log(err)
//             else {
//               console.log(`Suppression du fichier: images/${filename}`)
//             }
//           })
//         }
//       }
//       if (req.body.message) {
//         post.message = req.body.message
//       }
//       post.imageUrl = newImageUrl
//       const newPost = post.save({
//         fields: ['message', 'firstName', 'lastName', 'imageUrl'],
//       })
//       res
//         .status(200)
//         .json({ newPost: newPost, message: 'Votre publication est modifiée' })
//     } else {
//       res
//         .status(400)
//         .json({ message: 'Vous ne pouvez pas modifié cette publication' })
//     }
//   } catch (error) {
//     return res.status(500).send({ error: 'Erreur serveur' })
//   }
// }

// - - - DELETE - - - //
exports.deletePost = async (req, res) => {
  // Recherche de l'utilisateur
  const userId = await req.body.decodedToken.userId
  // Recherche du post
  const post = await models.Post.findOne({
    where: {
      id: req.params.id,
    },
  })
  // Condition de suppression du post (User ou Admin)
  if (userId === post.userId || userId.admin === true) {
    models.Comment.destroy({
      where: {
        PostId: req.params.id,
      },
    })
    models.Post.destroy({
      where: {
        id: req.params.id,
      },
    })
    return res.status(200).json({ message: 'Post supprimé !' })
  } else {
    return res
      .status(400)
      .json({ message: 'Vous ne pouvez pas supprimer ce post' })
  }
}
