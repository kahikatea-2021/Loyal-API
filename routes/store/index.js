
const express = require('express')

const storeRoutes = require('./storeRoute')
const storeCardRoutes = require('./storeCardRoute')

const storeRouter = express.Router()

storeRouter.use('/stores', storeRoutes)
storeRouter.use('/store/cards', storeCardRoutes)

module.exports = storeRouter