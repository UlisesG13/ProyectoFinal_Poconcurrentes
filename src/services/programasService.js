import { apiClient } from './apiClient.js';

export async function createPrograma(data) {
  const programData = {
    nombre: data.name,
    numero_cuatrimestres: data.quarters
  };
  return apiClient.post('/programas', programData);
}

export async function getProgramas() {
  return apiClient.get('/programas');
}

export async function getPrograma(id) {
  return apiClient.get(`/programas/${id}`);
}

export async function updatePrograma(id, programData) {
  return apiClient.put(`/programas/${id}`, programData);
}

export async function deletePrograma(id) {
  return apiClient.delete(`/programas/${id}`);
}
