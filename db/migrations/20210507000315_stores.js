
exports.up = (knex) => {
	return knex.schema.createTable('stores', table => {
		table.increments('id').primary()
		table.string('store_name')
		table.string('admin_first_name')
		table.string('admin_last_name')
		table.string('email')
		table.integer('phone')
		table.string('address')
	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('stores')
}
