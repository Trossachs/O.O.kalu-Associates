export const FIRM = {
  name: "Equity Chambers",
  tagline: "Counsel for consequential matters",
  phone: "+1 (212) 555-0142",
  email: "chambers@equitychambers.example",
  address: "48 Wall Street, 27th Floor, New York, NY 10005",
  founded: 1994,
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
    summary: "Cross-border acquisitions, joint ventures, and governance for founders and boards.",
    detail:
      "We advise acquirers, targets, and boards through the full arc of a transaction — diligence, structuring, negotiation, and integration — with a bias toward closing terms that survive the first hard quarter.",
    services: ["Mergers & acquisitions", "Private equity", "Corporate governance", "Joint ventures", "Restructuring"],
  },
  {
    slug: "litigation",
    title: "Complex Litigation",
    summary: "Trial and appellate advocacy in commercial disputes of institutional significance.",
    detail:
      "Our litigators try cases. We prepare every matter for a jury from day one, which tends to produce better settlements and, when settlement fails, a record built to win.",
    services: ["Commercial trials", "Appellate advocacy", "Class action defense", "Fraud & fiduciary claims"],
  },
  {
    slug: "regulatory",
    title: "Regulatory & Enforcement",
    summary: "Government investigations, compliance architecture, and enforcement defense.",
    detail:
      "We represent institutions and individuals before financial and sector regulators, and we build compliance programs that hold up under examination rather than only on paper.",
    services: ["SEC & DOJ investigations", "Internal investigations", "Compliance programs", "Sanctions & AML"],
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property",
    summary: "Portfolio strategy and contested proceedings for research-intensive companies.",
    detail:
      "From first filing to contested proceedings, we treat intellectual property as commercial infrastructure: protected where it creates leverage, licensed where it creates revenue.",
    services: ["Patent litigation", "Trademark strategy", "Trade secrets", "Technology licensing"],
  },
  {
    slug: "private-client",
    title: "Private Client & Estates",
    summary: "Succession, philanthropy, and fiduciary counsel for families across generations.",
    detail:
      "We serve as long-term counsel to families and their entities, coordinating succession planning, philanthropic structures, and the occasional contested estate.",
    services: ["Estate planning", "Trust administration", "Family governance", "Philanthropic structuring"],
  },
  {
    slug: "real-estate",
    title: "Real Estate & Development",
    summary: "Acquisition, entitlement, and financing of significant commercial assets.",
    detail:
      "We close complex property transactions and shepherd development projects through entitlement, financing, and the disputes that follow ambitious construction.",
    services: ["Acquisitions & dispositions", "Development & entitlement", "Commercial leasing", "Construction disputes"],
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
    name: "Adaeze Okonjo",
    role: "Managing Partner",
    focus: "Corporate & M&A",
    bio: "Adaeze has led more than ninety acquisitions across three continents and chairs the firm's transactions committee. She is known for keeping deals alive when the economics move.",
    education: ["J.D., Columbia Law School", "B.A., Economics, Amherst College"],
    admissions: ["New York", "England & Wales (solicitor)"],
    initials: "AO",
  },
  {
    slug: "marcus-hale",
    name: "Marcus Hale",
    role: "Senior Partner, Litigation",
    focus: "Complex Litigation",
    bio: "A trial lawyer with forty-one first-chair verdicts, Marcus handles the firm's highest-exposure commercial disputes and teaches advocacy at the appellate level.",
    education: ["J.D., Yale Law School", "B.A., History, Morehouse College"],
    admissions: ["New York", "Connecticut", "U.S. Supreme Court"],
    initials: "MH",
  },
  {
    slug: "liv-sorensen",
    name: "Liv Sørensen",
    role: "Partner, Regulatory",
    focus: "Regulatory & Enforcement",
    bio: "Formerly an enforcement attorney at a federal financial regulator, Liv defends institutions in investigations and rebuilds the compliance functions that invited them.",
    education: ["LL.M., NYU School of Law", "Cand.jur., University of Copenhagen"],
    admissions: ["New York", "Denmark"],
    initials: "LS",
  },
  {
    slug: "rafael-mendes",
    name: "Rafael Mendes",
    role: "Partner, Intellectual Property",
    focus: "Intellectual Property",
    bio: "A former semiconductor engineer, Rafael litigates patents in the districts that matter and advises research companies on portfolio strategy before the first filing.",
    education: ["J.D., Stanford Law School", "M.S., Electrical Engineering, USP"],
    admissions: ["New York", "California", "USPTO"],
    initials: "RM",
  },
  {
    slug: "eleanor-whitfield",
    name: "Eleanor Whitfield",
    role: "Partner, Private Client",
    focus: "Private Client & Estates",
    bio: "Eleanor counsels families through succession and philanthropy, with particular experience in cross-border trusts and contested fiduciary matters.",
    education: ["J.D., Harvard Law School", "B.A., Classics, Wellesley College"],
    admissions: ["New York", "Massachusetts"],
    initials: "EW",
  },
  {
    slug: "tobias-lin",
    name: "Tobias Lin",
    role: "Partner, Real Estate",
    focus: "Real Estate & Development",
    bio: "Tobias closes landmark property transactions and guides developers through entitlement and construction disputes in dense urban markets.",
    education: ["J.D., NYU School of Law", "B.Arch., Cornell University"],
    admissions: ["New York", "New Jersey"],
    initials: "TL",
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
    title: "Cross-border acquisition of a regional payments network",
    practice: "Corporate & M&A",
    outcome: "$2.4B closed",
    detail: "Represented the acquirer through antitrust review in three jurisdictions and a renegotiated purchase price after diligence findings.",
  },
  {
    year: "2024",
    title: "Defense verdict in a fiduciary duty trial",
    practice: "Complex Litigation",
    outcome: "Full defense verdict",
    detail: "Six-week jury trial arising from an alleged breach by former directors of a family-controlled manufacturer.",
  },
  {
    year: "2024",
    title: "Federal enforcement inquiry into disclosure practices",
    practice: "Regulatory & Enforcement",
    outcome: "Closed without action",
    detail: "Conducted the internal investigation, presented findings, and remediated the reporting controls that prompted the inquiry.",
  },
  {
    year: "2023",
    title: "Semiconductor patent campaign",
    practice: "Intellectual Property",
    outcome: "Injunction plus license",
    detail: "Secured a permanent injunction and a portfolio-wide license after a two-year multi-district campaign.",
  },
  {
    year: "2022",
    title: "Contested succession of a multigenerational estate",
    practice: "Private Client & Estates",
    outcome: "Settled on client terms",
    detail: "Resolved competing claims across four jurisdictions while preserving the family's philanthropic foundation.",
  },
  {
    year: "2021",
    title: "Mixed-use waterfront development entitlement",
    practice: "Real Estate & Development",
    outcome: "Approved, 1.1M sq ft",
    detail: "Guided the sponsor through zoning, environmental review, and community negotiation to unanimous approval.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "They told us the deal was worth less than we thought, and they were right. That honesty saved us from an acquisition we would have spent a decade regretting.",
    author: "Chief Executive",
    org: "Industrial manufacturing group",
  },
  {
    quote:
      "Marcus tried our case as though the jury were the only audience that mattered. The other side never recovered from the first morning.",
    author: "General Counsel",
    org: "Publicly traded logistics company",
  },
  {
    quote:
      "The regulatory team rebuilt our compliance function in four months. Our next examination was the quietest one we've had.",
    author: "Chief Compliance Officer",
    org: "Regional financial institution",
  },
  {
    quote:
      "Eleanor handled three generations of a difficult family with more patience than any of us deserved, and the structure has held for eleven years.",
    author: "Family Principal",
    org: "Private client",
  },
];

