export const FIRM = {
  name: "O.O. KALU & ASSOCIATES",
  tagline: "Counsel for consequential matters",
  phone: "+234 (0) 9 291 0142",
  email: "chambers@equitychambers.ng",
  address: "Owerri, Imo State, Nigeria",
  offices: [
    { city: "Owerri, Imo State", detail: "Owerri, Imo State, Nigeria" },
  ],
};

export type PracticeArea = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  services: string[];
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    slug: "corporate",
    title: "Corporate & M&A",
    summary: "Acquisitions, joint ventures, and board counsel under the Companies and Allied Matters Act.",
    detail:
      "We advise acquirers, targets, and boards through the full arc of a Nigerian transaction — due diligence, CAMA 2020 structuring, FCCPC merger clearance, SEC Nigeria approvals, and post-completion integration — with a bias toward terms that survive the first hard quarter.",
    services: [
      "Mergers & acquisitions",
      "Private equity & venture investment",
      "Corporate governance & CAC compliance",
      "Joint ventures & local content partnerships",
      "Corporate restructuring & insolvency",
    ],
  },
  {
    slug: "litigation",
    title: "Litigation & Arbitration",
    summary: "Advocacy before the Nigerian courts and in domestic and international arbitration.",
    detail:
      "Our advocates appear at the Federal High Court, State High Courts, the Court of Appeal, and the Supreme Court of Nigeria, and sit in arbitrations under the Arbitration and Mediation Act 2023, LCA, RCICAL, and ICC rules. Every matter is prepared for hearing from the first week.",
    services: [
      "Commercial trials & appeals",
      "Domestic & international arbitration",
      "Banking, finance & recovery disputes",
      "Shareholder & fiduciary claims",
      "Election and public law litigation",
    ],
  },
  {
    slug: "energy",
    title: "Energy & Natural Resources",
    summary: "Upstream, midstream, and power mandates under the Petroleum Industry Act.",
    detail:
      "From our Port Harcourt office we advise operators, indigenous producers, and financiers on PIA licensing, NUPRC and NMDPRA compliance, divestment of onshore assets, host community trusts, and power projects across the NERC framework.",
    services: [
      "Oil & gas licensing and PIA compliance",
      "Asset divestments & farm-outs",
      "Nigerian content (NCDMB) advisory",
      "Power, renewables & NERC regulation",
      "Host community and environmental claims",
    ],
  },
  {
    slug: "regulatory",
    title: "Regulatory & Investigations",
    summary: "CBN, SEC, FCCPC, EFCC, and sector regulators — compliance built and defended.",
    detail:
      "We represent institutions and individuals before Nigerian financial and sector regulators and law enforcement, and we build compliance programmes — AML/CFT, NDPA data protection, competition — that hold up under examination rather than only on paper.",
    services: [
      "EFCC & ICPC investigations",
      "CBN and SEC Nigeria enforcement",
      "FCCPC competition & consumer protection",
      "AML/CFT and sanctions compliance",
      "Internal investigations",
    ],
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property & Technology",
    summary: "Brand, patent, and data protection counsel for Nigeria's technology economy.",
    detail:
      "We register and enforce rights at the Trademarks, Patents and Designs Registry, advise fintechs on CBN and NDPC obligations, and treat intellectual property as commercial infrastructure: protected where it creates leverage, licensed where it creates revenue.",
    services: [
      "Trademark registration & enforcement",
      "Patents, designs & trade secrets",
      "NDPA data protection compliance",
      "Fintech & payments licensing",
      "Technology transfer (NOTAP) agreements",
    ],
  },
  {
    slug: "real-estate",
    title: "Real Estate & Infrastructure",
    summary: "Title, entitlement, and project finance for significant Nigerian developments.",
    detail:
      "We conduct title investigation and perfection under the Land Use Act, secure Governor's consent, and shepherd developments and PPP infrastructure projects through approvals, financing, and the disputes ambitious construction attracts.",
    services: [
      "Acquisitions, title perfection & Governor's consent",
      "Development & AMAC/Lagos planning approvals",
      "Commercial leasing",
      "PPP and infrastructure projects",
      "Construction disputes",
    ],
  },
];

