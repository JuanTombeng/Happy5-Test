const express = require('express')
const route = express.Router()
const userRoute = require('./user')
const contactRoute = require('./contacts')
const messageRoute = require('./messages')

route.use('/users', userRoute)
route.use('/contacts', contactRoute)
route.use('/messages', messageRoute)

module.exports = route