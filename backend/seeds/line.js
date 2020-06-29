
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('lines').del()
    .then(function () {
      // Inserts seed entries
      return knex('lines').insert([
        {name: 'Line 1', location: 'Los Angeles'},
        {name: 'Line 2', location: 'Los Angeles'},
        {name: 'Line 3', location: 'Los Angeles'},
        {name: 'Line 4', location: 'Los Angeles'},
        {name: 'Line 5', location: 'Los Angeles'},
        {name: 'Line 6', location: 'Los Angeles'},
        {name: 'Line 7', location: 'Los Angeles'},
        {name: 'Line 8', location: 'Los Angeles'},
      ]);
    });
};
