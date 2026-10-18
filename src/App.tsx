/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { VocabularySearch } from './components/VocabularySearch';
import { DeclensionExplorer } from './components/DeclensionExplorer';
import { GrammarSection } from './components/GrammarSection';
import { Flashcards } from './components/Flashcards';
import { PracticeQuiz } from './components/PracticeQuiz';
import { CheatSheet } from './components/CheatSheet';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lookup');
  const [speechRate, setSpeechRate] = useState<number>(0.88);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('deutsch_a1_favorites');
      return saved ? JSON.parse(saved) : ['mann', 'schule', 'haben', 'sein', 'aufstehen'];
    } catch {
      return ['mann', 'schule', 'haben', 'sein', 'aufstehen'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deutsch_a1_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.warn('Could not save favorites to localStorage', err);
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'lookup' && (
          <VocabularySearch
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            speechRate={speechRate}
            setSpeechRate={setSpeechRate}
          />
        )}

        {activeTab === 'declension' && <DeclensionExplorer />}

        {activeTab === 'grammar' && <GrammarSection />}

        {activeTab === 'flashcards' && (
          <Flashcards
            favorites={favorites}
            speechRate={speechRate}
          />
        )}

        {activeTab === 'quiz' && (
          <PracticeQuiz speechRate={speechRate} />
        )}

        {activeTab === 'cheatsheet' && <CheatSheet />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Deutsch A1 Explorer</span>
            <span>·</span>
            <span>Tổng hợp từ vựng &amp; ngữ pháp tiếng Đức A1.1 – A1.2</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Phiên bản A1 Chuẩn Goethe / Telc</span>
            <span>·</span>
            <span>Tích hợp giọng đọc Web Speech API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
