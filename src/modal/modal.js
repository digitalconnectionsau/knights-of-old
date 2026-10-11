/* ===================================================
   modal.js — Opens / closes the mini-game overlay
   =================================================== */

import { gameRegistry } from '../games/registry.js';
import { markSolved } from '../state/progress.js';

const overlay  = () => document.getElementById('modal-overlay');
const box      = () => document.getElementById('modal-box');
const content  = () => document.getElementById('modal-content');
const closeBtn = () => document.getElementById('modal-close');
const footer   = () => document.getElementById('modal-footer');

// Games may switch the box into a full-screen layout; this is the
// class list we restore on every open/close so layouts never leak
// from one game into the next.
let baseBoxClass = '';

// Optional cleanup returned by a game builder (e.g. to stop timers)
let activeCleanup = null;

// Hook for the "Add to timeline" button (set by the sidebar)
let addToTimelineHandler = null;
export function setAddToTimelineHandler(fn) { addToTimelineHandler = fn; }

/**
 * Open the modal and load the mini-game for the given item.
 * Builders are called as (container, item, complete) where
 * complete() marks the clue as solved.
 * @param {object} item — an item definition from items.js
 */
export function openModal(item) {
  teardown();

  const inner = content();
  inner.innerHTML = '';

  const buildGame = gameRegistry[item.id];
  if (buildGame) {
    const complete = () => markSolved(item.id);
    const cleanup = buildGame(inner, item, complete);
    if (typeof cleanup === 'function') activeCleanup = cleanup;
  } else {
    inner.innerHTML = `<p>Mini-game for <strong>${item.label}</strong> coming soon…</p>`;
  }

  addTimelineButton(item);

  overlay().classList.remove('hidden');
  closeBtn().focus();
}

/** Open the modal with custom content (used by the case debrief). */
export function openCustomModal(render) {
  teardown();
  const inner = content();
  inner.innerHTML = '';
  render(inner);
  overlay().classList.remove('hidden');
  closeBtn().focus();
}

/** Close the modal and clear content */
export function closeModal() {
  if (overlay().classList.contains('hidden')) return;
  overlay().classList.add('hidden');
  teardown();
}

function teardown() {
  if (activeCleanup) {
    try { activeCleanup(); } catch { /* ignore */ }
    activeCleanup = null;
  }
  content().innerHTML = '';
  footer().innerHTML = '';
  box().className = baseBoxClass;
}

/** A small footer button so clues can be added without drag-and-drop
 *  (drag-and-drop doesn't work on phones and tablets). */
function addTimelineButton(item) {
  if (!addToTimelineHandler) return;
  const bar = document.createElement('div');
  bar.className = 'modal-timeline-bar';
  const btn = document.createElement('button');
  btn.className = 'modal-timeline-btn';
  btn.textContent = '📌 Add to timeline';
  btn.addEventListener('click', () => {
    const added = addToTimelineHandler(item.id);
    btn.textContent = added ? '✓ Added to timeline' : '✓ Already on the timeline';
    btn.disabled = true;
  });
  bar.appendChild(btn);
  footer().appendChild(bar);
}

/** Wire up close button and backdrop click (called once on init) */
export function initModal() {
  baseBoxClass = box().className;

  closeBtn().addEventListener('click', closeModal);
  overlay().addEventListener('click', (e) => {
    if (e.target === overlay()) closeModal();
  });

  // ESC key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
