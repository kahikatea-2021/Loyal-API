const { stampLoyaltyCard } = require('../db/card')
const router = require('express').Router()

router.patch('/', (req, res) => {
    
	const { storeId } = req.body
	const { uid } = req.user
	console.log(req.body)
	console.log(uid)
	stampLoyaltyCard(uid, Number(storeId)).then( data => {
		res.json(data)
	}).catch( err => {
		console.error(err.message)
		res.status(500).json({
			error: {
				title: err.message ? 'Unable to stamp loyalty card' : 'Invalid loyalty card'
			}
		})
	})
})

module.exports = router