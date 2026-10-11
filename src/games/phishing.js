/* ==========================================================
   phishing.js — WIZARD: Craft the Perfect Phishing Email

   Type:  Drag-and-drop email builder + social engineering
   Theme: Players learn what makes phishing effective by
          building one themselves — choosing the target,
          sender disguise, subject, body, CTA, and urgency.
          The goal: get admin-level access to KNP's network.
   ========================================================== */

// ─── COMPANY DIRECTORY (20 people) ──────────────────────────
// The correct target is marked with `target: true`.
// Each person has hints so clues scattered in other games
// could point players to the right choice.

const DIRECTORY = [
  { name: 'Angela Moore',  role: 'CEO',                  hint: 'Very security-conscious, ignores unknown emails', target: false },
  { name: 'Brian Ellis',   role: 'CFO',                  hint: 'Suspicious of anything financial he didn\'t request', target: false },
  { name: 'Claire Dunn',   role: 'Head of IT Security',  hint: 'Runs the entire security programme — will spot a fake instantly', target: false },
  { name: 'Derek Nolan',   role: 'Senior Network Admin',  hint: 'Has admin credentials but is highly trained in threat detection', target: false },
  { name: 'Emma Watts',    role: 'HR Director',          hint: 'Handles sensitive data but forwards suspicious emails to IT', target: false },
  { name: 'Faisal Khan',   role: 'Dispatch Supervisor',  hint: 'Barely uses email — prefers phone calls', target: false },
  { name: 'Grace Chen',    role: 'Marketing Manager',    hint: 'Clicks links in emails regularly but has no admin access', target: false },
  { name: 'Harry Barnes',  role: 'Warehouse Manager',    hint: 'Uses a shared terminal — no personal credentials', target: false },
  { name: 'Isla Morgan',   role: 'Receptionist',         hint: 'Opens everything but has read-only network access', target: false },
  { name: 'Jake Simmons',  role: 'IT Help Desk (Junior)', hint: 'New starter, eager to help. Has domain admin rights to reset passwords & manage systems', target: true },
  { name: 'Karen Webb',    role: 'Fleet Coordinator',    hint: 'Rarely at a computer — mostly on the yard', target: false },
  { name: 'Liam Price',    role: 'Driver',               hint: 'Only uses the mobile depot app', target: false },
  { name: 'Mona Patel',    role: 'Accounts Payable',     hint: 'Trained to call back on invoices before paying', target: false },
  { name: 'Nathan Cross',  role: 'Sales Executive',      hint: 'High email volume but zero system privileges', target: false },
  { name: 'Olivia Hart',   role: 'Legal Counsel',        hint: 'Reviews every attachment in a sandbox first', target: false },
  { name: 'Paul Becker',   role: 'Building Maintenance', hint: 'Has a login but only for the building management system', target: false },
  { name: 'Queenie Yip',   role: 'Office Manager',       hint: 'Organises everything, but IT removed her admin access last year', target: false },
  { name: 'Ryan Mitchell', role: 'Board Secretary',      hint: 'Very cautious — double-checks everything with Angela', target: false },
  { name: 'Sarah Lloyd',   role: 'Payroll Officer',      hint: 'Handles salary data but all access is read-only', target: false },
  { name: 'Tom Fletcher',  role: 'Compliance Analyst',   hint: 'Reports phishing attempts — you\'d be caught immediately', target: false },
];

// ─── EMAIL ELEMENT OPTIONS ──────────────────────────────────
// Each option has `score` (0–3) — higher = more effective.
// The game tallies the total to determine the effectiveness %.

