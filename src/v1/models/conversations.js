const connection = require('../config/dbConfig')

const newConversation = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO conversations SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const checkExistingConversation = (user_id_1, user_id_2) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT conversation_id FROM conversation_member WHERE user_id IN (?,?) GROUP BY conversation_id`
        connection.query(sql, [user_id_1, user_id_2], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateConversation = (data, conversation_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE conversations SET ? WHERE id = ?`
        connection.query(sql, [data, conversation_id], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getAllConversations = (conversation_member_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT conversations.id AS conversation_id, conversations.total_users, conversations.total_messages, 
        conversations.unread_messages FROM conversation_member INNER JOIN conversations ON conversation_member.conversation_id = 
        conversations.id WHERE conversation_member.user_id = ?`
        connection.query(sql, conversation_member_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getConversationDetails = (conversation_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * FROM conversations WHERE id = ?`
        connection.query(sql, conversation_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

// conversation member query
const newConversationMember = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO conversation_member SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    newConversation,
    checkExistingConversation,
    updateConversation,
    newConversationMember,
    getConversationDetails,
    getAllConversations
}