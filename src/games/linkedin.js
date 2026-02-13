/* ==========================================================
   linkedin.js — FAKE LINKEDIN: Spot the Overshare
   
   Type: Interactive puzzle — pixel-accurate LinkedIn clone
   Theme: A simulated LinkedIn feed with KNP employee profiles
          and posts. Players identify which content reveals
          too much about the company's infrastructure, tools,
          or vulnerabilities.
   ========================================================== */

// ─── SVG ICONS (matching LinkedIn's) ────────────────────────

const LI_SVG = {
  logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" fill="#0A66C2"/></svg>`,
  search: `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M14.56 12.44L11.3 9.18a5.51 5.51 0 10-2.12 2.12l3.26 3.26a1.5 1.5 0 102.12-2.12zM3 6.5A3.5 3.5 0 116.5 10 3.5 3.5 0 013 6.5z"/></svg>`,
  home: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7z"/></svg>`,
  network: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"/></svg>`,
  jobs: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z"/></svg>`,
  messaging: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.5A1.5 1.5 0 119.5 11 1.5 1.5 0 018 12.5zm4 0a1.5 1.5 0 111.5-1.5 1.5 1.5 0 01-1.5 1.5zm4 0a1.5 1.5 0 111.5-1.5 1.5 1.5 0 01-1.5 1.5z"/></svg>`,
  notifs: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"/></svg>`,
  work: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 3h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4zM3 10h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4zM3 17h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4z"/></svg>`,
  like: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19.5 19.44h-.63l-.71.36a6.17 6.17 0 01-2.77.65H7.12a.62.62 0 01-.62-.63v-.89l-.67-.21a.6.6 0 01-.43-.57.62.62 0 01.63-.62h.67l.24-.64a.62.62 0 01-.43-.59.6.6 0 01.61-.61h.58l.29-.69a.63.63 0 01-.3-.53.6.6 0 01.6-.6h5.19V11l-2-.42a7.24 7.24 0 01-.58-2.85V6.61a.75.75 0 01.75-.75.77.77 0 01.72.53l.49 1.48a9 9 0 002.14 3.47l3.42 3.42z"/></svg>`,
  comment: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L12 22v-4H8A7 7 0 018 4h8a7 7 0 017 7z"/></svg>`,
  repost: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M13.96 5H6C3.24 5 1 7.24 1 10v5h2v-5c0-1.65 1.35-3 3-3h7.96L12 9l1.45 1.45L17.9 6 13.45 1.55 12 3zm-3.96 14H18c2.76 0 5-2.24 5-5v-5h-2v5c0 1.65-1.35 3-3 3h-7.96l1.96-2-1.45-1.45L6.1 18l4.45 4.45L12 21z"/></svg>`,
  send: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21 3L0 10l7.66 4.26L20 6l-8.27 9.98L16 24l5-21z"/></svg>`,
  dots: `<svg viewBox="0 0 16 16" width="20" height="20" fill="#00000099"><circle cx="3" cy="8" r="2"/><circle cx="8" cy="8" r="2"/><circle cx="13" cy="8" r="2"/></svg>`,
  globe: `<svg viewBox="0 0 16 16" width="12" height="12" fill="#00000099"><path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM5.27 13.65A5.49 5.49 0 012.5 8a5.43 5.43 0 01.48-2.25 6.89 6.89 0 002.29 3.48 6.89 6.89 0 010 4.42zm1.23.72A5.36 5.36 0 018 13.16a5.36 5.36 0 011.5 1.21 5.47 5.47 0 01-3 0zm4.23-.72a6.89 6.89 0 010-4.42 6.89 6.89 0 002.29-3.48A5.43 5.43 0 0113.5 8a5.49 5.49 0 01-2.77 5.65z"/></svg>`,
  likeReaction: `<svg width="16" height="16" viewBox="0 0 16 16"><defs><linearGradient id="li-like-g" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="#378FE9"/><stop offset="100%" stop-color="#0A66C2"/></linearGradient></defs><circle cx="8" cy="8" r="8" fill="url(#li-like-g)"/><path d="M11.52 6.63h-2.2l.1-.31c.27-.82.17-1.49-.27-1.94a.94.94 0 00-.69-.33.49.49 0 00-.47.36l-.53 1.28c-.27.65-.91 1.13-1.46 1.35v4.16c.65.22 1.32.42 2.02.51h.52c.79 0 1.72-.05 2.19-.77l.02-.04c.22-.33.28-.74.16-1.09l-.02-.06.38-.42c.2-.22.23-.55.08-.81l-.02-.04.2-.36c.15-.27.13-.6-.06-.85l-.02-.03.12-.2c.17-.28.1-.64-.14-.86l-.01-.01z" fill="white"/><rect x="4" y="7.2" width="1.5" height="4.6" rx=".4" fill="white"/></svg>`,
  celebrate: `<span class="li-reaction-emoji">👏</span>`,
  insightful: `<span class="li-reaction-emoji">💡</span>`,
  love: `<span class="li-reaction-emoji">❤️</span>`,
  curious: `<span class="li-reaction-emoji">🤔</span>`,
  funny: `<span class="li-reaction-emoji">😂</span>`,
};

