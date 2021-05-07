
exports.seed = (knex) => {
	// Deletes ALL existing entries
	return knex('store_users').del()
		.then(function () {
			// Inserts seed entries
			return knex('store_users').insert([
				{id: 1, store_id: 1, user_id: 'abc123', stamp_count: 0},
				{id: 2, store_id: 2, user_id: 'def456', stamp_count: 0}
			])
		})
}
