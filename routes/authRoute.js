const router = require('express').Router()
const { createUser } = require('../auth/account')

router.post('/register', (req, res) => {
	createUser(false, req.body).then( token => {
		res.json({
			token: token
		})
	}).catch(err => {
		console.log(err.errorInfo)
		res.status(500).json({
			message: err.errorInfo.code
		})
	})
})

module.exports = router