const OPTIONS = {
  from: [
    { id: 'f1', text: 'Microsoft 365 Admin <no-reply@m1crosoft-365.com>',       score: 1, feedback: 'Misspelled domain — a trained eye will catch this.' },
    { id: 'f2', text: 'KNP IT Operations <it-ops@knp-logistics.com>',           score: 3, feedback: 'Perfect — matches an internal address the target would trust.' },
    { id: 'f3', text: 'Prince of Nigeria <prince@royalmail.ng>',                score: 0, feedback: 'Nobody falls for this any more.' },
    { id: 'f4', text: 'Derek Nolan <derek.nolan@knp-logistics.com>',            score: 2, feedback: 'Good — impersonating the senior admin, but Derek might notice.' },
    { id: 'f5', text: 'Helpdesk <support@helpdesk-knp.com>',                    score: 1, feedback: 'The domain doesn\'t match KNP\'s real domain.' },
  ],
  subject: [
    { id: 's1', text: 'You have won a prize!!!',                                score: 0, feedback: 'Obvious spam — delete immediately.' },
    { id: 's2', text: 'ACTION REQUIRED: Domain admin password expiry',           score: 3, feedback: 'Targeted, urgent, relevant to the help desk role.' },
    { id: 's3', text: 'Staff social event this Friday 🎉',                       score: 0, feedback: 'Interesting but won\'t prompt credential entry.' },
    { id: 's4', text: 'Urgent: Firewall update — admin credentials needed',     score: 2, feedback: 'Good urgency, but asking for credentials in the subject is suspicious.' },
    { id: 's5', text: 'IT ticket #40291 — escalated to you',                    score: 2, feedback: 'Relevant to help desk but lacks urgency around credentials.' },
  ],
  body: [
    { id: 'b1', text: 'Hi Jake, the domain admin password on the primary DC expires at 5 PM today. Please log in to the admin portal and renew it before the deadline to avoid service disruption across the network.',  score: 3, feedback: 'Personalised, specific, uses internal jargon — very convincing.' },
    { id: 'b2', text: 'Dear Employee, please update your password by clicking the link below.',    score: 1, feedback: 'Too generic — "Dear Employee" is a classic red flag.' },
    { id: 'b3', text: 'HELLO FRIEND. I am a wealthy businessman and I need your help moving funds.',  score: 0, feedback: 'This is comedy, not phishing.' },
    { id: 'b4', text: 'Hi, we noticed unusual sign-in activity on the admin account. Please verify your credentials at the link below to prevent lockout.',  score: 2, feedback: 'Decent — uses fear, but isn\'t personalised to the target.' },
  ],
  cta: [
    { id: 'c1', text: 'Click here: https://knp-logistics.com.admin-portal.net/verify',  score: 3, feedback: 'Lookalike domain that includes the real company name — very deceptive.' },
    { id: 'c2', text: 'Please visit: http://totally-legit-site.com/login',               score: 0, feedback: 'Obviously fake — nobody trusts "totally-legit-site".' },
    { id: 'c3', text: 'Reply to this email with your current admin password',             score: 1, feedback: 'Asking directly for a password is suspicious even to new starters.' },
    { id: 'c4', text: 'Open the attached PDF for renewal instructions (contains macro)',  score: 2, feedback: 'Attachments work but many mail filters block macros now.' },
  ],
  urgency: [
    { id: 'u1', text: '⚠️ THIS MUST BE DONE WITHIN 1 HOUR OR ALL SYSTEMS WILL SHUT DOWN.',  score: 1, feedback: 'Too aggressive — this level of panic looks fake.' },
    { id: 'u2', text: 'Please complete this by end of business today to avoid any disruption to helpdesk services.',  score: 3, feedback: 'Professional, measured urgency — just enough pressure without screaming.' },
    { id: 'u3', text: 'When you get a chance, no rush.',                                     score: 0, feedback: 'No urgency = no reason to act quickly = target might verify.' },
    { id: 'u4', text: 'Time-sensitive: Derek needs this done before his 3 PM meeting.',       score: 2, feedback: 'Name-dropping the boss adds pressure, but the target might check with Derek.' },
  ],
};

const MAX_SCORE = 3 * 5; // 3 per slot × 5 slots
const WIN_THRESHOLD = 12; // need at least 12/15 with correct target

// ─── BUILD GAME ─────────────────────────────────────────────

