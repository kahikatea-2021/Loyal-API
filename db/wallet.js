const connection = require('./connection')

function getUserWallet(userId, db = connection) {
	//if (!storeId) {
	return db('wallets')
		.where('wallets.user_id', userId)
		.innerJoin('store_users', 'store_users.user_id', 'wallets.user_id')
		.innerJoin('stores', 'stores.id', 'store_users.store_id')
		.select(
			'stores.id as storeId',
			'store_users.stamp_count as stampCount',
			'wallets.user_id as userId',
			'stores.store_name as storeName',
		)
	/*} else {
		return db('wallets')
			.where('user_id', userId)
			.innerJoin('cards', 'cards.id', 'wallets.card_id')
			.innerJoin('stores', 'stores.id', 'cards.store_id')
			.where('stores.id', storeId)
			.select()
			.first()
	}*/
}

function walletAddCard({userId, cardId}, db = connection) {	
	return db('wallets')
		.insert({
			user_id: userId,
			card_id: cardId
		})
}

function walletDeleteCard(cardId, db = connection) {
	return db('wallets')
		.where('id', cardId,)
		.delete()
}

module.exports = {
	getUserWallet,
	walletAddCard,
	walletDeleteCard
}