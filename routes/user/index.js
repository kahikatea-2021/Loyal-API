const express = require('express')
/**
 * User route
 */
const stampRoute = require('./stampRoute')
const walletRoute = require('./walletRoute')

const userRouter = express.Router()
userRouter.use('/stamp', stampRoute)
userRouter.use('/wallet', walletRoute)

module.exports = userRouter