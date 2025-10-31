import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ===============================================================
// vite.config.js — Configuración de Vite para React
// ===============================================================

export default defineConfig({
  // 🔹 Plugins utilizados
  plugins: [react()], // Habilita soporte React con JSX, Fast Refresh, etc.

  // 🔹 Configuración del servidor de desarrollo
  server: {
    host: true, // Permite acceder desde cualquier IP local
    port: 5173, // Puerto de desarrollo (puedes cambiarlo si quieres)
    
    // 🔹 Hosts permitidos para conexiones externas
    // Puedes añadir dominios de ngrok, IP locales o .local
    allowedHosts: [
      "fcef524aa143.ngrok-free.app",
      ".local",
      "192.168.1.3"
    ],
  },
});