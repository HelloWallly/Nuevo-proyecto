// ===============================================================
// main.jsx — Punto de entrada de la app React
// ===============================================================

// 🔹 Importaciones principales
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';       // Componente principal de la app
import './index.css';              // Estilos globales (Tailwind + personalizados)

// 🔹 Seleccionamos el nodo raíz en el HTML
const root = document.getElementById('root');

if (root) {
  // 🔹 Inicializamos React en modo estricto para detectar problemas potenciales
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}