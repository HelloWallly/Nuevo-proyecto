# Tablero Kanban - Proyecto Nexeus Sigma

Aplicación web minimalista para la gestión de proyectos utilizando la metodología **Kanban**.  
Esta versión proporciona la **base preparada para frontend y backend** con Firebase, incluyendo pantallas de login y registro listas para implementar la interfaz de usuario.

---

## Roles Semana 1

- **Coordinador/a (Project Lead):** organiza el trabajo, reparte tareas, lleva el acta semanal y supervisa los commits. — **WALLISON**
- **Frontend Developer:** crea las pantallas (login, tablero) y trabaja en la parte visual e interactiva. — **VALENTINA**
- **Datos/Modelo:** configura Firebase, diseña la estructura de la base de datos y se encarga de guardar y leer los datos. — **SALIÓU**
- **QA / Testing:** comprueba que todo funcione correctamente, reporta errores y valida los criterios de aceptación. — **JOSE MANUEL**
- **Documentación / Presentación:** mantiene actualizado el README, documenta las decisiones y prepara la mini demo de fin de semana. — **MIQUEL**

---

## Tecnologías Utilizadas

- **Frontend:** React.js con Vite  
- **Backend/DB:** Firebase (Autenticación y Firestore)  
- **Estilo:** CSS simple (Tailwind opcional)  

## Estilos y TailwindCSS

El proyecto incluye **TailwindCSS** para facilitar la creación de estilos de manera rápida y consistente:

- Tailwind ya está configurado en `index.css` y listo para usar.
- Para generar clases de Tailwind, asegúrate de que el proyecto esté corriendo (`npm run dev`) y que `index.css` importe los estilos base:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

Para personalizar la configuración, edita tailwind.config.js.

Puedes usar las clases de Tailwind directamente en los componentes de React, por ejemplo:
Copiar código

<div className="p-4 bg-blue-100 rounded shadow-md">
  Contenido estilizado con Tailwind
</div>

Para compilar correctamente los estilos, asegúrate de no omitir npm run dev o npm run build.

---

## Estructura Base

La estructura inicial del proyecto incluye:

```text
📁 202509-sigma
├─ 📁 src
│  ├─ 📁 components
│  │  ├─ Login.js
│  │  └─ Register.js
│  ├─ 📁 lib
│  │  └─ firebase.js
│  ├─ main.js
│  ├─ App.js
│  └─ index.css
├─ 📁 public
│  └─ vite.svg
├─ index.html
├─ package.json
├─ vite.config.js
└─.env

```

- **Login.js / Register.js:** Pantallas listas para trabajar frontend.  
- **firebase.js:** Configuración de Firebase (Auth + Firestore).  
- **App.js:** Componente raíz que renderiza login o registro según estado.  
- **main.js:** Punto de entrada de la aplicación.  

---

## Cómo ponerlo en marcha

1. Clona el repositorio:
git clone https://github.com/Nexeus-Big-Data-Labs/202509-sigma
cd 202509-sigma

2. Instala dependencias incluyendo Firebase:
npm install
npm install firebase

3.Configura Firebase:
Crea el archivo .env en la raíz del proyecto.
Añade el siguiente bloque dentro de .env:

VITE_FIREBASE_API_KEY=AIzaSyDuV1I0PisYcGTI-Y5c9mG1dM6lZ3V_npk
VITE_FIREBASE_AUTH_DOMAIN=kanban-nexeus-dc028.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=kanban-nexeus-dc028
VITE_FIREBASE_STORAGE_BUCKET=kanban-nexeus-dc028.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=820571207371
VITE_FIREBASE_APP_ID=1:820571207371:web:b4b3a9ca0a7ee02b2dcd4e
VITE_FIREBASE_MEASUREMENT_ID=G-BY83XJ15ZY

4. Ejecuta la aplicación en modo desarrollo:
npm run dev

5. Abre tu navegador en:
http://localhost:5173/


Notas de cambios:

Proyecto unificado a raíz para que Vite encuentre main.js.
Migrado de TypeScript a JavaScript para simplificar la base inicial.
Firebase ya configurado y funcional (.env preparado).
Pantallas Login/Register creadas como base para frontend.
package.json unificado y scripts corregidos (dev, build, preview).
