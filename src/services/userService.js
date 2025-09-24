import { apiClient } from './api.js';

class UserService {

  async listUsers(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/users?${queryParams}` : '/users';
    return apiClient.get(endpoint);
  }

  async createUser(userData) {
    return apiClient.post('/users', userData);
  }

  async getUser(userId) {
    return apiClient.get(`/users/${userId}`);
  }

  async updateUser(userId, userData) {
    return apiClient.put(`/users/${userId}`, userData);
  }

  async deleteUser(userId) {
    return apiClient.delete(`/users/${userId}`);
  }
}

export const userService = new UserService();
export default userService;