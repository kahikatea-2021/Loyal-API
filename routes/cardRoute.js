const { stampLoyaltyCard, getStoreCards, storeCreateCard } = require('../db/card')

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
    
	const { userId, storeId } = req.body

	stampLoyaltyCard(userId, storeId).then( data => {
		res.json(data)
	}).catch( err => {
		console.error(err.message)
		res.status(500).json({
			error: {
				title: 'Error processing request'
			}
		})
	})
})

router.post('/', (req, res) => {
	storeCreateCard(req.body).then(ids => {
		console.log(ids)
		res.json({
			id: ids[0],
		...req.body
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