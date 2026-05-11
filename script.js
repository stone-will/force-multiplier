/* ============================================================
   FORCE MULTIPLIER — script.js
   
   HOW TO ADD CONTENT:
   - Find the node by its id (e.g. "hedge_funds")
   - Update the "desc" field for the large left tile description
   - For leaf nodes, the flip card content is in renderExplorer()
     — search for "flip-back-coming" to find where to add detail
   ============================================================ */

// ============================================================
// TREE DATA
// Each node has:
//   title  — displayed on both large tile and child tile
//   desc   — displayed only on the large left tile
//   children — array of child node ids (branch nodes only)
//   leaf   — true means this is an end node (flip card)
// ============================================================
const TREE = {
  root: {
    title: "Last Day in Uniform",
    desc: "The moment everything changes — and the moment your real options open up. This map helps you understand the landscape of what comes next.",
    children: ["learning", "earning", "building"]
  },

  // ── LEARNING ──────────────────────────────────────────────
  learning: {
    title: "Learning",
    desc: "Some officers choose to invest in formal education before entering the workforce. This can open doors, build networks, and give you time to think clearly about what you want.",
    children: ["short_course", "part_time", "full_time"]
  },
  short_course: {
    title: "Short Course",
    desc: "Targeted qualifications that can be completed quickly, often alongside job searching. A strong way to signal commitment to a new field without committing to years of study.",
    children: ["imc", "pmp"]
  },
  imc: {
    title: "IMC",
    desc: "Content coming soon.",
    leaf: true
  },
  pmp: {
    title: "PMP",
    desc: "Content coming soon.",
    leaf: true
  },
  part_time: {
    title: "Part-time Study",
    desc: "Combining work and study. Increasingly common as employers support professional development. Allows you to earn while you learn and apply theory in real time.",
    children: ["mba_pt"]
  },
  mba_pt: {
    title: "MBA (Part-time)",
    desc: "Content coming soon.",
    leaf: true
  },
  full_time: {
    title: "Full-time Study",
    desc: "Committing fully to education. A significant investment in time and money, but one that can fundamentally shift your trajectory and open up competitive graduate programmes.",
    children: ["mba_ft"]
  },
  mba_ft: {
    title: "MBA (Full-time)",
    desc: "Content coming soon.",
    leaf: true
  },

  // ── EARNING ───────────────────────────────────────────────
  earning: {
    title: "Earning",
    desc: "The majority of officers move directly into employment. The landscape is broader than most realise — this map is designed to give you a clear picture of what's out there.",
    children: ["private", "public", "purposeled"]
  },

  // Private Sector
  private: {
    title: "Private Sector",
    desc: "The largest and most varied part of the economy. Private sector roles tend to offer higher financial upside and faster progression, in exchange for less job security than the public sector.",
    children: ["consulting", "finance", "corporate", "technology"]
  },

  // Consulting
  consulting: {
    title: "Consulting",
    desc: "Advising organisations on how to solve problems and improve performance. A natural fit for officers — the work is project-based, analytical, and rewards leadership under ambiguity.",
    children: ["strategy", "defence_consulting", "operations_consulting"]
  },
  strategy: {
    title: "Strategy Consulting",
    desc: "The most competitive and prestigious end of consulting. Strategy consultants advise senior leadership on the most complex, high-stakes decisions a business faces.",
    children: ["mbb", "big4", "boutique"]
  },
  mbb: {
    title: "MBB",
    desc: "Content coming soon.",
    leaf: true
  },
  big4: {
    title: "Big 4",
    desc: "Content coming soon.",
    leaf: true
  },
  boutique: {
    title: "Boutique",
    desc: "Content coming soon.",
    leaf: true
  },
  defence_consulting: {
    title: "Defence Consulting",
    desc: "Content coming soon.",
    leaf: true
  },
  operations_consulting: {
    title: "Operations Consulting",
    desc: "Content coming soon.",
    leaf: true
  },

  // Finance
  finance: {
    title: "Finance",
    desc: "One of the most common destinations for officers, and one of the least well understood from the outside. The word 'finance' covers enormously different roles, cultures, and skillsets.",
    children: ["asset_mgmt", "capital_markets", "inv_banking", "insurance"]
  },
  asset_mgmt: {
    title: "Asset Management",
    desc: "Managing pools of capital on behalf of clients — pension funds, institutions, or individuals. A world of analysis, conviction, and long-term thinking.",
    children: ["multi_asset", "hedge_funds", "pe_credit", "wealth_mgmt", "real_assets"]
  },
  multi_asset:  { title: "Multi-asset",             desc: "Content coming soon.", leaf: true },
  hedge_funds:  { title: "Hedge Funds",              desc: "Content coming soon.", leaf: true },
  pe_credit:    { title: "Private Equity / Credit",  desc: "Content coming soon.", leaf: true },
  wealth_mgmt:  { title: "Wealth Management",        desc: "Content coming soon.", leaf: true },
  real_assets:  { title: "Real Assets",              desc: "Content coming soon.", leaf: true },

  capital_markets: {
    title: "Capital Markets",
    desc: "Where companies and governments raise money by issuing stocks and bonds. Fast-paced, relationship-driven, and analytically demanding.",
    children: ["sales_trading", "ecm", "dcm", "research", "structuring"]
  },
  sales_trading: { title: "Sales & Trading",         desc: "Content coming soon.", leaf: true },
  ecm:           { title: "Equity Capital Markets",  desc: "Content coming soon.", leaf: true },
  dcm:           { title: "Debt Capital Markets",    desc: "Content coming soon.", leaf: true },
  research:      { title: "Research",                desc: "Content coming soon.", leaf: true },
  structuring:   { title: "Structuring",             desc: "Content coming soon.", leaf: true },

  inv_banking: {
    title: "Investment Banking",
    desc: "Advisory work for companies on their most significant transactions — mergers, acquisitions, fundraising. Intense, well-compensated, and highly prestigious.",
    children: ["ma", "lev_finance", "restructuring"]
  },
  ma:            { title: "Mergers & Acquisitions",  desc: "Content coming soon.", leaf: true },
  lev_finance:   { title: "Leveraged Finance",       desc: "Content coming soon.", leaf: true },
  restructuring: { title: "Restructuring",           desc: "Content coming soon.", leaf: true },

  insurance: {
    title: "Insurance",
    desc: "The business of pricing and transferring risk. Underrated by many officers — it is analytically rigorous, globally significant, and offers a range of entry points.",
    children: ["underwriting", "broking", "claims", "actuarial", "reinsurance"]
  },
  underwriting: { title: "Underwriting", desc: "Content coming soon.", leaf: true },
  broking:      { title: "Broking",      desc: "Content coming soon.", leaf: true },
  claims:       { title: "Claims",       desc: "Content coming soon.", leaf: true },
  actuarial:    { title: "Actuarial",    desc: "Content coming soon.", leaf: true },
  reinsurance:  { title: "Reinsurance",  desc: "Content coming soon.", leaf: true },

  // Corporate
  corporate: {
    title: "Corporate",
    desc: "Working within a company rather than advising one. Corporate roles span every sector and function — more content on specific paths coming soon.",
    leaf: true
  },

  // Technology
  technology: {
    title: "Technology",
    desc: "One of the fastest-growing sectors for officer transitions. Technology companies reward leadership, operational clarity, and the ability to work under pressure.",
    children: ["fintech", "defence_tech", "enterprise_tech"]
  },
  fintech:        { title: "FinTech",        desc: "Content coming soon.", leaf: true },
  defence_tech:   { title: "Defence Tech",   desc: "Content coming soon.", leaf: true },
  enterprise_tech:{ title: "Enterprise Tech",desc: "Content coming soon.", leaf: true },

  // Public Sector
  public: {
    title: "Public Sector",
    desc: "Roles funded and run by the state. Typically offer greater job security, strong pensions, and the opportunity to continue serving the public in a different capacity.",
    children: ["civil_service", "police"]
  },
  civil_service: { title: "Civil Service", desc: "Content coming soon.", leaf: true },
  police:        { title: "Police",        desc: "Content coming soon.", leaf: true },

  // Purpose-led
  purposeled: {
    title: "Purpose-led",
    desc: "Organisations driven by mission rather than profit. Often attract officers who want to maintain a sense of service and impact in their civilian career.",
    children: ["charity", "ngo"]
  },
  charity: { title: "Charity", desc: "Content coming soon.", leaf: true },
  ngo:     { title: "NGO",     desc: "Content coming soon.", leaf: true },

  // ── BUILDING ──────────────────────────────────────────────
  building: {
    title: "Building",
    desc: "Content coming soon.",
    leaf: true
  }
};

