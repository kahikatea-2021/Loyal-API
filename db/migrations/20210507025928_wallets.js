
exports.up = (knex) => {
	return knex.schema.createTable('wallets', table => {
		table.increments('id').primary()
		table.string('user_id')
		table.integer('card_id').references('cards.id')
	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('wallets')
}
