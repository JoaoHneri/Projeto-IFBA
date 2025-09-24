import { apiClient } from './api.js';

class SearchService {

  async performSearch(query, filters = {}) {
    const queryParams = new URLSearchParams({
      q: query,
      ...filters,
    }).toString();
    return apiClient.get(`/search?${queryParams}`);
  }
}

export const searchService = new SearchService();
export default searchService;