import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isPROD: boolean = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  base: isPROD ? "/react-dnd-poc/" : "/",
  plugins: [react()],
});
