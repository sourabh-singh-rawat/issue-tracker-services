import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

export class DatabaseContext {
  private readonly db: pg.Pool;

  constructor() {
    this.db = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT as unknown as number,
      database: process.env.DB_NAME,
    });
  }

  public async query(sql: string, params: any[]) {
    const result = await this.db.query(sql, params);
    return result;
  }
}

export default new DatabaseContext();
