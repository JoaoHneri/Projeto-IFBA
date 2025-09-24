'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BoardContext = createContext();

// Função para validar e corrigir dados de cartões
const validateAndFixCard = (card) => {
  return {
    id: card.id || Date.now().toString(),
    title: card.title || 'Cartão sem título',
    description: card.description || '',
    position: card.position || 0,
    labels: Array.isArray(card.labels) ? card.labels : [],
    dueDate: card.dueDate || null,
    priority: card.priority || 'media',
    cover: card.cover || null,
    archived: card.archived || false,
    checklist: Array.isArray(card.checklist) ? card.checklist : [],
    attachments: Array.isArray(card.attachments) ? card.attachments : [],
    comments: Array.isArray(card.comments) ? card.comments : [],
    members: Array.isArray(card.members) ? card.members : [],
    activity: Array.isArray(card.activity) ? card.activity : []
  };
};

// Função para validar e corrigir dados de listas
const validateAndFixList = (list) => {
  return {
    id: list.id || Date.now().toString(),
    title: list.title || 'Lista sem título',
    position: list.position || 0,
    cards: Array.isArray(list.cards) ? list.cards.map(validateAndFixCard) : []
  };
};

// Função para validar e corrigir dados de boards
const validateAndFixBoard = (board) => {
  return {
    id: board.id || Date.now().toString(),
    title: board.title || 'Board sem título',
    description: board.description || '',
    visibility: board.visibility || 'team',
    background: board.background || 'emerald',
    createdAt: board.createdAt || new Date(),
    members: Array.isArray(board.members) ? board.members : [],
    lists: Array.isArray(board.lists) ? board.lists.map(validateAndFixList) : []
  };
};

