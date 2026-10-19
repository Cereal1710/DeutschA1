import React, { useState, useMemo } from 'react';
import { VocabularyItem, CategoryKey } from '../types';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { CATEGORIES } from '../data/categories';
import { speakGerman } from '../utils/speech';
import { formatGermanDisplay } from '../utils/formatWord';
import { Volume2, RotateCcw, Shuffle, CheckCircle, ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { getSecondaryExample } from '../data/secondaryExamples';

interface FlashcardsProps {
  favorites: string[];
  speechRate: number;
  words?: VocabularyItem[];
}

export const Flashcards: React.FC<FlashcardsProps> = ({ favorites, speechRate, words = VOCABULARY_LIST }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Track mastered vs review words
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);

  // Filter pool of words
  const cardList = useMemo(() => {
    let list = words.filter((item) => {
      if (onlyFavorites && !favorites.includes(item.id)) return false;
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
      return true;
    });

    if (list.length === 0) return VOCABULARY_LIST;
    return list;
  }, [selectedCategory, onlyFavorites, favorites]);

  // Current item
  const currentCard = cardList[currentIndex] || cardList[0];
  const secondaryEx = currentCard?.example2
    ? { de: currentCard.example2, vi: currentCard.example2Vi || '' }
    : currentCard
    ? getSecondaryExample(currentCard.id)
    : undefined;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cardList.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cardList.length) % cardList.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * cardList.length);
    setCurrentIndex(randomIndex);
  };

  const markMastered = () => {
    if (!masteredIds.includes(currentCard.id)) {
      setMasteredIds((prev) => [...prev, currentCard.id]);
      setReviewIds((prev) => prev.filter((id) => id !== currentCard.id));
    }
    handleNext();
  };

  const markReview = () => {
    if (!reviewIds.includes(currentCard.id)) {
      setReviewIds((prev) => [...prev, currentCard.id]);
      setMasteredIds((prev) => prev.filter((id) => id !== currentCard.id));
    }
    handleNext();
  };

  const handlePlayWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakGerman(currentCard.german, { rate: speechRate });
  };

  const handlePlaySentence = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speakGerman(text, { rate: speechRate });
  };

  // Gender colors
  const getCardTheme = () => {
    switch (currentCard.gender) {
      case 'masculine':
        return { border: 'border-blue-300', bg: 'bg-blue-50/50', badge: 'bg-blue-600 text-white' };
      case 'feminine':
        return { border: 'border-rose-300', bg: 'bg-rose-50/50', badge: 'bg-rose-600 text-white' };
      case 'neuter':
        return { border: 'border-emerald-300', bg: 'bg-emerald-50/50', badge: 'bg-emerald-600 text-white' };
      default:
        return { border: 'border-amber-300', bg: 'bg-amber-50/50', badge: 'bg-amber-600 text-white' };
    }
  };

  const theme = getCardTheme();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Controls & Filter bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value as any);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-slate-800 focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setOnlyFavorites(!onlyFavorites);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              onlyFavorites
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current text-rose-600' : 'text-slate-400'}`} />
            <span>Yêu thích ({favorites.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={handleShuffle}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1 transition-colors"
            title="Trộn ngẫu nhiên"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trộn thẻ</span>
          </button>
          <span className="text-xs text-slate-500 font-mono-numbers px-2 font-bold">
            {currentIndex + 1} / {cardList.length}
          </span>
        </div>
      </div>

      {/* Progress pill indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <span className="flex items-center gap-1 text-emerald-700 font-semibold">
          <CheckCircle className="w-3.5 h-3.5" /> Đã thuộc: {masteredIds.length} từ
        </span>
        <span className="flex items-center gap-1 text-amber-700 font-semibold">
          <RotateCcw className="w-3.5 h-3.5" /> Cần ôn lại: {reviewIds.length} từ
        </span>
      </div>

      {/* Flashcard Component */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className={`w-full min-h-[380px] rounded-3xl border-2 ${theme.border} bg-white shadow-lg p-6 sm:p-10 cursor-pointer flex flex-col justify-between transition-all duration-300 select-none relative overflow-hidden group`}
      >
        {/* Top hint bar */}
        <div className="flex items-center justify-between gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${theme.badge}`}>
            {currentCard.article ? `Mạo từ: ${currentCard.article}` : currentCard.partOfSpeech.toUpperCase()}
          </span>

          <span className="text-xs text-slate-400 font-medium">
            Bấm thẻ để {isFlipped ? 'quay lại tiếng Đức' : 'xem nghĩa & ví dụ'} ↻
          </span>
        </div>

        {/* Card Content: Front vs Back */}
        <div className="my-auto py-6 text-center">
          {!isFlipped ? (
            /* FRONT: German Word + Audio */
            <div className="space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                Tiếng Đức
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {formatGermanDisplay(currentCard)}
              </h2>
              {currentCard.plural && (
                <p className="text-sm text-slate-500 font-medium">
                  Số nhiều: <strong className="text-slate-700">{currentCard.plural}</strong>
                </p>
              )}
              <div>
                <button
                  type="button"
                  onClick={handlePlayWord}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-md transition-all scale-100 hover:scale-105 active:scale-95"
                  title="Nghe phát âm từ này"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe phát âm</span>
                </button>
              </div>
            </div>
          ) : (
            /* BACK: Vietnamese Meaning + Contextual Examples */
            <div className="space-y-4 text-left max-w-lg mx-auto">
              <div className="text-center pb-2 border-b border-slate-100">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                  Nghĩa tiếng Việt
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mt-1">
                  {currentCard.vietnamese}
                </h3>
              </div>

              {/* Contextual Examples */}
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-slate-900">
                      1. {currentCard.example}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => handlePlaySentence(e, currentCard.example)}
                      className="p-1 rounded-full text-slate-400 hover:text-blue-600 shrink-0"
                      title="Nghe câu 1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-500 text-[11px] italic mt-1">
                    {currentCard.exampleVi}
                  </p>
                </div>

                {secondaryEx && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-900">
                        2. {secondaryEx.de}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => handlePlaySentence(e, secondaryEx.de)}
                        className="p-1 rounded-full text-slate-400 hover:text-blue-600 shrink-0"
                        title="Nghe câu 2"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-500 text-[11px] italic mt-1">
                      {secondaryEx.vi}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom card footer */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
          <span>{currentCard.category}</span>
          <span className="font-mono">{currentCard.level}</span>
        </div>
      </div>

      {/* Navigation & Learning Actions */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrev}
          className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1 shadow-xs transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Từ trước</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={markReview}
            className="px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Cần ôn lại</span>
          </button>
          <button
            onClick={markMastered}
            className="px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Đã thuộc</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1 shadow-xs transition-colors"
        >
          <span>Tiếp theo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
