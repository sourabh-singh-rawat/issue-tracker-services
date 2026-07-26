import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  envDir: path.resolve(__dirname, "../.."),
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/__generated__/routeTree.gen.ts",
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      "@bootstrap": path.resolve(__dirname, "src/bootstrap"),
      "@graphql": path.resolve(__dirname, "src/graphql"),
      "@routes": path.resolve(__dirname, "src/routes"),
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
