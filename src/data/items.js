/* ==============================================================
   items.js — Definitions for each clickable item on the wall.

   Each item has:
     id       — unique key (matches the game registry key)
     label    — display name shown under the icon
     image    — path to the item icon in /public/images/items/
     x, y     — position on the wall (CSS percentage strings)
     angle    — slight rotation in degrees (optional, default 0)
   ============================================================== */

export const items = [
  // ── Game items (registered in registry.js) ────────────────

  {
    id: 'facebook',
    label: 'Facebook',
    image: '/images/items/facebook.jpg',
    x: '22%',
    y: '28%',
    angle: -2,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    image: '/images/items/linkedin.jpg',
    x: '36%',
    y: '22%',
    angle: 1.5,
  },
  {
    id: 'password-hygiene',
    label: 'Password Hygiene',
    image: '/images/items/password.jpg',
    x: '52%',
    y: '26%',
    angle: -1,
  },
  {
    id: 'dark-web',
    label: 'Dark Web',
    image: '/images/items/Darkweb.png',
    x: '68%',
    y: '22%',
    angle: 2.5,
  },
  {
    id: 'data-backups',
    label: 'Data Backups',
    image: '/images/items/Backups.png',
    x: '28%',
    y: '55%',
    angle: 1,
  },
  {
    id: 'public-wifi',
    label: 'Public WiFi',
    image: '/images/items/Wifi.png',
    x: '55%',
    y: '52%',
    angle: -1.5,
  },
  {
    id: 'phishing',
    label: 'Phishing',
    image: '/images/items/Phishing.png',
    x: '72%',
    y: '56%',
    angle: 2,
  },
  {
    id: 'ransomware',
    label: 'Ransomware',
    image: '/images/items/Ransome.png',
    x: '60%',
    y: '36%',
    angle: -2.5,
  },
  {
    id: 'local-network',
    label: 'Local Network',
    image: '/images/items/KNP-Building.png',
    x: '42%',
    y: '42%',
    angle: 0.5,
  },

  // ── Red herrings (no game — open as "coming soon" / flavour) ─

  {
    id: 'cctv-footage',
    label: 'Truck',
    image: '/images/items/Truck1.png',
    x: '18%',
    y: '44%',
    angle: -3,
  },
  {
    id: 'news-clipping',
    label: 'News Clipping',
    image: '/images/items/Newpaper.png',
    x: '78%',
    y: '38%',
    angle: 3,
  },
  {
    id: 'sticky-note',
    label: 'Truck',
    image: '/images/items/Truck2.png',
    x: '46%',
    y: '68%',
    angle: -4,
  },
  {
    id: 'coffee-stain',
    label: 'Llama',
    image: '/images/items/escape-llama.png',
    x: '64%',
    y: '68%',
    angle: -2,
  },
];
