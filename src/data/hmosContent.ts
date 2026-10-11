import visionImg from '../assets/images/hmos_vision_architecture_1791646745243.jpg';
import sovereigntyImg from '../assets/images/hmos_sovereignty_monolith_1791646768169.jpg';
import architectureImg from '../assets/images/hmos_diamond_core_pavilion_1791646782021.jpg';
import ecosystemImg from '../assets/images/hmos_ecosystem_infrastructure_1791646794737.jpg';
import monolithImg from '../assets/images/hmos_monolith_sculpture_1791646805793.jpg';
import keynoteImg from '../assets/images/hmos_keynote_benchmark_card_1791652005530.jpg';

export const LINKEDIN_URL =
  'https://www.linkedin.com/in/mhdali-palsaniya-68233923b?utm_source=share_via&utm_content=profile&utm_medium=member_android';

export const STORIVE_URL = 'https://www.storive.in';

export interface ChapterItem {
  id: string;
  number: string;
  badgeLabel: string;
  badgeColor: string;
  badgeTextColor: string;
  floemaBadgeColor: string;
  floemaBadgeText: string;
  iconType: 'vision' | 'sovereignty' | 'architecture' | 'ecosystem' | 'details';
  headline: string;
  ctaLabel: string;
  dossierTitle: string;
  dossierCode: string;
  image: string;
  defaultScrollMode: 'expanded' | 'progress-line';
  summary: string;
  specifications: { label: string; value: string }[];
}

export interface InsightArticle {
  id: string;
  title: string;
  date: string;
  location: string;
  readTime: string;
  image: string;
  excerpt: string;
  body: string[];
}

export interface CollectionItem {
  id: string;
  name: string;
  secondaryWord?: string;
  count: string;
  plaqueNumber: string;
  iconType: 'vision' | 'sovereignty' | 'architecture' | 'ecosystem' | 'details';
  badgeBg: string;
  badgeText: string;
  thumbType: 'monolith-post' | 'slatted-planter' | 'clock-totem' | 'custom-plaque';
  thumbImage: string;
  monolithImage: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
}

export const IMAGES = {
  vision: visionImg,
  sovereignty: sovereigntyImg,
  architecture: architectureImg,
  ecosystem: ecosystemImg,
  monolith: monolithImg,
  keynote: keynoteImg,
};

export const LOCALE_STRINGS: Record<
  'EN' | 'DE' | 'FR' | 'IN',
  {
    heroHeadline: string;
    recentNewsLabel: string;
    theCollectionsLabel: string;
    exploreBtn: string;
    enduranceHeadline: string;
    communitySub: string;
  }
> = {
  EN: {
    heroHeadline: 'Systems for sovereignty,\nmade for certainty.',
    recentNewsLabel: 'Recent News ↓',
    theCollectionsLabel: 'The Collections',
    exploreBtn: 'EXPLORE →',
    enduranceHeadline: 'Made to last,\ndesigned to endure.',
    communitySub: 'Join our community Sign up for news,\nupdates and more.',
  },
  DE: {
    heroHeadline: 'Systeme für Souveränität,\ngemacht für Gewissheit.',
    recentNewsLabel: 'Aktuelles ↓',
    theCollectionsLabel: 'Die Kollektionen',
    exploreBtn: 'ENTDECKEN →',
    enduranceHeadline: 'Gebaut für Dauer,\nentworfen für Beständigkeit.',
    communitySub: 'Werden Sie Teil unserer Community für\nArchitektur-Updates und mehr.',
  },
  FR: {
    heroHeadline: 'Des systèmes souverains,\nconçus pour la certitude.',
    recentNewsLabel: 'Actualités ↓',
    theCollectionsLabel: 'Les Collections',
    exploreBtn: 'EXPLORER →',
    enduranceHeadline: 'Conçu pour durer,\nbâti pour endurer.',
    communitySub: 'Rejoignez notre communauté pour recevoir\nnos actualités et dépêches.',
  },
  IN: {
    heroHeadline: 'Systems for sovereignty,\nmade for certainty.',
    recentNewsLabel: 'Recent Dispatches ↓',
    theCollectionsLabel: 'The Collections',
    exploreBtn: 'EXPLORE →',
    enduranceHeadline: 'Made to last,\ndesigned to endure.',
    communitySub: 'Join our sovereign engineering community\nfor news, updates and more.',
  },
};

