/* ==========================================================
   dark-web.js — IMMERSIVE: Fake Dark Web Marketplace & Forum

   Type: Exploration / shock-value awareness
   Theme: Shows players that the dark web is real, that stolen
          data is openly traded, and that major Australian
          breaches have very real consequences.
   ========================================================== */

// ─── STORE LISTINGS ─────────────────────────────────────────

const storeCategories = [
  {
    name: 'Stolen Credentials',
    icon: '🔑',
    listings: [
      {
        title: 'Australian Email + Password Combo List',
        seller: 'DarkDump_AU',
        rating: '★★★★☆ (312)',
        price: '$12.00 USD',
        description: '50,000 verified .com.au email/password combinations. Sourced from recent breaches. 78% hit rate on major platforms.',
        sold: '1,842',
      },
      {
        title: 'Corporate VPN Credentials — Logistics Sector',
        seller: 'NetGh0st',
        rating: '★★★★★ (87)',
        price: '$250.00 USD',
        description: 'Active VPN logins for 3 Australian logistics companies. Verified within 48hrs. Includes internal network maps.',
        sold: '14',
      },
      {
        title: 'Banking Login Pack — Big 4 AU Banks',
        seller: 'PhishKing_',
        rating: '★★★★☆ (541)',
        price: '$45.00 USD per account',
        description: 'Internet banking credentials for CBA, NAB, ANZ, Westpac. Includes security question answers. Balances $5k–$50k.',
        sold: '329',
      },
      {
        title: 'Netflix / Spotify / Disney+ Bundle',
        seller: 'StreamLeech',
        rating: '★★★☆☆ (1,203)',
        price: '$2.50 USD',
        description: '10x working streaming accounts. Australian region. Some with family plans. No guarantees past 30 days.',
        sold: '8,412',
      },
    ],
  },
  {
    name: 'Stolen Identity',
    icon: '🪪',
    listings: [
      {
        title: 'Full Identity Package — Australian Citizen',
        seller: 'ID_Factory',
        rating: '★★★★★ (198)',
        price: '$85.00 USD',
        description: 'Full name, DOB, address, TFN, Medicare number, drivers licence number, mother\'s maiden name. Verified fresh.',
        sold: '673',
      },
      {
        title: 'Medicare Card Data — Bulk (100 records)',
        seller: 'MedLeak',
        rating: '★★★★☆ (64)',
        price: '$180.00 USD',
        description: 'Bulk pack of Medicare numbers with matching names and DOBs. Sourced from healthcare sector breach 2024.',
        sold: '41',
      },
      {
        title: 'Drivers Licence Scans — NSW & VIC',
        seller: 'ScanMaster',
        rating: '★★★★☆ (223)',
        price: '$25.00 USD each',
        description: 'High-resolution scans of real Australian drivers licences. Useful for verification bypasses.',
        sold: '1,102',
      },
    ],
  },
  {
    name: 'Stolen Databases',
    icon: '🗄️',
    listings: [
      {
        title: 'Optus Customer Database — 9.8M Records',
        seller: 'OptusData',
        rating: '★★★★★ (46)',
        price: '$1,000.00 USD',
        description: 'Full Optus 2022 breach dump. Names, DOBs, passport numbers, licence numbers, emails, phone numbers. Unredacted.',
        sold: '127',
      },
      {
        title: 'Medibank Patient Records Subset',
        seller: 'MediDump',
        rating: '★★★★☆ (33)',
        price: '$500.00 USD',
        description: 'Contains names, DOBs, Medicare numbers and health claims data including sensitive procedures. ~480k records.',
        sold: '58',
      },
      {
        title: 'Australian University Student Records',
        seller: 'EduBreach',
        rating: '★★★☆☆ (89)',
        price: '$75.00 USD',
        description: 'Student IDs, full names, addresses, enrolment details, financial info. Multiple universities. ~200k records.',
        sold: '234',
      },
    ],
  },
  {
    name: 'Hacking Services',
    icon: '💻',
    listings: [
      {
        title: 'DDoS-for-Hire — Take Any Site Offline',
        seller: 'BoostStress',
        rating: '★★★★☆ (712)',
        price: 'From $30.00 USD/hr',
        description: 'Layer 4/7 attacks. Up to 500Gbps. Target any website or server. No questions asked. Bitcoin only.',
        sold: '3,891',
      },
      {
        title: 'Ransomware-as-a-Service Kit',
        seller: 'LockCrypt_Dev',
        rating: '★★★★★ (156)',
        price: '$1,500.00 USD + 30% of ransoms',
        description: 'Full ransomware deployment kit. Includes builder, C2 panel, payment portal, and victim negotiation chat. No coding required.',
        sold: '89',
      },
      {
        title: 'Corporate Email Compromise Setup',
        seller: 'BEC_Pro',
        rating: '★★★★☆ (201)',
        price: '$200.00 USD',
        description: 'I will set up a convincing spoofed email domain matching your target company. Includes email templates for invoice fraud.',
        sold: '445',
      },
    ],
  },
  {
    name: 'Financial Fraud',
    icon: '💳',
    listings: [
      {
        title: 'Cloned Credit Cards — AU Issued',
        seller: 'CardPress',
        rating: '★★★★☆ (389)',
        price: '$65.00 USD each',
        description: 'Physical cloned Visa/Mastercard. Australian banks. $2k–$10k limits. Ships within Australia only.',
        sold: '1,567',
      },
      {
        title: 'Fullz — Credit Card + Identity Bundle',
        seller: 'FullzMarket',
        rating: '★★★★★ (278)',
        price: '$35.00 USD',
        description: 'CC number, expiry, CVV, cardholder name, billing address, phone, email, DOB. Ready for online purchases.',
        sold: '4,102',
      },
      {
        title: 'Cryptocurrency Tumbling Service',
        seller: 'CleanCoin',
        rating: '★★★★☆ (534)',
        price: '3% fee',
        description: 'Make your crypto untraceable. BTC, ETH, XMR supported. Minimum 0.1 BTC. Automated mixing with 6-hour delay.',
        sold: '12,304',
      },
    ],
  },
  {
    name: 'Fake Documents',
    icon: '📄',
    listings: [
      {
        title: 'Fake Australian Passport — Premium Quality',
        seller: 'DocForge',
        rating: '★★★★★ (67)',
        price: '$2,500.00 USD',
        description: 'High-quality reproduction. Passes UV and basic inspection. Includes matching entry stamps. 3-week turnaround.',
        sold: '23',
      },
      {
        title: 'Fake Drivers Licence — Any AU State',
        seller: 'AusIDShop',
        rating: '★★★★☆ (312)',
        price: '$350.00 USD',
        description: 'PVC card with hologram. Choose NSW, VIC, QLD, WA, SA, TAS. Custom photo and details. Scans on basic readers.',
        sold: '891',
      },
      {
        title: 'Fake COVID Vaccination Certificate',
        seller: 'VaxFree',
        rating: '★★☆☆☆ (45)',
        price: '$50.00 USD',
        description: 'Australian Immunisation Register format. Includes QR code. May not pass government verification systems.',
        sold: '2,301',
      },
    ],
  },
];

