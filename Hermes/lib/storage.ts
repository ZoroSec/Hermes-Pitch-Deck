import { DeckContent, emptyDeck } from "./deck";

const KEY = "heremes.deck.v1";

export function loadDeck(): DeckContent {
  if (typeof window === "undefined") return emptyDeck();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyDeck();
    const parsed = JSON.parse(raw) as DeckContent;
    // Merge with empty to tolerate schema changes
    const base = emptyDeck();
    for (const id of Object.keys(base)) {
      base[id] = { ...base[id], ...(parsed[id] ?? {}) };
    }
    return base;
  } catch {
    return emptyDeck();
  }
}

export function saveDeck(deck: DeckContent): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(deck));
  } catch {
    /* ignore quota errors */
  }
}

export function clearDeck(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
