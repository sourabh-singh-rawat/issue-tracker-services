import { DataSource } from "typeorm";
import { env } from "@/env";

export const dataSource = new DataSource({
  type: "postgres",
  url: env.IDENTITY_POSTGRES_CLUSTER_URL,
  entities: ["src/entities/*.ts"],
  synchronize: true,
});
