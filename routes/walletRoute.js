const { getUserWallet } = require('../db/wallet')

const router = require('express').Router()

router.get('/:id', (req, res) => {
	const userId = req.params.id
	if (userId) {
		getUserWallet(userId).then( userWallet => {
			res.json(userWallet)
		})
	}
})

module.exports = router