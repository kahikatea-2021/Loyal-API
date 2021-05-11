const { getStoresById } = require('../../db/store')
const { generateQRCode } = require('../../util/qrCode')

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
})

module.exports = router