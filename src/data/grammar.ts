/**
 * German A1 - A2 - B1 Grammar Reference and Interactive Explanations
 */
import { GRAMMAR_TOPICS_A2_B1 } from './grammarA2B1';

export interface CaseRow {
  caseName: 'Nom' | 'Akk' | 'Dat' | 'Gen';
  fullName: string;
  question: string;
  role: string;
  masculine: string;
  feminine: string;
  neuter: string;
  plural: string;
  example: string;
  exampleVi: string;
}

export const DEFINITE_ARTICLES: CaseRow[] = [
  {
    caseName: 'Nom',
    fullName: 'Nominativ',
    question: 'Wer? / Was? (Ai? Cái gì?)',
    role: 'Chủ ngữ trong câu',
    masculine: 'der',
    feminine: 'die',
    neuter: 'das',
    plural: 'die',
    example: 'Der Mann arbeitet heute.',
    exampleVi: 'Người đàn ông hôm nay làm việc.',
  },
  {
    caseName: 'Akk',
    fullName: 'Akkusativ',
    question: 'Wen? / Was? (Ai? Cái gì?)',
    role: 'Tân ngữ trực tiếp (bị tác động)',
    masculine: 'den',
    feminine: 'die',
    neuter: 'das',
    plural: 'die',
    example: 'Ich sehe den Mann.',
    exampleVi: 'Tôi nhìn thấy người đàn ông.',
  },
  {
    caseName: 'Dat',
    fullName: 'Dativ',
    question: 'Wem? (Cho ai? Với ai?)',
    role: 'Tân ngữ gián tiếp (người nhận)',
    masculine: 'dem',
    feminine: 'der',
    neuter: 'dem',
    plural: 'den + -(e)n',
    example: 'Ich helfe dem Mann.',
    exampleVi: 'Tôi giúp đỡ người đàn ông.',
  },
  {
    caseName: 'Gen',
    fullName: 'Genitiv',
    question: 'Wessen? (Của ai?)',
    role: 'Chỉ sự sở hữu',
    masculine: 'des + -(e)s',
    feminine: 'der',
    neuter: 'des + -(e)s',
    plural: 'der',
    example: 'Das Auto des Mannes ist neu.',
    exampleVi: 'Chiếc ô tô của người đàn ông còn mới.',
  },
];

export const INDEFINITE_ARTICLES = [
  { caseName: 'Nom', masculine: 'ein', feminine: 'eine', neuter: 'ein', plural: '— (không có ein)' },
  { caseName: 'Akk', masculine: 'einen', feminine: 'eine', neuter: 'ein', plural: '—' },
  { caseName: 'Dat', masculine: 'einem', feminine: 'einer', neuter: 'einem', plural: '—' },
  { caseName: 'Gen', masculine: 'eines', feminine: 'einer', neuter: 'eines', plural: '—' },
];

export const NEGATIVE_ARTICLES = [
  { caseName: 'Nom', masculine: 'kein', feminine: 'keine', neuter: 'kein', plural: 'keine' },
  { caseName: 'Akk', masculine: 'keinen', feminine: 'keine', neuter: 'kein', plural: 'keine' },
  { caseName: 'Dat', masculine: 'keinem', feminine: 'keiner', neuter: 'keinem', plural: 'keinen + -n' },
  { caseName: 'Gen', masculine: 'keines', feminine: 'keiner', neuter: 'keines', plural: 'keiner' },
];

export const PERSONAL_PRONOUNS = [
  { person: 'Tôi (ngôi 1)', nom: 'ich', akk: 'mich', dat: 'mir', example: 'Er hilft mir (Dat). Ich sehe dich (Akk).' },
  { person: 'Bạn (thân mật số ít)', nom: 'du', akk: 'dich', dat: 'dir', example: 'Ich liebe dich. Wie geht es dir?' },
  { person: 'Anh ấy / Nó (đực)', nom: 'er', akk: 'ihn', dat: 'ihm', example: 'Ich kenne ihn. Ich gebe ihm das Buch.' },
  { person: 'Cô ấy / Nó (cái)', nom: 'sie', akk: 'sie', dat: 'ihr', example: 'Ich sehe sie. Ich antworte ihr.' },
  { person: 'Nó (giống trung)', nom: 'es', akk: 'es', dat: 'ihm', example: 'Das Kind weint, ich helfe ihm.' },
  { person: 'Chúng tôi', nom: 'wir', akk: 'uns', dat: 'uns', example: 'Kommst du mit uns? Er besucht uns.' },
  { person: 'Các bạn', nom: 'ihr', akk: 'euch', dat: 'euch', example: 'Ich sehe euch morgen. Passt es euch?' },
  { person: 'Họ (số nhiều)', nom: 'sie', akk: 'sie', dat: 'ihnen', example: 'Ich kenne sie. Ich helfe ihnen.' },
  { person: 'Ngài / Các ngài (lịch sự)', nom: 'Sie', akk: 'Sie', dat: 'Ihnen', example: 'Darf ich Sie fragen? Wie geht es Ihnen?' },
];

