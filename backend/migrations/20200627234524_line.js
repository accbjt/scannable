exports.up = function(knex) {
  return knex.schema.createTable('lines', function(table) {
    table.increments("id").primary();
    table.string('name');
    table.string('location').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('lines');
}
