require('dotenv').config()
require('./auth').initialize()
require('./imageStorage')

const cors = require('cors')
const express = require('express')
const { verifyUser } = require('./auth/verifyUser')
const router = require('./routes')
const { getMockToken } = require('./routes/mockToken')

const server = express()
server.use(express.json())

server.use( cors( {
	origin: '*'
} ) )

/*server.use('/d',(req, res) => {
	const id = '12345'
	getMockToken(id,{
		uid: id
	})
})*/

/*server.use('/d1', (req, res, next) => {
	const header64 = req.headers.authorization.split(' ')[1].split('.')[0]
	const header = JSON.parse(Buffer.from(header64, 'base64').toString('ascii'))
	console.log(header)
	next()
}, verifyUser({shop: true}), (req, res) => {
	const id = '12345'
	console.log('ljafkljaslkfjlka')
	res.send()
})*/

server.use(router)

module.exports = server