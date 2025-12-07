/**
 * Group Service - CRUD de Grupos
 */

import { apiClient } from './apiClient.js';

class GroupService {
  async getAllGroups() {
    try {
      const response = await apiClient.get('/groups');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getGroupById(id) {
    try {
      const response = await apiClient.get(`/groups/${id}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createGroup(groupData) {
    try {
      const response = await apiClient.post('/groups', groupData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateGroup(id, groupData) {
    try {
      const response = await apiClient.put(`/groups/${id}`, groupData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteGroup(id) {
    try {
      const response = await apiClient.delete(`/groups/${id}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getGroupsBySubject(subjectId) {
    try {
      const response = await apiClient.get(`/groups?subject=${subjectId}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getGroupsByTeacher(teacherId) {
    try {
      const response = await apiClient.get(`/groups?teacher=${teacherId}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getGroupStudents(groupId) {
    try {
      const response = await apiClient.get(`/groups/${groupId}/students`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async addStudentToGroup(groupId, studentId) {
    try {
      const response = await apiClient.post(`/groups/${groupId}/students/${studentId}`, {});
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async removeStudentFromGroup(groupId, studentId) {
    try {
      const response = await apiClient.delete(`/groups/${groupId}/students/${studentId}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async searchGroups(query) {
    try {
      const response = await apiClient.get(`/groups/search?q=${query}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const groupService = new GroupService();
export default GroupService;
