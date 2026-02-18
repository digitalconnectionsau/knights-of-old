/* ==========================================================
   data-backups.js — MEMORY GAME: Match the Backup Files

   Type:  Memory / matching card game
   Theme: KNP had no viable backups when ransomware struck.
          Players learn which files each department stores and
          why IT security controls matter.
   ========================================================== */

// ─── CARD DATA ──────────────────────────────────────────────

const COMPUTER_CARDS = [
  { dept: 'HR',        icon: '👥', file: 'Staff personal records' },
  { dept: 'HR',        icon: '👥', file: 'Employment contracts' },
  { dept: 'CEO',       icon: '💼', file: 'Strategic business plans' },
  { dept: 'CEO',       icon: '💼', file: 'Board meeting minutes' },
  { dept: 'Accounts',  icon: '📊', file: 'Payroll for drivers' },
  { dept: 'Accounts',  icon: '📊', file: 'Quarterly financial reports' },
  { dept: 'Dispatch',  icon: '🚛', file: 'Route schedules' },
  { dept: 'Dispatch',  icon: '🚛', file: 'Delivery manifests' },
  { dept: 'Logistics', icon: '📦', file: 'Fleet maintenance logs' },
  { dept: 'Logistics', icon: '📦', file: 'Warehouse inventory' },
  { dept: 'Sales',     icon: '💰', file: 'Client contact database' },
  { dept: 'Sales',     icon: '💰', file: 'Pricing agreements' },
];

const BLOCKER_CARDS = [
  { dept: 'Firewall',                  icon: '🛡️', file: 'Blocks unauthorised access' },
  { dept: 'Multi-Factor Auth',         icon: '🔐', file: 'Extra login verification' },
  { dept: 'Endpoint Protection',       icon: '🖥️', file: 'Anti-malware defence' },
  { dept: 'Offsite Backups',           icon: '☁️',  file: 'Isolated recovery copies' },
];

const PEEK_DURATION = 5000;   // ms cards stay visible at start
const LEFT_COUNT    = 6;      // number of cards on the left

// ─── HELPERS ────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeCardId() {
  return 'c' + Math.random().toString(36).slice(2, 9);
}

// ─── BUILD GAME ─────────────────────────────────────────────

