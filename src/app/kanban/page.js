'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import TrelloApp from '@/components/trello/TrelloApp';

export default function KanbanPage() {
  return (
    <ProtectedRoute requireAuth={true}>
      <TrelloApp />
    </ProtectedRoute>
  );
}