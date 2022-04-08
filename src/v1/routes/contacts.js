const express = require('express')
const route = express.Router()
const {userTokenVerification} = require('../middleware/authentication')
const contactController = require('../controllers/contacts')

route.post('/new', userTokenVerification, contactController.addNewContact)
route.get('/contact-list', userTokenVerification, contactController.getContactList)

module.exports = route