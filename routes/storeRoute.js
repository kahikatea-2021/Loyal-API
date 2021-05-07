const { getStoreCards } = require('../db/store')

const router = require('express').Router()

router.get('/:id', (req, res) => {
	console.log(req.params)
	getStoreCards(Number(req.params.id))


		.then( data => {
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

module.exports = router