/* ============================================================
   sidebar.js — Collapsible timeline sidebar for the
   investigation wall.  Players add clues (drag from the wall,
   or the "Add to timeline" button inside a clue) to build the
   sequence of events that led to KNP's closure, then close the
   case to check their answer.
   ============================================================ */

import { items } from '../data/items.js';
import { SOLUTION, PLAYABLE_IDS, REAL_CASE } from '../data/case.js';
import { drawLines } from '../wall/lines.js';
import { openCustomModal, closeModal } from '../modal/modal.js';
import { solvedCount, onSolved, resetProgress } from '../state/progress.js';

// ─── State ──────────────────────────────────────────────────
let timeline = [];          // ordered array of item ids
let open = false;
let reorderingId = null;    // set when dragging a card inside the sidebar

// ─── Public API ─────────────────────────────────────────────

export function getTimeline() { return timeline; }

/**
 * Add a clue to the end of the timeline.
 * @returns {boolean} true if added, false if it was already there
 */
export function addToTimeline(id) {
  if (!id || timeline.includes(id)) return false;
  if (!items.some((it) => it.id === id)) return false;
  timeline.push(id);
  const wallItem = document.querySelector(`.wall-item[data-id="${id}"]`);
  if (wallItem) wallItem.classList.add('wall-item--in-timeline');
  renderTimeline();
  drawLines(timeline);
  setOpen(true);
  return true;
}

export function initSidebar() {
  const toggle  = document.getElementById('sidebar-toggle');
  const drop    = document.getElementById('sidebar-dropzone');

  // Toggle open / close
  toggle.addEventListener('click', () => setOpen(!open));

  // Footer: progress + close the case
  const sidebar = document.getElementById('sidebar');
  const foot = document.createElement('div');
  foot.className = 'sidebar-footer';
  foot.innerHTML = `
    <p class="sidebar-progress" id="sidebar-progress"></p>
    <button class="sidebar-solve-btn" id="sidebar-solve" disabled>Close the case</button>
    <p class="sidebar-solve-hint" id="sidebar-solve-hint"></p>
    <button class="sidebar-reset-btn" id="sidebar-reset">Start a new game</button>
  `;
  sidebar.appendChild(foot);
  foot.querySelector('#sidebar-solve').addEventListener('click', checkCase);
  foot.querySelector('#sidebar-reset').addEventListener('click', () => {
    if (!window.confirm('Clear the timeline and all progress for the next player?')) return;
    timeline = [];
    resetProgress();
    renderTimeline();
    drawLines(timeline);
  });
  onSolved(updateProgress);

  // --- Drop zone: accept dragged wall items -----------------
  drop.addEventListener('dragover', (e) => {
    e.preventDefault();
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

    addToTimeline(e.dataTransfer.getData('text/plain'));
  });

  renderTimeline();
}

function setOpen(value) {
  open = value;
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.getElementById('sidebar-toggle');
  sidebar.classList.toggle('sidebar--open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? '»' : '«';
  // Recalculate lines when sidebar changes width
  requestAnimationFrame(() => drawLines(timeline));
}

// ─── Render the ordered list inside the sidebar ─────────────

function renderTimeline() {
  const list = document.getElementById('sidebar-list');
  const emptyHint = document.querySelector('.dropzone-empty');

  updateSolveButton();
  updateProgress();

  if (timeline.length === 0) {
    list.innerHTML = '';
    if (emptyHint) emptyHint.style.display = '';
    document.querySelectorAll('.wall-item--in-timeline').forEach(
      (el) => el.classList.remove('wall-item--in-timeline')
    );
    return;
  }

  if (emptyHint) emptyHint.style.display = 'none';

  list.innerHTML = timeline.map((id, i) => {
    const item = items.find((it) => it.id === id);
    if (!item) return '';
    return `
      <div class="sidebar-card" data-id="${id}" draggable="true">
        <span class="sidebar-card-num">${i + 1}</span>
        <img class="sidebar-card-img" src="${item.image}" alt="" />
        <span class="sidebar-card-label">${item.label}</span>
        <span class="sidebar-card-moves">
          <button class="sidebar-card-move" data-dir="-1" title="Move up" aria-label="Move ${item.label} up" ${i === 0 ? 'disabled' : ''}>▲</button>
          <button class="sidebar-card-move" data-dir="1" title="Move down" aria-label="Move ${item.label} down" ${i === timeline.length - 1 ? 'disabled' : ''}>▼</button>
        </span>
        <button class="sidebar-card-remove" data-id="${id}" title="Remove" aria-label="Remove ${item.label}">✕</button>
      </div>`;
  }).join('');

  // Remove buttons
  list.querySelectorAll('.sidebar-card-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const removeId = btn.dataset.id;
      timeline = timeline.filter((t) => t !== removeId);
      const wallItem = document.querySelector(`.wall-item[data-id="${removeId}"]`);
      if (wallItem) wallItem.classList.remove('wall-item--in-timeline');
      renderTimeline();
      drawLines(timeline);
    });
  });

  // Up / down buttons (touch-friendly reordering)
  list.querySelectorAll('.sidebar-card-move').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.closest('.sidebar-card').dataset.id;
      const from = timeline.indexOf(id);
      const to = from + Number(btn.dataset.dir);
      if (to < 0 || to >= timeline.length) return;
      timeline.splice(from, 1);
      timeline.splice(to, 0, id);
      renderTimeline();
      drawLines(timeline);
    });
  });

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

