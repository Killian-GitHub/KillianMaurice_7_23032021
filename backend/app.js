// Imports >
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const apiRouter = require('./routes/route').router

// App express
const app = express()

// Plugin
app.use(bodyParser.urlencoded({ extended: true })) // parse des objets inclus dans d'autres
app.use(bodyParser.json())
app.use(helmet())

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

// Router
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/', apiRouter)

module.exports = app
