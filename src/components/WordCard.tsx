import React, { useState } from 'react';
import { VocabularyItem } from '../types';
import { speakGerman } from '../utils/speech';
import { Volume2, Heart, ExternalLink, Sparkles } from 'lucide-react';
import { getSecondaryExample } from '../data/secondaryExamples';

interface WordCardProps {
  item: VocabularyItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectWord: (item: VocabularyItem) => void;
  speechRate: number;
}

export const WordCard: React.FC<WordCardProps> = ({
  item,
  isFavorite,
  onToggleFavorite,
  onSelectWord,
  speechRate,
}) => {
  const [isPlayingWord, setIsPlayingWord] = useState(false);
  const [playingSentenceIndex, setPlayingSentenceIndex] = useState<number | null>(null);

  const secondaryEx = getSecondaryExample(item.id);

  const handlePlayWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingWord(true);
    speakGerman(item.german, {
      rate: speechRate,
      onEnd: () => setIsPlayingWord(false),
      onError: () => setIsPlayingWord(false),
    });
  };

  const handlePlaySentence = (e: React.MouseEvent, text: string, index: number) => {
    e.stopPropagation();
    setPlayingSentenceIndex(index);
    speakGerman(text, {
      rate: speechRate,
      onEnd: () => setPlayingSentenceIndex(null),
      onError: () => setPlayingSentenceIndex(null),
    });
  };

  // Article color badges
  const getGenderStyle = () => {
    switch (item.gender) {
      case 'masculine':
        return {
          article: 'der',
          tagClass: 'text-blue-700 bg-blue-50 border-blue-200',
          accent: 'border-l-blue-500',
          subtleBg: 'hover:border-blue-300',
        };
      case 'feminine':
        return {
          article: 'die',
          tagClass: 'text-rose-700 bg-rose-50 border-rose-200',
          accent: 'border-l-rose-500',
          subtleBg: 'hover:border-rose-300',
        };
      case 'neuter':
        return {
          article: 'das',
          tagClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          accent: 'border-l-emerald-500',
          subtleBg: 'hover:border-emerald-300',
        };
      default:
        return {
          article: item.partOfSpeech === 'verb' ? 'verb' : item.partOfSpeech,
          tagClass: 'text-amber-700 bg-amber-50 border-amber-200',
          accent: 'border-l-amber-500',
          subtleBg: 'hover:border-amber-300',
        };
    }
  };

  const genderInfo = getGenderStyle();

  return (
    <div
      onClick={() => onSelectWord(item)}
      className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group"
    >
      <div>
        {/* Header row: Word, Article, Speaker, Favorite */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {item.article && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${genderInfo.tagClass}`}>
                  {item.article}
                </span>
              )}
              {item.partOfSpeech === 'verb' && (
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Động từ
                </span>
              )}
              {item.partOfSpeech === 'adjective' && (
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                  Tính từ
                </span>
              )}
              {item.partOfSpeech === 'adverb' && (
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Trạng từ
                </span>
              )}
              {item.partOfSpeech === 'question' && (
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                  Từ để hỏi
                </span>
              )}
              <span className="text-[11px] text-slate-400 font-mono-numbers">
                {item.level}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                {item.german}
              </h3>
              {/* Pronunciation button for word */}
              <button
                type="button"
                onClick={handlePlayWord}
                title="Nghe phát âm từ này"
                className={`p-1.5 rounded-full transition-all focus:outline-none ${
                  isPlayingWord
                    ? 'bg-blue-600 text-white ring-2 ring-blue-300 scale-105'
                    : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isPlayingWord ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          </div>

          {/* Action buttons: Favorite */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(item.id);
              }}
              title={isFavorite ? 'Bỏ lưu' : 'Lưu vào từ yêu thích'}
              className={`p-1.5 rounded-lg transition-colors focus:outline-none ${
                isFavorite
                  ? 'text-rose-600 bg-rose-50 hover:bg-rose-100'
                  : 'text-slate-300 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Vietnamese Meaning */}
        <p className="text-sm font-semibold text-slate-800 mb-2">
          {item.vietnamese}
        </p>

        {/* Plural info if noun */}
        {item.plural && (
          <div className="text-xs text-slate-600 mb-3 bg-slate-50 rounded-md p-2 border border-slate-100">
            <span className="text-slate-400">Số nhiều: </span>
            <span className="font-semibold text-slate-800">{item.plural}</span>
            {item.pluralRule && (
              <span className="text-slate-500 block text-[11px] mt-0.5">
                • {item.pluralRule}
              </span>
            )}
          </div>
        )}

        {/* Contextual Examples (1 or 2 examples with Audio) */}
        <div className="space-y-2 mt-3 pt-3 border-t border-slate-100">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Ví dụ ngữ cảnh:
          </div>

          {/* Example 1 */}
          <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-100 text-xs text-slate-700">
            <div className="flex items-start justify-between gap-1.5">
              <p className="font-medium text-slate-900 leading-snug">
                {item.example}
              </p>
              <button
                type="button"
                onClick={(e) => handlePlaySentence(e, item.example, 1)}
                title="Nghe câu ví dụ 1"
                className={`p-1 rounded-full shrink-0 transition-colors ${
                  playingSentenceIndex === 1
                    ? 'bg-blue-600 text-white ring-1 ring-blue-300'
                    : 'text-slate-400 hover:text-blue-600 hover:bg-white'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-slate-500 text-[11px] mt-1 italic">
              {item.exampleVi}
            </p>
          </div>

          {/* Example 2 (if available) */}
          {secondaryEx && (
            <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-100 text-xs text-slate-700">
              <div className="flex items-start justify-between gap-1.5">
                <p className="font-medium text-slate-900 leading-snug">
                  {secondaryEx.de}
                </p>
                <button
                  type="button"
                  onClick={(e) => handlePlaySentence(e, secondaryEx.de, 2)}
                  title="Nghe câu ví dụ 2"
                  className={`p-1 rounded-full shrink-0 transition-colors ${
                    playingSentenceIndex === 2
                      ? 'bg-blue-600 text-white ring-1 ring-blue-300'
                      : 'text-slate-400 hover:text-blue-600 hover:bg-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-slate-500 text-[11px] mt-1 italic">
                {secondaryEx.vi}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer metadata: Click for more details */}
      <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="text-[11px] text-slate-400">
          {item.notes ? item.notes.split('|')[0] : 'Xem cách chia & ngữ pháp'}
        </span>
        <span className="flex items-center gap-1 text-blue-600 group-hover:translate-x-0.5 transition-transform text-[11px] font-medium">
          Chi tiết <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
