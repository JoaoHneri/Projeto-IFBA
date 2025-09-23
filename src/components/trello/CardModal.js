'use client';

import React, { useState } from 'react';
import { useBoardContext } from '@/contexts/BoardContext';
import { 
  X, 
  Calendar, 
  User, 
  Tag, 
  Paperclip, 
  CheckSquare, 
  MessageSquare, 
  Clock,
  Plus,
  Trash2,
  Copy,
  Archive,
  Eye,
  Edit3,
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

export default function CardModal({ card, listId, boardId, onClose }) {
  const { dispatch, boards, users } = useBoardContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title);
  const [editDescription, setEditDescription] = useState(card.description || '');
  const [newComment, setNewComment] = useState('');
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [showLabelSelector, setShowLabelSelector] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const board = boards.find(b => b.id === boardId);
  const list = board?.lists.find(l => l.id === listId);

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_CARD',
      payload: {
        boardId,
        listId,
        cardId: card.id,
        updates: {
          title: editTitle,
          description: editDescription
        }
      }
    });
    setIsEditing(false);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      dispatch({
        type: 'ADD_COMMENT',
        payload: {
          boardId,
          listId,
          cardId: card.id,
          author: 'Usuário Atual',
          text: newComment.trim()
        }
      });
      setNewComment('');
    }
  };

  const handleAddChecklistItem = (e) => {
    e.preventDefault();
    if (newChecklistItem.trim()) {
      const updatedChecklist = [
        ...card.checklist,
        {
          id: Date.now().toString(),
          text: newChecklistItem.trim(),
          completed: false
        }
      ];
      
      dispatch({
        type: 'UPDATE_CARD',
        payload: {
          boardId,
          listId,
          cardId: card.id,
          updates: { checklist: updatedChecklist }
        }
      });
      setNewChecklistItem('');
    }
  };

  const handleToggleChecklistItem = (itemId) => {
    const updatedChecklist = card.checklist.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    
    dispatch({
      type: 'UPDATE_CARD',
      payload: {
        boardId,
        listId,
        cardId: card.id,
        updates: { checklist: updatedChecklist }
      }
    });
  };

  const handleAddLabel = (labelName, color) => {
    const newLabel = {
      id: Date.now().toString(),
      name: labelName,
      color: color
    };
    
    const updatedLabels = [...card.labels, newLabel];
    
    dispatch({
      type: 'UPDATE_CARD',
      payload: {
        boardId,
        listId,
        cardId: card.id,
        updates: { labels: updatedLabels }
      }
    });
    setShowLabelSelector(false);
  };

  const handleRemoveLabel = (labelId) => {
    const updatedLabels = card.labels.filter(label => label.id !== labelId);
    
    dispatch({
      type: 'UPDATE_CARD',
      payload: {
        boardId,
        listId,
        cardId: card.id,
        updates: { labels: updatedLabels }
      }
    });
  };

  const handleSetDueDate = (date) => {
    dispatch({
      type: 'UPDATE_CARD',
      payload: {
        boardId,
        listId,
        cardId: card.id,
        updates: { dueDate: date ? new Date(date) : null }
      }
    });
    setShowDatePicker(false);
  };

  const completedChecklist = card.checklist.filter(item => item.completed).length;
  const totalChecklist = card.checklist.length;
  const checklistProgress = totalChecklist > 0 ? (completedChecklist / totalChecklist) * 100 : 0;

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatDateTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mt-8 mb-8">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-xl font-semibold bg-transparent border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditTitle(card.title);
                      setEditDescription(card.description || '');
                    }}
                    className="text-gray-600 hover:text-gray-800 px-3 py-1 text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Edit3 className="w-5 h-5 text-gray-400" />
                <h2 
                  onClick={() => setIsEditing(true)}
                  className="text-xl font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                >
                  {card.title}
                </h2>
              </div>
            )}
            
            <p className="text-sm text-gray-600 mt-2">
              na lista <span className="font-medium">{list?.title}</span>
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6 space-y-6">
            {/* Labels */}
            {card.labels.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Etiquetas</h3>
                <div className="flex flex-wrap gap-1">
                  {card.labels.map((label) => (
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
              </div>
            )}

            {/* Due Date Display */}
            {card.dueDate && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Data de Entrega</h3>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded text-sm ${
                  new Date(card.dueDate) < new Date() 
                    ? 'bg-red-100 text-red-700' 
                    : new Date(card.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000)
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(card.dueDate)}</span>
                </div>
              </div>
            )}

            {/* Members */}
            {card.members.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Membros</h3>
                <div className="flex flex-wrap gap-2">
                  {card.members.map((memberId, index) => (
                    <div
                      key={memberId}
                      className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-sm text-gray-700">Membro {index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Edit3 className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-900">Descrição</h3>
              </div>
              
              {isEditing ? (
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  placeholder="Adicione uma descrição mais detalhada..."
                />
              ) : (
                <div
                  onClick={() => setIsEditing(true)}
                  className="min-h-[60px] p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                >
                  {card.description ? (
                    <p className="text-gray-900 whitespace-pre-wrap">{card.description}</p>
                  ) : (
                    <p className="text-gray-500">Adicione uma descrição mais detalhada...</p>
                  )}
                </div>
              )}
            </div>

            {/* Checklist */}
            {(card.checklist.length > 0 || newChecklistItem) && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-900">Checklist</h3>
                  </div>
                  {totalChecklist > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            checklistProgress === 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${checklistProgress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {Math.round(checklistProgress)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {card.checklist.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggleChecklistItem(item.id)}
                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <span className={`flex-1 text-sm ${
                        item.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddChecklistItem} className="mt-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      placeholder="Adicionar item..."
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      Adicionar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Comments */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-900">Comentários</h3>
              </div>

              {/* Add Comment */}
              <form onSubmit={handleAddComment} className="mb-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    U
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Escreva um comentário..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                      rows="3"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm transition-colors"
                      >
                        Comentar
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {card.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {comment.author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">{formatDateTime(comment.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            {card.activity.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-900">Atividade</h3>
                </div>
                
                <div className="space-y-2">
                  {card.activity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                      <span className="font-medium">{activity.author}</span>
                      <span>{activity.description}</span>
                      <span>•</span>
                      <span>{formatDateTime(activity.timestamp)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-48 p-6 bg-gray-50 border-l border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Ações</h3>
            
            <div className="space-y-2">
              {/* Labels */}
              <div className="relative">
                <button
                  onClick={() => setShowLabelSelector(!showLabelSelector)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Tag className="w-4 h-4" />
                  Etiquetas
                </button>
                
                {showLabelSelector && (
                  <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 min-w-[200px]">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Adicionar Etiqueta</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(labelColors).map(([color, className]) => (
                        <button
                          key={color}
                          onClick={() => {
                            const labelName = prompt('Nome da etiqueta:');
                            if (labelName) handleAddLabel(labelName, color);
                          }}
                          className={`${className} text-white text-xs py-2 px-3 rounded hover:opacity-80 transition-opacity capitalize`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Due Date */}
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Data de Entrega
                </button>
                
                {showDatePicker && (
                  <div className="absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 min-w-[200px]">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Data de Entrega</h4>
                    <input
                      type="date"
                      onChange={(e) => handleSetDueDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {card.dueDate && (
                      <button
                        onClick={() => handleSetDueDate(null)}
                        className="w-full mt-2 text-sm text-red-600 hover:text-red-800 transition-colors"
                      >
                        Remover data
                      </button>
                    )}
                  </div>
                )}
              </div>

              {card.dueDate && (
                <div className="px-3 py-2 text-xs text-gray-600">
                  Data: {formatDate(card.dueDate)}
                </div>
              )}

              {/* Members */}
              <button
                onClick={() => {
                  const currentMembers = card.members || [];
                  const newMemberId = `user${currentMembers.length + 1}`;
                  dispatch({
                    type: 'UPDATE_CARD',
                    payload: {
                      boardId,
                      listId,
                      cardId: card.id,
                      updates: { members: [...currentMembers, newMemberId] }
                    }
                  });
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                Membros
              </button>

              {/* Checklist */}
              <button
                onClick={() => setNewChecklistItem('Nova tarefa')}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <CheckSquare className="w-4 h-4" />
                Checklist
              </button>

              {/* Cover */}
              <button
                onClick={() => {
                  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'gray'];
                  const randomColor = colors[Math.floor(Math.random() * colors.length)];
                  dispatch({
                    type: 'UPDATE_CARD',
                    payload: {
                      boardId,
                      listId,
                      cardId: card.id,
                      updates: { cover: randomColor }
                    }
                  });
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded"></div>
                Capa
              </button>

              {/* Separator */}
              <hr className="my-2 border-gray-300" />

              {/* Copy */}
              <button
                onClick={() => {
                  dispatch({
                    type: 'CREATE_CARD',
                    payload: {
                      boardId,
                      listId,
                      card: {
                        ...card,
                        title: `${card.title} (cópia)`,
                        id: undefined
                      }
                    }
                  });
                  onClose();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copiar
              </button>

              {/* Archive */}
              <button
                onClick={() => {
                  dispatch({
                    type: 'UPDATE_CARD',
                    payload: {
                      boardId,
                      listId,
                      cardId: card.id,
                      updates: { archived: !card.archived }
                    }
                  });
                  onClose();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Archive className="w-4 h-4" />
                {card.archived ? 'Desarquivar' : 'Arquivar'}
              </button>

              {/* Separator */}
              <hr className="my-2 border-gray-300" />

              {/* Delete */}
              <button
                onClick={() => {
                  if (window.confirm('Tem certeza que deseja excluir este cartão?')) {
                    dispatch({
                      type: 'DELETE_CARD',
                      payload: { boardId, listId, cardId: card.id }
                    });
                    onClose();
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}