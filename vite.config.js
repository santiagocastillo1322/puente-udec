import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // 👈 Esto es clave para que el build funcione bien en Vercel si usas rutas relativas
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
});
