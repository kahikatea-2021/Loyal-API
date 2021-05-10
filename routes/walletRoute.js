const { getUserWallet, walletAddCard, walletDeleteCard } = require('../db/wallet')

const router = require('express').Router()

router.get('/', (req, res) => {
	const { uid } = req.user
	getUserWallet(uid).then( userWallet => {
		res.json(userWallet)
	})
})

// POST /add cards to wallet

router.post('/', (req, res) => {
	walletAddCard(req.body).then(ids => {
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

// DELETE /delete a coffee card from the wallet

router.delete('/:id', (req, res) => {
	console.log(req.body)
	
	walletDeleteCard(Number(req.params.id)).then(ids => {
		res.json({
			id: ids[0],
			...req.body
		})
	}).catch(err => {
		console.error(err.message)
		res.status(500).json({
			error: {
				title: 'Unable to delete loyalty card from wallet'
			}
		})
	})
})

module.exports = router