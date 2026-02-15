/* ============================================================
   lines.js — Draws red "pin-board" string lines between
   items on the wall that have been added to the timeline.
   Uses an SVG overlay on top of the wall.
   ============================================================ */

/**
 * Draw lines between wall items in timeline order.
 * @param {string[]} timeline  Ordered array of item ids.
 */
export function drawLines(timeline) {
  let svg = document.getElementById('wall-lines');
  if (!svg) return;

  // Clear old lines
  svg.innerHTML = '';

  if (timeline.length < 2) return;

  const container = document.getElementById('wall-container');
  const rect = container.getBoundingClientRect();

  for (let i = 0; i < timeline.length - 1; i++) {
    const fromEl = container.querySelector(`.wall-item[data-id="${timeline[i]}"]`);
    const toEl   = container.querySelector(`.wall-item[data-id="${timeline[i + 1]}"]`);
    if (!fromEl || !toEl) continue;

    const fromRect = fromEl.getBoundingClientRect();
    const toRect   = toEl.getBoundingClientRect();

    // Centre of each item, relative to the wall container
    const x1 = fromRect.left + fromRect.width / 2 - rect.left;
    const y1 = fromRect.top  + fromRect.height / 2 - rect.top;
    const x2 = toRect.left   + toRect.width / 2  - rect.left;
    const y2 = toRect.top    + toRect.height / 2  - rect.top;

    // Red string line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('class', 'pin-line');
    svg.appendChild(line);

    // Small numbered circle at the start of each segment
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x1);
    circle.setAttribute('cy', y1);
    circle.setAttribute('r', 8);
    circle.setAttribute('class', 'pin-dot');
    svg.appendChild(circle);

    const num = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    num.setAttribute('x', x1);
    num.setAttribute('y', y1 + 4);
    num.setAttribute('class', 'pin-num');
    num.textContent = i + 1;
    svg.appendChild(num);
  }

  // Dot and number on the last item
  const lastEl = container.querySelector(`.wall-item[data-id="${timeline[timeline.length - 1]}"]`);
  if (lastEl) {
    const lastRect = lastEl.getBoundingClientRect();
    const lx = lastRect.left + lastRect.width / 2 - rect.left;
    const ly = lastRect.top  + lastRect.height / 2 - rect.top;

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', lx);
    circle.setAttribute('cy', ly);
    circle.setAttribute('r', 8);
    circle.setAttribute('class', 'pin-dot');
    svg.appendChild(circle);

    const num = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    num.setAttribute('x', lx);
    num.setAttribute('y', ly + 4);
    num.setAttribute('class', 'pin-num');
    num.textContent = timeline.length;
    svg.appendChild(num);
  }
}

/**
 * Redraw lines on window resize so they stay aligned.
 */
export function initLines() {
  // We import getTimeline lazily to avoid a circular dependency
  let _getTimeline;
  import('../sidebar/sidebar.js').then((m) => {
    _getTimeline = m.getTimeline;
  });

  window.addEventListener('resize', () => {
    if (_getTimeline) drawLines(_getTimeline());
  });
}
