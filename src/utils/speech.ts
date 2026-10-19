/**
 * Web Speech Synthesis utility for German (de-DE) pronunciation
 */

let synth: SpeechSynthesis | null = null;
let germanVoice: SpeechSynthesisVoice | null = null;

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;

  const loadVoices = () => {
    const voices = synth?.getVoices() || [];
    // Prefer de-DE native voices (Google Deutsch, Anna, Markus, etc.)
    germanVoice =
      voices.find((v) => v.lang === 'de-DE' && (v.name.includes('Google') || v.name.includes('Natural') || v.default)) ||
      voices.find((v) => v.lang.startsWith('de')) ||
      null;
  };

  loadVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }
}

export interface SpeakOptions {
  rate?: number; // 0.8 for slow, 1.0 for normal
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

export function speakGerman(text: string, options: SpeakOptions = {}): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    options.onError?.(new Error('Speech synthesis not supported'));
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    // Clean text: strip out leading shorthand "r ", "e ", "s ", "Pl. " and plural notation like ', "-er' or ', -Sg'
    const cleanedText = text
      .replace(/,\s*["\-]?[a-zA-ZäöüÄÖÜß\-]*/g, '')
      .replace(/^r\s+/, 'der ')
      .replace(/^e\s+/, 'die ')
      .replace(/^s\s+/, 'das ')
      .replace(/—.*$/, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'de-DE';
    utterance.rate = options.rate ?? 0.88; // Slightly reduced rate ideal for language learners
    utterance.pitch = options.pitch ?? 1.0;

    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) utterance.onend = options.onEnd;
    if (options.onError) utterance.onerror = options.onError;

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Failed to speak German text:', err);
    options.onError?.(err);
    return false;
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
