import { VocabularyItem } from '../types/index';
import { VOCABULARY_LIST } from '../data/vocabulary';

const CUSTOM_VOCAB_STORAGE_KEY = 'deutsch_custom_vocabulary_v1';
export const ADMIN_PASSWORD = 'admin1234';

/**
 * Check if admin is currently authenticated (always returns false to enforce password entry every time)
 */
export function isAdminAuthenticated(): boolean {
  return false;
}

/**
 * Verify admin password
 */
export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

/**
 * Clear admin authentication
 */
export function logoutAdmin(): void {
  // no-op
}

/**
 * Load custom user-added vocabulary from localStorage
 */
export function loadCustomVocabulary(): VocabularyItem[] {
  try {
    const raw = localStorage.getItem(CUSTOM_VOCAB_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Error reading custom vocabulary from localStorage', err);
    return [];
  }
}

/**
 * Save a new vocabulary item to localStorage
 */
export function saveCustomVocabularyItem(item: VocabularyItem): VocabularyItem[] {
  try {
    const existing = loadCustomVocabulary();
    // Prepend new item
    const updated = [item, ...existing.filter((w) => w.id !== item.id)];
    localStorage.setItem(CUSTOM_VOCAB_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save custom vocabulary item', err);
    return [];
  }
}

/**
 * Delete a custom vocabulary item from localStorage
 */
export function deleteCustomVocabularyItem(id: string): VocabularyItem[] {
  try {
    const existing = loadCustomVocabulary();
    const updated = existing.filter((w) => w.id !== id);
    localStorage.setItem(CUSTOM_VOCAB_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete custom vocabulary item', err);
    return [];
  }
}

/**
 * Get all vocabulary combined (base system list + custom user-added words)
 */
export function getAllVocabulary(customWords?: VocabularyItem[]): VocabularyItem[] {
  const custom = customWords ?? loadCustomVocabulary();
  return [...custom, ...VOCABULARY_LIST];
}
