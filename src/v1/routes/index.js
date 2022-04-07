const express = require('express')
const route = express.Router()
const userRoute = require('./user')

route.use('/users', userRoute)

module.exports = route