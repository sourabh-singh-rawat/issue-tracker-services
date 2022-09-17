import dotenv from "dotenv/config";

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 5432,
};

export default dbConfig;
