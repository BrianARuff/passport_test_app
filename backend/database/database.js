require("dotenv").config();
const { Client } = require("pg");

console.log(process.env.PG_USER);

const database = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

database.connect();

module.exports = { database };
