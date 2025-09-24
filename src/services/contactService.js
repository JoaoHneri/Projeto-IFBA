import { apiClient } from './api.js';

class ContactService {

  async sendContactMessage(contactData) {
    return apiClient.post('/contact', contactData);
  }
}

export const contactService = new ContactService();
export default contactService;