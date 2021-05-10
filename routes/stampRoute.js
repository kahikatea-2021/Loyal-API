const { stampLoyaltyCard, resetLoyaltyCard } = require('../db/card')
const router = require('express').Router()

router.patch('/', (req, res) => {
    
	const { storeId } = req.body
	const { uid } = req.user
	stampLoyaltyCard(uid, storeId).then( data => {
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

router.patch('/reset', (req, res) => {
	const data = {
		...req.body,
		userId: req.user.uid
	}
	resetLoyaltyCard(data).then(result => {
		res.json(result)
	}).catch( err => {
		console.error(err.message)
		res.status(500).json({
			error: {
				title: 'Unable to reset loyalty card'
			}
		})
	})
})

module.exports = router