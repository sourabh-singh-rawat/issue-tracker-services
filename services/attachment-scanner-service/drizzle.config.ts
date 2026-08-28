import { resolve } from "node:path";
import { defineConfig } from "drizzle-kit";

try {
  process.loadEnvFile(resolve(process.cwd(), "../../.env"));
} catch {}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.ATTACHMENT_SCANNER_DATABASE_URL ?? process.env.ATTACHMENT_DATABASE_URL ?? "",
  },
});
