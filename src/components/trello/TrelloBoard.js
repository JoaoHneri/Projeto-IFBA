'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import KanbanList from './KanbanList';
import TaskCard from './TaskCard';
import { taskService } from '@/services';
import { useAsyncAction } from '@/hooks/useApi';
import { Plus, ArrowLeft, Users, Settings, Filter, Search } from 'lucide-react';

export default function TrelloBoard({ project, tasks, loading, onBackToProjects, onTaskUpdate }) {
  const [activeCard, setActiveCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLabel, setFilterLabel] = useState('');
  const [isClient, setIsClient] = useState(false);

  const { loading: creatingTask, execute: createTask } = useAsyncAction();
  const { loading: updatingTask, execute: updateTask } = useAsyncAction();
  const { loading: deletingTask, execute: deleteTask } = useAsyncAction();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return 'red';
      case 'media': return 'yellow';
      case 'baixa': return 'green';
      default: return 'gray';
    }
  };

  // Criar um board baseado no projeto e tarefas
  const board = useMemo(() => {
    if (!project) return null;

    // Organizar tarefas por status
    const tasksByStatus = {
      pendente: [],
      andamento: [],
      concluida: []
    };

    tasks.forEach(task => {
      const status = task.status || 'pendente';
      if (tasksByStatus[status]) {
        tasksByStatus[status].push({
          id: task.id,
          title: task.titulo,
          description: task.descricao,
          position: 0,
          labels: [
            { id: `priority-${task.id}`, name: task.prioridade || 'media', color: getPriorityColor(task.prioridade) }
          ],
          dueDate: task.data_vencimento ? new Date(task.data_vencimento) : null,
          priority: task.prioridade || 'media',
          cover: null,
          archived: false,
          checklist: [],
          attachments: [],
          comments: [],
          members: [],
          activity: []
        });
      }
    });

    return {
      id: project.id,
      title: project.nome,
      description: project.descricao,
      visibility: 'team',
      background: 'emerald',
      createdAt: new Date(project.data_inicio),
      members: [],
      lists: [
        {
          id: 'pendente',
          title: 'A Fazer',
          position: 0,
          cards: tasksByStatus.pendente
        },
        {
          id: 'andamento',
          title: 'Em Progresso',
          position: 1,
          cards: tasksByStatus.andamento
        },
        {
          id: 'concluida',
          title: 'Concluído',
          position: 2,
          cards: tasksByStatus.concluida
        }
      ]
    };
  }, [project, tasks]);

  // Memoizar as funções de busca para melhor performance
  const findCardLocation = useCallback((cardId) => {
    if (!board?.lists) return null;
    for (const list of board.lists) {
      const cardIndex = list.cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        return { listId: list.id, index: cardIndex };
      }
    }
    return null;
  }, [board?.lists]);

  const findListLocation = useCallback((listId) => {
    if (!board?.lists) return null;
    const list = board.lists.find(list => list.id === listId);
    return list ? { listId: list.id, index: list.cards.length } : null;
  }, [board?.lists]);

  const findCard = useCallback((cardId) => {
    if (!board?.lists) return null;
    for (const list of board.lists) {
      const card = list.cards.find(card => card.id === cardId);
      if (card) return card;
    }
    return null;
  }, [board?.lists]);

  const handleDragEnd = useCallback(async (event) => {
    if (!board) return;

    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find source and destination
    const sourceData = findCardLocation(activeId);
    const destData = findCardLocation(overId) || findListLocation(overId);

    if (!sourceData || !destData) return;

    if (sourceData.listId !== destData.listId) {
      // Moving between lists - update task status
      const newStatus = destData.listId;

      const result = await updateTask(taskService.updateTask, activeId, {
        status: newStatus
      });

      if (result.success) {
        onTaskUpdate(); // Refresh tasks
      }
    }
    // Reordering within same list is not needed for status-based kanban
  }, [board, findCardLocation, findListLocation, updateTask, onTaskUpdate]);

  const handleCreateTask = useCallback(async (status, title) => {
    if (!title.trim() || !project?.id) return false;

    const result = await createTask(taskService.createTaskInProject, project.id, {
      titulo: title.trim(),
      descricao: '',
      status: status,
      prioridade: 'media'
    });

    if (result.success) {
      onTaskUpdate(); // Refresh tasks
      return true;
    }
    return false;
  }, [project?.id, createTask, onTaskUpdate]);

  const handleEditTask = useCallback((task) => {
    // For now, just log - could open a modal for editing
    console.log('Edit task:', task);
  }, []);

  const handleDeleteTask = useCallback(async (task) => {
    if (window.confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`)) {
      const result = await deleteTask(taskService.deleteTask, task.id);
      if (result.success) {
        onTaskUpdate(); // Refresh tasks
      }
    }
  }, [deleteTask, onTaskUpdate]);

  const filteredLists = useMemo(() => {
    if (!board?.lists) return [];
    return board.lists.map(list => ({
      ...list,
      cards: list.cards.filter(card => {
        const matchesSearch = searchTerm === '' || 
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.description?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLabel = filterLabel === '' || 
          card.labels.some(label => label.name === filterLabel);
        
        return matchesSearch && matchesLabel;
      })
    }));
  }, [board?.lists, searchTerm, filterLabel]);

  const allLabels = useMemo(() => {
    if (!board?.lists) return [];
    return [...new Set(
      board.lists.flatMap(list => 
        list.cards.flatMap(card => 
          card.labels.map(label => label.name)
        )
      )
    )];
  }, [board?.lists]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">Nenhum projeto selecionado</h2>
          <p className="text-white text-opacity-80">Selecione um projeto para começar</p>
        </div>
      </div>
    );
  }

  const handleDragStart = (event) => {
    const { active } = event;
    const card = findCard(active.id);
    setActiveCard(card);
  };

  const backgroundColors = {
    emerald: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    blue: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    purple: 'bg-gradient-to-br from-purple-500 to-pink-600',
    orange: 'bg-gradient-to-br from-orange-500 to-red-600',
    gray: 'bg-gradient-to-br from-gray-500 to-slate-600'
  };

  return (
    <div className={`min-h-[calc(100vh-64px)] ${backgroundColors[board.background]}`}>
      {/* Header */}
      <div className="bg-black bg-opacity-20 border-b border-white border-opacity-20">
        <div className="px-4 sm:px-6 py-4">
          {/* Mobile Header */}
          <div className="block lg:hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={onBackToProjects}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg font-semibold text-white truncate">{board.title}</h1>
                  {board.description && (
                    <p className="text-white text-opacity-80 text-xs truncate">{board.description}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors">
                  <Users className="w-4 h-4" />
                </button>
                
                <button className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Mobile Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-opacity-60 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar cartões..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white bg-opacity-20 placeholder-white placeholder-opacity-60 pl-10 pr-4 py-2 rounded-lg text-sm focus:bg-opacity-30 focus:outline-none"
                />
              </div>

              <select
                value={filterLabel}
                onChange={(e) => setFilterLabel(e.target.value)}
                className="w-full bg-white bg-opacity-20  rounded-lg px-3 py-2 text-sm focus:bg-opacity-30 focus:outline-none"
              >
                <option value="">Todas as etiquetas</option>
                {allLabels.map(label => (
                  <option key={label} value={label} className="text-gray-900">{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToProjects}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div>
                <h1 className="text-xl font-semibold text-white">{board.title}</h1>
                {board.description && (
                  <p className="text-white text-opacity-80 text-sm">{board.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-opacity-60 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar cartões..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white bg-opacity-20 placeholder-white placeholder-opacity-60 pl-10 pr-4 py-2 rounded-lg text-sm focus:bg-opacity-30 focus:outline-none w-64"
                />
              </div>

              {/* Filter */}
              <select
                value={filterLabel}
                onChange={(e) => setFilterLabel(e.target.value)}
                className="bg-white bg-opacity-20 rounded-lg px-3 py-2 text-sm focus:bg-opacity-30 focus:outline-none min-w-[180px]"
              >
                <option value="">Todas as etiquetas</option>
                {allLabels.map(label => (
                  <option key={label} value={label} className="text-gray-900">{label}</option>
                ))}
              </select>

              <button className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors">
                <Users className="w-5 h-5" />
              </button>
              
              <button className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Board Content */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        {isClient && (
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <div className="flex gap-4 sm:gap-6 min-h-[calc(100vh-200px)] pb-4 min-w-max">
              <SortableContext items={filteredLists.map(list => list.id)} strategy={horizontalListSortingStrategy}>
                {filteredLists.map((list) => (
                  <KanbanList
                    key={list.id}
                    list={list}
                    onCreateTask={handleCreateTask}
                    creatingTask={creatingTask}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                  />
                ))}
              </SortableContext>
            </div>

            <DragOverlay>
              {activeCard ? (
                <div className="transform rotate-3">
                  <TaskCard card={activeCard} isDragOverlay />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
        
        {!isClient && (
          <div className="flex gap-6 min-h-[calc(100vh-200px)]">
            {filteredLists.map((list) => (
              <div key={list.id} className="min-w-[280px] max-w-[280px]">
                <div className="bg-gray-100 rounded-lg shadow-sm">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">{list.title}</h3>
                  </div>
                  <div className="p-3 space-y-3">
                    {list.cards.map((card) => (
                      <div key={card.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                        <h4 className="text-sm font-medium text-gray-900">{card.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}