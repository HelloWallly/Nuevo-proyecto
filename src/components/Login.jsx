// ===============================================================
// Login.jsx — Blue Team Pro (Full Dark Background)
// ===============================================================
// 🔹 Fondo azul marino en toda la pantalla (sin franjas grises)
// 🔹 Patrón sutil repetido en todo el fondo
// 🔹 Estilo coherente con NEXEUS–SIGMA
// ===============================================================

import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Login({ onSwitch, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // 🔹 Forzamos el color de fondo global al cargar el componente
    document.body.style.backgroundColor = "#0A192F";
    document.body.style.backgroundImage =
      "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23233648' fill-opacity='0.25'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z'/%3E%3C/g%3E%3C/svg%3E\")";
    document.body.style.backgroundRepeat = "repeat";
    document.body.style.backgroundSize = "auto";
    document.body.style.color = "#E6F1FF";

    return () => {
      // 🔹 Restaurar color si se cambia de vista
      document.body.style.background = "";
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(userCred.user);
    } catch (err) {
      setError("Credenciales incorrectas o error de conexión.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-[Inter] text-white relative">
      {/* Contenedor principal del login */}
      <div className="relative z-10 w-full max-w-md bg-[#0E1B32]/95 rounded-xl shadow-lg border border-[#1E3A5F] p-8 backdrop-blur-sm">
        <h1 className="text-3xl font-extrabold text-center mb-2 tracking-tight">
          Bienvenido a{" "}
          <span className="text-[#3B82F6] font-black">SIGMA</span>
        </h1>
        <p className="text-center text-[#92adc9] text-sm mb-8">
          Inicia sesión en tu cuenta
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Campo Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#E6F1FF]">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="Tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 bg-[#233648] border-none text-white rounded-lg
                         placeholder-[#92adc9] focus:ring-2 focus:ring-[#3B82F6] outline-none"
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#E6F1FF]">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 bg-[#233648] border-none text-white rounded-lg
                         placeholder-[#92adc9] focus:ring-2 focus:ring-[#3B82F6] outline-none"
              required
            />
          </div>

          {/* Recordarme / Olvidé contraseña */}
          <div className="flex items-center justify-between text-sm text-[#92adc9]">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[#324d67] bg-transparent text-[#3B82F6] focus:ring-[#3B82F6]"
              />
              Recordarme
            </label>
            <a href="#" className="hover:text-white transition">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm text-center -mt-2">{error}</p>
          )}

          {/* Botón de entrar */}
          <button
            type="submit"
            className="w-full h-12 bg-[#3B82F6] hover:bg-[#2563EB]
                       text-white font-semibold rounded-lg shadow
                       transition-all duration-200"
          >
            Entrar
          </button>
        </form>

        {/* Registro */}
        <p className="text-center text-sm text-[#92adc9] mt-6">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-[#3B82F6] font-semibold hover:underline"
          >
            Regístrate
          </button>
        </p>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-[#92adc9]">
          <p>© 2025 NEXEUS–SIGMA. Todos los derechos reservados.</p>
          <div className="mt-1">
            <a href="#" className="hover:underline">
              Política de Privacidad
            </a>
            <span className="mx-1">·</span>
            <a href="#" className="hover:underline">
              Términos del Servicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}