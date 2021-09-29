// Imports >
const express = require('express')
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user')
const postCtrl = require('../controllers/post')
const multer = require('../middleware/multer-config')

// Routes >
exports.router = (function () {
  const apiRouter = express.Router()

  // - - - USERS ROUTES - - - //

  // signup >
  apiRouter.route('/users/signup/').post(userCtrl.signup)
  // login >
  apiRouter.route('/users/login/').post(auth, userCtrl.login)
  // getAccount >
  apiRouter.route('/users/accounts/:id/').get(userCtrl.getAccount)
  // updateProfile >
  apiRouter.route('/users/accounts/:id/').put(auth, userCtrl.updateUserProfile)
  // deleteAccount >
  apiRouter.route('/users/accounts/:id/').delete(auth, userCtrl.deleteAccount)

  // - - - POSTS ROUTES - - - //

  // new post >
  apiRouter.route('/posts/new/').post(multer, postCtrl.createPost)
  // get all post >
  apiRouter.route('/posts/').get(postCtrl.getAllPosts)
  // get one post >
  apiRouter.route('/posts/:id').get(postCtrl.getOnePost)
  // update post >
  apiRouter.route('/posts/:id').put(auth, multer, postCtrl.updatePost)
  // delete post >
  apiRouter.route('/posts/:id').delete(auth, postCtrl.deletePost)

  // - - - COMMENTS ROUTES - - - //

  // add comment >
  apiRouter.route('/:id/comments/').post(postCtrl.addComment)
  // delete comment >
  apiRouter.route('/comments/:id/').delete(auth, postCtrl.deleteComment)

  return apiRouter
})()
