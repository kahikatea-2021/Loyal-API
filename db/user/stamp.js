const connection = require('../connection')
const { getUserCard } = require('./userCard')

function resetLoyaltyCard({userId, cardId}, db = connection) {
	return db('wallets')
		.where('wallets.card_id', cardId)
		.where('user_id', userId)
		.update({
			stamp_count: 0
		}).then(() => {
			return getUserCard({cardId, userId})
		})
}

function stampLoyaltyCard(userId, cardId, count, db = connection) {

	return db('wallets')
		.where('wallets.card_id', cardId)
		.leftJoin('cards', 'cards.id', 'wallets.card_id')
		.leftJoin('stores', 'stores.id', 'cards.store_id')
		.update({
			stamp_count: count
		})
    
}

module.exports = {
	stampLoyaltyCard,
	resetLoyaltyCard
}

/*

        .select()
		.first()
		.then( userCard => {
			
			if (!userCard) {
				return db('store_users').insert({
					store_id: storeId,
					user_id: userId,
					stamp_count: 1
				}).then( ids => {

					return db('cards')
						.where('store_id', storeId)
						.select()
						.first()
						.then( card => {

							return db('wallets')
								.insert({
									user_id: userId,
									card_id: card.id
								}).then( () => {
									return {
										id: ids[0],
										stampCount: 1,
										storeId,
										userId,
										shouldRedeem: false,
										rewardThreshold: card.rewardThreshold,
										reward: card.reward
									}
								} )
							
						})
					
				})
			} else {
			
				return {
					id: userCard.id,
					stampCount: userCard.stampCount < userCard.rewardThreshold ? userCard.stampCount+1 : userCard.stampCount,
					storeId: userCard.storeId,
					userId: userCard.userId,
					shouldRedeem: userCard.stampCount >= userCard.rewardThreshold-1,
					address: userCard.address,
					rewardThreshold: userCard.rewardThreshold,
					reward: userCard.reward
				}
			}
		}).then(userCard => {
			if (userCard && !userCard.shouldReedem) {
				return db('store_users')
					.where('store_users.store_id', storeId)
					.where('user_id', userId)
					.update({
						stamp_count: userCard.stampCount
					}).then(() => {
						return userCard
					})
			}
			return userCard
		})
        */