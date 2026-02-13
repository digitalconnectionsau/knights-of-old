/* ==========================================================
   facebook.js — FAKE FACEBOOK: Spot the Overshare
   
   Type: Interactive puzzle — pixel-accurate Facebook clone
   Theme: A simulated Facebook feed from fake KNP employees.
          Players must flag which posts reveal information
          an attacker could exploit.
   ========================================================== */

// ─── SVG ICONS (inline, matching Facebook's) ────────────────

const SVG = {
  logo: `<svg viewBox="0 0 36 36" width="40" height="40"><defs><linearGradient x1="50%" x2="50%" y1="97.078%" y2="0%" id="fb-grad"><stop offset="0%" stop-color="#0062E0"/><stop offset="100%" stop-color="#19AFFF"/></linearGradient></defs><path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" fill="url(#fb-grad)"/><path d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.6v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z" fill="white"/></svg>`,
  search: `<svg viewBox="0 0 16 16" width="16" height="16" fill="#65676B"><path d="M6.5 1a5.5 5.5 0 0 1 4.38 8.82l3.66 3.66a.75.75 0 1 1-1.06 1.06l-3.66-3.66A5.5 5.5 0 1 1 6.5 1zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>`,
  home: `<svg viewBox="0 0 28 28" width="28" height="28" fill="#65676B"><path d="M25.825 12.29C25.824 12.289 25.823 12.288 25.821 12.286L15.027 2.937C14.752 2.675 14.392 2.527 14.013 2.52C13.634 2.527 13.274 2.675 12.999 2.937L2.208 12.284C2.205 12.287 2.202 12.289 2.2 12.292C1.633 12.828 1.631 13.723 2.195 14.261C2.447 14.501 2.783 14.636 3.133 14.64H3.846V24.075C3.846 25.136 4.71 26 5.772 26H10.24C10.553 26 10.807 25.747 10.807 25.434V19.367C10.807 18.886 11.198 18.495 11.681 18.495H16.345C16.828 18.495 17.219 18.886 17.219 19.367V25.434C17.219 25.747 17.473 26 17.786 26H22.254C23.316 26 24.18 25.136 24.18 24.075V14.64H24.845C25.577 14.64 26.172 14.059 26.18 13.327C26.184 12.94 26.035 12.568 25.825 12.29Z"/></svg>`,
  video: `<svg viewBox="0 0 28 28" width="28" height="28" fill="#65676B"><path d="M8.75 25.25C8.336 25.25 8 24.914 8 24.5C8 24.086 8.336 23.75 8.75 23.75H19.25C19.664 23.75 20 24.086 20 24.5C20 24.914 19.664 25.25 19.25 25.25H8.75ZM17.163 12.42L12.163 9.17C11.725 8.877 11.14 9.19 11.14 9.71V16.21C11.14 16.73 11.725 17.043 12.163 16.75L17.163 13.5C17.554 13.238 17.554 12.681 17.163 12.42ZM21.5 2.75H6.5C4.427 2.75 2.75 4.427 2.75 6.5V19.5C2.75 21.573 4.427 23.25 6.5 23.25H21.5C23.573 23.25 25.25 21.573 25.25 19.5V6.5C25.25 4.427 23.573 2.75 21.5 2.75ZM23.75 19.5C23.75 20.743 22.743 21.75 21.5 21.75H6.5C5.258 21.75 4.25 20.743 4.25 19.5V6.5C4.25 5.258 5.258 4.25 6.5 4.25H21.5C22.743 4.25 23.75 5.258 23.75 6.5V19.5Z"/></svg>`,
  marketplace: `<svg viewBox="0 0 28 28" width="28" height="28" fill="#65676B"><path d="M17.5 23.75H21.25C22.355 23.75 23.25 22.855 23.25 21.75V14H24.931C25.378 14 25.685 13.542 25.504 13.134L21.657 4.321C21.3 3.519 20.498 3 19.618 3H8.382C7.502 3 6.7 3.519 6.343 4.321L2.496 13.134C2.315 13.542 2.622 14 3.069 14H4.75V21.75C4.75 22.855 5.645 23.75 6.75 23.75H10.5V17C10.5 15.895 11.395 15 12.5 15H15.5C16.605 15 17.5 15.895 17.5 17V23.75Z"/></svg>`,
  groups: `<svg viewBox="0 0 28 28" width="28" height="28" fill="#65676B"><path d="M21 12C21 11.448 21.448 11 22 11C22.552 11 23 11.448 23 12V13H24C24.552 13 25 13.448 25 14C25 14.552 24.552 15 24 15H23V16C23 16.552 22.552 17 22 17C21.448 17 21 16.552 21 16V15H20C19.448 15 19 14.552 19 14C19 13.448 19.448 13 20 13H21V12ZM14.5 4C17.538 4 20 6.462 20 9.5C20 12.538 17.538 15 14.5 15C11.462 15 9 12.538 9 9.5C9 6.462 11.462 4 14.5 4ZM6 8C7.657 8 9 9.343 9 11C9 12.657 7.657 14 6 14C4.343 14 3 12.657 3 11C3 9.343 4.343 8 6 8ZM14.5 17C18.642 17 22 18.567 22 22V24H7V22C7 18.567 10.358 17 14.5 17ZM6 16C7.2 16 8 16.6 8 18V24H2V18C2 16.6 3.2 16 6 16Z"/></svg>`,
  bell: `<svg viewBox="0 0 28 28" width="28" height="28" fill="#65676B"><path d="M7.847 23.488C9.207 23.488 9.907 22.34 10.007 21H5.687C5.787 22.34 6.487 23.488 7.847 23.488ZM14.847 20H.847C.247 20 -.153 19.383 .147 18.868L2.347 15.268V10.5C2.347 6.358 5.505 3 9.347 3H6.347C6.347 2.448 6.795 2 7.347 2H8.347C8.899 2 9.347 2.448 9.347 3C13.189 3 16.347 6.358 16.347 10.5V15.268L18.547 18.868C18.847 19.383 18.447 20 17.847 20H14.847Z"/></svg>`,
  messenger: `<svg viewBox="0 0 28 28" width="28" height="28" fill="#65676B"><path d="M14 2.042C7.373 2.042 2.042 7.015 2.042 13.109C2.042 16.532 3.652 19.546 6.197 21.537V25.958L10.461 23.578C11.574 23.883 12.762 24.049 14 24.049C20.627 24.049 25.958 19.076 25.958 12.981C25.958 7.015 20.627 2.042 14 2.042ZM15.119 16.451L12.559 13.69L7.599 16.555L13.046 10.791L15.665 13.553L20.564 10.687L15.119 16.451Z"/></svg>`,
  like: `<svg width="18" height="18" viewBox="0 0 16 16"><path d="M16 7.1c0-.8-.7-1.5-1.5-1.5H10c.3-.8.5-1.6.5-2.5 0-1.2-1-2.1-2.3-2.1-.4 0-.8.3-.9.7L6 5.3c-.3.6-.8 1-1.4 1.2v6.8c.9.3 1.8.5 2.8.5h4c.7 0 1.2-.5 1.4-1.1l2-5.6c.1-.3.2-.7.2-1zm-14.5-.5H0v7h1.5c.4 0 .8-.3.8-.8V7.4c0-.5-.3-.8-.8-.8z" fill="#65676B"/></svg>`,
  comment: `<svg width="18" height="18" viewBox="0 0 16 16"><path d="M8 1C3.6 1 0 4 0 7.7c0 2 1 3.8 2.7 5.1L2 15.3c-.1.3.2.6.5.5l3.2-1.3c.7.2 1.5.3 2.3.3 4.4 0 8-3 8-6.7S12.4 1 8 1z" fill="#65676B"/></svg>`,
  share: `<svg width="18" height="18" viewBox="0 0 16 16"><path d="M14.2 1.3c-.2-.2-.5-.3-.8-.2l-12 5c-.4.2-.5.6-.3.9.1.1.2.3.4.3l4.8 1.4 1.4 4.8c.1.3.4.5.7.5h.1c.3 0 .6-.3.7-.6l5-12c.1-.3 0-.6-.2-.8l.2.7z" fill="#65676B"/></svg>`,
  globe: `<svg width="12" height="12" viewBox="0 0 16 16" fill="#65676B"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm5.6 5.2h-2.4c-.3-1.2-.7-2.3-1.2-3.2 1.6.6 2.8 1.8 3.6 3.2zM8 1.5c.7 1 1.3 2.2 1.6 3.7H6.4c.3-1.5.9-2.7 1.6-3.7zM1.8 9.5c-.2-.5-.3-1-.3-1.5s.1-1 .3-1.5h2.8c-.1.5-.1 1-.1 1.5s0 1 .1 1.5H1.8zm.6 1.5h2.4c.3 1.2.7 2.3 1.2 3.2-1.6-.6-2.8-1.8-3.6-3.2zM4.8 5.2H2.4c.8-1.4 2-2.6 3.6-3.2-.5.9-.9 2-1.2 3.2zM8 14.5c-.7-1-1.3-2.2-1.6-3.7h3.2c-.3 1.5-.9 2.7-1.6 3.7zm2-5H6c-.1-.5-.1-1-.1-1.5s0-1 .1-1.5h4c.1.5.1 1 .1 1.5s0 1-.1 1.5zm.2 4.7c.5-.9.9-2 1.2-3.2h2.4c-.8 1.4-2 2.6-3.6 3.2zm1.5-4.7c.1-.5.1-1 .1-1.5s0-1-.1-1.5h2.8c.2.5.3 1 .3 1.5s-.1 1-.3 1.5h-2.8z"/></svg>`,
  dots: `<svg width="20" height="20" viewBox="0 0 20 20" fill="#65676B"><path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg>`,
  close: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#65676B"><path d="M18.7 5.3a1 1 0 0 0-1.4 0L12 10.6 6.7 5.3a1 1 0 0 0-1.4 1.4l5.3 5.3-5.3 5.3a1 1 0 1 0 1.4 1.4l5.3-5.3 5.3 5.3a1 1 0 0 0 1.4-1.4L13.4 12l5.3-5.3a1 1 0 0 0 0-1.4z"/></svg>`,
  likeReaction: `<svg width="18" height="18" viewBox="0 0 16 16"><defs><linearGradient id="like-g" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#18AFFF"/><stop offset="100%" stop-color="#0062DF"/></linearGradient></defs><circle cx="8" cy="8" r="8" fill="url(#like-g)"/><path d="M12.16 7.61c.15-.12.24-.31.22-.51-.02-.2-.14-.37-.32-.46l-.02-.01c.12-.14.17-.33.12-.52-.05-.19-.19-.33-.38-.39l-.02-.01c.08-.16.08-.35-.01-.51-.09-.17-.26-.27-.44-.29H9.2l.14-.59c.13-.54.07-.96-.18-1.25-.12-.14-.34-.22-.56-.22-.22 0-.42.1-.51.27l-.65 1.17c-.24.43-.7.8-1.14 1.01v4.33c.4.09.79.22 1.17.35.54.19 1.1.38 1.7.41h.12c.37 0 .78-.04 1.07-.34.16-.17.23-.38.22-.6l-.01-.02c.2-.1.33-.29.37-.51.03-.22-.04-.44-.2-.58zM5.24 7.56H3.76c-.42 0-.76.34-.76.76v3.88c0 .42.34.76.76.76h1.48c.42 0 .76-.34.76-.76V8.32c0-.42-.34-.76-.76-.76z" fill="white"/></svg>`,
};

