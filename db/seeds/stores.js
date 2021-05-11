
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('stores').del()
		.then(function () {
			// Inserts seed entries
			return knex('stores').insert([
				{id: 1, firebase_id: '111abc', store_name: 'Rocket Cafe 🚀', admin_first_name: 'Buzz', admin_last_name: 'Aldrin', address: '15 Morgan Street, Newmarket, Auckland 1023'},
				{id: 2, firebase_id: '222abc', store_name: 'Moon Coffee 🌙', admin_first_name: 'Neil', admin_last_name: 'Armstrong', address: '15 Morgan Street, Newmarket, Auckland 1023'}
			])
		})
}
