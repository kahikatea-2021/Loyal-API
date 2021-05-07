const stores = require('./seeds/stores')

const connection = require('./connection')

function storeCreateCard(id, db = connection) {
    console.log(id)
    return db('').where('store_id', id)
        .select()
}

module.exports = {
    storeCreateCard
}