/**
 * Platform Service - Integración Moodle
 */

import { apiClient } from './apiClient.js';

class PlatformService {
  async checkConnection() {
    try {
      const response = await apiClient.get('/platform/check-connection');
      return { success: true, connected: true, data: response };
    } catch (error) {
      return { success: false, connected: false, error: error.message };
    }
  }

  async configureConnection(config) {
    try {
      const response = await apiClient.post('/platform/configure', config);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getMoodleCourses() {
    try {
      const response = await apiClient.get('/platform/courses');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createMoodleCourse(courseData) {
    try {
      const response = await apiClient.post('/platform/courses', courseData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async checkCourseExists(courseCode) {
    try {
      const response = await apiClient.get(`/platform/courses/check?code=${courseCode}`);
      return { success: true, exists: response.exists, data: response };
    } catch (error) {
      return { success: false, exists: false, error: error.message };
    }
  }

  async syncSubject(subjectId, moodleCourseId) {
    try {
      const response = await apiClient.post('/platform/sync-subject', {
        subjectId,
        moodleCourseId
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async syncGroup(groupId, moodleCourseId) {
    try {
      const response = await apiClient.post('/platform/sync-group', {
        groupId,
        moodleCourseId
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async enrollTeacher(teacherId, moodleCourseId) {
    try {
      const response = await apiClient.post('/platform/enroll-teacher', {
        teacherId,
        moodleCourseId
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async enrollStudents(studentIds, moodleCourseId) {
    try {
      const response = await apiClient.post('/platform/enroll-students', {
        studentIds,
        moodleCourseId
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getMoodleUsers() {
    try {
      const response = await apiClient.get('/platform/users');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createMoodleUser(userData) {
    try {
      const response = await apiClient.post('/platform/users', userData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async fullGroupSync(groupId, moodleCourseId) {
    try {
      const response = await apiClient.post('/platform/full-sync', {
        groupId,
        moodleCourseId
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getSyncStatus(groupId) {
    try {
      const response = await apiClient.get(`/platform/sync-status/${groupId}`);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getSyncReports() {
    try {
      const response = await apiClient.get('/platform/sync-reports');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async disconnect() {
    try {
      const response = await apiClient.post('/platform/disconnect', {});
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const platformService = new PlatformService();
export default PlatformService;
