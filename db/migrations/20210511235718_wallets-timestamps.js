
exports.up = (knex) => {
	return knex.schema.alterTable('stores', table => {
		table.string('created_at')
		table.string('updated_at')

	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('stores')
}
