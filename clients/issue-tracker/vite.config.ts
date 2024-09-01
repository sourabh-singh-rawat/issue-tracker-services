import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
    include: ["@issue-tracker/common"]
  }
});
