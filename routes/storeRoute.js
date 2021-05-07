const { getStoresById, getStores } = require('../db/store')

const router = require('express').Router()

router.get('/:id', (req, res) => {
	
	const id = Number(req.params.id)
  
	getStoresById(id)
		.then((stores) => {
			console.log(stores)
    
			return res.json({ stores })
		})
		.catch((err) => {
			console.error(err)
			res.status(500).json({
				error: {
					title: 'Unable to retrieve store'
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
			console.error(err)
			res.status(500).json({
				error: {
					title: 'Unable to retrieve store list'
				}
			})
		})
})

module.exports = router