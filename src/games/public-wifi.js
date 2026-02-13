/* ==========================================================
   public-wifi.js — INTERACTIVE STORY: The Coffee Shop Trap
   
   Type: Choose-your-own-adventure story
   Theme: Using unsecured public WiFi can expose credentials
          and sensitive data to attackers.
   ========================================================== */

const scenes = {
  start: {
    text: `You're a KNP employee working remotely at a coffee shop. You need to access the company
           system to finish an urgent report. The coffee shop offers free WiFi — no password needed.`,
    choices: [
      { text: 'Connect to the free WiFi and log in', next: 'free-wifi' },
      { text: 'Use your phone\'s mobile hotspot instead', next: 'hotspot' },
    ],
  },
  'free-wifi': {
    text: `You connect and log into the company portal. What you don't know: an attacker on the
           same network is running a man-in-the-middle attack. They capture your login credentials.
           
           Weeks later, those credentials are used to breach KNP's systems.`,
    choices: [
      { text: 'What should I have done?', next: 'lesson-wifi' },
    ],
  },
  hotspot: {
    text: `Good thinking. Your mobile data connection is encrypted and far harder to intercept than
           open WiFi. You log in safely and finish your report.`,
    choices: [
      { text: 'What if I had to use the public WiFi?', next: 'vpn-option' },
      { text: 'Start over', next: 'start' },
    ],
    isGoodChoice: true,
  },
  'lesson-wifi': {
    text: `Public WiFi is one of the easiest ways for attackers to steal credentials. Here's what
           you should always do:
           
           • Avoid logging into sensitive systems on open WiFi
           • Use a VPN to encrypt your traffic
           • Use your phone's hotspot for anything confidential
           • Make sure websites use HTTPS (look for the padlock icon)`,
    choices: [
      { text: 'What about using a VPN?', next: 'vpn-option' },
      { text: 'Start over and make the right choice', next: 'start' },
    ],
  },
  'vpn-option': {
    text: `A VPN (Virtual Private Network) encrypts all your internet traffic, even on public WiFi.
           If KNP had required VPN usage for remote workers, the attacker couldn't have read the
           captured traffic.
           
           Always: VPN first, then connect. It's a simple habit that stops a devastating attack.`,
    choices: [
      { text: 'Start over', next: 'start' },
    ],
    isEnding: true,
  },
};

export function buildPublicWifiGame(container) {
  function renderScene(sceneId) {
    const scene = scenes[sceneId];

    container.innerHTML = `
      <h2>The Coffee Shop Trap</h2>
      <p>${scene.text}</p>
      <div class="story-choices"></div>
    `;

    const choicesDiv = container.querySelector('.story-choices');

    scene.choices.forEach((choice) => {
      const btn = document.createElement('button');
      btn.className = 'game-btn';
      btn.textContent = choice.text;
      btn.addEventListener('click', () => renderScene(choice.next));
      choicesDiv.appendChild(btn);
    });

    if (scene.isGoodChoice) {
      const badge = document.createElement('div');
      badge.className = 'result-msg success';
      badge.textContent = '✓ Smart choice — you avoided a common trap.';
      badge.style.marginTop = '16px';
      container.appendChild(badge);
    }

    if (scene.isEnding) {
      const badge = document.createElement('div');
      badge.className = 'result-msg success';
      badge.textContent = 'Lesson complete — always use a VPN on public networks.';
      badge.style.marginTop = '16px';
      container.appendChild(badge);
    }
  }

  renderScene('start');
}
