import { defineConfig } from "drizzle-kit";
import { env } from "./src/bootstrap/env";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.ATTACHMENT_DATABASE_URL,
  },
});
