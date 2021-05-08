const connection = require('./connection')

function getUserWallet(userId, storeId, db = connection) {
	if (!storeId) {
		return db('wallets')
			.where('user_id', userId)
			.innerJoin('cards', 'cards.id', 'wallets.card_id')
			.select()
	} else {
		return db('wallets')
			.where('user_id', userId)
			.innerJoin('cards', 'cards.id', 'wallets.card_id')
			.innerJoin('stores', 'stores.id', 'cards.store_id')
			.where('stores.id', storeId)
			.select()
			.first()
	}
}

function walletAddCard({userId, cardId}, db = connection) {
	return db('wallets')
		.insert({
			user_id: userId,
			card_id: cardId
		})
}

module.exports = {
	getUserWallet,
	walletAddCard
}