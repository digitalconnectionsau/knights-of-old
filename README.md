# The Case of Knights of the Old (KNP)

A cyber awareness mystery game by Escape Llama. Players investigate an evidence wall, play a mini-game for each clue, then rebuild the attack in order to close the case — and learn how one guessed password took down a 158-year-old business.

Based on the real 2023 ransomware attack on KNP Logistics Group (formerly Knights of Old), a UK transport company.

> **Private repo.** Contains unreleased game content.

---

## Quick start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build in dist/
npm run preview   # serve the build
```

---

## How the game works

1. **Investigate the wall.** Click any clue to open its mini-game. Finished clues get a green tick.
2. **Build the timeline.** Drag clues into the Timeline sidebar, or use **📌 Add to timeline** inside a clue (works on phones and tablets). Reorder with drag or the ▲/▼ buttons.
3. **Close the case.** With at least 8 clues pinned, press **Close the case**. Right cards turn green, wrong ones red. Red herrings are called out.
4. **Debrief.** A correct timeline shows the full attack, what really happened to KNP and what would have stopped it.
5. **Next player.** **Start a new game** at the bottom of the sidebar clears the timeline and progress.

### The correct order

| # | Clue | Step in the attack |
|---|---|---|
| 1 | LinkedIn | Recon: find staff and roles |
| 2 | Facebook | Personal details for password guesses |
| 3 | Dark Web | Leaked password lists |
| 4 | Password Hygiene | Weak password guessed, no MFA |
| 5 | Phishing | Target an admin for higher access |
| 6 | Data Backups | Destroy backups and disaster recovery |
| 7 | Local Network | Spread to every computer |
| 8 | Ransomware | Lock everything, demand ransom |

Red herrings: Public WiFi (a useful lesson, but not how KNP was breached), the two trucks, the news clipping and the llama.

The order lives in `src/data/case.js`.

---

## Mini-games

| Clue | File | Type | Done when |
|---|---|---|---|
| Facebook | `games/facebook.js` | Spot the overshare (fake feed) | Answers submitted |
| LinkedIn | `games/linkedin.js` | Spot the overshare (fake feed) | Answers submitted |
| Password Hygiene | `games/password-hygiene.js` | Pick strong-password traits | Answers checked |
| Dark Web | `games/dark-web.js` | Explore a fake marketplace and forum | Forum opened |
| Phishing | `games/phishing.js` | Build a phishing email as the attacker | End screen |
| Data Backups | `games/data-backups.js` | Memory matching | End screen |
| Local Network | `games/local-network.js` | Trace paths to spell C-H-A-O-S | Word solved |
| Ransomware | `games/ransomware.js` | 5-question response quiz | Last question |
| Public WiFi | `games/public-wifi.js` | Choose-your-own-adventure | VPN lesson reached |

---

## Project structure

```
index.html              Intro screen, wall, sidebar and modal shells
src/
  main.js               Boot: wires everything together
  data/items.js         Wall clues (id, label, image, position)
  data/case.js          Correct order, debrief facts and lessons
  state/progress.js     Solved clues (saved in localStorage)
  wall/                 Wall rendering, drag source, red pin-lines
  sidebar/              Timeline, progress, "Close the case"
  modal/                Overlay; resets layout and runs cleanup on close
  games/registry.js     Maps clue ids to mini-games
  games/*.js|css        One file pair per mini-game
public/images/          Optimised WebP images served by the game
art/originals/          Full-size source art (not served)
```

### Adding a mini-game

1. Create `src/games/my-game.js` exporting `buildMyGame(container, item, complete)`.
2. Call `complete()` when the player finishes, so the clue is ticked off.
3. If the game starts timers, return a cleanup function; the modal calls it on close.
4. Register it in `src/games/registry.js` and add the clue to `src/data/items.js`.
5. If it's part of the attack, add it to `SOLUTION` in `src/data/case.js`.

### Images

Served images are WebP, max 1200px wide (wall background 2560px). Put new full-size art in `art/originals/` and export a WebP into `public/images/`.

---

## Known gaps / to do

- The full-screen mini-games (Facebook, LinkedIn, Dark Web, Phishing, Local Network) are built for desktop and tablets; they're cramped on phones.
- No incident-report screen yet beyond the debrief (it was removed in Feb 2026).
- LinkedIn job ad says Sydney and the dark web market is "Australia's" — KNP was UK-based. Decide whether to localise the whole story to Australia or keep it UK.