// ─── AVATAR COLOURS ─────────────────────────────────────────

const liAvatarColors = {
  james:  '#0A66C2',
  karen:  '#7C3AED',
  mark:   '#2E7D32',
  sarah:  '#E4405F',
  lisa:   '#059669',
  dave:   '#EA580C',
};

// ─── PROFILES ───────────────────────────────────────────────

const profiles = {
  james:  { name: 'James Cooper', headline: 'IT Support Technician at KNP Logistics', initials: 'JC', connections: '247', location: 'Sydney, Australia' },
  karen:  { name: 'Karen Patel', headline: 'Finance Manager at KNP Logistics', initials: 'KP', connections: '312', location: 'Sydney, Australia' },
  mark:   { name: 'Mark O\'Brien', headline: 'Operations Director at KNP Logistics', initials: 'MO', connections: '500+', location: 'Sydney, Australia' },
  sarah:  { name: 'Sarah Mitchell', headline: 'Office Manager at KNP Logistics', initials: 'SM', connections: '189', location: 'Sydney, Australia' },
  lisa:   { name: 'Lisa Chen', headline: 'HR Coordinator at KNP Logistics', initials: 'LC', connections: '356', location: 'Sydney, Australia' },
  dave:   { name: 'Dave Thompson', headline: 'Warehouse Supervisor at KNP Logistics', initials: 'DT', connections: '127', location: 'Sydney, Australia' },
};

// Sidebar profile cards (featured)
const profileCards = [
  { key: 'mark', banner: '#1B3A2A', tagline: 'Operations Director at KNP Logistics | Supply Chain | 20+ Years in Logistics' },
  { key: 'james', banner: '#0D2137', tagline: 'IT Support Technician at KNP Logistics | CompTIA A+ | Sole IT Admin' },
];

// ─── POSTS ──────────────────────────────────────────────────

