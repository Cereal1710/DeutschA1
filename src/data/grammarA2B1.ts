import { GrammarTopic } from './grammar';

// =========================================================================
// BẢNG CHIA ĐUÔI TÍNH TỪ TOÀN DIỆN (Adjektivdeklination: A1 / A2 / B1)
// =========================================================================
export interface AdjectiveEndingRow {
  caseName: 'Nom' | 'Akk' | 'Dat' | 'Gen';
  masculine: string;
  feminine: string;
  neuter: string;
  plural: string;
}

export const ADJEKTIV_MIT_BESTIMMT: AdjectiveEndingRow[] = [
  { caseName: 'Nom', masculine: 'der alte Mann (-e)', feminine: 'die junge Frau (-e)', neuter: 'das kleine Kind (-e)', plural: 'die guten Freunde (-en)' },
  { caseName: 'Akk', masculine: 'den alten Mann (-en)', feminine: 'die junge Frau (-e)', neuter: 'das kleine Kind (-e)', plural: 'die guten Freunde (-en)' },
  { caseName: 'Dat', masculine: 'dem alten Mann (-en)', feminine: 'der jungen Frau (-en)', neuter: 'dem kleinen Kind (-en)', plural: 'den guten Freunden (-en)' },
  { caseName: 'Gen', masculine: 'des alten Mannes (-en)', feminine: 'der jungen Frau (-en)', neuter: 'des kleinen Kindes (-en)', plural: 'der guten Freunde (-en)' },
];

export const ADJEKTIV_MIT_UNBESTIMMT: AdjectiveEndingRow[] = [
  { caseName: 'Nom', masculine: 'ein alter Mann (-er)', feminine: 'eine junge Frau (-e)', neuter: 'ein kleines Kind (-es)', plural: 'meine guten Freunde (-en)' },
  { caseName: 'Akk', masculine: 'einen alten Mann (-en)', feminine: 'eine junge Frau (-e)', neuter: 'ein kleines Kind (-es)', plural: 'meine guten Freunde (-en)' },
  { caseName: 'Dat', masculine: 'einem alten Mann (-en)', feminine: 'einer jungen Frau (-en)', neuter: 'einem kleinen Kind (-en)', plural: 'meinen guten Freunden (-en)' },
  { caseName: 'Gen', masculine: 'eines alten Mannes (-en)', feminine: 'einer jungen Frau (-en)', neuter: 'eines kleinen Kindes (-en)', plural: 'meiner guten Freunde (-en)' },
];

export const ADJEKTIV_OHNE_ARTIKEL: AdjectiveEndingRow[] = [
  { caseName: 'Nom', masculine: 'kalter Tee (-er)', feminine: 'frische Milch (-e)', neuter: 'kühles Bier (-es)', plural: 'warme Schuhe (-e)' },
  { caseName: 'Akk', masculine: 'kalten Tee (-en)', feminine: 'frische Milch (-e)', neuter: 'kühles Bier (-es)', plural: 'warme Schuhe (-e)' },
  { caseName: 'Dat', masculine: 'kaltem Tee (-em)', feminine: 'frischer Milch (-er)', neuter: 'kühlem Bier (-em)', plural: 'warmen Schuhen (-en)' },
  { caseName: 'Gen', masculine: 'kalten Tees (-en)', feminine: 'frischer Milch (-er)', neuter: 'kühlen Bieres (-en)', plural: 'warmer Schuhe (-er)' },
];

// =========================================================================
// ĐẠI TỪ QUAN HỆ (Relativpronomen: A2 & B1)
// =========================================================================
export interface RelativPronounRow {
  caseName: 'Nom' | 'Akk' | 'Dat' | 'Gen';
  masculine: string;
  feminine: string;
  neuter: string;
  plural: string;
  example: string;
  exampleVi: string;
}

