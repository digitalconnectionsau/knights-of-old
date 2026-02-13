/* ============================================================
   wall.js — Renders clickable items on the investigation wall
   ============================================================ */

import { items } from '../data/items.js';
import { openModal } from '../modal/modal.js';

/**
 * Initialise the wall: create a clickable element for each item
 * and attach it to #wall-container.
 */
export function initWall() {
  const container = document.getElementById('wall-container');

  // Set wall background (public/ folder path, resolved by the browser)
  container.style.backgroundImage = "url('/images/wall/Background.png')";

  items.forEach((item) => {
    const el = document.createElement('button');
    el.className = 'wall-item';
    el.dataset.id = item.id;
    el.setAttribute('aria-label', item.label);

    // Position via CSS custom properties (percentage-based)
    el.style.setProperty('--x', item.x);
    el.style.setProperty('--y', item.y);

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

    // Click → open mini-game
    el.addEventListener('click', () => openModal(item));

    container.appendChild(el);
  });
}
