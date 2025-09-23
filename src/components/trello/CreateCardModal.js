'use client';

import React, { useState } from 'react';
import { useBoardContext } from '@/contexts/BoardContext';
import { 
  X, 
  Calendar, 
  User, 
  Tag, 
  Clock,
  Plus,
  Save
} from 'lucide-react';

const labelColors = {
  red: 'bg-red-500',
  orange: 'bg-orange-500', 
  yellow: 'bg-yellow-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  gray: 'bg-gray-500'
};

const priorityOptions = [
  { value: 'baixa', label: 'Baixa', color: 'green' },
  { value: 'media', label: 'Média', color: 'yellow' },
  { value: 'alta', label: 'Alta', color: 'red' },
  { value: 'critica', label: 'Crítica', color: 'purple' }
];

export default function CreateCardModal({ isOpen, onClose, listId, boardId, listTitle }) {
  const { dispatch, users } = useBoardContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'media',
    labels: [],
    members: [],
    checklist: []
  });
  const [newLabel, setNewLabel] = useState({ name: '', color: 'blue' });
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [showLabelForm, setShowLabelForm] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    const newCard = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
      priority: formData.priority,
      labels: formData.labels,
      members: formData.members,
      checklist: formData.checklist,
      attachments: [],
      comments: [],
      activity: []
    };

    dispatch({
      type: 'CREATE_CARD',
      payload: {
        boardId,
        listId,
        card: newCard
      }
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'media',
      labels: [],
      members: [],
      checklist: []
    });
    setNewLabel({ name: '', color: 'blue' });
    setNewChecklistItem('');
    setShowLabelForm(false);
    onClose();
  };

  const handleAddLabel = () => {
    if (newLabel.name.trim()) {
      const label = {
        id: Date.now().toString(),
        name: newLabel.name.trim(),
        color: newLabel.color
      };
      setFormData(prev => ({
        ...prev,
        labels: [...prev.labels, label]
      }));
      setNewLabel({ name: '', color: 'blue' });
      setShowLabelForm(false);
    }
  };

  const handleRemoveLabel = (labelId) => {
    setFormData(prev => ({
      ...prev,
      labels: prev.labels.filter(label => label.id !== labelId)
    }));
  };

  const handleToggleMember = (userId) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.includes(userId)
        ? prev.members.filter(id => id !== userId)
        : [...prev.members, userId]
    }));
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      const item = {
        id: Date.now().toString(),
        text: newChecklistItem.trim(),
        completed: false
      };
      setFormData(prev => ({
        ...prev,
        checklist: [...prev.checklist, item]
      }));
      setNewChecklistItem('');
    }
  };

  const handleRemoveChecklistItem = (itemId) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.filter(item => item.id !== itemId)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 pr-4 truncate">
            Criar Cartão em &quot;{listTitle}&quot;
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título do Cartão *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base"
              placeholder="Ex: Implementar sistema de login"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              rows="3"
              placeholder="Adicione mais detalhes sobre esta tarefa..."
            />
          </div>

          {/* Due Date and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Entrega
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prioridade
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Labels */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Etiquetas
              </label>
              <button
                type="button"
                onClick={() => setShowLabelForm(!showLabelForm)}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                + Adicionar
              </button>
            </div>

            {/* Current Labels */}
            {formData.labels.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.labels.map(label => (
                  <span
                    key={label.id}
                    onClick={() => handleRemoveLabel(label.id)}
                    className={`${labelColors[label.color]} text-white text-xs px-3 py-1 rounded-full font-medium cursor-pointer hover:opacity-80 transition-opacity`}
                    title={`Clique para remover ${label.name}`}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            )}

            {/* Add Label Form */}
            {showLabelForm && (
              <div className="bg-gray-50 p-3 rounded-lg space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newLabel.name}
                    onChange={(e) => setNewLabel(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nome da etiqueta"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <select
                    value={newLabel.color}
                    onChange={(e) => setNewLabel(prev => ({ ...prev, color: e.target.value }))}
                    className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {Object.keys(labelColors).map(color => (
                      <option key={color} value={color} className="capitalize">
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddLabel}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Adicionar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLabelForm(false)}
                    className="text-gray-600 hover:text-gray-800 px-3 py-1 text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Members */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsáveis
            </label>
            <div className="space-y-2">
              {users.map(user => (
                <label key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.members.includes(user.id)}
                    onChange={() => handleToggleMember(user.id)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Checklist
            </label>
            
            {/* Current Items */}
            {formData.checklist.length > 0 && (
              <div className="space-y-2 mb-3">
                {formData.checklist.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                    <span className="flex-1 text-sm text-gray-900">{item.text}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveChecklistItem(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Item */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                placeholder="Adicionar item ao checklist..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddChecklistItem())}
              />
              <button
                type="button"
                onClick={handleAddChecklistItem}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                Adicionar
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Criar Cartão
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}