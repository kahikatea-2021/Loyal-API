require('dotenv').config()
require('./auth')
const express = require('express')
const server = express()
server.use(express.json())

const cardRoute = require('./routes/cardRoute')

server.use('/api/v1/card', cardRoute)

module.exports = server