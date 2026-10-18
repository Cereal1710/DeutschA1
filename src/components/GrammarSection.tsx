import React, { useState } from 'react';
import { GRAMMAR_TOPICS, GrammarTopic } from '../data/grammar';
import { speakGerman } from '../utils/speech';
import { Volume2, BookOpen, Layers, Check, ArrowRight, Lightbulb } from 'lucide-react';

export const GrammarSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('satzbau');
  const [interactiveMode, setInteractiveMode] = useState<'normal' | 'time_first' | 'modal' | 'separable'>('normal');

  const selectedTopic = GRAMMAR_TOPICS.find((t) => t.id === selectedTopicId) || GRAMMAR_TOPICS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Cẩm nang ngữ pháp A1.1 – A1.2</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Cấu trúc câu &amp; Ngữ pháp tiếng Đức A1
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Nắm vững trật tự từ (Word Order), quy tắc động từ đứng ở vị trí thứ hai (V2-Stellung),
            động từ khuyết thiếu (Modalverben), động từ tách và thì quá khứ Perfekt.
          </p>
        </div>
      </div>

      {/* Interactive Sentence Order Visualizer Sandbox */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              Mô hình trật tự từ trực quan
            </span>
            <h3 className="text-lg font-bold">Quy tắc vàng: Động từ chia luôn ở VỊ TRÍ 2</h3>
          </div>
          <span className="text-xs text-slate-300">
            Xem vị trí các khối từ biến đổi khi đổi cấu trúc câu
          </span>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar mb-6">
          <button
            onClick={() => setInteractiveMode('normal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
              interactiveMode === 'normal'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            1. Câu khẳng định thường (Chủ ngữ V1)
          </button>
          <button
            onClick={() => setInteractiveMode('time_first')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
              interactiveMode === 'time_first'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            2. Đảo ngữ thời gian (Thời gian V1)
          </button>
          <button
            onClick={() => setInteractiveMode('modal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
              interactiveMode === 'modal'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            3. Động từ khuyết thiếu (Modalverb)
          </button>
          <button
            onClick={() => setInteractiveMode('separable')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
              interactiveMode === 'separable'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            4. Động từ tách (Trennbare Verben)
          </button>
        </div>

        {/* Visual Sentence Blocks */}
        <div className="bg-slate-800/90 rounded-xl p-5 border border-slate-700">
          <div className="text-xs text-slate-400 mb-3 flex items-center justify-between">
            <span>Sơ đồ khối cấu trúc câu:</span>
            <button
              onClick={() => {
                let sentence = '';
                if (interactiveMode === 'normal') sentence = 'Ich lerne heute fleißig Deutsch.';
                if (interactiveMode === 'time_first') sentence = 'Heute lerne ich fleißig Deutsch.';
                if (interactiveMode === 'modal') sentence = 'Ich kann heute fleißig Deutsch lernen.';
                if (interactiveMode === 'separable') sentence = 'Ich stehe jeden Morgen um 6 Uhr auf.';
                speakGerman(sentence);
              }}
              className="p-1 rounded-full bg-slate-700 hover:bg-blue-600 text-white transition-colors"
              title="Nghe câu"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Mode 1: Normal */}
          {interactiveMode === 'normal' && (
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                <div className="bg-blue-900/60 border border-blue-400 text-blue-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-blue-300">Vị trí 1 (Chủ ngữ)</span>
                  <strong className="text-base text-white">Ich</strong>
                </div>
                <div className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-amber-950 uppercase font-black">Vị trí 2 (Động từ chia)</span>
                  <strong className="text-base">lerne</strong>
                </div>
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Thời gian</span>
                  <span className="text-white">heute</span>
                </div>
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Cách thức</span>
                  <span className="text-white">fleißig</span>
                </div>
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Tân ngữ</span>
                  <span className="text-white">Deutsch.</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-3 italic">
                → Nghĩa: "Hôm nay tôi chăm chỉ học tiếng Đức." (Động từ "lerne" đứng ở vị trí 2).
              </p>
            </div>
          )}

          {/* Mode 2: Time First (Inversion) */}
          {interactiveMode === 'time_first' && (
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                <div className="bg-purple-900/60 border border-purple-400 text-purple-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-purple-300">Vị trí 1 (Thời gian đưa lên)</span>
                  <strong className="text-base text-white">Heute</strong>
                </div>
                <div className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-amber-950 uppercase font-black">Vị trí 2 (Động từ giữ nguyên)</span>
                  <strong className="text-base">lerne</strong>
                </div>
                <div className="bg-blue-900/60 border border-blue-400 text-blue-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-blue-300">Vị trí 3 (Chủ ngữ đảo sau)</span>
                  <strong className="text-base text-white">ich</strong>
                </div>
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Cách thức</span>
                  <span className="text-white">fleißig</span>
                </div>
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Tân ngữ</span>
                  <span className="text-white">Deutsch.</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-3 italic">
                → Đảo ngữ: Khi đưa "Heute" lên đầu câu, động từ "lerne" vẫn ở vị trí 2, chủ ngữ "ich" lùi về vị trí 3.
              </p>
            </div>
          )}

          {/* Mode 3: Modalverb Frame (Satzklammer) */}
          {interactiveMode === 'modal' && (
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                <div className="bg-blue-900/60 border border-blue-400 text-blue-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-blue-300">Vị trí 1</span>
                  <strong className="text-base text-white">Ich</strong>
                </div>
                <div className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-amber-950 uppercase font-black">Vị trí 2 (Modalverb đã chia)</span>
                  <strong className="text-base">kann</strong>
                </div>
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Thành phần phụ</span>
                  <span className="text-white">heute fleißig Deutsch</span>
                </div>
                <div className="bg-rose-600 text-white font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-rose-200 uppercase font-black">Cuối câu (Động từ nguyên mẫu)</span>
                  <strong className="text-base">lernen.</strong>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-3 italic">
                → Khung câu (Satzklammer): Động từ khuyết thiếu "kann" đứng ở V2, động từ chính "lernen" bị đẩy về tận cùng câu ở dạng nguyên thể.
              </p>
            </div>
          )}

          {/* Mode 4: Separable Verb */}
          {interactiveMode === 'separable' && (
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                <div className="bg-blue-900/60 border border-blue-400 text-blue-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-blue-300">Vị trí 1</span>
                  <strong className="text-base text-white">Ich</strong>
                </div>
                <div className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-amber-950 uppercase font-black">Vị trí 2 (Gốc động từ đã chia)</span>
                  <strong className="text-base">stehe</strong>
                </div>
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Thời gian</span>
                  <span className="text-white">jeden Morgen um 6 Uhr</span>
                </div>
                <div className="bg-emerald-600 text-white font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-emerald-200 uppercase font-black">Cuối câu (Tiền tố tách)</span>
                  <strong className="text-base">auf.</strong>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-3 italic">
                → Động từ tách "aufstehen": Gốc "stehe" chia theo chủ ngữ ở V2, tiền tố "auf" bị tách và nhảy ra tận cuối câu.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Topics Split Layout: List of Chapters on Left + Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chapter List */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1 mb-2">
            Danh mục chủ đề ngữ pháp A1
          </span>
          {GRAMMAR_TOPICS.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="font-bold block leading-snug">{topic.title}</span>
                  <span className={`text-[11px] block mt-0.5 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                    {topic.shortSummary}
                  </span>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 ml-2 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Topic Deep Dive */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              Chuyên đề chi tiết
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-2">
              {selectedTopic.title}
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {selectedTopic.explanation}
            </p>
          </div>

          {/* Formula box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Công thức cấu trúc:
            </span>
            <code className="text-sm font-bold text-blue-700 block font-mono">
              {selectedTopic.formula}
            </code>
          </div>

          {/* Rules list */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Các quy tắc cần ghi nhớ:
            </h4>
            <div className="space-y-2">
              {selectedTopic.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Examples list with Audio */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Ví dụ mẫu thực tế kèm phát âm:
            </h4>
            <div className="space-y-2.5">
              {selectedTopic.examples.map((ex, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">{ex.de}</span>
                    <span className="text-slate-600 italic block mt-0.5">{ex.vi}</span>
                    {ex.note && (
                      <span className="text-[11px] text-blue-700 font-medium block mt-1">
                        • {ex.note}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => speakGerman(ex.de)}
                    className="p-1.5 rounded-full hover:bg-white text-slate-400 hover:text-blue-600 transition-colors shrink-0"
                    title="Nghe câu ví dụ"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
