const express = require('express')
const route = express.Router()
const userController = require('../controllers/users')

route.get('/', userController.getUser)


module.exports = route