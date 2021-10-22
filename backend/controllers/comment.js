// Import
const models = require('../models')

// CREATE
exports.addComment = async (req, res) => {
  try {
    // Recherche de l'utilisateur
    const userId = res.locals.decodedToken.userId
    await models.User.findOne({
      where: { id: userId },
    })
    // Envoie du commentaire
    models.Comment.create({
      PostId: req.params.id,
      UserId: userId,
      message: req.body.message,
    })
    return res
      .status(201)
      .json({ message: 'Votre commentaire a bien été créé !' })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

// GET
exports.getComment = async (req, res) => {
  try {
    // Recherche des commentaires
    const comments = await models.Comment.findAll({
      order: [['createdAt', 'DESC']],
      // Recherche des utilisateurs
      include: [
        {
          model: await models.User,
          attributes: ['firstName', 'lastName', 'id', 'photo'],
        },
      ],
    })
    return res.status(200).json({ comments })
  } catch (error) {
    return res.status(500).json({
      error: "Impossible d'afficher les commentaires",
    })
  }
}

// DELETE
exports.deleteComment = async (req, res) => {
  // Recherche de l' utilisateur
  const userId = await res.locals.decodedToken.userId
  // Recherche du commentaire
  const comment = await models.Comment.findOne({
    where: {
      id: req.params.id,
    },
  })
  // Condition de suppression (User ou Admin)
  if (userId === comment.userId || userId.admin === true) {
    models.Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
    return res.status(200).json({ message: 'Commentaire supprimé !' })
  } else {
    return res
      .status(400)
      .json({ message: 'Vous ne pouvez pas supprimer ce Commentaire' })
  }
}
