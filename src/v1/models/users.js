const connection = require('../config/dbConfig')

const getUser = () => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * FROM users`
        connection.query(sql, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const findUser = (email) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id, email, username, password FROM users WHERE email = ?`
        connection.query(sql, email, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const signup = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO users SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getUserId = (username) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id FROM users WHERE username = ?`
        connection.query(sql, username, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    getUser,
    findUser,
    signup,
    getUserId
}