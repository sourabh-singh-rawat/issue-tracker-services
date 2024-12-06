import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.AUTH_POSTGRES_CLUSTER_URL,
  entities: ["src/data/entities/*.ts"],
  synchronize: true,
});
