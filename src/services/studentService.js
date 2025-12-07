/**
 * Student Service - CRUD de Estudiantes
 */

import { apiClient } from './apiClient.js';

class StudentService {
  async getAllStudents() {
    try {
      const response = await apiClient.get('/students');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getStudentById(id) {
    try {
      const response = await apiClient.get(`/students/${id}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createStudent(studentData) {
    try {
      const response = await apiClient.post('/students', studentData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateStudent(id, studentData) {
    try {
      const response = await apiClient.put(`/students/${id}`, studentData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteStudent(id) {
    try {
      const response = await apiClient.delete(`/students/${id}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getStudentsByQuarter(quarterId) {
    try {
      const response = await apiClient.get(`/students?quarter=${quarterId}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getStudentsByGroup(groupId) {
    try {
      const response = await apiClient.get(`/students?group=${groupId}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async searchStudents(query) {
    try {
      const response = await apiClient.get(`/students/search?q=${query}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getStudentSubjects(studentId) {
    try {
      const response = await apiClient.get(`/students/${studentId}/subjects`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getStudentGroups(studentId) {
    try {
      const response = await apiClient.get(`/students/${studentId}/groups`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async enrollStudentToGroup(studentId, groupId) {
    try {
      const response = await apiClient.post(`/students/${studentId}/groups/${groupId}`, {});
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const studentService = new StudentService();
export default StudentService;
