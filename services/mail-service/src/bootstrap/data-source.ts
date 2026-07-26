import { DataSource } from "typeorm";
import { env } from "@/bootstrap/env";

export const dataSource = new DataSource({
  type: "postgres",
  url: env.MAIL_DATABASE_URL,
  entities: ["src/entities/*.{ts,js}"],
  synchronize: true,
});
