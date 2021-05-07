const stores = require('./mockJsonData/store_users.json').store_users
const cards = require('./mockJsonData/cards.json').cards
const storeUsers = require('./mockJsonData/store_users.json').store_users


const connection = require('./connection')

function stampLoyaltyCard(userId, storeId) {

	return new Promise( (resolve, reject) => {
		const storeUser = storeUsers.find((storeUser) => storeUser.user_id === userId && storeUser.store_id === storeId)
		const card = cards.find((card) => card.store_id === storeUser.store_id)
		const store = stores.find((store) => store.id === storeUser.store_id)
		if (card.total > storeUser.stamp_count) {
			storeUser.stamp_count++
		}
    
		resolve({
			name: store.store_name,
			stampCount: storeUser.stamp_count,
			shouldRedeem: storeUser.stamp_count === cards.cards.find((card) => card.store_id === store.id).total,
		})
	})
    
}

module.exports = {
	stampLoyaltyCard
}