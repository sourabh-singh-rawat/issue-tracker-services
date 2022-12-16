import dotenv from "dotenv/config";
import pg from "pg";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};

const { Pool } = pg;
const db = new Pool(dbConfig);

export default db;
