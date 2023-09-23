import { DataSource } from "typeorm";
import { PostgresContext, logger } from "@sourabhrawatcc/core-utils";

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.host,
  username: process.env.user,
  password: process.env.password,
  database: process.env.dbname,
  synchronize: true,
  entities: ["src/data/entities/*.ts"],
});

export const dbContext = new PostgresContext(dataSource, logger);
