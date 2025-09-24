'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">Acesso Negado</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Você não tem permissão para acessar esta página.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Esta área é restrita a usuários com privilégios administrativos ou gerenciais.
              Entre em contato com um administrador se você acredita que deveria ter acesso.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button onClick={() => window.history.back()} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}