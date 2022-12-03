import dotenv from "dotenv/config";
import pg from "pg";

const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
};

const { Pool } = pg;
const db = new Pool(dbConfig);

export default db;
