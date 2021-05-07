const { stampLoyaltyCard } = require('../db/card')
const router = require('express').Router()

router.patch('/', (req, res) => {
    
	const { userId, storeId } = req.body

	stampLoyaltyCard(userId, Number(storeId)).then( data => {
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