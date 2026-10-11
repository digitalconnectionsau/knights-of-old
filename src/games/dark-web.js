/* ==========================================================
   dark-web.js — IMMERSIVE: Fake Dark Web Marketplace & Forum

   Type: Exploration / shock-value awareness
   Theme: Shows players that the dark web is real, that stolen
          data is openly traded, and that major UK
          breaches have very real consequences.
   ========================================================== */

// ─── STORE LISTINGS ─────────────────────────────────────────

const storeCategories = [
  {
    name: 'Stolen Credentials',
    icon: '🔑',
    listings: [
      {
        title: 'UK Email + Password Combo List',
        seller: 'DarkDump_UK',
        rating: '★★★★☆ (312)',
        price: '$12.00 USD',
        description: '50,000 verified .co.uk email/password combinations. Sourced from recent breaches. 78% hit rate on major platforms.',
        sold: '1,842',
      },
      {
        title: 'Corporate VPN Credentials — Logistics Sector',
        seller: 'NetGh0st',
        rating: '★★★★★ (87)',
        price: '$250.00 USD',
        description: 'Active VPN logins for 3 UK logistics companies. Verified within 48hrs. Includes internal network maps.',
        sold: '14',
      },
      {
        title: 'Banking Login Pack — UK Banks',
        seller: 'PhishKing_',
        rating: '★★★★☆ (541)',
        price: '$45.00 USD per account',
        description: 'Internet banking credentials for major UK banks. Includes security question answers. Balances £5k–£50k.',
        sold: '329',
      },
      {
        title: 'Netflix / Spotify / Disney+ Bundle',
        seller: 'StreamLeech',
        rating: '★★★☆☆ (1,203)',
        price: '$2.50 USD',
        description: '10x working streaming accounts. UK region. Some with family plans. No guarantees past 30 days.',
        sold: '8,412',
      },
    ],
  },
  {
    name: 'Stolen Identity',
    icon: '🪪',
    listings: [
      {
        title: 'Full Identity Package — UK Citizen',
        seller: 'ID_Factory',
        rating: '★★★★★ (198)',
        price: '$85.00 USD',
        description: 'Full name, DOB, address, National Insurance number, NHS number, driving licence number, mother\'s maiden name. Verified fresh.',
        sold: '673',
      },
      {
        title: 'NHS Number Data — Bulk (100 records)',
        seller: 'MedLeak',
        rating: '★★★★☆ (64)',
        price: '$180.00 USD',
        description: 'Bulk pack of NHS numbers with matching names and DOBs. Sourced from healthcare sector breach 2024.',
        sold: '41',
      },
      {
        title: 'Driving Licence Scans — UK',
        seller: 'ScanMaster',
        rating: '★★★★☆ (223)',
        price: '$25.00 USD each',
        description: 'High-resolution scans of real UK driving licences. Useful for verification bypasses.',
        sold: '1,102',
      },
    ],
  },
  {
    name: 'Stolen Databases',
    icon: '🗄️',
    listings: [
      {
        title: 'Telecom Customer Database — 2M Records',
        seller: 'TelcoDump',
        rating: '★★★★★ (46)',
        price: '$1,000.00 USD',
        description: 'Customer dump from a UK telecoms breach. Names, DOBs, passport numbers, licence numbers, emails, phone numbers. Unredacted.',
        sold: '127',
      },
      {
        title: 'Patient Records Subset',
        seller: 'MediDump',
        rating: '★★★★☆ (33)',
        price: '$500.00 USD',
        description: 'Contains names, DOBs, NHS numbers and test results. ~480k records.',
        sold: '58',
      },
      {
        title: 'UK University Student Records',
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
        title: 'Cloned Credit Cards — UK Issued',
        seller: 'CardPress',
        rating: '★★★★☆ (389)',
        price: '$65.00 USD each',
        description: 'Physical cloned Visa/Mastercard. UK banks. £2k–£10k limits. Ships within the UK only.',
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
        title: 'Fake UK Passport — Premium Quality',
        seller: 'DocForge',
        rating: '★★★★★ (67)',
        price: '$2,500.00 USD',
        description: 'High-quality reproduction. Passes UV and basic inspection. Includes matching entry stamps. 3-week turnaround.',
        sold: '23',
      },
      {
        title: 'Fake UK Driving Licence',
        seller: 'UKIDShop',
        rating: '★★★★☆ (312)',
        price: '$350.00 USD',
        description: 'PVC card with hologram. Custom photo and details. Scans on basic readers.',
        sold: '891',
      },
      {
        title: 'Fake COVID Vaccination Certificate',
        seller: 'VaxFree',
        rating: '★★☆☆☆ (45)',
        price: '$50.00 USD',
        description: 'NHS COVID Pass format. Includes QR code. May not pass government verification systems.',
        sold: '2,301',
      },
    ],
  },
];

// ─── FORUM THREADS (Real UK attacks, newest → oldest) ──────

