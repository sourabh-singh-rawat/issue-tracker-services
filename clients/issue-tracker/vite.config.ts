import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/__generated__/routeTree.gen.ts",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "./src/api"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@generated": path.resolve(__dirname, "./src/__generated__"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  css: {
    // Map CSS back to source for VS Code / browser debugging
    devSourcemap: true,
  },
  server: {
    host: "localhost",
    port: 3000,
  },
  optimizeDeps: {
    include: ["@issue-tracker/common"],
  },
});
