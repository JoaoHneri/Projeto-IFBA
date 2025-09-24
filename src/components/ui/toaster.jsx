'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const toasts = [];
let toastId = 0;

export function toast(message, type = 'info', duration = 5000) {
  const id = ++toastId;
  const newToast = { id, message, type, duration };

  toasts.push(newToast);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('toast', { detail: newToast }));
  }

  setTimeout(() => {
    const index = toasts.findIndex(t => t.id === id);
    if (index > -1) {
      toasts.splice(index, 1);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('toast-remove', { detail: { id } }));
      }
    }
  }, duration);
}

toast.success = (message, duration) => toast(message, 'success', duration);
toast.error = (message, duration) => toast(message, 'error', duration);
toast.warning = (message, duration) => toast(message, 'warning', duration);
toast.info = (message, duration) => toast(message, 'info', duration);

function ToastItem({ toast: toastItem, onRemove }) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  };

  const Icon = icons[toastItem.type];

  return (
    <div className={`p-4 rounded-lg border shadow-lg flex items-start space-x-3 ${colors[toastItem.type]} animate-in slide-in-from-right-5`}>
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColors[toastItem.type]}`} />
      <p className="flex-1 text-sm font-medium">{toastItem.message}</p>
      <button
        onClick={() => onRemove(toastItem.id)}
        className="flex-shrink-0 hover:bg-black/10 rounded p-1 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function Toaster() {
  const [toastList, setToastList] = useState([]);

  useEffect(() => {
    const handleToast = (event) => {
      setToastList(prev => [...prev, event.detail]);
    };

    const handleToastRemove = (event) => {
      setToastList(prev => prev.filter(t => t.id !== event.detail.id));
    };

    window.addEventListener('toast', handleToast);
    window.addEventListener('toast-remove', handleToastRemove);

    return () => {
      window.removeEventListener('toast', handleToast);
      window.removeEventListener('toast-remove', handleToastRemove);
    };
  }, []);

  const removeToast = (id) => {
    setToastList(prev => prev.filter(t => t.id !== id));
  };

  if (toastList.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md w-full">
      {toastList.map((toastItem) => (
        <ToastItem
          key={toastItem.id}
          toast={toastItem}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
}