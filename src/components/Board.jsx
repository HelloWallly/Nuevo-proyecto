// ===============================================================
//  Board.jsx — Panel de Gestión de Tareas (Blue Team Professional UI v2.1)
// ===============================================================
//  ✔ Tema oscuro elegante (azul marino y cian profesional)
//  ✔ Branding NEXEUS–SIGMA en el sidebar
//  ✔ Interfaz tipo SOC dashboard
//  ✔ Drag & Drop funcional con Firestore
//  ✔ Columnas compactas, limpias y fluidas
// ===============================================================

import React, { useEffect, useState } from "react";
import { getAllTasks, saveTask, updateTask, removeTask } from "../firestoreTasks";

// ---------- Configuración de prioridades ----------
const PRIORITY_META = {
  high: { label: "Alta", color: "bg-red-500" },
  medium: { label: "Media", color: "bg-yellow-400" },
  low: { label: "Baja", color: "bg-green-400" },
};

// ---------- Columnas ----------
const COLUMNS = [
  { key: "todo", title: "Por Hacer", color: "text-blue-400" },
  { key: "inProgress", title: "En Progreso", color: "text-yellow-400" },
  { key: "done", title: "Hechas", color: "text-green-400" },
  { key: "delete", title: "Eliminar", color: "text-red-400" },
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
      className="bg-[#112240] p-3 rounded-lg border border-[#1E3A5F]
                 hover:border-[#3B82F6] hover:shadow-md transition cursor-grab
                 active:cursor-grabbing text-sm"
    >
      <p className="font-semibold text-[#E6F1FF] leading-snug">
        {task.content}
      </p>
      <div className="flex justify-between items-center mt-2 text-xs text-[#A8B2D1]">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${pr.color}`} />
          <span>Prioridad {pr.label}</span>
        </div>
        <span>{task.dueDate ? `Vence: ${task.dueDate}` : "Sin fecha"}</span>
      </div>
    </div>
  );
}

// ===============================================================
//                     MODAL NUEVA TAREA
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#0A192F] p-6 rounded-lg shadow-lg border border-[#1E3A5F] w-[90%] max-w-sm text-[#E6F1FF]">
        <h2 className="text-lg font-semibold mb-4 text-[#64FFDA]">Nueva Tarea</h2>

        <input
          className="w-full border border-[#1E3A5F] bg-[#112240] rounded-md px-3 py-2 mb-3 text-sm text-white focus:ring-2 focus:ring-[#64FFDA] outline-none"
          placeholder="Descripción de la tarea..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3 mb-4">
          <select
            className="border border-[#1E3A5F] bg-[#112240] text-white rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#64FFDA] outline-none"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
          <input
            type="date"
            className="border border-[#1E3A5F] bg-[#112240] text-white rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#64FFDA] outline-none"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[#1E3A5F] hover:bg-[#22385D] text-sm transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              if (!content.trim()) return;
              onCreate({ content, priority, dueDate });
            }}
            className="px-4 py-2 rounded-md bg-[#64FFDA] hover:bg-[#5FEAC8] text-[#0A192F] font-semibold text-sm transition"
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

  // Cargar tareas
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

  // Drag & Drop
  const handleDragStart = (task) => setDraggedTask(task);

  const handleDrop = async (columnKey) => {
    if (!draggedTask) return;

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

  // Crear tarea
  const handleCreate = async ({ content, priority, dueDate }) => {
    const payload = { content, priority, dueDate, status: "todo" };
    const saved = await saveTask(uid, payload);
    setCols((prev) => ({ ...prev, todo: [...prev.todo, saved] }));
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0A192F] text-[#E6F1FF] text-[14px]">
      {/* Sidebar */}
      <aside className="w-56 bg-[#112240] border-r border-[#1E3A5F] p-5 flex flex-col">
        {/* 🔹 Branding NEXEUS–SIGMA */}
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-[#64FFDA] text-xl font-extrabold tracking-widest">
            Nexeus<span className="text-[#3B82F6]">–Sigma</span>
          </h1>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-2 text-sm">
          <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#1E3A5F] transition">
            <span className="material-symbols-outlined text-blue-400 text-base">calendar_month</span>
            Calendario
          </button>
          <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#1E3A5F] transition">
            <span className="material-symbols-outlined text-base text-[#64FFDA]">tune</span>
            Filtros
          </button>
          <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#1E3A5F] transition">
            <span className="material-symbols-outlined text-base text-[#A8B2D1]">settings</span>
            Configuración
          </button>
        </nav>

        <div className="mt-auto">
          <h3 className="text-xs font-semibold mt-4 mb-2 text-[#64FFDA]">Filtros</h3>
          <select className="w-full border border-[#1E3A5F] bg-[#112240] text-[#E6F1FF] rounded-md px-2 py-1.5 text-xs mb-2">
            <option>Prioridad: Todas</option>
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
          <select className="w-full border border-[#1E3A5F] bg-[#112240] text-[#E6F1FF] rounded-md px-2 py-1.5 text-xs mb-3">
            <option>Proyecto: Todos</option>
          </select>
          <button
            onClick={onLogout}
            className="w-full py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold tracking-tight text-[#64FFDA]">Panel de Tareas</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-md shadow text-sm transition"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Nueva Tarea
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map(({ key, title, color }) => (
            <div
              key={key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(key)}
              className="flex-shrink-0 w-[230px]"
            >
              <h2 className={`text-center font-semibold mb-2 text-sm ${color}`}>{title}</h2>
              <div className="rounded-md bg-[#112240] border border-[#1E3A5F] p-3 min-h-[280px] shadow-sm">
                {key !== "delete" ? (
                  (cols[key] || []).length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {cols[key].map((task) => (
                        <TaskCard key={task.id} task={task} onDragStart={handleDragStart} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-[#5C6C84] text-xs py-3">Sin tareas</p>
                  )
                ) : (
                  <div className="flex justify-center items-center h-[100px] rounded-md border-2 border-dashed border-red-500/50 bg-[#1E1E2F]">
                    <span className="text-red-400 font-semibold text-xs text-center px-2">
                      Arrastra aquí para eliminar
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      <NewTaskModal open={showModal} onClose={() => setShowModal(false)} onCreate={handleCreate} />
    </div>
  );
}