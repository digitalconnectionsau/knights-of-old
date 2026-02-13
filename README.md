# The Case of Knights of the Old (KNP)

A cyber awareness mystery game — investigate the wall, click the clues, and learn how one small mistake took down a 158-year-old business.

---

## Quick Start

```bash
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
KNP/
├── index.html                  ← Entry HTML
├── vite.config.js              ← Vite configuration
├── package.json
│
├── public/                     ← Static assets (served as-is)
│   └── images/
│       ├── wall/
│       │   └── background.jpg  ← Wall background image (YOU ADD THIS)
│       └── items/
│           ├── social-media.png       ← Item icons (YOU ADD THESE)
│           ├── password-hygiene.png
│           ├── dark-web.png
│           ├── data-backups.png
│           ├── public-wifi.png
│           └── phishing.png
│
└── src/
    ├── main.js                 ← App entry point
    ├── style.css               ← Global styles + intro screen
    │
    ├── data/
    │   └── items.js            ← Item definitions (id, label, image, position)
    │
    ├── wall/
    │   ├── wall.js             ← Renders clickable items on the wall
    │   └── wall.css            ← Wall and item styling
    │
    ├── modal/
    │   ├── modal.js            ← Opens/closes the game overlay
    │   └── modal.css           ← Modal styling + shared game classes
    │
    └── games/
        ├── registry.js         ← Maps item IDs → game functions
        ├── social-media.js     ← Quiz: social media awareness
        ├── password-hygiene.js ← Puzzle: select strong password traits
        ├── dark-web.js         ← Story: investigate the dark web trail
        ├── data-backups.js     ← Quiz: backup best practices
        ├── public-wifi.js      ← Story: the coffee shop WiFi trap
        └── phishing.js         ← Puzzle: spot the phishing message
```

---

## Adding Images

### Wall background
Drop your image into `public/images/wall/background.jpg`.
Recommended: **1920×1080** or larger, dark/moody investigation-board style.

### Item icons
Drop 6 PNG icons into `public/images/items/`:
- `social-media.png`
- `password-hygiene.png`
- `dark-web.png`
- `data-backups.png`
- `public-wifi.png`
- `phishing.png`

Recommended: **160×160px**, transparent background.

### Adjusting item positions
Edit `src/data/items.js` — each item has `x` and `y` values (CSS percentages) that control where it sits on the wall.

---

## Adding a New Mini-Game

1. Create a new file in `src/games/`, e.g. `my-game.js`
2. Export a builder function: `export function buildMyGame(container, item) { … }`
3. Register it in `src/games/registry.js`
4. Add the item to `src/data/items.js`
5. Drop an icon into `public/images/items/`

---

## Tech Stack

- [Vite](https://vitejs.dev/) — fast dev server + build tool
- Vanilla JS — no framework, just clean modules
- CSS — custom properties, flexbox, simple animations
