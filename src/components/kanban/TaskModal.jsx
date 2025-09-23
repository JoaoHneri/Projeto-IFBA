"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Calendar, User, Tag, Flag, Clock } from "lucide-react";

export function TaskModal({ 
  isOpen, 
  onClose, 
  onSave, 
  task = null, 
  defaultStatus = 'todo' 
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: defaultStatus,
    priority: 'media',
    category: '',
    assignee: '',
    dueDate: '',
    progress: 0
  });

  const [errors, setErrors] = useState({});

  // Preencher formulário quando editar tarefa
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || defaultStatus,
        priority: task.priority || 'media',
        category: task.category || '',
        assignee: task.assignee || '',
        dueDate: task.dueDate || '',
        progress: task.progress || 0
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: defaultStatus,
        priority: 'media',
        category: '',
        assignee: '',
        dueDate: '',
        progress: 0
      });
    }
    setErrors({});
  }, [task, defaultStatus, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }
    
    if (formData.title.length > 100) {
      newErrors.title = 'Título deve ter no máximo 100 caracteres';
    }
    
    if (formData.description.length > 500) {
      newErrors.description = 'Descrição deve ter no máximo 500 caracteres';
    }
    
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Data de vencimento não pode ser no passado';
      }
    }
    
    if (formData.progress < 0 || formData.progress > 100) {
      newErrors.progress = 'Progresso deve estar entre 0 e 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSave(formData);
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      status: defaultStatus,
      priority: 'media',
      category: '',
      assignee: '',
      dueDate: '',
      progress: 0
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold">
            {task ? 'Editar Tarefa' : 'Nova Tarefa'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Título *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Digite o título da tarefa..."
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva os detalhes da tarefa..."
                rows={3}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Grid de campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="todo">A Fazer</option>
                  <option value="doing">Em Progresso</option>
                  <option value="done">Concluído</option>
                  <option value="blocked">Bloqueado</option>
                </select>
              </div>

              {/* Prioridade */}
              <div className="space-y-2">
                <Label htmlFor="priority" className="flex items-center gap-2">
                  <Flag className="h-4 w-4" />
                  Prioridade
                </Label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="ex: Frontend, Backend, Design..."
                />
              </div>

              {/* Responsável */}
              <div className="space-y-2">
                <Label htmlFor="assignee" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Responsável
                </Label>
                <Input
                  id="assignee"
                  value={formData.assignee}
                  onChange={(e) => handleInputChange('assignee', e.target.value)}
                  placeholder="Nome do responsável..."
                />
              </div>

              {/* Data de Vencimento */}
              <div className="space-y-2">
                <Label htmlFor="dueDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Data de Vencimento
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  className={errors.dueDate ? 'border-red-500' : ''}
                />
                {errors.dueDate && (
                  <p className="text-sm text-red-600">{errors.dueDate}</p>
                )}
              </div>

              {/* Progresso */}
              <div className="space-y-2">
                <Label htmlFor="progress" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Progresso (%)
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="progress"
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => handleInputChange('progress', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-center">
                    {formData.progress}%
                  </span>
                </div>
                {errors.progress && (
                  <p className="text-sm text-red-600">{errors.progress}</p>
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                {task ? 'Salvar Alterações' : 'Criar Tarefa'}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}