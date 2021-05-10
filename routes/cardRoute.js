const {  getStoreCards } = require('../db/card')
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

module.exports = router