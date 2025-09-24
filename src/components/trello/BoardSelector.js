'use client';

import React, { useState, useEffect } from 'react';
import { useBoardContext } from '@/contexts/BoardContext';
import { Plus, X, MoreHorizontal, Users, Lock, Globe } from 'lucide-react';

const backgroundColors = {
  emerald: 'bg-gradient-to-br from-emerald-500 to-teal-600',
  blue: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  purple: 'bg-gradient-to-br from-purple-500 to-pink-600',
  orange: 'bg-gradient-to-br from-orange-500 to-red-600',
  gray: 'bg-gradient-to-br from-gray-500 to-slate-600'
};

export default function BoardSelector() {
  const { boards, currentBoard, dispatch } = useBoardContext();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showBoardOptions, setShowBoardOptions] = useState(null);
  const [newBoard, setNewBoard] = useState({
    title: '',
    description: '',
    visibility: 'team',
    background: 'emerald'
  });

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.board-options-container')) {
        setShowBoardOptions(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleCreateBoard = (e) => {
    e.preventDefault();
    if (newBoard.title.trim()) {
      dispatch({
        type: 'CREATE_BOARD',
        payload: {
          ...newBoard,
          createdAt: new Date(),
          members: ['user1'],
          lists: [
            {
              id: 'default-list-1',
              title: 'A Fazer',
              position: 0,
              cards: []
            },
            {
              id: 'default-list-2',
              title: 'Em Progresso',
              position: 1,
              cards: []
            },
            {
              id: 'default-list-3',
              title: 'Concluído',
              position: 2,
              cards: []
            }
          ]
        }
      });
      setNewBoard({ title: '', description: '', visibility: 'team', background: 'emerald' });
      setShowCreateForm(false);
    }
  };

  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'private': return <Lock className="w-4 h-4" />;
      case 'public': return <Globe className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getVisibilityText = (visibility) => {
    switch (visibility) {
      case 'private': return 'Privado';
      case 'public': return 'Público';
      default: return 'Equipe';
    }
  };

  const handleBoardOptionsClick = (e, boardId) => {
    e.stopPropagation();
    setShowBoardOptions(showBoardOptions === boardId ? null : boardId);
  };

  const handleDeleteBoard = (boardId) => {
    if (window.confirm('Tem certeza que deseja excluir este quadro? Esta ação não pode ser desfeita.')) {
      dispatch({ type: 'DELETE_BOARD', payload: { boardId } });
      setShowBoardOptions(null);
    }
  };

  const handleDuplicateBoard = (board) => {
    dispatch({
      type: 'CREATE_BOARD',
      payload: {
        ...board,
        id: undefined,
        title: `${board.title} (cópia)`,
        createdAt: new Date(),
      }
    });
    setShowBoardOptions(null);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Seus Quadros</h1>
            <p className="text-gray-600">Gerencie todos os seus projetos em um só lugar</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Criar Quadro
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {boards.map((board) => (
            <div
              key={board.id}
              className={`${backgroundColors[board.background]} p-6 rounded-lg shadow-md hover:shadow-lg transition-all group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 
                    onClick={() => dispatch({ type: 'SET_CURRENT_BOARD', payload: { boardId: board.id } })}
                    className="text-white font-semibold text-lg mb-2 line-clamp-2 cursor-pointer flex-1 hover:text-opacity-80 transition-opacity"
                  >
                    {board.title}
                  </h3>
                  <div className="relative board-options-container">
                    <button 
                      onClick={(e) => handleBoardOptionsClick(e, board.id)}
                      className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-all opacity-60 hover:opacity-100"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    
                    {showBoardOptions === board.id && (
                      <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[180px] z-50">
                        <button
                          onClick={() => {
                            dispatch({ type: 'SET_CURRENT_BOARD', payload: { boardId: board.id } });
                            setShowBoardOptions(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Abrir quadro
                        </button>
                        <button
                          onClick={() => handleDuplicateBoard(board)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Duplicar quadro
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={() => handleDeleteBoard(board.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Excluir quadro
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {board.description && (
                  <p className="text-white text-opacity-90 text-sm mb-4 line-clamp-2">
                    {board.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white text-opacity-90">
                    {getVisibilityIcon(board.visibility)}
                    <span className="text-sm">{getVisibilityText(board.visibility)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {board.members.length}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-white text-opacity-75 text-xs">
                  {board.lists.reduce((total, list) => total + list.cards.length, 0)} cartões
                </div>
              </div>
            </div>
          ))}

          {/* Card para criar novo quadro */}
          <div
            onClick={() => setShowCreateForm(true)}
            className="bg-gray-100 hover:bg-gray-200 p-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[200px] group"
          >
            <Plus className="w-8 h-8 text-gray-400 group-hover:text-gray-600 mb-2" />
            <span className="text-gray-600 group-hover:text-gray-800 font-medium">
              Criar Novo Quadro
            </span>
          </div>
        </div>

        {/* Modal de Criação de Quadro */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Criar Novo Quadro</h2>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateBoard} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Quadro *
                    </label>
                    <input
                      type="text"
                      value={newBoard.title}
                      onChange={(e) => setNewBoard(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Ex: Sistema E-commerce"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <textarea
                      value={newBoard.description}
                      onChange={(e) => setNewBoard(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                      rows="3"
                      placeholder="Descreva o objetivo deste quadro..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor de Fundo
                    </label>
                    <div className="flex gap-2">
                      {Object.entries(backgroundColors).map(([key, className]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setNewBoard(prev => ({ ...prev, background: key }))}
                          className={`w-10 h-10 rounded-lg ${className} ${
                            newBoard.background === key ? 'ring-2 ring-gray-900 ring-offset-2' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visibilidade
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'private', label: 'Privado', icon: Lock, desc: 'Apenas você pode ver' },
                        { value: 'team', label: 'Equipe', icon: Users, desc: 'Membros da equipe podem ver' },
                        { value: 'public', label: 'Público', icon: Globe, desc: 'Qualquer pessoa pode ver' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input
                            type="radio"
                            name="visibility"
                            value={option.value}
                            checked={newBoard.visibility === option.value}
                            onChange={(e) => setNewBoard(prev => ({ ...prev, visibility: e.target.value }))}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <option.icon className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{option.label}</div>
                            <div className="text-xs text-gray-500">{option.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Criar Quadro
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}