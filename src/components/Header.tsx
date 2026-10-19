import React from 'react';
import { ActiveTab } from '../types';
import { BookOpen, Table, FileText, Layers, CheckSquare, Sparkles, Settings } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  favoritesCount: number;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8 h-16">
          {/* Zone 1: Single text wordmark (Compact on mobile/tablet) */}
          <button
            onClick={() => setActiveTab('lookup')}
            className="flex items-center gap-2 text-left group focus:outline-none shrink-0"
            title="Deutsch A1 – B1 Explorer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-sm group-hover:bg-slate-800 dark:group-hover:bg-blue-500 transition-colors">
              DE
            </div>
            <div className="hidden sm:block">
              <span className="text-base lg:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block leading-tight">
                Deutsch A1 – B1
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden lg:block">
                Từ vựng &amp; Ngữ pháp A1 – A2 – B1
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Logo only on phone & tablet, text appears on lg: desktop) */}
          <nav className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => setActiveTab('lookup')}
              className={`p-2 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 ${
                activeTab === 'lookup'
                  ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
              title="Tra cứu từ vựng"
              aria-label="Tra cứu từ vựng"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span className="hidden lg:inline">Tra cứu từ vựng</span>
            </button>

            <button
              onClick={() => setActiveTab('declension')}
              className={`p-2 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 ${
                activeTab === 'declension'
                  ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
              title="Bảng chia 4 cách & Giới từ"
              aria-label="Bảng chia 4 cách"
            >
              <Table className="w-4 h-4 shrink-0" />
              <span className="hidden lg:inline">Bảng chia 4 cách</span>
            </button>

            <button
              onClick={() => setActiveTab('grammar')}
              className={`p-2 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 ${
                activeTab === 'grammar'
                  ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
              title="Cấu trúc câu & Ngữ pháp"
              aria-label="Cấu trúc câu"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span className="hidden lg:inline">Cấu trúc câu</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`p-2 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 relative ${
                activeTab === 'flashcards'
                  ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
              title="Thẻ ghi nhớ Flashcards"
              aria-label="Flashcards"
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span className="hidden lg:inline">Flashcards</span>
              {favoritesCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] bg-rose-500 text-white rounded-full font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`p-2 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 ${
                activeTab === 'cheatsheet'
                  ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
              title="Cẩm nang ôn thi cấp tốc"
              aria-label="Ôn thi cấp tốc"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="hidden lg:inline">Ôn thi cấp tốc</span>
            </button>
          </nav>

          {/* Zone 3: Quiz Action + Settings (Logo only on phone & tablet, text appears on lg: desktop) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quiz Button: Logo only on phone & tablet, text on desktop */}
            <button
              onClick={() => setActiveTab('quiz')}
              className={`p-2 lg:px-3.5 lg:py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'quiz'
                  ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-500/30'
                  : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-500'
              }`}
              title="Luyện trắc nghiệm"
              aria-label="Luyện trắc nghiệm"
            >
              <CheckSquare className="w-4 h-4 shrink-0" />
              <span className="hidden lg:inline">Luyện trắc nghiệm</span>
            </button>

            {/* Settings Button (Icon only) */}
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors flex items-center justify-center shrink-0"
                title="Cài đặt (Hình nền sáng / tối)"
                aria-label="Cài đặt"
              >
                <Settings className="w-4 h-4 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
