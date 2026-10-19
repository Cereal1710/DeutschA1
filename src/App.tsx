/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ActiveTab, VocabularyItem } from './types';
import { Header } from './components/Header';
import { VocabularySearch } from './components/VocabularySearch';
import { DeclensionExplorer } from './components/DeclensionExplorer';
import { GrammarSection } from './components/GrammarSection';
import { Flashcards } from './components/Flashcards';
import { PracticeQuiz } from './components/PracticeQuiz';
import { CheatSheet } from './components/CheatSheet';
import { AddWordModal } from './components/AddWordModal';
import { SettingsModal } from './components/SettingsModal';
import {
  loadCustomVocabulary,
  saveCustomVocabularyItem,
  deleteCustomVocabularyItem,
  getAllVocabulary,
} from './utils/vocabularyStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lookup');
  const [speechRate, setSpeechRate] = useState<number>(0.88);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Theme: 'light' or 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('deutsch_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deutsch_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (err) {
      console.warn('Could not save theme to localStorage', err);
    }
  }, [theme]);

  // Custom User Vocabulary
  const [customWords, setCustomWords] = useState<VocabularyItem[]>(() => loadCustomVocabulary());

  // Combined vocabulary: base database + custom user-added items
  const allWords = useMemo(() => getAllVocabulary(customWords), [customWords]);

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

  const handleAddWord = (newWord: VocabularyItem) => {
    const updated = saveCustomVocabularyItem(newWord);
    setCustomWords(updated);
  };

  const handleDeleteWord = (id: string) => {
    const updated = deleteCustomVocabularyItem(id);
    setCustomWords(updated);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} flex flex-col transition-colors duration-200`}>
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        onOpenAddWordModal={() => setIsAddWordModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'lookup' && (
          <VocabularySearch
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            speechRate={speechRate}
            setSpeechRate={setSpeechRate}
            words={allWords}
            onAddWord={handleAddWord}
            onDeleteCustomWord={handleDeleteWord}
            isAddModalOpen={isAddWordModalOpen}
            setIsAddModalOpen={setIsAddWordModalOpen}
          />
        )}

        {activeTab === 'declension' && <DeclensionExplorer />}

        {activeTab === 'grammar' && <GrammarSection />}

        {activeTab === 'flashcards' && (
          <Flashcards
            favorites={favorites}
            speechRate={speechRate}
            words={allWords}
          />
        )}

        {activeTab === 'quiz' && (
          <PracticeQuiz speechRate={speechRate} words={allWords} />
        )}

        {activeTab === 'cheatsheet' && <CheatSheet />}
      </main>

      {/* Admin Add Word Modal */}
      <AddWordModal
        isOpen={isAddWordModalOpen}
        onClose={() => setIsAddWordModalOpen(false)}
        onAddWord={handleAddWord}
      />

      {/* Settings Modal (Theme: Light / Dark) */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12 py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-200">Deutsch A1 – A2 – B1 Explorer</span>
            <span>·</span>
            <span>Kho từ vựng &amp; Cẩm nang cấu trúc ngữ pháp tiếng Đức toàn diện</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
            <span>Chuẩn Khung tham chiếu Châu Âu (CEFR: Goethe / Telc / ÖSD)</span>
            <span>·</span>
            <span>Tích hợp giọng đọc bản xứ Web Speech API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
