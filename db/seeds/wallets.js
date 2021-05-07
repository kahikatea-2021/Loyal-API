
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('wallets').del()
		.then(function () {
			// Inserts seed entries
			return knex('wallets').insert([
				{id: 1, user_id: 'abc123', card_id: 1},
				{id: 2, user_id: 'def456', card_id: 2},
			])
		})
}
