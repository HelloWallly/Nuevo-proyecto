// ===============================================================
// postcss.config.js — Configuración de PostCSS para TailwindCSS
// ===============================================================

module.exports = {
  plugins: {
    // 🔹 Plugin oficial de TailwindCSS para procesar sus directivas (@tailwind base, components, utilities)
    '@tailwindcss/postcss': {},

    // 🔹 Autoprefixer agrega prefijos CSS automáticamente según compatibilidad de navegadores
    autoprefixer: {},
  },
};