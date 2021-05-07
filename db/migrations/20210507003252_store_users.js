
exports.up = (knex) => {
	return knex.schema.createTable('store_users', table => {
		table.increments('id').primary()
		table.integer('store_id').references('stores.id').notNullable()
		table.string('user_id').notNullable()
		table.integer('stamp_count').notNullable()
	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('store_users')
}
