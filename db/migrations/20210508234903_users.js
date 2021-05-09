exports.up = (knex) => {
	return knex.schema.createTable('users', table => {
		table.increments('id').primary()
		table.string('firebase_id').notNullable()
		table.string('first_name').notNullable()
		table.string('last_name').notNullable()
	})
}
  
exports.down = (knex) => {
	return knex.schema.dropTable('users')
}
