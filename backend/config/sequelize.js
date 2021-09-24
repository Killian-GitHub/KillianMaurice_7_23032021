const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: 'localhost',
  }
)

// sequelize
// try {
//   sequelize.authenticate()
//   console.log('Connecté à la base de données MySQL!')
// } catch (error) {
//   console.error('Impossible de se connecter, erreur suivante :', error)
// }

module.export = sequelize
