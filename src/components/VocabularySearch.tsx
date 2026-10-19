import React, { useState, useMemo } from 'react';
import { VocabularyItem, CategoryKey } from '../types';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { CATEGORIES } from '../data/categories';
import { WordCard } from './WordCard';
import { WordModal } from './WordModal';
import { AddWordModal } from './AddWordModal';
import { speakGerman } from '../utils/speech';
import { formatGermanDisplay } from '../utils/formatWord';
import {
  Search,
  Heart,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Volume2,
  X,
  Sparkles,
  Plus,
  Trash2,
  Lock,
} from 'lucide-react';

interface VocabularySearchProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  words?: VocabularyItem[];
  onAddWord?: (word: VocabularyItem) => void;
  onDeleteCustomWord?: (id: string) => void;
  isAddModalOpen?: boolean;
  setIsAddModalOpen?: (open: boolean) => void;
}

export const VocabularySearch: React.FC<VocabularySearchProps> = ({
  favorites,
  onToggleFavorite,
  speechRate,
  setSpeechRate,
  words = VOCABULARY_LIST,
  onAddWord,
  onDeleteCustomWord,
  isAddModalOpen: controlledAddModalOpen,
  setIsAddModalOpen: setControlledAddModalOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'der' | 'die' | 'das' | 'verb' | 'adjective' | 'other'>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'A1' | 'A2' | 'B1' | 'A1.1' | 'A1.2' | 'A2.1' | 'A2.2' | 'B1.1' | 'B1.2'>('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);

  // Internal modal state if uncontrolled
  const [localAddModalOpen, setLocalAddModalOpen] = useState(false);
  const isAddModalOpen = controlledAddModalOpen ?? localAddModalOpen;
  const setIsAddModalOpen = setControlledAddModalOpen ?? setLocalAddModalOpen;

  // Helper to insert special German characters into search box
  const handleInsertChar = (char: string) => {
    setSearchTerm((prev) => prev + char);
  };

  // Filter vocabulary
  const filteredWords = useMemo(() => {
    return words.filter((item) => {
      // Favorites filter
      if (showOnlyFavorites && !favorites.includes(item.id)) {
        return false;
      }

      // Category filter (handles English & German aliases)
      if (selectedCategory !== 'all') {
        const matchesCategory =
          item.category === selectedCategory ||
          (selectedCategory === 'professions' && item.category === 'berufe') ||
          (selectedCategory === 'berufe' && item.category === 'professions') ||
          (selectedCategory === 'clothing' && item.category === 'kleidung') ||
          (selectedCategory === 'kleidung' && item.category === 'clothing') ||
          (selectedCategory === 'body' && item.category === 'koerper') ||
          (selectedCategory === 'koerper' && item.category === 'body') ||
          (selectedCategory === 'colors' && item.category === 'farben') ||
          (selectedCategory === 'farben' && item.category === 'colors') ||
          (selectedCategory === 'nature' && item.category === 'wetter') ||
          (selectedCategory === 'wetter' && item.category === 'nature');
        if (!matchesCategory) return false;
      }

      // Gender / Part of speech filter
      if (selectedGender !== 'all') {
        if (selectedGender === 'der' && item.article !== 'der') return false;
        if (selectedGender === 'die' && item.article !== 'die') return false;
        if (selectedGender === 'das' && item.article !== 'das') return false;
        if (selectedGender === 'verb' && item.partOfSpeech !== 'verb') return false;
        if (selectedGender === 'adjective' && item.partOfSpeech !== 'adjective') return false;
        if (selectedGender === 'other' && (item.article || item.partOfSpeech === 'verb' || item.partOfSpeech === 'adjective')) return false;
      }

      // Level filter (supports A1, A2, B1 and sub-levels)
      if (selectedLevel !== 'all') {
        if (selectedLevel === 'A1' && !item.level.startsWith('A1')) return false;
        if (selectedLevel === 'A2' && !item.level.startsWith('A2')) return false;
        if (selectedLevel === 'B1' && !item.level.startsWith('B1')) return false;
        if (selectedLevel !== 'A1' && selectedLevel !== 'A2' && selectedLevel !== 'B1' && item.level !== selectedLevel) return false;
      }

      // Search term filter (searches German, formatted German, word, plural, Vietnamese meaning, notes)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesGerman = item.german.toLowerCase().includes(query);
        const matchesFormatted = formatGermanDisplay(item).toLowerCase().includes(query);
        const matchesWord = item.word.toLowerCase().includes(query);
        const matchesVi = item.vietnamese.toLowerCase().includes(query);
        const matchesPlural = item.plural?.toLowerCase().includes(query);
        const matchesNotes = item.notes?.toLowerCase().includes(query);
        return matchesGerman || matchesFormatted || matchesWord || matchesVi || matchesPlural || matchesNotes;
      }

      return true;
    });
  }, [words, searchTerm, selectedCategory, selectedGender, selectedLevel, showOnlyFavorites, favorites]);

  const customWordsCount = words.filter((w) => w.id.startsWith('custom_')).length;

  return (
    <div className="space-y-6">
      {/* Search Bar & Quick Umlaut Buttons */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Input field */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tra cứu từ tiếng Đức hoặc nghĩa tiếng Việt (vd: Mann, Buch, ăn, đi, Schule...)"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
                title="Xóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick German umlaut buttons */}
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <span className="text-xs font-semibold text-slate-400 mr-1 hidden lg:inline">Ký tự Đức:</span>
            {['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map((char) => (
              <button
                key={char}
                onClick={() => handleInsertChar(char)}
                className="w-8 h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-mono font-semibold text-sm transition-colors shadow-2xs hover:border-slate-300 active:scale-95"
                title={`Thêm ký tự ${char}`}
              >
                {char}
              </button>
            ))}
          </div>

          {/* Admin Add Word Action Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs shrink-0"
            title="Thêm từ vựng mới (Yêu cầu mật khẩu Admin)"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Thêm từ vựng (Admin)</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Level Filter (A1, A2, B1) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="font-semibold text-slate-500 mr-1">Trình độ:</span>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'A1', label: 'A1' },
              { id: 'A2', label: 'A2' },
              { id: 'B1', label: 'B1' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id as any)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  selectedLevel === lvl.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          {/* Article & Gender Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="font-semibold text-slate-500 mr-1">Từ loại:</span>
            <button
              onClick={() => setSelectedGender('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedGender === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedGender('der')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedGender === 'der'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60'
              }`}
            >
              der (r)
            </button>
            <button
              onClick={() => setSelectedGender('die')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedGender === 'die'
                  ? 'bg-rose-600 text-white'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
              }`}
            >
              die (e)
            </button>
            <button
              onClick={() => setSelectedGender('das')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedGender === 'das'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
              }`}
            >
              das (s)
            </button>
            <button
              onClick={() => setSelectedGender('verb')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedGender === 'verb'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              Động từ
            </button>
            <button
              onClick={() => setSelectedGender('adjective')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedGender === 'adjective'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/60'
              }`}
            >
              Tính từ
            </button>
          </div>

          {/* Quick Actions: Favorites & View Mode */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-colors ${
                showOnlyFavorites
                  ? 'bg-rose-50 border-rose-300 text-rose-700 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-current text-rose-600' : ''}`} />
              <span>Yêu thích ({favorites.length})</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
                title="Dạng thẻ lưới"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 ${viewMode === 'table' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
                title="Dạng bảng danh sách"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Summary info row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 px-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span>
            Đang hiển thị <strong className="text-slate-900 font-mono-numbers">{filteredWords.length}</strong> / {words.length} từ vựng
            {showOnlyFavorites && ' (chỉ từ yêu thích)'}
          </span>
          {customWordsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold text-[10px]">
              {customWordsCount} từ do Admin thêm
            </span>
          )}
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Định dạng danh từ chuẩn từ điển: <code>r Mann, &quot;-er</code> | Không số nhiều: <code>-Sg</code> · Bấm loa để nghe phát âm
        </span>
      </div>

      {/* Word List / Grid */}
      {filteredWords.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-600 font-medium">Không tìm thấy từ vựng nào khớp với bộ lọc.</p>
          <p className="text-xs text-slate-400 mt-1">
            Hãy thử tìm với từ khóa khác hoặc xóa bộ lọc để hiển thị toàn bộ danh sách.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedGender('all');
                setSelectedLevel('all');
                setShowOnlyFavorites(false);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Đặt lại tất cả bộ lọc
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm từ này vào từ điển (Admin)</span>
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((item) => (
            <div key={item.id} className="relative group">
              <WordCard
                item={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectWord={setSelectedWord}
                speechRate={speechRate}
              />
              {item.id.startsWith('custom_') && onDeleteCustomWord && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Bạn có chắc muốn xóa từ "${formatGermanDisplay(item)}" khỏi cơ sở dữ liệu?`)) {
                      onDeleteCustomWord(item.id);
                    }
                  }}
                  className="absolute top-2 right-10 p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                  title="Xóa từ tự thêm này"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Từ tiếng Đức &amp; Số nhiều</th>
                  <th className="py-3 px-4">Mạo từ</th>
                  <th className="py-3 px-4">Cấp độ</th>
                  <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                  <th className="py-3 px-4">Số nhiều</th>
                  <th className="py-3 px-4">Ví dụ câu</th>
                  <th className="py-3 px-4 text-center">Phát âm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWords.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedWord(item)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                      <div className="flex items-center gap-1.5">
                        <span>{formatGermanDisplay(item)}</span>
                        {item.id.startsWith('custom_') && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold font-sans">
                            Admin
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {item.article ? (
                        <span
                          className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                            item.article === 'der'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : item.article === 'die'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {item.article}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">{item.partOfSpeech}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 font-bold">
                      {item.level}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {item.vietnamese}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono">
                      {item.plural || '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={item.example}>
                      <span className="font-medium text-slate-800">{item.example}</span>
                      <span className="block text-[11px] text-slate-400 truncate">{item.exampleVi}</span>
                    </td>
                    <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => speakGerman(item.word || item.german, { rate: speechRate })}
                        className="p-1.5 rounded-full hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Word Detail Modal */}
      <WordModal
        item={selectedWord}
        onClose={() => setSelectedWord(null)}
        isFavorite={selectedWord ? favorites.includes(selectedWord.id) : false}
        onToggleFavorite={onToggleFavorite}
        speechRate={speechRate}
      />

      {/* Admin Add Word Modal */}
      <AddWordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWord={(newWord) => {
          if (onAddWord) {
            onAddWord(newWord);
          }
        }}
      />
    </div>
  );
};
