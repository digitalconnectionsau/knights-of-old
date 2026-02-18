/* ==========================================================
   local-network.js — TRACE GAME: Network Path Tracer

   Type:  Instruction-following + pattern recognition
   Theme: Trace paths across the KNP local network.
          The red lines drawn between clicked computers form
          the shape of a letter. Each round = 1 letter.
          All rounds together spell a word: C-H-A-O-S.
   ========================================================== */

// ─── GRID DATA (3 rows × 3 cols = 9 computers) ─────────────
//
//   (0,0) Gary.F    (0,1) Lisa.N    (0,2) Oscar.B
//   (1,0) Bryan.D   (1,1) Dave.H    (1,2) Fiona.G
//   (2,0) Peter.S   (2,1) Chris.P   (2,2) Sarah.J
//

const COLS = 3;

const GRID = [
  // Row 0
  { name: 'Gary.F',  role: 'Fleet Manager' },
  { name: 'Lisa.N',  role: 'Logistics' },
  { name: 'Oscar.B', role: 'Operations' },

  // Row 1
  { name: 'Bryan.D', role: 'Billing' },
  { name: 'Dave.H',  role: 'Dispatch' },
  { name: 'Fiona.G', role: 'Finance' },

  // Row 2
  { name: 'Peter.S', role: 'Parcels' },
  { name: 'Chris.P', role: 'Compliance' },
  { name: 'Sarah.J', role: 'Sales' },
];

// ─── ROUNDS — each round traces a letter shape ─────────────
// The answer for each round is a single letter.
// Together they spell: C - H - A - O - S

