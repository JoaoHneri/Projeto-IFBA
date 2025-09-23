'use client';

import React, { useState } from 'react';
import { useBoardContext } from '@/contexts/BoardContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Calendar, 
  MessageSquare, 
  Paperclip, 
  CheckSquare, 
  User, 
  Clock,
  Eye,
  Edit3,
  Copy,
  Archive,
  Trash2
} from 'lucide-react';
import CardModal from './CardModal';

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

export default function TrelloCard({ card, listId, boardId, isDragOverlay = false }) {
  const { dispatch } = useBoardContext();
  const [showModal, setShowModal] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    disabled: isDragOverlay,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const completedChecklist = card.checklist.filter(item => item.completed).length;
  const totalChecklist = card.checklist.length;
  const checklistProgress = totalChecklist > 0 ? (completedChecklist / totalChecklist) * 100 : 0;

  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();
  const isDueSoon = card.dueDate && new Date(card.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000);

  const handleQuickEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
  };

  const handleCardClick = (e) => {
    // Só abre o modal se não estiver clicando em um botão
    if (!e.target.closest('button')) {
      setShowModal(true);
    }
  };

  const handleDuplicate = (e) => {
    e.stopPropagation();
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
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir este cartão?')) {
      dispatch({
        type: 'DELETE_CARD',
        payload: { boardId, listId, cardId: card.id }
      });
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all group relative ${
          isDragOverlay ? 'rotate-3 shadow-lg' : ''
        } ${card.cover ? `border-l-4 border-l-${labelColors[card.cover].replace('bg-', '')}` : ''}`}
        onMouseEnter={() => setShowQuickActions(true)}
        onMouseLeave={() => setShowQuickActions(false)}
      >
        {/* Drag Handle - área específica para drag */}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 w-4 h-4 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-60 transition-opacity z-10"
          title="Arrastar cartão"
        >
          <div className="w-full h-full bg-gray-400 rounded-sm flex flex-col justify-center items-center">
            <div className="w-2 h-0.5 bg-white mb-0.5"></div>
            <div className="w-2 h-0.5 bg-white mb-0.5"></div>
            <div className="w-2 h-0.5 bg-white"></div>
          </div>
        </div>

        {/* Conteúdo clicável do cartão */}
        <div
          onClick={handleCardClick}
          className="cursor-pointer w-full h-full"
        >
          {/* Cover Image/Color */}
          {card.cover && (
            <div className={`h-8 ${labelColors[card.cover]} rounded-t-lg`}></div>
          )}

          {/* Labels */}
          {card.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 p-3 pb-2">
              {card.labels.map((label) => (
                <span
                  key={label.id}
                  className={`${labelColors[label.color]} text-white text-xs px-2 py-1 rounded-full font-medium`}
                  title={label.name}
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <div className={`px-3 py-2 ${card.cover || card.labels.length > 0 ? '' : 'pt-3'}`}>
            <h4 className="text-sm font-medium text-gray-900 line-clamp-3">
              {card.title}
            </h4>
            
            {/* Priority Badge */}
            {card.priority && card.priority !== 'media' && (
              <div className="mt-2">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  card.priority === 'baixa' ? 'bg-green-100 text-green-700' :
                  card.priority === 'alta' ? 'bg-red-100 text-red-700' :
                  card.priority === 'critica' ? 'bg-purple-100 text-purple-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {card.priority === 'baixa' ? 'Baixa' :
                   card.priority === 'alta' ? 'Alta' :
                   card.priority === 'critica' ? 'Crítica' : 'Média'}
                </span>
              </div>
            )}
          </div>

          {/* Description Preview */}
          {card.description && (
            <div className="px-3 pb-2">
              <p className="text-xs text-gray-600 line-clamp-2">
                {card.description}
              </p>
            </div>
          )}

          {/* Checklist Progress */}
          {totalChecklist > 0 && (
            <div className="px-3 pb-2">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-3 h-3 text-gray-500" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      checklistProgress === 100 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${checklistProgress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">
                  {completedChecklist}/{totalChecklist}
                </span>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-3 pb-3">
            <div className="flex items-center justify-between">
              {/* Left side - icons */}
              <div className="flex items-center gap-2">
                {card.dueDate && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                      isOverdue
                        ? 'bg-red-100 text-red-700'
                        : isDueSoon
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(card.dueDate)}</span>
                  </div>
                )}

                {card.comments.length > 0 && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageSquare className="w-3 h-3" />
                    <span className="text-xs">{card.comments.length}</span>
                  </div>
                )}

                {card.attachments.length > 0 && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <Paperclip className="w-3 h-3" />
                    <span className="text-xs">{card.attachments.length}</span>
                  </div>
                )}
              </div>

              {/* Right side - members */}
              {card.members.length > 0 && (
                <div className="flex -space-x-1">
                  {card.members.slice(0, 3).map((memberId, index) => (
                    <div
                      key={memberId}
                      className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                      title={`Membro ${index + 1}`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                  ))}
                  {card.members.length > 3 && (
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
                      +{card.members.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions (hover) */}
        {showQuickActions && !isDragOverlay && (
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <button
              onClick={handleQuickEdit}
              className="bg-gray-800 bg-opacity-80 text-white p-1 rounded hover:bg-opacity-100 transition-colors"
              title="Editar"
            >
              <Edit3 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Card Modal */}
      {showModal && (
        <CardModal
          card={card}
          listId={listId}
          boardId={boardId}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}