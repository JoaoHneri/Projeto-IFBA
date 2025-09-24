'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, ArrowRight, Star, Clock, Plus, Target, Folder } from 'lucide-react';
import Link from 'next/link';

const statusColors = {
  ativo: 'bg-green-100 text-green-800',
  pausado: 'bg-yellow-100 text-yellow-800',
  concluido: 'bg-blue-100 text-blue-800',
  cancelado: 'bg-red-100 text-red-800'
};

export default function BoardSelector({ projects = [], onProjectSelect }) {
  const [filter, setFilter] = useState('todos');

  const filteredProjects = projects.filter(project => {
    if (filter === 'todos') return true;
    return project.status === filter;
  });

  const getProjectStats = (project) => {
    return {
      tasksCount: project.total_tarefas || 0,
      completedTasks: project.tarefas_concluidas || 0,
      teamMembers: project.membros || 1
    };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Seus Projetos</h1>
            <p className="text-gray-600">Selecione um projeto para gerenciar as tarefas no Kanban</p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
            <Link href="/projetos/novo">
              <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Projeto
              </Button>
            </Link>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'todos', label: 'Todos', count: projects.length },
            { key: 'ativo', label: 'Ativos', count: projects.filter(p => p.status === 'ativo').length },
            { key: 'pausado', label: 'Pausados', count: projects.filter(p => p.status === 'pausado').length },
            { key: 'concluido', label: 'Concluídos', count: projects.filter(p => p.status === 'concluido').length }
          ].map(filterOption => (
            <Button
              key={filterOption.key}
              variant={filter === filterOption.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterOption.key)}
              className="text-sm"
            >
              {filterOption.label}
              {filterOption.count > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filterOption.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Lista de Projetos */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'todos' ? 'Nenhum projeto encontrado' : `Nenhum projeto ${filter}`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'todos'
                ? 'Comece criando seu primeiro projeto.'
                : `Você não tem projetos com status "${filter}".`
              }
            </p>
            <Link href="/projetos/novo">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Projeto
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const stats = getProjectStats(project);
              const completionPercentage = stats.tasksCount > 0
                ? Math.round((stats.completedTasks / stats.tasksCount) * 100)
                : 0;

              return (
                <Card key={project.id} className="hover:shadow-lg transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-emerald-600 transition-colors">
                          {project.nome}
                        </CardTitle>
                        <CardDescription className="mt-2 line-clamp-3">
                          {project.descricao || 'Sem descrição'}
                        </CardDescription>
                      </div>
                      <Badge
                        className={`ml-2 ${statusColors[project.status] || 'bg-gray-100 text-gray-800'}`}
                      >
                        {project.status || 'ativo'}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Progresso */}
                      {stats.tasksCount > 0 && (
                        <div>
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Progresso</span>
                            <span>{completionPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full transition-all"
                              style={{ width: `${completionPercentage}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Estatísticas */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Target className="w-4 h-4 text-blue-600" />
                          </div>
                          <p className="text-lg font-semibold text-gray-900">{stats.tasksCount}</p>
                          <p className="text-xs text-gray-600">Tarefas</p>
                        </div>

                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Users className="w-4 h-4 text-green-600" />
                          </div>
                          <p className="text-lg font-semibold text-gray-900">{stats.teamMembers}</p>
                          <p className="text-xs text-gray-600">Membros</p>
                        </div>

                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Calendar className="w-4 h-4 text-purple-600" />
                          </div>
                          <p className="text-sm font-semibold text-gray-900">
                            {project.data_fim ? formatDate(project.data_fim) : 'N/A'}
                          </p>
                          <p className="text-xs text-gray-600">Prazo</p>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex gap-2 pt-4">
                        <Button
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => onProjectSelect(project)}
                        >
                          Abrir Kanban
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/projetos/${project.id}`}>
                            <Star className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}