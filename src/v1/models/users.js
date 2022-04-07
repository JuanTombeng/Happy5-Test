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

module.exports = {
    getUser
}