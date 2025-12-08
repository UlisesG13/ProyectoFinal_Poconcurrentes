/**
 * Teacher Service - CRUD de Docentes
 */

import { apiClient } from './apiClient.js';

export async function createDocente(data) {
  const docenteData = {
    nombre: data.nombre,
    correo: data.correo
  };
  return apiClient.post('/docentes', docenteData);
}

export async function getDocentes() {
  return apiClient.get('/docentes');
}

export async function getDocente(id) {
  return apiClient.get(`/docentes/${id}`);
}

export async function updateDocente(id, data) {
  return apiClient.put(`/docentes/${id}`, data);
}

export async function deleteDocente(id) {
  return apiClient.delete(`/docentes/${id}`);
}

