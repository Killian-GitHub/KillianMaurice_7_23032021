// Imports >
const express = require('express')
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user')
const postCtrl = require('../controllers/post')
const commentCtrl = require('../controllers/comment')
const multer = require('../middleware/multer-config')

// Routes >
exports.router = (function () {
  const apiRouter = express.Router()

  // - - - USERS ROUTES - - - //

  // signup >
  apiRouter.post('/users/signup/', userCtrl.signup)
  // login >
  apiRouter.post('/users/login/', userCtrl.login)
  // getAccount >
  apiRouter.get('/users/account/', auth, userCtrl.getAccount)
  // updateProfile >
  apiRouter.put('/users/account/modify/', auth, multer, userCtrl.updateAccount)
  // deleteAccount >
  apiRouter.delete('/users/account/delete/', auth, userCtrl.deleteAccount)

  // - - - POSTS ROUTES - - - //

  // new post >
  apiRouter.post('/posts/', auth, multer, postCtrl.createPost)
  // get all post >
  apiRouter.get('/posts/', auth, postCtrl.getAllPosts)
  // get one post >
  apiRouter.get('/posts/:id', auth, postCtrl.getOnePost)
  // update post >
  apiRouter.put('/posts/:id/', auth, multer, postCtrl.updatePost)
  // delete post >
  apiRouter.delete('/posts/:id/', auth, postCtrl.deletePost)

  // - - - COMMENTS ROUTES - - - //

  // add comment >
  apiRouter.post('/comments/:id', auth, commentCtrl.addComment)
  // get comment >
  apiRouter.get('/comments/', auth, commentCtrl.getComment)
  // delete comment >
  apiRouter.delete('/comments/:id', auth, commentCtrl.deleteComment)

  return apiRouter
})()