// ─── FORUM THREADS (Real AU breaches, newest → oldest) ──────

const forumThreads = [
  {
    title: 'MediSecure Breach — Prescription Data for 12.9M Aussies',
    date: 'May 2024',
    author: 'PharmaLeak',
    replies: 342,
    views: '28.4k',
    pinned: true,
    preview: 'Full prescription histories, names, DOBs, addresses, Medicare numbers. E-prescription provider got popped. Data is already being sold in batches. This is healthcare data — top dollar stuff.',
    comments: [
      { author: 'DarkBuyer88', text: 'Healthcare data is gold. People can\'t change their Medicare numbers like they change a password.' },
      { author: 'InfoSecWatch', text: 'This is exactly why single points of failure in healthcare IT are terrifying.' },
      { author: 'CyberGhost_AU', text: 'Anyone got a sample set? Need to verify before buying the full dump.' },
    ],
  },
  {
    title: 'DP World Ports Hack — Australia\'s Supply Chain Crippled',
    date: 'Nov 2023',
    replies: 189,
    author: 'PortCracker',
    views: '15.2k',
    pinned: false,
    preview: 'DP World operates 40% of Australia\'s container trade. Hackers got in, they had to shut down port operations for 3 days. Containers sitting on docks, supply chains wrecked. Corporate data extracted before lockdown.',
    comments: [
      { author: 'LogisticsNerd', text: 'This showed how fragile critical infrastructure really is. One breach = national impact.' },
      { author: 'APT_Tracker', text: 'Likely a nation-state affiliate. The lateral movement was too clean for script kiddies.' },
    ],
  },
  {
    title: 'Latitude Financial — 14 MILLION Records Stolen',
    date: 'Mar 2023',
    replies: 521,
    author: 'FinBreacher',
    views: '41.7k',
    pinned: false,
    preview: 'Latitude Financial got absolutely destroyed. 14 million customer records — drivers licences, passport numbers, financial statements. They initially said 300k… then kept revising up. The real number is catastrophic.',
    comments: [
      { author: 'DataHoarder', text: '14 million in a country of 26 million. That\'s more than half the adult population.' },
      { author: 'IDTheftPro', text: 'The drivers licence data from this breach is still being used for identity fraud right now.' },
      { author: 'RiskAnalyst', text: 'They held records going back 18 years. Why? Data retention policies exist for a reason.' },
    ],
  },
  {
    title: 'HWL Ebsworth Law Firm Hack — Legal Secrets Dumped',
    date: 'Apr 2023',
    replies: 267,
    author: 'ALPHV_Fan',
    views: '22.1k',
    pinned: false,
    preview: 'One of Australia\'s largest law firms. ALPHV/BlackCat ransomware gang published 1.45TB of data. Client files, court documents, privileged communications. Government clients exposed. This is as bad as it gets for a law firm.',
    comments: [
      { author: 'LegalEagle', text: 'Attorney-client privilege means nothing when your data is sitting on a .onion site.' },
      { author: 'GovSecWatch', text: 'They had government contracts. Defence, infrastructure. The classified exposure hasn\'t been fully assessed.' },
    ],
  },
  {
    title: '🔥 Optus Breach — 9.8M Customer Records 🔥',
    date: 'Sep 2022',
    replies: 1843,
    author: 'OptusData',
    views: '156.3k',
    pinned: false,
    preview: 'The big one. Optus left an unauthenticated API endpoint exposed to the internet. No login required. An attacker just… walked in and downloaded 9.8 million records. Names, DOBs, passport numbers, licence numbers. The API had been open for months.',
    comments: [
      { author: 'APIHunter', text: 'An unauthenticated API in 2022. Let that sink in. No auth. None.' },
      { author: 'BreachTrader', text: 'Full dataset going for $1M. Passport numbers and licence numbers are the real value here.' },
      { author: 'CyberPolicy', text: 'This single breach changed Australia\'s privacy laws. That\'s how bad it was.' },
      { author: 'NetworkAdmin', text: 'They didn\'t even have rate limiting on the endpoint. You could just enumerate customer IDs sequentially.' },
    ],
  },
  {
    title: 'Medibank / ahm — Health Data on the Dark Web NOW',
    date: 'Oct 2022',
    replies: 1204,
    author: 'MediBreach',
    views: '98.7k',
    pinned: false,
    preview: 'Medibank refused to pay the ransom. Attackers started dumping data in categories: "good-list", "naughty-list". Health claims data including mental health, substance abuse treatment, pregnancy terminations. 9.7 million customers exposed.',
    comments: [
      { author: 'HealthPrivacy', text: 'They categorised dumps by medical procedures. A "naughty list" of sensitive claims. People\'s most private health decisions, published.' },
      { author: 'RansomWatch', text: 'Medibank did the right thing not paying. But the human cost of this data being public is immeasurable.' },
      { author: 'DarkAnalyst', text: 'This is the breach that made Australians realise their health data isn\'t safe.' },
    ],
  },
  {
    title: 'Toll Group — Hit TWICE by Ransomware in One Year',
    date: 'Feb 2020 / May 2020',
    replies: 445,
    author: 'TollPwned',
    views: '34.8k',
    pinned: false,
    preview: 'Australian logistics giant Toll Group got hit by MailTo ransomware in February 2020. They barely recovered before Nefilim ransomware hit them again in May. Attackers published corporate data on the dark web. Two different ransomware gangs, same company, same year.',
    comments: [
      { author: 'IRConsultant', text: 'Getting hit once is a failure. Getting hit twice in 3 months means you learned nothing from the first time.' },
      { author: 'SupplyChainSec', text: 'Toll is a critical logistics provider. Both attacks disrupted deliveries across Australia.' },
    ],
  },
  {
    title: 'Canva Breach — 137 Million Users Worldwide',
    date: 'May 2019',
    replies: 876,
    author: 'GnosticPlayers',
    views: '67.2k',
    pinned: false,
    preview: 'Australian-founded design platform Canva breached by GnosticPlayers. 137 million user records including usernames, real names, email addresses, and bcrypt password hashes. Also included Google OAuth tokens for users who signed in via Google.',
    comments: [
      { author: 'HashCracker', text: 'Bcrypt hashes at least — not plain text. But weak passwords still crack fast with modern GPUs.' },
      { author: 'OAuthResearcher', text: 'The OAuth token leak was underreported. That\'s not just Canva access — that\'s potentially Google account access.' },
      { author: 'ScaleSec', text: '137 million. Australian startup goes global, and so does the breach impact.' },
    ],
  },
];

