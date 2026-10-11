/* ==============================================================
   progress.js — Tracks which clues the player has completed.

   Saved to localStorage so a refresh doesn't wipe progress.
   Storage can be unavailable (private mode, blocked storage),
   so every access is wrapped and the game still works without it.
   ============================================================== */

const KEY = 'knp-progress-v1';
const listeners = new Set();
let solved = new Set(load());

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify([...solved]));
  } catch {
    /* storage unavailable — progress lasts for this session only */
  }
}

export function markSolved(id) {
  if (solved.has(id)) return;
  solved.add(id);
  save();
  listeners.forEach((fn) => fn(id));
}

export function isSolved(id) {
  return solved.has(id);
}

export function solvedCount(ids) {
  return ids.filter((id) => solved.has(id)).length;
}

export function onSolved(fn) {
  listeners.add(fn);
}

export function resetProgress() {
  solved = new Set();
  save();
  listeners.forEach((fn) => fn(null));
}
