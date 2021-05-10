const { createUser } = require('../auth/account')
const { getStoresById, getStores, createStore } = require('../db/store')
const { storeCreateCard } = require('../db/card')
const { generateQRCode } = require('../util/qrCode')
const { storage } = require('../auth')

const router = require('express').Router()

router.get('/:id', (req, res) => {
	
	const id = Number(req.params.id)
  
	getStoresById(id)
		.then( async (store) => {
			res.json({
				...store,
				qrCode: await generateQRCode(JSON.stringify(store))
			})
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
	const { uid } = req.user
	console.log(uid)
	getStoresById(uid)
		.then( async (store) => {
			console.log(store)
			res.json({
				...store,
				qrCode: await generateQRCode(JSON.stringify(store))
			})
		})
		.catch((err) => {
			console.error(err)
			res.status(500).json({
				error: {
					title: 'Unable to retrieve store'
				}
			})
		})
	/*getStores()
		.then((stores) => {
			return res.json({ stores })
		})
		.catch((err) => {
			console.error(err)
			res.status(500).json({
				error: {
					title: 'Unable to retrieve store list'
				}
			})
		})*/
})

router.post('/', (req, res) => {
	console.log('hello there')
	console.log(req.body)
	const data = {
		...req.body,
		storeId: req.user.uid
	}

	const { image } = req.body
	storeImage(image).then( 
		
	)

	storeCreateCard(data).then(ids => {
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