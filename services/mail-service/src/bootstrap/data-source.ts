import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.MAIL_POSTGRES_CLUSTER_URL,
  entities: ["src/entities/*.{ts,js}"],
  synchronize: true,
});
