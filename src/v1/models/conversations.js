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

const checkExistingConversation = (user_1_id, user_2_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT conversation_id FROM conversation_member WHERE (user_1_id = '${user_1_id}' AND user_2_id = '${user_2_id}') OR (user_1_id = '${user_2_id}' AND user_2_id = '${user_1_id}')`
        connection.query(sql, (error, result) => {
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
        conversations.id WHERE conversation_member.user_1_id = ? OR conversation_member.user_2_id = ?`
        // const sql = `SELECT conversations.id AS conversation_id, conversations.total_users, conversations.total_messages, 
        // conversations.unread_messages, IF(conversation_member.user_1_id = '${conversation_member_id}', user1.username, user2.username) AS username 
        // FROM conversation_member INNER JOIN conversations ON conversation_member.conversation_id = conversations.id 
        // INNER JOIN users user1 ON (conversation_member.user_1_id = users.id) INNER JOIN users user2 ON (conversation_member.user_2_id = users.id) 
        // WHERE conversation_member.user_1_id = '${conversation_member_id}' OR conversation_member.user_2_id = '${conversation_member_id}'`
        // const sql = `SELECT conversations.*, user1.username AS username, user2.username AS username FROM conversation_member INNER JOIN conversations 
        // ON conversation_member.conversation_id = conversations.id INNER JOIN users AS user1 ON users.id = conversation_member.user_1_id INNER JOIN users AS user2 
        // ON users.id = conversation_member.user_2_id WHERE conversation_member.user_1_id = ? OR conversation_member.user_2_id = ?`
        connection.query(sql, [conversation_member_id, conversation_member_id], (error, result) => {
        // connection.query(sql, conversation_member_id, (error, result) => {
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