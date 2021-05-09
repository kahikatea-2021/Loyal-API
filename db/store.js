const connection = require('./connection')

function getStores (db = connection) {
	return db ('stores').select()
}

function getStoresById (id, db = connection) {
	return db ('stores')
		.where('stores.id', id)
		.select(
			'stores.id as id',
			'store_name as storeName',
			'admin_first_name as firstName',
			'admin_last_name as lastName',
			'address'
		)
		.then((result) =>{
			const store = result[0]
			return{
				id: store.id,
				name: store.storeName,
				phone: store.phone,
				address: store.address
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