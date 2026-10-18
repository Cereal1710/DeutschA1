/**
 * German A1 Grammar Reference and Interactive Explanations
 */

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
  shortSummary: string;
  formula: string;
  explanation: string;
  rules: string[];
  examples: { de: string; vi: string; note?: string }[];
}

export const GRAMMAR_TOPICS: GrammarTopic[] = [
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
];
