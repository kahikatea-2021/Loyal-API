const router = require('express').Router()
const { createUser } = require('../auth/account')
const { createStore } = require('../db/store')

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

router.post('/store/register', (req, res) => {
	createUser(true, req.body).then(userRecord => {
		createStore({
			firebaseId: userRecord.uid,
			...req.body
		}).then(ids => {
			res.json({
				id: ids[0],
				...req.body
			})
		}).catch(err => {
			console.error(err.message)
			res.status(500).json({
				error: {
					title: 'Unable to register your Store'
				}
			})
		})
	})
})

module.exports = router