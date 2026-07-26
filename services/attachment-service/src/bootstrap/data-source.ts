import { DataSource } from "typeorm";
import { env } from "@/bootstrap/env";

export const dataSource = new DataSource({
  type: "postgres",
  url: env.ATTACHMENT_POSTGRES_CLUSTER_URL,
  entities: ["src/entities/*.{ts,js}", "src/features/**/entities/*.{ts,js}"],
  synchronize: true,
});
