
exports.up = (knex) => {
	return knex.schema.createTable('cards', table => {
		table.increments('id').primary()
		table.string('store_id').unique().references('stores.id').notNullable()
		table.integer('reward_threshold').notNullable()
		table.string('reward').notNullable()
		table.string('logo_url')
		table.string('instagram_handle')
	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('cards')
}
