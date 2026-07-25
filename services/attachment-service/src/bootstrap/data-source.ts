import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.ATTACHMENT_POSTGRES_CLUSTER_URL,
  entities: ["src/entities/*.{ts,js}", "src/features/**/entities/*.{ts,js}"],
  synchronize: true,
});
