import { apiClient } from './apiClient.js';

export async function createGrupo(data) {
  const grupoData = {
    nombre: data.nombre,
    asignatura_id: data.asignatura_id,
    docente_id: data.docente_id,
    cuatrimestre_id: data.cuatrimestre_id,
    capacidad: data.capacidad
  };
  return apiClient.post('/grupos', grupoData);
}

export async function getGrupos() {
  return apiClient.get('/grupos');
}

export async function getGrupo(id) {
  return apiClient.get(`/grupos/${id}`);
}

export async function updateGrupo(id, data) {
  return apiClient.put(`/grupos/${id}`, data);
}

export async function deleteGrupo(id) {
  return apiClient.delete(`/grupos/${id}`);
}

export async function addStudentToGroup(grupoId, alumnoId) {
  return apiClient.post(`/grupos/${grupoId}/alumnos`, { alumno_id: alumnoId });
}

export async function getStudentsInGroup(grupoId) {
  return apiClient.get(`/grupos/${grupoId}/alumnos`);
}

export async function removeStudentFromGroup(grupoId, alumnoId) {
  return apiClient.delete(`/grupos/${grupoId}/alumnos/${alumnoId}`);
}
