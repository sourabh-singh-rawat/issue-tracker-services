import { ConnectionRefusedError } from "@sourabhrawatcc/core-utils";
import { DataSource } from "typeorm";

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
    console.log("Identity service is connected with postgres server");
  })
  .catch((error) => {
    console.log(error);
    throw new ConnectionRefusedError("Connection to postgres server refused");
  });
