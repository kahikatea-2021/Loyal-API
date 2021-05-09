const { createUser } = require('../auth/account')
const { getStoresById, getStores, createStore } = require('../db/store')
const { generateQRCode } = require('../util/qrCode')

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
	getStores()
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
		})
})

router.post('/', (req, res) => {
	createUser(true, req.body).then(userRecord => {
		createStore({
			firebaseId: userRecord.uid,
			...req.body
		}).then(ids => {
			res.json({
				id: ids[0],
				...req.body
			})
		}).catch(err => {
			console.error(err.message)
			res.status(500).json({
				error: {
					title: 'Unable to register your Store'
				}
			})
		})
	})
})

module.exports = router