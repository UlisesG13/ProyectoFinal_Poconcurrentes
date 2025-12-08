import { apiClient } from './apiClient.js';

export async function getAsignaturas() {
  return apiClient.get('/asignaturas');
}

export async function getAsignatura(id) {
  return apiClient.get(`/asignaturas/${id}`);
}

export async function createAsignatura(data) {
  return apiClient.post('/asignaturas', data);
}

export async function updateAsignatura(id, data) {
  return apiClient.put(`/asignaturas/${id}`, data);
}

export async function deleteAsignatura(id) {
  return apiClient.delete(`/asignaturas/${id}`);
}
