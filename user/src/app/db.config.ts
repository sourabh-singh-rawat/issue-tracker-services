import { DataSource } from "typeorm";
import { PostgresContext } from "@sourabhrawatcc/core-utils";
import { logger } from "./logger.config";

const source = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: ["src/data/entities/*.ts"],
});

export const dataSource = new PostgresContext(source, logger);
