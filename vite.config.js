import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["jodit-react", "jodit"],
  },
  server: {
    host: true,
    port: 7002,
     allowedHosts: ["all"], 
  },
  preview: {
    host: true,
    port: 4173, 
    allowedHosts: ["admin.kvrentals.us", "all"], 
  },
});