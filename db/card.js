const connection = require('./connection')

function getStoreCards(id, db = connection) {
	return db('cards').where('store_id', id)
		.select()
}

function resetLoyaltyCard({userId, storeId}, db = connection) {
	return db('store_users')
		.where('store_users.store_id', storeId)
		.where('user_id', userId)
		.update({
			stamp_count: -1
		}).then(() => {
			return stampLoyaltyCard(userId, storeId)
		})
}

function stampLoyaltyCard(userId, storeId, db = connection) {

	return db('store_users')
		.where('store_users.store_id', storeId)
		.where('user_id', userId)
		.leftJoin('cards', 'store_users.store_id', 'cards.store_id')
		.leftJoin('stores', 'store_users.store_id', 'stores.id')
		.select(
			'store_users.id', 
			'store_users.stamp_count as stampCount', 
			'store_users.store_id as storeId', 
			'store_users.user_id as userId',
			'cards.reward_threshold as rewardThreshold',
			'cards.reward',
			'stores.address'
		)
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
    
}

function storeCreateCard({ storeId, rewardThreshold, reward, instagramHandle, image }, db = connection) {
	return db('cards').insert({
		store_id: storeId,
		reward_threshold: rewardThreshold,
		reward: reward,
		instagram_handle: instagramHandle,
		store_logo: image
	})
}

function getUserCard({ userId, storeId}, db = connection) {
	return  db('store_users')
		.where('store_users.store_id', storeId)
		.where('user_id', userId)
		.select()
		.first()
}

module.exports = {
	stampLoyaltyCard,
	getStoreCards,
	storeCreateCard,
	getUserCard,
	resetLoyaltyCard
}