const connection = require('../connection')

function createUserCard({ cardId, userId }, db = connection) {
	return db('wallets')
		.insert({
			user_id: userId,
			card_id: cardId,
			stamp_count: 0
		}).then( () => {
			return getUserCard({
				userId, cardId
			})
		})
}

function getUserCard({ userId, cardId}, db = connection) {
	return  db('wallets')
		.where('wallets.card_id', cardId)
		.where('user_id', userId)
		.innerJoin('cards', 'cards.id', 'wallets.card_id')
		.innerJoin('stores', 'stores.id', 'cards.store_id')
		.select(
			'store_id as storeId',
			'card_id as cardId',
			'user_id as userId',
			'stamp_count as stampCount',
			'store_name as storeName',
			'address',
			'instagram_handle as instagramHandle',
			'logo_url as logo',
			'reward_threshold as rewardThreshold',
		)
		.first()
}

module.exports = {
	getUserCard,
	createUserCard
}