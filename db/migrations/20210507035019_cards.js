
exports.up = (knex) => {
	return knex.schema.createTable('cards', table => {
		table.increments('id').primary()
		table.integer('store_id').references('stores.id')
		table.integer('reward_threshold')
		table.string('reward')
	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('cards')
}
