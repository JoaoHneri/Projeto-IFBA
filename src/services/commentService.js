import { apiClient } from './api.js';

class CommentService {

  async listCommentsForTask(taskId) {
    return apiClient.get(`/tasks/${taskId}/comments`);
  }

  async createComment(taskId, commentData) {
    return apiClient.post(`/tasks/${taskId}/comments`, commentData);
  }

  async deleteComment(commentId) {
    return apiClient.delete(`/comments/${commentId}`);
  }
}

export const commentService = new CommentService();
export default commentService;