/* ===================================================
   modal.js — Opens / closes the mini-game overlay
   =================================================== */

import { gameRegistry } from '../games/registry.js';

const overlay = () => document.getElementById('modal-overlay');
const content = () => document.getElementById('modal-content');
const closeBtn = () => document.getElementById('modal-close');

/**
 * Open the modal and load the mini-game for the given item.
 * @param {object} item — an item definition from items.js
 */
export function openModal(item) {
  const el = overlay();
  const inner = content();

  // Clear any previous game content
  inner.innerHTML = '';

  // Load the game for this item
  const buildGame = gameRegistry[item.id];
  if (buildGame) {
    buildGame(inner, item);
  } else {
    inner.innerHTML = `<p>Mini-game for <strong>${item.label}</strong> coming soon…</p>`;
  }

  el.classList.remove('hidden');
}

/** Close the modal and clear content */
export function closeModal() {
  overlay().classList.add('hidden');
  content().innerHTML = '';
}

/** Wire up close button and backdrop click (called once on init) */
export function initModal() {
  closeBtn().addEventListener('click', closeModal);
  overlay().addEventListener('click', (e) => {
    if (e.target === overlay()) closeModal();
  });

  // ESC key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
