// Tipos de erro da aplicação
export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  PERMISSION: 'PERMISSION_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  AUTHENTICATION: 'AUTHENTICATION_ERROR',
  SERVER: 'SERVER_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR'
};

// Classificar erro baseado no status e mensagem
export function classifyError(status, message) {
  if (status === 401) {
    return ErrorTypes.AUTHENTICATION;
  }

  if (status === 403) {
    return ErrorTypes.PERMISSION;
  }

  if (status === 404) {
    return ErrorTypes.NOT_FOUND;
  }

  if (status >= 400 && status < 500) {
    return ErrorTypes.VALIDATION;
  }

  if (status >= 500) {
    return ErrorTypes.SERVER;
  }

  if (message.includes('Failed to fetch') || message.includes('conexão')) {
    return ErrorTypes.NETWORK;
  }

  return ErrorTypes.SERVER;
}

// Verificar se é um erro que deve ser mostrado silenciosamente
export function isExpectedError(errorType, status) {
  const expectedErrors = [
    ErrorTypes.AUTHENTICATION,
    ErrorTypes.PERMISSION,
    ErrorTypes.VALIDATION
  ];

  return expectedErrors.includes(errorType);
}

// Obter mensagem amigável para o usuário
export function getFriendlyErrorMessage(errorType, originalMessage) {
  switch (errorType) {
    case ErrorTypes.AUTHENTICATION:
      return 'Você precisa fazer login para acessar esta funcionalidade.';

    case ErrorTypes.PERMISSION:
      return 'Você não tem permissão para realizar esta ação.';

    case ErrorTypes.VALIDATION:
      return originalMessage || 'Os dados fornecidos são inválidos.';

    case ErrorTypes.NETWORK:
      return 'Problema de conexão. Verifique sua internet e tente novamente.';

    case ErrorTypes.NOT_FOUND:
      return 'O recurso solicitado não foi encontrado.';

    case ErrorTypes.SERVER:
      return 'Erro interno do servidor. Tente novamente em alguns instantes.';

    default:
      return originalMessage || 'Ocorreu um erro inesperado.';
  }
}