const ROUNDS = [
  // ── C ── path: Chris.P(2,1) → Peter.S(2,0) → Gary.F(0,0) → Lisa.N(0,1)
  {
    answer: 'C',
    title: 'Round 1 — Trace the Path',
    description: 'Follow the clues. Click the correct computer for each step. The red lines will draw a shape — figure out which letter it is!',
    steps: [
      {
        clue: 'Start at the workstation handling regulatory audits and legal compliance.',
        row: 2, col: 1, // Chris.P
      },
      {
        clue: 'Move to the system that tracks all incoming and outgoing parcels and shipments.',
        row: 2, col: 0, // Peter.S
      },
      {
        clue: 'Jump up to the computer used by the manager who coordinates the vehicle fleet.',
        row: 0, col: 0, // Gary.F
      },
      {
        clue: 'Finally, move across to the workstation managing warehouse stock and shipping logistics.',
        row: 0, col: 1, // Lisa.N
      },
    ],
  },

  // ── H ── path: Gary.F(0,0) → Peter.S(2,0) → Bryan.D(1,0) → Fiona.G(1,2) → Oscar.B(0,2) → Sarah.J(2,2)
  {
    answer: 'H',
    title: 'Round 2 — Trace the Path',
    description: 'A new shape to trace. Follow the clues carefully.',
    steps: [
      {
        clue: 'Begin at the fleet manager\'s computer in the top-left corner of the network.',
        row: 0, col: 0, // Gary.F
      },
      {
        clue: 'Move straight down to the parcels desk at the bottom of the same column.',
        row: 2, col: 0, // Peter.S
      },
      {
        clue: 'Step back up to the billing department — the workstation that processes all company invoices.',
        row: 1, col: 0, // Bryan.D
      },
      {
        clue: 'Now cross to the other side of the middle row — the finance officer\'s machine.',
        row: 1, col: 2, // Fiona.G
      },
      {
        clue: 'Move up to the operations manager\'s workstation in the top-right corner.',
        row: 0, col: 2, // Oscar.B
      },
      {
        clue: 'Finish by moving down to the sales desk at the bottom-right of the network.',
        row: 2, col: 2, // Sarah.J
      },
    ],
  },

  // ── A ── path: Peter.S(2,0) → Lisa.N(0,1) → Sarah.J(2,2) → Fiona.G(1,2) → Bryan.D(1,0)
  {
    answer: 'A',
    title: 'Round 3 — Trace the Path',
    description: 'Another letter awaits. Follow each step closely.',
    steps: [
      {
        clue: 'Start at the bottom-left — the desk managing parcels and deliveries.',
        row: 2, col: 0, // Peter.S
      },
      {
        clue: 'Go diagonally up to the logistics workstation in the top-centre.',
        row: 0, col: 1, // Lisa.N
      },
      {
        clue: 'Now sweep diagonally down to the sales workstation in the bottom-right corner.',
        row: 2, col: 2, // Sarah.J
      },
      {
        clue: 'Step up to the finance officer in the middle-right of the network.',
        row: 1, col: 2, // Fiona.G
      },
      {
        clue: 'Cross the middle row to the billing department on the left.',
        row: 1, col: 0, // Bryan.D
      },
    ],
  },

  // ── O ── path: Lisa.N(0,1) → Gary.F(0,0) → Peter.S(2,0) → Sarah.J(2,2) → Oscar.B(0,2)
  {
    answer: 'O',
    title: 'Round 4 — Trace the Path',
    description: 'Nearly there! Trace the shape carefully.',
    steps: [
      {
        clue: 'Start at the logistics workstation in the top-centre.',
        row: 0, col: 1, // Lisa.N
      },
      {
        clue: 'Move left to the fleet manager\'s desk in the top-left corner.',
        row: 0, col: 0, // Gary.F
      },
      {
        clue: 'Go straight down to the parcels desk at the bottom-left.',
        row: 2, col: 0, // Peter.S
      },
      {
        clue: 'Cross the bottom row to the sales team in the bottom-right.',
        row: 2, col: 2, // Sarah.J
      },
      {
        clue: 'Finish by going up to the operations manager in the top-right corner.',
        row: 0, col: 2, // Oscar.B
      },
    ],
  },

  // ── S ── path: Oscar.B(0,2) → Gary.F(0,0) → Bryan.D(1,0) → Fiona.G(1,2) → Sarah.J(2,2) → Peter.S(2,0)
  {
    answer: 'S',
    title: 'Round 5 — Final Path',
    description: 'Last letter! Trace it and complete the word.',
    steps: [
      {
        clue: 'Start at the operations manager in the top-right of the network.',
        row: 0, col: 2, // Oscar.B
      },
      {
        clue: 'Cross to the fleet manager in the top-left.',
        row: 0, col: 0, // Gary.F
      },
      {
        clue: 'Drop down to the billing department — invoices and payments.',
        row: 1, col: 0, // Bryan.D
      },
      {
        clue: 'Cross the middle row to the finance officer on the right.',
        row: 1, col: 2, // Fiona.G
      },
      {
        clue: 'Move down to the sales desk in the bottom-right corner.',
        row: 2, col: 2, // Sarah.J
      },
      {
        clue: 'Finally, cross to the parcels desk at the bottom-left.',
        row: 2, col: 0, // Peter.S
      },
    ],
  },
];

// ─── SECURITY QUESTIONS (commented out for now) ─────────────

/*
const SECURITY_QUESTIONS = [
  {
    question: "What does 'MFA' stand for in cybersecurity?",
    options: [
      { text: 'Multiple File Access', correct: false },
      { text: 'Multi-Factor Authentication', correct: true },
      { text: 'Main Firewall Application', correct: false },
    ],
  },
  {
    question: 'What type of malware encrypts your files and demands payment to unlock them?',
    options: [
      { text: 'Spyware', correct: false },
      { text: 'Ransomware', correct: true },
      { text: 'Adware', correct: false },
    ],
  },
  {
    question: 'What is the first thing you should do if you receive a suspicious email?',
    options: [
      { text: 'Open the attachment to check it', correct: false },
      { text: 'Forward it to colleagues for advice', correct: false },
      { text: "Don't click any links — report it to IT", correct: true },
    ],
  },
  {
    question: 'What does a firewall do?',
    options: [
      { text: 'Speeds up your internet connection', correct: false },
      { text: 'Filters traffic between trusted and untrusted networks', correct: true },
      { text: 'Backs up your files automatically', correct: false },
    ],
  },
  {
    question: 'Which backup strategy recommends 3 copies, 2 media types, 1 offsite?',
    options: [
      { text: 'The 1-2-3 rule', correct: false },
      { text: 'The 3-2-1 rule', correct: true },
      { text: 'The 2-1-3 rule', correct: false },
    ],
  },
  {
    question: 'Why should you avoid using the same password for multiple accounts?',
    options: [
      { text: "It's harder to remember", correct: false },
      { text: 'If one account is breached, attackers can access all of them', correct: true },
      { text: "Websites don't allow it", correct: false },
    ],
  },
];
*/

