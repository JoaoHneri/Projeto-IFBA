import { classifyError, isExpectedError, getFriendlyErrorMessage } from '../utils/errorTypes.js';

// Configuração base da API
const API_BASE_URL = "https://project-manager-backend-5wv2.onrender.com/" || 'http://localhost:3333/api';

// Log para debug
if (typeof window !== 'undefined') {
  console.log('API Base URL:', API_BASE_URL);
}

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    };

    if (config.body && typeof config.body !== 'string' && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body);
    }

    // Log da requisição para debug
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log(`Making ${config.method || 'GET'} request to:`, url);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const originalMessage = errorData.message || `HTTP error! status: ${response.status}`;

        // Classificar o erro
        const errorType = classifyError(response.status, originalMessage);
        const isExpected = isExpectedError(errorType, response.status);

        // Criar objeto de erro enriquecido
        const error = new Error(originalMessage);
        error.status = response.status;
        error.type = errorType;
        error.isExpected = isExpected;
        error.friendlyMessage = getFriendlyErrorMessage(errorType, originalMessage);

        // Log apenas erros inesperados
        if (!isExpected) {
          console.error(`Unexpected API error (${response.status}):`, originalMessage);
        } else {
          console.info(`Expected API response (${response.status}):`, originalMessage);
        }

        throw error;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return await response.text();
    } catch (error) {
      // Se o erro já foi processado acima, apenas re-lance
      if (error.type) {
        throw error;
      }

      // Tratar erros de rede
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        const networkError = new Error('Erro de conexão. Verifique sua internet ou se o servidor está funcionando.');
        networkError.type = 'NETWORK_ERROR';
        networkError.isExpected = false;
        networkError.friendlyMessage = 'Problema de conexão. Verifique sua internet e tente novamente.';

        console.error('Network error:', networkError.message);
        throw networkError;
      }

      // Para outros erros inesperados
      console.error('Unexpected API error:', error);
      error.type = 'SERVER_ERROR';
      error.isExpected = false;
      error.friendlyMessage = 'Ocorreu um erro inesperado. Tente novamente.';

      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  post(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: data,
      ...options,
    });
  }

  put(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data,
      ...options,
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }

  // Upload de arquivo
  upload(endpoint, file, additionalData = {}, options = {}) {
    const formData = new FormData();
    formData.append('file', file);

    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        // Remover Content-Type para FormData
        ...Object.fromEntries(
          Object.entries(options.headers || {}).filter(
            ([key]) => key.toLowerCase() !== 'content-type'
          )
        ),
      },
      ...options,
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;