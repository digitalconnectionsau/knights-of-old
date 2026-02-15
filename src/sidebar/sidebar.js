/* ============================================================
   sidebar.js — Collapsible timeline sidebar for the
   investigation wall.  Users drag clues from the wall into
   here to build the sequence of events that led to KNP's
   closure.
   ============================================================ */

import { items } from '../data/items.js';
import { drawLines } from '../wall/lines.js';

// ─── State ──────────────────────────────────────────────────
let timeline = [];          // ordered array of item ids
let open = false;
let reorderingId = null;    // set when dragging a card inside the sidebar

// ─── Public API ─────────────────────────────────────────────

export function getTimeline() { return timeline; }

export function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.getElementById('sidebar-toggle');
  const drop    = document.getElementById('sidebar-dropzone');

  // Toggle open / close
  toggle.addEventListener('click', () => {
    open = !open;
    sidebar.classList.toggle('sidebar--open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? '\u00BB' : '\u00AB';

    // Recalculate lines when sidebar changes width
    requestAnimationFrame(() => drawLines(timeline));
  });

  // --- Drop zone: accept dragged wall items -----------------
  drop.addEventListener('dragover', (e) => {
    e.preventDefault();
    // If we're reordering inside the sidebar, allow 'move'
    e.dataTransfer.dropEffect = reorderingId ? 'move' : 'copy';
    if (!reorderingId) drop.classList.add('sidebar-dropzone--over');
  });

  drop.addEventListener('dragleave', () => {
    drop.classList.remove('sidebar-dropzone--over');
  });

  drop.addEventListener('drop', (e) => {
    e.preventDefault();
    drop.classList.remove('sidebar-dropzone--over');

    // Ignore reorder drags that bubble up (handled by card handlers)
    if (reorderingId) return;

    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;

    // Prevent duplicates
    if (timeline.includes(id)) return;

    timeline.push(id);

    // Mark the wall item as being in the timeline
    const wallItem = document.querySelector(`.wall-item[data-id="${id}"]`);
    if (wallItem) wallItem.classList.add('wall-item--in-timeline');

    renderTimeline();
    drawLines(timeline);
  });

  renderTimeline();
}

// ─── Render the ordered list inside the sidebar ─────────────

function renderTimeline() {
  const list = document.getElementById('sidebar-list');
  const emptyHint = document.querySelector('.dropzone-empty');

  if (timeline.length === 0) {
    list.innerHTML = '';
    if (emptyHint) emptyHint.style.display = '';
    // Remove in-timeline glow from all wall items
    document.querySelectorAll('.wall-item--in-timeline').forEach(
      (el) => el.classList.remove('wall-item--in-timeline')
    );
    return;
  }

  // Hide the static hint text
  if (emptyHint) emptyHint.style.display = 'none';

  list.innerHTML = timeline.map((id, i) => {
    const item = items.find((it) => it.id === id);
    if (!item) return '';
    return `
      <div class="sidebar-card" data-id="${id}" draggable="true">
        <span class="sidebar-card-num">${i + 1}</span>
        <img class="sidebar-card-img" src="${item.image}" alt="${item.label}" />
        <span class="sidebar-card-label">${item.label}</span>
        <button class="sidebar-card-remove" data-id="${id}" title="Remove">✕</button>
      </div>`;
  }).join('');

  // Wire remove buttons
  list.querySelectorAll('.sidebar-card-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const removeId = btn.dataset.id;
      timeline = timeline.filter((t) => t !== removeId);

      // Remove in-timeline glow from the removed wall item
      const wallItem = document.querySelector(`.wall-item[data-id="${removeId}"]`);
      if (wallItem) wallItem.classList.remove('wall-item--in-timeline');

      renderTimeline();
      drawLines(timeline);
    });
  });

  // Wire reorder via drag within the sidebar
  wireReorder(list);
}

// ─── Reorder cards within the sidebar via drag ──────────────

function wireReorder(list) {
  list.querySelectorAll('.sidebar-card').forEach((card) => {
    card.addEventListener('dragstart', (e) => {
      reorderingId = card.dataset.id;
      card.classList.add('sidebar-card--dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', reorderingId);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('sidebar-card--dragging');
      reorderingId = null;
    });

    card.addEventListener('dragover', (e) => {
      if (!reorderingId) return;     // only handle internal reorders
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      card.classList.add('sidebar-card--over');
    });

    card.addEventListener('dragleave', () => {
      card.classList.remove('sidebar-card--over');
    });

    card.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();           // don't bubble to dropzone
      card.classList.remove('sidebar-card--over');
      if (!reorderingId || reorderingId === card.dataset.id) return;

      // Reorder: remove dragged, insert at target position
      const fromIdx = timeline.indexOf(reorderingId);
      const toIdx   = timeline.indexOf(card.dataset.id);
      if (fromIdx < 0 || toIdx < 0) return;

      timeline.splice(fromIdx, 1);
      timeline.splice(toIdx, 0, reorderingId);
      renderTimeline();
      drawLines(timeline);
    });
  });
}