// ─── HELPERS ────────────────────────────────────────────────

/* function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
} */

function fmtTime(s) {
  const m = String(Math.floor(s / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  return `${m}:${sec}`;
}

// ─── BUILD GAME ─────────────────────────────────────────────

export function buildLocalNetworkGame(container) {
  const box = document.getElementById('modal-box');
  box.classList.add('modal-fullscreen-wide');

  // ── State ────────────────────────────────────────────────
  let currentRound  = 0;
  let clicks        = [];       // { row, col, name }
  let solvedLetters = [];       // letters solved so far
  let elapsed       = 0;
  let timerRunning  = false;
  let timerId       = null;
  // let qPool      = shuffle([...SECURITY_QUESTIONS]);
  // let qUsed      = 0;
  // let qTimerId   = null;

  // ── Render skeleton ──────────────────────────────────────

  container.innerHTML = `
    <div class="ln-game">
      <div class="ln-top-bar">
        <span class="ln-timer" id="ln-timer">⏱ 00:00</span>
        <div class="ln-answer-area">
          <label for="ln-answer">This letter is:</label>
          <input class="ln-answer-input" id="ln-answer" type="text"
                 maxlength="1" placeholder="?"
                 autocomplete="off" spellcheck="false" />
          <button class="ln-submit-btn" id="ln-submit">Submit</button>
        </div>
        <span class="ln-round-info" id="ln-round-info">Round 1 / ${ROUNDS.length}</span>
      </div>

      <div class="ln-board">
        <div class="ln-left">
          <div class="ln-left-header" id="ln-left-header"></div>
          <div class="ln-solved" id="ln-solved"></div>
          <div class="ln-steps" id="ln-steps"></div>
          <div class="ln-controls">
            <button class="ln-ctrl-btn ln-undo-btn" id="ln-undo">↩ Undo</button>
            <button class="ln-ctrl-btn ln-clear-btn" id="ln-clear">✕ Clear</button>
          </div>
          <div class="ln-status" id="ln-status">Follow the instructions and click computers on the right.</div>
        </div>

        <div class="ln-right">
          <div class="ln-right-label">KNP Local Network</div>
          <div class="ln-grid-wrap" id="ln-grid-wrap">
            <svg class="ln-lines-svg" id="ln-svg"></svg>
            <div class="ln-grid" id="ln-grid"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // ── DOM refs ─────────────────────────────────────────────

  const timerEl    = container.querySelector('#ln-timer');
  const roundEl    = container.querySelector('#ln-round-info');
  const answerIn   = container.querySelector('#ln-answer');
  const submitBtn  = container.querySelector('#ln-submit');
  const headerEl   = container.querySelector('#ln-left-header');
  const solvedEl   = container.querySelector('#ln-solved');
  const stepsEl    = container.querySelector('#ln-steps');
  const statusEl   = container.querySelector('#ln-status');
  const undoBtn    = container.querySelector('#ln-undo');
  const clearBtn   = container.querySelector('#ln-clear');
  const gridWrap   = container.querySelector('#ln-grid-wrap');
  const svg        = container.querySelector('#ln-svg');
  const gridEl     = container.querySelector('#ln-grid');
  const gameEl     = container.querySelector('.ln-game');

  // ── Build computer grid (once) ───────────────────────────

  GRID.forEach((comp, idx) => {
    const row = Math.floor(idx / COLS);
    const col = idx % COLS;
    const el = document.createElement('div');
    el.className = 'ln-computer';
    el.dataset.row = row;
    el.dataset.col = col;
    el.dataset.idx = idx;
    el.innerHTML = `
      <span class="ln-pc-icon">🖥️</span>
      <span class="ln-pc-name">${comp.name}</span>
      <span class="ln-pc-role">${comp.role}</span>
    `;
    el.addEventListener('click', () => handleClick(row, col));
    gridEl.appendChild(el);
  });

  // ── Wire buttons ─────────────────────────────────────────

  submitBtn.addEventListener('click', submitAnswer);
  answerIn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitAnswer();
  });
  undoBtn.addEventListener('click', undo);
  clearBtn.addEventListener('click', clearAll);

  // ── Timer ────────────────────────────────────────────────

  function startTimer() {
    timerRunning = true;
    timerId = setInterval(() => {
      if (!container.isConnected) { cleanup(); return; }
      if (!timerRunning) return;
      elapsed++;
      timerEl.textContent = `⏱ ${fmtTime(elapsed)}`;
    }, 1000);
  }

  // function pauseTimer() { timerRunning = false; }
  // function resumeTimer() { timerRunning = true; }

  function cleanup() {
    clearInterval(timerId);
    // clearTimeout(qTimerId);
  }

  // ── Solved letters display ───────────────────────────────

  function renderSolved() {
    const all = ROUNDS.map((r, i) =>
      i < solvedLetters.length
        ? `<span class="ln-solved-letter filled">${solvedLetters[i]}</span>`
        : `<span class="ln-solved-letter">${i === solvedLetters.length ? '?' : '_'}</span>`
    );
    solvedEl.innerHTML = `<div class="ln-solved-row">${all.join('')}</div>`;
  }

  // ── Load a round ─────────────────────────────────────────

  function loadRound(index) {
    currentRound = index;
    clicks = [];

    const round = ROUNDS[index];
    roundEl.textContent = `Round ${index + 1} / ${ROUNDS.length}`;

    // Header
    headerEl.innerHTML = `
      <h3>📋 ${round.title}</h3>
      <p>${round.description}</p>
    `;

    // Solved letters
    renderSolved();

    // Steps
    stepsEl.innerHTML = '';
    round.steps.forEach((step, i) => {
      const el = document.createElement('div');
      el.className = `ln-step ${i === 0 ? 'current' : ''}`;
      el.dataset.step = i;
      el.innerHTML = `
        <span class="ln-step-num">${i + 1}.</span>
        <span class="ln-step-text">${step.clue}</span>
      `;
      stepsEl.appendChild(el);
    });

    // Reset grid highlights
    gridEl.querySelectorAll('.ln-computer').forEach(el => {
      el.classList.remove('clicked');
      const badge = el.querySelector('.ln-click-badge');
      if (badge) badge.remove();
    });

    // Clear SVG
    svg.innerHTML = '';

    // Clear answer
    answerIn.value = '';

    // Status
    setStatus('Follow the instructions — click computers on the right.', '');
  }

  // ── Click handling ───────────────────────────────────────

  function handleClick(row, col) {
    const round = ROUNDS[currentRound];
    if (clicks.length >= round.steps.length) return;

    // Don't allow clicking an already-clicked computer
    if (clicks.some(c => c.row === row && c.col === col)) return;

    const idx = row * COLS + col;
    const comp = GRID[idx];
    clicks.push({ row, col, name: comp.name });

    // Highlight the computer
    const compEl = gridEl.querySelector(`[data-idx="${idx}"]`);
    compEl.classList.add('clicked');

    // Add badge
    const badge = document.createElement('span');
    badge.className = 'ln-click-badge';
    badge.textContent = clicks.length;
    compEl.appendChild(badge);

    // Update step
    const stepIdx = clicks.length - 1;
    const stepEls = stepsEl.querySelectorAll('.ln-step');

    // Mark current step as done
    stepEls[stepIdx].classList.remove('current');
    stepEls[stepIdx].classList.add('done');

    // Add chosen computer name
    const chosen = document.createElement('div');
    chosen.className = 'ln-step-chosen';
    chosen.textContent = `→ ${comp.name}`;
    stepEls[stepIdx].appendChild(chosen);

    // Highlight next step
    if (stepIdx + 1 < stepEls.length) {
      stepEls[stepIdx + 1].classList.add('current');
    }

    // Draw lines
    drawLines();

    // Check completion
    if (clicks.length >= round.steps.length) {
      setStatus('All steps done! What letter does the shape look like? Type it above.', 'success');
      answerIn.focus();
    } else {
      setStatus(`Step ${clicks.length} of ${round.steps.length} — read the next clue and click.`, '');
    }
  }

  // ── Draw SVG lines ───────────────────────────────────────

  function drawLines() {
    svg.innerHTML = '';
    const wrapRect = gridWrap.getBoundingClientRect();

    for (let i = 0; i < clicks.length; i++) {
      const { cx, cy } = getCenter(clicks[i].row, clicks[i].col, wrapRect);

      // Dot
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', 6);
      svg.appendChild(circle);

      // Line from previous
      if (i > 0) {
        const prev = getCenter(clicks[i - 1].row, clicks[i - 1].col, wrapRect);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', prev.cx);
        line.setAttribute('y1', prev.cy);
        line.setAttribute('x2', cx);
        line.setAttribute('y2', cy);
        svg.appendChild(line);
      }
    }
  }

  function getCenter(row, col, wrapRect) {
    const idx = row * COLS + col;
    const el = gridEl.querySelector(`[data-idx="${idx}"]`);
    const r = el.getBoundingClientRect();
    return {
      cx: r.left - wrapRect.left + r.width / 2,
      cy: r.top - wrapRect.top + r.height / 2,
    };
  }

  // ── Undo / Clear ─────────────────────────────────────────

  function undo() {
    if (clicks.length === 0) return;

    const removed = clicks.pop();
    const idx = removed.row * COLS + removed.col;

    // Un-highlight computer
    const compEl = gridEl.querySelector(`[data-idx="${idx}"]`);
    compEl.classList.remove('clicked');
    const badge = compEl.querySelector('.ln-click-badge');
    if (badge) badge.remove();

    // Revert step
    const stepEls = stepsEl.querySelectorAll('.ln-step');
    const stepIdx = clicks.length; // the one we just removed

    stepEls[stepIdx].classList.remove('done');
    stepEls[stepIdx].classList.add('current');
    const chosen = stepEls[stepIdx].querySelector('.ln-step-chosen');
    if (chosen) chosen.remove();

    // Remove current from next step if it was set
    if (stepIdx + 1 < stepEls.length) {
      stepEls[stepIdx + 1].classList.remove('current');
    }

    drawLines();
    setStatus(`Undid last click. Step ${clicks.length + 1} of ${ROUNDS[currentRound].steps.length}.`, '');
  }

  function clearAll() {
    if (clicks.length === 0) return;

    clicks.forEach(c => {
      const idx = c.row * COLS + c.col;
      const el = gridEl.querySelector(`[data-idx="${idx}"]`);
      el.classList.remove('clicked');
      const badge = el.querySelector('.ln-click-badge');
      if (badge) badge.remove();
    });

    clicks = [];

    const stepEls = stepsEl.querySelectorAll('.ln-step');
    stepEls.forEach((el, i) => {
      el.classList.remove('done', 'current');
      if (i === 0) el.classList.add('current');
      const chosen = el.querySelector('.ln-step-chosen');
      if (chosen) chosen.remove();
    });

    svg.innerHTML = '';
    answerIn.value = '';
    setStatus('Cleared! Start again from step 1.', '');
  }

  // ── Submit answer ────────────────────────────────────────

  function submitAnswer() {
    const val = answerIn.value.trim().toUpperCase();
    if (!val) return;

    const round = ROUNDS[currentRound];

    if (val === round.answer) {
      solvedLetters.push(round.answer);

      if (currentRound < ROUNDS.length - 1) {
        showRoundTransition();
      } else {
        showEndScreen();
      }
    } else {
      setStatus(`❌ "${val}" is not correct — look at the shape of the red lines and try again!`, 'error');
      answerIn.value = '';
    }
  }

  // ── Round transition ─────────────────────────────────────

  function showRoundTransition() {
    const overlay = document.createElement('div');
    overlay.className = 'ln-round-overlay';
    overlay.innerHTML = `
      <h2>✅ Correct — it's "${ROUNDS[currentRound].answer}"!</h2>
      <p>Letters so far: <strong style="color:#ff6b6b;letter-spacing:0.2em;font-size:1.3rem">${solvedLetters.join(' ')}</strong></p>
      <p>Get ready for round ${currentRound + 2}…</p>
    `;
    gameEl.appendChild(overlay);

    setTimeout(() => {
      overlay.remove();
      loadRound(currentRound + 1);
    }, 2500);
  }

  // ── Status helper ────────────────────────────────────────

  function setStatus(text, type) {
    statusEl.textContent = text;
    statusEl.className = `ln-status ${type}`;
  }

  // ── Security questions (commented out for now) ───────────

  /*
  function scheduleQuestion() {
    if (qUsed >= qPool.length) return;
    const delay = 18000 + Math.random() * 22000;
    qTimerId = setTimeout(() => {
      if (!container.isConnected) return;
      showQuestion();
    }, delay);
  }

  function showQuestion() {
    pauseTimer();
    const q = qPool[qUsed++];

    const overlay = document.createElement('div');
    overlay.className = 'ln-q-overlay';
    overlay.innerHTML = `
      <div class="ln-q-box">
        <h3>🔒 Security Check!</h3>
        <p class="ln-q-text">${q.question}</p>
        <div class="ln-q-options">
          ${q.options
            .map(
              (o, i) =>
                `<button class="ln-q-opt" data-i="${i}" data-correct="${o.correct}">${o.text}</button>`
            )
            .join('')}
        </div>
      </div>
    `;

    gameEl.appendChild(overlay);

    const buttons = overlay.querySelectorAll('.ln-q-opt');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';

        buttons.forEach(b => {
          b.disabled = true;
          if (b.dataset.correct === 'true') b.classList.add('q-correct');
        });

        if (!isCorrect) btn.classList.add('q-wrong');

        const fb = document.createElement('div');
        fb.className = `ln-q-feedback ${isCorrect ? 'fb-correct' : 'fb-wrong'}`;
        fb.textContent = isCorrect
          ? '✓ Correct! Well done.'
          : `✗ Not quite — the answer was: ${q.options.find(o => o.correct).text}`;
        overlay.querySelector('.ln-q-box').appendChild(fb);

        setTimeout(() => {
          overlay.remove();
          resumeTimer();
          scheduleQuestion();
        }, 2000);
      });
    });
  }
  */

  // ── End screen ───────────────────────────────────────────

  function showEndScreen() {
    cleanup();
    const word = solvedLetters.join('');

    container.innerHTML = `
      <div class="ln-end-screen">
        <h2>🏆 Network Traced!</h2>
        <div class="ln-end-time">Completed in ${fmtTime(elapsed)}</div>
        <div class="ln-end-words"><span>${word}</span></div>
        <div class="ln-lesson">
          <p>You traced five paths across the KNP network and uncovered the word
          <strong style="color:#ff6b6b">${word}</strong> — exactly what the ransomware
          attack created inside the company.</p>
          <p style="margin-top:10px">
            The attack spread laterally across the local network because there was
            <strong>no segmentation</strong> — every computer could reach every other.
            Proper <strong>network segmentation</strong>, <strong>access controls</strong>,
            and <strong>monitoring</strong> could have limited the damage to a single
            department instead of bringing down the entire business.
          </p>
          <p style="margin-top:10px">
            <strong>The lesson:</strong> A flat, unsegmented network is a ransomware
            attacker's dream. Isolate critical systems, limit lateral movement, and
            always know what's connected to your network.
          </p>
        </div>
        <button class="ln-play-again">Play Again</button>
      </div>
    `;

    container.querySelector('.ln-play-again').addEventListener('click', () => {
      buildLocalNetworkGame(container);
    });
  }

  // ── Start ────────────────────────────────────────────────

  startTimer();
  loadRound(0);
  // scheduleQuestion();  // disabled for now
}
