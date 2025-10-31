/** @type {import('tailwindcss').Config} */

// ===============================================================
// tailwind.config.js — Configuración de TailwindCSS
// ===============================================================

module.exports = {
  // 🔹 Archivos donde Tailwind buscará clases para generar CSS
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  // 🔹 Tema base, puedes extender colores, tipografías, tamaños, etc.
  theme: {
    extend: {}, // Por ahora no hay extensiones personalizadas
  },

  // 🔹 Plugins adicionales de TailwindCSS (ej: forms, typography)
  plugins: [],
};