import { VocabularyItem, Gender } from '../types';

/**
 * Derives standard German dictionary plural notation:
 * - Mann, Männer -> "-er  (r Mann, "-er)
 * - Frau, Frauen -> -en   (e Frau, -en)
 * - Kind, Kinder -> -er   (s Kind, -er)
 * - Auto, Autos  -> -s    (s Auto, -s)
 * - Apfel, Äpfel -> "-    (r Apfel, "-)
 * - Lehrer, Lehrer -> -   (r Lehrer, -)
 * - Schülerin, Schülerinnen -> -nen (e Schülerin, -nen)
 * - Stadt, Städte -> "-e  (e Stadt, "-e)
 * - Mutter, Mütter -> "-  (e Mutter, "-)
 * - Milch, (không có số nhiều) -> -Sg (e Milch, -Sg)
 * - Eltern, (chỉ dùng số nhiều) -> -Pl (e Eltern, -Pl)
 */
export function getPluralNotation(word: string, plural?: string, gender?: Gender): string {
  if (gender === 'plural_only') return '-Pl';

  if (
    !plural ||
    !plural.trim() ||
    plural.startsWith('—') ||
    plural.startsWith('-') ||
    plural.includes('không') ||
    plural.includes('khong') ||
    plural.toLowerCase().includes('nur sg') ||
    plural.toLowerCase().includes('kein pl')
  ) {
    return '-Sg';
  }

  const cleanWord = word.trim();
  // Strip annotations such as "(die Männer)" or "/ Pullis"
  const cleanPlural = plural
    .split('(')[0]
    .split('/')[0]
    .replace(/^die\s+/i, '')
    .trim();

  if (!cleanPlural || cleanPlural === '—' || cleanPlural === '-') {
    return '-Sg';
  }

  // Exact same word
  if (cleanWord.toLowerCase() === cleanPlural.toLowerCase()) {
    return '-';
  }

  // Check umlaut change:
  // Base didn't have umlaut, but plural has ä, ö, ü, äu
  const hasUmlautChange = !/[äöü]/i.test(cleanWord) && /[äöü]/i.test(cleanPlural);

  const normWord = cleanWord
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss');
  const normPlural = cleanPlural
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss');

  // Case 1: Base stems match in length (e.g. Apfel -> Äpfel, Mutter -> Mütter)
  if (normWord === normPlural) {
    return hasUmlautChange ? '"-' : '-';
  }

  // Case 2: Plural starts with base stem (e.g. Mann -> Männer, Frau -> Frauen, Kind -> Kinder)
  if (normPlural.startsWith(normWord)) {
    const suffix = normPlural.slice(normWord.length);
    return hasUmlautChange ? `"-${suffix}` : `-${suffix}`;
  }

  // Case 3: Nouns ending in -e adding -n (e.g. Hose -> Hosen, Jacke -> Jacken)
  if (cleanWord.endsWith('e') && cleanPlural.endsWith('en')) {
    return hasUmlautChange ? '"-n' : '-n';
  }

  // Case 4: Special endings (e.g. Thema -> Themen, Museum -> Museen)
  if (cleanWord.endsWith('a') && cleanPlural.endsWith('en')) return '-en';
  if (cleanWord.endsWith('um') && cleanPlural.endsWith('en')) return '-en';

  // Fallback for foreign or irregular plurals (e.g. Visum -> Visa)
  return cleanPlural;
}

/**
 * Returns formatted German text for UI display:
 * For nouns: "r Mann, \"-er", "e Frau, -en", "s Kind, -er", "e Milch, -Sg"
 * For non-nouns (verbs, adjectives): "trinken", "schnell"
 */
export function formatGermanDisplay(item: VocabularyItem): string {
  // If not a noun and no article, return as is
  if (item.partOfSpeech !== 'noun' && !item.article && item.gender === 'none') {
    return item.german;
  }

  // If item already contains the comma notation, don't double it
  if (item.german.includes(', "') || item.german.includes(', -')) {
    return item.german;
  }

  const notation = getPluralNotation(item.word, item.plural, item.gender);
  return `${item.german}, ${notation}`;
}