export type Attorney = {
  slug: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  education: string[];
  admissions: string[];
  initials: string;
};

export const ATTORNEYS: Attorney[] = [
  {
    slug: "adaeze-okonjo",
    name: "Adaeze Okonjo, SAN",
    role: "Managing Partner",
    focus: "Corporate & M&A",
    bio: "Adaeze has led more than ninety acquisitions across Nigeria and West Africa and chairs the firm's transactions committee. She is known for keeping deals alive when the naira moves and the economics change overnight.",
    education: ["LL.M., University of Lagos", "LL.B., University of Nigeria, Nsukka", "B.L., Nigerian Law School, Bwari"],
    admissions: ["Nigerian Bar Association", "Senior Advocate of Nigeria (2019)", "England & Wales (solicitor)"],
    initials: "AO",
  },
  {
    slug: "chukwuemeka-bassey",
    name: "Chukwuemeka Bassey, SAN",
    role: "Senior Partner, Disputes",
    focus: "Litigation & Arbitration",
    bio: "A trial advocate with forty-one first-chair wins, Emeka leads the firm's highest-exposure commercial disputes before the Federal High Court and the Supreme Court, and sits as arbitrator under the Arbitration and Mediation Act.",
    education: ["LL.M., University of Ibadan", "LL.B., Obafemi Awolowo University", "B.L., Nigerian Law School, Lagos"],
    admissions: ["Nigerian Bar Association", "Senior Advocate of Nigeria (2016)", "Chartered Institute of Arbitrators"],
    initials: "CB",
  },
  {
    slug: "halima-yakubu",
    name: "Halima Yakubu-Danjuma",
    role: "Partner, Regulatory",
    focus: "Regulatory & Investigations",
    bio: "Formerly a legal officer at a federal financial regulator in Abuja, Halima defends institutions in CBN, SEC, and EFCC matters and rebuilds the compliance functions that invited the scrutiny.",
    education: ["LL.M., Ahmadu Bello University, Zaria", "LL.B., University of Abuja", "B.L., Nigerian Law School, Bwari"],
    admissions: ["Nigerian Bar Association", "Institute of Chartered Secretaries (Nigeria)"],
    initials: "HY",
  },
  {
    slug: "tunde-alabi",
    name: "Tunde Alabi",
    role: "Partner, Energy",
    focus: "Energy & Natural Resources",
    bio: "A petroleum engineer before he was a lawyer, Tunde runs the Port Harcourt office and advises indigenous producers on PIA licensing, onshore divestments, and host community settlements.",
    education: ["LL.B., University of Port Harcourt", "B.Eng., Petroleum Engineering, University of Benin", "B.L., Nigerian Law School, Yenagoa"],
    admissions: ["Nigerian Bar Association", "Association of International Petroleum Negotiators"],
    initials: "TA",
  },
  {
    slug: "ngozi-eze-whyte",
    name: "Ngozi Eze-Whyte",
    role: "Partner, Private Client",
    focus: "Private Client & Succession",
    bio: "Ngozi counsels Nigerian families through succession, philanthropy, and family governance, with particular experience where customary law, statutory wills, and offshore trusts meet.",
    education: ["LL.M., University of Lagos", "LL.B., University of Calabar", "B.L., Nigerian Law School, Lagos"],
    admissions: ["Nigerian Bar Association", "Society of Trust and Estate Practitioners"],
    initials: "NE",
  },
  {
    slug: "ibrahim-suleiman",
    name: "Ibrahim Suleiman",
    role: "Partner, Real Estate",
    focus: "Real Estate & Infrastructure",
    bio: "Ibrahim closes landmark property transactions in Abuja and Lagos and guides sponsors through title perfection, Governor's consent, and the construction disputes that follow large builds.",
    education: ["LL.B., Bayero University, Kano", "B.Sc., Estate Management, ABU Zaria", "B.L., Nigerian Law School, Kano"],
    admissions: ["Nigerian Bar Association", "Nigerian Institution of Estate Surveyors (affiliate)"],
    initials: "IS",
  },
];

export type NotableCase = {
  year: string;
  title: string;
  practice: string;
  outcome: string;
  detail: string;
};