// ─── PROFILE COLOURS (avatar bg) ────────────────────────────

const avatarColors = {
  sarah: '#E4405F',
  james: '#1877F2',
  karen: '#7C3AED',
  dave:  '#EA580C',
  lisa:  '#059669',
  mark:  '#0369A1',
};

// ─── FAKE PROFILES ──────────────────────────────────────────

const profiles = {
  sarah: { name: 'Sarah Mitchell', role: 'Office Manager at KNP Logistics', initials: 'SM' },
  james: { name: 'James Cooper', role: 'IT Support at KNP Logistics', initials: 'JC' },
  karen: { name: 'Karen Patel', role: 'Finance Manager at KNP Logistics', initials: 'KP' },
  dave:  { name: 'Dave Thompson', role: 'Warehouse Supervisor at KNP Logistics', initials: 'DT' },
  lisa:  { name: 'Lisa Chen', role: 'HR Coordinator at KNP Logistics', initials: 'LC' },
  mark:  { name: 'Mark O\'Brien', role: 'Operations Director at KNP Logistics', initials: 'MO' },
};

// ─── POSTS ──────────────────────────────────────────────────

const posts = [
  {
    profile: 'sarah',
    time: '2h',
    privacy: 'public',
    text: `First day back after the holidays! 🎄 My password was expired so I just set it to KNPSarah2024 — easy to remember lol. IT always makes us change them and I can never keep track!`,
    reactions: { like: 8, love: 3, haha: 1 },
    commentCount: 3,
    shareCount: 0,
    topComment: { profile: 'james', text: 'Sarah please delete this and change your password immediately 😅' },
    isOvershare: true,
    explanation: 'She just posted her actual password publicly. Attackers actively search social media for exactly this kind of slip. Credential stuffing attacks often start with information people willingly give away.',
  },
  {
    profile: 'james',
    time: '4h',
    privacy: 'friends',
    text: `Big weekend! Took the kids to Luna Park 🎢 Great weather, great day out. Hope everyone had a good one!`,
    image: { type: 'photo', desc: 'Family selfie at Luna Park with the Ferris wheel in the background, kids with fairy floss', color: '#87CEEB' },
    reactions: { like: 22, love: 9, care: 3 },
    commentCount: 8,
    shareCount: 0,
    topComment: { profile: 'dave', text: 'Awesome! We should do a team day there sometime!' },
    isOvershare: false,
    explanation: 'This is a normal personal post. No sensitive work information is shared.',
  },
  {
    profile: 'karen',
    time: '5h',
    privacy: 'public',
    text: `Ugh, our finance system is so outdated. We're still running SAP on Windows Server 2012! Tried to log into the VPN from home and it timed out three times. Anyone else having issues with the 10.0.1.x network range? 😤`,
    reactions: { like: 3, angry: 2 },
    commentCount: 7,
    shareCount: 0,
    topComment: { profile: 'james', text: 'I know I know, I\'m working on it. Ticket #4471 is in progress...' },
    isOvershare: true,
    explanation: 'She\'s revealed the finance software (SAP), the server OS (Windows Server 2012 — long unsupported), internal IP ranges, and VPN issues. This is a goldmine for an attacker planning reconnaissance.',
  },
  {
    profile: 'dave',
    time: '6h',
    privacy: 'friends',
    text: `Happy birthday to my beautiful wife Jenny! 🎂 30 years together and counting. Love you to the moon and back ❤️`,
    image: { type: 'photo', desc: 'Dave and Jenny smiling at a candlelit dinner table, anniversary cake in front of them', color: '#2C1810' },
    reactions: { like: 34, love: 48, care: 5 },
    commentCount: 24,
    shareCount: 0,
    topComment: { profile: 'sarah', text: 'Happy birthday Jenny! 🎉🎂 Love you both!' },
    isOvershare: false,
    explanation: 'A personal birthday post. No work-related information exposed.',
  },
  {
    profile: 'lisa',
    time: '8h',
    privacy: 'public',
    text: `Working late again 😩 At least the office is quiet. Here's my view for the night…`,
    image: { type: 'desk', desc: 'Office desk with dual monitors showing KNP email client and employee directory. Sticky note on monitor reads "VPN: KnpLogistics!". Security badge face-up beside keyboard.', color: '#1a1a2e' },
    reactions: { like: 5, sad: 3 },
    commentCount: 2,
    shareCount: 0,
    topComment: { profile: 'karen', text: 'Don\'t stay too late! 💕' },
    isOvershare: true,
    explanation: 'The desk photo exposes: the email client interface, an internal employee directory, a VPN password on a sticky note ("KnpLogistics!"), and her physical security badge. Attackers love desk photos — they\'re packed with information.',
  },
  {
    profile: 'mark',
    time: '1d',
    privacy: 'public',
    text: `Proud to announce that KNP Logistics has partnered with SecureIT Solutions for our new cybersecurity upgrade! They'll be handling our firewall migration from Cisco ASA to Palo Alto over the next 6 weeks. Big changes ahead! 🔐`,
    reactions: { like: 32, love: 8, celebrate: 5 },
    commentCount: 12,
    shareCount: 3,
    topComment: { profile: 'karen', text: 'Finally! Great news Mark 👏' },
    isOvershare: true,
    explanation: 'He\'s revealed the current firewall vendor (Cisco ASA), the replacement (Palo Alto), the security provider\'s name, and a 6-week migration window during which defences may be weakened. Attackers specifically target organisations during IT transitions.',
  },
  {
    profile: 'sarah',
    time: '1d',
    privacy: 'friends',
    text: `Just did the most amazing chicken curry from that Jamie Oliver recipe 🍛 My kids actually ate it all!! Recipe in comments if anyone wants it 👇`,
    image: { type: 'food', desc: 'Homemade chicken curry in a blue Le Creuset pot, with rice and naan bread on the side', color: '#B8860B' },
    reactions: { like: 24, love: 15, care: 3 },
    commentCount: 15,
    shareCount: 2,
    topComment: { profile: 'lisa', text: 'OMG this looks incredible 😍 Recipe please!!' },
    isOvershare: false,
    explanation: 'Just a cooking post. Nothing work-related to worry about here.',
  },
  {
    profile: 'james',
    time: '2d',
    privacy: 'public',
    text: `FYI for the KNP team — I'll be the only one in IT this week. Mike's on leave and Sandra quit last month (still haven't replaced her 😬). If you need anything urgent, just email me directly at james.cooper@knp-logistics.com.au. I'll try to get to it but no promises!`,
    reactions: { like: 2, sad: 1 },
    commentCount: 9,
    shareCount: 0,
    topComment: { profile: 'mark', text: 'Thanks for holding the fort James. We\'ll sort the hiring soon.' },
    isOvershare: true,
    explanation: 'He\'s revealed that IT is critically understaffed (1 person covering everything), named former employees, given out his direct email, and essentially told attackers there\'s minimal IT oversight this week. Perfect timing for an attack.',
  },
  {
    profile: 'karen',
    time: '2d',
    privacy: 'friends',
    text: `Friday night wine with the girls! 🍷 Nothing beats a good Shiraz after a long week. Cheers everyone! 🥂`,
    image: { type: 'social', desc: 'Four wine glasses clinking together over a restaurant table, warm lighting', color: '#4A1528' },
    reactions: { like: 31, love: 20, haha: 5 },
    commentCount: 18,
    shareCount: 0,
    topComment: { profile: 'sarah', text: 'Jealous!! Next time invite me 🍷😂' },
    isOvershare: false,
    explanation: 'A social post about her weekend. No sensitive information shared.',
  },
  {
    profile: 'dave',
    time: '3d',
    privacy: 'public',
    text: `Can someone from accounts check this? I got an email from "CEO Mark O'Brien" asking me to urgently wire $12,000 to a new supplier. The email looks a bit different than usual but it says URGENT and CONFIDENTIAL so maybe I shouldn't ask around too much? Thoughts?`,
    reactions: { like: 1, wow: 1 },
    commentCount: 14,
    shareCount: 0,
    topComment: { profile: 'james', text: 'STOP! Do NOT send that money. That is 100% a scam email. Calling you now.' },
    isOvershare: true,
    explanation: 'Dave is publicly discussing what is almost certainly a BEC (Business Email Compromise) scam — and instead of reporting it to IT, he\'s posting about it on Facebook. He\'s also revealed the CEO\'s name and that the company is susceptible to impersonation attacks.',
  },
  {
    profile: 'lisa',
    time: '3d',
    privacy: 'friends',
    text: `Loving the new cafe that opened near the KNP office on George Street! Their flat whites are 👌 Anyone want to try it this week?`,
    reactions: { like: 12, love: 7 },
    commentCount: 6,
    shareCount: 0,
    topComment: { profile: 'dave', text: 'Yes! Wednesday arvo? I need good coffee in my life' },
    isOvershare: false,
    explanation: 'While she mentions the general area of the office, the street name for a business location is typically public knowledge. This is a borderline post but not a dangerous overshare.',
  },
  {
    profile: 'mark',
    time: '4d',
    privacy: 'public',
    text: `Important team update: We've disabled multi-factor authentication temporarily while we migrate email servers. Should be back up by end of next week. In the meantime, please use strong passwords. Thanks for your patience! 🙏`,
    reactions: { like: 4, wow: 2 },
    commentCount: 11,
    shareCount: 0,
    topComment: { profile: 'james', text: 'Mark maybe we shouldn\'t post this publicly... happy to discuss offline.' },
    isOvershare: true,
    explanation: 'He\'s announced publicly that MFA is disabled, that email servers are being migrated, and given attackers a specific window of vulnerability. This is essentially an invitation for credential-based attacks during the transition period.',
  },
];