export const PUBLICATIONS = [
  {
    title: "Earn-Outs After the Rate Shift: Drafting for Disagreement",
    author: "Adaeze Okonjo",
    venue: "Chambers Review of Corporate Practice",
    date: "March 2026",
    summary: "Why earn-out disputes cluster around the same four clauses, and how to draft each of them differently.",
  },
  {
    title: "The First Morning: Opening Statements in Commercial Trials",
    author: "Marcus Hale",
    venue: "Litigation Quarterly",
    date: "November 2025",
    summary: "An argument for treating the opening as the verdict's outline rather than the evidence's preview.",
  },
  {
    title: "Compliance Programs That Survive Examination",
    author: "Liv Sørensen",
    venue: "Journal of Financial Regulation",
    date: "August 2025",
    summary: "A field guide to the gap between documented controls and controls that actually operate.",
  },
  {
    title: "Portfolio Strategy Before the First Filing",
    author: "Rafael Mendes",
    venue: "Technology & Intellectual Property Law Review",
    date: "May 2025",
    summary: "Treating patent filings as a commercial roadmap rather than a defensive reflex.",
  },
  {
    title: "Cross-Border Trusts and the Problem of Home",
    author: "Eleanor Whitfield",
    venue: "Estates & Succession Notes",
    date: "February 2025",
    summary: "Residency, situs, and the quiet assumptions that unravel multigenerational planning.",
  },
];
