
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('users').del()
		.then(function () {
			// Inserts seed entries
			return knex('users').insert([
				{id: 1, firebase_id: 'xyz789', first_name: 'John', last_name: 'McClane'},
				{id: 2, firebase_id: 'tuv456', first_name: 'Hans', last_name: 'Gruber'},
			])
		})
}