// ─── HELPERS ────────────────────────────────────────────────

function reactionTotal(reactions) {
  return Object.values(reactions).reduce((a, b) => a + b, 0);
}

function reactionIcons(reactions) {
  const map = {
    like: SVG.likeReaction,
    love: `<span class="fb-reaction-emoji">❤️</span>`,
    haha: `<span class="fb-reaction-emoji">😂</span>`,
    wow: `<span class="fb-reaction-emoji">😮</span>`,
    sad: `<span class="fb-reaction-emoji">😢</span>`,
    angry: `<span class="fb-reaction-emoji">😡</span>`,
    care: `<span class="fb-reaction-emoji">🥰</span>`,
    celebrate: `<span class="fb-reaction-emoji">🎉</span>`,
  };
  // Show top 3 reaction types by count
  return Object.entries(reactions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => map[key] || '')
    .join('');
}

function privacyIcon(privacy) {
  if (privacy === 'public') return SVG.globe;
  return `<svg width="12" height="12" viewBox="0 0 16 16" fill="#65676B"><path d="M8 1c2.2 0 4 1.3 4 3.5S10.2 8 8 8 4 6.7 4 4.5 5.8 1 8 1zM2 13c0-2.7 2.7-5 6-5s6 2.3 6 5v1H2v-1z"/></svg>`;
}

