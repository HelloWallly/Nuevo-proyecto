// ===============================================================
// Column.jsx — Columna droppable compacta (dark)
// ===============================================================

import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function Column({ columnId, column }) {
  return (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`rounded-xl flex flex-col border ${
            snapshot.isDraggingOver ? "bg-[#1e2a38]" : "bg-[#1a2027]"
          } border-[#283039]`}
          style={{ minHeight: 320, padding: 10 }}
        >
          <div className="flex flex-col gap-2 flex-1">
            {Array.isArray(column.items) && column.items.length > 0 ? (
              column.items.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} columnId={columnId} />
              ))
            ) : (
              <p className="text-[#67707a] text-xs text-center py-8 italic">
                No hay tareas
              </p>
            )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}