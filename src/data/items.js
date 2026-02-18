/* ==============================================================
   items.js — Definitions for each clickable item on the wall.

   Each item has:
     id       — unique key (matches the game registry key)
     label    — display name shown under the icon
     image    — path to the item icon in /public/images/items/
     x, y     — position on the wall (CSS percentage strings)
   ============================================================== */

export const items = [
  {
    id: 'facebook',
    label: 'Facebook',
    image: '/images/items/facebook.jpg',
    x: '12%',
    y: '25%',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    image: '/images/items/linkedin.jpg',
    x: '28%',
    y: '30%',
  },
  {
    id: 'password-hygiene',
    label: 'Password Hygiene',
    image: '/images/items/password.jpg',
    x: '42%',
    y: '22%',
  },
  {
    id: 'dark-web',
    label: 'Dark Web',
    image: '/images/items/dark-web.png',
    x: '72%',
    y: '28%',
  },
  {
    id: 'data-backups',
    label: 'Data Backups',
    image: '/images/items/data-backups.png',
    x: '25%',
    y: '65%',
  },
  {
    id: 'public-wifi',
    label: 'Public WiFi',
    image: '/images/items/public-wifi.png',
    x: '55%',
    y: '60%',
  },
  {
    id: 'phishing',
    label: 'Phishing',
    image: '/images/items/phishing.png',
    x: '80%',
    y: '68%',
  },
  {
    id: 'ransomware',
    label: 'Ransomware',
    image: '/images/items/ransomware.png',
    x: '58%',
    y: '30%',
  },
  {
    id: 'local-network',
    label: 'Local Network',
    image: '/images/items/local-network.png',
    x: '40%',
    y: '50%',
  },
];
