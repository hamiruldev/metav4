import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/hamirul/test17", // mode: "development",
  // base: "/testing10/", // mode: "production",
  
});
