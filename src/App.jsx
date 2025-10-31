// ===============================================================
//  App.jsx — Componente principal de la aplicación
// ===============================================================
//  Muestra las pantallas Login, Register y Board según el estado actual.
//  Incluye integración con Firebase Authentication y cierre de sesión.
// ===============================================================

import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Board from "./components/Board";
import { auth } from "./lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./index.css";

export default function App() {
  // 🔹 Estado del usuario actual
  const [user, setUser] = useState(null);

  // 🔹 Estado de la vista actual: "login", "register" o "board"
  const [view, setView] = useState("login");

  // 🔹 Estado de carga mientras Firebase verifica el usuario
  const [loading, setLoading] = useState(true);

  // 🔹 Detecta cambios en la sesión de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setView("board");
      } else {
        setUser(null);
        setView("login");
      }
      setLoading(false);
    });

    // 🔹 Limpia el listener al desmontar
    return () => unsubscribe();
  }, []);

  // 🔹 Cerrar sesión
  const handleLogout = async () => {
    if (!confirm("¿Seguro que deseas cerrar sesión?")) return;
    try {
      await signOut(auth);
      setUser(null);
      setView("login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // 🔹 Mostrar mensaje de carga mientras Firebase verifica sesión
  if (loading) {
    return <div className="text-center mt-20">Cargando...</div>;
  }

  // ===============================================================
  //  Renderizado condicional de vistas
  // ===============================================================
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start text-center">
      {/* 🔹 Vista de login */}
      {!user && view === "login" && (
        <Login
          onSwitch={() => setView("register")}
          onLoginSuccess={(u) => {
            setUser(u);
            setView("board");
          }}
        />
      )}

      {/* 🔹 Vista de registro */}
      {!user && view === "register" && (
        <Register
          onSwitch={() => setView("login")}
          onRegisterSuccess={(u) => {
            setUser(u);
            setView("board");
          }}
        />
      )}

      {/* 🔹 Vista del tablero principal */}
      {user && view === "board" && (
        <Board uid={user.uid} onLogout={handleLogout} />
      )}
    </div>
  );
}