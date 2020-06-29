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

## Instructions on how to use the app

- Go to localhost:3000
- Select a `Line` by either using the dropdown or by selecting the line onthe table
- Click on the input that says `Scan Component`
- When you click enter on your keyboard the 1pm bar should increment by 1
- If you keep on clicking the color should change from red to orange between 100-200
- After 200 it should be green.
- Everything should be real-time so you can open up multiple browsers to test the realtime capabilities.
- If you select the `Select Line` in the drop down you should go back to the admin page.