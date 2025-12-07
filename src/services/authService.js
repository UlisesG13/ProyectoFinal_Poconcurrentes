/**
 * Auth Service - Login, Logout, Permisos
 */

import { apiClient } from './apiClient.js';

class AuthService {
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.token) {
        apiClient.setAuthToken(response.token);
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async logout() {
    try {
      await apiClient.post('/auth/logout', {});
      apiClient.setAuthToken(null);
      return { success: true };
    } catch (error) {
      apiClient.setAuthToken(null);
      return { success: true };
    }
  }

  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getCurrentUser() {
    try {
      const response = await apiClient.get('/auth/me');
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }

  getToken() {
    return localStorage.getItem('authToken');
  }
}

export const authService = new AuthService();
export default AuthService;
