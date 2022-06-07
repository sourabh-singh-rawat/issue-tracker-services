import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const { Pool } = pg;

// CONNECTION VARIABLES
const hostName = process.env.HOST;
const userName = process.env.USER;
const password = process.env.PASSWORD;
const databaseName = process.env.DATABASE;
const port = 5432;

const db = new Pool({
  host: hostName,
  user: userName,
  password: password,
  database: databaseName,
  port: port,
});

export default db;
