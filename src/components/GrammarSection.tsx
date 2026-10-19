import React, { useState } from 'react';
import { GRAMMAR_TOPICS, GrammarTopic } from '../data/grammar';
import {
  ADJEKTIV_MIT_BESTIMMT,
  ADJEKTIV_MIT_UNBESTIMMT,
  ADJEKTIV_OHNE_ARTIKEL,
  RELATIVPRONOMEN_DATA,
  REFLEXIVE_PRONOUNS_DATA,
  GENITIV_PREPOSITIONS_DATA,
  VERBEN_MIT_PRAEPOSITIONEN,
} from '../data/grammarA2B1';
import { speakGerman } from '../utils/speech';
import {
  Volume2,
  BookOpen,
  Layers,
  Check,
  ArrowRight,
  Filter,
  Sparkles,
  Table,
  CheckCircle2,
} from 'lucide-react';

export const GrammarSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'A1' | 'A2' | 'B1'>('all');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('satzbau');
  const [mainView, setMainView] = useState<'topics' | 'tables'>('topics');
  const [selectedRefTable, setSelectedRefTable] = useState<
    'adjective_endings' | 'relative_pronouns' | 'reflexive_pronouns' | 'verbs_prepositions' | 'genitiv_prepositions'
  >('adjective_endings');

  // Interactive Sentence Structure Modes across A1, A2, and B1
  const [interactiveMode, setInteractiveMode] = useState<
    | 'normal'
    | 'time_first'
    | 'modal'
    | 'separable'
    | 'nebensatz'
    | 'relativsatz'
    | 'um_zu'
    | 'passiv'
    | 'konjunktiv2'
  >('normal');

  // Filter topics based on selected level
  const filteredTopics = GRAMMAR_TOPICS.filter((t) => {
    if (selectedLevel === 'all') return true;
    return t.level === selectedLevel;
  });

  const selectedTopic =
    filteredTopics.find((t) => t.id === selectedTopicId) ||
    GRAMMAR_TOPICS.find((t) => t.id === selectedTopicId) ||
    filteredTopics[0] ||
    GRAMMAR_TOPICS[0];

  const getLevelBadgeStyle = (level?: string) => {
    switch (level) {
      case 'A1':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'A2':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'B1':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Cẩm nang cấu trúc &amp; Ngữ pháp toàn diện A1 – A2 – B1</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Cấu trúc câu &amp; Ngữ pháp tiếng Đức A1 – A2 – B1
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Hệ thống hóa toàn bộ kiến thức cấu trúc câu và ngữ pháp theo Khung tham chiếu Châu Âu:
            từ quy tắc trật tự từ V2, thì quá khứ Perfekt (<strong>A1</strong>);
            mệnh đề phụ weil/dass/wenn/als, đại từ quan hệ và phản thân (<strong>A2</strong>);
            đến thể bị động Passiv, Konjunktiv II, cấu trúc mục đích um... zu và liên từ kép (<strong>B1</strong>).
          </p>

          {/* View Mode Toggle: Topics vs Reference Tables */}
          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={() => setMainView('topics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mainView === 'topics'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Chuyên đề cấu trúc câu ({GRAMMAR_TOPICS.length})</span>
            </button>

            <button
              onClick={() => setMainView('tables')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mainView === 'tables'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Bảng tra cứu nâng cao A1 – A2 – B1</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Sentence Order Visualizer Sandbox (A1, A2, B1) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              Mô hình trật tự từ tương tác (Satzbau Visualizer)
            </span>
            <h3 className="text-lg font-bold">
              Quy tắc vàng vị trí động từ trong câu tiếng Đức A1 – A2 – B1
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Bấm chọn từng cấu trúc để xem các khối từ tự động sắp xếp lại vị trí
          </span>
        </div>

        {/* Level Badged Mode Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar mb-6">
          <button
            onClick={() => setInteractiveMode('normal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              interactiveMode === 'normal'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-[10px] px-1 py-0.2 bg-emerald-800 rounded text-emerald-200 font-mono">A1</span>
            1. Câu khẳng định thường (V2)
          </button>

          <button
            onClick={() => setInteractiveMode('time_first')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              interactiveMode === 'time_first'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-[10px] px-1 py-0.2 bg-emerald-800 rounded text-emerald-200 font-mono">A1</span>
            2. Đảo ngữ thời gian (Inversion)
          </button>

          <button
            onClick={() => setInteractiveMode('modal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              interactiveMode === 'modal'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-[10px] px-1 py-0.2 bg-emerald-800 rounded text-emerald-200 font-mono">A1</span>
            3. Động từ khuyết thiếu (Modalverb)
          </button>

          <button
            onClick={() => setInteractiveMode('separable')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              interactiveMode === 'separable'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-[10px] px-1 py-0.2 bg-emerald-800 rounded text-emerald-200 font-mono">A1</span>
            4. Động từ tách (Trennbare Verben)
          </button>

          <button
            onClick={() => setInteractiveMode('nebensatz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              interactiveMode === 'nebensatz'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-[10px] px-1 py-0.2 bg-blue-800 rounded text-blue-200 font-mono">A2</span>
            5. Mệnh đề phụ (weil, dass, wenn)
          </button>

          <button
            onClick={() => setInteractiveMode('relativsatz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              interactiveMode === 'relativsatz'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-[10px] px-1 py-0.2 bg-blue-800 rounded text-blue-200 font-mono">A2</span>
            6. Mệnh đề quan hệ (Relativsatz)
          </button>

          <button
            onClick={() => setInteractiveMode('um_zu')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              interactiveMode === 'um_zu'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-[10px] px-1 py-0.2 bg-purple-800 rounded text-purple-200 font-mono">B1</span>
            7. Mục đích: um... zu + Infinitiv
          </button>

          <button
            onClick={() => setInteractiveMode('passiv')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              interactiveMode === 'passiv'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-[10px] px-1 py-0.2 bg-purple-800 rounded text-purple-200 font-mono">B1</span>
            8. Bị động (Vorgangspassiv)
          </button>

          <button
            onClick={() => setInteractiveMode('konjunktiv2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              interactiveMode === 'konjunktiv2'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="text-[10px] px-1 py-0.2 bg-purple-800 rounded text-purple-200 font-mono">B1</span>
            9. Thể giả định (Konjunktiv II)
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
                if (interactiveMode === 'nebensatz') sentence = 'Ich nehme eine Tablette, weil ich starke Kopfschmerzen habe.';
                if (interactiveMode === 'relativsatz') sentence = 'Das ist der Arzt, der mich gestern operiert hat.';
                if (interactiveMode === 'um_zu') sentence = 'Ich lerne fleißig Deutsch, um eine gute Ausbildung zu machen.';
                if (interactiveMode === 'passiv') sentence = 'Der Patient wird vom erfahrenen Chefarzt operiert.';
                if (interactiveMode === 'konjunktiv2') sentence = 'Wenn ich mehr Zeit hätte, würde ich eine Weltreise machen.';
                speakGerman(sentence);
              }}
              className="p-1 rounded-full bg-slate-700 hover:bg-blue-600 text-white transition-colors"
              title="Phát âm câu này"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Mode 1: Normal A1 */}
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

          {/* Mode 2: Time First A1 */}
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

          {/* Mode 3: Modalverb A1 */}
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

          {/* Mode 4: Separable Verb A1 */}
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

          {/* Mode 5: Nebensatz A2 */}
          {interactiveMode === 'nebensatz' && (
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Mệnh đề chính (V2 bình thường)</span>
                  <span className="text-white">Ich nehme eine Tablette,</span>
                </div>
                <div className="bg-blue-600 text-white font-bold px-3 py-2 rounded-lg text-center shadow-md">
                  <span className="block text-[10px] text-blue-200 uppercase font-black">Liên từ phụ thuộc</span>
                  <strong className="text-base">weil</strong>
                </div>
                <div className="bg-blue-900/60 border border-blue-400 text-blue-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-blue-300">Chủ ngữ mệnh đề phụ</span>
                  <strong className="text-base text-white">ich</strong>
                </div>
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Tân ngữ</span>
                  <span className="text-white">starke Kopfschmerzen</span>
                </div>
                <div className="bg-rose-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-rose-950 uppercase font-black">CUỐI CÂU (Động từ đã chia)</span>
                  <strong className="text-base">habe.</strong>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-3 italic">
                → Quy tắc mệnh đề phụ Nebensatz: Sau các liên từ phụ thuộc như <strong>weil, dass, wenn, als, obwohl</strong>, động từ được chia luôn bị đẩy xuống <strong>VỊ TRÍ CUỐI CÙNG</strong>.
              </p>
            </div>
          )}

          {/* Mode 6: Relativsatz A2/B1 */}
          {interactiveMode === 'relativsatz' && (
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Mệnh đề chính</span>
                  <span className="text-white">Das ist der Arzt,</span>
                </div>
                <div className="bg-purple-600 text-white font-bold px-3 py-2 rounded-lg text-center shadow-md">
                  <span className="block text-[10px] text-purple-200 uppercase font-black">Đại từ quan hệ</span>
                  <strong className="text-base">der</strong>
                </div>
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Thành phần phụ</span>
                  <span className="text-white">mich gestern im Krankenhaus</span>
                </div>
                <div className="bg-rose-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-rose-950 uppercase font-black">CUỐI CÂU (Partizip II + Trợ từ chia)</span>
                  <strong className="text-base">operiert hat.</strong>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-3 italic">
                → Mệnh đề quan hệ Relativsatz: Động từ nằm ở cuối câu. Ở thì quá khứ Perfekt, Partizip II đứng áp chót và trợ động từ (hat/ist) ở vị trí tận cùng.
              </p>
            </div>
          )}

          {/* Mode 7: um... zu B1 */}
          {interactiveMode === 'um_zu' && (
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Mệnh đề chính (Cùng chủ ngữ)</span>
                  <span className="text-white">Ich lerne fleißig Deutsch,</span>
                </div>
                <div className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-center shadow-md">
                  <span className="block text-[10px] text-amber-950 uppercase font-black">Mục đích</span>
                  <strong className="text-base">um</strong>
                </div>
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Tân ngữ</span>
                  <span className="text-white">eine gute Ausbildung in Berlin</span>
                </div>
                <div className="bg-emerald-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-emerald-950 uppercase font-black">CUỐI CÂU (zu + Nguyên mẫu)</span>
                  <strong className="text-base">zu machen.</strong>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-3 italic">
                → Cấu trúc chỉ mục đích um... zu: Dùng khi cả hai vế cùng một chủ thể hành động; "zu" đứng ngay trước động từ nguyên mẫu ở cuối câu.
              </p>
            </div>
          )}

          {/* Mode 8: Passiv B1 */}
          {interactiveMode === 'passiv' && (
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                <div className="bg-blue-900/60 border border-blue-400 text-blue-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-blue-300">Chủ ngữ mới (Đối tượng bị tác động)</span>
                  <strong className="text-base text-white">Der Patient</strong>
                </div>
                <div className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-amber-950 uppercase font-black">Vị trí 2 (werden đã chia)</span>
                  <strong className="text-base">wird</strong>
                </div>
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Tác nhân (von + Dativ)</span>
                  <span className="text-white">vom erfahrenen Chefarzt</span>
                </div>
                <div className="bg-rose-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-rose-950 uppercase font-black">CUỐI CÂU (Partizip II)</span>
                  <strong className="text-base">operiert.</strong>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-3 italic">
                → Thể bị động Vorgangspassiv B1: Công thức <strong>werden (V2) + Partizip II (cuối câu)</strong>. Nhấn mạnh vào quá trình hành động hơn là người thực hiện.
              </p>
            </div>
          )}

          {/* Mode 9: Konjunktiv II B1 */}
          {interactiveMode === 'konjunktiv2' && (
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                <div className="bg-purple-900/60 border border-purple-400 text-purple-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-purple-300">Vế giả định (Wenn + hätte/wäre cuối)</span>
                  <strong className="text-base text-white">Wenn ich mehr Zeit hätte,</strong>
                </div>
                <div className="bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-amber-950 uppercase font-black">Vị trí 1 vế chính (würde)</span>
                  <strong className="text-base">würde</strong>
                </div>
                <div className="bg-blue-900/60 border border-blue-400 text-blue-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-blue-300">Chủ ngữ</span>
                  <strong className="text-base text-white">ich</strong>
                </div>
                <div className="bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-center">
                  <span className="block text-[10px] text-slate-400">Tân ngữ</span>
                  <span className="text-white">eine Weltreise</span>
                </div>
                <div className="bg-emerald-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-center shadow-md scale-105">
                  <span className="block text-[10px] text-emerald-950 uppercase font-black">CUỐI CÂU (Nguyên mẫu)</span>
                  <strong className="text-base">machen.</strong>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-3 italic">
                → Thể giả định Konjunktiv II B1: Diễn tả mong muốn hoặc điều kiện không có thật ở hiện tại với <strong>wäre, hätte, würde + Infinitiv</strong>.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main View Switcher: Topics Split Layout OR Reference Tables */}
      {mainView === 'topics' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Chapter List with Level Filter */}
          <div className="lg:col-span-4 space-y-3">
            {/* Level Filter Tabs */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block px-1 mb-2">
                Phân loại theo cấp độ (CEFR):
              </span>
              <div className="grid grid-cols-4 gap-1">
                <button
                  onClick={() => setSelectedLevel('all')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                    selectedLevel === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tất cả ({GRAMMAR_TOPICS.length})
                </button>
                <button
                  onClick={() => setSelectedLevel('A1')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                    selectedLevel === 'A1'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  A1 ({GRAMMAR_TOPICS.filter((t) => t.level === 'A1').length})
                </button>
                <button
                  onClick={() => setSelectedLevel('A2')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                    selectedLevel === 'A2'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  A2 ({GRAMMAR_TOPICS.filter((t) => t.level === 'A2').length})
                </button>
                <button
                  onClick={() => setSelectedLevel('B1')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                    selectedLevel === 'B1'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  }`}
                >
                  B1 ({GRAMMAR_TOPICS.filter((t) => t.level === 'B1').length})
                </button>
              </div>
            </div>

            {/* List of Topics */}
            <div className="space-y-2">
              {filteredTopics.map((topic) => {
                const isSelected = topic.id === selectedTopic.id;
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
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                            isSelected
                              ? 'bg-slate-800 text-amber-300 border-slate-700'
                              : getLevelBadgeStyle(topic.level)
                          }`}
                        >
                          {topic.level || 'A1'}
                        </span>
                        <span className="font-bold block leading-snug line-clamp-1">{topic.title}</span>
                      </div>
                      <span
                        className={`text-[11px] block line-clamp-1 ${
                          isSelected ? 'text-slate-300' : 'text-slate-400'
                        }`}
                      >
                        {topic.shortSummary}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 ml-2 ${isSelected ? 'text-white' : 'text-slate-400'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Topic Deep Dive */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getLevelBadgeStyle(
                    selectedTopic.level
                  )}`}
                >
                  Trình độ {selectedTopic.level || 'A1'}
                </span>
                <span className="text-xs font-semibold text-slate-500">Chuyên đề chi tiết</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedTopic.title}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{selectedTopic.explanation}</p>
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
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3 text-xs"
                  >
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
      ) : (
        /* Reference Tables View */
        <div className="space-y-6">
          {/* Sub-selector for reference tables */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedRefTable('adjective_endings')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedRefTable === 'adjective_endings'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              1. Bảng chia đuôi tính từ (A1/A2/B1)
            </button>
            <button
              onClick={() => setSelectedRefTable('relative_pronouns')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedRefTable === 'relative_pronouns'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              2. Đại từ quan hệ (Relativpronomen: A2/B1)
            </button>
            <button
              onClick={() => setSelectedRefTable('reflexive_pronouns')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedRefTable === 'reflexive_pronouns'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              3. Đại từ phản thân (Reflexivpronomen: A2)
            </button>
            <button
              onClick={() => setSelectedRefTable('verbs_prepositions')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedRefTable === 'verbs_prepositions'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              4. Động từ + Giới từ cố định &amp; Worauf/Darauf (A2/B1)
            </button>
            <button
              onClick={() => setSelectedRefTable('genitiv_prepositions')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedRefTable === 'genitiv_prepositions'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              5. Giới từ đi với Genitiv (B1)
            </button>
          </div>

          {/* Table 1: Adjective Endings */}
          {selectedRefTable === 'adjective_endings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Chuyên đề cốt tử A1 – A2 – B1
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Bảng chia đuôi tính từ toàn diện (Adjektivdeklination)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Quy tắc: Đuôi tính từ phụ thuộc vào 3 yếu tố: <strong>Loại mạo từ đi trước</strong> (Xác định / Không xác định / Không mạo từ), <strong>Giống của danh từ</strong> (Đực / Cái / Trung / Số nhiều) và <strong>Cách ngữ pháp</strong> (Nom, Akk, Dat, Gen).
                </p>
              </div>

              {/* 1A: Mit bestimmtem Artikel */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                  <span className="font-bold text-sm">A. Sau mạo từ xác định (der / die / das / die)</span>
                  <span className="text-xs text-emerald-400 font-mono">Chỉ có 2 đuôi: -e hoặc -en</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Cách</th>
                        <th className="py-2.5 px-3 text-blue-700">Giống đực (Maskulin)</th>
                        <th className="py-2.5 px-3 text-rose-700">Giống cái (Feminin)</th>
                        <th className="py-2.5 px-3 text-emerald-700">Giống trung (Neutral)</th>
                        <th className="py-2.5 px-3 text-purple-700">Số nhiều (Plural)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ADJEKTIV_MIT_BESTIMMT.map((row) => (
                        <tr key={row.caseName} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-slate-900 bg-slate-50">{row.caseName}</td>
                          <td className="py-2.5 px-3 font-mono font-medium text-slate-800">{row.masculine}</td>
                          <td className="py-2.5 px-3 font-mono font-medium text-slate-800">{row.feminine}</td>
                          <td className="py-2.5 px-3 font-mono font-medium text-slate-800">{row.neuter}</td>
                          <td className="py-2.5 px-3 font-mono font-medium text-purple-900 font-bold">{row.plural}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 1B: Mit unbestimmtem Artikel */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                  <span className="font-bold text-sm">B. Sau mạo từ không xác định (ein / eine / mein / kein...)</span>
                  <span className="text-xs text-amber-400 font-mono">Đuôi đặc trưng: -er, -e, -es</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Cách</th>
                        <th className="py-2.5 px-3 text-blue-700">Giống đực</th>
                        <th className="py-2.5 px-3 text-rose-700">Giống cái</th>
                        <th className="py-2.5 px-3 text-emerald-700">Giống trung</th>
                        <th className="py-2.5 px-3 text-purple-700">Số nhiều (meine / keine...)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ADJEKTIV_MIT_UNBESTIMMT.map((row) => (
                        <tr key={row.caseName} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-slate-900 bg-slate-50">{row.caseName}</td>
                          <td className="py-2.5 px-3 font-mono font-medium text-slate-800">{row.masculine}</td>
                          <td className="py-2.5 px-3 font-mono font-medium text-slate-800">{row.feminine}</td>
                          <td className="py-2.5 px-3 font-mono font-medium text-slate-800">{row.neuter}</td>
                          <td className="py-2.5 px-3 font-mono font-medium text-purple-900 font-bold">{row.plural}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 1C: Ohne Artikel */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                  <span className="font-bold text-sm">C. Khi không có mạo từ (Nullartikel)</span>
                  <span className="text-xs text-blue-300 font-mono">Tính từ mang đuôi của mạo từ xác định</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Cách</th>
                        <th className="py-2.5 px-3 text-blue-700">Giống đực</th>
                        <th className="py-2.5 px-3 text-rose-700">Giống cái</th>
                        <th className="py-2.5 px-3 text-emerald-700">Giống trung</th>
                        <th className="py-2.5 px-3 text-purple-700">Số nhiều</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ADJEKTIV_OHNE_ARTIKEL.map((row) => (
                        <tr key={row.caseName} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-slate-900 bg-slate-50">{row.caseName}</td>
                          <td className="py-2.5 px-3 font-mono font-medium text-slate-800">{row.masculine}</td>
                          <td className="py-2.5 px-3 font-mono font-medium text-slate-800">{row.feminine}</td>
                          <td className="py-2.5 px-3 font-mono font-medium text-slate-800">{row.neuter}</td>
                          <td className="py-2.5 px-3 font-mono font-medium text-purple-900 font-bold">{row.plural}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Table 2: Relativpronomen */}
          {selectedRefTable === 'relative_pronouns' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Ngữ pháp trọng điểm A2 – B1
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Bảng Đại từ quan hệ 4 cách (Relativpronomen: der / die / das / denen...)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Đại từ quan hệ tương đồng với mạo từ xác định, chỉ khác ở <strong>Dativ số nhiều (denen)</strong> và <strong>Genitiv (dessen / deren)</strong>.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-3">Cách</th>
                        <th className="py-3 px-3 text-blue-700">Đực (r)</th>
                        <th className="py-3 px-3 text-rose-700">Cái (e)</th>
                        <th className="py-3 px-3 text-emerald-700">Trung (s)</th>
                        <th className="py-3 px-3 text-purple-700">Số nhiều</th>
                        <th className="py-3 px-4">Ví dụ thực tế câu quan hệ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {RELATIVPRONOMEN_DATA.map((row) => (
                        <tr key={row.caseName} className="hover:bg-slate-50">
                          <td className="py-3 px-3 font-bold text-slate-900 bg-slate-50">{row.caseName}</td>
                          <td className="py-3 px-3 font-mono font-bold text-blue-800">{row.masculine}</td>
                          <td className="py-3 px-3 font-mono font-bold text-rose-800">{row.feminine}</td>
                          <td className="py-3 px-3 font-mono font-bold text-emerald-800">{row.neuter}</td>
                          <td className="py-3 px-3 font-mono font-bold text-purple-800">{row.plural}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <span className="font-semibold text-slate-900 block">{row.example}</span>
                                <span className="text-slate-500 italic block text-[11px]">{row.exampleVi}</span>
                              </div>
                              <button
                                onClick={() => speakGerman(row.example)}
                                className="p-1 rounded-full text-slate-400 hover:text-blue-600 transition-colors shrink-0"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Table 3: Reflexive Pronouns */}
          {selectedRefTable === 'reflexive_pronouns' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Ngữ pháp thực dụng A2
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Đại từ phản thân (Reflexivpronomen: Akkusativ vs Dativ)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Đại từ phản thân ngôi <strong>er/sie/es và sie/Sie luôn là sich</strong>. Phản thân Dativ chỉ dùng khi câu đã có một tân ngữ trực tiếp cụ thể (ví dụ: <em>Ich wasche mir die Hände</em>).
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Đại từ nhân xưng</th>
                        <th className="py-3 px-4 text-blue-700">Phản thân Akkusativ</th>
                        <th className="py-3 px-4 text-emerald-700">Phản thân Dativ</th>
                        <th className="py-3 px-4">Ví dụ Akkusativ</th>
                        <th className="py-3 px-4">Ví dụ Dativ (có tân ngữ thêm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {REFLEXIVE_PRONOUNS_DATA.map((row) => (
                        <tr key={row.person} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-slate-900">{row.person}</td>
                          <td className="py-3 px-4 font-mono font-bold text-blue-800">{row.akkusativ}</td>
                          <td className="py-3 px-4 font-mono font-bold text-emerald-800">{row.dativ}</td>
                          <td className="py-3 px-4 font-medium text-slate-800 italic">{row.exampleAkk}</td>
                          <td className="py-3 px-4 font-medium text-slate-800 italic">{row.exampleDat}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Table 4: Verben mit Präpositionen */}
          {selectedRefTable === 'verbs_prepositions' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Ngữ pháp nâng cao A2 – B1
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Động từ đi kèm giới từ cố định &amp; Cặp từ hỏi Worauf / Darauf
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Hỏi cho vật dùng <strong>Wo(r) + Giới từ</strong> (Worauf, Wofür, Woran...). Hỏi cho người dùng <strong>Giới từ + Wen/Wem</strong> (Auf wen, An wen, Mit wem...).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VERBEN_MIT_PRAEPOSITIONEN.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-slate-900">{item.verb}</span>
                          <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-100 text-blue-800">
                            + {item.prep}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                            {item.caseType}
                          </span>
                        </div>
                        <span className="text-xs text-slate-600 block mt-0.5 font-medium">
                          Nghĩa: {item.meaning}
                        </span>
                      </div>
                      <button
                        onClick={() => speakGerman(`${item.verb} ${item.prep}. ${item.example}`)}
                        className="p-1 rounded-full text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Question pairs */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-1">
                      <div>
                        <span className="font-semibold text-slate-500">Hỏi cho đồ vật: </span>
                        <code className="text-purple-700 font-bold">{item.questionThing}</code>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500">Hỏi cho con người: </span>
                        <code className="text-blue-700 font-bold">{item.questionPerson}</code>
                      </div>
                    </div>

                    {/* Example */}
                    <div className="text-xs border-t border-slate-100 pt-2">
                      <span className="font-semibold text-slate-900 block">{item.example}</span>
                      <span className="text-slate-500 italic block">{item.exampleVi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Table 5: Genitiv Prepositions */}
          {selectedRefTable === 'genitiv_prepositions' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Chuẩn đề thi B1 (Goethe / Telc)
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Giới từ đi với Genitiv (wegen, während, trotz, statt, innerhalb, außerhalb)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Cách Genitiv thể hiện quan hệ sở hữu hoặc đi kèm các giới từ trang trọng. Danh từ giống đực và trung thêm đuôi <strong>-s hoặc -es</strong> (des Mannes, des Kindes, eines Monats).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GENITIV_PREPOSITIONS_DATA.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                          {item.prep}
                        </span>
                        <span className="text-xs font-bold text-slate-700">+ Genitiv</span>
                      </div>
                      <button
                        onClick={() => speakGerman(item.example)}
                        className="p-1 rounded-full text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600">
                      <strong>Ý nghĩa:</strong> {item.meaning}
                    </p>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <span className="font-semibold text-slate-900 block">{item.example}</span>
                      <span className="text-slate-600 italic block mt-0.5">{item.exampleVi}</span>
                      <span className="text-[11px] text-blue-700 block mt-1 font-medium">
                        💡 {item.note}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