export const POSSESSIVE_PRONOUNS = [
  { owner: 'ich (tôi)', base: 'mein', m_nom: 'mein Vater', f_nom: 'meine Mutter', n_nom: 'mein Kind', pl_nom: 'meine Freunde' },
  { owner: 'du (bạn)', base: 'dein', m_nom: 'dein Vater', f_nom: 'deine Mutter', n_nom: 'dein Kind', pl_nom: 'deine Freunde' },
  { owner: 'er (anh ấy)', base: 'sein', m_nom: 'sein Vater', f_nom: 'seine Mutter', n_nom: 'sein Kind', pl_nom: 'seine Freunde' },
  { owner: 'sie (cô ấy)', base: 'ihr', m_nom: 'ihr Vater', f_nom: 'ihre Mutter', n_nom: 'ihr Kind', pl_nom: 'ihre Freunde' },
  { owner: 'es (nó)', base: 'sein', m_nom: 'sein Vater', f_nom: 'seine Mutter', n_nom: 'sein Kind', pl_nom: 'seine Freunde' },
  { owner: 'wir (chúng tôi)', base: 'unser', m_nom: 'unser Vater', f_nom: 'unsere Mutter', n_nom: 'unser Kind', pl_nom: 'unsere Freunde' },
  { owner: 'ihr (các bạn)', base: 'euer', m_nom: 'euer Vater', f_nom: 'eure Mutter', n_nom: 'euer Kind', pl_nom: 'eure Freunde' },
  { owner: 'sie (họ)', base: 'ihr', m_nom: 'ihr Vater', f_nom: 'ihre Mutter', n_nom: 'ihr Kind', pl_nom: 'ihre Freunde' },
  { owner: 'Sie (Ngài)', base: 'Ihr', m_nom: 'Ihr Vater', f_nom: 'Ihre Mutter', n_nom: 'Ihr Kind', pl_nom: 'Ihre Freunde' },
];

export interface PrepositionItem {
  prep: string;
  meaning: string;
  caseType: 'Akkusativ' | 'Dativ' | 'Wechsel (Akk/Dat)';
  example: string;
  exampleVi: string;
  ruleExplanation?: string;
}

export const PREPOSITIONS_DATA: PrepositionItem[] = [
  // Akkusativ
  { prep: 'durch', meaning: 'xuyên qua, qua', caseType: 'Akkusativ', example: 'Wir gehen durch den Park.', exampleVi: 'Chúng tôi đi xuyên qua công viên.' },
  { prep: 'für', meaning: 'cho, dành cho', caseType: 'Akkusativ', example: 'Das Geschenk ist für meinen Bruder.', exampleVi: 'Món quà này dành cho anh trai tôi.' },
  { prep: 'gegen', meaning: 'chống lại, khoảng (giờ)', caseType: 'Akkusativ', example: 'Ich treffe dich gegen 18 Uhr.', exampleVi: 'Tôi gặp bạn vào khoảng 18 giờ.' },
  { prep: 'ohne', meaning: 'không có, thiếu', caseType: 'Akkusativ', example: 'Kaffee ohne Zucker schmeckt mir am besten.', exampleVi: 'Cà phê không có đường là tôi thích nhất.' },
  { prep: 'um', meaning: 'quanh, vào lúc (giờ)', caseType: 'Akkusativ', example: 'Der Unterricht beginnt um 8 Uhr.', exampleVi: 'Tiết học bắt đầu lúc 8 giờ.' },

  // Dativ
  { prep: 'aus', meaning: 'từ bên trong, đến từ', caseType: 'Dativ', example: 'Ich komme aus Vietnam.', exampleVi: 'Tôi đến từ Việt Nam.' },
  { prep: 'bei', meaning: 'ở chỗ ai, tại', caseType: 'Dativ', example: 'Ich wohne bei meinen Eltern.', exampleVi: 'Tôi đang sống ở chỗ bố mẹ.' },
  { prep: 'mit', meaning: 'với, bằng (phương tiện)', caseType: 'Dativ', example: 'Ich fahre mit dem Bus.', exampleVi: 'Tôi đi bằng xe buýt.' },
  { prep: 'nach', meaning: 'đến (thành phố/quốc gia), sau', caseType: 'Dativ', example: 'Nach dem Unterricht gehe ich nach Hause.', exampleVi: 'Sau giờ học tôi đi về nhà.' },
  { prep: 'seit', meaning: 'từ (mốc thời gian đến nay)', caseType: 'Dativ', example: 'Ich lerne seit drei Monaten Deutsch.', exampleVi: 'Tôi học tiếng Đức từ 3 tháng nay.' },
  { prep: 'von', meaning: 'từ, của (chỉ nguồn gốc/sở hữu)', caseType: 'Dativ', example: 'Das Buch von meinem Lehrer ist sehr gut.', exampleVi: 'Quyển sách của thầy giáo tôi rất hay.' },
  { prep: 'zu', meaning: 'đến (người, địa điểm cụ thể)', caseType: 'Dativ', example: 'Ich gehe zum Arzt / zur Schule.', exampleVi: 'Tôi đi đến bác sĩ / đến trường.' },
  { prep: 'gegenüber', meaning: 'đối diện', caseType: 'Dativ', example: 'Die Apotheke liegt gegenüber der Post.', exampleVi: 'Hiệu thuốc nằm đối diện bưu điện.' },

  // Wechselpräpositionen (an, auf, hinter, in, neben, über, unter, vor, zwischen)
  { prep: 'in', meaning: 'trong, vào', caseType: 'Wechsel (Akk/Dat)', example: 'Wo? Ich bin in der Schule (Dat) | Wohin? Ich gehe in die Schule (Akk)', exampleVi: 'Ở đâu? (Dat: in der) | Đi đâu? (Akk: in die)', ruleExplanation: 'Wo? (vị trí tĩnh) → Dativ | Wohin? (hướng di chuyển) → Akkusativ' },
  { prep: 'auf', meaning: 'trên bề mặt', caseType: 'Wechsel (Akk/Dat)', example: 'Das Buch liegt auf dem Tisch (Dat) | Ich lege das Buch auf den Tisch (Akk)', exampleVi: 'Sách nằm trên bàn (Dat) | Tôi đặt sách lên bàn (Akk)', ruleExplanation: 'Wo? (trên bàn) → auf dem | Wohin? (đặt lên bàn) → auf den' },
  { prep: 'an', meaning: 'sát bên, ở cạnh đứng', caseType: 'Wechsel (Akk/Dat)', example: 'Das Bild hängt an der Wand (Dat) | Ich hänge das Bild an die Wand (Akk)', exampleVi: 'Bức tranh treo trên tường (Dat) | Tôi treo tranh lên tường (Akk)' },
  { prep: 'neben', meaning: 'bên cạnh', caseType: 'Wechsel (Akk/Dat)', example: 'Er sitzt neben mir (Dat) | Er setzt sich neben mich (Akk)', exampleVi: 'Anh ấy ngồi cạnh tôi (Dat) | Anh ấy ngồi xuống cạnh tôi (Akk)' },
  { prep: 'vor', meaning: 'phía trước, trước', caseType: 'Wechsel (Akk/Dat)', example: 'Das Auto steht vor dem Haus (Dat) | Er fährt das Auto vor das Haus (Akk)', exampleVi: 'Xe đỗ trước nhà (Dat) | Anh ấy lái xe ra trước nhà (Akk)' },
  { prep: 'hinter', meaning: 'phía sau', caseType: 'Wechsel (Akk/Dat)', example: 'Der Garten liegt hinter dem Haus (Dat)', exampleVi: 'Khu vườn nằm ở phía sau ngôi nhà (Dat).' },
  { prep: 'unter', meaning: 'phía dưới', caseType: 'Wechsel (Akk/Dat)', example: 'Die Katze schläft unter dem Stuhl (Dat)', exampleVi: 'Con mèo ngủ dưới chiếc ghế (Dat).' },
  { prep: 'über', meaning: 'phía trên, bên trên', caseType: 'Wechsel (Akk/Dat)', example: 'Die Lampe hängt über dem Tisch (Dat)', exampleVi: 'Cái đèn treo bên trên chiếc bàn (Dat).' },
  { prep: 'zwischen', meaning: 'ở giữa hai vật/người', caseType: 'Wechsel (Akk/Dat)', example: 'Der Tisch steht zwischen den zwei Stühlen (Dat)', exampleVi: 'Cái bàn đứng ở giữa hai chiếc ghế (Dat số nhiều).' },
];

