const express = require('espress')
const router = express.Router()

const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup)

router.post('/login', userCtrl.login)

router.put('/accounts/:id', userCtrl.updateAccount)

router.get('/accounts/:id', userCtrl.getAccount)

router.delete('/accounts/:id', userCtrl.deleteAccount)

module.exports = router