// Estado inicial com dados de exemplo
const initialState = {
  currentBoard: null,
  boards: [
    {
      id: '1',
      title: 'Website Corporativo',
      description: 'Desenvolvimento do novo site institucional',
      visibility: 'team',
      background: 'emerald',
      createdAt: new Date('2025-09-01'),
      members: ['user1', 'user2', 'user3'],
      lists: [
        {
          id: 'list1',
          title: 'A Fazer',
          position: 0,
          cards: [
            {
              id: 'card1',
              title: 'Design do Header',
              description: 'Criar o design do cabeçalho principal do site com navegação responsiva',
              position: 0,
              labels: [
                { id: 'label1', name: 'Design', color: 'blue' },
                { id: 'label2', name: 'Urgente', color: 'red' }
              ],
              dueDate: new Date('2025-10-01'),
              priority: 'alta',
              cover: null,
              archived: false,
              checklist: [
                { id: 'check1', text: 'Wireframe do header', completed: true },
                { id: 'check2', text: 'Design visual', completed: false },
                { id: 'check3', text: 'Versão mobile', completed: false }
              ],
              attachments: [],
              comments: [
                {
                  id: 'comment1',
                  author: 'João Silva',
                  text: 'Precisamos definir as cores principais antes de começar',
                  createdAt: new Date('2025-09-20')
                }
              ],
              members: ['user1'],
              activity: [
                {
                  id: 'activity1',
                  type: 'created',
                  author: 'João Silva',
                  timestamp: new Date('2025-09-15'),
                  description: 'criou este cartão'
                }
              ]
            }
          ]
        },
        {
          id: 'list2',
          title: 'Em Progresso',
          position: 1,
          cards: [
            {
              id: 'card2',
              title: 'Configurar Ambiente de Desenvolvimento',
              description: 'Configurar Next.js, Tailwind e outras dependências',
              position: 0,
              labels: [
                { id: 'label3', name: 'Desenvolvimento', color: 'green' }
              ],
              dueDate: null,
              priority: 'media',
              cover: null,
              archived: false,
              checklist: [
                { id: 'check4', text: 'Instalar Next.js', completed: true },
                { id: 'check5', text: 'Configurar Tailwind', completed: true },
                { id: 'check6', text: 'Setup ESLint', completed: false }
              ],
              attachments: [],
              comments: [],
              members: ['user2'],
              activity: [
                {
                  id: 'activity2',
                  type: 'created',
                  author: 'Maria Santos',
                  timestamp: new Date('2025-09-16'),
                  description: 'criou este cartão'
                }
              ]
            }
          ]
        },
        {
          id: 'list3',
          title: 'Concluído',
          position: 2,
          cards: [
            {
              id: 'card3',
              title: 'Planejamento do Projeto',
              description: 'Definir escopo, tecnologias e cronograma',
              position: 0,
              labels: [
                { id: 'label4', name: 'Planejamento', color: 'purple' }
              ],
              dueDate: new Date('2025-09-10'),
              priority: 'alta',
              cover: 'green',
              archived: false,
              checklist: [
                { id: 'check7', text: 'Definir escopo', completed: true },
                { id: 'check8', text: 'Escolher tecnologias', completed: true },
                { id: 'check9', text: 'Criar cronograma', completed: true }
              ],
              attachments: [
                {
                  id: 'attach1',
                  name: 'cronograma.pdf',
                  url: '#',
                  type: 'pdf',
                  uploadedAt: new Date('2025-09-05')
                }
              ],
              comments: [],
              members: ['user1', 'user3'],
              activity: [
                {
                  id: 'activity3',
                  type: 'created',
                  author: 'João Silva',
                  timestamp: new Date('2025-09-01'),
                  description: 'criou este cartão'
                },
                {
                  id: 'activity4',
                  type: 'completed',
                  author: 'João Silva',
                  timestamp: new Date('2025-09-10'),
                  description: 'marcou este cartão como concluído'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Reducer para gerenciar o estado dos boards
function boardReducer(state, action) {
  switch (action.type) {
    case 'CREATE_BOARD':
      return {
        ...state,
        boards: [...state.boards, {
          ...action.payload,
          id: Date.now().toString(),
          createdAt: new Date(),
          lists: [],
          members: []
        }]
      };

    case 'UPDATE_BOARD':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.id
            ? { ...board, ...action.payload.updates }
            : board
        )
      };

    case 'DELETE_BOARD':
      return {
        ...state,
        boards: state.boards.filter(board => board.id !== action.payload.boardId)
      };

    case 'CREATE_LIST':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: [...board.lists, {
                  ...action.payload.list,
                  id: Date.now().toString(),
                  position: board.lists.length,
                  cards: []
                }]
              }
            : board
        )
      };

    case 'UPDATE_LIST':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? { ...list, ...action.payload.updates }
                    : list
                )
              }
            : board
        )
      };

    case 'DELETE_LIST':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.filter(list => list.id !== action.payload.listId)
              }
            : board
        )
      };

    case 'CREATE_CARD':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: [...list.cards, {
                          ...action.payload.card,
                          id: Date.now().toString(),
                          position: list.cards.length,
                          labels: action.payload.card.labels || [],
                          checklist: action.payload.card.checklist || [],
                          attachments: action.payload.card.attachments || [],
                          comments: action.payload.card.comments || [],
                          members: action.payload.card.members || [],
                          dueDate: action.payload.card.dueDate || null,
                          priority: action.payload.card.priority || 'media',
                          cover: action.payload.card.cover || null,
                          archived: false,
                          activity: action.payload.card.activity || [{
                            id: Date.now().toString(),
                            type: 'created',
                            author: 'Usuário Atual',
                            timestamp: new Date(),
                            description: 'criou este cartão'
                          }]
                        }]
                      }
                    : list
                )
              }
            : board
        )
      };

    case 'UPDATE_CARD':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: list.cards.map(card =>
                          card.id === action.payload.cardId
                            ? { 
                                ...card, 
                                ...action.payload.updates,
                                activity: [
                                  {
                                    id: Date.now().toString(),
                                    type: 'updated',
                                    author: 'Usuário Atual',
                                    timestamp: new Date(),
                                    description: 'atualizou este cartão'
                                  },
                                  ...(card.activity || [])
                                ]
                              }
                            : card
                        )
                      }
                    : list
                )
              }
            : board
        )
      };

    case 'DELETE_CARD':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: list.cards.filter(card => card.id !== action.payload.cardId)
                      }
                    : list
                )
              }
            : board
        )
      };

    case 'MOVE_CARD':
      const { boardId, sourceListId, destinationListId, sourceIndex, destinationIndex } = action.payload;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('MOVE_CARD action:', action.payload);
      }
      
      return {
        ...state,
        boards: state.boards.map(board => {
          if (board.id !== boardId) return board;

          const newLists = [...board.lists];
          const sourceList = newLists.find(list => list.id === sourceListId);
          const destinationList = newLists.find(list => list.id === destinationListId);

          // Verificar se as listas existem
          if (!sourceList || !destinationList) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('MOVE_CARD: Lista não encontrada:', { 
                sourceListId, 
                destinationListId, 
                availableLists: newLists.map(l => ({ id: l.id, title: l.title }))
              });
            }
            return board;
          }

          // Verificar se o índice é válido
          if (sourceIndex < 0 || sourceIndex >= sourceList.cards.length) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('MOVE_CARD: Índice inválido:', { 
                sourceIndex, 
                cardsLength: sourceList.cards.length,
                sourceListId: sourceList.id,
                availableCards: sourceList.cards.map(c => ({ id: c.id, title: c.title }))
              });
            }
            return board;
          }

          // Remove card from source
          const [movedCard] = sourceList.cards.splice(sourceIndex, 1);
          
          // Verificar se o cartão foi encontrado
          if (!movedCard) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('MOVE_CARD: Cartão não encontrado no índice:', {
                sourceIndex,
                sourceListId: sourceList.id,
                cardsLength: sourceList.cards.length
              });
            }
            return board;
          }
          
          // Ensure movedCard has required properties
          const cardWithDefaults = {
            ...movedCard,
            activity: movedCard.activity || [],
            labels: movedCard.labels || [],
            checklist: movedCard.checklist || [],
            attachments: movedCard.attachments || [],
            comments: movedCard.comments || [],
            members: movedCard.members || []
          };
          
          // Add card to destination
          destinationList.cards.splice(destinationIndex, 0, {
            ...cardWithDefaults,
            activity: [
              {
                id: Date.now().toString(),
                type: 'moved',
                author: 'Usuário Atual',
                timestamp: new Date(),
                description: `moveu este cartão de "${sourceList.title}" para "${destinationList.title}"`
              },
              ...(cardWithDefaults.activity || [])
            ]
          });

          return {
            ...board,
            lists: newLists
          };
        })
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: list.cards.map(card =>
                          card.id === action.payload.cardId
                            ? {
                                ...card,
                                comments: [...(card.comments || []), {
                                  id: Date.now().toString(),
                                  text: action.payload.text,
                                  author: action.payload.author,
                                  createdAt: new Date()
                                }],
                                activity: [
                                  {
                                    id: Date.now().toString(),
                                    type: 'comment',
                                    author: action.payload.author,
                                    timestamp: new Date(),
                                    description: 'adicionou um comentário'
                                  },
                                  ...(card.activity || [])
                                ]
                              }
                            : card
                        )
                      }
                    : list
                )
              }
            : board
        )
      };

    case 'RESTORE_STATE':
      return {
        ...state,
        boards: action.payload.boards
      };

    case 'SET_CURRENT_BOARD':
      return {
        ...state,
        currentBoard: action.payload.boardId
      };

    case 'CLEAR_CURRENT_BOARD':
      return {
        ...state,
        currentBoard: null
      };

    default:
      return state;
  }
}

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  // Persistir no localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('synchro-boards');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed && Array.isArray(parsed.boards)) {
          // Validar e corrigir dados antes de restaurar
          const validatedBoards = parsed.boards.map(validateAndFixBoard);
          dispatch({
            type: 'RESTORE_STATE',
            payload: { boards: validatedBoards }
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
        localStorage.removeItem('synchro-boards'); // Limpar dados corrompidos
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('synchro-boards', JSON.stringify(state));
  }, [state]);

  const value = {
    ...state,
    dispatch
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoardContext() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext deve ser usado dentro de um BoardProvider');
  }
  return context;
}