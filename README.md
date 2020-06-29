# Scannable

## Backend Setup
Make sure you setup a postgres database names `core`. If you already have one name that, then drop it and recreate it. `knex:setup` will run migrations and some seed data.

```
$ cd backend
$ npm i
$ npm run knex:setup
$ npm start
```

## Frontend Setup

```
$ cd frontend
$ npm i
$ npm run dev
```