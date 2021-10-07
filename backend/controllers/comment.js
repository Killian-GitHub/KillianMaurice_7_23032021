const models = require('../models')

// CREATE COMMENT //
exports.addComment = async (req, res) => {
  try {
    const content = req.body.message
    // Permet de vérifier que tous les champs sont complétés
    if (content == null || content == '') {
      return res
        .status(400)
        .json({ error: "Votre commentaire n'a pas de contenu" })
    }
    // Permet de contrôler la longueur du titre et du contenu du message
    if (content.length <= 3) {
      return res.status(400).json({
        error: 'Le contenu du commentaire doit contenir au moins 3 caractères',
      })
    }
    const userId = req.body.decodedToken.userId
    await models.User.findOne({
      where: { id: userId },
    })
    models.Comment.create({
      message: req.body.message,
      UserId: userId,
      postId: req.params.id,
    })
    res.status(201).json({ message: 'Votre message a bien été créé !' })
  } catch {
    res.status(404).json({ error: 'Erreur serveur' })
  }
}

// GET COMMENT //
exports.getComment = async (req, res) => {
  await models.Comment.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: await models.User,
        attributes: ['firstName', 'lastName', 'photo'],
      },
    ],
  })
    .then(function (comments) {
      if (comments) {
        res.status(200).send(comments)
      } else {
        res.status(404).json({ error: 'Pas de commentaires trouvé' })
      }
    })
    .catch(function (err) {
      console.log(err)
      res.status(500).send({ error: 'Une erreur est survenue' })
    })
}
// DELETE COMMENT //
exports.deleteComment = (req, res) => {
  try {
    const userId = req.body.decodedToken.userId
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
