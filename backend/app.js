const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const userRoutes = require('./routes/users')
const postsRoutes = require('./routes/posts')

const app = express()

app.use(bodyParser.json())
app.use(helmet())
app.use(cors())

const { sequelize } = require('./config/sequelize')

const dbTest = async function () {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
dbTest()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use('/api/users', userRoutes)
app.use('/api/posts', postsRoutes)

module.exports = app
