'use client';

import { useState, useEffect } from 'react';
import { ErrorTypes } from '../utils/errorTypes.js';

export function useApi(apiFunction, dependencies = [], options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!options.skip);
  const [error, setError] = useState(null);

  const fetchData = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      // Diferentes tratamentos baseados no tipo de erro
      const errorInfo = {
        message: err.message,
        type: err.type || ErrorTypes.SERVER,
        status: err.status,
        isExpected: err.isExpected || false,
        friendlyMessage: err.friendlyMessage || err.message
      };

      setError(errorInfo);

      // Apenas resetar dados para erros inesperados de rede ou servidor
      if (!err.isExpected && (err.type === ErrorTypes.NETWORK || err.type === ErrorTypes.SERVER)) {
        setData(null);
      }

      return { success: false, error: errorInfo };
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => fetchData();

  useEffect(() => {
    if (!options.skip) {
      fetchData();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch,
    fetchData
  };
}

export function useAsyncAction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (asyncFunction, ...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction(...args);
      return { success: true, data: result };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, execute, setError };
}