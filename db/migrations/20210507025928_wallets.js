
exports.up = (knex) => {
	return knex.schema.createTable('wallets', table => {
		table.increments('id').primary()
		table.string('user_id').notNullable()
		table.integer('card_id').references('cards.id').notNullable()
		table.integer('stamp_count')

	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('wallets')
}
