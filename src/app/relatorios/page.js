'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ErrorDisplay } from '@/components/ui/error-states';
import { useApi } from '@/hooks/useApi';
import { reportService, projectService } from '@/services';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Users,
  Clock,
  CheckCircle,
  Target,
  AlertTriangle,
  PieChart,
  Activity
} from 'lucide-react';

function ReportsPage() {
  const { user } = useAuth();
  const [dateFilter, setDateFilter] = useState('30days');
  const [projectFilter, setProjectFilter] = useState('all');

  const { data: dashboardData, loading: dashboardLoading, error: dashboardError } = useApi(
    reportService.getDashboard,
    []
  );

  const { data: projects, loading: projectsLoading } = useApi(
    projectService.listProjects,
    []
  );

  const { data: performanceReport, loading: performanceLoading } = useApi(
    () => reportService.getPerformanceReport(dateFilter),
    [dateFilter]
  );

  const handleExportReport = async (type) => {
    try {
      const blob = await reportService.exportReport(type, {
        dateFilter,
        projectFilter
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${type}-${new Date().toISOString().split('T')[0]}.${type === 'pdf' ? 'pdf' : 'xlsx'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao exportar relatório:', error);
    }
  };

  if (dashboardLoading || projectsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando relatórios...</p>
        </div>
      </div>
    );
  }

  if (dashboardError) {
    return <ErrorDisplay error={dashboardError} />;
  }

  const stats = dashboardData || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatórios</h1>
                <p className="text-gray-600">Acompanhe o desempenho dos seus projetos e equipes</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="7days">Últimos 7 dias</option>
                  <option value="30days">Últimos 30 dias</option>
                  <option value="90days">Últimos 90 dias</option>
                  <option value="year">Este ano</option>
                </select>

                <select
                  value={projectFilter}
                  onChange={(e) => setProjectFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos os projetos</option>
                  {projects?.map(project => (
                    <option key={project.id} value={project.id}>{project.nome}</option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleExportReport('pdf')}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    onClick={() => handleExportReport('excel')}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* KPIs Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Projetos Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.projectsActive || 0}</p>
                    <p className="text-xs text-green-600 font-medium">+12% vs período anterior</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Taxa de Conclusão</p>
                    <p className="text-2xl font-bold text-gray-900">{Math.round((stats.tasksCompleted / (stats.tasksCompleted + stats.tasksPending + stats.tasksInProgress) * 100) || 0)}%</p>
                    <p className="text-xs text-green-600 font-medium">+8% vs período anterior</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Tempo Médio</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.averageCompletionTime || '5.2'}d</p>
                    <p className="text-xs text-red-600 font-medium">+2% vs período anterior</p>
                  </div>
                  <div className="p-3 rounded-full bg-orange-100">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Membros Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeMembers || stats.teamMembers || 0}</p>
                    <p className="text-xs text-green-600 font-medium">+5% vs período anterior</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Project Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Progresso dos Projetos
                </CardTitle>
                <CardDescription>Acompanhamento do status dos projetos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Concluídos</span>
                    <div className="flex items-center">
                      <div className="w-32 h-3 bg-gray-200 rounded-full mr-3">
                        <div className="h-3 bg-green-500 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Em Andamento</span>
                    <div className="flex items-center">
                      <div className="w-32 h-3 bg-gray-200 rounded-full mr-3">
                        <div className="h-3 bg-blue-500 rounded-full" style={{width: '45%'}}></div>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Atrasados</span>
                    <div className="flex items-center">
                      <div className="w-32 h-3 bg-gray-200 rounded-full mr-3">
                        <div className="h-3 bg-red-500 rounded-full" style={{width: '12%'}}></div>
                      </div>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Desempenho da Equipe
                </CardTitle>
                <CardDescription>Produtividade dos últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                {performanceLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tarefas Concluídas</span>
                      <Badge variant="default">{performanceReport?.tasksCompleted || stats.tasksCompleted || 0}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Projetos Entregues</span>
                      <Badge variant="secondary">{performanceReport?.projectsDelivered || 0}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Horas Trabalhadas</span>
                      <Badge variant="outline">{performanceReport?.hoursWorked || '284h'}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Eficiência</span>
                      <Badge className="bg-green-100 text-green-800">
                        {performanceReport?.efficiency || '92%'}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Detailed Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Projects */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Projetos Recentes</CardTitle>
                <CardDescription>Status e progresso dos projetos mais atualizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects?.slice(0, 5).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{project.nome}</h4>
                        <p className="text-sm text-gray-600 mt-1">{project.descricao}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {new Date(project.data_inicio).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={project.status === 'ativo' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm font-medium">85%</p>
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <PieChart className="w-4 h-4 mr-2" />
                    Relatório Detalhado
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Análise de Tendências
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Relatório de Equipe
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Projetos em Risco
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ReportsPageWithAuth() {
  return (
    <ProtectedRoute requireAuth={true}>
      <ReportsPage />
    </ProtectedRoute>
  );
}