'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorDisplay, InlineError } from '@/components/ui/error-states';
import { authService } from '@/services';
import { useAsyncAction } from '@/hooks/useApi';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { loading, error, execute, setError } = useAsyncAction();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Por favor, digite seu e-mail');
      return;
    }

    const result = await execute(authService.forgotPassword, { email });
    if (result.success) {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-md mx-auto px-4">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <CardTitle>Recuperar Senha</CardTitle>
              <CardDescription>
                {sent
                  ? 'Verifique seu e-mail'
                  : 'Digite seu e-mail para receber instruções'
                }
              </CardDescription>
            </CardHeader>

            <CardContent>
              {sent ? (
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                  </div>
                  <p className="text-gray-600 mb-6">
                    Enviamos um e-mail com instruções para recuperar sua senha para <strong>{email}</strong>
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Não recebeu o e-mail? Verifique sua caixa de spam ou tente novamente.
                  </p>
                  <div className="space-y-3">
                    <Button onClick={() => setSent(false)} variant="outline" className="w-full">
                      Tentar outro e-mail
                    </Button>
                    <Link href="/login">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Voltar ao login
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  {error && <InlineError error={{ message: error }} />}

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? 'Enviando...' : 'Enviar instruções'}
                  </Button>

                  <div className="text-center pt-4">
                    <Link
                      href="/login"
                      className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Voltar ao login
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}