exports.up = function(knex) {
  return knex.schema.table("product_scans", table => {
      table.foreign("line_id").references("lines.id");
  });
};

exports.down = function(knex) {
  return knex.schema.table("product_scans", table => {
      table.dropForeign("line_id");
  });
};