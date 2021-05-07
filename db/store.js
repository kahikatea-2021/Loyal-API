const connection = require('./connection')

function getStoreCards(id, db = connection) {
	console.log(id)
	return db('cards').where('store_id', id)
		.select()
}

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
			'phone',
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

module.exports = {
	getStoreCards,
	getStores,
	getStoresById
}