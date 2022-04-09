const express = require('express')
const route = express.Router()
const {userTokenVerification} = require('../middleware/authentication')
const messageController = require('../controllers/messages')

route.post('/new-message', userTokenVerification, messageController.sendMessage)
route.get('/list-conversations', userTokenVerification, messageController.getAllConversations)
route.get('/open-conversation/:username', userTokenVerification, messageController.getConversation)

module.exports = route