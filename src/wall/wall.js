/* ============================================================
   wall.js — Renders clickable items on the investigation wall
   ============================================================ */

import { items } from '../data/items.js';
import { openModal } from '../modal/modal.js';
import { isSolved, onSolved } from '../state/progress.js';

/**
 * Initialise the wall: create a clickable/draggable element for
 * each item and attach it to #wall-container.
 */
export function initWall() {
  const container = document.getElementById('wall-container');

  // Set wall background (public/ folder path, resolved by the browser)
  container.style.backgroundImage = "url('/images/wall/Background.webp')";

  items.forEach((item) => {
    const el = document.createElement('button');
    el.className = 'wall-item';
    el.dataset.id = item.id;
    el.setAttribute('aria-label', item.label);
    el.draggable = true;                       // ← make draggable

    // Position via CSS custom properties (percentage-based)
    el.style.setProperty('--x', item.x);
    el.style.setProperty('--y', item.y);
    el.style.setProperty('--angle', `${item.angle || 0}deg`);

    // Item image
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.label;
    el.appendChild(img);

    // Label beneath image
    const label = document.createElement('span');
    label.className = 'wall-item-label';
    label.textContent = item.label;
    el.appendChild(label);

    // Solved badge
    const badge = document.createElement('span');
    badge.className = 'wall-item-solved';
    badge.textContent = '✓';
    badge.setAttribute('aria-hidden', 'true');
    el.appendChild(badge);
    if (isSolved(item.id)) el.classList.add('wall-item--solved');

    // ── Drag behaviour ────────────────────────────────────
    // A real drag (dragstart) suppresses the click that follows it.
    // The old mousemove check also blocked normal clicks whenever
    // the mouse moved a pixel while pressed.
    let justDragged = false;

    el.addEventListener('dragstart', (e) => {
      justDragged = true;
      e.dataTransfer.setData('text/plain', item.id);
      e.dataTransfer.effectAllowed = 'copy';
      el.classList.add('wall-item--dragging');
    });

    el.addEventListener('dragend', () => {
      el.classList.remove('wall-item--dragging');
      setTimeout(() => { justDragged = false; }, 0);
    });

    // ── Click → open mini-game ────────────────────────────
    el.addEventListener('click', (e) => {
      if (justDragged) { e.preventDefault(); return; }
      openModal(item);
    });

    container.appendChild(el);
  });

  // Tick clues off as they're solved
  onSolved((id) => {
    if (id === null) {
      container.querySelectorAll('.wall-item--solved')
        .forEach((el) => el.classList.remove('wall-item--solved'));
      return;
    }
    const el = container.querySelector(`.wall-item[data-id="${id}"]`);
    if (el) el.classList.add('wall-item--solved');
  });
}