const forumThreads = [
  {
    title: 'Co-op — Member Data for 6.5 Million People',
    date: 'Apr 2025',
    author: 'RetailWatch',
    replies: 298,
    views: '24.1k',
    pinned: true,
    preview: 'The Co-op confirmed that personal details of around 6.5 million members were taken. It shut down parts of its own IT to contain the attack, and some shop shelves went empty for a while.',
    comments: [
      { author: 'IRConsultant', text: 'Pulling the plug early hurts, but it limited the damage. Speed matters.' },
      { author: 'PrivacyNerd', text: 'No payment data, but names, addresses and phone numbers are enough for convincing scam calls.' },
    ],
  },
  {
    title: 'M&S — Online Orders Down for Six Weeks',
    date: 'Apr 2025',
    author: 'RetailWatch',
    replies: 356,
    views: '29.8k',
    pinned: false,
    preview: 'Marks & Spencer stopped taking online orders for around 46 days after a cyber attack. Some customer data was taken. M&S estimated the hit to profit at around £300 million.',
    comments: [
      { author: 'SupplyChainSec', text: 'A household name, offline for weeks. Nobody is too big for this.' },
      { author: 'HelpDeskHero', text: 'Reports say it started with social engineering against a help desk. Verify callers properly.' },
    ],
  },
  {
    title: 'Synnovis / NHS — London Blood Tests Disrupted',
    date: 'Jun 2024',
    author: 'PathLeak',
    replies: 412,
    views: '33.5k',
    pinned: false,
    preview: 'A ransomware attack on Synnovis, which runs pathology services for several London NHS hospitals, disrupted blood tests. Thousands of appointments and operations were postponed, and stolen data was later published online.',
    comments: [
      { author: 'HealthPrivacy', text: 'Hit one supplier and you hit every hospital that relies on it.' },
      { author: 'InfoSecWatch', text: 'This one affected real patients, not just spreadsheets.' },
    ],
  },
  {
    title: 'British Library — Months Offline After Ransomware',
    date: 'Oct 2023',
    author: 'ShelfLife',
    replies: 267,
    views: '21.9k',
    pinned: false,
    preview: 'The Rhysida gang attacked the British Library. It refused to pay, and around 600GB of data, including staff details, was leaked. The online catalogue and many services were down for months.',
    comments: [
      { author: 'RansomWatch', text: 'Not paying was the right call. Rebuilding took a very long time.' },
      { author: 'LegacyIT', text: 'Old systems that are hard to patch made recovery much harder.' },
    ],
  },
  {
    title: 'Electoral Commission — 40 Million Voters\' Details',
    date: 'Aug 2023',
    author: 'RollCall',
    replies: 521,
    views: '41.7k',
    pinned: false,
    preview: 'The Electoral Commission revealed attackers had access to its systems for over a year before it noticed. Names and addresses on the electoral registers, around 40 million people, were exposed.',
    comments: [
      { author: 'DetectionFirst', text: 'Over a year inside without being spotted. Monitoring matters as much as prevention.' },
    ],
  },
  {
    title: 'Capita — Outsourcer Breach Hits Dozens of Clients',
    date: 'Mar 2023',
    author: 'SupplierRisk',
    replies: 189,
    views: '15.2k',
    pinned: false,
    preview: 'A ransomware attack on Capita exposed data it held for clients, including pension schemes and councils. One supplier breach became dozens of organisations\' problem.',
    comments: [
      { author: 'ThirdPartyRisk', text: 'Your data is only as safe as your weakest supplier.' },
    ],
  },
  {
    title: 'Royal Mail — International Post Stopped for Weeks',
    date: 'Jan 2023',
    author: 'PostMortem',
    replies: 445,
    views: '34.8k',
    pinned: false,
    preview: 'LockBit ransomware stopped Royal Mail sending parcels and letters abroad for around six weeks. Royal Mail refused a reported $80 million ransom demand.',
    comments: [
      { author: 'LogisticsNerd', text: 'Logistics runs on IT. When the systems stop, the vans stop.' },
      { author: 'BackupBob', text: 'Refusing to pay only works if you can recover without them.' },
    ],
  },
  {
    title: 'TalkTalk — 157,000 Customers Exposed',
    date: 'Oct 2015',
    author: 'OldSchool',
    replies: 876,
    views: '67.2k',
    pinned: false,
    preview: 'A basic website flaw let teenagers access data on around 157,000 TalkTalk customers. The regulator fined TalkTalk £400,000 for failing to protect it.',
    comments: [
      { author: 'PatchItNow', text: 'A known, fixable weakness. Basics first, always.' },
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
      <strong>These are real UK cyber attacks.</strong> The forum posts are simulated, but the incidents and dates are real.
      The Electoral Commission breach alone affected around 40 million people.
    </div>
  </div>`,
};

// ─── BUILD THE DARK WEB EXPERIENCE ──────────────────────────

export function buildDarkWebGame(container, item, complete = () => {}) {
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
        <p class="dw-subtitle">The UK's Premier Underground Marketplace</p>
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
        complete();   // reading the forum completes this clue
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
    <p class="dw-forum-desc">High-profile UK cyber attacks — newest first</p>
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
