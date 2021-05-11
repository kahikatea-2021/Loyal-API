exports.up = (knex) => {
	return knex.schema.createTable('users', table => {
		table.string('id').primary()
		table.string('first_name').notNullable()
		table.string('last_name').notNullable()
	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('users')
}