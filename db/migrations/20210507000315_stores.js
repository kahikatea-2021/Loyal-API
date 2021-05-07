
exports.up = (knex) => {
	return knex.schema.createTable('stores', table => {
		table.increments('id').primary()
		table.string('store_name').notNullable()
		table.string('admin_first_name').notNullable()
		table.string('admin_last_name').notNullable()
		table.string('email').notNullable()
		table.integer('phone').notNullable()
		table.string('address').notNullable()
	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('stores')
}
