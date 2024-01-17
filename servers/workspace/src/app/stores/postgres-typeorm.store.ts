import { DataSource } from "typeorm";
import { PostgresTypeormStore, logger } from "@sourabhrawatcc/core-utils";

export const dbSource = new DataSource({
  type: "postgres",
  host: process.env.host,
  username: process.env.user,
  password: process.env.password,
  database: process.env.dbname,
  entities: ["src/data/entities/*.ts"],
  synchronize: true,
});

export const store = new PostgresTypeormStore(dbSource, logger);
