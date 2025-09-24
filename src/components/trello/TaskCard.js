'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Calendar,
  MessageSquare,
  Paperclip,
  CheckSquare,
  User,
  Clock,
  AlertCircle,
  Edit3,
  Trash2
} from 'lucide-react';

const priorityColors = {
  alta: 'border-red-400 bg-red-50',
  media: 'border-yellow-400 bg-yellow-50',
  baixa: 'border-green-400 bg-green-50'
};

const priorityTextColors = {
  alta: 'text-red-700',
  media: 'text-yellow-700',
  baixa: 'text-green-700'
};

export default function TaskCard({ card, isDragOverlay = false, onEdit, onDelete }) {
  const [showActions, setShowActions] = useState(false);

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
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isPastDue = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer group
        ${isDragging ? 'opacity-50' : ''}
        ${isDragOverlay ? 'rotate-3 shadow-lg' : ''}
        ${priorityColors[card.priority] || 'border-gray-200'}
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="p-3">
        {/* Priority Label */}
        {card.priority && card.priority !== 'media' && (
          <div className="flex items-center mb-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${priorityTextColors[card.priority]} bg-white border`}>
              {card.priority === 'alta' ? 'Alta' : card.priority === 'baixa' ? 'Baixa' : 'Média'}
            </div>
          </div>
        )}

        {/* Title */}
        <h4 className="text-sm font-medium text-gray-900 mb-2 leading-snug">
          {card.title}
        </h4>

        {/* Description Preview */}
        {card.description && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {card.description}
          </p>
        )}

        {/* Due Date */}
        {card.dueDate && (
          <div className={`flex items-center mb-2 text-xs ${
            isPastDue(card.dueDate) ? 'text-red-600' : 'text-gray-600'
          }`}>
            {isPastDue(card.dueDate) ? (
              <AlertCircle className="w-3 h-3 mr-1" />
            ) : (
              <Calendar className="w-3 h-3 mr-1" />
            )}
            <span>{formatDate(card.dueDate)}</span>
          </div>
        )}

        {/* Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Labels */}
            {card.labels && card.labels.length > 0 && (
              <div className="flex space-x-1">
                {card.labels.slice(0, 3).map((label, index) => (
                  <div
                    key={index}
                    className={`w-8 h-2 rounded-full ${getLabelColor(label.color)}`}
                    title={label.name}
                  />
                ))}
                {card.labels.length > 3 && (
                  <span className="text-xs text-gray-500">+{card.labels.length - 3}</span>
                )}
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            {/* Comments */}
            {card.comments && card.comments.length > 0 && (
              <div className="flex items-center">
                <MessageSquare className="w-3 h-3 mr-1" />
                <span>{card.comments.length}</span>
              </div>
            )}

            {/* Checklist */}
            {card.checklist && card.checklist.length > 0 && (
              <div className="flex items-center">
                <CheckSquare className="w-3 h-3 mr-1" />
                <span>
                  {card.checklist.filter(item => item.completed).length}/{card.checklist.length}
                </span>
              </div>
            )}

            {/* Attachments */}
            {card.attachments && card.attachments.length > 0 && (
              <div className="flex items-center">
                <Paperclip className="w-3 h-3 mr-1" />
                <span>{card.attachments.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {showActions && (
          <div className="flex items-center justify-end space-x-1 mt-2 pt-2 border-t border-gray-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit(card);
              }}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Editar"
            >
              <Edit3 className="w-3 h-3 text-gray-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(card);
              }}
              className="p-1 hover:bg-red-100 rounded transition-colors"
              title="Excluir"
            >
              <Trash2 className="w-3 h-3 text-red-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function getLabelColor(color) {
  const colors = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    gray: 'bg-gray-500'
  };
  return colors[color] || 'bg-gray-400';
}