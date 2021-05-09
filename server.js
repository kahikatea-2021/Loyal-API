require('dotenv').config()
require('./auth').initialize()
const cors = require('cors')
const express = require('express')
const server = express()
server.use(express.json())

server.use( cors( {
	origin: 'http://localhost:19006'
} ) )
const cardRoute = require('./routes/cardRoute')
const accountRoute = require('./routes/authRoute')
const storeRoute = require('./routes/storeRoute')
const stampRoute = require('./routes/stampRoute')
const walletRoute = require('./routes/walletRoute')
const { verifyUser } = require('./auth/verifyUser')

const userRouter = express.Router()
userRouter.use('/card', cardRoute)
userRouter.use('/stamp', stampRoute)
userRouter.use('/api/v1/wallet', walletRoute)

const storeRouter = express.Router()
storeRouter.use('/stores', storeRoute)

server.use('/api/v1', verifyUser({ shop: true}), storeRouter)
server.use('/api/v1', verifyUser({ shop: false }), userRouter)

server.use('/account', accountRoute)
	
module.exports = server