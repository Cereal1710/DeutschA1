import React, { useState } from 'react';
import { VocabularyItem } from '../types';
import { speakGerman } from '../utils/speech';
import { getSecondaryExample } from '../data/secondaryExamples';
import { X, Volume2, Heart, Copy, Check, Sparkles, BookOpen } from 'lucide-react';

interface WordModalProps {
  item: VocabularyItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  speechRate: number;
}

export const WordModal: React.FC<WordModalProps> = ({
  item,
  onClose,
  isFavorite,
  onToggleFavorite,
  speechRate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingSentenceIndex, setPlayingSentenceIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const secondaryEx = item.example2
    ? { de: item.example2, vi: item.example2Vi || '' }
    : getSecondaryExample(item.id);

  const handlePlayWord = (rateMultiplier: number = 1.0) => {
    setIsPlaying(true);
    speakGerman(item.german, {
      rate: speechRate * rateMultiplier,
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const handlePlaySentence = (text: string, index: number) => {
    setPlayingSentenceIndex(index);
    speakGerman(text, {
      rate: speechRate,
      onEnd: () => setPlayingSentenceIndex(null),
      onError: () => setPlayingSentenceIndex(null),
    });
  };

  const handleCopy = () => {
    const textToCopy = `${item.german} - ${item.vietnamese}\nSố nhiều: ${item.plural || '—'}\nVí dụ: ${item.example} (${item.exampleVi})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Gender colors
  const getGenderBadge = () => {
    switch (item.gender) {
      case 'masculine':
        return { label: 'der (Giống đực - Maskulinum)', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'feminine':
        return { label: 'die (Giống cái - Femininum)', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'neuter':
        return { label: 'das (Giống trung - Neutrum)', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      default:
        return { label: item.partOfSpeech.toUpperCase(), bg: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const badge = getGenderBadge();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 p-6 sm:p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-3 pr-8">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${badge.bg}`}>
            {badge.label}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-mono-numbers">
            Trình độ: {item.level}
          </span>
          {item.pluralRule && (
            <span className="text-xs px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
              Quy tắc số nhiều: {item.pluralRule}
            </span>
          )}
        </div>

        {/* Word Title + Quick Actions */}
        <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              {item.german}
            </h2>
            <p className="text-lg font-medium text-slate-700 mt-1">
              {item.vietnamese}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(item.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isFavorite
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
              title={isFavorite ? 'Đã lưu yêu thích' : 'Lưu vào yêu thích'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
              title="Sao chép từ và ví dụ"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Pronunciation Center */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Phát âm tiếng Đức (Aussprache)
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => handlePlayWord(1.0)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-xs transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Nghe tốc độ chuẩn</span>
            </button>
            <button
              onClick={() => handlePlayWord(0.75)}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Nghe chậm (0.75x)</span>
            </button>
            <span className="text-xs text-slate-500 ml-auto hidden sm:inline">
              Mẹo: Lặp lại to và rõ ràng theo giọng mẫu
            </span>
          </div>
        </div>

        {/* Noun Declension in 4 Cases or Verb Conjugation */}
        {item.gender !== 'none' && item.partOfSpeech === 'noun' && (
          <div className="mb-6">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Chia danh từ theo 4 cách (Deklination)
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Cách (Kasus)</th>
                    <th className="py-2 px-3">Số ít (Singular)</th>
                    <th className="py-2 px-3">Với ein / kein</th>
                    <th className="py-2 px-3">Số nhiều (Plural)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Nominativ (Chủ ngữ)</td>
                    <td className="py-2 px-3">
                      {item.article === 'der' && `der ${item.word}`}
                      {item.article === 'die' && `die ${item.word}`}
                      {item.article === 'das' && `das ${item.word}`}
                    </td>
                    <td className="py-2 px-3">
                      {item.article === 'der' && `ein / kein ${item.word}`}
                      {item.article === 'die' && `eine / keine ${item.word}`}
                      {item.article === 'das' && `ein / kein ${item.word}`}
                    </td>
                    <td className="py-2 px-3">
                      {item.plural ? `die ${item.plural}` : '—'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Akkusativ (Tân ngữ TT)</td>
                    <td className="py-2 px-3">
                      {item.article === 'der' && <span className="font-semibold text-blue-700">den {item.word}</span>}
                      {item.article === 'die' && `die ${item.word}`}
                      {item.article === 'das' && `das ${item.word}`}
                    </td>
                    <td className="py-2 px-3">
                      {item.article === 'der' && <span className="font-semibold text-blue-700">einen / keinen {item.word}</span>}
                      {item.article === 'die' && `eine / keine ${item.word}`}
                      {item.article === 'das' && `ein / kein ${item.word}`}
                    </td>
                    <td className="py-2 px-3">
                      {item.plural ? `die ${item.plural}` : '—'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Dativ (Tân ngữ GT)</td>
                    <td className="py-2 px-3">
                      {item.article === 'der' && <span className="font-semibold text-blue-700">dem {item.word}</span>}
                      {item.article === 'die' && <span className="font-semibold text-rose-700">der {item.word}</span>}
                      {item.article === 'das' && <span className="font-semibold text-emerald-700">dem {item.word}</span>}
                    </td>
                    <td className="py-2 px-3">
                      {item.article === 'der' && 'einem / keinem'}
                      {item.article === 'die' && 'einer / keiner'}
                      {item.article === 'das' && 'einem / keinem'}
                    </td>
                    <td className="py-2 px-3">
                      {item.plural ? `den ${item.plural}${item.plural.endsWith('n') || item.plural.endsWith('s') ? '' : 'n'}` : '—'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Genitiv (Sở hữu)</td>
                    <td className="py-2 px-3">
                      {item.article === 'der' && `des ${item.word}s`}
                      {item.article === 'die' && `der ${item.word}`}
                      {item.article === 'das' && `des ${item.word}s`}
                    </td>
                    <td className="py-2 px-3">
                      {item.article === 'der' && 'eines / keines'}
                      {item.article === 'die' && 'einer / keiner'}
                      {item.article === 'das' && 'eines / keines'}
                    </td>
                    <td className="py-2 px-3">
                      {item.plural ? `der ${item.plural}` : '—'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Verb Conjugation Table */}
        {item.conjugation && (
          <div className="mb-6">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Chia động từ ở thì hiện tại (Präsens) &amp; Quá khứ Perfekt
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs mb-3">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">ich</span>
                <span className="font-bold text-slate-800">{item.conjugation.ich}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">du</span>
                <span className="font-bold text-blue-700">{item.conjugation.du}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">er / sie / es</span>
                <span className="font-bold text-blue-700">{item.conjugation.erSieEs}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">wir</span>
                <span className="font-bold text-slate-800">{item.conjugation.wir}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">ihr</span>
                <span className="font-bold text-slate-800">{item.conjugation.ihr}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">sie / Sie</span>
                <span className="font-bold text-slate-800">{item.conjugation.sieSie}</span>
              </div>
            </div>

            {item.conjugation.pastPerfekt && (
              <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
                <span>
                  <strong>Thì quá khứ Perfekt:</strong> {item.conjugation.hilfsverb === 'sein' ? 'ist' : 'hat'} + {item.conjugation.pastPerfekt}
                </span>
                <span className="text-[11px] text-amber-700 font-medium">
                  {item.conjugation.hilfsverb === 'sein' ? '(Đi với trợ động từ sein)' : '(Đi với trợ động từ haben)'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Contextual Examples (2 Sentences with Audio) */}
        <div className="space-y-3 mb-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Hai câu ví dụ thực tế trong ngữ cảnh:
          </div>

          {/* Example 1 */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-slate-900 leading-snug">
                1. {item.example}
              </p>
              <button
                onClick={() => handlePlaySentence(item.example, 1)}
                className={`p-1.5 rounded-full transition-colors shrink-0 ${
                  playingSentenceIndex === 1
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-blue-600 hover:bg-white'
                }`}
                title="Nghe câu 1"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 pl-4 border-l-2 border-slate-300">
              {item.exampleVi}
            </p>
          </div>

          {/* Example 2 */}
          {secondaryEx && (
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-slate-900 leading-snug">
                  2. {secondaryEx.de}
                </p>
                <button
                  onClick={() => handlePlaySentence(secondaryEx.de, 2)}
                  className={`p-1.5 rounded-full transition-colors shrink-0 ${
                    playingSentenceIndex === 2
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-blue-600 hover:bg-white'
                  }`}
                  title="Nghe câu 2"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 pl-4 border-l-2 border-slate-300">
                {secondaryEx.vi}
              </p>
            </div>
          )}
        </div>

        {/* Footer Notes */}
        {item.notes && (
          <div className="text-xs bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-blue-900">
            <strong>Ghi chú học tập:</strong> {item.notes}
          </div>
        )}
      </div>
    </div>
  );
};