// ============================================================
// EXPLORER STATE
// ============================================================
let path = ['root']; // stack of visited node ids
let flipped = false;

function currentNode() { return TREE[path[path.length - 1]]; }
function currentId()   { return path[path.length - 1]; }

function navigate(id) {
  path.push(id);
  flipped = false;
  render();
}

function goBack() {
  if (path.length > 1) {
    path.pop();
    flipped = false;
    render();
  }
}

function goTo(index) {
  path = path.slice(0, index + 1);
  flipped = false;
  render();
}

// ============================================================
// RENDER
// ============================================================
function render() {
  renderBreadcrumb();
  renderExplorer();
}

function renderBreadcrumb() {
  const bc = document.getElementById('breadcrumb');
  bc.innerHTML = path.map((id, i) => {
    const node = TREE[id];
    const isLast = i === path.length - 1;
    return `
      ${i > 0 ? '<span class="breadcrumb-sep">›</span>' : ''}
      <span class="breadcrumb-item ${isLast ? 'active' : ''}"
            onclick="${isLast ? '' : `goTo(${i})`}">
        ${node.title}
      </span>
    `;
  }).join('');
}

function renderExplorer() {
  const explorer = document.getElementById('explorer');
  const node = currentNode();

  // ── LEAF NODE: flip card ───────────────────────────────────
  if (node.leaf) {
    explorer.innerHTML = `
      <div class="flip-wrapper">
        <div class="flip-inner ${flipped ? 'flipped' : ''}" id="flipInner">

          <div class="flip-front">
            <div>
              <div class="flip-front-label">Career Path</div>
              <div class="flip-front-title">${node.title}</div>
              <div class="flip-front-sub">
                Click below to find out what this role involves,
                what skills transfer, and what people do next.
              </div>
            </div>
            <button class="flip-btn" onclick="doFlip()">Find out more ↩</button>
          </div>

          <div class="flip-back">
            <div class="flip-back-label">Career Detail</div>
            <div class="flip-back-title">${node.title}</div>
            <div class="flip-back-coming">
              <div class="coming-icon">✍️</div>
              <p class="coming-text">
                Detailed content for this career path is coming soon.<br>
                In the meantime, book a call to talk it through.
              </p>
              <a href="#contact" class="coming-cta">📅 Book a free call</a>
            </div>
            <button class="flip-back-btn" onclick="doFlip()">← Flip back</button>
          </div>

        </div>
      </div>
      ${path.length > 1 ? `
        <div class="explorer-connector"></div>
        <div style="display:flex;align-items:center;">
          <button class="back-btn" onclick="goBack()">← Back</button>
        </div>
      ` : ''}
    `;
    return;
  }

  // ── BRANCH NODE: main tile + children ─────────────────────
  const depthLabels = ['Start here', 'Top-level route', 'Sector', 'Specialism', 'Role'];
  const depthLabel = depthLabels[Math.min(path.length - 1, depthLabels.length - 1)];

  const childrenHtml = node.children.map(cid => {
    const child = TREE[cid];
    const isLeaf = !!child.leaf;
    return `
      <div class="child-tile ${isLeaf ? 'is-leaf' : ''} animate-in"
           onclick="navigate('${cid}')">
        <span class="child-tile-title">${child.title}</span>
        <span class="child-tile-arrow"></span>
      </div>
    `;
  }).join('');

  explorer.innerHTML = `
    <div class="main-tile animate-in">
      <div>
        <div class="main-tile-depth">${depthLabel}</div>
        <div class="main-tile-title">${node.title}</div>
        <div class="main-tile-desc">${node.desc}</div>
      </div>
      ${path.length > 1 ? `<button class="back-btn" onclick="goBack()">← Back</button>` : ''}
    </div>
    <div class="explorer-connector"></div>
    <div class="children-col">
      <div class="children-label">Choose a path</div>
      ${childrenHtml}
    </div>
  `;
}

// ── FLIP TOGGLE ───────────────────────────────────────────────
function doFlip() {
  flipped = !flipped;
  const inner = document.getElementById('flipInner');
  if (inner) inner.classList.toggle('flipped', flipped);
}

// ── CONTACT FORM ──────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  this.style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
});

// ── INIT ──────────────────────────────────────────────────────
render();
