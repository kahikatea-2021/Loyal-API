const express = require('express')
const router = express.Router()
const { storeCreateCard } = require('../../db/store/storeCard')
const { getStoreCard } = require('../../db/store/storeCard')
const { storeImage } = require('../../imageStorage/image')
const createErrorJsonMessage = require('../../util/errorFormatter')

router.post('/', express.json({limit: '50mb'}), (req, res) => {
	console.log(req.user)
	
	const data = {
		...req.body,
		storeId: req.user.uid
	}

	const { image } = req.body

	getStoreCard(data.storeId).then( store => {
		if (store.length <= 0) {
			storeImage(image).then( imageObj => {
				storeCreateCard({
					...data,
					url: imageObj.url
				}).then(ids => {
					res.json({
						id: ids[0],
						...req.body,
						url: imageObj.url
					}) 
				}).catch(() => {
					res.status(500).json({
						error: {
							title: 'Unable to create a loyalty card'
						}
					})
				})
			}) 
		} else {
			res.status(500).json(createErrorJsonMessage('Already created a card'))
		}
	})
	
})

module.exports = router