export function buildPhishingGame(container, item, complete = () => {}) {
  const box = document.getElementById('modal-box');
  box.classList.add('modal-fullscreen');

  // ── State ────────────────────────────────────────────────
  let selectedTarget = null;
  const slots = { from: null, subject: null, body: null, cta: null, urgency: null };

  // ── Render skeleton ──────────────────────────────────────

  container.innerHTML = `
    <div class="ph-game">
      <div class="ph-top-bar">
        <h2>🎣 Phishing Wizard</h2>
        <span class="ph-objective">
          <strong>Objective:</strong> Craft a phishing email to gain admin-level access to the KNP network.
          Choose the right target and build a convincing email.
        </span>
        <button class="ph-help-btn" id="ph-help-btn">💡 Help & Examples</button>
      </div>

      <div class="ph-board">
        <!-- Left panel -->
        <div class="ph-left">
          <span class="ph-section-label">Effectiveness</span>
          <div class="ph-meter-wrap">
            <div class="ph-meter-label">
              <span>Phishing Power</span>
              <span class="ph-meter-val" id="ph-meter-val">0%</span>
            </div>
            <div class="ph-meter-bar">
              <div class="ph-meter-fill" id="ph-meter-fill"></div>
            </div>
          </div>

          <span class="ph-section-label">Target — Company Directory</span>
          <div class="ph-target-wrap">
            <div class="ph-target-selected" id="ph-target-display">
              <span class="ph-no-target">No target selected — choose from the directory below</span>
            </div>
            <input class="ph-dir-search" id="ph-dir-search" type="text"
                   placeholder="Search directory…" autocomplete="off" />
            <div class="ph-dir-list" id="ph-dir-list"></div>
          </div>

          <div class="ph-actions">
            <button class="ph-send-btn" id="ph-send" disabled>📧 Send Phishing Email</button>
            <button class="ph-reset-btn" id="ph-reset">↩ Reset</button>
          </div>
        </div>

        <!-- Right panel -->
        <div class="ph-right">
          <!-- Email preview -->
          <div class="ph-email">
            <div class="ph-email-header">
              <div class="ph-email-row">
                <span class="ph-field-label">From:</span>
                <div class="ph-drop-zone" id="dz-from" data-slot="from">Drop a sender here…</div>
              </div>
              <div class="ph-email-row">
                <span class="ph-field-label">To:</span>
                <span id="ph-email-to" style="color:#889;font-size:0.78rem;font-style:italic">Select a target from the directory</span>
              </div>
              <div class="ph-email-row">
                <span class="ph-field-label">Subject:</span>
                <div class="ph-drop-zone" id="dz-subject" data-slot="subject">Drop a subject line here…</div>
              </div>
            </div>
            <div class="ph-email-body">
              <div class="ph-drop-zone" id="dz-body" data-slot="body" style="min-height:50px">Drop the email body here…</div>
              <div class="ph-drop-zone" id="dz-cta" data-slot="cta" style="margin-top:8px">Drop a call-to-action here…</div>
              <div class="ph-drop-zone" id="dz-urgency" data-slot="urgency" style="margin-top:8px">Drop an urgency line here…</div>
            </div>
          </div>

          <!-- Draggable options -->
          <div class="ph-options-area" id="ph-options-area"></div>
        </div>
      </div>
    </div>
  `;

  // ── DOM refs ─────────────────────────────────────────────

  const gameEl      = container.querySelector('.ph-game');
  const meterVal    = container.querySelector('#ph-meter-val');
  const meterFill   = container.querySelector('#ph-meter-fill');
  const targetDisp  = container.querySelector('#ph-target-display');
  const emailTo     = container.querySelector('#ph-email-to');
  const dirSearch   = container.querySelector('#ph-dir-search');
  const dirList     = container.querySelector('#ph-dir-list');
  const sendBtn     = container.querySelector('#ph-send');
  const resetBtn    = container.querySelector('#ph-reset');
  const helpBtn     = container.querySelector('#ph-help-btn');
  const optionsArea = container.querySelector('#ph-options-area');
  const dropZones   = container.querySelectorAll('.ph-drop-zone');

  // ── Populate directory ───────────────────────────────────

  function renderDirectory(filter = '') {
    dirList.innerHTML = '';
    const f = filter.toLowerCase();
    DIRECTORY.forEach((person, i) => {
      if (f && !person.name.toLowerCase().includes(f) && !person.role.toLowerCase().includes(f)) return;
      const el = document.createElement('div');
      el.className = `ph-dir-person ${selectedTarget === i ? 'selected' : ''}`;
      el.dataset.idx = i;
      el.innerHTML = `
        <span class="ph-dir-name">${person.name}</span>
        <span class="ph-dir-role">${person.role}</span>
        <span class="ph-dir-hint" title="${person.hint}">ℹ️</span>
      `;
      el.addEventListener('click', () => selectTarget(i));
      dirList.appendChild(el);
    });
  }

  dirSearch.addEventListener('input', () => renderDirectory(dirSearch.value));

  function selectTarget(idx) {
    selectedTarget = idx;
    const p = DIRECTORY[idx];
    targetDisp.innerHTML = `🎯 <strong>${p.name}</strong> — ${p.role}`;
    emailTo.textContent = `${p.name.toLowerCase().replace(' ', '.')}@knp-logistics.com`;
    emailTo.style.color = '#d0d0e0';
    emailTo.style.fontStyle = 'normal';
    renderDirectory(dirSearch.value);
    updateMeter();
    checkReady();
  }

  // ── Populate draggable options ───────────────────────────

  function renderOptions() {
    const groups = [
      { key: 'from',    label: 'Sender (From)',  cat: 'cat-from' },
      { key: 'subject', label: 'Subject Line',   cat: 'cat-subject' },
      { key: 'body',    label: 'Email Body',     cat: 'cat-body' },
      { key: 'cta',     label: 'Call to Action',  cat: 'cat-cta' },
      { key: 'urgency', label: 'Urgency / Pressure', cat: 'cat-urgency' },
    ];

    optionsArea.innerHTML = '';
    groups.forEach(g => {
      const grp = document.createElement('div');
      grp.className = 'ph-opt-group';
      grp.innerHTML = `<div class="ph-opt-group-label">${g.label}</div><div class="ph-opt-items" id="opts-${g.key}"></div>`;
      optionsArea.appendChild(grp);

      const itemsContainer = grp.querySelector('.ph-opt-items');
      OPTIONS[g.key].forEach(opt => {
        const el = document.createElement('div');
        el.className = `ph-opt-item ${g.cat} ${slots[g.key]?.id === opt.id ? 'used' : ''}`;
        el.draggable = true;
        el.dataset.slot = g.key;
        el.dataset.optId = opt.id;
        el.textContent = opt.text;

        // Drag events
        el.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', JSON.stringify({ slot: g.key, optId: opt.id }));
          el.classList.add('dragging');
        });
        el.addEventListener('dragend', () => el.classList.remove('dragging'));

        // Click-to-place (fallback for touch/accessibility)
        el.addEventListener('click', () => {
          if (el.classList.contains('used')) return;
          placeOption(g.key, opt.id);
        });

        itemsContainer.appendChild(el);
      });
    });
  }

  // ── Drop zones ───────────────────────────────────────────

  dropZones.forEach(dz => {
    dz.addEventListener('dragover', (e) => {
      e.preventDefault();
      dz.classList.add('drag-over');
    });
    dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
    dz.addEventListener('drop', (e) => {
      e.preventDefault();
      dz.classList.remove('drag-over');
      try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        if (data.slot === dz.dataset.slot) {
          placeOption(data.slot, data.optId);
        }
      } catch (_) { /* ignore bad data */ }
    });
  });

  // ── Place / clear options ────────────────────────────────

  function placeOption(slotKey, optId) {
    const opt = OPTIONS[slotKey].find(o => o.id === optId);
    if (!opt) return;

    slots[slotKey] = opt;

    // Update the drop zone
    const dz = container.querySelector(`#dz-${slotKey}`);
    dz.classList.add('filled');
    dz.innerHTML = `
      <span>${opt.text}</span>
      <button class="ph-zone-clear" data-slot="${slotKey}">✕</button>
    `;
    dz.querySelector('.ph-zone-clear').addEventListener('click', (e) => {
      e.stopPropagation();
      clearSlot(slotKey);
    });

    renderOptions();
    updateMeter();
    checkReady();
  }

  function clearSlot(slotKey) {
    slots[slotKey] = null;
    const dz = container.querySelector(`#dz-${slotKey}`);
    dz.classList.remove('filled');
    const placeholders = {
      from: 'Drop a sender here…',
      subject: 'Drop a subject line here…',
      body: 'Drop the email body here…',
      cta: 'Drop a call-to-action here…',
      urgency: 'Drop an urgency line here…',
    };
    dz.innerHTML = placeholders[slotKey];
    renderOptions();
    updateMeter();
    checkReady();
  }

  // ── Effectiveness meter ──────────────────────────────────

  function calcScore() {
    let total = 0;
    Object.values(slots).forEach(opt => { if (opt) total += opt.score; });
    return total;
  }

  function updateMeter() {
    const score = calcScore();
    const pct = Math.round((score / MAX_SCORE) * 100);
    meterVal.textContent = `${pct}%`;
    meterFill.style.width = `${pct}%`;
    meterFill.className = 'ph-meter-fill'
      + (pct >= 70 ? ' high' : pct >= 40 ? ' med' : '');
  }

  function checkReady() {
    const allFilled = Object.values(slots).every(s => s !== null);
    sendBtn.disabled = !(allFilled && selectedTarget !== null);
  }

  // ── Reset ────────────────────────────────────────────────

  resetBtn.addEventListener('click', () => {
    selectedTarget = null;
    Object.keys(slots).forEach(k => slots[k] = null);
    targetDisp.innerHTML = '<span class="ph-no-target">No target selected</span>';
    emailTo.textContent = 'Select a target from the directory';
    emailTo.style.color = '#889';
    emailTo.style.fontStyle = 'italic';
    dropZones.forEach(dz => {
      dz.classList.remove('filled');
      const placeholders = {
        from: 'Drop a sender here…', subject: 'Drop a subject line here…',
        body: 'Drop the email body here…', cta: 'Drop a call-to-action here…',
        urgency: 'Drop an urgency line here…',
      };
      dz.innerHTML = placeholders[dz.dataset.slot];
    });
    renderDirectory();
    renderOptions();
    updateMeter();
    checkReady();
  });

  // ── Send email ───────────────────────────────────────────

  sendBtn.addEventListener('click', sendEmail);

  function sendEmail() {
    // Show sending animation
    const sending = document.createElement('div');
    sending.className = 'ph-sending-overlay';
    sending.innerHTML = `
      <span class="ph-sending-icon">📧</span>
      <p>Sending phishing email…</p>
    `;
    gameEl.appendChild(sending);

    setTimeout(() => {
      sending.remove();
      showResult();
    }, 1800);
  }

  function showResult() {
    const target = DIRECTORY[selectedTarget];
    const score = calcScore();
    const pct = Math.round((score / MAX_SCORE) * 100);
    const rightTarget = target.target === true;
    const emailGood = score >= WIN_THRESHOLD;
    const success = rightTarget && emailGood;

    // Build feedback for each slot
    const slotFeedback = Object.entries(slots)
      .map(([key, opt]) => {
        const label = { from: 'Sender', subject: 'Subject', body: 'Body', cta: 'CTA', urgency: 'Urgency' }[key];
        const stars = '★'.repeat(opt.score) + '☆'.repeat(3 - opt.score);
        return `<strong>${label}</strong> ${stars} — ${opt.feedback}`;
      })
      .join('<br>');

    let icon, title, titleColor, text;

    if (success) {
      icon = '🎣';
      title = 'Phishing Successful!';
      titleColor = '#00e676';
      text = `<strong>${target.name}</strong> (${target.role}) fell for your email and entered their admin credentials on your fake portal. You now have domain admin access to the KNP network.`;
    } else if (rightTarget && !emailGood) {
      icon = '🗑️';
      title = 'Email Deleted — Not Convincing Enough';
      titleColor = '#ff8800';
      text = `You targeted the right person — <strong>${target.name}</strong> — but your email wasn't convincing enough (${pct}% effectiveness). ${target.name} got suspicious and deleted it. Try improving your email elements.`;
    } else if (!rightTarget && emailGood) {
      icon = '🚫';
      title = 'Wrong Target — Phish Failed';
      titleColor = '#ff6b6b';
      text = `Your email was well-crafted (${pct}%), but <strong>${target.name}</strong> ${target.hint.toLowerCase()}. You need someone with admin rights who might actually fall for it.`;
    } else {
      icon = '🗑️';
      title = 'Total Failure';
      titleColor = '#ff4444';
      text = `Wrong target AND weak email (${pct}%). <strong>${target.name}</strong> ${target.hint.toLowerCase()}. Go back and rethink both your target and your email.`;
    }

    const overlay = document.createElement('div');
    overlay.className = 'ph-result-overlay';
    overlay.innerHTML = `
      <div class="ph-result-box">
        <span class="ph-result-icon">${icon}</span>
        <h3 style="color:${titleColor}">${title}</h3>
        <p class="ph-result-text">${text}</p>
        <div class="ph-result-detail">${slotFeedback}</div>
        ${success
          ? '<button class="ph-continue-btn" id="ph-result-continue">Continue →</button>'
          : '<button class="ph-try-again-btn" id="ph-result-retry">↩ Try Again</button>'
        }
      </div>
    `;
    gameEl.appendChild(overlay);

    if (success) {
      overlay.querySelector('#ph-result-continue').addEventListener('click', () => {
        overlay.remove();
        showEndScreen();
      });
    } else {
      overlay.querySelector('#ph-result-retry').addEventListener('click', () => {
        overlay.remove();
      });
    }
  }

  // ── Help overlay ─────────────────────────────────────────

  helpBtn.addEventListener('click', showHelp);

  function showHelp() {
    const overlay = document.createElement('div');
    overlay.className = 'ph-help-overlay';
    overlay.innerHTML = `
      <div class="ph-help-box">
        <h3>💡 How to Craft an Effective Phishing Email</h3>
        <p>Real attackers research their targets carefully. Your email needs to be:</p>
        <ul>
          <li><strong>Personalised</strong> — use the target's name, role, and internal jargon</li>
          <li><strong>From a trusted source</strong> — impersonate someone the target would obey</li>
          <li><strong>Urgent but professional</strong> — create time pressure without looking panicked</li>
          <li><strong>Relevant to their job</strong> — the request must make sense for their role</li>
          <li><strong>Sent to the right person</strong> — they must have the access you need AND be likely to comply</li>
        </ul>

        <h4>Example: Effective Phishing Email</h4>
        <div class="ph-example-email">
          <strong>From:</strong> IT Operations &lt;it-ops@company.com&gt;<br>
          <strong>To:</strong> jake.simmons@company.com<br>
          <strong>Subject:</strong> ACTION REQUIRED: Admin password expiry<br><br>
          Hi Jake,<br><br>
          The domain admin password on DC-01 is set to expire at 5 PM today.
          Please log in to the admin portal and renew it before the deadline
          to prevent service disruptions.<br><br>
          <a style="color:#c77dff">https://company.com.admin-portal.net/verify</a><br><br>
          Please complete this by end of business today.<br>
          — IT Operations
        </div>
        <p><strong>Why it works:</strong> Internal sender address, personalised greeting, role-relevant
        request, subtle fake URL that includes the real domain, and professional urgency.</p>

        <h4>Who to Target?</h4>
        <p>You need admin-level access. Look for someone who:</p>
        <ul>
          <li>Has <strong>admin credentials</strong> (not everyone does)</li>
          <li>Is <strong>less likely to spot a fake</strong> — junior staff, new starters, or people outside IT security</li>
          <li>Would <strong>respond quickly</strong> to an IT-related request</li>
        </ul>
        <p>Check the hints (ℹ️) next to each person in the directory for clues!</p>

        <button class="ph-help-close">Got it — close</button>
      </div>
    `;
    gameEl.appendChild(overlay);
    overlay.querySelector('.ph-help-close').addEventListener('click', () => overlay.remove());
  }

  // ── End screen ───────────────────────────────────────────

  function showEndScreen() {
    complete();
    container.innerHTML = `
      <div class="ph-end-screen">
        <h2>🎣 Access Granted</h2>
        <div class="ph-lesson">
          <p>You've just done exactly what the real attackers did to KNP. A single phishing
          email to the right person gave you the admin credentials needed to deploy
          ransomware across the entire network.</p>
          <p style="margin-top:10px">
            <strong>Why Jake?</strong> As a junior IT help desk operator, Jake had
            <strong>domain admin rights</strong> to reset passwords and manage systems —
            but as a new starter, he hadn't yet developed the instinct to spot a phishing
            email. Senior staff like the Head of IT Security would never fall for it.
          </p>
          <p style="margin-top:10px">
            <strong>The lesson:</strong> The most dangerous people to phish aren't the
            senior executives — they're the <strong>junior staff with elevated privileges</strong>.
            Organisations must follow the <strong>principle of least privilege</strong>:
            give people only the access they absolutely need, and provide
            <strong>security awareness training</strong> from day one.
          </p>
        </div>
        <button class="ph-play-again">Play Again</button>
      </div>
    `;

    container.querySelector('.ph-play-again').addEventListener('click', () => {
      buildPhishingGame(container);
    });
  }

  // ── Init ─────────────────────────────────────────────────

  renderDirectory();
  renderOptions();
  updateMeter();
}
