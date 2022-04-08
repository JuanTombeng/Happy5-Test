const connection = require('../config/dbConfig')

const createContactGroup = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO contact_group SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const checkContactGroup = (contact_holder_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT id, total_contacts FROM contact_group WHERE contact_holder_id = ?`
        connection.query(sql, contact_holder_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const updateTotalContact = (total, contact_group_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE contact_group SET total_contacts = ? WHERE id = ?`
        connection.query(sql, [total, contact_group_id], (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}


// contact member models

const addContactMember = (data) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO contact_member SET ?`
        connection.query(sql, data, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const getContactList = (contact_group_id) => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT users.username FROM contact_member INNER JOIN users 
        ON contact_member.user_id = users.id WHERE contact_member.contact_group_id = ?`
        connection.query(sql, contact_group_id, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    createContactGroup,
    checkContactGroup,
    updateTotalContact,
    addContactMember,
    getContactList
}