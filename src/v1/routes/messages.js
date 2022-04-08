const express = require('express')
const route = express.Router()
const {userTokenVerification} = require('../middleware/authentication')
const messageController = require('../controllers/messages')

route.post('/new-message', userTokenVerification, messageController.sendMessage)

module.exports = route