export const CASES: NotableCase[] = [
  {
    year: "2025",
    title: "Acquisition of a pan-African payments network",
    practice: "Corporate & M&A",
    outcome: "$420M closed",
    detail:
      "Advised the acquirer through FCCPC merger review, CBN approval, and a renegotiated purchase price after diligence findings in three jurisdictions.",
  },
  {
    year: "2024",
    title: "Onshore oil block divestment and host community trust",
    practice: "Energy & Natural Resources",
    outcome: "Completed under the PIA",
    detail:
      "Represented an indigenous producer on the acquisition of a divested onshore asset, NUPRC consent, and the constitution of the host community development trust.",
  },
  {
    year: "2024",
    title: "Federal High Court challenge to a banking directive",
    practice: "Litigation & Arbitration",
    outcome: "Judgment for the client",
    detail:
      "Successfully challenged the application of a regulatory directive to our client's portfolio, with the decision affirmed on appeal in Lagos.",
  },
  {
    year: "2023",
    title: "EFCC inquiry into legacy trade financing",
    practice: "Regulatory & Investigations",
    outcome: "Closed without charge",
    detail:
      "Conducted the internal investigation, presented findings in Abuja, and remediated the trade finance controls that prompted the inquiry.",
  },
  {
    year: "2022",
    title: "LCA arbitration over a gas supply agreement",
    practice: "Litigation & Arbitration",
    outcome: "Award plus costs",
    detail:
      "Secured a favourable award for the supplier in a Lagos Court of Arbitration proceeding arising from sustained delivery shortfalls.",
  },
  {
    year: "2021",
    title: "Mixed-use waterfront development, Lagos",
    practice: "Real Estate & Infrastructure",
    outcome: "Approved, 92,000 sqm",
    detail:
      "Guided the sponsor through title perfection, Governor's consent, environmental review, and community negotiation to full planning approval.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "They told us the target was worth less than we thought, and they were right. That honesty saved us from an acquisition we would have spent a decade regretting.",
    author: "Group Managing Director",
    org: "Manufacturing group, Lagos",
  },
  {
    quote:
      "Emeka argued our matter as though the court were the only audience that mattered. The other side never recovered from the first morning at the Federal High Court.",
    author: "General Counsel",
    org: "Listed logistics company, Lagos",
  },
  {
    quote:
      "The regulatory team rebuilt our compliance function in four months. Our next CBN examination was the quietest we have ever had.",
    author: "Chief Compliance Officer",
    org: "Commercial bank, Abuja",
  },
  {
    quote:
      "On the divestment they knew the PIA better than the counterparty's advisers, and the host community trust they drafted has held without a single stoppage.",
    author: "Executive Director",
    org: "Indigenous producer, Port Harcourt",
  },
];

export const PUBLICATIONS = [
  {
    title: "Earn-Outs After the Naira Float: Drafting for Disagreement",
    author: "Adaeze Okonjo, SAN",
    venue: "Nigerian Journal of Corporate Practice",
    date: "March 2026",
    summary: "Why earn-out disputes cluster around the same four clauses, and how to draft each of them for a devaluing currency.",
  },
  {
    title: "The First Morning: Opening Advocacy in Nigerian Commercial Trials",
    author: "Chukwuemeka Bassey, SAN",
    venue: "NBA Litigation Quarterly",
    date: "November 2025",
    summary: "An argument for treating the opening as the judgment's outline rather than the evidence's preview.",
  },
  {
    title: "Compliance Programmes That Survive a CBN Examination",
    author: "Halima Yakubu-Danjuma",
    venue: "Journal of Financial Regulation in Nigeria",
    date: "August 2025",
    summary: "A field guide to the gap between documented controls and controls that actually operate.",
  },
  {
    title: "Host Community Trusts Three Years Into the Petroleum Industry Act",
    author: "Tunde Alabi",
    venue: "West African Energy Law Review",
    date: "May 2025",
    summary: "What the first cohort of trusts got right, and where settlement deeds keep failing operators.",
  },
  {
    title: "Customary Succession and the Offshore Trust",
    author: "Ngozi Eze-Whyte",
    venue: "Estates & Succession Notes",
    date: "February 2025",
    summary: "Residency, situs, and the quiet assumptions that unravel multigenerational Nigerian planning.",
  },
];
