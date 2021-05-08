require('dotenv').config()
require('./auth').initialize()
const express = require('express')
const server = express()
server.use(express.json())

const cardRoute = require('./routes/cardRoute')
const accountRoute = require('./routes/authRoute')
const storeRoute = require('./routes/storeRoute')
const stampRoute = require('./routes/stampRoute')
const walletRoute = require('./routes/walletRoute')

server.use('/api/v1/card', cardRoute)
server.use('/api/v1/account', accountRoute)
server.use('/api/v1/stores', storeRoute)
server.use('/api/v1/stamp', stampRoute)
server.use('/api/v1/wallet', walletRoute)
	
module.exports = server