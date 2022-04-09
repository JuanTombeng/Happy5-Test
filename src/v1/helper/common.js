const jwt = require('jsonwebtoken')

const response = (res, title, status, result, message, error) => {
    res.status(status).json({
        title : title,
        status : status,
        result : result,
        message : message,
        error : error || null
    })
}

const URLNotFoundHandling = (req, res) => {
    res.status(404)
    res.json({
        message : `URL NOT FOUND`
    })
}

const errorHandling = (err, res) => {
    const statusCode = err.status
    const errorMessage = err.message
    response(res, 'Error', statusCode, null, errorMessage)
}

const generateToken = (payload) => {
    const secretKey = process.env.SECRET_KEY
    const verifyOptions = {
        expiresIn : 60 * 60,
        issuer : 'happy5'
    }
    const result = jwt.sign(payload, secretKey, verifyOptions)
    return result
}

module.exports = {
    response,
    URLNotFoundHandling,
    errorHandling,
    generateToken
}