require('dotenv').config()
require('./auth')
const express = require('express')
const server = express()
server.use(express.json())

module.exports = server