import { config } from "dotenv";
import path from "node:path";

// Load monorepo root .env before any module reads process.env.
// Path is relative to this file so it works regardless of process.cwd().
config({ path: path.resolve(__dirname, "../../../.env") });
