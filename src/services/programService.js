/**
 * Program Service - Programas, Trimestres, Asignaturas
 */

import { apiClient } from './apiClient.js';

class ProgramService {
  async getAllPrograms() {
    try {
      const response = await apiClient.get('/programs');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getProgramById(id) {
    try {
      const response = await apiClient.get(`/programs/${id}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createProgram(programData) {
    try {
      const response = await apiClient.post('/programs', programData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateProgram(id, programData) {
    try {
      const response = await apiClient.put(`/programs/${id}`, programData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteProgram(id) {
    try {
      const response = await apiClient.delete(`/programs/${id}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getProgramQuarters(programId) {
    try {
      const response = await apiClient.get(`/programs/${programId}/quarters`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getQuarterSubjects(programId, quarterId) {
    try {
      const response = await apiClient.get(`/programs/${programId}/quarters/${quarterId}/subjects`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const programService = new ProgramService();
export default ProgramService;
