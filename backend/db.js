const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  user: "laizinova",
  host: "localhost",
  database: "issuetracker",
  password: "702365",
  port: 5432,
});

module.exports = pool;