const posts = [
  {
    profile: 'james',
    time: '1d',
    text: `Excited to share that I've just completed my CompTIA Security+ certification! 🎉\n\nAlways learning, always growing. Cybersecurity is everyone's responsibility.\n\n#CyberSecurity #CompTIA #AlwaysLearning`,
    reactions: { like: 98, celebrate: 32, insightful: 12 },
    commentCount: 23,
    topComment: { profile: 'karen', text: 'Well done James! 👏 Such an important area.' },
    isOvershare: false,
    explanation: 'Sharing professional certifications is normal LinkedIn behaviour. No sensitive company information is revealed.',
  },
  {
    profile: 'james',
    time: '3d',
    text: `Real talk: I'm the only IT person at KNP Logistics right now. Managing 150+ endpoints, our Windows Server 2012 R2 domain controllers, Cisco ASA 5506 firewalls, and the Veeam backup infrastructure — all solo.\n\nIf you know any good MSPs in the Sydney area that won't break the bank, drop me a message. We need help but the budget is tight. 😅\n\n#ITLife #SysAdmin #SMBStruggles #Help`,
    reactions: { like: 56, insightful: 21, curious: 12 },
    commentCount: 34,
    topComment: { profile: 'mark', text: 'Appreciate everything you do mate. We\'ll sort the resourcing.' },
    isOvershare: true,
    explanation: 'This post reveals: he\'s the sole IT admin (no oversight), exact endpoint count & server OS (unsupported Windows Server 2012 R2), firewall model (Cisco ASA 5506), backup software (Veeam), and budget constraints. An attacker now knows exactly what to target and that response will be slow.',
  },
  {
    profile: 'karen',
    time: '4d',
    text: `Thrilled to announce KNP Logistics has been awarded the TransCorp Australia contract! 🚛\n\nThis is a huge milestone for our team. We'll be handling their entire east-coast distribution network starting Q2.\n\nGrateful for our amazing operations team who put the proposal together. Onwards and upwards!\n\n#Logistics #NewBusiness #KNPLogistics`,
    reactions: { like: 156, celebrate: 54, love: 24 },
    commentCount: 41,
    topComment: { profile: 'dave', text: 'This is massive! Well done everyone 🎉' },
    isOvershare: false,
    explanation: 'Announcing new business wins is standard LinkedIn content. The contract details are public-facing information the company would likely want shared.',
  },
  {
    profile: 'mark',
    time: '5d',
    text: `Big milestone this week — we've started migrating KNP's entire IT infrastructure to the cloud! ☁️\n\nMoving from our on-prem Exchange 2016 email server to Microsoft 365, and migrating our file shares from the old NAS units to SharePoint. Our domain controller migration from Server 2012 R2 to Azure AD is scheduled for next month.\n\nDuring the transition we've had to temporarily relax some firewall rules and disable MFA on legacy systems. Should be fully secured again by end of March.\n\nShout out to our IT team (well, James 😄) for managing this monumental project!\n\n#DigitalTransformation #CloudMigration #KNPLogistics`,
    reactions: { like: 112, celebrate: 38, insightful: 28 },
    commentCount: 52,
    topComment: { profile: 'james', text: 'Thanks Mark! Maybe don\'t share quite so much detail publicly though 😅' },
    isOvershare: true,
    explanation: 'This is catastrophically detailed. He\'s revealed: current email server (Exchange 2016), migration targets (M365, SharePoint, Azure AD), the fact that firewall rules are relaxed, MFA is disabled on legacy systems, a specific vulnerability window (until end of March), and confirmed the single IT person by name. This is an attacker\'s dream roadmap.',
  },
  {
    profile: 'sarah',
    time: '1w',
    text: `Had the pleasure of attending the Australian Logistics Conference last week in Melbourne!\n\nGreat insights on the future of supply chain technology. Met so many inspiring people.\n\nLooking forward to implementing some of these ideas at KNP. Thanks to everyone who made it such a great event!\n\n#ALC2024 #Logistics #Networking`,
    image: { desc: 'Sarah at the Australian Logistics Conference with lanyard and badge visible, venue hall in background', color: '#2C3E50' },
    reactions: { like: 42, celebrate: 18, love: 7 },
    commentCount: 12,
    topComment: { profile: 'lisa', text: 'Great to see you there Sarah! Such a good event.' },
    isOvershare: false,
    explanation: 'Attending and posting about industry conferences is standard professional behaviour. The photo shows her conference badge, which is expected at such events.',
  },
  {
    profile: 'lisa',
    time: '1w',
    text: `🚨 We're hiring at KNP Logistics! 🚨\n\nLooking for a Network Administrator to join our growing team in Sydney. You'll be working with:\n\n• Windows Server 2012 R2 & 2019 environment\n• Cisco ASA & Meraki networking\n• Veeam Backup & Replication\n• VMware vSphere 6.7\n• Microsoft 365 administration\n\nMust have experience with Active Directory, Group Policy, and VPN management (we use Cisco AnyConnect).\n\nCompetitive salary + benefits. DM me for details!\n\n#Hiring #ITJobs #Sydney #NetworkAdmin`,
    reactions: { like: 28, insightful: 12, curious: 5 },
    commentCount: 28,
    topComment: { profile: 'james', text: 'Please someone apply, I need the help 😂' },
    isOvershare: true,
    explanation: 'Job listings on LinkedIn are one of the most common sources of infrastructure intelligence. This post reveals the entire tech stack: OS versions, firewall brands, backup software, virtualisation platform and version, VPN client, and identity management tools. Attackers routinely scrape job listings for this information.',
  },
  {
    profile: 'dave',
    time: '1w',
    text: `20 years at KNP Logistics and still going strong! 💪\n\nStarted on the warehouse floor and worked my way up. Proud to be part of a company that values its people.\n\nThanks to everyone who wished me a happy work anniversary! Here's to 20 more 🥂\n\n#WorkAnniversary #KNPLogistics #20Years`,
    reactions: { like: 189, celebrate: 78, love: 45 },
    commentCount: 67,
    topComment: { profile: 'mark', text: 'Legend! 20 years of absolute dedication. Cheers Dave 🍻' },
    isOvershare: false,
    explanation: 'A work anniversary post. Personal and celebratory — no technical or sensitive business information shared.',
  },
  {
    profile: 'james',
    time: '2w',
    text: `Just wrapped up our quarterly vulnerability scan using Nessus. Found 47 critical vulnerabilities across our network — mostly unpatched Windows systems and some legacy Java applications that we can't update because our warehouse management system depends on Java 8.\n\nWorking through the remediation plan now. It's going to take at least 6-8 weeks to patch everything without breaking production.\n\nAnyone else dealing with Java 8 dependencies in 2024? How are you handling it? 🤔\n\n#InfoSec #VulnerabilityManagement #PatchManagement #JavaProblems`,
    reactions: { like: 89, insightful: 45, curious: 22 },
    commentCount: 73,
    topComment: { profile: 'karen', text: 'This sounds serious James. Can we chat about the risk to finance systems?' },
    isOvershare: true,
    explanation: 'He\'s shared: the scanning tool (Nessus), the exact number of critical vulnerabilities (47!), that Windows systems are unpatched, they run legacy Java 8 applications, the warehouse management system is a dependency bottleneck, and remediation will take 6-8 weeks. An attacker now has a vulnerability count, a timeframe, and knows exactly which exploits to use.',
  },
  {
    profile: 'karen',
    time: '2w',
    text: `Just finished reading "The Psychology of Money" by Morgan Housel. Absolutely brilliant.\n\nIf you're in finance or just want to understand how people think about money, this is a must-read. 📚\n\nWhat's the best business book you've read recently?\n\n#BookRecommendation #Finance #AlwaysLearning`,
    reactions: { like: 62, insightful: 19, love: 8 },
    commentCount: 31,
    topComment: { profile: 'sarah', text: 'Adding to my list! I just finished Atomic Habits — highly recommend.' },
    isOvershare: false,
    explanation: 'A book recommendation. Professional but reveals no company information whatsoever.',
  },
  {
    profile: 'mark',
    time: '3w',
    text: `Transparency time: KNP has been going through a tough period financially. Revenue is down 18% year-on-year and we've had to make some difficult decisions around staffing.\n\nWe've reduced our IT team from 3 to 1, postponed our planned security audit, and paused the EDR rollout that was supposed to happen this quarter.\n\nBut I believe in this company and our people. We'll get through this together.\n\n#Leadership #Transparency #KNPLogistics #Resilience`,
    reactions: { like: 134, love: 41, insightful: 28 },
    commentCount: 89,
    topComment: { profile: 'dave', text: 'We\'re behind you Mark. KNP will come back stronger 💪' },
    isOvershare: true,
    explanation: 'He\'s publicly disclosed: financial difficulties (revenue down 18%), IT team reduced to 1 person, security audit cancelled, and endpoint detection & response (EDR) rollout paused. Attackers specifically target organisations in financial distress with reduced security staffing — they know the defences are down.',
  },
];

