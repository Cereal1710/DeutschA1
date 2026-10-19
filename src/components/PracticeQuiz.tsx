import React, { useState, useEffect } from 'react';
import { VocabularyItem } from '../types';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { speakGerman } from '../utils/speech';
import { formatGermanDisplay } from '../utils/formatWord';
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

export const PracticeQuiz: React.FC<{ speechRate: number; words?: VocabularyItem[] }> = ({
  speechRate,
  words = VOCABULARY_LIST,
}) => {
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
      const nouns = words.filter((item) => item.article).sort(() => 0.5 - Math.random()).slice(0, 10);
      generated = nouns.map((item) => ({
        id: item.id,
        questionText: `Chọn mạo từ đúng cho danh từ:`,
        subText: item.word,
        germanToSpeak: item.word || item.german,
        options: ['der', 'die', 'das'],
        correctAnswer: item.article!,
        explanation: `${formatGermanDisplay(item)} (${item.vietnamese}) - Số nhiều: ${item.plural || '—'}`,
      }));
    } else if (type === 'meaning') {
      // Pick 10 random words
      const wordPool = [...words].sort(() => 0.5 - Math.random()).slice(0, 10);
      generated = wordPool.map((item) => {
        // 3 wrong distractors
        const distractors = words.filter((w) => w.id !== item.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((w) => w.vietnamese);
        const options = [...distractors, item.vietnamese].sort(() => 0.5 - Math.random());

        return {
          id: item.id,
          questionText: `Nghĩa tiếng Việt của từ:`,
          subText: formatGermanDisplay(item),
          germanToSpeak: item.word || item.german,
          options,
          correctAnswer: item.vietnamese,
          explanation: `${formatGermanDisplay(item)} có nghĩa là: "${item.vietnamese}". Ví dụ: ${item.example}`,
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
        {
          id: 'c11',
          questionText: 'Chia động từ ở thể mệnh lệnh cho ngôi "du":',
          subText: '______ bitte den Text laut vor! (Động từ lesen: e → ie)',
          germanToSpeak: 'Lies bitte den Text laut vor!',
          options: ['Lese', 'Lies', 'Liest', 'Lesen'],
          correctAnswer: 'Lies',
          explanation: 'Mệnh lệnh ngôi "du" bỏ "du" và "-st", nhưng hiện tượng đổi âm e → ie vẫn giữ nguyên: lesen → Lies!',
        },
        {
          id: 'c12',
          questionText: 'Chọn dạng mệnh lệnh đặc biệt của động từ "sein" cho ngôi "du":',
          subText: '______ bitte ruhig! (Động từ sein cho ngôi du)',
          germanToSpeak: 'Sei bitte ruhig!',
          options: ['Bist', 'Sei', 'Seid', 'Seien'],
          correctAnswer: 'Sei',
          explanation: 'Mệnh lệnh của động từ sein bất quy tắc: du → Sei ruhig! / ihr → Seid ruhig! / Sie → Seien Sie ruhig!',
        },
        {
          id: 'c13',
          questionText: 'Trong tiếng Đức, 14:30 (2 giờ 30 chiều) nói thân mật là:',
          subText: 'Wie viel Uhr ist es um 14:30 Uhr?',
          germanToSpeak: 'Es ist halb drei.',
          options: ['halb zwei', 'halb drei', 'halb vier', 'Viertel nach zwei'],
          correctAnswer: 'halb drei',
          explanation: 'Quy tắc vàng của người Đức: "halb" là nửa của giờ tiếp theo! 14:30 = halb drei (nửa của tiếng thứ ba).',
        },
        {
          id: 'c14',
          questionText: 'Điền giới từ thời gian thích hợp cho thứ trong tuần:',
          subText: 'Ich habe ______ Montag keine Schule.',
          germanToSpeak: 'Ich habe am Montag keine Schule.',
          options: ['um', 'im', 'am', 'von'],
          correctAnswer: 'am',
          explanation: 'Các thứ trong tuần và buổi trong ngày (am Montag, am Morgen, am Wochenende) luôn đi với giới từ "am" (an + dem).',
        },
        {
          id: 'c15',
          questionText: 'Điền giới từ thích hợp cho tháng và mùa:',
          subText: 'Wir haben ______ Juli und August Sommerferien.',
          germanToSpeak: 'Wir haben im Juli und August Sommerferien.',
          options: ['um', 'am', 'im', 'zu'],
          correctAnswer: 'im',
          explanation: 'Tháng trong năm và các mùa (im Juli, im Sommer, im Winter) luôn đi với giới từ "im" (in + dem).',
        },
        {
          id: 'c16',
          questionText: 'Chọn từ so sánh hơn thích hợp:',
          subText: 'Mein Bruder ist älter ______ ich.',
          germanToSpeak: 'Mein Bruder ist älter als ich.',
          options: ['wie', 'als', 'denn', 'so'],
          correctAnswer: 'als',
          explanation: 'Trong cấu trúc so sánh hơn (Komparativ: -er), từ so sánh luôn luôn là "als" (älter als, schneller als).',
        },
        {
          id: 'c17',
          questionText: 'Chọn dạng so sánh nhất bất quy tắc của "gut" (tốt):',
          subText: 'Welches Buch gefällt dir am ______?',
          germanToSpeak: 'Welches Buch gefällt dir am besten?',
          options: ['gutesten', 'besser', 'besten', 'meisten'],
          correctAnswer: 'besten',
          explanation: 'Cấp so sánh của gut là bất quy tắc: gut → besser → am besten (tốt → tốt hơn → tốt nhất).',
        },
        {
          id: 'c18',
          questionText: 'Chọn trợ động từ phù hợp cho thì quá khứ Perfekt:',
          subText: 'Er ______ gestern mit dem Zug nach Berlin gefahren. (chuyển động di chuyển)',
          germanToSpeak: 'Er ist gestern mit dem Zug nach Berlin gefahren.',
          options: ['hat', 'ist', 'wird', 'hatte'],
          correctAnswer: 'ist',
          explanation: 'Các động từ diễn tả sự di chuyển (fahren, gehen, kommen, fliegen) dùng trợ động từ "sein" trong thì Perfekt.',
        },
        {
          id: 'c19',
          questionText: 'Chọn dạng Partizip II của động từ không tách "bezahlen":',
          subText: 'Ich habe die Rechnung mit Karte ______. (tiền tố không tách be-)',
          germanToSpeak: 'Ich habe die Rechnung mit Karte bezahlt.',
          options: ['gebezahlt', 'bezahlt', 'gebezahlen', 'bezahlen'],
          correctAnswer: 'bezahlt',
          explanation: 'Động từ có tiền tố không tách (be-, ver-, ent-, er...) không chèn "ge-" ở thì Perfekt: hat bezahlt.',
        },
        {
          id: 'c20',
          questionText: 'Chia Modalverb "können" cho ngôi "er":',
          subText: 'Er ______ sehr gut Deutsch sprechen.',
          germanToSpeak: 'Er kann sehr gut Deutsch sprechen.',
          options: ['könnt', 'kannst', 'kann', 'können'],
          correctAnswer: 'kann',
          explanation: 'Với tất cả Modalverben, ngôi "ich" và "er/sie/es" luôn giống nhau và KHÔNG CÓ ĐUÔI: er kann, er muss, er will, er darf.',
        },
        {
          id: 'c21',
          questionText: 'Điền giới từ thích hợp vào câu hỏi nghề nghiệp A1 chuẩn Goethe:',
          subText: 'Was sind Sie ______ Beruf? — Ich bin Ingenieur.',
          germanToSpeak: 'Was sind Sie von Beruf?',
          options: ['im', 'von', 'aus', 'mit'],
          correctAnswer: 'von',
          explanation: 'Mẫu câu hỏi nghề nghiệp chuẩn A1 tiếng Đức: "Was sind Sie von Beruf?" hoặc "Was bist du von Beruf?".',
        },
        {
          id: 'c22',
          questionText: 'Điền từ nối nghề nghiệp thích hợp:',
          subText: 'Mein Onkel arbeitet ______ Kellner in einem Restaurant.',
          germanToSpeak: 'Mein Onkel arbeitet als Kellner in einem Restaurant.',
          options: ['wie', 'für', 'als', 'mit'],
          correctAnswer: 'als',
          explanation: 'Khi nói làm nghề gì với động từ arbeiten, người Đức dùng cấu trúc: "arbeiten als + nghề nghiệp" (không có mạo từ).',
        },
        {
          id: 'c23',
          questionText: 'Điền đại từ thích hợp vào mẫu câu khám bệnh:',
          subText: 'Mein Kopf tut ______ sehr weh. (động từ wehtun đòi hỏi Dativ)',
          germanToSpeak: 'Mein Kopf tut mir sehr weh.',
          options: ['mich', 'mir', 'ich', 'mein'],
          correctAnswer: 'mir',
          explanation: 'Cấu trúc khám bệnh: [bộ phận cơ thể] + tut + [jemandem - Dativ] + weh. Đại từ nhân xưng ngôi "ich" ở Dativ là "mir".',
        },
        {
          id: 'c24',
          questionText: 'Điền tiền tố tách của động từ "anziehen" (mặc vào) ở cuối câu:',
          subText: 'Es ist kalt draußen, zieh bitte deine warme Jacke ______!',
          germanToSpeak: 'Zieh bitte deine warme Jacke an!',
          options: ['aus', 'auf', 'an', 'ein'],
          correctAnswer: 'an',
          explanation: 'Động từ tách "anziehen" có nghĩa là mặc quần áo vào. Tiền tố "an" bị đẩy về cuối câu mệnh lệnh: "Zieh ... an!".',
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
