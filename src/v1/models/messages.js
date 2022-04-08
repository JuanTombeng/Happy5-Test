const connection = require('../config/dbConfig')

const newMessage = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO messages SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getAllMessages = (conversation_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT messages.id AS messages_id, users.username AS sender, messages.text, messages.deliver_status, 
        messages.read_status, messages.created_at AS delivered_time, messages.readed_at AS readed_time 
        FROM messages INNER JOIN users ON messages.sender_id = users.id WHERE messages.conversation_id = ?`
        connection.query(sql, conversation_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    newMessage,
    getAllMessages
}