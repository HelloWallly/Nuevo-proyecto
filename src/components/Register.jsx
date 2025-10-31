// ===============================================================
//  Register.jsx — Pantalla de registro de usuario
// ===============================================================
//  Permite ingresar email, contraseña y confirmación de contraseña.
//  Se conecta con Firebase Authentication y guarda los datos en Firestore.
// ===============================================================

import React, { useState } from "react";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../index.css";

function Register({ onSwitch, onRegisterSuccess }) {
  // 🔹 Estados locales del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Manejador del formulario
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Guardar usuario en Firestore (colección "sigma")
      await setDoc(doc(db, "sigma", user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      alert("✅ Usuario registrado correctamente");
      if (onRegisterSuccess) onRegisterSuccess(user);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔹 Contenedor principal */}
      <div className="flex items-center justify-center min-h-screen bg-[#111418] font-display">
        <div className="bg-[#1a2027] border border-[#283039] rounded-2xl p-8 shadow-2xl w-[400px] text-center transition-all duration-300 hover:shadow-blue-500/20">
          <h1 className="text-2xl font-bold text-white mb-6">
            Crear cuenta en <span className="text-[#137fec]">SIGMA</span>
          </h1>

          {/* 🔹 Formulario */}
          <form onSubmit={handleRegister} className="flex flex-col gap-4 text-left">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#9dabb9] mb-1"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo"
                required
                className="bg-[#283039] text-white placeholder-[#9dabb9] border border-[#3b4754] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#137fec] outline-none w-full"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#9dabb9] mb-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                required
                className="bg-[#283039] text-white placeholder-[#9dabb9] border border-[#3b4754] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#137fec] outline-none w-full"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#9dabb9] mb-1"
              >
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                required
                className="bg-[#283039] text-white placeholder-[#9dabb9] border border-[#3b4754] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#137fec] outline-none w-full"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-[#137fec] hover:bg-[#0f6ad3] text-white px-4 py-2 rounded-lg font-semibold w-full transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creando cuenta..." : "Registrarse"}
            </button>
          </form>

          {/* 🔹 Enlace para cambiar a inicio de sesión */}
          <p className="mt-6 text-sm text-[#9dabb9]">
            ¿Ya tienes cuenta?{" "}
            <button
              onClick={onSwitch}
              className="text-[#137fec] font-semibold hover:underline"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;