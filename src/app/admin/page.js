'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { adminService, userService, reportService } from '@/services';
import { useApi, useAsyncAction } from '@/hooks/useApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Users,
  Shield,
  Settings,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Trash2,
  Edit,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { toast } from '@/components/ui/toaster';

function AdminStats({ stats }) {
  const statCards = [
    {
      title: 'Total de Usuários',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Projetos Ativos',
      value: stats?.activeProjects || 0,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Tarefas Pendentes',
      value: stats?.pendingTasks || 0,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Sistema Status',
      value: 'Online',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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

function UserManagement() {
  const { data: users, loading: usersLoading, refetch: refetchUsers } = useApi(userService.listUsers);
  const { loading: actionLoading, execute } = useAsyncAction();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('todos');

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'todos' || user.tipo_usuario === filterRole;
    return matchesSearch && matchesFilter;
  }) || [];

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Tem certeza que deseja deletar o usuário ${userName}?`)) {
      const result = await execute(userService.deleteUser, userId);
      if (result.success) {
        toast.success('Usuário deletado com sucesso!');
        refetchUsers();
      } else {
        toast.error(result.error || 'Erro ao deletar usuário');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <CardTitle>Gerenciamento de Usuários</CardTitle>
            <CardDescription>Gerencie todos os usuários do sistema</CardDescription>
          </div>
          <Button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="todos">Todos</option>
              <option value="admin">Administradores</option>
              <option value="gerente">Gerentes</option>
              <option value="usuario">Usuários</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criado em
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.nome.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.nome}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      className={
                        user.tipo_usuario === 'admin'
                          ? 'bg-red-100 text-red-800'
                          : user.tipo_usuario === 'gerente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {user.tipo_usuario === 'admin' ? 'Admin' :
                       user.tipo_usuario === 'gerente' ? 'Gerente' : 'Usuário'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.data_criacao).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id, user.nome)}
                        disabled={actionLoading}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function SystemSettings() {
  const { data: taskStatuses, refetch: refetchStatuses } = useApi(adminService.listTaskStatuses);
  const { data: tags, refetch: refetchTags } = useApi(adminService.listTags);
  const { loading: actionLoading, execute } = useAsyncAction();
  const [newStatus, setNewStatus] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleCreateStatus = async () => {
    if (!newStatus.trim()) return;
    const result = await execute(adminService.createTaskStatus, { nome: newStatus });
    if (result.success) {
      toast.success('Status criado com sucesso!');
      setNewStatus('');
      refetchStatuses();
    } else {
      toast.error(result.error || 'Erro ao criar status');
    }
  };

  const handleCreateTag = async () => {
    if (!newTag.trim()) return;
    const result = await execute(adminService.createTag, { nome: newTag });
    if (result.success) {
      toast.success('Tag criada com sucesso!');
      setNewTag('');
      refetchTags();
    } else {
      toast.error(result.error || 'Erro ao criar tag');
    }
  };

  const handleDeleteStatus = async (statusId) => {
    if (window.confirm('Tem certeza que deseja deletar este status?')) {
      const result = await execute(adminService.deleteTaskStatus, statusId);
      if (result.success) {
        toast.success('Status deletado com sucesso!');
        refetchStatuses();
      } else {
        toast.error(result.error || 'Erro ao deletar status');
      }
    }
  };

  const handleDeleteTag = async (tagId) => {
    if (window.confirm('Tem certeza que deseja deletar esta tag?')) {
      const result = await execute(adminService.deleteTag, tagId);
      if (result.success) {
        toast.success('Tag deletada com sucesso!');
        refetchTags();
      } else {
        toast.error(result.error || 'Erro ao deletar tag');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Status das Tarefas</CardTitle>
          <CardDescription>Gerencie os status disponíveis para tarefas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Novo status..."
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            <Button onClick={handleCreateStatus} disabled={actionLoading || !newStatus.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {taskStatuses?.map((status) => (
              <div key={status.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">{status.nome}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteStatus(status.id)}
                  disabled={actionLoading}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          <CardDescription>Gerencie as tags disponíveis para organização</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Nova tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <Button onClick={handleCreateTag} disabled={actionLoading || !newTag.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {tags?.map((tag) => (
              <div key={tag.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">{tag.nome}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTag(tag.id)}
                  disabled={actionLoading}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminPage() {
  const { user } = useAuth();
  const { data: auditLogs } = useApi(adminService.listAuditLogs);
  const { data: dashboardStats } = useApi(reportService.getDashboard);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: Activity },
    { id: 'users', name: 'Usuários', icon: Users },
    { id: 'settings', name: 'Configurações', icon: Settings },
    { id: 'logs', name: 'Logs', icon: Database },
  ];

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Painel Administrativo
            </h1>
            <p className="text-gray-600">
              Gerencie usuários, configurações e monitore o sistema
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              <AdminStats stats={dashboardStats} />
              <Card>
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                  <CardDescription>Últimas ações realizadas no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditLogs?.slice(0, 10).map((log, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Activity className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{log.acao}</p>
                            <p className="text-sm text-gray-500">{log.detalhes}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(log.data_criacao).toLocaleString('pt-BR')}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'users' && <UserManagement />}

          {activeTab === 'settings' && <SystemSettings />}

          {activeTab === 'logs' && (
            <Card>
              <CardHeader>
                <CardTitle>Logs de Auditoria</CardTitle>
                <CardDescription>Histórico completo de ações do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Data/Hora
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Usuário
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Ação
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Detalhes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {auditLogs?.map((log, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(log.data_criacao).toLocaleString('pt-BR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.usuario_nome || 'Sistema'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.acao}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {log.detalhes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}