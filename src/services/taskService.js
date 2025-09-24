import { apiClient } from './api.js';

class TaskService {

  async listTasksForProject(projectId, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams
      ? `/projects/${projectId}/tasks?${queryParams}`
      : `/projects/${projectId}/tasks`;
    return apiClient.get(endpoint);
  }

  async createTaskInProject(projectId, taskData) {
    return apiClient.post(`/projects/${projectId}/tasks`, taskData);
  }

  async getTask(taskId) {
    return apiClient.get(`/tasks/${taskId}`);
  }

  async updateTask(taskId, taskData) {
    return apiClient.put(`/tasks/${taskId}`, taskData);
  }

  async deleteTask(taskId) {
    return apiClient.delete(`/tasks/${taskId}`);
  }

  async uploadAttachment(taskId, file) {
    return apiClient.upload(`/${taskId}/attachments`, file);
  }

  async resizeAttachment(attachmentId, width) {
    return apiClient.post(`/attachments/${attachmentId}/resize?width=${width}`);
  }
}

export const taskService = new TaskService();
export default taskService;