// ─── BUILD ──────────────────────────────────────────────────

export function buildFacebookGame(container, item) {
  const modalBox = document.getElementById('modal-box');
  modalBox.classList.add('modal-fullscreen');

  const observer = new MutationObserver(() => {
    const overlay = document.getElementById('modal-overlay');
    if (overlay.classList.contains('hidden')) {
      modalBox.classList.remove('modal-fullscreen');
      observer.disconnect();
    }
  });
  observer.observe(document.getElementById('modal-overlay'), { attributes: true });

  let flagged = new Set();
  let submitted = false;

  function render() {
    container.innerHTML = `
      <div class="fb-app">

        <!-- ====== TOP NAV ====== -->
        <div class="fb-nav">
          <div class="fb-nav-left">
            <div class="fb-nav-logo">${SVG.logo}</div>
            <div class="fb-nav-search">
              ${SVG.search}
              <span>Search Facebook</span>
            </div>
          </div>
          <div class="fb-nav-center">
            <div class="fb-nav-tab fb-nav-tab--active">${SVG.home}</div>
            <div class="fb-nav-tab">${SVG.video}</div>
            <div class="fb-nav-tab">${SVG.marketplace}</div>
            <div class="fb-nav-tab">${SVG.groups}</div>
          </div>
          <div class="fb-nav-right">
            <div class="fb-nav-icon">${SVG.messenger}</div>
            <div class="fb-nav-icon fb-nav-icon--notif">${SVG.bell}<span class="fb-notif-badge">3</span></div>
            <div class="fb-nav-icon"><div class="fb-nav-avatar" style="background:${avatarColors.sarah}">SM</div></div>
          </div>
        </div>

        <!-- ====== MISSION BANNER ====== -->
        <div class="fb-mission">
          <div class="fb-mission-inner">
            <div class="fb-mission-icon">🕵️</div>
            <div class="fb-mission-text">
              <strong>MISSION: Spot the Overshares</strong><br>
              Scroll through the KNP employee feed. Click <strong>"Flag Overshare"</strong> on any post that reveals 
              information an attacker could exploit. When you're done, hit <strong>Submit</strong>.
            </div>
          </div>
        </div>

        <!-- ====== BODY ====== -->
        <div class="fb-body">

          <!-- Left sidebar -->
          <div class="fb-sidebar fb-sidebar--left">
            <a class="fb-sidebar-item"><div class="fb-sidebar-avatar" style="background:${avatarColors.sarah}">SM</div><span>Sarah Mitchell</span></a>
            <a class="fb-sidebar-item"><svg width="20" height="20" viewBox="0 0 20 20" fill="#1877F2"><path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/></svg><span>News Feed</span></a>
            <a class="fb-sidebar-item"><svg width="20" height="20" viewBox="0 0 20 20" fill="#1877F2"><path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm5 11h-4v4H9v-4H5V9h4V5h2v4h4v2z"/></svg><span>Friends</span></a>
            <a class="fb-sidebar-item"><svg width="20" height="20" viewBox="0 0 20 20" fill="#1877F2"><circle cx="10" cy="10" r="10"/><path d="M13.5 7.5L9 12l-2.5-2.5" stroke="white" stroke-width="2" fill="none"/></svg><span>Memories</span></a>
            <a class="fb-sidebar-item"><svg width="20" height="20" viewBox="0 0 20 20" fill="#F02849"><path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm0 3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm0 14c-2.5 0-4.7-1.3-6-3.2.1-2 4-3 6-3s5.9 1 6 3c-1.3 1.9-3.5 3.2-6 3.2z"/></svg><span>Groups</span></a>
          </div>

          <!-- Feed -->
          <div class="fb-feed-col">

            <!-- Create post box -->
            <div class="fb-create-post">
              <div class="fb-create-top">
                <div class="fb-create-avatar" style="background:${avatarColors.sarah}">SM</div>
                <div class="fb-create-input">What's on your mind, Sarah?</div>
              </div>
              <div class="fb-create-divider"></div>
              <div class="fb-create-actions">
                <div class="fb-create-action"><span style="color:#F3425F">📹</span> Live video</div>
                <div class="fb-create-action"><span style="color:#45BD62">🖼️</span> Photo/video</div>
                <div class="fb-create-action"><span style="color:#F7B928">😊</span> Feeling/activity</div>
              </div>
            </div>

            <div class="fb-feed" id="fb-feed"></div>
          </div>

          <!-- Right sidebar -->
          <div class="fb-sidebar fb-sidebar--right">
            <div class="fb-contacts-header">
              <span>Contacts</span>
              <div class="fb-contacts-icons">
                ${SVG.search}
                ${SVG.dots}
              </div>
            </div>
            ${Object.entries(profiles).map(([key, p]) => `
              <a class="fb-contact">
                <div class="fb-contact-avatar" style="background:${avatarColors[key]}">${p.initials}</div>
                <span>${p.name}</span>
                <span class="fb-contact-dot"></span>
              </a>
            `).join('')}
          </div>

        </div>

        <!-- ====== SUBMIT BAR ====== -->
        ${!submitted ? `
          <div class="fb-submit-bar">
            <span class="fb-score-preview" id="fb-score-preview">0 posts flagged</span>
            <button class="fb-submit-btn" id="fb-submit-btn">Submit My Answers</button>
          </div>
        ` : ''}
      </div>
    `;

    renderPosts();

    if (!submitted) {
      wireInteractions();
    }

    updateScorePreview();
  }

  function renderPosts() {
    const feed = container.querySelector('#fb-feed');

    posts.forEach((post, i) => {
      const profile = profiles[post.profile];
      const isFlagged = flagged.has(i);
      const total = reactionTotal(post.reactions);
      const icons = reactionIcons(post.reactions);

      const el = document.createElement('div');
      el.className = `fb-post${submitted ? (post.isOvershare ? ' fb-post--danger' : ' fb-post--safe') : ''}${isFlagged ? ' fb-post--flagged' : ''}`;

      el.innerHTML = `
        <div class="fb-post-top">
          <div class="fb-post-author">
            <div class="fb-post-avatar" style="background:${avatarColors[post.profile]}">${profile.initials}</div>
            <div class="fb-post-meta">
              <span class="fb-post-name">${profile.name}</span>
              <span class="fb-post-time">${post.time} · ${privacyIcon(post.privacy)}</span>
            </div>
          </div>
          <div class="fb-post-dots">${SVG.dots}</div>
        </div>

        <div class="fb-post-body">${post.text}</div>

        ${post.image ? `
          <div class="fb-post-img" style="background:${post.image.color}">
            <div class="fb-post-img-label">📷 ${post.image.desc}</div>
          </div>
        ` : ''}

        <div class="fb-post-reactions-bar">
          <div class="fb-post-reactions-left">
            <span class="fb-post-reaction-icons">${icons}</span>
            <span class="fb-post-reaction-count">${total}</span>
          </div>
          <div class="fb-post-reactions-right">
            ${post.commentCount > 0 ? `<span>${post.commentCount} comments</span>` : ''}
            ${post.shareCount > 0 ? `<span>${post.shareCount} shares</span>` : ''}
          </div>
        </div>

        <div class="fb-post-action-bar">
          <button class="fb-post-action">${SVG.like}<span>Like</span></button>
          <button class="fb-post-action">${SVG.comment}<span>Comment</span></button>
          <button class="fb-post-action">${SVG.share}<span>Share</span></button>
          ${!submitted ? `
            <button class="fb-flag-btn${isFlagged ? ' fb-flag-btn--active' : ''}" data-index="${i}">
              <span class="fb-flag-icon">🚩</span>
              <span>${isFlagged ? 'Flagged' : 'Flag Overshare'}</span>
            </button>
          ` : ''}
        </div>

        ${post.topComment ? `
          <div class="fb-post-comment">
            <div class="fb-comment-avatar" style="background:${avatarColors[post.topComment.profile]}">${profiles[post.topComment.profile].initials}</div>
            <div class="fb-comment-bubble">
              <span class="fb-comment-name">${profiles[post.topComment.profile].name}</span>
              <span class="fb-comment-text">${post.topComment.text}</span>
            </div>
          </div>
        ` : ''}

        ${submitted ? `
          <div class="fb-explanation${post.isOvershare ? ' fb-explanation--danger' : ' fb-explanation--safe'}">
            <strong>${post.isOvershare ? '🚩 OVERSHARE' : '✅ SAFE'}</strong>
            <span>${post.explanation}</span>
          </div>
        ` : ''}
      `;

      feed.appendChild(el);
    });
  }

  function wireInteractions() {
    container.querySelectorAll('.fb-flag-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        if (flagged.has(idx)) {
          flagged.delete(idx);
          btn.classList.remove('fb-flag-btn--active');
          btn.querySelector('span:last-child').textContent = 'Flag Overshare';
        } else {
          flagged.add(idx);
          btn.classList.add('fb-flag-btn--active');
          btn.querySelector('span:last-child').textContent = 'Flagged';
        }
        updateScorePreview();
      });
    });

    container.querySelector('#fb-submit-btn').addEventListener('click', () => {
      submitted = true;
      render();
      showResults();
    });
  }

  function updateScorePreview() {
    const el = container.querySelector('#fb-score-preview');
    if (el) el.textContent = `${flagged.size} post${flagged.size !== 1 ? 's' : ''} flagged`;
  }

  function showResults() {
    const total = posts.filter((p) => p.isOvershare).length;
    const correct = posts.filter((p, i) => p.isOvershare && flagged.has(i)).length;
    const falseFlags = posts.filter((p, i) => !p.isOvershare && flagged.has(i)).length;

    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'fb-results';
    resultsDiv.innerHTML = `
      <div class="fb-results-inner">
        <h3>📊 Results</h3>
        <p>You correctly identified <strong>${correct} of ${total}</strong> overshares.</p>
        ${falseFlags > 0 ? `<p>You also flagged <strong>${falseFlags}</strong> safe post${falseFlags !== 1 ? 's' : ''} by mistake.</p>` : ''}
        <p class="fb-results-lesson">
          ${correct === total && falseFlags === 0
            ? 'Perfect score! You have a sharp eye for social media risks.'
            : 'Scroll back through the feed to see what each post reveals. In the real world, attackers collect these small details and piece them together to plan an attack on a company like KNP.'}
        </p>
      </div>
    `;
    const feedCol = container.querySelector('.fb-feed-col');
    feedCol.insertBefore(resultsDiv, container.querySelector('#fb-feed'));
  }

  render();
}
