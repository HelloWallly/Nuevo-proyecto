// ===============================================================
// src/lib/firebase.js
// Configuración e inicialización de Firebase para el proyecto Kanban
// ===============================================================

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Base de datos Firestore
import { getAuth } from "firebase/auth"; // Autenticación

// 🔹 Configuración con variables de entorno (VITE_*) definidas en .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// 🔹 Inicializar Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Exportar Firestore y Auth para uso en la app
export const db = getFirestore(app);
export const auth = getAuth(app);