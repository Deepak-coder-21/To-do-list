const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
require('./Models/db') // Import the database connection
const Authrouter = require('./Routes/AuthRouter') // Import user routes

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(bodyParser.json())
app.use(cors())
app.use('/auth', Authrouter) // Import user routes

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
