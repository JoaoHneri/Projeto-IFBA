import { apiClient } from './api.js';

class TeamService {

  async listTeamMembers(teamId) {
    return apiClient.get(`/teams/${teamId}/members`);
  }

  async addTeamMember(teamId, memberData) {
    return apiClient.post(`/teams/${teamId}/members`, memberData);
  }

  async removeTeamMember(teamId, userId) {
    return apiClient.delete(`/teams/${teamId}/members/${userId}`);
  }
}

export const teamService = new TeamService();
export default teamService;