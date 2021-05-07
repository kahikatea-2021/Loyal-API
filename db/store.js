const cards = require('./seeds/cards')
const stores = require('./seeds/stores')

const connection = require('./connection')

function getStoreCards(id, db = connection) {
	console.log(id)
	return db('cards').where('store_id', id)
		.select()
}

module.exports = {
	getStoreCards
}