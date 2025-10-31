// ===============================================================
// firestoreTasks.js — Funciones CRUD para tareas en Firestore
// ===============================================================

import { db } from "./lib/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

/**
 * 🔹 Obtener todas las tareas de un usuario
 * @param {string} uid - ID del usuario en Firebase
 * @returns {Array} Lista de tareas con id y datos
 */
export async function getAllTasks(uid) {
  const snapshot = await getDocs(collection(db, "sigma", uid, "tasks"));
  // 🔹 Convertir documentos en objetos con id incluido
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/**
 * 🔹 Guardar una nueva tarea para un usuario
 * @param {string} uid - ID del usuario
 * @param {Object} task - Objeto de la tarea
 * @returns {Object} Tarea guardada con ID asignado
 */
export async function saveTask(uid, task) {
  const ref = await addDoc(collection(db, "sigma", uid, "tasks"), task);
  return { id: ref.id, ...task };
}

/**
 * 🔹 Actualizar una tarea existente
 * @param {string} uid - ID del usuario
 * @param {string} taskId - ID de la tarea a actualizar
 * @param {Object} data - Campos a actualizar
 */
export async function updateTask(uid, taskId, data) {
  await updateDoc(doc(db, "sigma", uid, "tasks", taskId), data);
}

/**
 * 🔹 Eliminar una tarea de un usuario
 * @param {string} uid - ID del usuario
 * @param {string} taskId - ID de la tarea a eliminar
 */
export async function removeTask(uid, taskId) {
  await deleteDoc(doc(db, "sigma", uid, "tasks", taskId));
}