export function buildDataBackupsGame(container) {
  // Force fullscreen modal
  const box = document.getElementById('modal-box');
  box.classList.add('modal-fullscreen');

  // State
  let score          = 0;
  let matchesFound   = 0;
  let selectedLeft   = null;   // currently flipped left card element
  let busy           = false;  // lock during animations

  // Pick 6 random computer cards for the left side
  const leftData = shuffle(COMPUTER_CARDS).slice(0, LEFT_COUNT).map(c => ({
    ...c,
    uid: makeCardId(),
    matched: false,
  }));

  // Right side = all 12 computer cards + 4 blockers, shuffled
  const rightData = shuffle([
    ...COMPUTER_CARDS.map(c => ({ ...c, blocker: false, uid: makeCardId() })),
    ...BLOCKER_CARDS.map(c => ({ ...c, blocker: true,  uid: makeCardId() })),
  ]);

  // ── Render skeleton ──────────────────────────────────────

  container.innerHTML = `
    <div class="db-game">
      <div class="db-instructions">
        <h2>🗄️ Backup File Match</h2>
        <p>Memorise the file locations, then match each file on the left to its twin on the right.<br>
           Watch out for <strong style="color:#ff6b6b">security blockers</strong> — they cost you a point!</p>
        <div class="db-score-bar">
          <span>Score: <span class="score-val" id="db-score">0</span></span>
          <span>Matched: <span class="matches-val" id="db-matches">0</span> / ${LEFT_COUNT}</span>
        </div>
        <div class="db-status" id="db-status">Memorise the cards — they'll flip in 5 seconds!</div>
      </div>

      <div class="db-board">
        <!-- Left panel -->
        <div class="db-left">
          <div class="db-left-label">Your files</div>
          <div class="db-left-grid" id="db-left-grid"></div>
        </div>

        <div class="db-divider"></div>

        <!-- Right panel -->
        <div class="db-right">
          <div class="db-right-label">Company network</div>
          <div class="db-right-grid" id="db-right-grid"></div>
        </div>
      </div>
    </div>
  `;

  const leftGrid   = container.querySelector('#db-left-grid');
  const rightGrid  = container.querySelector('#db-right-grid');
  const scoreEl    = container.querySelector('#db-score');
  const matchesEl  = container.querySelector('#db-matches');
  const statusEl   = container.querySelector('#db-status');

  // ── Build cards ──────────────────────────────────────────

  function createCardEl(data, side) {
    const card = document.createElement('div');
    card.className = `db-card ${data.blocker ? 'blocker' : ''}`;
    card.dataset.uid = data.uid;
    card.dataset.dept = data.dept;
    card.dataset.file = data.file;
    card.dataset.side = side;
    if (data.blocker) card.dataset.blocker = 'true';

    card.innerHTML = `
      <div class="db-card-inner">
        <div class="db-card-back"></div>
        <div class="db-card-face">
          <span class="db-card-icon">${data.icon}</span>
          <span class="db-card-dept">${data.dept}</span>
          <span class="db-card-file">${data.file}</span>
        </div>
      </div>
    `;

    return card;
  }

  // Populate left
  leftData.forEach(d => {
    const el = createCardEl(d, 'left');
    leftGrid.appendChild(el);
  });

  // Populate right
  rightData.forEach(d => {
    const el = createCardEl(d, 'right');
    rightGrid.appendChild(el);
  });

  // ── Peek phase ───────────────────────────────────────────

  const allCards = container.querySelectorAll('.db-card');
  const rightCards = rightGrid.querySelectorAll('.db-card');
  const leftCards  = leftGrid.querySelectorAll('.db-card');

  // Show all cards face-up for peek duration
  allCards.forEach(c => c.classList.add('peeking'));

  // Countdown in status
  let countdown = Math.ceil(PEEK_DURATION / 1000);
  statusEl.textContent = `Memorise the cards — they flip in ${countdown}s!`;
  const countdownTimer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      statusEl.textContent = `Memorise the cards — they flip in ${countdown}s!`;
    } else {
      clearInterval(countdownTimer);
    }
  }, 1000);

  setTimeout(() => {
    allCards.forEach(c => c.classList.remove('peeking'));
    statusEl.textContent = 'Click a green card on the left, then find its match on the right.';
    attachListeners();
  }, PEEK_DURATION);

  // ── Interaction ──────────────────────────────────────────

  function attachListeners() {
    leftCards.forEach(card => {
      card.addEventListener('click', () => handleLeftClick(card));
    });
    rightCards.forEach(card => {
      card.addEventListener('click', () => handleRightClick(card));
    });
  }

  function handleLeftClick(card) {
    if (busy) return;
    if (card.classList.contains('matched')) return;

    // Deselect previous
    if (selectedLeft && selectedLeft !== card) {
      selectedLeft.classList.remove('flipped', 'selected');
    }

    // Flip / select this card
    card.classList.add('flipped', 'selected');
    selectedLeft = card;
    statusEl.textContent = `${card.dataset.dept} — ${card.dataset.file}. Now find the match on the right!`;
    statusEl.className = 'db-status';
  }

  function handleRightClick(card) {
    if (busy) return;
    if (!selectedLeft) {
      statusEl.textContent = 'Flip a card on the left first!';
      statusEl.className = 'db-status warning';
      return;
    }
    if (card.classList.contains('matched')) return;

    busy = true;
    card.classList.add('flipped');

    // Check for blocker
    if (card.dataset.blocker === 'true') {
      score--;
      updateScoreboard();
      statusEl.textContent = `⚠️ Security blocker! ${card.dataset.dept} — that costs you a point.`;
      statusEl.className = 'db-status warning';
      card.classList.add('penalty');

      setTimeout(() => {
        card.classList.remove('flipped', 'penalty');
        selectedLeft.classList.remove('flipped', 'selected');
        selectedLeft = null;
        busy = false;
      }, 1000);
      return;
    }

    // Check for match (same dept AND same file)
    const isMatch =
      card.dataset.dept === selectedLeft.dataset.dept &&
      card.dataset.file === selectedLeft.dataset.file;

    if (isMatch) {
      score++;
      matchesFound++;
      updateScoreboard();

      card.classList.add('matched');
      selectedLeft.classList.add('matched');
      selectedLeft.classList.remove('selected');

      statusEl.textContent = `✅ Matched! ${card.dataset.dept} — ${card.dataset.file}`;
      statusEl.className = 'db-status success';
      selectedLeft = null;
      busy = false;

      if (matchesFound >= LEFT_COUNT) {
        setTimeout(() => showEndScreen(), 600);
      }
    } else {
      card.classList.add('wrong');
      statusEl.textContent = `❌ Not a match — that was ${card.dataset.dept} — ${card.dataset.file}`;
      statusEl.className = 'db-status warning';

      setTimeout(() => {
        card.classList.remove('flipped', 'wrong');
        selectedLeft.classList.remove('flipped', 'selected');
        selectedLeft = null;
        busy = false;
      }, 1000);
    }
  }

  function updateScoreboard() {
    scoreEl.textContent = score;
    matchesEl.textContent = matchesFound;
  }

  // ── End screen ───────────────────────────────────────────

  function showEndScreen() {
    container.innerHTML = `
      <div class="db-end-screen">
        <h2>🎉 All Files Recovered!</h2>
        <div class="db-end-score">Final Score: ${score} / ${LEFT_COUNT}</div>
        <div class="db-lesson">
          <p>In this game you matched files to computers — but in the real world, KNP
          couldn't do this. When ransomware encrypted their network, <strong>all files were
          lost</strong> because backups were stored on the same network.</p>
          <p style="margin-top:10px"><strong>The lesson:</strong> Always follow the
          <strong>3-2-1 backup rule</strong> — keep <strong>3</strong> copies of your data,
          on <strong>2</strong> different media types, with <strong>1</strong> stored offsite
          or in the cloud, completely isolated from your main network.</p>
          <p style="margin-top:10px">The blocker cards you hit — Firewalls, MFA, Endpoint
          Protection, and Offsite Backups — are the controls that <em>could have</em>
          prevented the attack or enabled recovery.</p>
        </div>
        <button class="db-play-again">Play Again</button>
      </div>
    `;

    container.querySelector('.db-play-again').addEventListener('click', () => {
      buildDataBackupsGame(container);
    });
  }
}
