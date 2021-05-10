const {  getStoreCards, storeCreateCard, resetLoyaltyCard } = require('../db/card')
const router = require('express').Router()

router.get('/', (req, res) => {
	const { store } = req.query

	if (store) {
		getStoreCards(Number(store)).then( cards => {
			res.json(cards)
		}).catch(err => {
			console.error(err)
			res.status(500).json({
				error: err.message
			})
		})
	}
})

router.patch('/', (req, res) => {
	console.log(req.body)
	resetLoyaltyCard(req.body).then(result => {
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

router.post('/', (req, res) => {
	storeCreateCard(req.body).then(ids => {
		res.json({
			id: ids[0],
			...req.body
		}) 
	}).catch(err => {
		console.error(err.message)
		res.status(500).json({
			error: {
				title: 'Unable to create a loyalty card'
			}
		})
	})
})

module.exports = router