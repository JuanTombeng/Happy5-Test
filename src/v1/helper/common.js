const jwt = require('jsonwebtoken')

const response = (res, title, status, result, message, error) => {
    res.status().json({
        title : title,
        status : status,
        result : result,
        message : message,
        error : error || null
    })
}

const URLNotFoundHandling = (res) => {
    res.status(404)
    res.json({
        message : 'URL NOT FOUND'
    })
}

const errorHandling = (err, res) => {
    const statusCode = err.status
    const errorMessage = err.message
    response(res, 'Error', statusCode, null, errorMessage)
}

const generateToken = (payload) => {
    const secretKey = proccess.env.SECRET_KEY
    const verifyOptions = {
        expiresIn : 60 * 60,
        issuer : 'happy5'
    }
    const token = jwt.sign(payload, secretKey, verifyOptions)
    return token
}

module.exports = {
    response,
    URLNotFoundHandling,
    errorHandling,
    generateToken
}