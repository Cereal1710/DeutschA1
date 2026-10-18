import React, { useState } from 'react';
import {
  DEFINITE_ARTICLES,
  INDEFINITE_ARTICLES,
  NEGATIVE_ARTICLES,
  PERSONAL_PRONOUNS,
  POSSESSIVE_PRONOUNS,
  PREPOSITIONS_DATA,
  MODAL_VERBS_CONJUGATION,
} from '../data/grammar';
import { speakGerman } from '../utils/speech';
import { Volume2, ArrowRight, HelpCircle, Compass, CheckCircle2 } from 'lucide-react';

export const DeclensionExplorer: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'articles' | 'pronouns' | 'prepositions' | 'verbs_cases' | 'modal_verbs'>('articles');
  const [articleType, setArticleType] = useState<'definite' | 'indefinite' | 'negative' | 'possessive'>('definite');

  // Wechselpräpositionen interactive toggle
  const [wechselQuestion, setWechselQuestion] = useState<'wo' | 'wohin'>('wo');

  // Interactive Case Sandbox
  const [interactiveWord, setInteractiveWord] = useState<'mann' | 'frau' | 'kind'>('mann');
  const [interactiveCase, setInteractiveCase] = useState<'nom' | 'akk' | 'dat' | 'gen'>('akk');

  const interactiveExamples = {
    mann: {
      nom: { article: 'der', phrase: 'Der Mann kommt aus Berlin.', vi: 'Người đàn ông đến từ Berlin.' },
      akk: { article: 'den', phrase: 'Ich sehe den Mann an der Haltestelle.', vi: 'Tôi nhìn thấy người đàn ông ở trạm dừng.' },
      dat: { article: 'dem', phrase: 'Ich helfe dem Mann beim Tragen der Taschen.', vi: 'Tôi giúp đỡ người đàn ông mang vác túi.' },
      gen: { article: 'des', phrase: 'Das Auto des Mannes steht vor dem Haus.', vi: 'Ô tô của người đàn ông đỗ trước nhà.' },
    },
    frau: {
      nom: { article: 'die', phrase: 'Die Frau ist Lehrerin von Beruf.', vi: 'Người phụ nữ làm nghề giáo viên.' },
      akk: { article: 'die', phrase: 'Ich kenne die Frau seit vielen Jahren.', vi: 'Tôi quen biết người phụ nữ này từ nhiều năm nay.' },
      dat: { article: 'der', phrase: 'Ich schenke der Frau einen Blumenstrauß.', vi: 'Tôi tặng người phụ nữ một bó hoa.' },
      gen: { article: 'der', phrase: 'Das Buch der Frau liegt auf dem Schreibtisch.', vi: 'Cuốn sách của người phụ nữ nằm trên bàn làm việc.' },
    },
    kind: {
      nom: { article: 'das', phrase: 'Das Kind spielt gerne im Park.', vi: 'Đứa trẻ thích chơi trong công viên.' },
      akk: { article: 'das', phrase: 'Wir besuchen das Kind am Nachmittag.', vi: 'Chúng tôi đến thăm đứa trẻ vào buổi chiều.' },
      dat: { article: 'dem', phrase: 'Ich gebe dem Kind einen roten Apfel.', vi: 'Tôi đưa cho đứa trẻ một quả táo đỏ.' },
      gen: { article: 'des', phrase: 'Das Spielzeug des Kindes ist bunt.', vi: 'Đồ chơi của đứa trẻ rất nhiều màu sắc.' },
    },
  };

  const currentInteractive = interactiveExamples[interactiveWord][interactiveCase];

  return (
    <div className="space-y-8">
      {/* Introduction Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Ngữ pháp trọng tâm A1</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Bảng chia 4 cách (Nom, Akk, Dat, Gen) &amp; Giới từ
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Trong tiếng Đức, mạo từ và đại từ biến đổi tùy thuộc vào vị trí và vai trò ngữ pháp của danh từ trong câu:
            <strong> Nominativ</strong> (Chủ ngữ), <strong>Akkusativ</strong> (Tân ngữ trực tiếp),
            <strong> Dativ</strong> (Tân ngữ gián tiếp/người nhận) và <strong>Genitiv</strong> (Sở hữu).
          </p>
        </div>

        {/* Sub-tab navigation */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('articles')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'articles'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Mạo từ &amp; Biến cách
          </button>
          <button
            onClick={() => setActiveSubTab('pronouns')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'pronouns'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Đại từ nhân xưng &amp; Sở hữu
          </button>
          <button
            onClick={() => setActiveSubTab('prepositions')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'prepositions'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Giới từ (Akk, Dat, 2 cách)
          </button>
          <button
            onClick={() => setActiveSubTab('verbs_cases')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'verbs_cases'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Động từ đi với Akk &amp; Dat
          </button>
          <button
            onClick={() => setActiveSubTab('modal_verbs')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === 'modal_verbs'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Modalverben (Chia 6 ngôi)
          </button>
        </div>
      </div>

      {/* Interactive Case Simulator Sandbox */}
      <div className="bg-linear-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block">
              Mô hình tương tác trực quan
            </span>
            <h3 className="text-lg font-bold">Thử nghiệm biến cách danh từ trong câu</h3>
          </div>
          <span className="text-xs text-slate-300">
            Chọn danh từ và cách để thấy mạo từ biến đổi
          </span>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Word Selector */}
          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">
              1. Chọn danh từ đại diện:
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setInteractiveWord('mann')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  interactiveWord === 'mann'
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                r Mann (đực)
              </button>
              <button
                onClick={() => setInteractiveWord('frau')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  interactiveWord === 'frau'
                    ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                e Frau (cái)
              </button>
              <button
                onClick={() => setInteractiveWord('kind')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  interactiveWord === 'kind'
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                s Kind (trung)
              </button>
            </div>
          </div>

          {/* Case Selector */}
          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">
              2. Chọn cách (Kasus):
            </label>
            <div className="flex items-center gap-1.5">
              {[
                { key: 'nom', label: 'Nom (Chủ ngữ)' },
                { key: 'akk', label: 'Akk (Tân ngữ TT)' },
                { key: 'dat', label: 'Dat (Tân ngữ GT)' },
                { key: 'gen', label: 'Gen (Sở hữu)' },
              ].map((c) => (
                <button
                  key={c.key}
                  onClick={() => setInteractiveCase(c.key as any)}
                  className={`flex-1 py-2 px-2 text-center rounded-lg text-xs font-bold transition-all ${
                    interactiveCase === c.key
                      ? 'bg-amber-500 text-slate-950 shadow-md scale-102'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {c.key.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Result Output */}
        <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs text-slate-400">
              Mạo từ tương ứng:{' '}
              <span className="text-amber-400 font-bold text-sm underline uppercase">
                {currentInteractive.article}
              </span>
            </span>
            <button
              onClick={() => speakGerman(currentInteractive.phrase)}
              className="p-1.5 rounded-full bg-slate-700 hover:bg-blue-600 text-slate-200 hover:text-white transition-colors"
              title="Nghe câu này"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-base sm:text-lg font-semibold text-white tracking-tight">
            {currentInteractive.phrase}
          </p>
          <p className="text-xs text-slate-300 mt-1 italic">
            → {currentInteractive.vi}
          </p>
        </div>
      </div>

      {/* Tab 1: Articles Declension Matrix */}
      {activeSubTab === 'articles' && (
        <div className="space-y-6">
          {/* Article type selector */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setArticleType('definite')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                articleType === 'definite' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              4.1 Mạo từ xác định (der, die, das)
            </button>
            <button
              onClick={() => setArticleType('indefinite')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                articleType === 'indefinite' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              4.2 Mạo từ không xác định (ein, eine)
            </button>
            <button
              onClick={() => setArticleType('negative')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                articleType === 'negative' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              4.3 Phủ định với kein
            </button>
          </div>

          {/* Matrix Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-xs">
                  <tr>
                    <th className="py-3.5 px-4">Cách (Kasus)</th>
                    <th className="py-3.5 px-4 text-blue-700">Giống đực (Maskulin)</th>
                    <th className="py-3.5 px-4 text-rose-700">Giống cái (Feminin)</th>
                    <th className="py-3.5 px-4 text-emerald-700">Giống trung (Neutral)</th>
                    <th className="py-3.5 px-4 text-slate-800">Số nhiều (Plural)</th>
                    <th className="py-3.5 px-4">Ví dụ thực tế</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {articleType === 'definite' &&
                    DEFINITE_ARTICLES.map((row) => (
                      <tr key={row.caseName} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {row.fullName} ({row.caseName})
                          <span className="block text-[10px] text-slate-400 font-normal">{row.role}</span>
                        </td>
                        <td className="py-3 px-4 font-bold text-blue-800 text-sm">{row.masculine}</td>
                        <td className="py-3 px-4 font-bold text-rose-800 text-sm">{row.feminine}</td>
                        <td className="py-3 px-4 font-bold text-emerald-800 text-sm">{row.neuter}</td>
                        <td className="py-3 px-4 font-bold text-slate-800 text-sm">{row.plural}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-between gap-1">
                            <div>
                              <span className="font-semibold text-slate-900 block">{row.example}</span>
                              <span className="text-[11px] text-slate-500 italic">{row.exampleVi}</span>
                            </div>
                            <button
                              onClick={() => speakGerman(row.example)}
                              className="p-1 rounded-full text-slate-400 hover:text-blue-600"
                              title="Nghe"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                  {articleType === 'indefinite' &&
                    INDEFINITE_ARTICLES.map((row) => (
                      <tr key={row.caseName} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">{row.caseName}</td>
                        <td className="py-3 px-4 font-bold text-blue-800 text-sm">{row.masculine}</td>
                        <td className="py-3 px-4 font-bold text-rose-800 text-sm">{row.feminine}</td>
                        <td className="py-3 px-4 font-bold text-emerald-800 text-sm">{row.neuter}</td>
                        <td className="py-3 px-4 text-slate-400">{row.plural}</td>
                        <td className="py-3 px-4 text-slate-600">
                          {row.caseName === 'Nom' && 'ein Mann / eine Frau / ein Kind'}
                          {row.caseName === 'Akk' && 'Ich sehe einen Mann / eine Frau / ein Kind.'}
                          {row.caseName === 'Dat' && 'Ich helfe einem Mann / einer Frau / einem Kind.'}
                          {row.caseName === 'Gen' && 'Das Auto eines Mannes / einer Frau.'}
                        </td>
                      </tr>
                    ))}

                  {articleType === 'negative' &&
                    NEGATIVE_ARTICLES.map((row) => (
                      <tr key={row.caseName} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">{row.caseName}</td>
                        <td className="py-3 px-4 font-bold text-blue-800 text-sm">{row.masculine}</td>
                        <td className="py-3 px-4 font-bold text-rose-800 text-sm">{row.feminine}</td>
                        <td className="py-3 px-4 font-bold text-emerald-800 text-sm">{row.neuter}</td>
                        <td className="py-3 px-4 font-bold text-slate-800 text-sm">{row.plural}</td>
                        <td className="py-3 px-4 text-slate-600">
                          {row.caseName === 'Nom' && 'kein Mann / keine Frau / kein Kind'}
                          {row.caseName === 'Akk' && 'Ich habe keinen Bruder / keine Schwester.'}
                          {row.caseName === 'Dat' && 'Ich antworte keinem Mann.'}
                          {row.caseName === 'Gen' && 'Das Auto keines Mannes.'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Crucial Tip Callout */}
            <div className="p-4 bg-amber-50/70 border-t border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold">
                Mẹo vàng ghi nhớ Akkusativ và Dativ:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-800">
                <li>Ở <strong>Akkusativ</strong>: CHỈ CÓ GIỐNG ĐỰC thay đổi từ <code className="bg-amber-100 px-1 py-0.2 rounded font-bold">der → den</code> (hoặc ein → einen, kein → keinen). Giống cái (die), giống trung (das) và số nhiều (die) GIỮ NGUYÊN!</li>
                <li>Ở <strong>Dativ</strong>: Giống đực &amp; giống trung đổi thành <code className="bg-amber-100 px-1 py-0.2 rounded font-bold">dem</code> (hoặc einem). Giống cái đổi thành <code className="bg-amber-100 px-1 py-0.2 rounded font-bold">der</code> (hoặc einer). Số nhiều thành <code className="bg-amber-100 px-1 py-0.2 rounded font-bold">den + danh từ thêm đuôi -n</code> (trừ khi danh từ đã kết thúc bằng -n hoặc -s).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Pronouns Matrix */}
      {activeSubTab === 'pronouns' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              4.4 Bảng đại từ nhân xưng theo các cách (Personalpronomen)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Đại từ nhân xưng thay thế cho danh từ và biến đổi trực tiếp khi giữ vai trò tân ngữ Akkusativ hoặc Dativ trong câu.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Ngôi xưng</th>
                    <th className="py-2.5 px-3">Nominativ (Chủ ngữ)</th>
                    <th className="py-2.5 px-3 text-blue-700">Akkusativ (Tân ngữ TT)</th>
                    <th className="py-2.5 px-3 text-rose-700">Dativ (Tân ngữ GT)</th>
                    <th className="py-2.5 px-3">Câu ví dụ minh họa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PERSONAL_PRONOUNS.map((item) => (
                    <tr key={item.person} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{item.person}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900 text-sm">{item.nom}</td>
                      <td className="py-2.5 px-3 font-bold text-blue-700 text-sm">{item.akk}</td>
                      <td className="py-2.5 px-3 font-bold text-rose-700 text-sm">{item.dat}</td>
                      <td className="py-2.5 px-3 text-slate-600">{item.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Possessive Pronouns Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              7.2 Bảng đại từ sở hữu (Possessivpronomen)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Đại từ sở hữu thêm đuôi tương tự như mạo từ không xác định <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">ein</code>.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Chủ sở hữu</th>
                    <th className="py-2.5 px-3">Gốc</th>
                    <th className="py-2.5 px-3 text-blue-700">Đực (Nom)</th>
                    <th className="py-2.5 px-3 text-rose-700">Cái (Nom)</th>
                    <th className="py-2.5 px-3 text-emerald-700">Trung (Nom)</th>
                    <th className="py-2.5 px-3 text-slate-900">Số nhiều (Nom)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {POSSESSIVE_PRONOUNS.map((item) => (
                    <tr key={item.owner} className="hover:bg-slate-50/70">
                      <td className="py-2 px-3 font-medium text-slate-800">{item.owner}</td>
                      <td className="py-2 px-3 font-bold text-slate-900">{item.base}</td>
                      <td className="py-2 px-3 text-blue-800 font-medium">{item.m_nom}</td>
                      <td className="py-2 px-3 text-rose-800 font-medium">{item.f_nom}</td>
                      <td className="py-2 px-3 text-emerald-800 font-medium">{item.n_nom}</td>
                      <td className="py-2 px-3 text-slate-900 font-medium">{item.pl_nom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Prepositions */}
      {activeSubTab === 'prepositions' && (
        <div className="space-y-6">
          {/* Interactive Wechselpräpositionen Simulator */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  Quy tắc quan trọng nhất
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  Giới từ 2 cách (Wechselpräpositionen)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  9 giới từ có thể đi với Akkusativ hoặc Dativ: <em>an, auf, hinter, in, neben, über, unter, vor, zwischen</em>.
                </p>
              </div>

              {/* Wo vs Wohin Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setWechselQuestion('wo')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    wechselQuestion === 'wo'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Wo? (Ở đâu? → DATIV)
                </button>
                <button
                  onClick={() => setWechselQuestion('wohin')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    wechselQuestion === 'wohin'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Wohin? (Đi đâu? → AKKUSATIV)
                </button>
              </div>
            </div>

            {/* Simulator Explanation Card */}
            <div className={`p-4 rounded-xl border transition-colors ${
              wechselQuestion === 'wo' ? 'bg-rose-50/70 border-rose-200 text-rose-950' : 'bg-blue-50/70 border-blue-200 text-blue-950'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg text-white font-bold text-xs shrink-0 ${
                  wechselQuestion === 'wo' ? 'bg-rose-600' : 'bg-blue-600'
                }`}>
                  {wechselQuestion === 'wo' ? 'DATIV' : 'AKKUSATIV'}
                </div>
                <div>
                  <h4 className="font-bold text-sm">
                    {wechselQuestion === 'wo'
                      ? 'Câu hỏi: Wo? (Ở đâu?) — Vị trí cố định, tĩnh, không chuyển dịch vị trí mới.'
                      : 'Câu hỏi: Wohin? (Đi đâu?) — Hướng di chuyển, đích đến, thay đổi vị trí.'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-slate-200/80">
                      <span className="font-semibold block text-slate-900">
                        {wechselQuestion === 'wo' ? 'Ich bin in der Schule.' : 'Ich gehe in die Schule.'}
                      </span>
                      <span className="text-slate-500 italic block mt-0.5">
                        {wechselQuestion === 'wo' ? 'Tôi đang ở trong trường học (Dativ: der Schule).' : 'Tôi đi vào trường học (Akkusativ: die Schule).'}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200/80">
                      <span className="font-semibold block text-slate-900">
                        {wechselQuestion === 'wo' ? 'Das Buch liegt auf dem Tisch.' : 'Ich lege das Buch auf den Tisch.'}
                      </span>
                      <span className="text-slate-500 italic block mt-0.5">
                        {wechselQuestion === 'wo' ? 'Quyển sách nằm trên bàn (Dativ: dem Tisch).' : 'Tôi đặt quyển sách lên bàn (Akkusativ: den Tisch).'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full Preposition list */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              4.6 Danh mục giới từ quan trọng theo cách trong tiếng Đức
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Akkusativ Prepositions */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
                <span className="font-bold text-blue-900 text-sm block mb-1">
                  Luôn đi với Akkusativ (DOGFU)
                </span>
                <span className="text-blue-700 text-[11px] block mb-3">
                  durch, für, gegen, ohne, um
                </span>
                <div className="space-y-2">
                  {PREPOSITIONS_DATA.filter((p) => p.caseType === 'Akkusativ').map((p) => (
                    <div key={p.prep} className="bg-white p-2.5 rounded-lg border border-blue-100">
                      <div className="flex items-center justify-between">
                        <strong className="text-blue-900 font-bold text-sm">{p.prep}</strong>
                        <span className="text-slate-500">{p.meaning}</span>
                      </div>
                      <p className="text-slate-700 mt-1 font-medium">{p.example}</p>
                      <p className="text-slate-400 text-[11px] italic">{p.exampleVi}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dativ Prepositions */}
              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200">
                <span className="font-bold text-rose-900 text-sm block mb-1">
                  Luôn đi với Dativ
                </span>
                <span className="text-rose-700 text-[11px] block mb-3">
                  aus, bei, mit, nach, seit, von, zu, gegenüber
                </span>
                <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                  {PREPOSITIONS_DATA.filter((p) => p.caseType === 'Dativ').map((p) => (
                    <div key={p.prep} className="bg-white p-2.5 rounded-lg border border-rose-100">
                      <div className="flex items-center justify-between">
                        <strong className="text-rose-900 font-bold text-sm">{p.prep}</strong>
                        <span className="text-slate-500">{p.meaning}</span>
                      </div>
                      <p className="text-slate-700 mt-1 font-medium">{p.example}</p>
                      <p className="text-slate-400 text-[11px] italic">{p.exampleVi}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wechselpräpositionen */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <span className="font-bold text-emerald-900 text-sm block mb-1">
                  Giới từ 2 cách (Wechsel)
                </span>
                <span className="text-emerald-700 text-[11px] block mb-3">
                  an, auf, hinter, in, neben, über, unter, vor, zwischen
                </span>
                <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                  {PREPOSITIONS_DATA.filter((p) => p.caseType.includes('Wechsel')).map((p) => (
                    <div key={p.prep} className="bg-white p-2.5 rounded-lg border border-emerald-100">
                      <div className="flex items-center justify-between">
                        <strong className="text-emerald-900 font-bold text-sm">{p.prep}</strong>
                        <span className="text-slate-500">{p.meaning}</span>
                      </div>
                      <p className="text-slate-700 mt-1 font-medium">{p.example}</p>
                      <p className="text-slate-400 text-[11px] italic">{p.exampleVi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Verbs with Akk & Dat */}
      {activeSubTab === 'verbs_cases' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900">
            4.5 Phân loại động từ theo cách (Akkusativ, Dativ &amp; Cả hai)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Akk verbs */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-blue-700 text-sm block mb-2">
                Động từ đi với Akkusativ
              </span>
              <p className="text-slate-500 mb-3">
                Chiếm đa số động từ trong tiếng Đức. Tân ngữ là người/vật chịu tác động trực tiếp.
              </p>
              <div className="space-y-2">
                {[
                  { verb: 'haben (có)', ex: 'Ich habe einen Bruder.' },
                  { verb: 'sehen (nhìn thấy)', ex: 'Ich sehe den Mann.' },
                  { verb: 'kaufen (mua)', ex: 'Ich kaufe einen Apfel.' },
                  { verb: 'brauchen (cần)', ex: 'Ich brauche einen Stift.' },
                  { verb: 'suchen (tìm kiếm)', ex: 'Ich suche meinen Schlüssel.' },
                  { verb: 'essen (ăn)', ex: 'Ich esse einen Apfel.' },
                  { verb: 'trinken (uống)', ex: 'Ich trinke einen Kaffee.' },
                  { verb: 'lesen (đọc)', ex: 'Ich lese das Buch.' },
                ].map((v) => (
                  <div key={v.verb} className="bg-white p-2 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">{v.verb}</strong>
                    <span className="text-slate-500 block text-[11px] mt-0.5">{v.ex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dat verbs */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-rose-700 text-sm block mb-2">
                Động từ đi với Dativ (Đặc biệt)
              </span>
              <p className="text-slate-500 mb-3">
                Số lượng ít hơn nhưng rất hay gặp trong các bài thi A1. Bắt buộc phải học thuộc.
              </p>
              <div className="space-y-2">
                {[
                  { verb: 'helfen (giúp đỡ)', ex: 'Ich helfe dir / dem Kind.' },
                  { verb: 'danken (cảm ơn)', ex: 'Ich danke Ihnen.' },
                  { verb: 'gefallen (làm ai thích)', ex: 'Das Buch gefällt mir.' },
                  { verb: 'gehören (thuộc về)', ex: 'Das Auto gehört mir.' },
                  { verb: 'antworten (trả lời)', ex: 'Ich antworte dem Lehrer.' },
                  { verb: 'passen (vừa vặn)', ex: 'Die Jacke passt mir gut.' },
                  { verb: 'schmecken (hợp khẩu vị)', ex: 'Die Pizza schmeckt mir.' },
                  { verb: 'fehlen (thiếu)', ex: 'Du fehlst mir.' },
                ].map((v) => (
                  <div key={v.verb} className="bg-white p-2 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">{v.verb}</strong>
                    <span className="text-slate-500 block text-[11px] mt-0.5">{v.ex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Akk + Dat verbs */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-emerald-700 text-sm block mb-2">
                Động từ có cả Akk và Dat
              </span>
              <p className="text-slate-500 mb-3">
                Cấu trúc: <strong>jemandem (Dat - Người nhận) + etwas (Akk - Vật được trao)</strong>.
              </p>
              <div className="space-y-2">
                {[
                  {
                    verb: 'geben (đưa cho)',
                    structure: 'jemandem etwas geben',
                    ex: 'Ich gebe dem Kind (Dat) einen Apfel (Akk).',
                  },
                  {
                    verb: 'zeigen (chỉ cho xem)',
                    structure: 'jemandem etwas zeigen',
                    ex: 'Ich zeige dir (Dat) das Buch (Akk).',
                  },
                  {
                    verb: 'schenken (tặng quà)',
                    structure: 'jemandem etwas schenken',
                    ex: 'Ich schenke meiner Mutter Blumen.',
                  },
                  {
                    verb: 'schicken (gửi)',
                    structure: 'jemandem etwas schicken',
                    ex: 'Ich schicke meinem Freund eine Nachricht.',
                  },
                  {
                    verb: 'erklären (giải thích)',
                    structure: 'jemandem etwas erklären',
                    ex: 'Der Lehrer erklärt den Schülern die Grammatik.',
                  },
                ].map((v) => (
                  <div key={v.verb} className="bg-white p-2 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">{v.verb}</strong>
                    <span className="text-[10px] text-emerald-700 font-mono block">{v.structure}</span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">{v.ex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Modalverben Full Conjugation */}
      {activeSubTab === 'modal_verbs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              5.6 Bảng chia đầy đủ 6 ngôi
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">
              Toàn bộ động từ khuyết thiếu (Modalverben) trong tiếng Đức A1
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Quy tắc vàng: Ngôi <strong>ich</strong> và ngôi <strong>er / sie / es</strong> luôn có dạng chia GIỐNG HỆT NHAU và KHÔNG CÓ ĐUÔI!
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Động từ &amp; Ý nghĩa</th>
                  <th className="py-3 px-3 text-blue-700">ich</th>
                  <th className="py-3 px-3 text-blue-700">du</th>
                  <th className="py-3 px-3 text-blue-700">er / sie / es</th>
                  <th className="py-3 px-3">wir</th>
                  <th className="py-3 px-3">ihr</th>
                  <th className="py-3 px-3">sie / Sie</th>
                  <th className="py-3 px-3">Ví dụ thực tế kèm âm thanh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MODAL_VERBS_CONJUGATION.map((m) => (
                  <tr key={m.verb} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3">
                      <strong className="text-slate-900 font-bold text-sm block">{m.verb}</strong>
                      <span className="text-[11px] text-slate-500">{m.meaning}</span>
                    </td>
                    <td className="py-3 px-3 font-bold text-blue-800 text-sm bg-blue-50/30">{m.ich}</td>
                    <td className="py-3 px-3 font-bold text-blue-800 text-sm bg-blue-50/30">{m.du}</td>
                    <td className="py-3 px-3 font-bold text-blue-800 text-sm bg-blue-50/30">{m.erSieEs}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{m.wir}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{m.ihr}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{m.sieSie}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-between gap-1.5 max-w-xs">
                        <div>
                          <span className="font-semibold text-slate-900 block leading-tight">{m.example}</span>
                          <span className="text-[11px] text-slate-500 italic block mt-0.5">{m.exampleVi}</span>
                        </div>
                        <button
                          onClick={() => speakGerman(m.example)}
                          className="p-1 rounded-full text-slate-400 hover:text-blue-600 hover:bg-white shrink-0"
                          title="Nghe câu"
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

          {/* Grammar Note */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            <strong>Cấu trúc khung câu (Satzklammer):</strong> Trong câu chính, Modalverb đã chia đứng ở vị trí thứ 2,
            động từ chính luôn ở dạng nguyên thể (Infinitiv) và bị đẩy về <strong>vị trí cuối cùng trong câu</strong>!
            Ví dụ: <em>Ich <strong>kann</strong> heute Abend leider nicht <strong>kommen</strong>.</em>
          </div>
        </div>
      )}
    </div>
  );
};
