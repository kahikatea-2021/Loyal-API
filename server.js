require('dotenv').config()
require('./auth')
const express = require('express')
const server = express()
server.use(express.json())

const cardRoute = require('./routes/cardRoute')
const accountRoute = require('./routes/authRoute')
const storeRoute = require('./routes/storeRoute')
const stampRoute = require('./routes/stampRoute')

server.use('/api/v1/card', cardRoute)
server.use('/api/v1/account', accountRoute)
server.use('/api/v1/stores', storeRoute)
server.use('/api/v1/stamp', stampRoute)
	
module.exports = server