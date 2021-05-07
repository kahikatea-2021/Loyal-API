const connection = require('./connection')

function getStoreCards(id, db = connection) {
	return db('cards').where('store_id', id)
		.select()
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
			'cards.reward'
		)
		.first()
		.then( userCard => {
			if (!userCard)
				throw new Error()
			
			return {
				id: userCard.id,
				stampCount: userCard.stampCount < userCard.rewardThreshold ? userCard.stampCount+1 : userCard.stampCount,
				storeId: userCard.storeId,
				userId: userCard.userId,
				shouldReedem: userCard.stampCount === userCard.rewardThreshold,
				rewardThreshold: userCard.rewardThreshold,
				reward: userCard.reward
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

function storeCreateCard({ storeId, rewardThreshold, reward }, db = connection) {
	return db('cards').insert({
		store_id: storeId,
		reward_threshold: rewardThreshold,
		reward: reward
	})
}



module.exports = {
	stampLoyaltyCard,
	getStoreCards,
	storeCreateCard
}