export const RELATIVPRONOMEN_DATA: RelativPronounRow[] = [
  {
    caseName: 'Nom',
    masculine: 'der',
    feminine: 'die',
    neuter: 'das',
    plural: 'die',
    example: 'Das ist der Arzt, der mich gestern operiert hat.',
    exampleVi: 'Đó là vị bác sĩ, người đã phẫu thuật cho tôi ngày hôm qua.',
  },
  {
    caseName: 'Akk',
    masculine: 'den',
    feminine: 'die',
    neuter: 'das',
    plural: 'die',
    example: 'Hier ist die Jacke, die ich im Sonderangebot gekauft habe.',
    exampleVi: 'Đây là chiếc áo khoác mà tôi đã mua trong đợt giảm giá.',
  },
  {
    caseName: 'Dat',
    masculine: 'dem',
    feminine: 'der',
    neuter: 'dem',
    plural: 'denen (đặc biệt)',
    example: 'Das sind die Kollegen, denen ich bei der Präsentation geholfen habe.',
    exampleVi: 'Đó là những đồng nghiệp mà tôi đã giúp đỡ trong bài thuyết trình.',
  },
  {
    caseName: 'Gen',
    masculine: 'dessen',
    feminine: 'deren',
    neuter: 'dessen',
    plural: 'deren (của họ)',
    example: 'Dort drüben steht der Kollege, dessen Auto gestern beschädigt wurde.',
    exampleVi: 'Đằng kia là người đồng nghiệp có chiếc ô tô bị hư hỏng ngày hôm qua.',
  },
];

// =========================================================================
// ĐẠI TỪ PHẢN THÂN (Reflexivpronomen: A2)
// =========================================================================
export interface ReflexivePronounRow {
  person: string;
  akkusativ: string;
  dativ: string;
  exampleAkk: string;
  exampleDat: string;
}

export const REFLEXIVE_PRONOUNS_DATA: ReflexivePronounRow[] = [
  { person: 'ich (tôi)', akkusativ: 'mich', dativ: 'mir', exampleAkk: 'Ich freue mich.', exampleDat: 'Ich wasche mir die Hände.' },
  { person: 'du (bạn)', akkusativ: 'dich', dativ: 'dir', exampleAkk: 'Freust du dich?', exampleDat: 'Putz dir die Zähne!' },
  { person: 'er/sie/es (anh/cô/nó)', akkusativ: 'sich', dativ: 'sich', exampleAkk: 'Er rasiert sich.', exampleDat: 'Sie kämmt sich die Haare.' },
  { person: 'wir (chúng tôi)', akkusativ: 'uns', dativ: 'uns', exampleAkk: 'Wir treffen uns.', exampleDat: 'Wir ziehen uns warme Jacken an.' },
  { person: 'ihr (các bạn)', akkusativ: 'euch', dativ: 'euch', exampleAkk: 'Beeilt euch!', exampleDat: 'Zieht euch die Schuhe aus!' },
  { person: 'sie/Sie (họ/ngài)', akkusativ: 'sich', dativ: 'sich', exampleAkk: 'Sie setzen sich.', exampleDat: 'Wünschen Sie sich etwas!' },
];

// =========================================================================
// GIỚI TỪ ĐI VỚI GENITIV (B1)
// =========================================================================
export interface GenitivPrepositionItem {
  prep: string;
  meaning: string;
  example: string;
  exampleVi: string;
  note: string;
}

export const GENITIV_PREPOSITIONS_DATA: GenitivPrepositionItem[] = [
  {
    prep: 'wegen',
    meaning: 'bởi vì, do',
    example: 'Wegen des schlechten Wetters fiel der Flug nach Frankfurt aus.',
    exampleVi: 'Do thời tiết xấu chuyến bay đi Frankfurt đã bị hủy.',
    note: 'Danh từ đực/trung thêm -es/-s: des Wetters',
  },
  {
    prep: 'während',
    meaning: 'trong suốt thời gian, trong lúc',
    example: 'Während der Arbeitszeit darf man keine privaten Anrufe tätigen.',
    exampleVi: 'Trong giờ làm việc không được phép thực hiện các cuộc gọi cá nhân.',
    note: 'während der Arbeitszeit (cái: der)',
  },
  {
    prep: 'trotz',
    meaning: 'mặc dù, bất chấp',
    example: 'Trotz der starken Erkältung ging die engagierte Studentin zur Prüfung.',
    exampleVi: 'Mặc dù bị cảm lạnh nặng, nữ sinh viên chăm chỉ vẫn đi thi.',
    note: 'trotz der Erkältung',
  },
  {
    prep: '(an)statt',
    meaning: 'thay vì, thay cho',
    example: 'Statt einer teuren Flugreise machten sie Urlaub am Bodensee.',
    exampleVi: 'Thay vì một chuyến du lịch máy bay đắt đỏ, họ đã nghỉ dưỡng bên hồ Bodensee.',
    note: 'statt + Genitiv',
  },
  {
    prep: 'innerhalb',
    meaning: 'trong vòng (thời gian / không gian)',
    example: 'Die Rechnung muss innerhalb eines Monats bezahlt werden.',
    exampleVi: 'Hóa đơn phải được thanh toán trong vòng một tháng.',
    note: 'innerhalb eines Monats',
  },
  {
    prep: 'außerhalb',
    meaning: 'bên ngoài (thời gian / địa lý)',
    example: 'Außerhalb der Sprechzeiten wenden Sie sich bitte an den Notdienst.',
    exampleVi: 'Ngoài giờ khám bệnh xin vui lòng liên hệ dịch vụ cấp cứu trực nhật.',
    note: 'außerhalb der Öffnungszeiten',
  },
];