export const CHAPTERS: ChapterItem[] = [
  {
    id: 'vision',
    number: '01',
    badgeLabel: 'Vision',
    badgeColor: '#2563EB',
    badgeTextColor: '#F8FAFC',
    floemaBadgeColor: '#EB5638',
    floemaBadgeText: '#141413',
    iconType: 'vision',
    headline: 'Deterministic kernels, architecture, and systems for sovereign spaces',
    ctaLabel: 'SEE VISION SYSTEMS',
    dossierTitle: 'Vision Catalogue',
    dossierCode: 'HMOS-VIS-2026',
    image: IMAGES.vision,
    defaultScrollMode: 'expanded',
    summary:
      'HMOS Vision establishes the foundational design language for sovereign computing environments—locking 35/35 enterprise workflow survival at 310ms deterministic latency.',
    specifications: [
      { label: 'Survival Integrity', value: '100.0% (35/35 Steps)' },
      { label: 'Execution Latency', value: '310ms Deterministic (15.5x)' },
      { label: 'Structural Materiality', value: 'Zero-Trust Slate & Cobalt' },
      { label: 'Principal Architect', value: 'Mahammadali Palsaniya' },
    ],
  },
  {
    id: 'sovereignty',
    number: '02',
    badgeLabel: 'Sovereignty',
    badgeColor: '#3B82F6',
    badgeTextColor: '#090D16',
    floemaBadgeColor: '#3B82F6',
    floemaBadgeText: '#090D16',
    iconType: 'sovereignty',
    headline: 'Autonomous infrastructure and cryptographic verification for resilient territories',
    ctaLabel: 'SEE SOVEREIGNTY SYSTEMS',
    dossierTitle: 'Sovereignty Catalogue',
    dossierCode: 'HMOS-SOV-2026',
    image: IMAGES.sovereignty,
    defaultScrollMode: 'progress-line',
    summary:
      'Designed for institutions that require complete operational independence, HMOS Sovereignty locks state transitions with on-disk SHA-256 cryptographic proof in 7 milliseconds.',
    specifications: [
      { label: 'Verification Digest', value: 'SHA-256 On-Disk (7ms)' },
      { label: 'Database Posture', value: '8-Pillar Zero-Trust Lock' },
      { label: 'Entropy Ceiling', value: '<= 0.250 Bits' },
      { label: 'Quorum Topology', value: '5-Node Lamport Vector' },
    ],
  },
  {
    id: 'architecture',
    number: '03',
    badgeLabel: 'Architecture',
    badgeColor: '#60A5FA',
    badgeTextColor: '#090D16',
    floemaBadgeColor: '#60A5FA',
    floemaBadgeText: '#090D16',
    iconType: 'architecture',
    headline: 'Four-corner symmetrical weave engineered for zero-entropy continuity',
    ctaLabel: 'SEE ARCHITECTURE SYSTEMS',
    dossierTitle: 'Architecture Catalogue',
    dossierCode: 'HMOS-ARC-2026',
    image: IMAGES.architecture,
    defaultScrollMode: 'progress-line',
    summary:
      'Anchored by our 45-degree rotated faceted diamond core, HMOS Architecture strips away 41.7% of structural bloat while mathematically proving 100% safety guard parity.',
    specifications: [
      { label: 'Structural De-Bloat', value: '37.7% – 41.7% Reduction' },
      { label: 'Safety Guard Parity', value: '100.0% Mathematically Proven' },
      { label: 'Core Geometry', value: '45° Faceted Diamond Core' },
      { label: 'Wrapper Overhead', value: '0 Executable Classes' },
    ],
  },
  {
    id: 'ecosystem',
    number: '04',
    badgeLabel: 'Ecosystem',
    badgeColor: '#10B981',
    badgeTextColor: '#090D16',
    floemaBadgeColor: '#8FB98B',
    floemaBadgeText: '#141413',
    iconType: 'ecosystem',
    headline: 'Revamp your foundation with distributed quorum locks and sovereign telemetry',
    ctaLabel: 'SEE ECOSYSTEM SYSTEMS',
    dossierTitle: 'Ecosystem Catalogue',
    dossierCode: 'HMOS-ECO-2026',
    image: IMAGES.ecosystem,
    defaultScrollMode: 'expanded',
    summary:
      'A unified family of sovereign monoliths, deterministic execution nodes, and precision interfaces synchronized via monotonic Lamport vector clocks across 5 worker nodes.',
    specifications: [
      { label: 'Speedup Factor', value: '15.5x Faster (310ms vs 4,820ms)' },
      { label: 'Node Synchronization', value: 'Monotonic Vector Clocks' },
      { label: 'Entropy Bound', value: '<= 0.250 Bits Shannon Ceiling' },
      { label: 'Deployment Lifecycle', value: 'Multi-Decade Endurance' },
    ],
  },
  {
    id: 'details',
    number: '05',
    badgeLabel: 'Details',
    badgeColor: '#CBD5E1',
    badgeTextColor: '#090D16',
    floemaBadgeColor: '#D1D1CD',
    floemaBadgeText: '#141413',
    iconType: 'details',
    headline: 'Precision-engineered custom sovereign hardware and invariant locks',
    ctaLabel: 'SEE DETAILS SYSTEMS',
    dossierTitle: 'Details Catalogue',
    dossierCode: 'HMOS-DET-2026',
    image: IMAGES.monolith,
    defaultScrollMode: 'expanded',
    summary:
      'Every chamfer, fastener, and cryptographic seal in the HMOS hardware and software ecosystem is tailored to harmonize human clarity with uncompromising zero-trust durability.',
    specifications: [
      { label: 'Custom Fabrication', value: 'Anodized Cobalt & Slate Carbon' },
      { label: 'Invariant Audit', value: '8 / 8 SHA-256 Verified (7ms)' },
      { label: 'Fault Tolerance', value: 'Zero-Split-Brain Quorum Lock' },
      { label: 'Design Origin', value: 'HMOS Sovereign Studio, India' },
    ],
  },
];

