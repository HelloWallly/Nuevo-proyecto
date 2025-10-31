// ===============================================================
// TaskCard.jsx — Componente de tarjeta individual del tablero Kanban
// ===============================================================

import React from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function TaskCard({ task, index, columnId, setConfirmDeleteTask, setHoursModal }) {
  return (
    // 🔹 Componente draggable para arrastrar la tarjeta dentro del tablero
    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}           // 🔹 Referencia para Drag & Drop
          {...provided.draggableProps}       // 🔹 Props necesarios para drag
          {...provided.dragHandleProps}      // 🔹 Props del handle de arrastre
          className={`
            bg-white border border-gray-300 p-3 rounded-lg flex flex-col gap-1 text-left
            shadow-sm max-w-[280px] w-full mx-auto relative
            transition-transform duration-150 ease-out
            ${snapshot.isDragging ? "shadow-lg" : "shadow-sm"}  // 🔹 Sombra más intensa al arrastrar
          `}
        >
          {/* 🔹 Header: Título de la tarea + botón de eliminar */}
          <div className="flex justify-between items-start relative">
            <h4 className="font-semibold text-gray-800 text-left text-base">{task.content}</h4>
            {setConfirmDeleteTask && (
              <span
                className="absolute right-[8px] top-0 text-black font-bold cursor-pointer"
                onClick={() =>
                  setConfirmDeleteTask({ columnId, taskId: task.id, content: task.content })
                }
              >
                ✕
              </span>
            )}
          </div>

          {/* 🔹 Información de la tarea */}
          <div className="text-xs text-gray-600">
            <p>Responsable: {task.responsible || "-"}</p>
            <p>Creación: {task.creationDate || "-"}</p>
            <p>Fecha límite: {task.dueDate || "-"}</p>
          </div>

          {/* 🔹 Botón de añadir horas a la tarea */}
          {setHoursModal && (
            <div className="flex justify-center mt-1">
              <button
                className="text-green-600 hover:text-green-800 text-xs py-1 px-3 rounded-md font-medium border border-green-400 hover:border-green-600 transition"
                onClick={() =>
                  setHoursModal({ columnId, taskId: task.id, date: "", hours: "", minutes: "", note: "" })
                }
              >
                Añadir horas
              </button>
            </div>
          )}

          {/* 🔹 Visualización del timesheet si existen horas añadidas */}
          {task.timesheet?.length > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              {task.timesheet.map((entry, i) => (
                <div key={i}>
                  {entry.date}: {entry.hours}h {entry.minutes}m {entry.note && `- ${entry.note}`}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
