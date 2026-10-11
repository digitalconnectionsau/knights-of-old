/* ==============================================================
   case.js — The solution and debrief for the KNP case.

   SOLUTION is the order the attack really unfolded in the game's
   story (based on Craig's design notes and the real 2023 KNP
   Logistics ransomware attack). Players rebuild this order in the
   Timeline sidebar to close the case.

   Items not in SOLUTION (public Wi-Fi, trucks, news clipping,
   llama) are red herrings: useful lessons, but not part of this
   attack.
   ============================================================== */

export const SOLUTION = [
  {
    id: 'linkedin',
    step: 'Reconnaissance: attackers found KNP staff and their roles on LinkedIn.',
  },
  {
    id: 'facebook',
    step: 'Personal details on Facebook gave clues for likely passwords.',
  },
  {
    id: 'dark-web',
    step: 'Leaked password lists on the dark web narrowed down the guesses.',
  },
  {
    id: 'password-hygiene',
    step: 'A weak employee password was guessed — and there was no MFA to stop the login.',
  },
  {
    id: 'phishing',
    step: 'From inside, attackers targeted an admin to get higher-level access.',
  },
  {
    id: 'data-backups',
    step: 'With admin rights they destroyed the backups and disaster recovery.',
  },
  {
    id: 'local-network',
    step: 'They spread across every computer on the network.',
  },
  {
    id: 'ransomware',
    step: 'Ransomware locked everything and a ransom was demanded.',
  },
];

/** Every playable clue (has a mini-game), used for the progress count. */
export const PLAYABLE_IDS = [
  'linkedin', 'facebook', 'dark-web', 'password-hygiene', 'phishing',
  'data-backups', 'local-network', 'ransomware', 'public-wifi',
];

/** Real-world facts shown at the end. Keep these accurate. */
export const REAL_CASE = {
  title: 'What really happened to KNP',
  facts: [
    'KNP Logistics Group (formerly Knights of Old) was a 158-year-old UK transport company in Northamptonshire, running around 500 lorries.',
    'In June 2023 the Akira ransomware gang got in by guessing one employee\'s password on an internet-facing system that had no multi-factor authentication.',
    'They encrypted the company\'s systems and destroyed its backups and disaster recovery, leaving no way back without paying. The ransom was estimated at up to £5 million.',
    'KNP had cyber insurance and standard IT compliance in place. It wasn\'t enough. The company went into administration in September 2023 and around 700 people lost their jobs.',
  ],
  lessons: [
    'Use long, unique passwords (or passphrases) and a password manager.',
    'Turn on MFA everywhere, especially for anything reachable from the internet.',
    'Keep backups offline or immutable, and test that you can restore them.',
    'Think before you post: attackers use social media to plan their attack.',
    'Report anything suspicious early. Minutes matter.',
  ],
};
