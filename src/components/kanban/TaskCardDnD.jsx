"use client";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Flag, 
  Calendar, 
  User, 
  MessageCircle, 
  Paperclip, 
  MoreHorizontal,
  Edit,
  Trash2,
  Clock
} from "lucide-react";

export function TaskCard({ task, onEdit, onDelete, isDragging = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging
  } = useSortable({
    id: task.id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  };

  // Cores da prioridade
  const getPriorityColor = (priority) => {
    const colors = {
      alta: 'text-red-600 bg-red-100',
      media: 'text-yellow-600 bg-yellow-100',
      baixa: 'text-green-600 bg-green-100'
    };
    return colors[priority] || colors.media;
  };

  // Cores do status
  const getStatusColor = (status) => {
    const colors = {
      todo: 'text-slate-600 bg-slate-100',
      doing: 'text-blue-600 bg-blue-100',
      done: 'text-emerald-600 bg-emerald-100',
      blocked: 'text-red-600 bg-red-100'
    };
    return colors[status] || colors.todo;
  };

  // Verificar se está atrasada
  const isOverdue = () => {
    if (!task.dueDate || task.status === 'done') return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };

  // Formattar data
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 ${
        isOverdue() ? 'ring-2 ring-red-300' : ''
      } ${isDragging || isSortableDragging ? 'rotate-3 scale-105 shadow-lg' : ''}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium leading-tight line-clamp-2">
            {task.title}
          </CardTitle>
          <div className="flex items-center gap-1">
            {/* Prioridade */}
            <Badge variant="secondary" className={`text-xs ${getPriorityColor(task.priority)}`}>
              <Flag className="h-3 w-3 mr-1" />
              {task.priority}
            </Badge>
            
            {/* Menu de ações */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                // Adicionar dropdown menu aqui
              }}
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Descrição */}
        {task.description && (
          <p className="text-xs text-gray-600 line-clamp-2 mt-2">
            {task.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Status */}
        <Badge variant="outline" className={`text-xs ${getStatusColor(task.status)}`}>
          {task.status === 'todo' && 'A Fazer'}
          {task.status === 'doing' && 'Em Progresso'}
          {task.status === 'done' && 'Concluído'}
          {task.status === 'blocked' && 'Bloqueado'}
        </Badge>

        {/* Progresso */}
        {task.progress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Progresso</span>
              <span className="font-medium">{task.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Categoria */}
        {task.category && (
          <Badge variant="outline" className="text-xs">
            {task.category}
          </Badge>
        )}

        {/* Informações da tarefa */}
        <div className="space-y-2">
          {/* Responsável */}
          {task.assignee && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <User className="h-3 w-3" />
              <span className="truncate">{task.assignee}</span>
            </div>
          )}

          {/* Data de vencimento */}
          {task.dueDate && (
            <div className={`flex items-center gap-2 text-xs ${
              isOverdue() ? 'text-red-600 font-medium' : 'text-gray-600'
            }`}>
              <Calendar className="h-3 w-3" />
              <span>{formatDate(task.dueDate)}</span>
              {isOverdue() && <span className="text-red-600 font-bold">!</span>}
            </div>
          )}
        </div>

        {/* Footer com contadores */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {/* Comentários */}
            {task.comments > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MessageCircle className="h-3 w-3" />
                <span>{task.comments}</span>
              </div>
            )}

            {/* Anexos */}
            {task.attachments > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Paperclip className="h-3 w-3" />
                <span>{task.attachments}</span>
              </div>
            )}
          </div>

          {/* Ações rápidas */}
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 hover:bg-blue-100"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 hover:bg-red-100"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Timestamp */}
        <div className="text-xs text-gray-400 pt-1">
          Criado em {formatDate(task.createdAt)}
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskCard;