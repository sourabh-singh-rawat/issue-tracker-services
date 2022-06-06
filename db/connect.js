import pg from "pg";
const { Pool } = pg;

const databaseName = "issue-tracker";
const hostName = "localhost";
const userName = "laizinova";
const password = "702365";
const port = 5432;

const pool = new Pool({
  user: userName,
  host: hostName,
  database: databaseName,
  password: password,
  port: port,
});

export default pool;
