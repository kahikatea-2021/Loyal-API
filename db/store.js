const connection = require('./connection')

function getStores (db = connection) {
	return db ('stores').select()
}

function getStoresById (id, db = connection) {
	return db ('stores')
		.where('stores.id', id)
		.leftJoin('cards', 'cards.store_id', 'stores.id')
		.select(
			'stores.id as id',
			'store_name as name',
			'admin_first_name as firstName',
			'admin_last_name as lastName',
			'address',
			'reward_threshold as rewardThreshold',
			'reward',
			'instagram_handle as instagramHandle',
			'cards.id as cardId',
			'store_logo as storeLogo'

		)
		.then((result) =>{
			const store = result[0]
			return{
				id: store.id,
				name: store.name,
				phone: store.phone,
				address: store.address,
				card: {
					cardId: store.cardId,
					storeLogo: store.storeLogo,
					instagramHandle: store.instagramHandle,
					reward: store.reward,
					rewardThreshold: store.rewardThreshold
				}
			}
		})
}

function createStore ({ firebaseId, storeName, adminFirstName, adminLastName, address }, db = connection) {
	return db ('stores').insert({
		id: firebaseId,
		store_name: storeName,
		admin_first_name: adminFirstName,
		admin_last_name: adminLastName,
		address: address,
	})

}

module.exports = {
	getStores,
	getStoresById,
	createStore
}