// =========================================================================
// ĐỘNG TỪ CÓ GIỚI TỪ CỐ ĐỊNH & WORAUF / DARAUF (Verben mit Präpositionen: A2 & B1)
// =========================================================================
export interface VerbPrepItem {
  verb: string;
  prep: string;
  caseType: 'Akkusativ' | 'Dativ';
  meaning: string;
  questionThing: string;
  questionPerson: string;
  example: string;
  exampleVi: string;
}

export const VERBEN_MIT_PRAEPOSITIONEN: VerbPrepItem[] = [
  {
    verb: 'warten',
    prep: 'auf',
    caseType: 'Akkusativ',
    meaning: 'chờ đợi ai / cái gì',
    questionThing: 'Worauf wartest du? — Auf den Bus (darauf).',
    questionPerson: 'Auf wen wartest du? — Auf meine Freundin.',
    example: 'Ich warte seit zwanzig Minuten auf den Zug nach Hamburg.',
    exampleVi: 'Tôi đợi chuyến tàu đi Hamburg được 20 phút rồi.',
  },
  {
    verb: 'sich freuen (tương lai)',
    prep: 'auf',
    caseType: 'Akkusativ',
    meaning: 'mong chờ điều sắp xảy ra trong tương lai',
    questionThing: 'Worauf freust du dich? — Auf den Urlaub.',
    questionPerson: 'Auf wen freust du dich? — Auf meine Gäste.',
    example: 'Die Mitarbeiter freuen sich riesig auf den wohlverdienten Feierabend.',
    exampleVi: 'Các nhân viên rất mong chờ giờ tan sở xứng đáng.',
  },
  {
    verb: 'sich freuen (hiện tại/quá khứ)',
    prep: 'über',
    caseType: 'Akkusativ',
    meaning: 'vui mừng về điều đã nhận được / đã xảy ra',
    questionThing: 'Worüber freust du dich? — Über das Geschenk.',
    questionPerson: 'Über wen freust du dich? — Über den Besuch.',
    example: 'Sie freut sich sehr über die Gehaltserhöhung.',
    exampleVi: 'Cô ấy rất vui mừng về đợt tăng lương.',
  },
  {
    verb: 'sich interessieren',
    prep: 'für',
    caseType: 'Akkusativ',
    meaning: 'quan tâm, hứng thú với',
    questionThing: 'Wofür interessierst du dich? — Für moderne Mode.',
    questionPerson: 'Für wen interessierst du dich? — Für den neuen Arzt.',
    example: 'Mein Kollege interessiert sich sehr für künstliche Intelligenz.',
    exampleVi: 'Đồng nghiệp của tôi rất quan tâm tới trí tuệ nhân tạo.',
  },
  {
    verb: 'denken',
    prep: 'an',
    caseType: 'Akkusativ',
    meaning: 'nghĩ về, nhớ tới',
    questionThing: 'Woran denkst du gerade? — An das Projekt.',
    questionPerson: 'An wen denkst du? — An meine Eltern.',
    example: 'Ich denke jeden Tag an meine Familie in Vietnam.',
    exampleVi: 'Mỗi ngày tôi đều nghĩ về gia đình tôi ở Việt Nam.',
  },
  {
    verb: 'träumen',
    prep: 'von',
    caseType: 'Dativ',
    meaning: 'mơ ước về, mơ thấy',
    questionThing: 'Wovon träumst du? — Von einer Weltreise.',
    questionPerson: 'Von wem träumst du? — Von meiner Freundin.',
    example: 'Er träumt seit seiner Kindheit von einer Karriere als Architekt.',
    exampleVi: 'Từ thuở nhỏ anh ấy đã mơ ước về sự nghiệp kiến trúc sư.',
  },
  {
    verb: 'gehören',
    prep: 'zu',
    caseType: 'Dativ',
    meaning: 'thuộc về, là một phần của',
    questionThing: 'Wozu gehört dieses Kabel? — Zum Drucker.',
    questionPerson: 'Zu wem gehört dieses Kind? — Zu Herrn Weber.',
    example: 'Pünktlichkeit und Zuverlässigkeit gehören zum guten Ton in Deutschland.',
    exampleVi: 'Đúng giờ và đáng tin cậy là phong thái chuẩn mực tại Đức.',
  },
  {
    verb: 'teilnehmen',
    prep: 'an',
    caseType: 'Dativ',
    meaning: 'tham gia vào (cuộc họp, khóa học)',
    questionThing: 'Woran nimmst du teil? — Am Deutschkurs B1.',
    questionPerson: 'An wem...? (ít dùng)',
    example: 'Alle Angestellten nehmen an der wichtigen Sicherheitsfortbildung teil.',
    exampleVi: 'Tất cả nhân viên đều tham gia khóa bồi dưỡng an toàn quan trọng.',
  },
  {
    verb: 'sprechen',
    prep: 'über (+ Akk) / mit (+ Dat)',
    caseType: 'Akkusativ',
    meaning: 'nói chuyện về điều gì với ai',
    questionThing: 'Worüber sprecht ihr? — Über den Arbeitsvertrag.',
    questionPerson: 'Mit wem sprichst du? — Mit der Abteilungsleiterin.',
    example: 'Der Geschäftsführer spricht mit den Ingenieuren über das Bauprojekt.',
    exampleVi: 'Giám đốc điều hành trao đổi với các kỹ sư về dự án xây dựng.',
  },
  {
    verb: 'bitten',
    prep: 'um',
    caseType: 'Akkusativ',
    meaning: 'xin, yêu cầu một cách lịch sự',
    questionThing: 'Worum bittest du? — Um Unterstützung.',
    questionPerson: 'Um wen...? (ít dùng)',
    example: 'Der Angestellte bittet seinen Vorgesetzten um eine kurze Pause.',
    exampleVi: 'Người nhân viên xin cấp trên cho nghỉ giải lao ít phút.',
  },
];

