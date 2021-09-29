const jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = process.env.AUTH_TOKEN

module.exports = {
  generateTokenForUser: function (userData) {
    // création d'un token utilisateur
    return jwt.sign(
      {
        userId: userData.id,
        admin: userData.admin,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '2h',
      }
    )
  },
  parseAuthorization: function (authorization) {
    // récupération du token utilisateur
    return authorization != null ? authorization.replace('Bearer', '') : null
  },
  getUserId: function (authorization) {
    const userId = -1 // valeur par défaut pour éviter les requètes sur des objets inexistant
    const token = module.exports.parseAuthorization(authorization)
    if (token != null) {
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
        if (jwtToken != null) userId = jwtToken.userId
      } catch (err) {}
    }
    return userId
  },
}
