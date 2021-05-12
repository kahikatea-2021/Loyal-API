const connection = require('../connection')

function getStores (db = connection) {
	return db ('stores').select()
}

function getStoresById(id, db = connection) {
	console.log(id)
	return db ('stores')
		.where('stores.id', id)
		.select(
			'stores.id as id',
			'store_name as name',
			'admin_first_name as firstName',
			'admin_last_name as lastName',
			'address',
		)
		.then((result) =>{
			console.log(result)
			const store = result[0]

			return db('cards')
				.where('cards.store_id', id)
				.select()
				.first()
				.then( card => {
					let cardId = card ? card.id : null
					return {
						store: {
							id: store.id,
							contact: store.firstName + ' ' + store.lastName,
							name: store.name,
							phone: store.phone,
							address: store.address,
							cardId: cardId,
						},
						qrCodeData: {
							storeId: store.id,
							cardId: cardId,
						}
					}
				})
			
		})
}

function createStore ({ firebaseId, storeName, firstName, lastName, address }, db = connection) {
	return db ('stores').insert({
		id: firebaseId,
		store_name: storeName,
		admin_first_name: firstName,
		admin_last_name: lastName,
		address: address,
	})
}

module.exports = {
	getStores,
	getStoresById,
	createStore
}