import { Pool } from "pg";
import { PostgresContext } from "@sourabhrawatcc/core-utils";

let pool: Pool | null = null;
try {
  // TODO: env variables exists?
  pool = new Pool({
    host: "identity-postgres-service",
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
  });

  console.log("Identity service is connected with postgres server");
} catch (error) {
  // convert to custom error
  throw new Error("TODO: Pool creation error");
}

// TODO: is pool null?

export const postgresContext = new PostgresContext(pool);
