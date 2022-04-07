const userModel = require('../models/users')
const {response} = require('../helper/common')

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

module.exports = {
    getUser
}