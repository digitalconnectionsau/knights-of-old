/* ==========================================================
   phishing.js — PUZZLE: Spot the Phishing Message
   
   Type: Interactive puzzle (spot the fake)
   Theme: Phishing emails and SMS were vectors in attacks
          like the one on KNP. Players learn to identify red flags.
   ========================================================== */

const messages = [
  {
    type: 'email',
    from: 'it-support@knp-logistics.com',
    subject: 'Urgent: Your password expires today',
    body: 'Dear employee, your password expires in 2 hours. Click here to reset it immediately: http://knp-logistcs.com/reset',
    isPhishing: true,
    redFlags: [
      'Misspelled domain: "knp-logistcs.com" (missing an "i")',
      'Creates false urgency ("2 hours")',
      'Generic greeting ("Dear employee")',
    ],
  },
  {
    type: 'sms',
    from: '+44 7911 123456',
    subject: null,
    body: 'KNP DELIVERY: Your parcel could not be delivered. Pay the £1.50 redelivery fee here: http://knp-del1very.co.uk/pay',
    isPhishing: true,
    redFlags: [
      'Suspicious URL with number substitution: "del1very"',
      'Unexpected delivery notification',
      'Requests payment via a link',
    ],
  },
  {
    type: 'email',
    from: 'jane.smith@knp-logistics.com',
    subject: 'Team meeting moved to 3 PM',
    body: 'Hi team, just a quick note — the 2 PM meeting has been moved to 3 PM in Conference Room B. See you there. — Jane',
    isPhishing: false,
    redFlags: [],
  },
  {
    type: 'email',
    from: 'accounts@knp-logistics.com',
    subject: 'Invoice #4892 attached',
    body: 'Please find attached invoice #4892 for immediate payment. Open the attached .exe file to view. Regards, Accounts Dept.',
    isPhishing: true,
    redFlags: [
      'Invoices don\'t come as .exe files',
      'Pressure to open immediately',
      'An .exe attachment is a major red flag',
    ],
  },
];

export function buildPhishingGame(container) {
  let currentMsg = 0;
  let score = 0;

  function renderMessage() {
    const msg = messages[currentMsg];

    container.innerHTML = `
      <h2>Spot the Phishing</h2>
      <p>Is this message <strong>legitimate</strong> or <strong>phishing</strong>?</p>
      <div class="phishing-message">
        <div class="msg-header">
          <span class="msg-type">${msg.type.toUpperCase()}</span>
          <span class="msg-from">From: ${msg.from}</span>
        </div>
        ${msg.subject ? `<div class="msg-subject">Subject: ${msg.subject}</div>` : ''}
        <div class="msg-body">${msg.body}</div>
      </div>
      <div class="phishing-choices"></div>
    `;

    // Style the message card
    const card = container.querySelector('.phishing-message');
    card.style.cssText = `
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 8px;
      padding: 16px;
      margin: 14px 0;
      font-family: monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    `;
    const header = card.querySelector('.msg-header');
    header.style.cssText = 'display:flex; justify-content:space-between; margin-bottom:6px; color:#888; font-size:0.8rem;';
    const subj = card.querySelector('.msg-subject');
    if (subj) subj.style.cssText = 'font-weight:bold; margin-bottom:8px;';

    const choicesDiv = container.querySelector('.phishing-choices');

    ['Phishing', 'Legitimate'].forEach((label) => {
      const btn = document.createElement('button');
      btn.className = 'game-btn';
      btn.textContent = label;
      btn.addEventListener('click', () => handleChoice(label === 'Phishing', msg));
      choicesDiv.appendChild(btn);
    });
  }

  function handleChoice(guessedPhishing, msg) {
    const correct = guessedPhishing === msg.isPhishing;
    if (correct) score++;

    // Show result
    const result = document.createElement('div');
    result.className = `result-msg ${correct ? 'success' : 'fail'}`;

    if (msg.isPhishing) {
      result.innerHTML = correct
        ? `✓ Correct — this IS phishing!<br><strong>Red flags:</strong><ul>${msg.redFlags.map((f) => `<li>${f}</li>`).join('')}</ul>`
        : `✗ This was phishing!<br><strong>Red flags you missed:</strong><ul>${msg.redFlags.map((f) => `<li>${f}</li>`).join('')}</ul>`;
    } else {
      result.innerHTML = correct
        ? '✓ Correct — this is a legitimate message.'
        : '✗ This was actually legitimate. Not every message is a threat — but always stay alert.';
    }
    container.appendChild(result);

    // Disable choice buttons
    container.querySelectorAll('.phishing-choices .game-btn').forEach((b) => (b.disabled = true));

    // Next or finish
    if (currentMsg < messages.length - 1) {
      const next = document.createElement('button');
      next.className = 'game-btn';
      next.textContent = 'Next Message →';
      next.style.marginTop = '14px';
      next.addEventListener('click', () => {
        currentMsg++;
        renderMessage();
      });
      container.appendChild(next);
    } else {
      const done = document.createElement('div');
      done.className = 'result-msg success';
      done.textContent = `Done! You scored ${score}/${messages.length}. Stay vigilant — phishing is the #1 way attackers get in.`;
      done.style.marginTop = '14px';
      container.appendChild(done);
    }
  }

  renderMessage();
}
