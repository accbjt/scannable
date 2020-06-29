const connectionString = 'postgres://postgres:postgres@localhost:5432/core';

module.exports = {
  development: {
    client: 'pg',
    connection: connectionString,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
  },
};
