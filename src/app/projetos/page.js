'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TrelloApp from '@/components/trello/TrelloApp';
import {
  FolderOpen,
  Plus,
  ArrowRight,
  Users,
  Calendar,
  Target,
  LogIn,
  UserPlus,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

function PublicProjectsView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center">
                <FolderOpen className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Gerencie seus projetos com
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block mt-2">
                máxima eficiência
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Organize, acompanhe e entregue seus projetos com nossa plataforma completa de gerenciamento.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4">
                  <LogIn className="w-5 h-5 mr-2" />
                  Acessar meus projetos
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Criar conta gratuita
                </Button>
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Organize Tarefas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Use nosso sistema Kanban intuitivo para organizar e acompanhar o progresso das suas tarefas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Colabore em Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Trabalhe em conjunto com sua equipe, atribua tarefas e mantenha todos sincronizados.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Cumpra Prazos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Acompanhe deadlines, marcos importantes e mantenha seus projetos sempre no cronograma.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Demo Projects */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Exemplos de Projetos
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Sistema E-commerce',
                  description: 'Desenvolvimento completo de plataforma de vendas online',
                  status: 'Em andamento',
                  progress: 65,
                  tasks: 24,
                  members: 5
                },
                {
                  name: 'App Mobile',
                  description: 'Aplicativo de delivery para restaurantes',
                  status: 'Concluído',
                  progress: 100,
                  tasks: 18,
                  members: 3
                },
                {
                  name: 'Website Corporativo',
                  description: 'Site institucional com CMS personalizado',
                  status: 'Planejamento',
                  progress: 20,
                  tasks: 12,
                  members: 4
                }
              ].map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription className="mt-2">{project.description}</CardDescription>
                      </div>
                      <Badge variant={project.status === 'Concluído' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progresso</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-emerald-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {project.tasks} tarefas
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {project.members} membros
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-emerald-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Crie sua conta gratuita e transforme a forma como você gerencia projetos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cadastro">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4">
                  Começar agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Já tenho conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ProjetosPage() {
  const { isAuthenticated, loading } = useAuth();
  const [showKanban, setShowKanban] = useState(false);

  useEffect(() => {
    // Aguardar o carregamento da autenticação
    if (!loading) {
      setShowKanban(isAuthenticated);
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (showKanban) {
    return <TrelloApp />;
  }

  return <PublicProjectsView />;
}