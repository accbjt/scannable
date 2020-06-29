exports.up = function(knex) {
  return knex.schema.createTable('product_scans', function(table) {
    table.increments("id").primary();
    table.string('product_number').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.integer('line_id').unsigned().notNullable();
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('product_scans');
}