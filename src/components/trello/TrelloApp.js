'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { projectService, taskService } from '@/services';
import { useApi } from '@/hooks/useApi';
import BoardSelector from './BoardSelector';
import TrelloBoard from './TrelloBoard';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { BoardProvider } from '@/contexts/BoardContext';

export default function TrelloApp() {
  const { user, isAuthenticated } = useAuth();
  const { data: projects, loading: projectsLoading, refetch: refetchProjects, error: projectsError } = useApi(
    projectService.listProjects,
    [],
    { skip: !isAuthenticated }
  );
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectTasks, setProjectTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      fetchProjectTasks(selectedProject.id);
    }
  }, [selectedProject]);

  const fetchProjectTasks = async (projectId) => {
    setLoadingTasks(true);
    try {
      const tasks = await taskService.listTasksForProject(projectId);
      setProjectTasks(tasks || []);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      setProjectTasks([]);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setProjectTasks([]);
  };

  const handleTaskUpdate = () => {
    if (selectedProject) {
      fetchProjectTasks(selectedProject.id);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Você precisa estar logado para acessar seus projetos.</p>
          <Link href="/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Fazer Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (projectsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando projetos...</p>
        </div>
      </div>
    );
  }

  if (projectsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar projetos: {projectsError}</p>
          <button
            onClick={refetchProjects}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAuth={true}>
      <BoardProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          {!selectedProject ? (
            <main className="pt-20">
              <BoardSelector
                projects={projects || []}
                onProjectSelect={handleProjectSelect}
              />
            </main>
          ) : (
            <main>
              <TrelloBoard
                project={selectedProject}
                tasks={projectTasks}
                loading={loadingTasks}
                onBackToProjects={handleBackToProjects}
                onTaskUpdate={handleTaskUpdate}
              />
            </main>
          )}
          {!selectedProject && <Footer />}
        </div>
      </BoardProvider>
    </ProtectedRoute>
  );
}