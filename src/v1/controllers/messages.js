const { v4 : uuidv4 } = require('uuid')
const {response} = require('../helper/common')
const userModel = require('../models/users')
const contactModel = require('../models/contacts')
const conversationModel = require('../models/conversations')
const messageModel = require('../models/messages')

const sendMessage = async (req, res, next) => {
    try {
        const {email, username} = req.decoded
        const {target_username, textMessage} = req.body
        const [user_sender] = await userModel.findUser(email)
        const checkContactGroup = await contactModel.checkContactGroup(user_sender.id)
        if (checkContactGroup.length == 1 && checkContactGroup[0].total_contacts > 0) {
            const checkTargetUser = await contactModel.getContactMemberId(checkContactGroup[0].id, target_username)
            if (checkTargetUser.length > 0) { // target_user id ada di dalam contact group sender
                const [checkTargetUsername] = await userModel.checkUsername(checkTargetUser[0].user_id)
                if (checkTargetUsername.username === target_username) { //target_username ==
                    const user_target_id = checkTargetUser[0].user_id
                    const checkExistingConversation = await conversationModel.checkExistingConversation(user_sender.id, user_target_id)
                    console.log(checkExistingConversation)
                    if (checkExistingConversation.length > 0) { //check if convo exist
                        const new_message_id = uuidv4()
                        const dataMessage = {
                            id : new_message_id,
                            conversation_id : checkExistingConversation[0].conversation_id,
                            sender_id : user_sender.id,
                            text : textMessage,
                            deliver_status : 1
                        }
                        const sendMessage = await messageModel.newMessage(dataMessage)
                        if (sendMessage.affectedRows > 0) {
                            const [currentConversationDetails] = await conversationModel.getConversationDetails(checkExistingConversation[0].conversation_id)
                            const updateConversationDetailsData = {
                                total_messages : currentConversationDetails.total_messages + 1,
                                unread_messages : currentConversationDetails.unread_messages + 1
                            }
                            await conversationModel.updateConversation(updateConversationDetailsData, checkExistingConversation[0].conversation_id)
                            const result = {
                                conversationDetails : updateConversationDetailsData,
                                sended_message : {
                                    message_id : new_message_id,
                                    sender : username,
                                    receiver : target_username,
                                    text_message : textMessage,
                                    deliver_status : 'Delivered',
                                    sended_at : new Date()
                                }
                            }
                            response(res, 'Success', 200, result, `New message sended from ${username} to ${target_username}`)
                        }
                    } else {
                        const new_conversation_id = uuidv4()
                        const newConversationData = {
                            id : new_conversation_id,
                            total_users : 2,
                            total_messages : 1,
                            unread_messages : 1
                        }
                        const newConversation = await conversationModel.newConversation(newConversationData)
                        if (newConversation.affectedRows > 0) {
                            const new_conversation_member_id = uuidv4()
                            const newConversationMemberData = {
                                id : new_conversation_member_id,
                                conversation_id : new_conversation_id,
                                user_1_id : user_sender.id,
                                user_2_id : user_target_id
                            }
                            const newConversationMember = await conversationModel.newConversationMember(newConversationMemberData)
                            if (newConversationMember.affectedRows > 0) {
                                const new_message_id = uuidv4()
                                const dataMessage = {
                                    id : new_message_id,
                                    conversation_id : new_conversation_id,
                                    sender_id : user_sender.id,
                                    text : textMessage,
                                    deliver_status : 1
                                }
                                const sendMessage = await messageModel.newMessage(dataMessage)
                                if (sendMessage.affectedRows > 0) {
                                    const result = {
                                        conversationDetails : newConversationData,
                                        sended_message : {
                                            message_id : new_message_id,
                                            sender : username,
                                            receiver : target_username,
                                            text_message : textMessage,
                                            deliver_status : 'Delivered',
                                            sended_at : new Date()
                                        }
                                    }
                                    response(res, 'Success', 200, result, `New message sended from ${username} to ${target_username}`)
                                }
                            }
                        }
                    }
                }   
            } else {
                response(res, 'Failed', 404, null, `${target_username} is not in your contact list, please add then first to your contact list.`, true)
            }
        } else { // tidak ada contact group
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
    sendMessage
}