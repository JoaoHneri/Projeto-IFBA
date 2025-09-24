import { apiClient } from './api.js';

class CategoryService {

  async listCategories() {
    return apiClient.get('/categories');
  }

  async getCategory(categoryId) {
    return apiClient.get(`/categories/${categoryId}`);
  }

  async createCategory(categoryData) {
    return apiClient.post('/categories', categoryData);
  }

  async updateCategory(categoryId, categoryData) {
    return apiClient.put(`/categories/${categoryId}`, categoryData);
  }

  async deleteCategory(categoryId) {
    return apiClient.delete(`/categories/${categoryId}`);
  }
}

export const categoryService = new CategoryService();
export default categoryService;