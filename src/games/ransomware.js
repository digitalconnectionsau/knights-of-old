/* ==========================================================
   ransomware.js — PUZZLE: Ransomware Response Challenge

   Type: Interactive scenario quiz
   Theme: KNP was brought down by ransomware (NotPetya).
          Players learn what ransomware is, how it spreads,
          and what to do (and NOT do) when it strikes.
   ========================================================== */

const scenarios = [
  {
    question: 'You arrive at work and your screen displays: "Your files have been encrypted. Pay 0.5 Bitcoin to unlock." What should you do first?',
    options: [
      { text: 'Pay the ransom immediately to get files back', correct: false },
      { text: 'Disconnect your computer from the network', correct: true },
      { text: 'Try to restart the computer', correct: false },
      { text: 'Ignore it — it\'s probably a prank', correct: false },
    ],
    explanation: 'The first step is to isolate the infected machine by disconnecting from the network. This prevents the ransomware from spreading to other devices. Never pay the ransom — there\'s no guarantee you\'ll get your files back.',
  },
  {
    question: 'How did the NotPetya ransomware that destroyed KNP initially spread to so many companies?',
    options: [
      { text: 'Through infected email attachments', correct: false },
      { text: 'Via a compromised software update (supply-chain attack)', correct: true },
      { text: 'Through public WiFi networks', correct: false },
      { text: 'By plugging in infected USB drives', correct: false },
    ],
    explanation: 'NotPetya spread through a compromised update to MeDoc, a Ukrainian accounting software. This "supply-chain attack" meant companies were infected through software they trusted. KNP\'s Ukrainian office downloaded the update and the malware spread across the entire global network in minutes.',
  },
  {
    question: 'Which of these practices would have BEST protected KNP from total ransomware destruction?',
    options: [
      { text: 'Stronger passwords', correct: false },
      { text: 'Regular, tested, offline backups', correct: true },
      { text: 'A faster internet connection', correct: false },
      { text: 'More expensive antivirus software', correct: false },
    ],
    explanation: 'Regular offline backups are the single best defence against ransomware. If your backups are offline (air-gapped), the ransomware can\'t encrypt them. KNP lost nearly all their data because backups were connected to the same network.',
  },
  {
    question: 'A colleague sends you a link saying "Check out this funny video!" but the link looks suspicious. What should you do?',
    options: [
      { text: 'Click the link — you trust your colleague', correct: false },
      { text: 'Forward it to other colleagues to check', correct: false },
      { text: 'Verify with your colleague through a different channel (e.g. phone call)', correct: true },
      { text: 'Reply asking if they sent it', correct: false },
    ],
    explanation: 'Always verify unexpected links through a different communication channel. Your colleague\'s account may have been compromised. Replying to the same message doesn\'t help — the attacker controls that channel.',
  },
  {
    question: 'What made NotPetya especially devastating compared to typical ransomware?',
    options: [
      { text: 'It demanded more money than usual', correct: false },
      { text: 'It was actually a wiper — it destroyed data permanently, with no way to decrypt', correct: true },
      { text: 'It only targeted large companies', correct: false },
      { text: 'It was the first ransomware ever created', correct: false },
    ],
    explanation: 'NotPetya looked like ransomware but was actually a "wiper" — it destroyed data permanently. Even if victims paid the ransom, their files could never be recovered. This is why KNP lost 158 years of business data overnight.',
  },
];

export function buildRansomwareGame(container) {
  let currentQ = 0;
  let score = 0;

  function renderQuestion() {
    const q = scenarios[currentQ];

    container.innerHTML = `
      <h2>Ransomware Response</h2>
      <p class="score-tracker">Question ${currentQ + 1} of ${scenarios.length}</p>
      <div class="ransomware-scenario">
        <p class="scenario-question">${q.question}</p>
      </div>
      <div class="ransomware-options"></div>
    `;

    // Style the scenario card
    const card = container.querySelector('.ransomware-scenario');
    card.style.cssText = `
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 8px;
      padding: 16px;
      margin: 14px 0;
      line-height: 1.5;
    `;

    const optionsDiv = container.querySelector('.ransomware-options');

    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'game-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => handleAnswer(opt, q));
      optionsDiv.appendChild(btn);
    });
  }

  function handleAnswer(chosen, q) {
    if (chosen.correct) score++;

    // Disable all buttons
    container.querySelectorAll('.ransomware-options .game-btn').forEach((b) => (b.disabled = true));

    // Show explanation
    const result = document.createElement('div');
    result.className = `result-msg ${chosen.correct ? 'success' : 'fail'}`;
    result.innerHTML = chosen.correct
      ? `✓ Correct!<br>${q.explanation}`
      : `✗ Not quite.<br>${q.explanation}`;
    container.appendChild(result);

    // Next or finish
    if (currentQ < scenarios.length - 1) {
      const next = document.createElement('button');
      next.className = 'game-btn';
      next.textContent = 'Next Question →';
      next.style.marginTop = '14px';
      next.addEventListener('click', () => {
        currentQ++;
        renderQuestion();
      });
      container.appendChild(next);
    } else {
      const done = document.createElement('div');
      done.className = 'result-msg success';
      done.textContent = `Done! You scored ${score}/${scenarios.length}. Remember — ransomware can destroy an entire business in minutes. Stay prepared.`;
      done.style.marginTop = '14px';
      container.appendChild(done);
    }
  }

  renderQuestion();
}
