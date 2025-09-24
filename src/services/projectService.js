import { apiClient } from './api.js';

class ProjectService {

  async listProjects(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/projects?${queryParams}` : '/projects';
    return apiClient.get(endpoint);
  }

  async createProject(projectData) {
    return apiClient.post('/projects', projectData);
  }

  async getProject(projectId) {
    return apiClient.get(`/projects/${projectId}`);
  }

  async updateProject(projectId, projectData) {
    return apiClient.put(`/projects/${projectId}`, projectData);
  }

  async deleteProject(projectId) {
    return apiClient.delete(`/projects/${projectId}`);
  }

  async finishProject(projectId) {
    return apiClient.post(`/projects/${projectId}/finish`);
  }
}

export const projectService = new ProjectService();
export default projectService;