// ─── Progress + closing the case ────────────────────────────

function updateProgress() {
  const el = document.getElementById('sidebar-progress');
  if (!el) return;
  el.textContent = `Clues investigated: ${solvedCount(PLAYABLE_IDS)} / ${PLAYABLE_IDS.length}`;
}

function updateSolveButton() {
  const btn  = document.getElementById('sidebar-solve');
  const hint = document.getElementById('sidebar-solve-hint');
  if (!btn) return;
  const need = SOLUTION.length;
  btn.disabled = timeline.length < need;
  hint.textContent = timeline.length < need
    ? `Pin at least ${need} clues in order to close the case.`
    : 'Happy with the order? Close the case.';
}

/** Compare the player's timeline with the real order and show the result. */
function checkCase() {
  const answer = SOLUTION.map((s) => s.id);
  const extras = timeline.filter((id) => !answer.includes(id));
  const ordered = timeline.filter((id) => answer.includes(id));
  const missing = answer.filter((id) => !timeline.includes(id));
  const inPlace = ordered.filter((id, i) => answer[i] === id).length;
  const solved = extras.length === 0 && missing.length === 0 && inPlace === answer.length;

  // Colour each card so the player can see where they went wrong
  document.querySelectorAll('.sidebar-card').forEach((card) => {
    const id = card.dataset.id;
    card.classList.remove('sidebar-card--right', 'sidebar-card--wrong');
    const ok = answer.includes(id) && ordered.indexOf(id) === answer.indexOf(id);
    card.classList.add(ok ? 'sidebar-card--right' : 'sidebar-card--wrong');
  });

  if (solved) {
    showDebrief();
    return;
  }

  openCustomModal((inner) => {
    const label = (id) => items.find((it) => it.id === id)?.label ?? id;
    inner.innerHTML = `
      <h2>Not quite, investigator</h2>
      <p>You've got <strong>${inPlace} of ${answer.length}</strong> steps of the attack in the right place.
         Green cards in your timeline are right; red ones need another look.</p>
      ${extras.length ? `<div class="result-msg fail">Red herring${extras.length > 1 ? 's' : ''} on your timeline:
         ${extras.map(label).join(', ')}. ${extras.length > 1 ? 'They weren\'t' : 'It wasn\'t'} part of this attack.</div>` : ''}
      ${missing.length ? `<div class="result-msg fail">You're missing ${missing.length} step${missing.length > 1 ? 's' : ''} of the attack.
         Every attack starts with research: what could the attackers learn about KNP first?</div>` : ''}
      <button class="game-btn" id="case-retry">Back to the wall</button>
    `;
    inner.querySelector('#case-retry').addEventListener('click', closeModal);
  });
}

function showDebrief() {
  openCustomModal((inner) => {
    inner.innerHTML = `
      <h2>Case closed</h2>
      <p>You rebuilt the attack. Here's how it unfolded:</p>
      <ol class="case-steps">
        ${SOLUTION.map((s) => `<li>${s.step}</li>`).join('')}
      </ol>
      <h2 style="margin-top:22px">${REAL_CASE.title}</h2>
      ${REAL_CASE.facts.map((f) => `<p>${f}</p>`).join('')}
      <div class="result-msg success">
        One guessed password. No MFA. No usable backups. That's all it took.
      </div>
      <h2 style="margin-top:22px">What would have stopped it</h2>
      <ul class="case-steps">
        ${REAL_CASE.lessons.map((l) => `<li>${l}</li>`).join('')}
      </ul>
    `;
  });
}
