const mysql = require('mysql2')

const connection = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
})

// connection.connect((err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('Connected to MySQL Server!');
//     }
// });

module.exports = connection