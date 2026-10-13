import visionImg from '../assets/images/hmos_vision_architecture_1791646745243.jpg';
import architectureImg from '../assets/images/hmos_diamond_core_pavilion_1791646782021.jpg';
import ecosystemImg from '../assets/images/hmos_ecosystem_infrastructure_1791646794737.jpg';
import monolithImg from '../assets/images/hmos_monolith_sculpture_1791646805793.jpg';
import kernelImg from '../assets/images/hmos_kernel_engine_die_1792000000001.jpg';
import secureGateImg from '../assets/images/hmos_secure_gate_1792000000002.jpg';
import hardwareImg from '../assets/images/hmos_sovereign_hardware_hsc_1792000000003.jpg';

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
  /** Optional downloadable PDF catalogue shown wherever this section appears. */
  catalogPdf?: string;
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
  kernel: kernelImg,
  sovereignty: secureGateImg,
  hardware: hardwareImg,
  architecture: architectureImg,
  ecosystem: ecosystemImg,
  monolith: monolithImg,
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
    recentNewsLabel: 'Latest Insights ↓',
    theCollectionsLabel: 'The Collections',
    exploreBtn: 'EXPLORE →',
    enduranceHeadline: 'Made to last,\ndesigned to endure.',
    communitySub: 'Join our community.\nSign up for architecture notes and release updates.',
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
    recentNewsLabel: 'Latest Insights ↓',
    theCollectionsLabel: 'The Collections',
    exploreBtn: 'EXPLORE →',
    enduranceHeadline: 'Made to last,\ndesigned to endure.',
    communitySub: 'Join our engineering community for\narchitecture notes and release updates.',
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
    headline: 'Deterministic kernels for infrastructure that cannot afford to guess',
    ctaLabel: 'Explore Vision',
    dossierTitle: 'Vision Catalogue',
    dossierCode: 'HMOS-VIS-2026',
    image: IMAGES.kernel,
    defaultScrollMode: 'expanded',
    summary:
      'HMOS Vision sets the design language for sovereign computing: a deterministic kernel that completes all 35 steps of an enterprise workflow (35/35).',
    specifications: [
      { label: 'Workflow Survival', value: '100.0% (35/35 steps)' },
      { label: 'Probabilistic Baseline', value: '49.3% survival (0.98^35)' },
      { label: 'Design Language', value: 'Slate & Cobalt' },
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
    headline: 'Autonomous infrastructure, verified by cryptography at every state change',
    ctaLabel: 'Explore Sovereignty',
    dossierTitle: 'Sovereignty Catalogue',
    dossierCode: 'HMOS-SOV-2026',
    image: IMAGES.sovereignty,
    defaultScrollMode: 'progress-line',
    summary:
      'Built for institutions that need complete operational independence. Every state transition is locked by an on-disk cryptographic proof.',
    specifications: [
      { label: 'Verification', value: 'On-disk cryptographic proof' },
      { label: 'Database Lock', value: '8-pillar zero-trust lock' },
      { label: 'Entropy Ceiling', value: '≤ 0.250 bits' },
      { label: 'Quorum', value: '5 nodes · Lamport vector clocks' },
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
    headline: 'Four-corner symmetry, engineered for continuity without drift',
    ctaLabel: 'Explore Architecture',
    dossierTitle: 'Architecture Catalogue',
    dossierCode: 'HMOS-ARC-2026',
    image: IMAGES.architecture,
    defaultScrollMode: 'progress-line',
    summary:
      'Anchored by a 45° faceted diamond core, HMOS Architecture removes 37.7–41.7% of redundant wrapper code and mathematically proves that 100% of safety guard clauses are retained.',
    specifications: [
      { label: 'Wrapper Code Removed', value: '37.7% – 41.7%' },
      { label: 'Safety Guard Parity', value: '100.0% (mathematically proven)' },
      { label: 'Core Geometry', value: '45° faceted diamond core' },
      { label: 'Executable Classes', value: '0' },
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
    headline: 'Distributed quorum locks that keep every node in agreement',
    ctaLabel: 'Explore Ecosystem',
    dossierTitle: 'Ecosystem Catalogue',
    dossierCode: 'HMOS-ECO-2026',
    image: IMAGES.ecosystem,
    defaultScrollMode: 'expanded',
    summary:
      'A unified family of deterministic execution nodes and precision interfaces, kept in sync by monotonic Lamport vector clocks across 5 worker nodes.',
    specifications: [
      { label: 'Worker Nodes', value: '5' },
      { label: 'Synchronization', value: 'Monotonic vector clocks' },
      { label: 'Entropy Bound', value: '≤ 0.250 bits (Shannon ceiling)' },
      { label: 'Design Intent', value: 'Long-lived deployments' },
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
    headline: 'Precision hardware, sealed by invariant locks',
    ctaLabel: 'Explore Details',
    dossierTitle: 'Details Catalogue',
    dossierCode: 'HMOS-DET-2026',
    image: IMAGES.hardware,
    defaultScrollMode: 'expanded',
    catalogPdf: '/catalogs/HMOS_Details_Catalog_Navy.pdf',
    summary:
      'Every chamfer, fastener and cryptographic seal is specified for human clarity and zero-trust durability, in both the hardware and the software.',
    specifications: [
      { label: 'Fabrication', value: 'Anodized cobalt & slate carbon' },
      { label: 'Invariant Audit', value: '8 / 8 verified' },
      { label: 'Split-Brain Protection', value: 'Quorum lock' },
      { label: 'Design Origin', value: 'HMOS Sovereign Studio, India' },
    ],
  },
];

export const MANIFESTO_TEXT =
  'Sovereignty is our calling. It demands architecture grounded in mathematical rigor and held to the highest standard. Every system we craft is built to keep certainty on your side.';

export const INSIGHTS: InsightArticle[] = [
  {
    id: 'sovereign-territories',
    title: 'Why a 98%-reliable AI step fails half the time over 35 steps, and how HMOS® holds 100%',
    date: 'October 2026',
    location: 'HMOS Sovereign Research Studio',
    readTime: '4 min read',
    image: IMAGES.monolith,
    excerpt:
      'How small per-step errors compound across a 35-step enterprise workflow, and how the HMOS Deterministic Kernel completes 35/35 steps.',
    body: [
      'Enterprise infrastructure built on probabilistic wrappers inherits silent, compounding failure. At 98% single-step reliability, a 35-step workflow survives only 49.3% of the time (0.98^35 = 49.3%), typically failing around Step 14 because of loose optional state and race conditions.',
      'HMOS® (Hybrid Master Operating System) replaces probabilistic luck with a deterministic kernel lock. Across all 35 production steps it achieves 100.0% survival.',
      'Founded and architected by Mahammadali Palsaniya, HMOS applies the same discipline to software and to physical hardware: no unnecessary wrapper code, 100% safety guard parity, and cryptographic proof at every state boundary.',
    ],
  },
  {
    id: 'diamond-core-architecture',
    title: 'Stage 05 and Stage 07: removing up to 41.7% of wrapper code while holding entropy to 0.250 bits or less',
    date: 'September 2026',
    location: 'DeepTech & Sovereign AI Infrastructure, India',
    readTime: '3 min read',
    image: IMAGES.architecture,
    excerpt:
      'How AST de-bloating and distributed quorum locking enforce zero-trust invariants, with on-disk verification.',
    body: [
      'Good architecture is defined by what you can remove without compromising safety. The Stage 05 AST De-Bloat Compiler strips 37.7% to 41.7% of redundant OOP wrapper lines (0 executable classes) while mathematically proving that 100% of safety guard clauses are retained.',
      'In distributed multi-agent execution, Stage 07 prevents split-brain corruption with monotonic Lamport vector clocks and a strict Shannon entropy ceiling of ≤ 0.250 bits across 5 worker nodes.',
      'Backed by 8-invariant, on-disk cryptographic verification, every state transition is auditable and tamper-evident.',
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
    tagline: '35-step deterministic workflow survival',
    description:
      'Sovereign kernel modules engineered for 100.0% workflow survival across a 35-step enterprise workflow.',
    metrics: [
      { label: 'Workflow Survival', value: '35 / 35 steps (100%)' },
      { label: 'Probabilistic Baseline', value: '49.3% survival' },
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
    tagline: '8-invariant zero-trust cryptographic lock',
    description:
      'On-disk cryptographic verification of all 8 invariants, backed by an 8-pillar zero-trust database lock (status == verified; no delete, no merge).',
    metrics: [
      { label: 'Invariant Lock', value: '8 / 8 verified' },
      { label: 'Audit Method', value: 'On-disk proof' },
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
    tagline: 'Stage 05 guard parity and Stage 07 quorum lock',
    description:
      'Systems that strip up to 41.7% of wrapper overhead while holding 5 worker nodes under a ≤ 0.250-bit Shannon entropy ceiling.',
    metrics: [
      { label: 'Wrapper Overhead Removed', value: 'Up to 41.7%' },
      { label: 'Guard Retention', value: '100.0% (proven)' },
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
    tagline: 'Pure architecture with zero executable classes',
    description:
      'Custom interfaces, Lamport-clock enclosures and lean, wrapper-free modules, architected by Mahammadali Palsaniya.',
    metrics: [
      { label: 'Entropy Ceiling', value: '≤ 0.250 bits' },
      { label: 'Executable Classes', value: '00 (pure functional)' },
    ],
  },
];

export const CRAFT_STEPS = [
  {
    step: 'We design',
    description: 'We design every kernel and interface so its behavior is fully determined before it runs',
    image: IMAGES.vision,
    caption: 'HMOS® Sovereign Coastal Pavilion — Architectural Proportion & Light Study',
  },
  {
    step: 'We build',
    description: 'We strip wrapper bloat and prove that every safety guard clause survives: 100% parity',
    image: IMAGES.architecture,
    caption: '45° Faceted Diamond Core Sanctuary — Structural Verification',
  },
  {
    step: 'We implement',
    description: 'Every deployment is locked by on-disk cryptographic verification, so nothing drifts from its verified state',
    image: IMAGES.ecosystem,
    caption: 'Precision Anodized Cobalt & Slate Assembly — Sovereign Craftsmanship',
  },
];
