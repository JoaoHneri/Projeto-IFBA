import { apiClient } from './api.js';

class ReportService {

  async getDashboard() {
    return apiClient.get('/reports/dashboard');
  }

  async getProjectsReport(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/reports/projects?${queryParams}` : '/reports/projects';
    return apiClient.get(endpoint);
  }

  async getProductivityReport(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/reports/productivity?${queryParams}` : '/reports/productivity';
    return apiClient.get(endpoint);
  }

  async getPerformanceReport(dateFilter) {
    return apiClient.get(`/reports/productivity?period=${dateFilter}`);
  }

  async exportReport(type, filters = {}) {
    const queryParams = new URLSearchParams({ ...filters, format: type }).toString();
    const response = await fetch(`${apiClient.baseURL}/reports/export?${queryParams}`, {
      credentials: 'include'
    });
    return response.blob();
  }

  async getPublicStats() {
    return apiClient.get('/reports/public-stats');
  }
}

export const reportService = new ReportService();
export default reportService;