// ─── HELPERS ────────────────────────────────────────────────

function reactionTotal(r) { return Object.values(r).reduce((a, b) => a + b, 0); }

function reactionIcons(r) {
  const map = {
    like: LI_SVG.likeReaction,
    celebrate: LI_SVG.celebrate,
    insightful: LI_SVG.insightful,
    love: LI_SVG.love,
    curious: LI_SVG.curious,
    funny: LI_SVG.funny,
  };
  return Object.entries(r)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => map[k] || '')
    .join('');
}

function formatText(t) {
  // Convert hashtags to styled spans
  return t.replace(/\n/g, '<br>').replace(/(#\w+)/g, '<span class="li-hashtag">$1</span>');
}

// ─── BUILD ──────────────────────────────────────────────────

export function buildLinkedinGame(container, item) {
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
      <div class="li-app">

        <!-- ====== TOP NAV ====== -->
        <div class="li-nav">
          <div class="li-nav-left">
            <div class="li-nav-logo">${LI_SVG.logo}</div>
            <div class="li-nav-search">
              ${LI_SVG.search}
              <input type="text" placeholder="Search" readonly class="li-search-input" />
            </div>
          </div>
          <div class="li-nav-center">
            <div class="li-nav-tab li-nav-tab--active">
              ${LI_SVG.home}
              <span>Home</span>
            </div>
            <div class="li-nav-tab">
              ${LI_SVG.network}
              <span>My Network</span>
            </div>
            <div class="li-nav-tab">
              ${LI_SVG.jobs}
              <span>Jobs</span>
            </div>
            <div class="li-nav-tab">
              ${LI_SVG.messaging}
              <span>Messaging</span>
            </div>
            <div class="li-nav-tab">
              ${LI_SVG.notifs}
              <span>Notifications</span>
            </div>
          </div>
          <div class="li-nav-right">
            <div class="li-nav-me">
              <div class="li-nav-me-avatar" style="background:${liAvatarColors.james}">${profiles.james.initials}</div>
              <span>Me ▾</span>
            </div>
            <div class="li-nav-divider"></div>
            <div class="li-nav-tab li-nav-tab--small">
              ${LI_SVG.work}
              <span>For Business ▾</span>
            </div>
          </div>
        </div>

        <!-- ====== MISSION BANNER ====== -->
        <div class="li-mission">
          <div class="li-mission-inner">
            <div class="li-mission-icon">🕵️</div>
            <div class="li-mission-text">
              <strong>MISSION: Spot the Overshares</strong><br>
              LinkedIn is a goldmine for attackers doing reconnaissance. Review the KNP employees' profiles and posts below.
              Click <strong>"Flag Overshare"</strong> on any content that reveals information useful to an attacker, then hit <strong>Submit</strong>.
            </div>
          </div>
        </div>

        <!-- ====== BODY ====== -->
        <div class="li-body">

          <!-- Left sidebar — mini profile card -->
          <div class="li-sidebar li-sidebar--left">
            ${profileCards.map((c) => {
              const p = profiles[c.key];
              return `
                <div class="li-profile-card">
                  <div class="li-profile-banner" style="background:${c.banner}"></div>
                  <div class="li-profile-card-body">
                    <div class="li-profile-card-avatar" style="background:${liAvatarColors[c.key]}">${p.initials}</div>
                    <span class="li-profile-card-name">${p.name}</span>
                    <span class="li-profile-card-headline">${c.tagline}</span>
                    <div class="li-profile-card-stats">
                      <span>${p.connections} connections</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Feed -->
          <div class="li-feed-col">

            <!-- Start a post box -->
            <div class="li-create-post">
              <div class="li-create-top">
                <div class="li-create-avatar" style="background:${liAvatarColors.james}">${profiles.james.initials}</div>
                <button class="li-create-input">Start a post</button>
              </div>
              <div class="li-create-actions">
                <div class="li-create-action"><span style="color:#378FE9">📷</span> Photo</div>
                <div class="li-create-action"><span style="color:#5F9B41">📹</span> Video</div>
                <div class="li-create-action"><span style="color:#E06847">📝</span> Write article</div>
              </div>
            </div>

            <div class="li-sorting">
              <hr class="li-sorting-line" />
              <span>Sort by: <strong>Top</strong> ▾</span>
            </div>

            <div class="li-feed" id="li-feed"></div>
          </div>

          <!-- Right sidebar — news & ads -->
          <div class="li-sidebar li-sidebar--right">
            <div class="li-news-card">
              <div class="li-news-header">LinkedIn News</div>
              <ul class="li-news-list">
                <li><strong>Cyber attacks on logistics firms surge 40%</strong><br><span>2d ago · 4,521 readers</span></li>
                <li><strong>Australian SMBs most targeted by ransomware</strong><br><span>3d ago · 12,890 readers</span></li>
                <li><strong>Job postings reveal company secrets: report</strong><br><span>1w ago · 8,134 readers</span></li>
                <li><strong>MFA adoption still lagging in mid-market</strong><br><span>1w ago · 3,267 readers</span></li>
                <li><strong>Social engineering: LinkedIn's blind spot</strong><br><span>2w ago · 15,412 readers</span></li>
              </ul>
            </div>
            <div class="li-ad-card">
              <div class="li-ad-label">Ad</div>
              <div class="li-ad-body">
                <strong>Protect your business from cyber threats</strong>
                <span>SecureIT Solutions — Trusted by Australian businesses since 2015.</span>
                <button class="li-ad-btn">Learn more</button>
              </div>
            </div>
          </div>

        </div>

        <!-- ====== SUBMIT BAR ====== -->
        ${!submitted ? `
          <div class="li-submit-bar">
            <span class="li-score-preview" id="li-score-preview">0 posts flagged</span>
            <button class="li-submit-btn" id="li-submit-btn">Submit My Answers</button>
          </div>
        ` : ''}
      </div>
    `;

    renderPosts();
    if (!submitted) wireInteractions();
    updateScorePreview();
  }

  function renderPosts() {
    const feed = container.querySelector('#li-feed');

    posts.forEach((post, i) => {
      const p = profiles[post.profile];
      const isFlagged = flagged.has(i);
      const total = reactionTotal(post.reactions);
      const icons = reactionIcons(post.reactions);

      const el = document.createElement('div');
      el.className = `li-post${submitted ? (post.isOvershare ? ' li-post--danger' : ' li-post--safe') : ''}${isFlagged ? ' li-post--flagged' : ''}`;

      el.innerHTML = `
        <div class="li-post-top">
          <div class="li-post-author">
            <div class="li-post-avatar" style="background:${liAvatarColors[post.profile]}">${p.initials}</div>
            <div class="li-post-meta">
              <span class="li-post-name">${p.name}</span>
              <span class="li-post-headline">${p.headline}</span>
              <span class="li-post-time">${post.time} · ${LI_SVG.globe}</span>
            </div>
          </div>
          <div class="li-post-dots">${LI_SVG.dots}
          </div>
        </div>

        <div class="li-post-body">${formatText(post.text)}</div>

        ${post.image ? `
          <div class="li-post-img" style="background:${post.image.color}">
            <div class="li-post-img-label">📷 ${post.image.desc}</div>
          </div>
        ` : ''}

        <div class="li-post-reactions-bar">
          <div class="li-post-reactions-left">
            <span class="li-post-reaction-icons">${icons}</span>
            <span class="li-post-reaction-count">${total.toLocaleString()}</span>
          </div>
          <div class="li-post-reactions-right">
            ${post.commentCount > 0 ? `<span>${post.commentCount} comments</span>` : ''}
          </div>
        </div>

        <div class="li-post-action-bar">
          <button class="li-post-action">${LI_SVG.like}<span>Like</span></button>
          <button class="li-post-action">${LI_SVG.comment}<span>Comment</span></button>
          <button class="li-post-action">${LI_SVG.repost}<span>Repost</span></button>
          <button class="li-post-action">${LI_SVG.send}<span>Send</span></button>
          ${!submitted ? `
            <button class="li-flag-btn${isFlagged ? ' li-flag-btn--active' : ''}" data-index="${i}">
              <span class="li-flag-icon">🚩</span>
              <span>${isFlagged ? 'Flagged' : 'Flag Overshare'}</span>
            </button>
          ` : ''}
        </div>

        ${post.topComment ? `
          <div class="li-post-comment">
            <div class="li-comment-avatar" style="background:${liAvatarColors[post.topComment.profile]}">${profiles[post.topComment.profile].initials}</div>
            <div class="li-comment-bubble">
              <div class="li-comment-header">
                <span class="li-comment-name">${profiles[post.topComment.profile].name}</span>
                <span class="li-comment-role">${profiles[post.topComment.profile].headline}</span>
              </div>
              <span class="li-comment-text">${post.topComment.text}</span>
            </div>
          </div>
        ` : ''}

        ${submitted ? `
          <div class="li-explanation${post.isOvershare ? ' li-explanation--danger' : ' li-explanation--safe'}">
            <strong>${post.isOvershare ? '🚩 OVERSHARE' : '✅ SAFE'}</strong>
            <span>${post.explanation}</span>
          </div>
        ` : ''}
      `;

      feed.appendChild(el);
    });
  }

  function wireInteractions() {
    container.querySelectorAll('.li-flag-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        if (flagged.has(idx)) {
          flagged.delete(idx);
          btn.classList.remove('li-flag-btn--active');
          btn.querySelector('span:last-child').textContent = 'Flag Overshare';
        } else {
          flagged.add(idx);
          btn.classList.add('li-flag-btn--active');
          btn.querySelector('span:last-child').textContent = 'Flagged';
        }
        updateScorePreview();
      });
    });

    container.querySelector('#li-submit-btn').addEventListener('click', () => {
      submitted = true;
      render();
      showResults();
    });
  }

  function updateScorePreview() {
    const el = container.querySelector('#li-score-preview');
    if (el) el.textContent = `${flagged.size} post${flagged.size !== 1 ? 's' : ''} flagged`;
  }

  function showResults() {
    const total = posts.filter((p) => p.isOvershare).length;
    const correct = posts.filter((p, i) => p.isOvershare && flagged.has(i)).length;
    const falseFlags = posts.filter((p, i) => !p.isOvershare && flagged.has(i)).length;

    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'li-results';
    resultsDiv.innerHTML = `
      <div class="li-results-inner">
        <h3>📊 Results</h3>
        <p>You correctly identified <strong>${correct} of ${total}</strong> overshares.</p>
        ${falseFlags > 0 ? `<p>You also flagged <strong>${falseFlags}</strong> safe post${falseFlags !== 1 ? 's' : ''} by mistake.</p>` : ''}
        <p class="li-results-lesson">
          ${correct === total && falseFlags === 0
            ? 'Perfect! You know exactly what attackers look for on LinkedIn.'
            : 'LinkedIn is one of the top tools attackers use for reconnaissance. Job listings, tech stack mentions, org chart details, and vulnerability disclosures are all openly available on profiles like these. Scroll back to review what each post reveals.'}
        </p>
      </div>
    `;
    const feedCol = container.querySelector('.li-feed-col');
    feedCol.insertBefore(resultsDiv, container.querySelector('.li-sorting'));
  }

  render();
}
