
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {id: 1, store_id: 1, reward_threshold: 10, reward: '1 free coffee'},
        {id: 2, store_id: 2, reward_threshold: 10, reward: '1 free coffee'}
      ])
    })
}
