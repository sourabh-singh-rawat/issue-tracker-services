import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.ATTACHMENT_POSTGRES_CLUSTER_URL,
  entities: ["src/features/attachment/entities/*.ts"],
  synchronize: true,
});
