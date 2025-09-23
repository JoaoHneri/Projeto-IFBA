"use client";

import { useState } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Column } from './ColumnDnD';
import { TaskModal } from './TaskModal';
import TaskCard from './TaskCardDnD';
import { 
  Plus, 
  Settings, 
  Filter, 
  Search, 
  Users, 
  Calendar,
  BarChart3,
  Download
} from "lucide-react";

export default function Board({ 
  title = "Projeto Kanban",
  description = "Gerencie suas tarefas de forma visual e eficiente",
  initialData = null 
}) {
  // Estado do board
  const [columns, setColumns] = useState(initialData?.columns || [
    {
      id: 'todo',
      title: 'A Fazer',
      status: 'todo',
      description: 'Tarefas planejadas para execução',
      assignedUsers: [],
    },
    {
      id: 'doing',
      title: 'Em Progresso',
      status: 'doing',
      description: 'Tarefas em desenvolvimento',
      assignedUsers: [],
    },
    {
      id: 'done',
      title: 'Concluído',
      status: 'done',
      description: 'Tarefas finalizadas',
      assignedUsers: [],
    },
    {
      id: 'blocked',
      title: 'Bloqueado',
      status: 'blocked',
      description: 'Tarefas impedidas',
      assignedUsers: [],
    }
  ]);

  const [tasks, setTasks] = useState(initialData?.tasks || [
    {
      id: 1,
      title: "Configurar projeto Next.js",
      description: "Inicializar projeto com Next.js 15 e configurar Tailwind CSS",
      status: "done",
      priority: "alta",
      category: "Frontend",
      assignee: "João Silva",
      dueDate: "2024-01-15",
      progress: 100,
      createdAt: "2024-01-10",
      comments: 3,
      attachments: 1
    },
    {
      id: 2,
      title: "Implementar sistema de autenticação",
      description: "Criar páginas de login e cadastro com validação",
      status: "doing",
      priority: "alta",
      category: "Backend",
      assignee: "Maria Santos",
      dueDate: "2024-01-20",
      progress: 60,
      createdAt: "2024-01-12",
      comments: 5,
      attachments: 0
    },
    {
      id: 3,
      title: "Design do sistema Kanban",
      description: "Criar wireframes e protótipos para o board de tarefas",
      status: "todo",
      priority: "media",
      category: "Design",
      assignee: "Pedro Costa",
      dueDate: "2024-01-25",
      progress: 0,
      createdAt: "2024-01-14",
      comments: 2,
      attachments: 3
    },
    {
      id: 4,
      title: "Implementar drag-and-drop",
      description: "Adicionar funcionalidade de arrastar e soltar tarefas entre colunas",
      status: "blocked",
      priority: "media",
      category: "Frontend",
      assignee: "Ana Oliveira",
      dueDate: "2024-01-30",
      progress: 25,
      createdAt: "2024-01-16",
      comments: 1,
      attachments: 0
    }
  ]);

  // Estados do modal e filtros
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskStatus, setNewTaskStatus] = useState('todo');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [activeId, setActiveId] = useState(null);

  // Funções de drag and drop
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTask = tasks.find(task => task.id.toString() === active.id);
    if (!activeTask) return;

    const newStatus = over.id;
    
    if (activeTask.status !== newStatus) {
      setTasks(tasks.map(task => 
        task.id.toString() === active.id 
          ? { ...task, status: newStatus }
          : task
      ));
    }
  }

  // Funções CRUD de tarefas
  const handleAddTask = (status = 'todo') => {
    setEditingTask(null);
    setNewTaskStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleMoveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus }
        : task
    ));
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Editar tarefa existente
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData }
          : task
      ));
    } else {
      // Criar nova tarefa
      const newTask = {
        id: Date.now(),
        ...taskData,
        createdAt: new Date().toISOString().split('T')[0],
        comments: 0,
        attachments: 0
      };
      setTasks([...tasks, newTask]);
    }
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  // Filtros e busca
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesAssignee = filterAssignee === 'all' || task.assignee === filterAssignee;
    
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  // Estatísticas
  const stats = {
    total: filteredTasks.length,
    todo: filteredTasks.filter(task => task.status === 'todo').length,
    doing: filteredTasks.filter(task => task.status === 'doing').length,
    done: filteredTasks.filter(task => task.status === 'done').length,
    blocked: filteredTasks.filter(task => task.status === 'blocked').length,
    overdue: filteredTasks.filter(task => {
      if (!task.dueDate) return false;
      const today = new Date();
      const dueDate = new Date(task.dueDate);
      return dueDate < today && task.status !== 'done';
    }).length
  };

  const uniqueAssignees = [...new Set(tasks.map(task => task.assignee))];

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header do Board */}
        <Card className="m-6 mb-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
                <p className="text-gray-600 mt-1">{description}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </Button>
                <Button onClick={() => handleAddTask()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Tarefa
                </Button>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="flex items-center gap-6 mt-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-slate-600" />
                <span className="text-sm text-slate-600">
                  <strong>{stats.total}</strong> tarefas totais
                </span>
              </div>
              <div className="text-sm text-slate-600">
                <span className="text-slate-500">A fazer:</span> <strong>{stats.todo}</strong>
              </div>
              <div className="text-sm text-slate-600">
                <span className="text-blue-600">Em progresso:</span> <strong>{stats.doing}</strong>
              </div>
              <div className="text-sm text-slate-600">
                <span className="text-emerald-600">Concluídas:</span> <strong>{stats.done}</strong>
              </div>
              {stats.blocked > 0 && (
                <div className="text-sm text-red-600">
                  <span>Bloqueadas:</span> <strong>{stats.blocked}</strong>
                </div>
              )}
              {stats.overdue > 0 && (
                <div className="text-sm text-red-600">
                  <span>Atrasadas:</span> <strong>{stats.overdue}</strong>
                </div>
              )}
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar tarefas..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg w-full text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">Todas as prioridades</option>
                <option value="alta">Alta prioridade</option>
                <option value="media">Média prioridade</option>
                <option value="baixa">Baixa prioridade</option>
              </select>

              <select
                value={filterAssignee}
                onChange={(e) => setFilterAssignee(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">Todos os responsáveis</option>
                {uniqueAssignees.map(assignee => (
                  <option key={assignee} value={assignee}>{assignee}</option>
                ))}
              </select>
            </div>
          </CardHeader>
        </Card>

        {/* Board Kanban */}
        <div className="flex-1 overflow-x-auto p-6">
          <div className="flex gap-6 h-full min-w-max">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={filteredTasks}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onMoveTask={handleMoveTask}
              />
            ))}
            
            {/* Botão para adicionar nova coluna */}
            <div className="flex-shrink-0 w-80">
              <Card className="h-32 border-2 border-dashed border-slate-300 hover:border-emerald-400 transition-colors cursor-pointer">
                <CardContent className="h-full flex items-center justify-center">
                  <Button variant="ghost" className="text-slate-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Coluna
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            <TaskCard
              task={tasks.find(task => task.id.toString() === activeId)}
              onEdit={() => {}}
              onDelete={() => {}}
              isDragging={true}
            />
          ) : null}
        </DragOverlay>

        {/* Modal de Tarefa */}
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={handleSaveTask}
          task={editingTask}
          defaultStatus={newTaskStatus}
        />
      </div>
    </DndContext>
  );
}