import React, { useState, useMemo } from 'react';
import { VocabularyItem, CategoryKey, Gender, PartOfSpeech, CEFRLevel } from '../types';
import { CATEGORIES } from '../data/categories';
import { formatGermanDisplay, getPluralNotation } from '../utils/formatWord';
import { speakGerman } from '../utils/speech';
import {
  verifyAdminPassword,
  isAdminAuthenticated,
  ADMIN_PASSWORD,
} from '../utils/vocabularyStorage';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  Plus,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWord: (word: VocabularyItem) => void;
}

export const AddWordModal: React.FC<AddWordModalProps> = ({ isOpen, onClose, onAddWord }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Word Form Fields
  const [word, setWord] = useState('');
  const [article, setArticle] = useState<'der' | 'die' | 'das' | 'none'>('der');
  const [partOfSpeech, setPartOfSpeech] = useState<PartOfSpeech>('noun');
  const [category, setCategory] = useState<CategoryKey>('professions');
  const [level, setLevel] = useState<CEFRLevel>('A1.1');
  const [vietnamese, setVietnamese] = useState('');
  const [plural, setPlural] = useState('');
  const [hasNoPlural, setHasNoPlural] = useState(false);
  const [pluralRule, setPluralRule] = useState('');
  const [example, setExample] = useState('');
  const [exampleVi, setExampleVi] = useState('');
  const [example2, setExample2] = useState('');
  const [example2Vi, setExample2Vi] = useState('');
  const [notes, setNotes] = useState('');

  // Verb specific
  const [hilfsverb, setHilfsverb] = useState<'haben' | 'sein'>('haben');
  const [pastPerfekt, setPastPerfekt] = useState('');

  const [formError, setFormError] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  // Computed gender
  const computedGender: Gender = useMemo(() => {
    if (partOfSpeech !== 'noun') return 'none';
    if (article === 'der') return 'masculine';
    if (article === 'die') return 'feminine';
    if (article === 'das') return 'neuter';
    return 'none';
  }, [partOfSpeech, article]);

  // Computed german shorthand
  const computedGerman = useMemo(() => {
    const trimmed = word.trim();
    if (!trimmed) return '';
    if (partOfSpeech === 'noun') {
      if (article === 'der') return `r ${trimmed}`;
      if (article === 'die') return `e ${trimmed}`;
      if (article === 'das') return `s ${trimmed}`;
      return trimmed;
    }
    return trimmed;
  }, [word, article, partOfSpeech]);

  // Computed full display with plural notation
  const computedDisplay = useMemo(() => {
    if (!computedGerman) return '';
    if (partOfSpeech !== 'noun') return computedGerman;
    const finalPlural = hasNoPlural ? '—' : plural;
    const notation = getPluralNotation(word.trim(), finalPlural, computedGender);
    return `${computedGerman}, ${notation}`;
  }, [computedGerman, partOfSpeech, hasNoPlural, plural, word, computedGender]);

  if (!isOpen) return null;

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPassword(passwordInput.trim())) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Mật khẩu quản trị viên không chính xác. Vui lòng thử lại.');
    }
  };

  const handleSubmitWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) {
      setFormError('Vui lòng nhập từ tiếng Đức.');
      return;
    }
    if (!vietnamese.trim()) {
      setFormError('Vui lòng nhập nghĩa tiếng Việt.');
      return;
    }
    if (!example.trim()) {
      setFormError('Vui lòng nhập ít nhất một câu ví dụ mẫu tiếng Đức.');
      return;
    }

    setFormError('');

    const cleanWord = word.trim();
    const finalPlural = hasNoPlural ? '— (không có số nhiều)' : plural.trim();

    const newVocabularyItem: VocabularyItem = {
      id: `custom_${Date.now()}_${cleanWord.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      german: computedGerman,
      word: cleanWord,
      article: partOfSpeech === 'noun' && article !== 'none' ? article : undefined,
      gender: computedGender,
      vietnamese: vietnamese.trim(),
      partOfSpeech,
      category,
      level,
      plural: partOfSpeech === 'noun' ? finalPlural : undefined,
      pluralRule: pluralRule.trim() || undefined,
      example: example.trim(),
      exampleVi: exampleVi.trim() || 'Ví dụ minh họa ngữ cảnh.',
      example2: example2.trim() || undefined,
      example2Vi: example2Vi.trim() || undefined,
      notes: notes.trim() || undefined,
      conjugation:
        partOfSpeech === 'verb' && pastPerfekt
          ? {
              ich: '',
              du: '',
              erSieEs: '',
              wir: '',
              ihr: '',
              sieSie: '',
              hilfsverb,
              pastPerfekt: pastPerfekt.trim(),
            }
          : undefined,
    };

    onAddWord(newVocabularyItem);
    setSuccessToast(true);

    // Reset fields after successful addition
    setTimeout(() => {
      setSuccessToast(false);
      setWord('');
      setVietnamese('');
      setPlural('');
      setExample('');
      setExampleVi('');
      setExample2('');
      setExample2Vi('');
      setNotes('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Thêm từ vựng mới</h3>
              <p className="text-[11px] text-slate-400">
                Chức năng dành riêng cho quản trị viên (Admin)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isAuthenticated ? (
            /* Admin Password Prompt */
            <form onSubmit={handleVerifyPassword} className="space-y-4 max-w-md mx-auto py-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Xác thực quyền Quản trị viên</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Để đảm bảo chất lượng cơ sở dữ liệu từ vựng, tính năng thêm từ yêu cầu mật khẩu bảo vệ.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mật khẩu Admin:
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setAuthError('');
                    }}
                    placeholder="Nhập mật khẩu admin..."
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Xác nhận mở khóa
                </button>
              </div>
            </form>
          ) : (
            /* Word Form */
            <form onSubmit={handleSubmitWord} className="space-y-4">
              {/* Admin status pill */}
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2 text-xs text-emerald-800">
                <div className="flex items-center gap-1.5 font-medium">
                  <Unlock className="w-4 h-4 text-emerald-600" />
                  <span>Quản trị viên đã xác thực quyền thành công</span>
                </div>
                <span className="text-[10px] bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                  Admin Mode
                </span>
              </div>

              {/* Live Preview Box */}
              <div className="p-3.5 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                    Định dạng chuẩn hiển thị:
                  </span>
                  <div className="text-lg font-bold font-mono text-white mt-0.5 flex items-center gap-2">
                    <span>{computedDisplay || 'Chưa nhập từ...'}</span>
                    {vietnamese && (
                      <span className="text-xs text-slate-300 font-sans font-normal">
                        ({vietnamese})
                      </span>
                    )}
                  </div>
                </div>

                {word.trim() && (
                  <button
                    type="button"
                    onClick={() => speakGerman(word.trim())}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 text-white transition-colors"
                    title="Nghe phát âm thử"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Grid 1: Level, Category, Part of Speech */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Cấp độ (CEFR):
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as CEFRLevel)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option value="A1.1">A1.1 (Cơ bản nhập môn)</option>
                    <option value="A1.2">A1.2 (Cơ bản mở rộng)</option>
                    <option value="A2.1">A2.1 (Sơ trung cấp 1)</option>
                    <option value="A2.2">A2.2 (Sơ trung cấp 2)</option>
                    <option value="B1.1">B1.1 (Trung cấp 1)</option>
                    <option value="B1.2">B1.2 (Trung cấp 2)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Chủ đề (Danh mục):
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryKey)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    {CATEGORIES.filter((c) => c.key !== 'all').map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Từ loại:
                  </label>
                  <select
                    value={partOfSpeech}
                    onChange={(e) => setPartOfSpeech(e.target.value as PartOfSpeech)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option value="noun">Danh từ (Noun)</option>
                    <option value="verb">Động từ (Verb)</option>
                    <option value="adjective">Tính từ (Adjektiv)</option>
                    <option value="adverb">Trạng từ (Adverb)</option>
                    <option value="preposition">Giới từ (Präposition)</option>
                    <option value="conjunction">Liên từ (Konjunktion)</option>
                    <option value="question">Từ để hỏi (Fragewort)</option>
                  </select>
                </div>
              </div>

              {/* Noun specific: Article & Word */}
              {partOfSpeech === 'noun' ? (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mạo từ:
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        type="button"
                        onClick={() => setArticle('der')}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          article === 'der'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        der (r)
                      </button>
                      <button
                        type="button"
                        onClick={() => setArticle('die')}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          article === 'die'
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        die (e)
                      </button>
                      <button
                        type="button"
                        onClick={() => setArticle('das')}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          article === 'das'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        das (s)
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-8">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Từ tiếng Đức (viết hoa chữ cái đầu):
                    </label>
                    <input
                      type="text"
                      value={word}
                      onChange={(e) => setWord(e.target.value)}
                      placeholder="Ví dụ: Mann, Schule, Buch..."
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 font-semibold"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Từ tiếng Đức:
                  </label>
                  <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Ví dụ: trinken, fleißig, gestern..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 font-semibold"
                    required
                  />
                </div>
              )}

              {/* Noun Plural Options */}
              {partOfSpeech === 'noun' && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Dạng số nhiều (Plural):
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={hasNoPlural}
                        onChange={(e) => setHasNoPlural(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Không có số nhiều (quy ước: <strong>-Sg</strong>)</span>
                    </label>
                  </div>

                  {!hasNoPlural && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={plural}
                        onChange={(e) => setPlural(e.target.value)}
                        placeholder="Ví dụ: Männer, Frauen, Kinder..."
                        className="p-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                      <input
                        type="text"
                        value={pluralRule}
                        onChange={(e) => setPluralRule(e.target.value)}
                        placeholder="Quy tắc (ví dụ: Thêm -er + biến âm ä)"
                        className="p-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Verb specific: Hilfsverb & Perfekt */}
              {partOfSpeech === 'verb' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Trợ động từ quá khứ (Perfekt):
                    </label>
                    <select
                      value={hilfsverb}
                      onChange={(e) => setHilfsverb(e.target.value as 'haben' | 'sein')}
                      className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold"
                    >
                      <option value="haben">haben (đa số động từ)</option>
                      <option value="sein">sein (chuyển động, thay đổi trạng thái)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Dạng Partizip II:
                    </label>
                    <input
                      type="text"
                      value={pastPerfekt}
                      onChange={(e) => setPastPerfekt(e.target.value)}
                      placeholder="Ví dụ: hat getrunken, ist gefahren..."
                      className="w-full p-2 rounded-lg border border-slate-300 text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Vietnamese Meaning */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nghĩa tiếng Việt:
                </label>
                <input
                  type="text"
                  value={vietnamese}
                  onChange={(e) => setVietnamese(e.target.value)}
                  placeholder="Ví dụ: người đàn ông, chồng"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

              {/* Example Sentences */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Ví dụ câu tiếng Đức &amp; Bản dịch:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={example}
                    onChange={(e) => setExample(e.target.value)}
                    placeholder="Ví dụ tiếng Đức: Der Mann arbeitet heute."
                    className="p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                    required
                  />
                  <input
                    type="text"
                    value={exampleVi}
                    onChange={(e) => setExampleVi(e.target.value)}
                    placeholder="Nghĩa tiếng Việt: Người đàn ông hôm nay làm việc."
                    className="p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Optional Ghi chú */}
              <div>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ghi chú ngữ pháp bổ sung (tùy chọn): ví dụ: Đi với Akkusativ, động từ tách..."
                  className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-600 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {successToast && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-bold animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã lưu thành công từ vựng mới vào cơ sở dữ liệu!</span>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs transition-colors"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={successToast}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Lưu từ vựng</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
