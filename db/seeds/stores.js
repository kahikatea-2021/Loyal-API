
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('stores').del()
		.then(function () {
			// Inserts seed entries
			return knex('stores').insert([
				{id: 1, store_name: 'Rocket Cafe', admin_first_name: 'Buzz', admin_last_name: 'Aldrin', email: 'buzz@snailmail.com', phone: 6491231234, address: '15 Morgan Street, Newmarket, Auckland 1023'},
				{id: 2, store_name: 'Moon Coffee', admin_first_name: 'Neil', admin_last_name: 'Armstrong', email: 'buzz@snailmail.com', phone: 6491231234, address: '15 Morgan Street, Newmarket, Auckland 1023'}
			])
		})
}
