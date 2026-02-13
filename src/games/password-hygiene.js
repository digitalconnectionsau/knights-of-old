/* ==========================================================
   password-hygiene.js — PUZZLE: Build a Strong Password
   
   Type: Interactive puzzle
   Theme: Weak & reused passwords were a key factor in the
          KNP breach. Players learn what makes a strong password.
   ========================================================== */

const traits = [
  { text: 'At least 12 characters',       good: true },
  { text: 'Mix of upper & lowercase',      good: true },
  { text: 'Includes numbers',              good: true },
  { text: 'Includes special characters',   good: true },
  { text: 'Not a dictionary word',         good: true },
  { text: 'Uses your pet\'s name',         good: false },
  { text: 'Same password for every site',  good: false },
  { text: 'Written on a sticky note',      good: false },
  { text: 'Password is "password123"',     good: false },
  { text: 'Shared with a colleague',       good: false },
];

export function buildPasswordHygieneGame(container) {
  container.innerHTML = `
    <h2>Password Hygiene</h2>
    <p>
      At KNP, attackers exploited weak and reused credentials to move through the network.
      <strong>Select every trait that makes a password STRONG.</strong>
    </p>
    <div class="trait-grid"></div>
    <button class="game-btn check-btn" style="margin-top:16px">Check My Answers</button>
    <div class="pw-result"></div>
  `;

  const grid = container.querySelector('.trait-grid');
  const checkBtn = container.querySelector('.check-btn');
  const resultDiv = container.querySelector('.pw-result');

  // Shuffle traits
  const shuffled = [...traits].sort(() => Math.random() - 0.5);

  shuffled.forEach((trait, i) => {
    const btn = document.createElement('button');
    btn.className = 'game-btn trait-btn';
    btn.textContent = trait.text;
    btn.dataset.index = i;
    btn.dataset.good = trait.good;
    btn.addEventListener('click', () => btn.classList.toggle('selected'));
    grid.appendChild(btn);
  });

  // Add some grid styling inline
  grid.style.display = 'flex';
  grid.style.flexWrap = 'wrap';
  grid.style.gap = '8px';

  checkBtn.addEventListener('click', () => {
    const buttons = grid.querySelectorAll('.trait-btn');
    let score = 0;
    const total = traits.filter((t) => t.good).length;

    buttons.forEach((btn) => {
      const isGood = btn.dataset.good === 'true';
      const isSelected = btn.classList.contains('selected');
      btn.disabled = true;

      if (isGood && isSelected) {
        btn.classList.add('correct');
        score++;
      } else if (isGood && !isSelected) {
        btn.classList.add('correct');
        btn.style.opacity = '0.5';
      } else if (!isGood && isSelected) {
        btn.classList.add('wrong');
      }
    });

    checkBtn.disabled = true;

    const perfect = score === total;
    resultDiv.innerHTML = `
      <div class="result-msg ${perfect ? 'success' : 'fail'}" style="margin-top:14px">
        ${perfect
          ? '✓ Perfect! You know what makes a strong password.'
          : `You picked ${score} of ${total} good traits. Remember — a strong, unique password for every account is your first line of defence.`}
      </div>
    `;
  });
}
