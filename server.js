require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


// routes


// handle URL not found


// handle ERROR

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})