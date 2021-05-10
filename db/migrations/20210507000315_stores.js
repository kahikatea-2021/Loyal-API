
exports.up = (knex) => {
	return knex.schema.createTable('stores', table => {
		table.string('id').primary()
		table.string('store_name').notNullable()
		table.string('admin_first_name').notNullable()
		table.string('admin_last_name').notNullable()
		table.string('address')
		table.string('logo_url')
		table.string('instagram_handle')
	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('stores')
}
