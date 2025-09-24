import { apiClient } from './api.js';

class TimelogService {

  async listTimeLogsForTask(taskId) {
    return apiClient.get(`/tasks/${taskId}/timelogs`);
  }

  async createTimeLog(taskId, timelogData) {
    return apiClient.post(`/tasks/${taskId}/timelogs`, timelogData);
  }

  async deleteTimeLog(timelogId) {
    return apiClient.delete(`/timelogs/${timelogId}`);
  }
}

export const timelogService = new TimelogService();
export default timelogService;