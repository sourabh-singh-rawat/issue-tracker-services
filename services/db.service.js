import pg from "pg";
import dbConfig from "../configs/db.config.js";

const { Pool } = pg;
const db = new Pool(dbConfig);

export default db;
