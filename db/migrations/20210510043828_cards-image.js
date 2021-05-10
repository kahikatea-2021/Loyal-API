
exports.up = (knex) => {
	return knex.schema.alterTable('cards', table => {
		table.string('instagram_handle')
		table.string('store_logo')
	})
}
  
exports.down = (knex) => {
	return knex.schema.dropColumn('cards')
}
