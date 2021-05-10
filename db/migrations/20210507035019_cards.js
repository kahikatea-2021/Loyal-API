
exports.up = (knex) => {
	return knex.schema.createTable('cards', table => {
		table.increments('id').primary()
		table.string('store_id').unique().references('stores.id').notNullable()
		table.integer('reward_threshold').notNullable()
		table.string('reward').notNullable()
	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('cards')
}