export interface GrammarTopic {
  id: string;
  title: string;
  level?: 'A1' | 'A2' | 'B1';
  shortSummary: string;
  formula: string;
  explanation: string;
  rules: string[];
  examples: { de: string; vi: string; note?: string }[];
}

const BASE_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'satzbau',
    title: '5.1 Câu khẳng định & Quy tắc vị trí động từ V2',
    shortSummary: 'Động từ đã chia luôn đứng ở vị trí thứ hai trong câu chính.',
    formula: 'Chủ ngữ (hoặc trạng từ) + Động từ (vị trí 2) + Các thành phần khác',
    explanation: 'Trong tiếng Đức, "vị trí 2" là vị trí thành phần câu thứ hai, không nhất thiết là từ thứ hai. Nếu đưa thời gian hoặc nơi chốn lên đầu câu (Inversion), động từ vẫn giữ vị trí 2 và chủ ngữ đảo ra vị trí 3.',
    rules: [
      'Chủ ngữ đứng đầu: Ich (1) lerne (2) heute Deutsch (3).',
      'Trạng từ thời gian đứng đầu: Heute (1) lerne (2) ich (3) Deutsch.',
      'Trạng từ nơi chốn đứng đầu: In Berlin (1) wohnt (2) mein Bruder (3).',
      'Động từ luôn chia theo ngôi chủ ngữ.',
    ],
    examples: [
      { de: 'Ich wohne in Hanoi.', vi: 'Tôi sống ở Hà Nội.', note: 'Vị trí 1: Ich | Vị trí 2: wohne' },
      { de: 'Heute gehe ich zur Schule.', vi: 'Hôm nay tôi đi học.', note: 'Vị trí 1: Heute | Vị trí 2: gehe | Vị trí 3: ich' },
      { de: 'Am Wochenende kocht meine Mutter sehr lecker.', vi: 'Vào cuối tuần mẹ tôi nấu ăn rất ngon.', note: 'Vị trí 1: Am Wochenende | Vị trí 2: kocht' },
    ],
  },
  {
    id: 'verneinung',
    title: '5.2 Phủ định với "nicht" và "kein"',
    shortSummary: 'Phân biệt cách dùng nicht (phủ định động từ, tính từ) và kein (phủ định danh từ).',
    formula: 'kein + Danh từ (chia theo giống) | nicht + Động từ/Tính từ/Trạng từ',
    explanation: 'Dùng kein để phủ định danh từ đi với mạo từ ein hoặc danh từ không có mạo từ. Dùng nicht cho mọi trường hợp còn lại: động từ, tính từ, trạng từ, hoặc danh từ có mạo từ xác định der/die/das.',
    rules: [
      'Dùng kein: Ich habe kein Auto. / Ich trinke keinen Kaffee.',
      'Dùng nicht cho tính từ: Das ist nicht teuer. / Es ist nicht kalt.',
      'Dùng nicht cho động từ: Ich komme heute nicht. / Er schläft nicht.',
      'kein biến đổi theo 4 cách như mạo từ ein: kein, keine, kein, keinen...',
    ],
    examples: [
      { de: 'Ich habe keinen Bruder.', vi: 'Tôi không có anh/em trai.', note: 'Akkusativ giống đực: keinen' },
      { de: 'Ich spreche nicht schnell.', vi: 'Tôi không nói nhanh.', note: 'Phủ định trạng từ schnell' },
      { de: 'Wir trinken keinen Alkohol.', vi: 'Chúng tôi không uống rượu bia.', note: 'Phủ định danh từ số ít không mạo từ' },
    ],
  },
  {
    id: 'fragen',
    title: '5.3 & 5.4 Câu hỏi Có/Không (Ja/Nein) & Câu hỏi W (W-Frage)',
    shortSummary: 'Động từ lên đầu với câu hỏi Ja/Nein; Từ để hỏi đứng đầu với câu hỏi W.',
    formula: 'Ja/Nein: Động từ + Chủ ngữ + ...? | W-Frage: Từ để hỏi + Động từ + Chủ ngữ + ...?',
    explanation: 'Có hai loại câu hỏi cơ bản: câu hỏi Có/Không đưa động từ đã chia lên vị trí đầu tiên; câu hỏi có từ để hỏi (wer, was, wo, wann, wie, warum...) đặt từ hỏi ở vị trí 1 và động từ ở vị trí 2.',
    rules: [
      'Ja/Nein-Frage: Động từ đứng vị trí 1: Kommst du heute? (Trả lời: Ja, ich komme. / Nein, ich komme nicht.)',
      'W-Frage: Từ hỏi (1) + Động từ (2) + Chủ ngữ (3): Wo wohnst du?',
      'Wer (Nom) → Wen (Akk) → Wem (Dat) khi hỏi về người.',
      'Wie viel (lượng không đếm) vs Wie viele (đếm được số nhiều).',
    ],
    examples: [
      { de: 'Lernst du Deutsch? — Ja, ich lerne Deutsch.', vi: 'Bạn có học tiếng Đức không? — Có, tôi học tiếng Đức.' },
      { de: 'Woher kommen Sie? — Ich komme aus Vietnam.', vi: 'Ngài đến từ đâu? — Tôi đến từ Việt Nam.' },
      { de: 'Wie alt bist du? — Ich bin zwanzig Jahre alt.', vi: 'Bạn bao nhiêu tuổi? — Tôi 20 tuổi.' },
    ],
  },
  {
    id: 'modalverben',
    title: '5.6 Động từ khuyết thiếu (Modalverben: können, müssen, dürfen...)',
    shortSummary: 'Động từ khuyết thiếu chia ở vị trí 2, động từ chính nguyên thể nhảy về cuối câu.',
    formula: 'Chủ ngữ + Modalverb (chia ở V2) + ... + Động từ chính (nguyên thể Infinitiv ở cuối câu)',
    explanation: 'Các Modalverben diễn đạt khả năng (können), sự bắt buộc (müssen), sự cho phép (dürfen), lời khuyên (sollen), mong muốn (wollen, möchten) và sở thích (mögen).',
    rules: [
      'können (có thể): Ich kann gut schwimmen.',
      'müssen (phải bắt buộc): Ich muss heute lernen.',
      'dürfen (được phép): Man darf hier nicht parken.',
      'sollen (nên làm): Du sollst viel Wasser trinken.',
      'wollen (muốn quyết tâm): Wir wollen Fußball spielen.',
      'möchten (muốn lịch sự): Ich möchte einen Kaffee bestellen.',
      'Quy tắc ngôi: ich và er/sie/es luôn KHÔNG có đuôi (ich kann, er kann; ich muss, er muss).',
    ],
    examples: [
      { de: 'Ich kann sehr gut Deutsch sprechen.', vi: 'Tôi có thể nói tiếng Đức rất tốt.', note: 'kann ở vị trí 2, sprechen ở cuối câu' },
      { de: 'Du musst deine Medikamente pünktlich einnehmen.', vi: 'Bạn phải uống thuốc đúng giờ.', note: 'musst ở vị trí 2, einnehmen ở cuối câu' },
      { de: 'Hier darf man keine Fotos machen.', vi: 'Ở đây không được phép chụp ảnh.', note: 'darf ở vị trí 2, machen ở cuối câu' },
    ],
  },
  {
    id: 'trennbare_verben',
    title: '5.7 Động từ tách (Trennbare Verben: aufstehen, einkaufen...)',
    shortSummary: 'Tiền tố tách ra và nhảy xuống đứng ở vị trí cuối cùng trong câu chính.',
    formula: 'Chủ ngữ + Gốc động từ đã chia (V2) + ... + Tiền tố tách (cuối câu)',
    explanation: 'Nhiều động từ tiếng Đức có tiền tố tách được như: auf-, ein-, an-, aus-, mit-, ab-, vor-, fern-, zu-. Khi chia ở thì hiện tại trong câu chính, tiền tố bị đẩy về tận cùng câu.',
    rules: [
      'aufstehen (thức dậy): Ich stehe (2) um 6 Uhr auf (cuối).',
      'einkaufen (mua sắm): Wir kaufen (2) am Samstag im Supermarkt ein (cuối).',
      'anrufen (gọi điện): Er ruft (2) seine Mutter an (cuối).',
      'Khi đi với Modalverb: động từ tách giữ nguyên dạng ở cuối: Ich muss um 6 Uhr aufstehen.',
    ],
    examples: [
      { de: 'Ich stehe jeden Tag um 6 Uhr auf.', vi: 'Tôi thức dậy mỗi ngày lúc 6 giờ.', note: 'auf đứng ở cuối câu' },
      { de: 'Am Wochenende kauft meine Familie im Supermarkt ein.', vi: 'Cuối tuần gia đình tôi đi siêu thị mua sắm.', note: 'ein đứng ở cuối câu' },
      { de: 'Er ruft mich heute Abend an.', vi: 'Anh ấy gọi điện cho tôi tối nay.', note: 'an đứng ở cuối câu' },
    ],
  },
  {
    id: 'konjunktionen',
    title: '5.8 & 5.9 Liên từ ADUSO & Liên từ phụ thuộc weil / dass',
    shortSummary: 'ADUSO giữ nguyên vị trí 2; sau weil và dass thì động từ nhảy về cuối câu.',
    formula: 'ADUSO: Mệnh đề 1, [und/aber/oder/denn] + S + V2 | weil/dass: [weil/dass] + S + ... + V (cuối)',
    explanation: 'Liên từ kết hợp ADUSO (aber, denn, und, sondern, oder) liên kết hai mệnh đề chính độc lập, động từ vẫn ở vị trí 2. Ngược lại, weil (vì) và dass (rằng) tạo mệnh đề phụ (Nebensatz), buộc động từ chia phải nằm ở vị trí cuối cùng.',
    rules: [
      'ADUSO: Ich bin müde, aber ich lerne weiter. (Động từ lerne vẫn ở vị trí 2).',
      'ADUSO: Ich bleibe zu Hause, denn ich bin krank. (bin ở vị trí 2 sau denn).',
      'Weil: Ich bleibe zu Hause, weil ich krank bin. (bin nhảy về cuối câu).',
      'Dass: Ich weiß, dass er heute kommt. (kommt nhảy về cuối câu).',
    ],
    examples: [
      { de: 'Ich lerne Deutsch und mein Bruder lernt Englisch.', vi: 'Tôi học tiếng Đức và anh tôi học tiếng Anh.', note: 'und nối 2 mệnh đề chính' },
      { de: 'Ich kann nicht kommen, weil ich arbeiten muss.', vi: 'Tôi không thể đến vì tôi phải làm việc.', note: 'muss nhảy về cuối mệnh đề weil' },
      { de: 'Ich glaube, dass diese Prüfung nicht schwer ist.', vi: 'Tôi tin rằng bài thi này không khó.', note: 'ist nhảy về cuối mệnh đề dass' },
    ],
  },
  {
    id: 'perfekt',
    title: '6.3 Thì quá khứ Perfekt (Giao tiếp thường ngày)',
    shortSummary: 'haben hoặc sein ở vị trí 2 + Partizip II (ge...t / ge...en) ở cuối câu.',
    formula: 'Chủ ngữ + haben / sein (chia ở V2) + ... + Partizip II (cuối câu)',
    explanation: 'Perfekt là thì quá khứ phổ biến nhất trong giao tiếp nói hàng ngày của người Đức. Hầu hết động từ đi với haben. Những động từ diễn tả sự di chuyển (gehen, fahren, kommen, fliegen) hoặc thay đổi trạng thái (aufstehen, sterben) và sein, bleiben đi với trợ động từ sein.',
    rules: [
      'Động từ thường: ge- + gốc + -t: lernen → gelernt, machen → gemacht, kaufen → gekauft.',
      'Động từ bất quy tắc: ge- + đổi âm + -en: sehen → gesehen, essen → gegessen, trinken → getrunken.',
      'Đi với sein: gehen (ist gegangen), fahren (ist gefahren), kommen (ist gekommen), bleiben (ist geblieben).',
      'Đi với haben: machen (hat gemacht), essen (hat gegessen), haben (hat gehabt).',
    ],
    examples: [
      { de: 'Ich habe gestern zwei Stunden Deutsch gelernt.', vi: 'Hôm qua tôi đã học 2 tiếng tiếng Đức.', note: 'haben + gelernt' },
      { de: 'Er ist mit dem Zug nach Berlin gefahren.', vi: 'Anh ấy đã đi tàu hỏa đến Berlin.', note: 'chuyển động → sein + gefahren' },
      { de: 'Wir haben leckere Pizza im Restaurant gegessen.', vi: 'Chúng tôi đã ăn pizza ngon tuyệt trong nhà hàng.', note: 'haben + gegessen' },
    ],
  },
  {
    id: 'adjektivdeklination',
    title: '7. Chia đuôi tính từ (Adjektivdeklination)',
    shortSummary: 'Tính từ đứng trước danh từ phải thêm đuôi phụ thuộc vào giống và cách.',
    formula: 'Mạo từ + Tính từ (+ đuôi) + Danh từ',
    explanation: 'Khi tính từ đứng trước danh từ, nó phải biến đổi đuôi theo giống (đực, cái, trung, số nhiều) và theo 4 cách (Nom, Akk, Dat, Gen). Với mạo từ xác định ở Nominativ số ít đuôi là -e; ở Dativ và số nhiều hầu hết mang đuôi -en.',
    rules: [
      'Nom có der/die/das: der gute Mann, die gute Frau, das gute Kind, die guten Kinder (-en).',
      'Akk có den/die/das: den guten Mann (-en), die gute Frau (-e), das gute Kind (-e).',
      'Dativ có mạo từ: luôn là đuôi -en (dem guten Mann, der guten Frau, dem guten Kind, den guten Kindern).',
      'Nom với ein: ein guter Mann (-er), eine gute Frau (-e), ein gutes Kind (-es).',
    ],
    examples: [
      { de: 'Das ist ein schöner Tag.', vi: 'Đó là một ngày đẹp trời.', note: 'ein + đực Nom: -er' },
      { de: 'Ich habe ein kleines Kind gesehen.', vi: 'Tôi đã nhìn thấy một đứa trẻ nhỏ.', note: 'ein + trung Akk: -es' },
      { de: 'Ich spreche mit meinem besten Freund.', vi: 'Tôi nói chuyện với người bạn thân nhất của mình.', note: 'Dativ giống đực: -en' },
    ],
  },
  {
    id: 'imperativ',
    title: '5.5 Câu mệnh lệnh (Imperativ: du, ihr, Sie)',
    shortSummary: 'Dùng để yêu cầu, hướng dẫn, khuyên nhủ hoặc ra lệnh.',
    formula: 'du: Gốc động từ (-st) | ihr: Gốc động từ + -t | Sie: Động từ nguyên mẫu + Sie',
    explanation: 'Câu mệnh lệnh có 3 hình thức đối tượng: ngôi du (thân mật 1 người), ngôi ihr (thân mật nhiều người), và ngôi Sie (lịch sự trang trọng). Lưu ý dấu chấm than (!) ở cuối câu mệnh lệnh.',
    rules: [
      'Ngôi du: Bỏ đại từ "du", bỏ đuôi "-st": du kommst → Komm! / du machst → Mach! / du lernst → Lern (hoặc Lerne)!',
      'Đổi nguyên âm e → i/ie ở ngôi du vẫn GIỮ NGUYÊN trong mệnh lệnh: du liest → Lies! / du sprichst → Sprich! / du isst → Iss!',
      'Biến âm a → ä ở ngôi du thì BỎ BIẾN ÂM: du fährst → Fahr! / du schläfst → Schlaf!',
      'Ngôi ihr: Giữ nguyên dạng chia ngôi ihr (chỉ bỏ chữ ihr): ihr kommt → Kommt! / ihr macht → Macht!',
      'Ngôi Sie: Động từ nguyên mẫu + Sie + bitte: Kommen Sie bitte! / Lesen Sie bitte!',
      'Trường hợp đặc biệt của động từ sein: Sei ruhig! (du) / Seid ruhig! (ihr) / Seien Sie ruhig! (Sie).',
    ],
    examples: [
      { de: 'Komm bitte schnell hierher!', vi: 'Hãy nhanh chóng lại đây nhé! (ngôi du)', note: 'Bỏ du và -st' },
      { de: 'Lies den Text laut vor!', vi: 'Hãy đọc to đoạn văn lên! (ngôi du: e → ie)', note: 'lesen → Lies!' },
      { de: 'Macht bitte die Hausaufgaben!', vi: 'Các bạn hãy làm bài tập về nhà đi! (ngôi ihr)', note: 'Giữ -t' },
      { de: 'Warten Sie bitte einen Moment!', vi: 'Xin ngài vui lòng chờ một lát! (ngôi Sie)', note: 'Động từ nguyên mẫu + Sie' },
    ],
  },
  {
    id: 'uhrzeit_zeit',
    title: '5.11 Cách nói giờ & Giới từ chỉ thời gian (Uhrzeit & Temporale Präpositionen)',
    shortSummary: 'Giờ chính thức vs giờ giao tiếp & các giới từ um, am, im, von...bis, seit.',
    formula: 'um + Giờ | am + Thứ/Buổi/Ngày | im + Tháng/Mùa/Năm | seit + Dativ (từ đó đến nay)',
    explanation: 'Tiếng Đức có 2 cách xem giờ: chính thức (24h) dùng trên radio, sân bay, lịch tàu; và thân mật (12h) dùng trong đời sống hàng ngày với các từ "nach" (hơn), "vor" (kém), "halb" (rưỡi/kém 30 phút).',
    rules: [
      'Giờ chính thức (Formell 24h): 14:15 = vierzehn Uhr fünfzehn / 08:30 = acht Uhr dreißig.',
      'Giờ thân mật (Informell 12h): 14:15 = Viertel nach zwei (15 qua 2) / 14:45 = Viertel vor drei (15 trước 3).',
      'Quy tắc vàng với "halb": halb drei = 2 giờ 30 (nửa của tiếng thứ ba)! halb tám = 7:30.',
      'Giới từ "um": dùng cho mốc giờ chính xác (um 7 Uhr, um 14:30 Uhr).',
      'Giới từ "am": dùng cho thứ trong tuần (am Montag), buổi trong ngày (am Morgen, am Abend - TRỪ in der Nacht) và ngày cụ thể (am 15. Mai).',
      'Giới từ "im": dùng cho tháng (im Januar), mùa (im Sommer, im Winter) và năm (im Jahr 2026).',
      'Giới từ "seit" + Dativ: diễn tả hành động bắt đầu trong quá khứ và vẫn đang tiếp diễn (Ich lerne seit drei Monaten Deutsch).',
    ],
    examples: [
      { de: 'Wie viel Uhr ist es? — Es ist genau halb drei (14:30).', vi: 'Mấy giờ rồi? — Đúng 2 giờ rưỡi.', note: 'halb drei = 2:30' },
      { de: 'Der Kurs beginnt um 8:30 Uhr morgens.', vi: 'Khóa học bắt đầu lúc 8:30 sáng.', note: 'um + giờ' },
      { de: 'Am Montag und am Mittwoch habe ich Deutschunterricht.', vi: 'Vào thứ Hai và thứ Tư tôi có tiết học tiếng Đức.', note: 'am + thứ' },
      { de: 'Im Juli und im August haben wir Sommerferien.', vi: 'Vào tháng 7 và tháng 8 chúng tôi có kỳ nghỉ hè.', note: 'im + tháng' },
      { de: 'Ich lebe seit zwei Jahren in Deutschland.', vi: 'Tôi đã sống ở Đức được 2 năm nay.', note: 'seit + Dativ số nhiều' },
    ],
  },
  {
    id: 'vergleich',
    title: '5.12 So sánh tính từ cơ bản (Komparation & Steigerung)',
    shortSummary: 'So sánh bằng (so... wie), hơn (-er als), và nhất (am -sten).',
    formula: 'Bằng: so... wie | Hơn: Tính từ + -er + als | Nhất: am + Tính từ + -sten',
    explanation: 'Dùng để so sánh đặc điểm, kích thước, tính chất giữa hai hoặc nhiều đối tượng trong giao tiếp A1.',
    rules: [
      'So sánh bằng: so + Tính từ nguyên thể + wie: Er ist so groß wie ich (Anh ấy cao bằng tôi).',
      'So sánh hơn: Tính từ thêm đuôi "-er" + als: Mein Bruder ist älter als ich (Anh trai tôi lớn tuổi hơn tôi).',
      'So sánh nhất: am + Tính từ thêm đuôi "-sten" (hoặc -esten nếu kết thúc bằng d, t, s, z): Er läuft am schnellsten.',
      'Tính từ ngắn có a, o, u thường biến âm: alt → älter → am ältesten; groß → größer → am größten; warm → wärmer → am wärmsten.',
      'Các trường hợp bất quy tắc bắt buộc thuộc: gut → besser → am besten; viel → mehr → am meisten; gern → lieber → am liebsten; teuer → teurer → am teuersten.',
    ],
    examples: [
      { de: 'Er ist so fleißig wie seine Schwester.', vi: 'Anh ấy chăm chỉ như em gái mình.', note: 'So sánh bằng: so... wie' },
      { de: 'Der Zug fährt schneller als der Bus.', vi: 'Tàu hỏa chạy nhanh hơn xe buýt.', note: 'So sánh hơn: schneller als' },
      { de: 'Welches Obst schmeckt dir am besten? — Die Mango.', vi: 'Loại quả nào bạn thích ăn nhất? — Quả xoài.', note: 'am besten (bất quy tắc)' },
    ],
  },
  {
    id: 'untrennbare_verben',
    title: 'Động từ không tách (Untrennbare Verben)',
    shortSummary: 'Các tiền tố be-, ge-, emp-, ent-, er-, ver-, zer- không bao giờ tách!',
    formula: 'Chủ ngữ + Động từ (không tách) + ... | Perfekt: KHÔNG có tiền tố ge-',
    explanation: 'Trái ngược với động từ tách (Trennbare Verben), những động từ mang một trong các tiền tố sau đây KHÔNG BAO GIỜ bị tách rời khỏi gốc trong bất kỳ câu nào.',
    rules: [
      'Ghi nhớ 7 tiền tố không tách: be-, emp-, ent-, er-, ge-, miss-, ver-, zer- (Câu vần: "Bà Em Ép Em Gặp Mẹ Vợ Zữ").',
      'Trong câu khẳng định: tiền tố dính liền với gốc: Ich verstehe das Wort. / Er bezahlt die Rechnung.',
      'Trong thì quá khứ Perfekt: Tuyệt đối KHÔNG chèn thêm "ge-": bezahlen → hat bezahlt (không phải hat gebezahlt); verstehen → hat verstanden; bekommen → hat bekommen.',
      'Trọng âm câu: Trọng âm luôn rơi vào gốc động từ, không bao giờ rơi vào tiền tố không tách.',
    ],
    examples: [
      { de: 'Ich verstehe die deutsche Grammatik sehr gut.', vi: 'Tôi hiểu ngữ pháp tiếng Đức rất rõ.', note: 'ver- không tách' },
      { de: 'Er hat die Rechnung im Restaurant mit Karte bezahlt.', vi: 'Anh ấy đã thanh toán hóa đơn ở nhà hàng bằng thẻ.', note: 'Perfekt: bezahlt (không có ge-)' },
      { de: 'Wir haben gestern ein schönes Paket bekommen.', vi: 'Hôm qua chúng tôi đã nhận được một kiện hàng đẹp.', note: 'bekommen (Perfekt: bekommen)' },
    ],
  },
  {
    id: 'sein_haben_werden',
    title: '5.10 & 6.2 Động từ Sein, Haben, Werden & Quá khứ Präteritum (war, hatte)',
    shortSummary: 'Ba động từ nền tảng và 2 dạng quá khứ Präteritum hay gặp nhất ở A1.',
    formula: 'sein (bin, bist, ist...) | haben (habe, hast, hat...) | war (đã ở/là) | hatte (đã có)',
    explanation: 'sein và haben là 2 trợ động từ quan trọng nhất của tiếng Đức. Ở trình độ A1, ngoài thì Perfekt, học viên cần nhận biết và sử dụng thành thạo thì quá khứ đơn Präteritum của sein (war) và haben (hatte).',
    rules: [
      'sein ở hiện tại: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.',
      'haben ở hiện tại: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.',
      'werden (trở thành): ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden.',
      'Präteritum của sein: ich war, du warst, er/sie/es war, wir waren, ihr wart, sie/Sie waren.',
      'Präteritum của haben: ich hatte, du hattest, er/sie/es hatte, wir hatten, ihr hattet, sie/Sie hatten.',
      'Thay vì nói "Ich bin krank gewesen", người Đức thường nói ngắn gọn: "Gestern war ich krank."',
    ],
    examples: [
      { de: 'Gestern war ich zu Hause, weil ich müde war.', vi: 'Hôm qua tôi đã ở nhà vì tôi bị mệt.', note: 'ich war (Präteritum của sein)' },
      { de: 'Als Kind hatte ich einen kleinen Hund.', vi: 'Khi còn nhỏ tôi đã từng có một chú cún con.', note: 'ich hatte (Präteritum của haben)' },
      { de: 'Im September werde ich zwanzig Jahre alt.', vi: 'Vào tháng Chín tôi sẽ tròn hai mươi tuổi.', note: 'werden (trở thành/bước sang tuổi)' },
    ],
  },
  {
    id: 'pluralregeln',
    title: '3. Quy tắc số nhiều & Mẹo nhận biết giống danh từ (der/die/das)',
    shortSummary: 'Dấu hiệu nhận biết giống từ đuôi từ và cách suy luận số nhiều.',
    formula: 'Mẹo giống: -ung, -heit, -keit, -schaft, -tion = die | -chen, -lein, -um = das | -or, -ling = der',
    explanation: 'Mặc dù giống danh từ tiếng Đức có vẻ bất quy tắc, nhưng có rất nhiều hậu tố (đuôi từ) giúp bạn xác định chính xác 100% giống và dạng số nhiều của danh từ.',
    rules: [
      'Luôn là GIỐNG CÁI (die) + số nhiều thêm -en/-n: đuôi -ung (Wohnung), -heit (Gesundheit), -keit (Pünktlichkeit), -schaft (Freundschaft), -tion (Lektion), -tät (Universität), -ei (Bäckerei).',
      'Luôn là GIỐNG TRUNG (das) + số nhiều -s hoặc không đổi: đuôi giảm nhẹ -chen (Brötchen, Mädchen), -lein (Fräulein), từ mượn tiếng Anh -y (Handy, Baby → Babys).',
      'Thường là GIỐNG ĐỰC (der) + số nhiều -e hoặc không đổi: đuôi chỉ người làm nghề -er (Lehrer, Schüler), đuôi -or (Motor), -ling (Frühling).',
      'Số nhiều ở danh từ giống đực/trung ngắn 1 âm tiết thường thêm đuôi "-e" và thêm biến âm: der Tisch → Tische; der Stuhl → Stühle; der Tag → Tage; das Buch → Bücher.',
      'Quy tắc vàng: Mọi danh từ số nhiều ở Nominativ và Akkusativ đều có mạo từ xác định là "die"!',
    ],
    examples: [
      { de: 'die Wohnung → die Wohnungen', vi: 'căn hộ → những căn hộ', note: 'đuôi -ung luôn là die + số nhiều -en' },
      { de: 'das Brötchen → die Brötchen', vi: 'bánh mì nhỏ → những chiếc bánh mì nhỏ', note: 'đuôi -chen luôn là das + số nhiều không đổi' },
      { de: 'der Lehrer → die Lehrer', vi: 'thầy giáo → những thầy giáo', note: 'đuôi -er nghề nghiệp không đổi dạng' },
      { de: 'das Kind → die Kinder', vi: 'đứa trẻ → những đứa trẻ', note: 'thêm -er' },
    ],
  },
];

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  ...BASE_GRAMMAR_TOPICS.map((t) => ({ ...t, level: (t.level || 'A1') as 'A1' | 'A2' | 'B1' })),
  ...GRAMMAR_TOPICS_A2_B1,
];

