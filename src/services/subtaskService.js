import { apiClient } from './api.js';

class SubtaskService {

  async listSubtasks(taskId) {
    return apiClient.get(`/tasks/${taskId}/subtasks`);
  }

  async createSubtask(taskId, subtaskData) {
    return apiClient.post(`/tasks/${taskId}/subtasks`, subtaskData);
  }

  async updateSubtask(subtaskId, subtaskData) {
    return apiClient.put(`/subtasks/${subtaskId}`, subtaskData);
  }

  async deleteSubtask(subtaskId) {
    return apiClient.delete(`/subtasks/${subtaskId}`);
  }
}

export const subtaskService = new SubtaskService();
export default subtaskService;