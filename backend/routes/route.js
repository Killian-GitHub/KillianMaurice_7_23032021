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
  apiRouter.get('/users/accounts/:id/', auth, userCtrl.getAccount)
  // updateProfile >
  apiRouter.put('/users/accounts/:id/', auth, multer, userCtrl.updateAccount)
  // deleteAccount >
  apiRouter.delete('/users/accounts/:id/', auth, multer, userCtrl.deleteAccount)

  // - - - POSTS ROUTES - - - //

  // new post >
  apiRouter.post('/posts/new/', auth, multer, postCtrl.createPost)
  // get all post >
  apiRouter.get('/posts/', postCtrl.getAllPosts)
  // get one post >
  apiRouter.get('/posts/:id/', postCtrl.getOnePost)
  // update post >
  apiRouter.put('/posts/:id/', auth, multer, postCtrl.updatePost)
  // delete post >
  apiRouter.delete('/posts/:id/', auth, postCtrl.deletePost)

  // - - - COMMENTS ROUTES - - - //

  // add comment >
  apiRouter.post('/posts/:id/comments/new', auth, commentCtrl.addComment)
  // get comment >
  apiRouter.get('/posts/:id/comments/', commentCtrl.getComment)
  // delete comment >
  apiRouter.delete('/posts/:id/comments/:id', auth, commentCtrl.deleteComment)

  // // add comment >
  // apiRouter.post('/comments/:id/', auth, commentCtrl.addComment)
  // // get comment >
  // apiRouter.get('/comments/', commentCtrl.getComment)
  // // delete comment >
  // apiRouter.delete('/comments/:id/', auth, commentCtrl.deleteComment)

  return apiRouter
})()
