const { v4 : uuidv4 } = require('uuid')
const {response, generateToken} = require('../helper/common')
const userModel = require('../models/users')
const contactModel = require('../models/contacts')

const addNewContact = async (req, res, next) => {
    try {
        const {email, username} = req.decoded
        const {new_contact_username} = req.body
        const target_user = await userModel.getUserId(new_contact_username)
        if (target_user.length == 1) {
            const [user_group_holder] = await userModel.findUser(email)
            const checkExistingGroup = await contactModel.checkContactGroup(user_group_holder.id)
            const contact_member_id = uuidv4()
            if (checkExistingGroup.length == 1) {
                const newMember = {
                    id : contact_member_id,
                    contact_group_id : checkExistingGroup[0].id,
                    user_id : target_user[0].id
                }
                const addContactMember = await contactModel.addContactMember(newMember)
                if (addContactMember.affectedRows > 0) {
                    const total_contacts = checkExistingGroup[0].total_contacts + 1
                    const updateTotalContact = await contactModel.updateTotalContact(total_contacts, checkExistingGroup[0].id)
                    const result = {
                        contact_group_id : checkExistingGroup[0].id,
                        contact_holder : username,
                        added_member : new_contact_username
                    }
                    if (updateTotalContact.affectedRows > 0) {
                        response(res, 'Success', 200, result, `User ${new_contact_username} is added to ${username}'s contact list`)
                    }
                }
            } else {
                const contact_group_id = uuidv4()
                const newGroup = {
                    id : contact_group_id,
                    contact_holder_id : user_group_holder.id,
                    total_contacts : 1
                }
                const newContactGroup = await contactModel.createContactGroup(newGroup)
                if (newContactGroup.affectedRows > 0) {
                    const newMember = {
                        id : contact_member_id,
                        contact_group_id : contact_group_id,
                        user_id : target_user[0].id
                    }
                    const addContactMember = await contactModel.addContactMember(newMember)
                    if (addContactMember.affectedRows > 0) {
                        const result = {
                            contact_group_id : contact_group_id,
                            contact_holder : username,
                            added_member : new_contact_username
                        }
                        response(res, 'Success', 200, result, `${username} created new group contact and added ${new_contact_username} to the list.`)
                    }
                }
            }
        } else {
            response(res, 'Failed', 404, null, 'We cannot find the inserted username to be added.', true)
        }
    } catch (error) {
        console.log(error)
        next({
            status : 500, message : `${error.message}`
        })
    }
}

const getContactList = async (req, res, next) => {
    try {
        const {email, username} = req.decoded
        const [user] = await userModel.findUser(email)
        const checkContactGroup = await contactModel.checkContactGroup(user.id)
        if (checkContactGroup.length == 1 && checkContactGroup[0].total_contacts > 0) {
            const contactList = await contactModel.getContactList(checkContactGroup[0].id)
            const result = {
                contact_holder : username,
                total_contacts : checkContactGroup[0].total_contacts,
                list_member : contactList
            }
            response(res, 'Success', 200, result, `${username}'s contact member list.`)
        } else if (checkContactGroup.length == 1 && checkContactGroup[0].total_contacts == 0) {
            const result = {
                contact_holder : username,
                total_contacts : checkContactGroup[0].total_contacts
            }
            response(res, 'Success', 200, result, 'You have contact group but with 0 members.', true)
        } else {
            response(res, 'Failed', 404, null, 'You do not have contact group. Please add new contact first to create new contact group.', true)
        }
    } catch (error) {
        console.log(error)
        next({
            status : 500, message : `${error.message}`
        })
    }
}

module.exports = {
    addNewContact,
    getContactList
}
