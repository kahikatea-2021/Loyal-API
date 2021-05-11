
const connection = require('../connection')

function getStoreCard(storeId, db = connection) {
	return db('cards').where('store_id', storeId).select()
}

function storeCreateCard({ storeId, rewardThreshold, reward, instagramHandle, url }, db = connection) {
	return db('cards').insert({
		store_id: storeId,
		reward_threshold: rewardThreshold,
		reward: reward,
		instagram_handle: instagramHandle,
		logo_url: url
	})
}

module.exports = {
	getStoreCard,
	storeCreateCard
}