export const MANIFESTO_TEXT =
  'Sovereignty is our calling. It demands architecture to be aligned with strict mathematical principles and answer to the highest standards. It keeps us on a journey of innovation, crafting each system to keep certainty on our side.';

export const INSIGHTS: InsightArticle[] = [
  {
    id: 'sovereign-territories',
    title: 'Why 98% single-step AI wrappers drop to 49.3% survival across 35 enterprise steps—and how HMOS® locks 100%',
    date: 'October 2026',
    location: 'HMOS Sovereign Research Studio',
    readTime: '4 min read',
    image: IMAGES.keynote,
    excerpt:
      'Analyzing compounding probabilistic drift in 35-step enterprise workflows and how the HMOS Deterministic Kernel executes 35/35 steps in 310ms.',
    body: [
      'When enterprise infrastructure is built on fragile, probabilistic wrappers, institutions inherit silent compounding failure. At 98% single-step reliability, a 35-step workflow drops to a 49.3% survival rate (0.98 ^ 35 = 49.3%), typically crashing around Step 14 due to loose optional state and race conditions.',
      'HMOS® (Hybrid Master Operating System) replaces probabilistic luck with a deterministic kernel lock. Across all 35 production steps, HMOS achieves 100.0% survival at 310ms vs. 4,820ms—a 15.5x execution speedup.',
      'Founded and architected by Mahammadali Palsaniya, HMOS treats software and physical monoliths with the same architectural permanence: zero unnecessary wrapper bloat, 100% safety guard parity, and cryptographic proof at every state boundary.',
    ],
  },
  {
    id: 'diamond-core-architecture',
    title: 'Inside Stage 05 & Stage 07: Stripping 41.7% wrapper bloat while locking Shannon Entropy under 0.250 bits',
    date: 'September 2026',
    location: 'DeepTech & Sovereign AI Infrastructure, India',
    readTime: '3 min read',
    image: IMAGES.architecture,
    excerpt:
      'How the 4-corner interlocking ribbon weave and 45-degree rotated faceted diamond core enforce zero-trust invariants in 7 milliseconds.',
    body: [
      'True architectural elegance comes from what you remove without compromising safety. The HMOS Stage 05 AST De-Bloat Compiler strips 37.7% to 41.7% of bloated OOP wrapper lines (0 executable classes) while mathematically proving 100% safety guard-clause retention.',
      'In distributed multi-agent execution, Stage 07 eliminates split-brain corruption using monotonic Lamport Vector Clocks and a strict Shannon Entropy ceiling of <= 0.250 bits across 5 worker nodes.',
      'Backed by 8-invariant on-disk SHA-256 verification in 7ms, every state transition is permanently auditable and tamper-proof.',
    ],
  },
];

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'vision',
    name: 'Vision',
    secondaryWord: 'Kernel',
    count: '35',
    plaqueNumber: '35',
    iconType: 'vision',
    badgeBg: '#EB5638',
    badgeText: '#141413',
    thumbType: 'monolith-post',
    thumbImage: IMAGES.monolith,
    monolithImage: IMAGES.monolith,
    tagline: '35-Step Deterministic Survival Series',
    description:
      'Sovereign kernel modules and architectural monoliths engineered for 100.0% workflow survival at 310ms execution latency (15.5x faster).',
    metrics: [
      { label: 'Workflow Survival', value: '35 / 35 Steps (100%)' },
      { label: 'Execution Time', value: '310ms vs 4,820ms' },
    ],
  },
  {
    id: 'sovereignty',
    name: 'Sovereignty',
    count: '08',
    plaqueNumber: '08',
    iconType: 'sovereignty',
    badgeBg: '#3B82F6',
    badgeText: '#090D16',
    thumbType: 'slatted-planter',
    thumbImage: IMAGES.sovereignty,
    monolithImage: IMAGES.monolith,
    tagline: '8-Invariant Zero-Trust Cryptographic Lock',
    description:
      'On-disk SHA-256 invariant verification in 7ms with an 8-pillar zero-trust database lock (status == verified, no delete, no merge).',
    metrics: [
      { label: 'Invariant Lock', value: '8 / 8 SHA-256 Verified' },
      { label: 'Audit Latency', value: '7ms On-Disk Proof' },
    ],
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem',
    count: '41',
    plaqueNumber: '05',
    iconType: 'ecosystem',
    badgeBg: '#8FB98B',
    badgeText: '#141413',
    thumbType: 'clock-totem',
    thumbImage: IMAGES.architecture,
    monolithImage: IMAGES.monolith,
    tagline: 'Stage 05 Guard-Parity & Stage 07 Quorum Systems',
    description:
      'Precision systems stripping 41.7% wrapper overhead while locking 5 worker nodes under a <= 0.250-bit Shannon entropy ceiling.',
    metrics: [
      { label: 'Bloat Reduction', value: '41.7% Stripped' },
      { label: 'Guard Retention', value: '100.0% Proven' },
    ],
  },
  {
    id: 'details',
    name: 'Details',
    count: '00',
    plaqueNumber: '01',
    iconType: 'details',
    badgeBg: '#D1D1CD',
    badgeText: '#141413',
    thumbType: 'custom-plaque',
    thumbImage: IMAGES.ecosystem,
    monolithImage: IMAGES.monolith,
    tagline: 'Zero-Executable-Class Pure Architecture',
    description:
      'Custom sovereign interfaces, monotonic Lamport clock enclosures, and zero-bloat modules architected by Mahammadali Palsaniya.',
    metrics: [
      { label: 'Entropy Ceiling', value: '<= 0.250 Bits' },
      { label: 'Executable Classes', value: '00 (Pure Functional)' },
    ],
  },
];

export const CRAFT_STEPS = [
  {
    step: 'We design',
    description: 'Every kernel and architectural interface is designed to guarantee 100% deterministic viability',
    image: IMAGES.vision,
    caption: 'HMOS® Sovereign Coastal Pavilion — Architectural Proportion & Light Study',
  },
  {
    step: 'We build',
    description: 'Stripping structural wrapper bloat while ensuring 100% safety guard parity stays unaltered',
    image: IMAGES.architecture,
    caption: '45° Faceted Diamond Core Sanctuary — Structural Verification',
  },
  {
    step: 'We implement',
    description: 'Every deployment is crafted to endure, locked with 7ms SHA-256 verification and zero drift',
    image: IMAGES.ecosystem,
    caption: 'Precision Anodized Cobalt & Slate Assembly — Sovereign Craftsmanship',
  },
];
