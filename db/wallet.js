const connection = require('./connection')

function getUserWallet(userId, db = connection) {
	return db('wallets')
		.where('user_id', userId)
		.innerJoin('cards', 'cards.id', 'wallets.card_id')
		.select()
}

function walletAddCard({userId, cardId}, db = connection) {
	console.log('addcard', cardId)
	
	return db('wallets')
		.insert({
			user_id: userId,
			card_id: cardId
		})
}

function walletDeleteCard(cardId, db = connection) {
	console.log('delete', cardId)
	
	return db('wallets')
		.where('id', cardId,)
		.delete()
}

module.exports = {
	getUserWallet,
	walletAddCard,
	walletDeleteCard
}