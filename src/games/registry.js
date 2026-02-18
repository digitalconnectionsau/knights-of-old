/* ================================================================
   registry.js — Maps item IDs → mini-game builder functions.

   To add a new game:
     1. Create a file in src/games/
     2. Export a builder function:  (container, item) => { … }
     3. Import it here and add it to gameRegistry.
   ================================================================ */

import { buildFacebookGame } from './facebook.js';
import { buildLinkedinGame } from './linkedin.js';
import { buildPasswordHygieneGame } from './password-hygiene.js';
import { buildDarkWebGame } from './dark-web.js';
import { buildDataBackupsGame } from './data-backups.js';
import { buildPublicWifiGame } from './public-wifi.js';
import { buildPhishingGame } from './phishing.js';
import { buildRansomwareGame } from './ransomware.js';
import { buildLocalNetworkGame } from './local-network.js';

export const gameRegistry = {
  'facebook': buildFacebookGame,
  'linkedin': buildLinkedinGame,
  'password-hygiene': buildPasswordHygieneGame,
  'dark-web': buildDarkWebGame,
  'data-backups': buildDataBackupsGame,
  'public-wifi': buildPublicWifiGame,
  'phishing': buildPhishingGame,
  'ransomware': buildRansomwareGame,
  'local-network': buildLocalNetworkGame,
};
