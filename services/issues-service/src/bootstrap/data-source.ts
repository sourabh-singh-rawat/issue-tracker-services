import { DataSource } from "typeorm";
import { env } from "@/env";

export const dataSource = new DataSource({
  type: "postgres",
  url: env.ISSUES_DATABASE_URL,
  entities: ["src/entities/*.{ts,js}"],
  synchronize: true,
});
