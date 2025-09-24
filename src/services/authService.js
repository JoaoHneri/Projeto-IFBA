import { apiClient } from './api.js';

class AuthService {

  async register(userData) {
    return apiClient.post('/auth/register', userData);
  }

  async login(credentials) {
    return apiClient.post('/auth/login', credentials);
  }

  async logout() {
    return apiClient.post('/auth/logout');
  }

  async getCurrentUser() {
    return apiClient.get('/auth/me');
  }

  async updateProfile(profileData) {
    return apiClient.put('/auth/me', profileData);
  }

  async updatePreferences(preferences) {
    return apiClient.put('/auth/me/preferences', preferences);
  }

  async changePassword(passwordData) {
    return apiClient.put('/auth/change-password', passwordData);
  }
}

export const authService = new AuthService();
export default authService;