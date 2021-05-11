require('dotenv').config()
require('./auth').initialize()
require('./imageStorage')

const cors = require('cors')
const express = require('express')
const router = require('./routes')

const server = express()
server.use(express.json())

server.use( cors( {
	origin: '*'
} ) )

server.use(router)

module.exports = server