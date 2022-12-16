import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/portfolio/", // mode: "development",
  // base: "/services/", // mode: "development",
  base: "/", // mode: "development",
  // base: "/basiir/test35/", // mode: "staging",
});
