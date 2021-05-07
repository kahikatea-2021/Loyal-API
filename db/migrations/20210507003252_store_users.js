
exports.up = (knex) => {
	return knex.schema.createTable('store_users', table => {
		table.increments('id').primary()
		table.integer('store_id').references('stores.id')
		table.string('user_id')
		table.integer('stamp_count')
	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('store_users')
}
