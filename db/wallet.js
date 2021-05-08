const connection = require('./connection')

function getUserWallet(userId, db = connection) {
	return db('wallets')
		.where('user_id', userId)
		.innerJoin('cards', 'cards.id', 'wallets.card_id')
		.select()
}

module.exports = {
	getUserWallet
}