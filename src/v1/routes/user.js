const express = require('express')
const route = express.Router()
const userController = require('../controllers/users')

route.get('/', userController.getUser)
route.post('/login', userController.login)
route.post('/signup', userController.signup)


module.exports = route