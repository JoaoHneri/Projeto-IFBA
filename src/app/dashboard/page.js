'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { reportService, projectService, taskService } from '@/services';
import { useApi } from '@/hooks/useApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ErrorDisplay, InlineError } from '@/components/ui/error-states';
import { ErrorTypes } from '@/utils/errorTypes';
import {
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Plus,
  Target,
  TrendingUp,
  Users,
  AlertCircle,
  Activity,
  FileText,
  Settings
} from 'lucide-react';
import Link from 'next/link';

function DashboardStats({ stats }) {
  const statCards = [
    {
      title: 'Projetos Ativos',
      value: stats?.projectsActive || 0,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: stats?.changes?.projectsActive || '+0%'
    },
    {
      title: 'Tarefas Pendentes',
      value: stats?.tasksPending || 0,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: stats?.changes?.tasksPending || '+0%'
    },
    {
      title: 'Tarefas Concluídas',
      value: stats?.tasksCompleted || 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: stats?.changes?.tasksCompleted || '+0%'
    },
    {
      title: 'Membros da Equipe',
      value: stats?.teamMembers || 0,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: stats?.changes?.teamMembers || '+0%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                    {stat.change} vs mês anterior
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function RecentProjects({ projects }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Projetos Recentes</CardTitle>
            <CardDescription>Seus projetos mais atualizados</CardDescription>
          </div>
          <Link href="/projetos">
            <Button variant="outline" size="sm">Ver todos</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects?.slice(0, 5).map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
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
                <Button variant="ghost" size="sm">Ver</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TasksOverview({ tasks }) {
  const tasksByStatus = tasks?.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {}) || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral das Tarefas</CardTitle>
        <CardDescription>Status das tarefas em todos os projetos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Pendentes</span>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">{tasksByStatus.pendente || 0}</span>
              <div className="w-16 h-2 bg-gray-200 rounded-full">
                <div className="w-1/3 h-2 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Em Andamento</span>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">{tasksByStatus.andamento || 0}</span>
              <div className="w-16 h-2 bg-gray-200 rounded-full">
                <div className="w-2/3 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Concluídas</span>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">{tasksByStatus.concluida || 0}</span>
              <div className="w-16 h-2 bg-gray-200 rounded-full">
                <div className="w-full h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActions() {
  const actions = [
    {
      title: 'Novo Projeto',
      description: 'Criar um novo projeto',
      icon: Plus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/projetos/novo'
    },
    {
      title: 'Relatórios',
      description: 'Ver relatórios de desempenho',
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/relatorios'
    },
    {
      title: 'Configurações',
      description: 'Gerenciar configurações',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      href: '/configuracoes'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} href={action.href}>
                <Button variant="ghost" className="w-full justify-start h-auto p-4">
                  <div className={`p-2 rounded-lg ${action.bgColor} mr-4`}>
                    <Icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const { data: dashboardData, loading: dashboardLoading, error: dashboardError, refetch: refetchDashboard } = useApi(
    reportService.getDashboard,
    [],
    { skip: !isAuthenticated }
  );
  const { data: projects, loading: projectsLoading, error: projectsError, refetch: refetchProjects } = useApi(
    projectService.listProjects,
    [],
    { skip: !isAuthenticated }
  );
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      if (projects?.length) {
        const tasksPromises = projects.map(project =>
          taskService.listTasksForProject(project.id).catch(() => [])
        );
        const tasksArrays = await Promise.all(tasksPromises);
        const flatTasks = tasksArrays.flat();
        setAllTasks(flatTasks);
      }
    };

    fetchAllTasks();
  }, [projects]);

  const isLoading = dashboardLoading || projectsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAuth={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo de volta, {user?.nome}!
            </h1>
            <p className="text-gray-600">
              Aqui está um resumo dos seus projetos e atividades.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8">
            <DashboardStats stats={dashboardData} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <RecentProjects projects={projects} />
            </div>

            <div className="space-y-8">
              <TasksOverview tasks={allTasks} />
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}