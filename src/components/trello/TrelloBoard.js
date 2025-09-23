'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useBoardContext } from '@/contexts/BoardContext';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import TrelloList from './TrelloList';
import TrelloCard from './TrelloCard';
import { Plus, ArrowLeft, Users, Settings, Filter, Search } from 'lucide-react';

export default function TrelloBoard({ board }) {
  const { dispatch } = useBoardContext();
  const [activeCard, setActiveCard] = useState(null);
  const [showCreateList, setShowCreateList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLabel, setFilterLabel] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const handleDragEnd = useCallback((event) => {
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
      // Moving between lists
      const sourceList = board.lists.find(list => list.id === sourceData.listId);
      const destList = board.lists.find(list => list.id === destData.listId);
      
      dispatch({
        type: 'MOVE_CARD',
        payload: {
          boardId: board.id,
          sourceListId: sourceData.listId,
          destinationListId: destData.listId,
          sourceIndex: sourceData.index,
          destinationIndex: destData.index || destList.cards.length
        }
      });
    } else {
      // Reordering within same list
      const list = board.lists.find(list => list.id === sourceData.listId);
      const oldIndex = sourceData.index;
      const newIndex = destData.index;

      if (oldIndex !== newIndex) {
        const newCards = arrayMove(list.cards, oldIndex, newIndex);
        dispatch({
          type: 'UPDATE_LIST',
          payload: {
            boardId: board.id,
            listId: sourceData.listId,
            updates: { cards: newCards }
          }
        });
      }
    }
  }, [board, findCardLocation, findListLocation, dispatch]);

  const handleCreateList = useCallback((e) => {
    e.preventDefault();
    if (newListTitle.trim()) {
      dispatch({
        type: 'CREATE_LIST',
        payload: {
          boardId: board?.id,
          list: { title: newListTitle.trim() }
        }
      });
      setNewListTitle('');
      setShowCreateList(false);
    }
  }, [newListTitle, board?.id, dispatch]);

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

  if (!board) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Nenhum quadro selecionado</h2>
          <p className="text-gray-600">Selecione um quadro para começar</p>
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
                  onClick={() => dispatch({ type: 'CLEAR_CURRENT_BOARD' })}
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
                <Search className="w-4 h-4 text-white text-opacity-60 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar cartões..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-60 pl-10 pr-4 py-2 rounded-lg text-sm focus:bg-opacity-30 focus:outline-none"
                />
              </div>

              <select
                value={filterLabel}
                onChange={(e) => setFilterLabel(e.target.value)}
                className="w-full bg-white bg-opacity-20 text-white rounded-lg px-3 py-2 text-sm focus:bg-opacity-30 focus:outline-none"
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
                onClick={() => dispatch({ type: 'CLEAR_CURRENT_BOARD' })}
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
                <Search className="w-4 h-4 text-white text-opacity-60 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar cartões..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-60 pl-10 pr-4 py-2 rounded-lg text-sm focus:bg-opacity-30 focus:outline-none w-64"
                />
              </div>

              {/* Filter */}
              <select
                value={filterLabel}
                onChange={(e) => setFilterLabel(e.target.value)}
                className="bg-white bg-opacity-20 text-white rounded-lg px-3 py-2 text-sm focus:bg-opacity-30 focus:outline-none min-w-[180px]"
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
                  <TrelloList
                    key={list.id}
                    list={list}
                    boardId={board.id}
                  />
                ))}
              </SortableContext>

              {/* Add List */}
              <div className="min-w-[280px] sm:min-w-[300px]">
                {showCreateList ? (
                  <div className="bg-white rounded-lg p-3 shadow-md">
                    <form onSubmit={handleCreateList}>
                      <input
                        type="text"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        placeholder="Insira o título da lista..."
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                        autoFocus
                      />
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <button
                          type="submit"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded text-sm transition-colors flex-1"
                        >
                          Adicionar lista
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowCreateList(false);
                            setNewListTitle('');
                          }}
                          className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm transition-colors border border-gray-300 rounded hover:bg-gray-50"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCreateList(true)}
                    className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 min-h-[120px] border-2 border-dashed border-white border-opacity-30 hover:border-opacity-50"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-sm sm:text-base">Adicionar uma lista</span>
                  </button>
                )}
              </div>
            </div>

            <DragOverlay>
              {activeCard ? (
                <div className="transform rotate-3">
                  <TrelloCard card={activeCard} isDragOverlay />
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