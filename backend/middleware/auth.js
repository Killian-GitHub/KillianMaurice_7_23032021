const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN)
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      throw 'ID utilisateur invalide'
    } else {
      res.locals.decodedToken = decodedToken
      next()
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête invalide'),
    })
  }
}
