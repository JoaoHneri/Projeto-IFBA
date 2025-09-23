'use client';

import { BoardProvider } from '@/contexts/BoardContext';
import TrelloApp from '@/components/trello/TrelloApp';

export default function ProjetosPage() {
  return (
    <BoardProvider>
      <TrelloApp />
    </BoardProvider>
  );
}