// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["jodit-react", "jodit"]
  },
  server: {
    host: "0.0.0.0",
    port: 7002,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "rakib7002.sobhoy.com" ,
      "52.15.122.14"
    ]
  }
});