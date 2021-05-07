const { stampLoyaltyCard } = require('../db/card')

const router = require('express').Router()



router.patch('/', (req, res) => {
    
	const { userId, storeId } = req.body

	stampLoyaltyCard(userId, storeId).then( () => {
		res.json({
			title: {
				data: 'hello'
			}
		})
	}).catch( err => {
		console.error(err.message)
		res.status(500).json({
			error: {
				title: 'Error processing request'
			}
		})
	})
})

module.exports = router