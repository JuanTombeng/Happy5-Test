const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const {response} = require('../helper/common')

const userTokenVerification = async (req, res, next) => {
    try {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        } else {
            return next(createError(403, 'Server Need Token'))
        }
        const verifyOptions = {
            issuer : 'happy5'
        }
        const secretKey = process.env.SECRET_KEY
        const decoded = jwt.verify(token, secretKey, verifyOptions)
        req.decoded = decoded
        next()
    } catch (error) {
        if (error && error.name === `JsonWebTokenError`) {
            return next(createError(400, 'Token Invalid'))
        } else if (error && error.name === 'TokenExpiredError') {
            return next(createError(400, 'Token Expired'))
        } else {
            return next(createError(400, 'Token not activated'))
        }
    }
}

module.exports = {
    userTokenVerification
}