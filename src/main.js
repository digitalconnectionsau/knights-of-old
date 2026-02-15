/* ==============================================================
   main.js — Application entry point
   ============================================================== */

// Styles
import './style.css';
import './wall/wall.css';
import './modal/modal.css';
import './games/dark-web.css';
import './games/facebook.css';
import './games/linkedin.css';
import './sidebar/sidebar.css';

// Modules
import { initWall }    from './wall/wall.js';
import { initModal }   from './modal/modal.js';
import { initSidebar } from './sidebar/sidebar.js';
import { initLines }   from './wall/lines.js';

// ---- Boot ----

document.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.getElementById('intro-screen');
  const wallScene = document.getElementById('wall-scene');
  const startBtn = document.getElementById('start-btn');

  // Start button → hide intro, show wall
  startBtn.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    wallScene.classList.remove('hidden');
  });

  // Initialise core systems
  initWall();
  initModal();
  initSidebar();
  initLines();
});
