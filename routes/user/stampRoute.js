const { stampLoyaltyCard, resetLoyaltyCard } = require('../../db/user/stamp')
const { createUserCard, getUserCard } = require('../../db/user/userCard')
const createErrorJsonMessage = require('../../util/errorFormatter')
const router = require('express').Router()

router.patch('/', (req, res) => {
    
	const { cardId, storeId } = req.body
	const { uid } = req.user

	const cardInfo = {
		cardId,
		storeId,
		userId: uid
	}

	getUserCard(cardInfo).then ( loyaltyCard => {

		if (!loyaltyCard) 
			return createUserCard(cardInfo)
		
		return loyaltyCard

	}).then( loyaltyCard => {
		const stampCount = loyaltyCard.stampCount
		if (loyaltyCard.stampCount < loyaltyCard.rewardThreshold) {
			return stampLoyaltyCard(loyaltyCard.userId, loyaltyCard.cardId, stampCount + 1).then( () => {
				loyaltyCard.stampCount = stampCount + 1
				return {
					...loyaltyCard,
					shouldRedeem: loyaltyCard.stampCount === loyaltyCard.rewardThreshold,
				}
			})
		}

		return {
			...loyaltyCard,
			shouldRedeem: loyaltyCard.stampCount === loyaltyCard.rewardThreshold
		}

	}).then( loyaltyCard => {
		res.json(loyaltyCard)
	}).catch( error => {
		console.error(error)
		res.status(500).json(
			createErrorJsonMessage('Unable to stamp the card')
		)
	})

})

router.patch('/reset', (req, res) => {
	const data = {
		...req.body,
		userId: req.user.uid
	}
	resetLoyaltyCard(data).then(result => {
		res.json(result)
	}).catch( err => {
		console.error(err.message)
		res.status(500).json(
			createErrorJsonMessage('Unable to reset loyalty card')
		)
	})
})

module.exports = router