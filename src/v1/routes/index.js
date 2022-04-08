const express = require('express')
const route = express.Router()
const userRoute = require('./user')
const contactRoute = require('./contacts')

route.use('/users', userRoute)
route.use('/contacts', contactRoute)

module.exports = route