'use client';

import React, { useState, useEffect } from 'react';
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

  const handleDragEnd = (event) => {
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
  };

  const findCard = (cardId) => {
    for (const list of board.lists) {
      const card = list.cards.find(card => card.id === cardId);
      if (card) return card;
    }
    return null;
  };

  const findCardLocation = (cardId) => {
    for (const list of board.lists) {
      const cardIndex = list.cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        return { listId: list.id, index: cardIndex };
      }
    }
    return null;
  };

  const findListLocation = (listId) => {
    const list = board.lists.find(list => list.id === listId);
    return list ? { listId: list.id, index: list.cards.length } : null;
  };

  const handleCreateList = (e) => {
    e.preventDefault();
    if (newListTitle.trim()) {
      dispatch({
        type: 'CREATE_LIST',
        payload: {
          boardId: board.id,
          list: { title: newListTitle.trim() }
        }
      });
      setNewListTitle('');
      setShowCreateList(false);
    }
  };

  const filteredLists = board.lists.map(list => ({
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

  const allLabels = [...new Set(
    board.lists.flatMap(list => 
      list.cards.flatMap(card => 
        card.labels.map(label => label.name)
      )
    )
  )];

  const backgroundColors = {
    emerald: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    blue: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    purple: 'bg-gradient-to-br from-purple-500 to-pink-600',
    orange: 'bg-gradient-to-br from-orange-500 to-red-600',
    gray: 'bg-gradient-to-br from-gray-500 to-slate-600'
  };

  return (
    <div className={`min-h-screen ${backgroundColors[board.background]}`}>
      {/* Header */}
      <div className="bg-black bg-opacity-20 border-b border-white border-opacity-20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
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
                  className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-60 pl-10 pr-4 py-2 rounded-lg text-sm focus:bg-opacity-30 focus:outline-none"
                />
              </div>

              {/* Filter */}
              <select
                value={filterLabel}
                onChange={(e) => setFilterLabel(e.target.value)}
                className="bg-white bg-opacity-20 text-white rounded-lg px-3 py-2 text-sm focus:bg-opacity-30 focus:outline-none"
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
      <div className="p-6 overflow-x-auto">
        {isClient && (
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <div className="flex gap-6 min-h-[calc(100vh-200px)]">
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
              <div className="min-w-[280px]">
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
                      <div className="flex gap-2 mt-2">
                        <button
                          type="submit"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Adicionar lista
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowCreateList(false);
                            setNewListTitle('');
                          }}
                          className="text-gray-600 hover:text-gray-800 px-3 py-1 text-sm transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCreateList(true)}
                    className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Adicionar uma lista
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