/**
 * Teacher Service - CRUD de Docentes
 */

import { apiClient } from './apiClient.js';

class TeacherService {
  async getAllTeachers() {
    try {
      const response = await apiClient.get('/teachers');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getTeacherById(id) {
    try {
      const response = await apiClient.get(`/teachers/${id}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createTeacher(teacherData) {
    try {
      const response = await apiClient.post('/teachers', teacherData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateTeacher(id, teacherData) {
    try {
      const response = await apiClient.put(`/teachers/${id}`, teacherData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteTeacher(id) {
    try {
      const response = await apiClient.delete(`/teachers/${id}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getTeachersByQuarter(quarterId) {
    try {
      const response = await apiClient.get(`/teachers?quarter=${quarterId}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async searchTeachers(query) {
    try {
      const response = await apiClient.get(`/teachers/search?q=${query}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getTeacherSubjects(teacherId) {
    try {
      const response = await apiClient.get(`/teachers/${teacherId}/subjects`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getTeacherGroups(teacherId) {
    try {
      const response = await apiClient.get(`/teachers/${teacherId}/groups`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const teacherService = new TeacherService();
export default TeacherService;
