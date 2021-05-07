const router = require('express').Router()
const { createUser } = require('../auth/account')

router.post('/register', (req, res) => {
	createUser(req.body).then( token => {
		res.json({
			token: token
		})
	}).catch(err => {
		res.status(500).json(
			err.message
		)
	})
})

module.exports = router