// ─── EDUCATIONAL CALLOUTS ───────────────────────────────────

const educationalNotes = {
  store: `<div class="dw-edu-banner">
    <span class="dw-edu-icon">⚠️</span>
    <div>
      <strong>This is a simulation.</strong> But everything you see here reflects real items sold on dark web marketplaces every day.
      Stolen passwords, identities, and credit cards are traded like products on Amazon.
      <em>Your data could be here right now — if you've ever been caught in a breach.</em>
    </div>
  </div>`,
  forum: `<div class="dw-edu-banner">
    <span class="dw-edu-icon">⚠️</span>
    <div>
      <strong>These are real Australian data breaches.</strong> The forum posts are simulated, but the incidents, dates, and data volumes are real.
      Together, these breaches exposed more data records than Australia has people.
    </div>
  </div>`,
};

// ─── BUILD THE DARK WEB EXPERIENCE ──────────────────────────

export function buildDarkWebGame(container, item) {
  // Tell modal to go full-screen
  const modalBox = document.getElementById('modal-box');
  modalBox.classList.add('modal-fullscreen');

  // Clean up fullscreen class when modal closes
  const observer = new MutationObserver(() => {
    const overlay = document.getElementById('modal-overlay');
    if (overlay.classList.contains('hidden')) {
      modalBox.classList.remove('modal-fullscreen');
      observer.disconnect();
    }
  });
  observer.observe(document.getElementById('modal-overlay'), { attributes: true });

  // Render the shell
  container.innerHTML = `
    <div class="dw-browser">
      <div class="dw-toolbar">
        <div class="dw-address-bar">
          <span class="dw-onion-icon">🧅</span>
          <span class="dw-url">http://shadow5market7x3fg2d.onion</span>
        </div>
        <div class="dw-toolbar-text">TOR Browser — Connection Encrypted</div>
      </div>

      <div class="dw-header">
        <h1 class="dw-title">Shadow Market</h1>
        <p class="dw-subtitle">Australia's Premier Underground Marketplace</p>
        <div class="dw-stats">
          <span>👤 12,847 vendors</span>
          <span>📦 94,231 listings</span>
          <span>💰 BTC/XMR accepted</span>
        </div>
      </div>

      <div class="dw-tabs">
        <button class="dw-tab active" data-tab="store">🛒 Marketplace</button>
        <button class="dw-tab" data-tab="forum">💬 Forum</button>
      </div>

      <div class="dw-tab-content" id="dw-store-tab"></div>
      <div class="dw-tab-content hidden" id="dw-forum-tab"></div>
    </div>
  `;

  // ── Wire tabs ──
  const tabs = container.querySelectorAll('.dw-tab');
  const storeTab = container.querySelector('#dw-store-tab');
  const forumTab = container.querySelector('#dw-forum-tab');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.dataset.tab === 'store') {
        storeTab.classList.remove('hidden');
        forumTab.classList.add('hidden');
      } else {
        forumTab.classList.remove('hidden');
        storeTab.classList.add('hidden');
      }
    });
  });

  // ── Build Store ──
  renderStore(storeTab);

  // ── Build Forum ──
  renderForum(forumTab);
}

