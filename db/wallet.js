const connection = require('./connection')

function getUserWallet(userId, db = connection) {
	return db('wallets')
		.where('user_id', userId)
		.innerJoin('cards', 'cards.id', 'wallets.card_id')
		.select()
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