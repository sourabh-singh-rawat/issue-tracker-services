import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import path from "node:path";

config({ path: path.resolve(__dirname, "../../.env") });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.IDENTITY_POSTGRES_CLUSTER_URL!,
  },
});
