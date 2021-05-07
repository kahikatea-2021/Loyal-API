const stores = require('./mockJsonData/store_users.json').store_users
const cards = require('./mockJsonData/cards.json').cards
const storeUsers = require('./mockJsonData/store_users.json').store_users

const connection = require('./connection')

function getStoreCards(id, db = connection) {
	return db('cards').where('store_id', id)
		.select()
}

function stampLoyaltyCard(userId, storeId) {
	return new Promise( (resolve, reject) => {
		const storeUser = storeUsers.find((storeUser) => storeUser.user_id === userId && storeUser.store_id === storeId)
		const card = cards.find((card) => card.store_id === storeUser.store_id)
		const store = stores.find((store) => store.id === storeUser.store_id)
		if (card.total > storeUser.stamp_count) {
			storeUser.stamp_count++
		}
		console.log(storeUser.stamp_count === cards.find((card) => card.store_id === store.id).total)
		resolve({
			name: store.store_name,
			stampCount: storeUser.stamp_count,
			shouldRedeem: storeUser.stamp_count === cards.find((card) => card.store_id === store.id).total,
		})
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