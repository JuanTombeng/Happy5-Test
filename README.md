
# Back End Developer Test with Happy5

This project is developed using NodeJS, ExpressJS, and MySQL to build Chat API for Messaging Feature.

## Features

- User Sign Up and Login.
- User can add another user into their contact.
- User can list all their contact members.
- User **can only** start a conversation with other user which listed in their contact list.
- User can send and reply message in a conversations that they are involved with.
- User can list all conversations that they are involved with.
- User can view all messages in a specific conversation.


## Tech Stack

- Node JS
- Express JS
- MySQL

## Dependencies

- bcrypt
- cors
- dotenv
- express
- jsonwebtoken
- morgan
- mysql2
- uuidv4


## Demo

How to Use the API:


## User Registration

To start creating new conversation, sending, and viewing messages, a user must register an email, username, and password to the API.

### POST User Sign Up
**Request Route**
```
https://happy5-chat-api.herokuapp.com/v1/users/signup
```
**Request Body**
```
{
    "username" : "user1",
    "email" : "user1@gmail.com",
    "password" : "password123"
}
```
**Success Response**
```
{
    "title": "Success",
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0
    },
    "message": "Sign Up success. Please Login with user1@gmail.com",
    "error": null
}
```

### POST User Login
After Login, please copy the provided **token** in the login success response to allow user accessing contacts and messages feature.  

#### Authentication
**Please change the authentication type into Bearer Token**  

![Bearer Token](./src/asset/token-bearer.png)

**Request Route**
```
https://happy5-chat-api.herokuapp.com/v1/users/login
```
**Request Body**
```
{
    "email" : "user1@gmail.com",
    "password" : "password123"
}
```
**Success Response**
```
{
    "title": "Success",
    "status": 200,
    "result": {
        "username": "user1",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI0QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidXNlcjQiLCJpYXQiOjE2NDk1MTA1NTcsImV4cCI6MTY0OTUxNDE1NywiaXNzIjoiaGFwcHk1In0.X25WtFrBlqQlg6HFERuPGyuNw5kOlPtHPEhIm6YDVPA"
    },
    "message": "Welcome back user1",
    "error": null
}
```


#### Registered User Account :  

- **Juan**
    - email : juan@gmail.com
    - username : juan1
    - password : password123

- **user1**
    - email : user1@gmail.com
    - username : user1
    - password : password123

- **user2**
    - email : user2@gmail.com
    - username : user2
    - password : password123

- **user3**
    - email : user3@gmail.com
    - username : user3
    - password : password123

## Contact Features

To start creating conversation, Please add atleast 1 user to logged id user's contacts.

### POST Add new contact member
**Request Route**
```
https://happy5-chat-api.herokuapp.com/v1/contacts/new
```
**Request Body**
```
{
    "new_contact_username" : "juan1"
}
```
**Success Response**
```
{
    "title": "Success",
    "status": 200,
    "result": {
        "contact_group_id": "dd92e9d9-e6c6-4913-b7de-377542b46cc9",
        "contact_holder": "user1",
        "added_member": "juan1"
    },
    "message": "user1 created new group contact and added juan1 to the list.",
    "error": null
}
```

### GET List of added contact member
**Request Route**
```
https://happy5-chat-api.herokuapp.com/v1/contacts/contact-list
```
**Request Body**
```
No need request body since will token do the authentication and get the contact member.
```
**Success Response**
```
{
    "title": "Success",
    "status": 200,
    "result": {
        "contact_group_id": "dd92e9d9-e6c6-4913-b7de-377542b46cc9",
        "contact_holder": "user1",
        "added_member": "juan1"
    },
    "message": "user1 created new group contact and added juan1 to the list.",
    "error": null
}
```


## Message Features

To start sending new / replying message, User only need to provide the target of the username and the text message.  
The API will check whether there is an existing conversation between the logged in User with the target user.  
If the is an existing conversation, the new message will continue within that conversation. If not, the API will creating a new one.


### POST Send / Replying message
**Request Route**
```
https://happy5-chat-api.herokuapp.com/v1/messages/new-message
```
**Request Body**
```
{
    "target_username" : "juan1",
    "textMessage" : "Good Evening, juan."
}
```
**Success Response**
```
{
    "title": "Success",
    "status": 200,
    "result": {
        "conversationDetails": {
            "id": "4e93d28f-6400-421c-ac8b-282c57af7e83",
            "total_users": 2,
            "total_messages": 1,
            "unread_messages": 1
        },
        "sended_message": {
            "message_id": "a8836847-e0d9-458b-a587-249e8a6d1724",
            "sender": "user1",
            "receiver": "juan1",
            "text_message": "Good Evening, juan.",
            "deliver_status": "Delivered",
            "sended_at": "2022-04-09T13:24:38.437Z"
        }
    },
    "message": "New message sended from user4 to juan1",
    "error": null
}
```

### GET List of existing conversations
**Request Route**
```
https://happy5-chat-api.herokuapp.com/v1/messages/list-conversations
```
**Request Body**
```
No need request body since token will do the authentication and get all existing conversations.
```
**Success Response**
```
{
    "title": "Success",
    "status": 200,
    "result": [
        {
            "conversation_id": "4e93d28f-6400-421c-ac8b-282c57af7e83",
            "total_users": 2,
            "total_messages": 1,
            "unread_messages": 1
        }
    ],
    "message": "List of user1's active conversations.",
    "error": null
}
```

### GET All messages in a specific conversation
**Request Route**
```
https://happy5-chat-api.herokuapp.com/v1/messages/open-conversation/{target_username}
```

**Success Response**
```
{
    "title": "Success",
    "status": 200,
    "result": {
        "conversation_details": {
            "id": "4e93d28f-6400-421c-ac8b-282c57af7e83",
            "total_user": 2,
            "total_messages": 1,
            "unread_messages": 0,
            "login_as": "user1",
            "conversation_with": "juan1"
        },
        "messages": [
            {
                "messages_id": "a8836847-e0d9-458b-a587-249e8a6d1724",
                "sender": "user1",
                "text": "Good Evening, juan.",
                "deliver_status": 1,
                "read_status": 1,
                "delivered_time": "2022-04-09T13:24:38.000Z",
                "readed_time": null
            }
        ]
    },
    "message": "Conversation with juan1",
    "error": null
}
```


## Links

### CHAT API URL
```
https://happy5-chat-api.herokuapp.com/
```

