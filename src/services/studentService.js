/**
 * Student Service - CRUD de Alumnos
 */

import { apiClient } from './apiClient.js';

export async function createAlumno(data) {
  const alumnoData = {
    nombre: data.nombre,
    matricula: data.matricula,
    cuatrimestre: data.cuatrimestre,
    correo: data.correo
  };
  return apiClient.post('/alumnos', alumnoData);
}

export async function getAlumnos() {
  return apiClient.get('/alumnos');
}

export async function getAlumno(id) {
  return apiClient.get(`/alumnos/${id}`);
}

export async function updateAlumno(id, data) {
  return apiClient.put(`/alumnos/${id}`, data);
}

export async function deleteAlumno(id) {
  return apiClient.delete(`/alumnos/${id}`);
}

