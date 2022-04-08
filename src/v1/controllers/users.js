const { v4 : uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const userModel = require('../models/users')
const {response, generateToken} = require('../helper/common')

const getUser = async (req, res, next) => {
    try {
        const result = await userModel.getUser()
        console.log(result)
        response(res, 'Success', 200, result, 'Get users')
    } catch (error) {
        console.log(error)
        next({
            status : 500, message : `${error.message}`
        })
    }
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const [findUser] = await userModel.findUser(email)
        if (findUser.email === email) {
            const checkPassword = await bcrypt.compare(password, findUser.password)
            if (checkPassword) {
                const payload = {
                    email : findUser.email,
                    username : findUser.username
                }
                const token = generateToken(payload)
                const result = {
                    username : findUser.username,
                    token : token
                }
                response(res, 'Success', 200, result, `Welcome back ${findUser.username}`)
            } else {
                response(res, 'Failed', 403, null, 'Your password is incorrect.', true)
            }
        } else {
            response(res, 'Failed', 404, null, 'Email not found.', true)
        }
    } catch (error) {
        console.log(error)
        next({
            status : 500, message : `${error.message}`
        })
    }
}

const signup = async (req, res, next) => {
    try {
        const {username, email, password} = req.body
        const salt = await bcrypt.genSalt()
        const findUser = await userModel.findUser(email)
        if (findUser.length == 0) {
            const user_id = uuidv4()
            const hashedPassword = await bcrypt.hash(password, salt)
            const data = {
                id : user_id,
                username : username,
                email : email,
                password : hashedPassword
            }
            const result = await userModel.signup(data)
            if (result.affectedRows > 0) {
                response(res, 'Success', 200, result, `Sign Up success. Please Login with ${email}`)
            }
        } else {
            response(res, 'Failed', 409, null, `Email has been taken, please choose another email.`, true)
        }
    } catch (error) {
        console.log(error)
        next({
            status : 500, message : `${error.message}`
        })
    }
}

module.exports = {
    getUser,
    login,
    signup
}