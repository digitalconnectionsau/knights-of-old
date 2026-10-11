/* ==========================================================
   ransomware.js — PUZZLE: Ransomware Response Challenge

   Type: Interactive scenario quiz
   Theme: KNP was brought down in June 2023 by the Akira
          ransomware gang, who got in by guessing one weak
          employee password on a system without MFA, then
          destroyed the backups. Players learn what ransomware
          is, how this attack worked, and what to do (and NOT
          do) when it strikes.
   ========================================================== */

const scenarios = [
  {
    question: 'You arrive at work and your screen displays: "Your files have been encrypted. Pay to unlock them." What should you do first?',
    options: [
      { text: 'Pay the ransom immediately to get files back', correct: false },
      { text: 'Disconnect your computer from the network and report it', correct: true },
      { text: 'Try to restart the computer', correct: false },
      { text: 'Ignore it — it\'s probably a prank', correct: false },
    ],
    explanation: 'Isolate the machine first: unplug the network cable or turn off Wi-Fi so the ransomware can\'t spread, then report it straight away. Don\'t pay — there\'s no guarantee you\'ll get your files back.',
  },
  {
    question: 'How did the attackers first get into KNP\'s systems?',
    options: [
      { text: 'A zero-day exploit nobody knew about', correct: false },
      { text: 'They guessed an employee\'s weak password on a system with no MFA', correct: true },
      { text: 'An infected USB stick left in the car park', correct: false },
      { text: 'A compromised software update', correct: false },
    ],
    explanation: 'No clever hacking was needed. The Akira gang guessed one employee\'s password on an internet-facing system, and because there was no multi-factor authentication, the password was all they needed.',
  },
  {
    question: 'Which of these would have BEST let KNP recover after the attack?',
    options: [
      { text: 'Stronger antivirus software', correct: false },
      { text: 'Regular, tested backups kept offline or immutable', correct: true },
      { text: 'A faster internet connection', correct: false },
      { text: 'Cyber insurance', correct: false },
    ],
    explanation: 'The attackers destroyed KNP\'s backups and disaster recovery, so there was no way back. Backups that are offline or can\'t be changed (immutable) survive an attack — and you need to test that you can actually restore from them. KNP had insurance, and it wasn\'t enough.',
  },
  {
    question: 'A colleague sends you a link saying "Check out this funny video!" but the link looks suspicious. What should you do?',
    options: [
      { text: 'Click the link — you trust your colleague', correct: false },
      { text: 'Forward it to other colleagues to check', correct: false },
      { text: 'Verify with your colleague through a different channel (e.g. phone call)', correct: true },
      { text: 'Reply asking if they sent it', correct: false },
    ],
    explanation: 'Always verify unexpected links through a different channel. Your colleague\'s account may have been compromised, and replying to the same message doesn\'t help — the attacker controls that channel.',
  },
  {
    question: 'What happened to KNP after the attack?',
    options: [
      { text: 'It paid the ransom and was back up within a week', correct: false },
      { text: 'It restored everything from backups', correct: false },
      { text: 'It went into administration and around 700 people lost their jobs', correct: true },
      { text: 'Nothing — insurance covered all the costs', correct: false },
    ],
    explanation: 'With systems locked and no backups, KNP couldn\'t operate. The ransom was estimated at up to £5 million, which it couldn\'t pay. A 158-year-old business went into administration in September 2023 and around 700 jobs were lost — all starting with one guessed password.',
  },
];

export function buildRansomwareGame(container, item, complete = () => {}) {
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
      complete();
      const done = document.createElement('div');
      done.className = 'result-msg success';
      done.textContent = `Done! You scored ${score}/${scenarios.length}. Remember — ransomware can destroy an entire business in minutes. Stay prepared.`;
      done.style.marginTop = '14px';
      container.appendChild(done);
    }
  }

  renderQuestion();
}
