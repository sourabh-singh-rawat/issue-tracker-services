import { ConnectionRefusedError } from "@sourabhrawatcc/core-utils";
import { DataSource } from "typeorm";
import { app } from "../app";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: ["src/data/entities/*.ts"],
  // migrations: [],
});

dataSource
  .initialize()
  .then(() => {
    app.log.info("Server connected with postgres server");
  })
  .catch(() => {
    throw new ConnectionRefusedError("Connection to postgres server refused");
  });