// =========================================================================
// CÁC CHỦ ĐỀ NGỮ PHÁP A2 & B1 MỞ RỘNG (GRAMMAR TOPICS A2 & B1)
// =========================================================================
export const GRAMMAR_TOPICS_A2_B1: GrammarTopic[] = [
  {
    id: 'nebensaetze_a2',
    title: 'Mệnh đề phụ A2: weil, dass, wenn, als, obwohl (Nebensätze)',
    level: 'A2',
    shortSummary: 'Động từ đã chia bắt buộc phải nằm ở vị trí CUỐI CÙNG trong mệnh đề phụ.',
    formula: 'Mệnh đề chính, [weil / dass / wenn / als / obwohl] + Chủ ngữ + ... + Động từ (cuối câu)',
    explanation: 'Mệnh đề phụ (Nebensatz) không thể đứng độc lập mà phụ thuộc vào mệnh đề chính. Dấu hiệu nhận biết quan trọng nhất là liên từ phụ thuộc đứng ở đầu mệnh đề phụ và động từ được chia luôn bị đẩy xuống tận cùng.',
    rules: [
      'weil (chỉ nguyên nhân - bởi vì): Ich bleibe im Bett, weil ich 39 Grad Fieber habe.',
      'dass (tường thuật nội dung - rằng): Die Ärztin sagt, dass die Wunde schnell heilt.',
      'wenn (điều kiện "nếu" / thói quen lặp lại "mỗi khi"): Wenn es regnet, ziehe ich meinen Regenmantel an.',
      'als (thời gian đơn nhất trong quá khứ "khi"): Als ich vor zwei Jahren nach Deutschland kam, sprach ich kaum Deutsch.',
      'obwohl (nhượng bộ "mặc dù"): Obwohl er starke Rückenschmerzen hat, arbeitet er weiter.',
      'Khi mệnh đề phụ đứng trước, mệnh đề chính bắt đầu ngay bằng động từ: "Weil ich krank bin, kann ich heute nicht arbeiten."',
    ],
    examples: [
      { de: 'Ich nehme eine Schmerztablette, weil mein Kopf furchtbar weh tut.', vi: 'Tôi uống một viên thuốc giảm đau vì đầu tôi đau kinh khủng.', note: 'tut weh ở cuối mệnh đề weil' },
      { de: 'Als ich zwanzig Jahre alt war, begann ich meine Ausbildung.', vi: 'Khi tôi hai mươi tuổi, tôi đã bắt đầu khóa học nghề của mình.', note: 'als dùng cho mốc quá khứ đơn nhất' },
      { de: 'Obwohl die Winterjacke teuer ist, kaufe ich sie.', vi: 'Mặc dù chiếc áo khoác mùa đông đắt tiền, tôi vẫn mua nó.', note: 'obwohl chỉ sự nhượng bộ' },
    ],
  },
  {
    id: 'relativsaetze_a2_b1',
    title: 'Mệnh đề quan hệ A2 – B1 (Relativsätze: der, die, das...)',
    level: 'A2',
    shortSummary: 'Dùng để bổ nghĩa giải thích thêm cho danh từ; động từ mệnh đề quan hệ nằm ở cuối câu.',
    formula: 'Danh từ + , [Relativpronomen: der / die / das / den / dem / dessen...] + S + ... + V (cuối)',
    explanation: 'Đại từ quan hệ có dạng gần giống mạo từ xác định der/die/das. Giống (đực/cái/trung/số nhiều) lấy từ danh từ được bổ nghĩa; Cách (Nom/Akk/Dat/Gen) do vai trò ngữ pháp bên trong mệnh đề quan hệ quyết định.',
    rules: [
      'Nominativ (chủ ngữ): Der Mann, der dort drüben steht, ist mein neuer Chef.',
      'Akkusativ (tân ngữ trực tiếp): Das Kleid, das sie heute trägt, ist aus reiner Seide.',
      'Dativ (tân ngữ gián tiếp): Die Kollegin, der ich geholfen habe, bedankt sich herzlich.',
      'Dativ số nhiều đặc biệt là "denen": Die Patienten, denen der Arzt hilft, sind dankbar.',
      'Genitiv (sở hữu B1 - dessen / deren): Der Architekt, dessen Entwurf gewann, hält eine Rede.',
      'Mệnh đề quan hệ có giới từ: Die Firma, in der ich arbeite, liegt im Zentrum von Frankfurt.',
    ],
    examples: [
      { de: 'Das ist der Arzt, der mich im Krankenhaus behandelt hat.', vi: 'Đó là bác sĩ, người đã điều trị cho tôi trong bệnh viện.', note: 'der (Nominativ giống đực)' },
      { de: 'Die Hose, die ich gestern anprobiert habe, passt mir perfekt.', vi: 'Chiếc quần dài mà hôm qua tôi đã mặc thử vừa vặn với tôi hoàn hảo.', note: 'die (Akkusativ giống cái)' },
      { de: 'Der Kollege, mit dem ich das Projekt leite, ist sehr zuverlässig.', vi: 'Người đồng nghiệp mà tôi cùng phụ trách dự án rất đáng tin cậy.', note: 'mit dem (Dativ đi với giới từ mit)' },
    ],
  },
  {
    id: 'reflexive_verben_a2',
    title: 'Động từ phản thân A2 (Reflexive Verben: sich freuen, sich anziehen)',
    level: 'A2',
    shortSummary: 'Chủ ngữ và tân ngữ là cùng một người; đi kèm đại từ phản thân sich.',
    formula: 'Chủ ngữ + Động từ phản thân + Reflexivpronomen (mich/mir, dich/dir, sich, uns, euch, sich)',
    explanation: 'Động từ phản thân diễn tả hành động quay trở lại chính chủ ngữ. Phần lớn đi với Akkusativ (mich, dich, sich...). Chỉ dùng Dativ (mir, dir...) khi câu đã có một tân ngữ trực tiếp Akkusativ khác.',
    rules: [
      'Phản thân Akkusativ: Ich ziehe mich an (Tôi mặc quần áo). Er freut sich (Anh ấy vui mừng).',
      'Phản thân Dativ (khi có tân ngữ cụ thể): Ich ziehe mir die warme Jacke an (die Jacke là Akk → mir là Dat).',
      'Các động từ A2 thông dụng: sich anziehen (mặc vào), sich ausziehen (cởi ra), sich waschen (tắm rửa), sich beeilen (nhanh lên), sich ausruhen (nghỉ ngơi), sich verabreden (hẹn hò).',
      'Đại từ phản thân ngôi er/sie/es/sie/Sie luôn luôn là "sich".',
    ],
    examples: [
      { de: 'Ich muss mich nach der anstrengenden Schicht erst einmal ausruhen.', vi: 'Sau ca làm việc vất vả trước tiên tôi phải nghỉ ngơi tĩnh dưỡng đã.', note: 'sich ausruhen (Akk: mich)' },
      { de: 'Zieh dir bitte sofort die nassen Schuhe aus!', vi: 'Bạn hãy cởi ngay đôi giày ướt ra đi!', note: 'die Schuhe (Akk) → dir (Dativ)' },
      { de: 'Wir treffen uns morgen um 18 Uhr vor dem Restaurant.', vi: 'Chúng tôi hẹn gặp nhau vào lúc 18 giờ ngày mai trước nhà hàng.', note: 'sich treffen (uns)' },
    ],
  },
  {
    id: 'passiv_b1',
    title: 'Thể bị động B1 (Vorgangspassiv & Passiv mit Modalverben)',
    level: 'B1',
    shortSummary: 'Tập trung vào hành động xảy ra; công thức werden chia + Partizip II ở cuối.',
    formula: 'Hiện tại: werden + Partizip II | Quá khứ: wurden + Partizip II | Modalverb: Modalverb + Partizip II + werden',
    explanation: 'Thể bị động Vorgangspassiv diễn tả một quá trình hành động đang diễn ra. Tân ngữ Akkusativ của câu chủ động biến thành Chủ ngữ Nominativ trong câu bị động. Tác nhân thực hiện hành động được diễn đạt bằng "von + Dativ" hoặc "durch + Akkusativ".',
    rules: [
      'Bị động hiện tại (Präsens): Das Auto wird repariert (Chiếc ô tô đang được sửa).',
      'Bị động quá khứ (Präteritum): Das Gebäude wurde 1995 erbaut (Tòa nhà đã được xây vào năm 1995).',
      'Bị động hoàn thành (Perfekt): Der Patient ist erfolgreich operiert worden (chú ý: worden, không phải geworden).',
      'Bị động với Modalverb: Die Bewerbung muss vor dem Monatsende abgeschickt werden.',
      'Chỉ người làm: von + Dativ (Der Kranke wird vom Chefarzt untersucht).',
      'Chỉ phương tiện/nguyên nhân: durch + Akkusativ (Die Wunde wurde durch ein scharfes Messer verursacht).',
    ],
    examples: [
      { de: 'In dieser modernen Klinik werden täglich über fünfzig Patienten operiert.', vi: 'Tại bệnh viện hiện đại này hơn năm mươi bệnh nhân được phẫu thuật mỗi ngày.', note: 'werden + operiert' },
      { de: 'Die Arbeitsverträge wurden gestern von der Geschäftsführerin unterschrieben.', vi: 'Hợp đồng lao động đã được nữ giám đốc điều hành ký duyệt ngày hôm qua.', note: 'wurden + Partizip II' },
      { de: 'Die Überstunden müssen bis zum Jahresende abgebaut werden.', vi: 'Các giờ làm tăng ca phải được giải quyết nghỉ bù trước cuối năm.', note: 'Modalverb + Partizip II + werden' },
    ],
  },
  {
    id: 'konjunktiv2_b1',
    title: 'Thể giả định Konjunktiv II: hätte, wäre, würde (B1)',
    level: 'B1',
    shortSummary: 'Diễn tả mong ước không có thật, lời khuyên và câu đề nghị lịch sự trang trọng.',
    formula: 'Ước muốn: Wenn ich reich wäre... | Lời khuyên: Du solltest... | Yêu cầu lịch sự: Könnten/Würden Sie bitte...',
    explanation: 'Konjunktiv II diễn tả những tình huống trái ngược với thực tế ở hiện tại, thể hiện mong muốn, giả định hoặc dùng để giao tiếp khéo léo, lịch sự khi nhờ vả, xin việc và đưa ra lời khuyên.',
    rules: [
      'wäre (thay cho sein): Wenn ich krank wäre, bliebe ich zu Hause. (Nếu tôi bị ốm tôi đã ở nhà).',
      'hätte (thay cho haben): Wenn ich mehr Berufserfahrung hätte, bekäme ich ein höheres Gehalt.',
      'sollte (đưa lời khuyên): Bei so starken Bauchschmerzen solltest du unbedingt zum Facharzt gehen.',
      'würde + Infinitiv: áp dụng cho tất cả các động từ còn lại: Ich würde gerne dieses Kleid in Größe M anprobieren.',
      'Könnten Sie / Hätten Sie: đề nghị lịch thiệp: Könnten Sie mir bitte die Speisekarte bringen?',
    ],
    examples: [
      { de: 'Wenn ich Chefarzt wäre, würde ich die Arbeitsbedingungen verbessern.', vi: 'Nếu tôi là bác sĩ trưởng khoa, tôi sẽ cải thiện điều kiện làm việc.', note: 'wäre + würde verbessern' },
      { de: 'Hätten Sie morgen Vormittag Zeit für ein kurzes Vorstellungsgespräch?', vi: 'Liệu ngài có thể dành chút thời gian sáng mai cho một buổi phỏng vấn ngắn được không ạ?', note: 'Câu hỏi lịch sự trang trọng' },
      { de: 'Du siehst blass aus, du solltest dich heute im Bett ausruhen.', vi: 'Trông bạn xanh xao quá, bạn nên nằm trên giường nghỉ ngơi hôm nay đi.', note: 'solltest (lời khuyên y tế)' },
    ],
  },
  {
    id: 'infinitiv_um_zu_damit_b1',
    title: 'Mệnh đề chỉ mục đích: um... zu + Infinitiv & damit (B1)',
    level: 'B1',
    shortSummary: 'um... zu khi 2 vế cùng chủ ngữ; damit khi hai vế khác chủ ngữ.',
    formula: 'Cùng S: Mệnh đề chính, um + ... + zu + V_Infinitiv | Khác S: Mệnh đề chính, damit + S + ... + V (cuối)',
    explanation: 'Cả hai cấu trúc đều trả lời cho câu hỏi "Wozu?" (Để làm gì?). Tuy nhiên "um... zu" chỉ dùng khi chủ thể hành động ở cả hai vế là một; còn "damit" là liên từ phụ thuộc có thể dùng cho cả trường hợp cùng hoặc khác chủ ngữ.',
    rules: [
      'um... zu (cùng chủ ngữ): Er macht Überstunden, um mehr Geld zu verdienen. (Anh ấy tăng ca để kiếm thêm tiền).',
      'Động từ tách chèn "zu" vào giữa: um die Jacke anzuziehen, um die Tür aufzumachen.',
      'damit (khác chủ ngữ): Die Ärztin gibt dem Kind eine Spritze, damit das Fieber schnell sinkt. (Bác sĩ tiêm để cơn sốt của bé hạ nhanh).',
      'Infinitiv mit zu thông dụng: es ist wichtig, Sport zu treiben / Lust haben, ins Kino zu gehen / vergessen, die Rechnung zu bezahlen.',
    ],
    examples: [
      { de: 'Ich lerne fleißig Deutsch, um eine qualifizierte Ausbildung in Berlin zu machen.', vi: 'Tôi chăm chỉ học tiếng Đức để theo học một khóa đào tạo nghề chất lượng tại Berlin.', note: 'um + zu machen (cùng chủ ngữ ich)' },
      { de: 'Der Meister erklärt den Plan genau, damit die Handwerker keine Fehler machen.', vi: 'Người thợ cả giải thích cặn kẽ bản vẽ để các thợ phụ không phạm sai sót.', note: 'damit dùng khi khác chủ ngữ' },
      { de: 'Vergiss bitte nicht, vor dem Verlassen des Büros das Licht auszumachen!', vi: 'Xin đừng quên tắt điện trước khi rời khỏi văn phòng nhé!', note: 'Infinitiv mit zu: auszumachen' },
    ],
  },
  {
    id: 'zweiteilige_konnektoren_b1',
    title: 'Liên từ kép hai thành phần (Zweiteilige Konnektoren - B1)',
    level: 'B1',
    shortSummary: 'Các cặp liên từ song hành giúp diễn đạt mạch lạc, nâng cao điểm số thi viết và nói B1.',
    formula: 'sowohl... als auch | nicht nur... sondern auch | weder... noch | entweder... oder | zwar... aber | je... desto',
    explanation: 'Liên từ kép liên kết hai vế tương đương nhau về mặt ngữ pháp, giúp câu văn trở nên phong phú, tự nhiên và mang tính học thuật cao trong các kỳ thi B1.',
    rules: [
      'sowohl ... als auch (vừa... vừa...): Der Bewerber spricht sowohl Deutsch als auch Englisch verhandlungssicher.',
      'nicht nur ... sondern auch (không những... mà còn...): Diese Klinik hat nicht nur exzellente Ärzte, sondern auch modernste Geräte.',
      'weder ... noch (cả hai đều không): Der Patient spürt weder Schmerzen noch Schwindel.',
      'entweder ... oder (hoặc là... hoặc là...): Sie arbeiten entweder in Vollzeit oder in Teilzeit.',
      'zwar ... aber (tuy... nhưng...): Die Arbeitsstelle ist zwar anstrengend, aber sehr gut bezahlt.',
      'je ... desto/umso (càng... thì càng...): Je mehr Berufserfahrung man hat, desto höhere Chancen hat man.',
    ],
    examples: [
      { de: 'Er ist sowohl fachlich kompetent als auch menschlich sehr sympathisch.', vi: 'Anh ấy vừa giỏi về chuyên môn lại vừa rất dễ mến về tính cách con người.', note: 'sowohl... als auch' },
      { de: 'Je früher eine Krankheit diagnostiziert wird, umso besser kann sie geheilt werden.', vi: 'Căn bệnh càng được chẩn đoán sớm bao nhiêu thì càng có thể chữa lành tốt bấy nhiêu.', note: 'je... umso (so sánh kép)' },
      { de: 'Dieses hochwertige Hemd ist zwar ziemlich teuer, aber aus bester Baumwolle.', vi: 'Chiếc áo sơ mi cao cấp này tuy khá đắt tiền nhưng làm từ loại cotton tốt nhất.', note: 'zwar... aber' },
    ],
  },
  {
    id: 'genitiv_praepositionen_b1',
    title: 'Cách sở hữu Genitiv & Giới từ đi với Genitiv (B1)',
    level: 'B1',
    shortSummary: 'Chỉ sự sở hữu và các giới từ quan trọng trong văn phong hành chính và báo chí B1.',
    formula: 'des + Danh từ -es/-s (đực, trung) | der + Danh từ (cái, số nhiều) | wegen / während / trotz / statt + Genitiv',
    explanation: 'Genitiv là cách thứ tư trong tiếng Đức. Ở trình độ A1 học viên gặp cách sở hữu qua tên người (Peters Buch), nhưng ở B1 cách Genitiv xuất hiện thường xuyên qua các giới từ wegen, während, trotz, (an)statt và bổ nghĩa sở hữu giữa hai danh từ.',
    rules: [
      'Biến cách mạo từ Genitiv: des Mannes (-es), der Frau, des Kindes (-es), der Freunde.',
      'wegen + Genitiv: Wegen eines schweren Unfalls auf der Autobahn kam der Notarzt zu spät.',
      'während + Genitiv: Während der Operation durfte niemand den Saal betreten.',
      'trotz + Genitiv: Trotz der großen Hitze trug der Manager einen dunklen Anzug mit Krawatte.',
      'statt + Genitiv: Statt eines stationären Aufenthalts empfahl der Arzt eine ambulante Therapie.',
    ],
    examples: [
      { de: 'Wegen des Streiks der Eisenbahner fielen heute alle Züge aus.', vi: 'Vì cuộc đình công của công nhân đường sắt, tất cả các chuyến tàu hôm nay đã bị hủy.', note: 'wegen des Streiks' },
      { de: 'Während meines Praktikums in Berlin lernte ich viele nette Kollegen kennen.', vi: 'Trong thời gian thực tập tại Berlin tôi đã làm quen được với nhiều đồng nghiệp tốt bụng.', note: 'während meines Praktikums' },
      { de: 'Trotz des hohen Preises entschied sie sich für die Seidenbluse.', vi: 'Bất chấp mức giá cao cô ấy vẫn quyết định chọn chiếc áo sơ mi lụa.', note: 'trotz des hohen Preises' },
    ],
  },
];
