export type Gender = 'masculine' | 'feminine' | 'neuter' | 'plural_only' | 'none';

export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'question' | 'conjunction' | 'preposition';

export type CategoryKey =
  | 'all'
  | 'family'
  | 'professions'
  | 'berufe'
  | 'clothing'
  | 'kleidung'
  | 'body'
  | 'koerper'
  | 'colors'
  | 'farben'
  | 'nature'
  | 'wetter'
  | 'animals'
  | 'school'
  | 'housing'
  | 'food'
  | 'time'
  | 'travel'
  | 'verbs'
  | 'adjectives'
  | 'questions'
  | 'clothing_body';

export interface CategoryInfo {
  key: CategoryKey;
  label: string;
  iconName: string;
  count?: number;
  description: string;
}

export interface VerbConjugation {
  ich: string;
  du: string;
  erSieEs: string;
  wir: string;
  ihr: string;
  sieSie: string;
  pastPerfekt?: string;
  hilfsverb?: 'haben' | 'sein';
  isIrregular?: boolean;
  isSeparable?: boolean;
}

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'A1.1' | 'A1.2' | 'A2.1' | 'A2.2' | 'B1.1' | 'B1.2';

export interface VocabularyItem {
  id: string;
  german: string; // e.g. "r Mann", "e Frau", "s Kind", "essen", "gut"
  word: string; // pure word for audio & search, e.g. "Mann"
  article?: 'der' | 'die' | 'das';
  gender: Gender;
  vietnamese: string;
  partOfSpeech: PartOfSpeech;
  category: CategoryKey;
  plural?: string;
  pluralRule?: string; // e.g. "Thêm -er + biến âm"
  example: string;
  exampleVi: string;
  example2?: string;
  example2Vi?: string;
  level: CEFRLevel;
  conjugation?: VerbConjugation;
  caseUsage?: string; // e.g. "Đi với Akkusativ", "Đi với Dativ"
  notes?: string;
  english?: string;
}

export type ActiveTab = 'lookup' | 'declension' | 'grammar' | 'flashcards' | 'quiz' | 'cheatsheet';
