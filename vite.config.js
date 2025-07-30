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
  },
});
