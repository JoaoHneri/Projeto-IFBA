"use client";

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCardDnD';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal } from "lucide-react";

export function Column({ 
  column, 
  tasks, 
  onAddTask, 
  onEditTask, 
  onDeleteTask, 
  onMoveTask 
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  // Filtrar tarefas desta coluna
  const columnTasks = tasks.filter(task => task.status === column.status);
  const taskIds = columnTasks.map(task => task.id.toString());

  // Cores baseadas no status
  const getStatusColor = (status) => {
    const colors = {
      todo: 'border-slate-400 bg-slate-50',
      doing: 'border-blue-400 bg-blue-50',
      done: 'border-emerald-400 bg-emerald-50',
      blocked: 'border-red-400 bg-red-50'
    };
    return colors[status] || colors.todo;
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      todo: 'bg-slate-100 text-slate-700',
      doing: 'bg-blue-100 text-blue-700',
      done: 'bg-emerald-100 text-emerald-700',
      blocked: 'bg-red-100 text-red-700'
    };
    return colors[status] || colors.todo;
  };

  return (
    <div className="flex-shrink-0 w-80">
      <Card className={`h-full ${getStatusColor(column.status)} ${isOver ? 'ring-2 ring-emerald-400' : ''}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {column.title}
              </CardTitle>
              <Badge variant="secondary" className={getStatusBadgeColor(column.status)}>
                {columnTasks.length}
              </Badge>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          {column.description && (
            <p className="text-sm text-gray-600 mt-1">{column.description}</p>
          )}
        </CardHeader>

        <CardContent className="space-y-3" ref={setNodeRef}>
          <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
            {columnTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </SortableContext>

          {/* Botão para adicionar tarefa */}
          <Button
            variant="ghost"
            className="w-full border-2 border-dashed border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
            onClick={() => onAddTask(column.status)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar tarefa
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Column;