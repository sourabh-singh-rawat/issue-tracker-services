import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: {
      "@bootstrap": path.resolve(__dirname, "src/bootstrap"),
      "@graphql": path.resolve(__dirname, "src/graphql"),
      "@generated": path.resolve(__dirname, "src/__generated__"),
      "@graphql-typed-document-node/core": path.resolve(
        __dirname,
        "src/shims/graphql-typed-document-node-core.ts",
      ),
    },
  },
  server: {
    port: 3002,
  },
});
