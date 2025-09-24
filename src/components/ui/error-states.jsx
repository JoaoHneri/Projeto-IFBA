'use client';

import { AlertTriangle, Lock, Wifi, RefreshCw, LogIn } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';
import Link from 'next/link';
import { ErrorTypes } from '../../utils/errorTypes.js';

export function ErrorDisplay({ error, onRetry, className = '' }) {
  if (!error) return null;

  const getErrorIcon = (errorType) => {
    switch (errorType) {
      case ErrorTypes.PERMISSION:
        return <Lock className="w-12 h-12 text-yellow-500" />;
      case ErrorTypes.AUTHENTICATION:
        return <LogIn className="w-12 h-12 text-blue-500" />;
      case ErrorTypes.NETWORK:
        return <Wifi className="w-12 h-12 text-red-500" />;
      default:
        return <AlertTriangle className="w-12 h-12 text-gray-500" />;
    }
  };

  const getErrorColor = (errorType) => {
    switch (errorType) {
      case ErrorTypes.PERMISSION:
        return 'border-yellow-200 bg-yellow-50';
      case ErrorTypes.AUTHENTICATION:
        return 'border-blue-200 bg-blue-50';
      case ErrorTypes.NETWORK:
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <Card className={`${getErrorColor(error.type)} ${className}`}>
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          {getErrorIcon(error.type)}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {getErrorTitle(error.type)}
        </h3>

        <p className="text-gray-600 mb-6">
          {error.friendlyMessage || error.message}
        </p>

        <div className="flex justify-center space-x-3">
          {error.type === ErrorTypes.AUTHENTICATION && (
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <LogIn className="w-4 h-4 mr-2" />
                Fazer Login
              </Button>
            </Link>
          )}

          {(error.type === ErrorTypes.NETWORK || error.type === ErrorTypes.SERVER) && onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
          )}

          {error.type === ErrorTypes.PERMISSION && (
            <Button onClick={() => window.history.back()} variant="outline">
              Voltar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function getErrorTitle(errorType) {
  switch (errorType) {
    case ErrorTypes.PERMISSION:
      return 'Acesso Negado';
    case ErrorTypes.AUTHENTICATION:
      return 'Login Necessário';
    case ErrorTypes.NETWORK:
      return 'Problema de Conexão';
    case ErrorTypes.SERVER:
      return 'Erro do Servidor';
    case ErrorTypes.NOT_FOUND:
      return 'Não Encontrado';
    default:
      return 'Erro';
  }
}

// Componente mais simples para mensagens inline
export function InlineError({ error, onRetry, size = 'default' }) {
  if (!error) return null;

  const sizeClasses = {
    small: 'p-3 text-sm',
    default: 'p-4',
    large: 'p-6 text-lg'
  };

  return (
    <div className={`rounded-lg border ${getErrorColor(error.type)} ${sizeClasses[size]}`}>
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {getErrorIcon(error.type, size === 'small' ? 'w-5 h-5' : 'w-6 h-6')}
        </div>

        <div className="flex-1">
          <p className="font-medium text-gray-900">
            {getErrorTitle(error.type)}
          </p>
          <p className="text-gray-600 mt-1">
            {error.friendlyMessage || error.message}
          </p>
        </div>

        {onRetry && (error.type === ErrorTypes.NETWORK || error.type === ErrorTypes.SERVER) && (
          <Button size="sm" variant="outline" onClick={onRetry}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function getErrorIcon(errorType, sizeClass = 'w-6 h-6') {
  const className = `${sizeClass} text-current`;

  switch (errorType) {
    case ErrorTypes.PERMISSION:
      return <Lock className={`${className} text-yellow-600`} />;
    case ErrorTypes.AUTHENTICATION:
      return <LogIn className={`${className} text-blue-600`} />;
    case ErrorTypes.NETWORK:
      return <Wifi className={`${className} text-red-600`} />;
    default:
      return <AlertTriangle className={`${className} text-gray-600`} />;
  }
}

function getErrorColor(errorType) {
  switch (errorType) {
    case ErrorTypes.PERMISSION:
      return 'border-yellow-200 bg-yellow-50';
    case ErrorTypes.AUTHENTICATION:
      return 'border-blue-200 bg-blue-50';
    case ErrorTypes.NETWORK:
      return 'border-red-200 bg-red-50';
    default:
      return 'border-gray-200 bg-gray-50';
  }
}