import { DataSource } from "typeorm";
import { env } from "@/env";

export const dataSource = new DataSource({
  type: "postgres",
  url: env.ISSUE_TRACKER_POSTGRES_CLUSTER_URL,
  entities: ["src/entities/*.{ts,js}"],
  synchronize: true,
});
