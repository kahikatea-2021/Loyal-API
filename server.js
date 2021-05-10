require('dotenv').config()
require('./auth').initialize()
const cors = require('cors')
const express = require('express')
const server = express()
server.use(express.json())

server.use( cors( {
	origin: '*'
} ) )
const cardRoute = require('./routes/cardRoute')
const accountRoute = require('./routes/authRoute')
const storeRoute = require('./routes/storeRoute')
const stampRoute = require('./routes/stampRoute')
const walletRoute = require('./routes/walletRoute')
const { verifyUser } = require('./auth/verifyUser')

server.use('/api/v1/account', accountRoute)

const userRouter = express.Router()
userRouter.use('/card', cardRoute)
userRouter.use('/stamp', stampRoute)
userRouter.use('/wallet', walletRoute)

const storeRouter = express.Router()
storeRouter.use('/stores', storeRoute)

server.use('/api/v1', verifyUser({ shop: true}), storeRouter)
server.use('/api/v1', verifyUser({ shop: false }), userRouter)
	
module.exports = server