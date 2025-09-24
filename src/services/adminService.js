import { apiClient } from './api.js';

class AdminService {

  async listAuditLogs(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/admin/audit/log?${queryParams}` : '/admin/audit/log';
    return apiClient.get(endpoint);
  }

  async listTaskStatuses() {
    return apiClient.get('/admin/task-statuses');
  }

  async createTaskStatus(statusData) {
    return apiClient.post('/admin/task-statuses', statusData);
  }

  async deleteTaskStatus(statusId) {
    return apiClient.delete(`/admin/task-statuses/${statusId}`);
  }

  async listTags() {
    return apiClient.get('/admin/tags');
  }

  async createTag(tagData) {
    return apiClient.post('/admin/tags', tagData);
  }

  async deleteTag(tagId) {
    return apiClient.delete(`/admin/tags/${tagId}`);
  }
}

export const adminService = new AdminService();
export default adminService;