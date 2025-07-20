import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    host: "localhost",
    port: 3000,
  },
  optimizeDeps: {
    include: ["@issue-tracker/common"],
  },
});
