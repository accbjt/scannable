const knex = require('../knex');

module.exports = {
  deleteAll: table =>
    knex(table)
      .del()
      .then(res => res)
      .catch(err => console.log(err)),

  insertIntoDB: (table, data) =>
    knex(table)
      .returning('id')
      .insert(data)
      .then(res => res)
      .catch(err => console.log(err)),

  selectAll: table =>
    knex(table)
      .select()
      .then(res => res)
      .catch(err => console.log(err)),

  find: (table, keys) =>
    knex(table)
      .where(keys)
      .then(res => res)
      .catch(err => console.log(err)),

  exists: (table, condition) =>
    knex(table)
      .where(condition)
      .catch(err => console.log(err)),

  deleteFromDB: (table, id) => {
    knex(table)
      .where('id', id)
      .del()
      .catch(err => console.log(err));
  },
};
