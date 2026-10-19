import React from 'react';
import { ActiveTab } from '../types';
import { BookOpen, Table, FileText, Layers, CheckSquare, Sparkles, Plus } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  favoritesCount: number;
  onOpenAddWordModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, favoritesCount, onOpenAddWordModal }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => setActiveTab('lookup')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-slate-800 transition-colors">
              DE
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 block leading-tight">
                Deutsch A1 – B1
              </span>
              <span className="text-xs text-slate-500 hidden sm:block">
                Từ vựng &amp; Ngữ pháp A1 – A2 – B1
              </span>
            </div>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'lookup'
                  ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              Tra cứu từ vựng
            </button>

            <button
              onClick={() => setActiveTab('declension')}
              className={`px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'declension'
                  ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Table className="w-4 h-4 text-slate-500" />
              Bảng chia 4 cách
            </button>

            <button
              onClick={() => setActiveTab('grammar')}
              className={`px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'grammar'
                  ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-500" />
              Cấu trúc câu
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'flashcards'
                  ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4 text-slate-500" />
              Flashcards
              {favoritesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-rose-100 text-rose-700 rounded-full font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'cheatsheet'
                  ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-slate-500" />
              Ôn thi cấp tốc
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            {onOpenAddWordModal && (
              <button
                onClick={onOpenAddWordModal}
                className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                title="Thêm từ vựng mới (Yêu cầu mật khẩu Admin)"
              >
                <Plus className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Thêm từ</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'quiz'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Luyện trắc nghiệm</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation bar */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setActiveTab('lookup')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'lookup' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Từ vựng
          </button>
          <button
            onClick={() => setActiveTab('declension')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'declension' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            4 cách &amp; Giới từ
          </button>
          <button
            onClick={() => setActiveTab('grammar')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'grammar' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Cấu trúc câu
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'flashcards' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Flashcards ({favoritesCount})
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === 'cheatsheet' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Ôn thi
          </button>
        </div>
      </div>
    </header>
  );
};
