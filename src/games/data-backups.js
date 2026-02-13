/* ==========================================================
   data-backups.js — QUIZ: Data Backup Best Practices
   
   Type: Multiple-choice quiz
   Theme: KNP had no viable backups when ransomware struck,
          making recovery impossible.
   ========================================================== */

const questions = [
  {
    question:
      'KNP\'s ransomware attack encrypted all their files. Their backups were also on the same network. What went wrong?',
    options: [
      { text: 'They didn\'t have enough storage', correct: false },
      { text: 'Backups should be stored offline or in a separate, isolated location', correct: true },
      { text: 'Backups don\'t help with ransomware', correct: false },
    ],
    explanation:
      'If backups are on the same network, ransomware can encrypt them too. The 3-2-1 rule: 3 copies, 2 different media, 1 offsite.',
  },
  {
    question: 'How often should critical business data be backed up?',
    options: [
      { text: 'Once a year', correct: false },
      { text: 'Once a month', correct: false },
      { text: 'Daily or more frequently, depending on how fast data changes', correct: true },
    ],
    explanation:
      'Backup frequency should match how much data you can afford to lose. For critical systems, daily (or even hourly) is standard.',
  },
  {
    question: 'Which backup strategy is considered best practice?',
    options: [
      { text: 'Copy everything to a USB stick on your desk', correct: false },
      { text: 'The 3-2-1 rule — 3 copies, 2 media types, 1 offsite', correct: true },
      { text: 'Email important files to yourself', correct: false },
    ],
    explanation:
      'The 3-2-1 rule ensures that even if one location is compromised, you have recovery options elsewhere.',
  },
];

export function buildDataBackupsGame(container) {
  let currentQ = 0;

  function renderQuestion() {
    const q = questions[currentQ];
    container.innerHTML = `
      <h2>Data Backups</h2>
      <p class="game-question">${q.question}</p>
      <div class="game-options"></div>
    `;

    const optionsDiv = container.querySelector('.game-options');

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'game-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => handleAnswer(i, q, optionsDiv));
      optionsDiv.appendChild(btn);
    });
  }

  function handleAnswer(index, q, optionsDiv) {
    const buttons = optionsDiv.querySelectorAll('.game-btn');
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      btn.classList.add(q.options[i].correct ? 'correct' : 'wrong');
    });

    const msg = document.createElement('div');
    msg.className = `result-msg ${q.options[index].correct ? 'success' : 'fail'}`;
    msg.innerHTML = q.options[index].correct
      ? `✓ Correct! ${q.explanation}`
      : `✗ Not quite. ${q.explanation}`;
    container.appendChild(msg);

    if (currentQ < questions.length - 1) {
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
      done.textContent = 'Quiz complete — remember, backups are your last line of defence against ransomware.';
      done.style.marginTop = '14px';
      container.appendChild(done);
    }
  }

  renderQuestion();
}
