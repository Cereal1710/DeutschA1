import React, { useState, useMemo } from 'react';
import { VocabularyItem, CategoryKey } from '../types';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { CATEGORIES } from '../data/categories';
import { WordCard } from './WordCard';
import { WordModal } from './WordModal';
import { speakGerman } from '../utils/speech';
import { Search, Heart, LayoutGrid, List, SlidersHorizontal, Volume2, X, Sparkles } from 'lucide-react';

interface VocabularySearchProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
}

export const VocabularySearch: React.FC<VocabularySearchProps> = ({
  favorites,
  onToggleFavorite,
  speechRate,
  setSpeechRate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'der' | 'die' | 'das' | 'verb' | 'other'>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'A1.1' | 'A1.2'>('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);

  // Helper to insert special German characters into search box
  const handleInsertChar = (char: string) => {
    setSearchTerm((prev) => prev + char);
  };

  // Filter vocabulary
  const filteredWords = useMemo(() => {
    return VOCABULARY_LIST.filter((item) => {
      // Favorites filter
      if (showOnlyFavorites && !favorites.includes(item.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Gender / Part of speech filter
      if (selectedGender !== 'all') {
        if (selectedGender === 'der' && item.article !== 'der') return false;
        if (selectedGender === 'die' && item.article !== 'die') return false;
        if (selectedGender === 'das' && item.article !== 'das') return false;
        if (selectedGender === 'verb' && item.partOfSpeech !== 'verb') return false;
        if (selectedGender === 'other' && (item.article || item.partOfSpeech === 'verb')) return false;
      }

      // Level filter
      if (selectedLevel !== 'all' && item.level !== selectedLevel) {
        return false;
      }

      // Search term filter (searches German, word, plural, Vietnamese meaning, notes)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesGerman = item.german.toLowerCase().includes(query);
        const matchesWord = item.word.toLowerCase().includes(query);
        const matchesVi = item.vietnamese.toLowerCase().includes(query);
        const matchesPlural = item.plural?.toLowerCase().includes(query);
        const matchesNotes = item.notes?.toLowerCase().includes(query);
        return matchesGerman || matchesWord || matchesVi || matchesPlural || matchesNotes;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, selectedGender, selectedLevel, showOnlyFavorites, favorites]);

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
          <div className="flex items-center gap-1.5 shrink-0 self-center sm:self-auto">
            <span className="text-xs text-slate-400 font-medium hidden lg:inline mr-1">
              Ký tự Đức:
            </span>
            {['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map((char) => (
              <button
                key={char}
                onClick={() => handleInsertChar(char)}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-slate-800 text-xs font-semibold transition-colors focus:outline-none"
                title={`Thêm ký tự ${char}`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* Filter controls row */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Article / Type segmented control */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setSelectedGender('all')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                selectedGender === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả giống
            </button>
            <button
              onClick={() => setSelectedGender('der')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                selectedGender === 'der' ? 'bg-blue-600 text-white font-bold' : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              der (đực)
            </button>
            <button
              onClick={() => setSelectedGender('die')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                selectedGender === 'die' ? 'bg-rose-600 text-white font-bold' : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              die (cái)
            </button>
            <button
              onClick={() => setSelectedGender('das')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                selectedGender === 'das' ? 'bg-emerald-600 text-white font-bold' : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              das (trung)
            </button>
            <button
              onClick={() => setSelectedGender('verb')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                selectedGender === 'verb' ? 'bg-amber-600 text-white font-bold' : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              Động từ
            </button>
          </div>

          {/* Level Filter + Favorites + Audio speed + View mode */}
          <div className="flex items-center gap-2 flex-wrap ml-auto">
            {/* Level selector */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as any)}
              className="py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium focus:outline-none"
            >
              <option value="all">Trình độ: Tất cả</option>
              <option value="A1.1">A1.1 (Cơ bản)</option>
              <option value="A1.2">A1.2 (Mở rộng)</option>
            </select>

            {/* Audio speed */}
            <button
              onClick={() => setSpeechRate(speechRate === 0.85 ? 1.0 : 0.85)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Chỉnh tốc độ giọng đọc phát âm"
            >
              <Volume2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{speechRate === 0.85 ? 'Tốc độ: Chậm (0.85x)' : 'Tốc độ: 1.0x'}</span>
            </button>

            {/* Favorite toggle */}
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                showOnlyFavorites
                  ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-current text-rose-600' : 'text-slate-400'}`} />
              <span>Yêu thích ({favorites.length})</span>
            </button>

            {/* View switcher */}
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
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
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Đang hiển thị <strong className="text-slate-900 font-mono-numbers">{filteredWords.length}</strong> / {VOCABULARY_LIST.length} từ vựng
          {showOnlyFavorites && ' (chỉ từ yêu thích)'}
        </span>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Bấm biểu tượng loa để nghe phát âm chuẩn · Bấm vào thẻ để xem bảng chia cách đầy đủ
        </span>
      </div>

      {/* Word List / Grid */}
      {filteredWords.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-600 font-medium">Không tìm thấy từ vựng nào khớp với bộ lọc.</p>
          <p className="text-xs text-slate-400 mt-1">
            Hãy thử tìm với từ khóa khác hoặc xóa bộ lọc để hiển thị toàn bộ danh sách.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedGender('all');
              setSelectedLevel('all');
              setShowOnlyFavorites(false);
            }}
            className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Đặt lại tất cả bộ lọc
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((item) => (
            <WordCard
              key={item.id}
              item={item}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectWord={setSelectedWord}
              speechRate={speechRate}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Từ vựng (Tiếng Đức)</th>
                  <th className="py-3 px-4">Giống / Mạo từ</th>
                  <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                  <th className="py-3 px-4">Số nhiều</th>
                  <th className="py-3 px-4">Câu ví dụ minh họa</th>
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
                      {item.german}
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
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {item.vietnamese}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {item.plural || '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={item.example}>
                      <span className="font-medium text-slate-800">{item.example}</span>
                      <span className="block text-[11px] text-slate-400 truncate">{item.exampleVi}</span>
                    </td>
                    <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => speakGerman(item.german, { rate: speechRate })}
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

      {/* Detail Modal */}
      <WordModal
        item={selectedWord}
        onClose={() => setSelectedWord(null)}
        isFavorite={selectedWord ? favorites.includes(selectedWord.id) : false}
        onToggleFavorite={onToggleFavorite}
        speechRate={speechRate}
      />
    </div>
  );
};