// ─── STORE RENDERER ─────────────────────────────────────────

function renderStore(container) {
  let html = educationalNotes.store;

  html += `<div class="dw-category-nav">`;
  storeCategories.forEach((cat, i) => {
    html += `<button class="dw-cat-btn ${i === 0 ? 'active' : ''}" data-cat="${i}">${cat.icon} ${cat.name}</button>`;
  });
  html += `</div>`;

  html += `<div class="dw-listings" id="dw-listings-area"></div>`;

  container.innerHTML = html;

  const listingsArea = container.querySelector('#dw-listings-area');
  const catBtns = container.querySelectorAll('.dw-cat-btn');

  function showCategory(index) {
    const cat = storeCategories[index];
    let listingsHtml = '';

    cat.listings.forEach((listing) => {
      listingsHtml += `
        <div class="dw-listing">
          <div class="dw-listing-header">
            <span class="dw-listing-title">${listing.title}</span>
            <span class="dw-listing-price">${listing.price}</span>
          </div>
          <div class="dw-listing-meta">
            <span>Seller: <strong>${listing.seller}</strong></span>
            <span>${listing.rating}</span>
            <span>${listing.sold} sold</span>
          </div>
          <p class="dw-listing-desc">${listing.description}</p>
          <button class="dw-buy-btn" onclick="this.textContent='⚠️ This is a simulation — but real buyers click buttons just like this';this.disabled=true;this.classList.add('dw-buy-clicked')">Add to Cart — Pay with BTC</button>
        </div>
      `;
    });

    listingsArea.innerHTML = listingsHtml;
  }

  catBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      catBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      showCategory(i);
    });
  });

  showCategory(0);
}

