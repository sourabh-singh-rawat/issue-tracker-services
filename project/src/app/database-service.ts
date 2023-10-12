import { DataSource } from "typeorm";
import { PostgresService, logger } from "@sourabhrawatcc/core-utils";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.host,
  username: process.env.user,
  password: process.env.password,
  database: process.env.dbname,
  entities: ["src/data/entities/*.ts"],
  synchronize: true,
});

export const databaseService = new PostgresService(dataSource, logger);
