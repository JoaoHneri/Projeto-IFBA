'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useBoardContext } from '@/contexts/BoardContext';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TrelloCard from './TrelloCard';
import CreateCardModal from './CreateCardModal';
import { Plus, MoreHorizontal, X } from 'lucide-react';

export default function TrelloList({ list, boardId }) {
  const { dispatch } = useBoardContext();
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(list.title);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { setNodeRef } = useDroppable({
    id: list.id,
  });

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCardTitle.trim()) {
      dispatch({
        type: 'CREATE_CARD',
        payload: {
          boardId,
          listId: list.id,
          card: {
            title: newCardTitle.trim(),
            description: '',
            labels: [],
            members: [],
            checklist: [],
            attachments: [],
            comments: [],
            activity: []
          }
        }
      });
      setNewCardTitle('');
      setShowAddCard(false);
    }
  };

  const handleUpdateTitle = (e) => {
    e.preventDefault();
    if (editTitle.trim()) {
      dispatch({
        type: 'UPDATE_LIST',
        payload: {
          boardId,
          listId: list.id,
          updates: { title: editTitle.trim() }
        }
      });
    }
    setIsEditingTitle(false);
  };

  const handleDeleteList = () => {
    if (window.confirm('Tem certeza que deseja excluir esta lista? Esta ação não pode ser desfeita.')) {
      dispatch({
        type: 'DELETE_LIST',
        payload: { boardId, listId: list.id }
      });
    }
  };

  return (
    <div className="min-w-[280px] max-w-[280px] sm:min-w-[300px] sm:max-w-[300px]">
      <div className="bg-gray-100 rounded-lg shadow-sm">
        {/* List Header */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between gap-2">
            {isEditingTitle ? (
              <form onSubmit={handleUpdateTitle} className="flex-1 min-w-0">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-2 py-1 text-sm font-medium bg-white border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  autoFocus
                  onBlur={handleUpdateTitle}
                />
              </form>
            ) : (
              <h3
                onClick={() => setIsEditingTitle(true)}
                className="flex-1 min-w-0 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded truncate"
              >
                {list.title}
              </h3>
            )}
            
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                {list.cards.length}
              </span>
              
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-200 p-1 rounded transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                
                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[180px]">
                    <button
                      onClick={() => {
                        setIsEditingTitle(true);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Editar título
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateModal(true);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Adicionar cartão completo
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteList();
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Excluir lista
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div 
          ref={setNodeRef}
          className="p-3 space-y-3 min-h-[50px] max-h-[calc(100vh-300px)] overflow-y-auto"
        >
          <SortableContext items={list.cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
            {list.cards.map((card) => (
              <TrelloCard
                key={card.id}
                card={card}
                listId={list.id}
                boardId={boardId}
              />
            ))}
          </SortableContext>

          {/* Add Card Form */}
          {showAddCard && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-300">
              <form onSubmit={handleAddCard}>
                <textarea
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  placeholder="Insira um título para este cartão..."
                  className="w-full px-3 py-2 text-sm resize-none border-none rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  rows="2"
                  autoFocus
                />
                <div className="flex items-center gap-2 px-3 pb-2">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Adicionar cartão
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddCard(false);
                      setNewCardTitle('');
                    }}
                    className="text-gray-600 hover:text-gray-800 p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Add Card Button */}
        {!showAddCard && (
          <div className="p-3 pt-0">
            <button
              onClick={() => setShowAddCard(true)}
              className="w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Adicionar um cartão
            </button>
          </div>
        )}
      </div>

      {/* Create Card Modal */}
      <CreateCardModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        listId={list.id}
        boardId={boardId}
        listTitle={list.title}
      />
    </div>
  );
}