export {
  ADJEKTIV_MIT_BESTIMMT,
  ADJEKTIV_MIT_UNBESTIMMT,
  ADJEKTIV_OHNE_ARTIKEL,
  RELATIVPRONOMEN_DATA,
  REFLEXIVE_PRONOUNS_DATA,
  GENITIV_PREPOSITIONS_DATA,
  VERBEN_MIT_PRAEPOSITIONEN,
  GRAMMAR_TOPICS_A2_B1,
} from './grammarA2B1';
export type { AdjectiveEndingRow, RelativPronounRow, ReflexivePronounRow, GenitivPrepositionItem, VerbPrepItem } from './grammarA2B1';

export interface ModalVerbRow {
  verb: string;
  meaning: string;
  ich: string;
  du: string;
  erSieEs: string;
  wir: string;
  ihr: string;
  sieSie: string;
  example: string;
  exampleVi: string;
}

export const MODAL_VERBS_CONJUGATION: ModalVerbRow[] = [
  {
    verb: 'können',
    meaning: 'có thể, có khả năng',
    ich: 'kann',
    du: 'kannst',
    erSieEs: 'kann',
    wir: 'können',
    ihr: 'könnt',
    sieSie: 'können',
    example: 'Ich kann gut schwimmen và Deutsch sprechen.',
    exampleVi: 'Tôi có thể bơi giỏi và nói được tiếng Đức.',
  },
  {
    verb: 'müssen',
    meaning: 'phải (bắt buộc)',
    ich: 'muss',
    du: 'musst',
    erSieEs: 'muss',
    wir: 'müssen',
    ihr: 'müsst',
    sieSie: 'müssen',
    example: 'Wir müssen heute für die Deutschprüfung lernen.',
    exampleVi: 'Hôm nay chúng tôi phải học cho kỳ thi tiếng Đức.',
  },
  {
    verb: 'dürfen',
    meaning: 'được phép / cấm đoán',
    ich: 'darf',
    du: 'darfst',
    erSieEs: 'darf',
    wir: 'dürfen',
    ihr: 'dürft',
    sieSie: 'dürfen',
    example: 'Hier darf man nicht rauchen.',
    exampleVi: 'Ở đây không được phép hút thuốc.',
  },
  {
    verb: 'sollen',
    meaning: 'nên làm, được yêu cầu',
    ich: 'soll',
    du: 'sollst',
    erSieEs: 'soll',
    wir: 'sollen',
    ihr: 'sollt',
    sieSie: 'sollen',
    example: 'Der Arzt sagt, ich soll viel Wasser trinken.',
    exampleVi: 'Bác sĩ bảo tôi nên uống nhiều nước.',
  },
  {
    verb: 'wollen',
    meaning: 'muốn, quyết tâm',
    ich: 'will',
    du: 'willst',
    erSieEs: 'will',
    wir: 'wollen',
    ihr: 'wollt',
    sieSie: 'wollen',
    example: 'Ich will im nächsten Sommer nach Deutschland reisen.',
    exampleVi: 'Mùa hè tới tôi muốn đi du lịch Đức.',
  },
  {
    verb: 'möchten',
    meaning: 'muốn (lịch sự)',
    ich: 'möchte',
    du: 'möchtest',
    erSieEs: 'möchte',
    wir: 'möchten',
    ihr: 'möchtet',
    sieSie: 'möchten',
    example: 'Ich möchte bitte einen Kaffee mit Milch bestellen.',
    exampleVi: 'Làm ơn cho tôi gọi một tách cà phê có sữa.',
  },
  {
    verb: 'mögen',
    meaning: 'thích (vật / người)',
    ich: 'mag',
    du: 'magst',
    erSieEs: 'mag',
    wir: 'mögen',
    ihr: 'mögt',
    sieSie: 'mögen',
    example: 'Ich mag Schokolade und Obst sehr gerne.',
    exampleVi: 'Tôi rất thích sô-cô-la và hoa quả tươi.',
  },
];

