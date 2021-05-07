const { getStoreCards, getStoresById, getStores } = require('../db/store')

const router = require('express').Router()

router.get('/card/:id', (req, res) => {
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

router.get('/:id', (req, res) => {
	const id = Number(req.params.id)
	console.log('getStoreById',id)
  
	getStoresById(id)
		.then((stores) => {
			console.log(stores)
    
			return res.json({ stores })
		})
		.catch((err) => {
			res.status(500).json({
				error: {
					title: 'Unable to retrieve stores'
				}
			})
		})
})
	
router.get('/', (req, res) => {
	getStores()
		.then((stores) => {
			console.log(stores)
			
			return res.json({ stores })
		})
		.catch((err) => {
			log(err.message)
			res.status(500).json({
				error: {
					title: 'Unable to retrieve stores'
				}
			})
		})
})


module.exports = router