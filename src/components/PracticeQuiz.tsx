import React, { useState, useEffect } from 'react';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { speakGerman } from '../utils/speech';
import { CheckCircle2, XCircle, RotateCcw, Volume2, Award, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  questionText: string;
  subText?: string;
  germanToSpeak?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const PracticeQuiz: React.FC<{ speechRate: number }> = ({ speechRate }) => {
  const [quizType, setQuizType] = useState<'article' | 'meaning' | 'case'>('article');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Generate 10 randomized questions based on quiz type
  const generateQuestions = (type: 'article' | 'meaning' | 'case') => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);

    let generated: Question[] = [];

    if (type === 'article') {
      // Pick 10 nouns that have articles
      const nouns = VOCABULARY_LIST.filter((item) => item.article).sort(() => 0.5 - Math.random()).slice(0, 10);
      generated = nouns.map((item) => ({
        id: item.id,
        questionText: `Chọn mạo từ đúng cho danh từ:`,
        subText: item.word,
        germanToSpeak: item.german,
        options: ['der', 'die', 'das'],
        correctAnswer: item.article!,
        explanation: `${item.german} (${item.vietnamese}) - Số nhiều: ${item.plural || '—'}`,
      }));
    } else if (type === 'meaning') {
      // Pick 10 random words
      const words = [...VOCABULARY_LIST].sort(() => 0.5 - Math.random()).slice(0, 10);
      generated = words.map((item) => {
        // 3 wrong distractors
        const distractors = VOCABULARY_LIST.filter((w) => w.id !== item.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((w) => w.vietnamese);
        const options = [...distractors, item.vietnamese].sort(() => 0.5 - Math.random());

        return {
          id: item.id,
          questionText: `Nghĩa tiếng Việt của từ:`,
          subText: item.german,
          germanToSpeak: item.german,
          options,
          correctAnswer: item.vietnamese,
          explanation: `${item.german} có nghĩa là: "${item.vietnamese}". Ví dụ: ${item.example}`,
        };
      });
    } else {
      // Case fill-in-the-blank
      const caseQuestions: Question[] = [
        {
          id: 'c1',
          questionText: 'Điền mạo từ thích hợp vào chỗ trống:',
          subText: 'Ich sehe ______ Mann an der Haltestelle. (sehen + Akkusativ giống đực)',
          germanToSpeak: 'Ich sehe den Mann an der Haltestelle.',
          options: ['der', 'den', 'dem', 'des'],
          correctAnswer: 'den',
          explanation: 'Động từ "sehen" đòi hỏi tân ngữ Akkusativ. Giống đực "der Mann" biến thành "den Mann".',
        },
        {
          id: 'c2',
          questionText: 'Điền mạo từ thích hợp vào chỗ trống:',
          subText: 'Ich helfe ______ Frau beim Kochen. (helfen + Dativ giống cái)',
          germanToSpeak: 'Ich helfe der Frau beim Kochen.',
          options: ['die', 'den', 'der', 'dem'],
          correctAnswer: 'der',
          explanation: 'Động từ "helfen" đòi hỏi Dativ. Giống cái "die Frau" ở Dativ biến đổi thành "der Frau".',
        },
        {
          id: 'c3',
          questionText: 'Điền mạo từ thích hợp vào chỗ trống:',
          subText: 'Ich gebe ______ Kind einen roten Apfel. (geben + Dativ cho người nhận)',
          germanToSpeak: 'Ich gebe dem Kind einen roten Apfel.',
          options: ['das', 'den', 'dem', 'des'],
          correctAnswer: 'dem',
          explanation: 'Động từ "geben" đòi hỏi người nhận ở Dativ. Giống trung "das Kind" ở Dativ thành "dem Kind".',
        },
        {
          id: 'c4',
          questionText: 'Điền từ thích hợp vào chỗ trống:',
          subText: 'Ich habe ______ Auto. (Phủ định danh từ giống trung das Auto)',
          germanToSpeak: 'Ich habe kein Auto.',
          options: ['nicht', 'kein', 'keine', 'keinen'],
          correctAnswer: 'kein',
          explanation: 'Phủ định danh từ dùng "kein". Giống trung ở Akkusativ giữ nguyên dạng: kein Auto.',
        },
        {
          id: 'c5',
          questionText: 'Điền mạo từ thích hợp vào chỗ trống:',
          subText: 'Ich fahre mit ______ Bus zur Schule. (Giới từ mit + Dativ giống đực)',
          germanToSpeak: 'Ich fahre mit dem Bus zur Schule.',
          options: ['der', 'den', 'dem', 'des'],
          correctAnswer: 'dem',
          explanation: 'Giới từ "mit" luôn luôn đi kèm Dativ. "der Bus" biến đổi thành "dem Bus".',
        },
        {
          id: 'c6',
          questionText: 'Điền mạo từ thích hợp vào chỗ trống:',
          subText: 'Das Buch liegt auf ______ Tisch. (Wo? Ở trên bàn → Dativ)',
          germanToSpeak: 'Das Buch liegt auf dem Tisch.',
          options: ['der', 'den', 'dem', 'das'],
          correctAnswer: 'dem',
          explanation: 'Hỏi vị trí tĩnh (Wo?) với giới từ 2 cách "auf" đi với Dativ: auf dem Tisch.',
        },
        {
          id: 'c7',
          questionText: 'Điền mạo từ thích hợp vào chỗ trống:',
          subText: 'Ich lege das Buch auf ______ Tisch. (Wohin? Đặt lên bàn → Akkusativ)',
          germanToSpeak: 'Ich lege das Buch auf den Tisch.',
          options: ['der', 'den', 'dem', 'das'],
          correctAnswer: 'den',
          explanation: 'Hỏi chuyển động / hướng đến (Wohin?) với giới từ "auf" đi với Akkusativ: auf den Tisch.',
        },
        {
          id: 'c8',
          questionText: 'Điền từ thích hợp vào chỗ trống:',
          subText: 'Ich bleibe zu Hause, ______ ich krank bin. (Động từ bin ở cuối câu)',
          germanToSpeak: 'Ich bleibe zu Hause, weil ich krank bin.',
          options: ['denn', 'weil', 'aber', 'und'],
          correctAnswer: 'weil',
          explanation: 'Sau liên từ phụ thuộc "weil" (bởi vì), động từ đã chia bị đẩy về cuối câu ("bin").',
        },
        {
          id: 'c9',
          questionText: 'Điền mạo từ thích hợp vào chỗ trống:',
          subText: 'Das Geschenk ist für ______ Bruder. (Giới từ für + Akkusativ)',
          germanToSpeak: 'Das Geschenk ist für meinen Bruder.',
          options: ['mein', 'meinen', 'meinem', 'meiner'],
          correctAnswer: 'meinen',
          explanation: 'Giới từ "für" luôn đi với Akkusativ. Giống đực biến thành "meinen Bruder".',
        },
        {
          id: 'c10',
          questionText: 'Điền từ thích hợp vào chỗ trống:',
          subText: 'Ich muss heute um 6 Uhr ______. (Động từ tách aufstehen với Modalverb)',
          germanToSpeak: 'Ich muss heute um 6 Uhr aufstehen.',
          options: ['aufstehe', 'stehe auf', 'aufstehen', 'aufgestanden'],
          correctAnswer: 'aufstehen',
          explanation: 'Khi đi kèm Modalverb ("muss"), động từ tách giữ nguyên dạng nguyên thể ở cuối câu ("aufstehen").',
        },
      ];
      generated = caseQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
    }

    setQuestions(generated);
  };

  useEffect(() => {
    generateQuestions(quizType);
  }, [quizType]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQ.germanToSpeak) {
      speakGerman(currentQ.germanToSpeak, { rate: speechRate });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Type Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setQuizType('article')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              quizType === 'article' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Đoán mạo từ (der/die/das)
          </button>
          <button
            onClick={() => setQuizType('meaning')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              quizType === 'meaning' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Trắc nghiệm nghĩa từ
          </button>
          <button
            onClick={() => setQuizType('case')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              quizType === 'case' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Chia cách &amp; Giới từ
          </button>
        </div>

        <button
          onClick={() => generateQuestions(quizType)}
          className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          title="Làm lại đề mới"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Làm đề mới</span>
        </button>
      </div>

      {!isFinished && currentQ ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
          {/* Header row: progress and score */}
          <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-100">
            <span>
              Câu hỏi <strong className="text-slate-900 font-mono-numbers">{currentIndex + 1}</strong> / {questions.length}
            </span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              Điểm: {score} / {currentIndex + (isAnswered ? 1 : 0)}
            </span>
          </div>

          {/* Question text */}
          <div className="text-center py-4">
            <p className="text-sm font-semibold text-slate-500 mb-2">
              {currentQ.questionText}
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
              <span>{currentQ.subText}</span>
              {currentQ.germanToSpeak && (
                <button
                  type="button"
                  onClick={() => speakGerman(currentQ.germanToSpeak!, { rate: speechRate })}
                  className="p-1.5 rounded-full text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQ.correctAnswer;

              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-600 border-emerald-600 text-white font-bold ring-2 ring-emerald-300';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-600 border-rose-600 text-white font-bold ring-2 ring-rose-300';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl border text-sm font-semibold text-left transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                {selectedOption === currentQ.correctAnswer ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Chính xác! Tuyệt vời!
                  </span>
                ) : (
                  <span className="text-rose-700 font-bold flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Chưa chính xác! Đáp án đúng là: <strong>{currentQ.correctAnswer}</strong>
                  </span>
                )}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {currentQ.explanation}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <span>{currentIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Screen */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-md space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            Hoàn thành bài luyện tập!
          </h3>
          <p className="text-sm text-slate-600">
            Bạn đã trả lời đúng <strong className="text-slate-900 text-base">{score} / {questions.length}</strong> câu hỏi.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => generateQuestions(quizType)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Luyện lại bài này</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
