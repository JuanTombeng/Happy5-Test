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

const getConversationId = (user_holder, user_target) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT conversation_id FROM conversation_member WHERE conversation_member.user_1_id = '${user_holder}' AND conversation_member.user_2_id = '${user_target}' 
        OR (conversation_member.user_1_id = '${user_target}' AND conversation_member.user_2_id = '${user_holder}')`
        connection.query(sql, (error, result) => {
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
        FROM messages INNER JOIN users ON messages.sender_id = users.id WHERE messages.conversation_id = ? ORDER BY messages.created_at`
        connection.query(sql, conversation_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateReadMessage = (conversation_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE messages SET read_status = 1 WHERE conversation_id = ?`
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
    getConversationId,
    getAllMessages,
    updateReadMessage
}