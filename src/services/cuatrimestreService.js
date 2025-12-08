import { apiClient } from './apiClient.js';

export async function createCuatrimestre(data) {
  return apiClient.post('/cuatrimestres', data);
}

export async function getCuatrimestres() {
  return apiClient.get('/cuatrimestres');
}

export async function getCuatrimestresByPrograma(programaId) {
  const cuatrimestres = await apiClient.get('/cuatrimestres');
  return cuatrimestres.filter((c) => c.programa_id === programaId);
}

export async function updateCuatrimestre(id, data) {
  return apiClient.put(`/cuatrimestres/${id}`, data);
}

export async function deleteCuatrimestre(id) {
  return apiClient.delete(`/cuatrimestres/${id}`);
}
