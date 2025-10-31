// ===============================================================
//  Board.jsx — Panel de Gestión de Tareas (UI estilo Stitch Light)
// ===============================================================
//  ✔ Modo claro profesional con sombras suaves
//  ✔ Sidebar minimalista con secciones y filtros
//  ✔ 4 columnas horizontales con tareas drag & drop
//  ✔ Firestore: getAllTasks / saveTask / updateTask / removeTask
//  ✔ Modal de nueva tarea con inputs y validación
// ===============================================================

import React, { useEffect, useState } from "react";
import { getAllTasks, saveTask, updateTask, removeTask } from "../firestoreTasks";

// ---------- Configuración de prioridades ----------
const PRIORITY_META = {
  high: { label: "Alta", color: "bg-red-500" },
  medium: { label: "Media", color: "bg-yellow-400" },
  low: { label: "Baja", color: "bg-green-500" },
};

// ---------- Columnas del tablero ----------
const COLUMNS = [
  { key: "todo", title: "Por Hacer", color: "text-blue-600" },
  { key: "inProgress", title: "En Progreso", color: "text-yellow-500" },
  { key: "done", title: "Hechas", color: "text-green-600" },
  { key: "delete", title: "Eliminar", color: "text-red-600" },
];

// ===============================================================
//                     TARJETA DE TAREA
// ===============================================================
function TaskCard({ task, onDragStart }) {
  const pr = PRIORITY_META[task.priority || "medium"];
  return (
    <div
      draggable
      onDragStart={() => onDragStart(task)}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200
                 hover:shadow-md transition cursor-grab active:cursor-grabbing"
    >
      <p className="font-semibold text-gray-800">{task.content}</p>
      <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${pr.color}`} />
          <span>Prioridad {pr.label}</span>
        </div>
        <span>Vence: {task.dueDate || "—"}</span>
      </div>
    </div>
  );
}

// ===============================================================
//                     MODAL DE NUEVA TAREA
// ===============================================================
function NewTaskModal({ open, onClose, onCreate }) {
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (open) {
      setContent("");
      setPriority("medium");
      setDueDate("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Nueva Tarea</h2>

        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Descripción de la tarea..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3 mb-4">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              if (!content.trim()) return;
              onCreate({ content, priority, dueDate });
            }}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}

// ===============================================================
//                     COMPONENTE PRINCIPAL
// ===============================================================
export default function Board({ uid, onLogout }) {
  const [cols, setCols] = useState({ todo: [], inProgress: [], done: [] });
  const [draggedTask, setDraggedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ---------- Cargar tareas ----------
  useEffect(() => {
    if (!uid) return;
    (async () => {
      const tasks = await getAllTasks(uid);
      const next = { todo: [], inProgress: [], done: [] };
      tasks.forEach((t) => {
        const k = t.status || "todo";
        next[k]?.push(t);
      });
      setCols(next);
    })();
  }, [uid]);

  // ---------- Drag & Drop ----------
  const handleDragStart = (task) => setDraggedTask(task);

  const handleDrop = async (columnKey) => {
    if (!draggedTask) return;

    // Eliminar tarea
    if (columnKey === "delete") {
      await removeTask(uid, draggedTask.id);
      setCols((prev) => ({
        todo: prev.todo.filter((t) => t.id !== draggedTask.id),
        inProgress: prev.inProgress.filter((t) => t.id !== draggedTask.id),
        done: prev.done.filter((t) => t.id !== draggedTask.id),
      }));
      setDraggedTask(null);
      return;
    }

    // Mover tarea entre columnas
    if (draggedTask.status !== columnKey) {
      await updateTask(uid, draggedTask.id, { status: columnKey });
    }

    setCols((prev) => {
      const next = {
        todo: prev.todo.filter((t) => t.id !== draggedTask.id),
        inProgress: prev.inProgress.filter((t) => t.id !== draggedTask.id),
        done: prev.done.filter((t) => t.id !== draggedTask.id),
      };
      next[columnKey].push({ ...draggedTask, status: columnKey });
      return next;
    });

    setDraggedTask(null);
  };

  // ---------- Crear tarea ----------
  const handleCreate = async ({ content, priority, dueDate }) => {
    const payload = { content, priority, dueDate, status: "todo" };
    const saved = await saveTask(uid, payload);
    setCols((prev) => ({ ...prev, todo: [...prev.todo, saved] }));
    setShowModal(false);
  };

  // ===============================================================
  //                         RENDER UI
  // ===============================================================
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h1 className="font-semibold">John Doe</h1>
            <p className="text-sm text-gray-500">john.doe@example.com</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 transition">
            <span className="material-symbols-outlined text-blue-500">
              calendar_month
            </span>
            Calendario
          </button>
          <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 transition">
            <span className="material-symbols-outlined">tune</span>
            Filtros
          </button>
          <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 transition">
            <span className="material-symbols-outlined">settings</span>
            Configuración
          </button>
        </nav>

        <div className="mt-auto">
          <h3 className="text-sm font-semibold mt-6 mb-2">Filtros</h3>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3">
            <option>Prioridad: Todas</option>
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4">
            <option>Proyecto: Todos</option>
          </select>
          <button
            onClick={onLogout}
            className="w-full py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        {/* 🔹 Encabezado con botón a la derecha */}
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-50 z-10 pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Panel de Tareas</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                       text-white px-5 py-2 rounded-md shadow transition"
          >
            <span className="material-symbols-outlined">add</span>
            Nueva Tarea
          </button>
        </div>

        {/* 🔹 Columnas horizontales scrollables */}
        <div className="flex gap-6 overflow-x-auto pb-6">
          {COLUMNS.map(({ key, title, color }) => (
            <div
              key={key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(key)}
              className="flex-shrink-0 w-[280px]"
            >
              <h2 className={`text-center font-semibold mb-3 ${color}`}>
                {title}
              </h2>
              <div
                className="rounded-lg bg-white border border-gray-200 p-4 min-h-[400px] shadow-sm"
              >
                {key !== "delete" ? (
                  (cols[key] || []).length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {cols[key].map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onDragStart={handleDragStart}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-400 text-sm py-6">
                      Sin tareas
                    </p>
                  )
                ) : (
                  <div className="flex justify-center items-center h-[120px] rounded-md border-2 border-dashed border-red-400 bg-red-50">
                    <span className="text-red-600 font-semibold text-sm text-center px-2">
                      Arrastra aquí para eliminar
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de nueva tarea */}
      <NewTaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}