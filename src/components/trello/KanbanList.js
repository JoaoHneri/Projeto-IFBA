'use client';

import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TrelloCard from './TrelloCard';
import { Plus, X } from 'lucide-react';

export default function KanbanList({
  list,
  onCreateTask,
  creatingTask = false
}) {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

  const { setNodeRef } = useDroppable({
    id: list.id,
  });

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (newCardTitle.trim() && onCreateTask) {
      const success = await onCreateTask(list.id, newCardTitle.trim());
      if (success) {
        setNewCardTitle('');
        setShowAddCard(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente': return 'bg-orange-100 border-orange-200';
      case 'andamento': return 'bg-blue-100 border-blue-200';
      case 'concluida': return 'bg-green-100 border-green-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'pendente': return 'text-orange-700';
      case 'andamento': return 'text-blue-700';
      case 'concluida': return 'text-green-700';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="min-w-[280px] max-w-[280px]">
      <div className={`rounded-lg shadow-sm border ${getStatusColor(list.id)}`}>
        {/* Header */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-medium ${getStatusTextColor(list.id)}`}>
              {list.title}
            </h3>
            <span className={`text-xs ${getStatusTextColor(list.id)} px-2 py-1 rounded-full bg-white`}>
              {list.cards.length}
            </span>
          </div>
        </div>

        {/* Cards */}
        <div ref={setNodeRef} className="p-3 space-y-3 min-h-[200px]">
          <SortableContext
            items={list.cards.map(card => card.id)}
            strategy={verticalListSortingStrategy}
          >
            {list.cards.map((card) => (
              <TrelloCard
                key={card.id}
                card={card}
                listId={list.id}
              />
            ))}
          </SortableContext>

          {/* Add Card Form */}
          {showAddCard ? (
            <form onSubmit={handleAddCard} className="space-y-2">
              <textarea
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Digite o título da tarefa..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                rows={3}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={creatingTask || !newCardTitle.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  {creatingTask ? 'Criando...' : 'Adicionar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCard(false);
                    setNewCardTitle('');
                  }}
                  className="text-gray-600 hover:text-gray-800 px-3 py-1 text-sm transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowAddCard(true)}
              className="w-full py-2 px-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-gray-400"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Adicionar tarefa</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}