// ─── FORUM RENDERER ─────────────────────────────────────────

function renderForum(container) {
  let html = educationalNotes.forum;

  html += `<div class="dw-forum-header">
    <h2>📋 Breach Discussion Board</h2>
    <p class="dw-forum-desc">High-profile Australian data breaches — newest first</p>
  </div>`;

  html += `<div class="dw-threads">`;

  forumThreads.forEach((thread, i) => {
    html += `
      <div class="dw-thread" data-index="${i}">
        <div class="dw-thread-header">
          ${thread.pinned ? '<span class="dw-pin">📌 PINNED</span>' : ''}
          <span class="dw-thread-title">${thread.title}</span>
          <span class="dw-thread-date">${thread.date}</span>
        </div>
        <div class="dw-thread-meta">
          <span>by <strong>${thread.author}</strong></span>
          <span>💬 ${thread.replies} replies</span>
          <span>👁️ ${thread.views} views</span>
        </div>
        <p class="dw-thread-preview">${thread.preview}</p>
        <div class="dw-thread-comments hidden" id="dw-comments-${i}"></div>
        <button class="dw-expand-btn" data-index="${i}">Show discussion ▾</button>
      </div>
    `;
  });

  html += `</div>`;

  container.innerHTML = html;

  // Wire expand buttons
  container.querySelectorAll('.dw-expand-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      const commentsDiv = container.querySelector(`#dw-comments-${idx}`);
      const isHidden = commentsDiv.classList.contains('hidden');

      if (isHidden) {
        // Render comments
        const thread = forumThreads[idx];
        let commentsHtml = '';
        thread.comments.forEach((c) => {
          commentsHtml += `
            <div class="dw-comment">
              <span class="dw-comment-author">${c.author}</span>
              <p class="dw-comment-text">${c.text}</p>
            </div>
          `;
        });
        commentsDiv.innerHTML = commentsHtml;
        commentsDiv.classList.remove('hidden');
        btn.textContent = 'Hide discussion ▴';
      } else {
        commentsDiv.classList.add('hidden');
        btn.textContent = 'Show discussion ▾';
      }
    });
  });
}
