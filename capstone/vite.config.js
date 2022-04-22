import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
require("dotenv").config();
console.log(process.env.REACT_APP_API_KEY);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
