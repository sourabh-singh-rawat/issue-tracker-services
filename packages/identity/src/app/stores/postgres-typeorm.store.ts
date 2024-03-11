import { DataSource } from "typeorm";
import { PostgresTypeormStore, logger } from "@sourabhrawatcc/core-utils";

export const dbSource = new DataSource({
  type: "postgres",
  host: process.env.host,
  username: process.env.user,
  password: process.env.password,
  database: process.env.dbname,
  entities: ["src/app/entities/*.ts"],
  synchronize: true,
});

export const postgresTypeormStore = new PostgresTypeormStore(dbSource, logger);
