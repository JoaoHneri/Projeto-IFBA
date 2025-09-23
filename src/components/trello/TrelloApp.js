'use client';

import React, { useState } from 'react';
import { useBoardContext } from '@/contexts/BoardContext';
import BoardSelector from './BoardSelector';
import TrelloBoard from './TrelloBoard';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function TrelloApp() {
  const { boards, currentBoard } = useBoardContext();
  
  // Encontrar o board atual baseado no ID
  const activeBoard = currentBoard ? boards.find(board => board.id === currentBoard) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {!activeBoard ? (
        <main className="pt-20">
          <BoardSelector />
        </main>
      ) : (
        <main className="pt-16">
          <TrelloBoard board={activeBoard} />
        </main>
      )}
      {!activeBoard && <Footer />}
    </div>
  );
}