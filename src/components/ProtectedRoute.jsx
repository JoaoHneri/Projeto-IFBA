'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({
  children,
  requireAuth = true,
  requireAdmin = false,
  requireManager = false,
  redirectTo = '/login'
}) {
  const { user, loading, isAdmin, canManage } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (requireAuth && !user) {
      router.push(redirectTo);
      return;
    }

    if (requireAdmin && !isAdmin) {
      router.push('/unauthorized');
      return;
    }

    if (requireManager && !canManage) {
      router.push('/unauthorized');
      return;
    }
  }, [user, loading, router, requireAuth, requireAdmin, requireManager, isAdmin, canManage, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) return null;
  if (requireAdmin && !isAdmin) return null;
  if (requireManager && !canManage) return null;

  return children;
}