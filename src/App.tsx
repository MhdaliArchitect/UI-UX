import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  LINKEDIN_URL,
  STORIVE_URL,
  CHAPTERS,
  MANIFESTO_TEXT,
  INSIGHTS,
  COLLECTIONS,
  CRAFT_STEPS,
  LOCALE_STRINGS,
  IMAGES,
  ChapterItem,
  InsightArticle,
  CollectionItem,
} from './data/hmosContent';
import {
  HmosEmblem,
  CategoryIcon,
  CollectionStudioThumb,
  CatalogueBookCover,
} from './components/HmosVectors';
import { ThreeMonolithScene } from './components/ThreeMonolithScene';
import { MenuDrawer } from './components/MenuDrawer';
import {
  RiveMetaballButton,
  LiveCardMotionCanvas,
  AnimatedFooterCadTop,
  AnimatedFooterCadSideMonolith,
} from './components/RiveInteractiveVectors';
import {
  Search,
  X,
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP ScrollTrigger Downward Curtain Wipe Image Frame
 * MAX 120FPS EDITION:
 * Direct 1:1 Lenis-synced scrub: true + GPU scaleY transform + paint containment
 */
const CurtainRevealImage: React.FC<{
  src: string;
  alt: string;
  curtainColor: string;
  aspectClass?: string;
  revealStart?: string;
  revealEnd?: string;
  initialCoverRatio?: number;
  children?: React.ReactNode;
}> = ({
  src,
  alt,
  curtainColor,
  aspectClass = 'aspect-[16/10]',
  revealStart = 'top 74%',
  revealEnd = 'top 22%',
  initialCoverRatio = 0.91,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const curtain = curtainRef.current;
    const img = imgRef.current;
    if (!container || !curtain) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: revealStart,
          end: revealEnd,
          scrub: true,
        },
      });

      tl.fromTo(
        curtain,
        { scaleY: initialCoverRatio, transformOrigin: 'bottom center', force3D: true },
        { scaleY: 0, transformOrigin: 'bottom center', ease: 'power2.inOut', force3D: true },
        0
      );

      if (img) {
        tl.fromTo(
          img,
          { scale: 1.09, force3D: true },
          { scale: 1.0, ease: 'none', force3D: true },
          0
        );
      }
    }, container);

    return () => ctx.revert();
  }, [revealStart, revealEnd, initialCoverRatio]);

  return (
    <div
      ref={containerRef}
      className={`contain-paint relative w-full ${aspectClass} rounded-[2px] overflow-hidden bg-[#181B22]`}
    >
      {!imgErr ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImgErr(true)}
          className="gpu-layer w-full h-full object-cover will-change-transform"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#172554] to-[#090D16]" />
      )}

      {children}

      {/* Solid High-Contrast Curtain Block (Matches 00:14 & 00:16 in video with top photo strip peeking) */}
      <div
        ref={curtainRef}
        style={{ backgroundColor: curtainColor }}
        className="gpu-layer absolute inset-0 z-20 pointer-events-none will-change-transform origin-bottom"
      />
    </div>
  );
};

export default function App() {
  const [locale, setLocale] = useState<'EN' | 'DE' | 'FR' | 'IN'>('EN');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Palette Mode:
  // 'editorial' = 1:1 Video Surface Contrast (#ECEAE2 Stone Cream + #042F22 Deep Forest + #DAF462 Lime Curtain & CAD Footer)
  // 'dark-slate' = Locked HMOS Cool Dark Slate (#090D16 + #0B162C Oxford Navy + #38BDF8 Glacial Sapphire Curtain & Footer)
  const [paletteMode, setPaletteMode] = useState<'editorial' | 'dark-slate'>('editorial');

  // Header text contrast state — toggled ONLY at section boundaries by GSAP ScrollTrigger (0 scroll listeners!)
  const [headerOnDark, setHeaderOnDark] = useState(false);

  // Optional collapse toggle for any card (all 5 cards are LIVE & EXPANDED by default)
  const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>({});
  const toggleCardCollapse = (id: string) => {
    setCollapsedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Active pillar in the 00:12 Three.js (WebGL) 3D Monolith Stage
  const [activeStageIndex, setActiveStageIndex] = useState(2);

  // Direct DOM Refs for 0ms GPU-composited scroll animations
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroBoxRef = useRef<HTMLDivElement | null>(null);
  const heroWordsRef = useRef<HTMLHeadingElement | null>(null);
  const showcasesRef = useRef<HTMLElement | null>(null);
  const darkStoryRef = useRef<HTMLElement | null>(null);
  const manifestoRef = useRef<HTMLParagraphElement | null>(null);
  const collectionsSectionRef = useRef<HTMLElement | null>(null);

  // Modals, Wishlist & Drawers
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDossier, setSelectedDossier] = useState<ChapterItem | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<InsightArticle | null>(null);
  const [selectedCollectionModal, setSelectedCollectionModal] = useState<CollectionItem | null>(null);

  // Saved Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(['vision', 'ecosystem']);
  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Newsletter state
  const [email, setEmail] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [newsletterFeedback, setNewsletterFeedback] = useState('');

  // Image error fallback tracking
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const handleImgError = (key: string) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  const lenisRef = useRef<Lenis | null>(null);

  // 1. Initialize Lenis Smooth Inertia Scrolling & sync 1:1 with GSAP Ticker (MAX 180+FPS / 0ms latency)
  useEffect(() => {
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    const lenis = new Lenis({
      lerp: 0.14,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.05,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Freeze the page (and any Lenis inertia still running) while the menu drawer is open,
  // so the wheel never scrolls the site behind it. The drawer itself scrolls natively.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (menuDrawerOpen) lenis.stop();
    else lenis.start();
  }, [menuDrawerOpen]);

  // Menu links: close the drawer, then glide to the section with the same Lenis engine.
  const handleMenuNavigate = (hash: string) => {
    setMenuDrawerOpen(false);
    const lenis = lenisRef.current;
    lenis?.start();
    const target = document.querySelector<HTMLElement>(hash);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    } else {
      target.scrollIntoView();
    }
  };

  // 2. Auto-cycle the 00:12 Three.js 3D Monolith Stage badge every 3.8s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % COLLECTIONS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // 3. Master MAX 120FPS GPU GSAP ScrollTrigger Engine (Zero window scroll listeners, zero getBoundingClientRect loops!)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // A. Zero-cost Header Contrast Detection via GSAP ScrollTrigger boundary toggles
      let darkCount = 0;
      const updateDarkHeader = (active: boolean) => {
        darkCount = Math.max(0, darkCount + (active ? 1 : -1));
        setHeaderOnDark(darkCount > 0);
      };

      if (showcasesRef.current) {
        ScrollTrigger.create({
          trigger: showcasesRef.current,
          start: 'top 44px',
          end: 'bottom 44px',
          onToggle: (self) => updateDarkHeader(self.isActive),
        });
      }

      if (darkStoryRef.current) {
        ScrollTrigger.create({
          trigger: darkStoryRef.current,
          start: 'top 44px',
          end: 'bottom 44px',
          onToggle: (self) => updateDarkHeader(self.isActive),
        });
      }

      // B. Hero initial kinetic word entrance
      if (heroWordsRef.current) {
        const spans = heroWordsRef.current.querySelectorAll('.hero-word-span');
        gsap.fromTo(
          spans,
          { y: 26, opacity: 0, force3D: true },
          {
            y: 0,
            opacity: 1,
            force3D: true,
            duration: 0.7,
            stagger: 0.045,
            ease: 'power3.out',
          }
        );
      }

      // C. Hero Sticky Curtain Fade & Depth Scale (Direct 1:1 GPU scrub: true)
      if (heroBoxRef.current && heroSectionRef.current) {
        gsap.fromTo(
          heroBoxRef.current,
          { y: 0, scale: 1, opacity: 1, force3D: true },
          {
            y: -44,
            scale: 0.95,
            opacity: 0.12,
            force3D: true,
            ease: 'none',
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // D. Deep GPU Parallax & Scale on 01-05 Full-Bleed Card Backgrounds (Direct 1:1 scrub: true)
      const parallaxImages = document.querySelectorAll('.gsap-parallax-bg');
      parallaxImages.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -7, scale: 1.09, force3D: true },
          {
            yPercent: 7,
            scale: 1.0,
            force3D: true,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      // E. 0ms GPU scaleX Progress Bars on ALL 5 Cards (01 - 05)
      const progressLines = document.querySelectorAll('.gsap-progress-line');
      progressLines.forEach((line) => {
        const card = line.closest('article');
        gsap.fromTo(
          line,
          { scaleX: 0.16, transformOrigin: 'left center', force3D: true },
          {
            scaleX: 1,
            transformOrigin: 'left center',
            force3D: true,
            ease: 'none',
            scrollTrigger: {
              trigger: card || line,
              start: 'top 85%',
              end: 'bottom 35%',
              scrub: true,
            },
          }
        );
      });

      // F. Live Scroll-Triggered Headline Reveal inside each 01-05 Showcase Card
      const cardHeadlines = document.querySelectorAll('.gsap-card-headline');
      cardHeadlines.forEach((hl) => {
        gsap.fromTo(
          hl,
          { y: 24, opacity: 0.2, force3D: true },
          {
            y: 0,
            opacity: 1,
            force3D: true,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: hl,
              start: 'top 92%',
              end: 'top 62%',
              scrub: true,
            },
          }
        );
      });

      // G. Live Scroll-Triggered #F5F4EE 3D Hardcover Catalogue Card Reveal on ALL 5 Cards (01-05)
      const catalogueCards = document.querySelectorAll('.gsap-catalogue-card');
      catalogueCards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 32, opacity: 0.18, scale: 0.96, force3D: true },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            force3D: true,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              end: 'top 68%',
              scrub: true,
            },
          }
        );
      });

      // H. Continuous Word-by-Word Scroll Illumination on Manifesto Paragraph (00:10) — Pure GPU Opacity!
      if (manifestoRef.current) {
        const wordSpans = manifestoRef.current.querySelectorAll('.manifesto-word-span');
        gsap.fromTo(
          wordSpans,
          { opacity: 0.24 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top 82%',
              end: 'bottom 45%',
              scrub: true,
            },
          }
        );
      }

      // I. Editorial News Cards (00:10 - 00:11) Staggered Scroll Entrance
      const newsCards = document.querySelectorAll('.gsap-news-card');
      newsCards.forEach((nc, i) => {
        gsap.fromTo(
          nc,
          { y: 28, opacity: 0.25, force3D: true },
          {
            y: 0,
            opacity: 1,
            force3D: true,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: nc,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // J. Section 6 ("The Collections", 00:13) Alternating Horizontal Kinetic Rows (Direct 1:1 scrub: true)
      if (collectionsSectionRef.current) {
        const rows = collectionsSectionRef.current.querySelectorAll('.collection-kinetic-row');
        rows.forEach((row, idx) => {
          const dir = idx % 2 === 0 ? -24 : 24;
          gsap.fromTo(
            row,
            { x: -dir, force3D: true },
            {
              x: dir,
              force3D: true,
              ease: 'none',
              scrollTrigger: {
                trigger: collectionsSectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setNewsletterStatus('error');
      setNewsletterFeedback('Please enter a valid institutional or personal email address.');
      return;
    }
    if (!privacyAgreed) {
      setNewsletterStatus('error');
      setNewsletterFeedback('Please agree to the Privacy Policy before submitting.');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterFeedback(
      'Welcome to the HMOS® sovereign community. You are registered for architectural dispatches.'
    );
    setEmail('');
  };

  const t = LOCALE_STRINGS[locale];
  const words = MANIFESTO_TEXT.split(' ');
  const activeStageCollection = COLLECTIONS[activeStageIndex % COLLECTIONS.length];

  const isEditorial = paletteMode === 'editorial';
  const canvasBg = isEditorial ? 'bg-[#ECEAE2]' : 'bg-[#090D16]';
  const canvasText = isEditorial ? 'text-[#141413]' : 'text-[#F8FAFC]';
  const canvasMuted = isEditorial ? 'text-[#787772]' : 'text-[#94A3B8]';
  const borderHairline = isEditorial ? 'border-[#141413]/15' : 'border-[#F8FAFC]/15';
  const stageBg = isEditorial ? 'bg-[#DFDDD4]' : 'bg-[#111827]';
  const storyBg = isEditorial ? 'bg-[#042F22]' : 'bg-[#0B162C]';
  const curtainAndFooterHex = isEditorial ? '#DAF462' : '#38BDF8';

  const chap01 = CHAPTERS[0];
  const chap02 = CHAPTERS[1];
  const chap03 = CHAPTERS[2];
  const chap04 = CHAPTERS[3];

  const headerTextColor =
    headerOnDark || !isEditorial ? 'text-[#FAF9F5]' : 'text-[#141413]';

  const filteredChapters = CHAPTERS.filter(
    (c) =>
      c.badgeLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const heroWords = t.heroHeadline.split(' ');
  const cardMotionAccents = ['#EB5638', '#3B82F6', '#60A5FA', '#10B981', '#CBD5E1'];

  return (
    <div
      className={`min-h-screen ${canvasBg} ${canvasText} relative transition-colors duration-300 selection:bg-[#141413] selection:text-[#DAF462]`}
    >
      {/* =====================================================================
          FIXED TOP HEADER (100% Exact 2-Cluster UI/UX Header)
          Left: HMOS® Wordmark with Baseline ® | Right: EN v + Flat #F7F6F0 [ ≡ Q ] Pill
         ===================================================================== */}
      <header className="gpu-layer fixed top-0 left-0 right-0 z-40 px-4 sm:px-7 py-3.5 flex items-center justify-between pointer-events-none">
        <a
          href="#top"
          className={`pointer-events-auto inline-flex items-baseline text-[29px] sm:text-[33px] font-mechanik font-medium tracking-[-0.04em] whitespace-nowrap shrink-0 leading-none transition-colors duration-200 ${headerTextColor}`}
        >
          <span>HMOS</span>
          <span className="text-[14px] sm:text-[15px] font-normal ml-[1px]">®</span>
        </a>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0 pointer-events-auto">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              className={`flex items-center gap-1 text-[13px] sm:text-[14px] font-mechanik font-medium px-1.5 py-1 rounded whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-200 ${headerTextColor}`}
              aria-label="Select Language"
            >
              <span>{locale}</span>
              <ChevronDown className="w-3.5 h-3.5 stroke-[1.8]" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-24 rounded-xl bg-[#141413] text-[#FAF9F5] border border-[#FAF9F5]/15 shadow-2xl py-1.5 z-50">
                {(['EN', 'DE', 'FR', 'IN'] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setLocale(code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium flex items-center justify-between transition-colors ${
                      locale === code
                        ? 'text-[#DAF462] bg-[#FAF9F5]/10'
                        : 'text-[#FAF9F5]/80 hover:bg-[#FAF9F5]/5'
                    }`}
                  >
                    <span>{code}</span>
                    {locale === code && <Check className="w-3 h-3 text-[#DAF462]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuDrawerOpen(true)}
            className="bg-[#F7F6F0] text-[#141413] hover:opacity-90 active:scale-95 transition-all duration-150 rounded-full h-[42px] px-4 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Open Navigation and Search Drawer"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <line x1="3" y1="7" x2="16" y2="7" />
              <line x1="3" y1="12" x2="11" y2="12" />
              <line x1="3" y1="17" x2="16" y2="17" />
            </svg>
            <Search className="w-[15px] h-[15px] stroke-[1.7]" />
          </button>
        </div>
      </header>

      {/* =====================================================================
          SINGLE FLOATING BOTTOM-LEFT "CO" CIRCLE (100% Exact Video UI/UX Match)
         ===================================================================== */}
      <button
        type="button"
        onClick={() =>
          setPaletteMode((prev) => (prev === 'editorial' ? 'dark-slate' : 'editorial'))
        }
        title="Toggle Surface Palette (Editorial Contrast vs HMOS Dark Slate)"
        style={{ backgroundColor: curtainAndFooterHex }}
        className="gpu-layer fixed bottom-3.5 left-3.5 z-40 w-[46px] h-[46px] rounded-full text-[#141413] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
      >
        <svg
          width="20"
          height="12"
          viewBox="0 0 28 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="8" cy="7" r="4.5" />
          <circle cx="20" cy="7" r="4.5" />
          <line x1="11.5" y1="7" x2="16.5" y2="7" />
        </svg>
      </button>

      {/* =====================================================================
          SECTION 1: STICKY HERO CANVAS (00:00 - 00:02 in Video)
          Pinned sticky top-0 so Section 2 (01 Vision) physically slides up
          over it like a full-bleed curtain on scroll!
         ===================================================================== */}
      <main id="top">
        <section
          ref={heroSectionRef}
          className={`sticky top-0 z-0 min-h-[92vh] ${canvasBg} ${canvasText} flex flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden`}
        >
          <div
            ref={heroBoxRef}
            className="gpu-layer max-w-xl mx-auto text-center will-change-transform"
          >
            <h1
              ref={heroWordsRef}
              className="font-mechanik font-medium text-[35px] sm:text-[54px] md:text-[64px] leading-[1.06] tracking-[-0.035em] balance-text"
            >
              {heroWords.map((w, i) => (
                <React.Fragment key={i}>
                  <span className="hero-word-span inline-block will-change-transform">
                    {w}
                  </span>{' '}
                </React.Fragment>
              ))}
            </h1>
          </div>
        </section>

        {/* =====================================================================
            SECTION 2: 01 - 05 FULL-BLEED LIVE MOVING & STICKY ACCORDION SHOWCASES
            (MAX 120FPS / 0ms GPU-Composited Scroll & Live Card Engine — 00:03 to 00:09)
           ===================================================================== */}
        <section
          id="showcases"
          ref={showcasesRef}
          className="relative z-10 w-full bg-[#141413] text-[#FAF9F5] shadow-[0_-24px_60px_rgba(0,0,0,0.28)]"
        >
          {CHAPTERS.map((chap, idx) => {
            const isCollapsed = !!collapsedCards[chap.id];
            const motionAccent = cardMotionAccents[idx % cardMotionAccents.length];

            return (
              <article
                key={chap.id}
                className={`contain-paint relative w-full ${
                  isCollapsed ? 'min-h-[58vh]' : 'min-h-[98vh]'
                } flex flex-col justify-between overflow-hidden border-b border-[#FAF9F5]/10`}
              >
                {/* Full-Bleed Live Moving CGI/Architectural Background */}
                <div className="absolute inset-0 overflow-hidden">
                  {!imgErrors[chap.id] ? (
                    <img
                      src={chap.image}
                      alt={chap.headline}
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => handleImgError(chap.id)}
                      className="gpu-layer gsap-parallax-bg w-full h-full object-cover will-change-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#090D16] to-[#1D4ED8]" />
                  )}

                  {/* Viewport-Gated 0ms Volumetric Sunbeams & Atmospheric Motes */}
                  <LiveCardMotionCanvas accentHex={motionAccent} intensity={1.0} />

                  {/* Cinematic Editorial Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#090D16]/45 via-[#090D16]/25 to-[#090D16]/80 pointer-events-none" />
                </div>

                {/* TOP ZONE: Number (01..05) + Category Pill + 1px GPU scaleX Progress Bar + Ghosted Watermark Title */}
                <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-8 pt-8 sm:pt-10">
                  <div className="flex items-center justify-between gap-4 mb-3.5">
                    <div className="flex items-center gap-3.5">
                      <span className="font-mechanik text-[14px] text-[#FAF9F5]">
                        {chap.number}
                      </span>

                      {chap.id === 'details' && (
                        <span className="w-7 h-7 rounded-full bg-[#FAF9F5]/20 text-[#FAF9F5] inline-flex items-center justify-center">
                          <CategoryIcon type="details" className="w-3.5 h-3.5" />
                        </span>
                      )}

                      <span
                        style={{
                          backgroundColor: isEditorial
                            ? chap.floemaBadgeColor
                            : chap.badgeColor,
                          color: isEditorial ? chap.floemaBadgeText : chap.badgeTextColor,
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[13px] font-mechanik font-medium shadow-sm"
                      >
                        <CategoryIcon type={chap.iconType} className="w-3.5 h-3.5" />
                        <span>{chap.badgeLabel}</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCardCollapse(chap.id)}
                      className="text-[11px] font-mechanik uppercase tracking-wider text-[#FAF9F5]/65 hover:text-[#FAF9F5] px-2.5 py-1 rounded-full border border-[#FAF9F5]/20 bg-[#090D16]/40 cursor-pointer transition-colors"
                    >
                      {isCollapsed ? '+ Expand' : '— Collapse'}
                    </button>
                  </div>

                  {/* Full-Width 1px Horizontal Scroll-Scrubbed Progress Bar (Pure GPU scaleX, 0ms reflow!) */}
                  <div className="w-full h-[1px] bg-[#FAF9F5]/30 relative overflow-hidden mb-3">
                    <div className="gpu-layer gsap-progress-line w-full h-full bg-[#FAF9F5] origin-left will-change-transform" />
                  </div>

                  {/* Ghosted Section Title below the progress line (1:1 with 00:05 "Sovereignty" watermark) */}
                  <div className="flex items-center justify-between">
                    <span className="font-mechanik font-medium text-[28px] sm:text-[38px] tracking-[-0.03em] text-[#FAF9F5]/40 select-none">
                      {chap.badgeLabel}
                    </span>
                  </div>
                </div>

                {/* BOTTOM ZONE: Live Scroll-Animated Headline + Rive Metaball Button + #F5F4EE 3D Hardcover Catalogue Card */}
                {!isCollapsed && (
                  <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-8 sm:pb-12">
                    <h2 className="gpu-layer gsap-card-headline font-mechanik font-medium text-[33px] sm:text-[46px] md:text-[52px] leading-[1.06] tracking-[-0.03em] text-[#FAF9F5] max-w-xl mb-7 balance-text will-change-transform">
                      {chap.headline}
                    </h2>

                    <div className="mb-8">
                      <RiveMetaballButton
                        label={chap.ctaLabel}
                        onClick={() => setSelectedDossier(chap)}
                      />
                    </div>

                    {/* Off-White #F5F4EE 3D Hardcover Book Catalogue Card (1:1 with 00:04, 00:07, 00:09) */}
                    <div
                      onClick={() => setSelectedDossier(chap)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedDossier(chap);
                        }
                      }}
                      className="gpu-layer gsap-catalogue-card group w-full max-w-[360px] bg-[#F5F4EE] text-[#141413] rounded-[14px] p-4 flex items-center justify-between gap-4 shadow-[0_16px_42px_rgba(0,0,0,0.38)] hover:translate-y-[-3px] transition-transform duration-300 cursor-pointer will-change-transform"
                    >
                      <div className="flex flex-col justify-between h-[108px] sm:h-[116px] py-0.5">
                        <div>
                          <span className="block text-[10px] font-mono uppercase tracking-widest text-[#787772] mb-0.5">
                            {chap.number} · {chap.dossierCode}
                          </span>
                          <h3 className="font-mechanik font-medium text-[19px] sm:text-[20px] tracking-[-0.02em] text-[#141413]">
                            {chap.dossierTitle}
                          </h3>
                        </div>
                        <span className="inline-flex items-center gap-2 text-[14px] font-mechanik font-medium text-[#141413] group-hover:translate-x-1 transition-transform">
                          <span>View Dossier</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                      <CatalogueBookCover type={chap.iconType} />
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {/* =====================================================================
            SECTION 3 & 4: CONTINUOUS SCROLL-ILLUMINATED MANIFESTO & RECENT NEWS
            (00:10 - 00:11 UI/UX — Pure GPU Opacity Scrubbing, Zero React State Lag!)
           ===================================================================== */}
        <section
          id="journal"
          className={`contain-paint relative z-10 ${canvasBg} ${canvasText} py-16 sm:py-24 px-4 sm:px-8`}
        >
          <div className="max-w-5xl mx-auto">
            <p
              ref={manifestoRef}
              className="font-mechanik font-medium text-[30px] sm:text-[42px] md:text-[48px] leading-[1.13] tracking-[-0.03em] mb-12 sm:mb-16"
            >
              {words.map((word, idx) => (
                <React.Fragment key={idx}>
                  <span className="manifesto-word-span inline-block opacity-25 will-change-[opacity]">
                    {word}
                  </span>{' '}
                </React.Fragment>
              ))}
            </p>

            <div className="mb-6">
              <a
                href="#news-feed"
                className="inline-flex items-center gap-1 text-[12px] font-mechanik font-medium hover:opacity-70 transition-opacity"
              >
                <span>{t.recentNewsLabel}</span>
              </a>
            </div>

            <div id="news-feed" className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {INSIGHTS.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setSelectedInsight(article)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedInsight(article);
                    }
                  }}
                  className={`gpu-layer gsap-news-card group cursor-pointer border-b ${borderHairline} pb-3 flex flex-col justify-between will-change-transform`}
                >
                  <div>
                    <div className="aspect-[1/1] sm:aspect-[4/3] w-full overflow-hidden rounded-[2px] mb-3.5 bg-[#181B22]">
                      {!imgErrors[article.id] ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          onError={() => handleImgError(article.id)}
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#172554] to-[#090D16]" />
                      )}
                    </div>

                    <h3 className="font-mechanik font-medium text-[19px] sm:text-[22px] leading-[1.22] tracking-[-0.02em] mb-6 group-hover:opacity-75 transition-opacity">
                      {article.title}
                    </h3>
                  </div>

                  <div className={`flex items-center justify-between text-[13px] ${canvasMuted}`}>
                    <span>{article.date}</span>
                    <ArrowRight className="w-4 h-4 text-[#141413] dark:text-[#FAF9F5] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 5: THREE.JS (WEBGL) 3D MONOLITH TURNTABLE STAGE (00:12 in Video)
           ===================================================================== */}
        <section
          className={`contain-paint relative z-10 w-full ${stageBg} pt-4 pb-12 sm:py-14 px-4 sm:px-8 overflow-hidden`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <button
                type="button"
                onClick={() => setActiveStageIndex((prev) => (prev + 1) % COLLECTIONS.length)}
                style={{
                  backgroundColor: activeStageCollection.badgeBg,
                  color: activeStageCollection.badgeText,
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[13px] font-mechanik font-medium cursor-pointer whitespace-nowrap shrink-0 transition-colors shadow-sm"
              >
                <CategoryIcon type={activeStageCollection.iconType} className="w-3.5 h-3.5" />
                <span>{activeStageCollection.name}</span>
              </button>

              <div className="flex items-center gap-1.5">
                {COLLECTIONS.map((col, idx) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setActiveStageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      idx === activeStageIndex % COLLECTIONS.length
                        ? 'w-6 bg-[#141413]'
                        : 'bg-[#141413]/25 hover:bg-[#141413]/50'
                    }`}
                    aria-label={`Select ${col.name} 3D Monolith`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <ThreeMonolithScene
                activePillarIndex={activeStageIndex}
                plaqueNumber={activeStageCollection.plaqueNumber}
                pillarName={activeStageCollection.name}
                accentColor={activeStageCollection.badgeBg}
                onSelectPillar={() => setSelectedCollectionModal(activeStageCollection)}
              />

              <button
                type="button"
                onClick={() => setSelectedCollectionModal(activeStageCollection)}
                className="mt-1 bg-[#1C1C1A] text-[#F5F4EE] hover:bg-[#2563EB] active:scale-95 transition-all rounded-[8px] px-6 py-3 text-[12px] font-mechanik font-medium tracking-[0.04em] inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 shadow-md"
              >
                <span>{t.exploreBtn}</span>
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 6: "THE COLLECTIONS" INLINE TYPOGRAPHIC SHOWCASE (00:12 - 00:13)
           ===================================================================== */}
        <section
          id="collections"
          ref={collectionsSectionRef}
          className={`contain-paint relative z-10 ${canvasBg} ${canvasText} py-16 sm:py-24 px-2 sm:px-6 overflow-hidden`}
        >
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[12px] font-mechanik font-medium mb-12 sm:mb-16">
              {t.theCollectionsLabel}
            </p>

            <div className="group/list flex flex-col items-center gap-4 sm:gap-6">
              {/* Row 1: [Icon] Vision + Tall Monolith Studio Thumbnail + Kernel (35) */}
              <div className="gpu-layer collection-kinetic-row flex items-center justify-center gap-2.5 sm:gap-4 whitespace-nowrap will-change-transform group-hover/list:opacity-45 hover:!opacity-100 transition-opacity duration-200">
                <button
                  type="button"
                  onClick={() => setSelectedCollectionModal(COLLECTIONS[0])}
                  className="inline-flex items-center gap-2 font-mechanik font-medium text-[36px] sm:text-[54px] md:text-[64px] leading-none tracking-[-0.035em] cursor-pointer"
                >
                  <CategoryIcon type="vision" className="w-7 h-7 sm:w-9 sm:h-9" />
                  <span>Vision</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCollectionModal(COLLECTIONS[0])}
                  className="w-[68px] h-[94px] sm:w-[86px] sm:h-[116px] rounded-[2px] overflow-hidden shadow-md shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300"
                  aria-label="Inspect Vision Monolith Collection"
                >
                  <CollectionStudioThumb type="monolith-post" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCollectionModal(COLLECTIONS[0])}
                  className="font-mechanik font-medium text-[36px] sm:text-[54px] md:text-[64px] leading-none tracking-[-0.035em] cursor-pointer"
                >
                  Kernel (35)
                </button>
              </div>

              {/* Row 2: [Recycle Icon] Sovereignty (08) + Slatted Vault Studio Thumbnail */}
              <div className="gpu-layer collection-kinetic-row flex items-center justify-center gap-2.5 sm:gap-4 whitespace-nowrap will-change-transform group-hover/list:opacity-45 hover:!opacity-100 transition-opacity duration-200">
                <button
                  type="button"
                  onClick={() => setSelectedCollectionModal(COLLECTIONS[1])}
                  className="inline-flex items-center gap-2 font-mechanik font-medium text-[36px] sm:text-[54px] md:text-[64px] leading-none tracking-[-0.035em] cursor-pointer"
                >
                  <CategoryIcon type="sovereignty" className="w-7 h-7 sm:w-9 sm:h-9" />
                  <span>Sovereignty (08)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCollectionModal(COLLECTIONS[1])}
                  className="w-[84px] h-[90px] sm:w-[106px] sm:h-[114px] rounded-[2px] overflow-hidden shadow-md shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300"
                  aria-label="Inspect Sovereignty Collection"
                >
                  <CollectionStudioThumb type="slatted-planter" />
                </button>
              </div>

              {/* Row 3: Clock Totem Studio Thumbnail + [Flag Icon] Ecosystem (41) */}
              <div className="gpu-layer collection-kinetic-row flex items-center justify-center gap-2.5 sm:gap-4 whitespace-nowrap will-change-transform group-hover/list:opacity-45 hover:!opacity-100 transition-opacity duration-200">
                <button
                  type="button"
                  onClick={() => setSelectedCollectionModal(COLLECTIONS[2])}
                  className="w-[70px] h-[94px] sm:w-[90px] sm:h-[118px] rounded-[2px] overflow-hidden shadow-md shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300"
                  aria-label="Inspect Clock Totem Collection"
                >
                  <CollectionStudioThumb type="clock-totem" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCollectionModal(COLLECTIONS[2])}
                  className="inline-flex items-center gap-2 font-mechanik font-medium text-[36px] sm:text-[54px] md:text-[64px] leading-none tracking-[-0.035em] cursor-pointer"
                >
                  <CategoryIcon type="ecosystem" className="w-7 h-7 sm:w-9 sm:h-9" />
                  <span>Ecosystem (41)</span>
                </button>
              </div>

              {/* Row 4: [Details Icon] Details + Bespoke Engraved Plaque Studio Thumbnail + (00) */}
              <div className="gpu-layer collection-kinetic-row flex items-center justify-center gap-2.5 sm:gap-4 whitespace-nowrap will-change-transform group-hover/list:opacity-45 hover:!opacity-100 transition-opacity duration-200">
                <button
                  type="button"
                  onClick={() => setSelectedCollectionModal(COLLECTIONS[3])}
                  className="inline-flex items-center gap-2 font-mechanik font-medium text-[36px] sm:text-[54px] md:text-[64px] leading-none tracking-[-0.035em] cursor-pointer"
                >
                  <CategoryIcon type="details" className="w-7 h-7 sm:w-9 sm:h-9" />
                  <span>Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCollectionModal(COLLECTIONS[3])}
                  className="w-[82px] h-[96px] sm:w-[104px] sm:h-[120px] rounded-[2px] overflow-hidden shadow-md shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300"
                  aria-label="Inspect Details Plaque Collection"
                >
                  <CollectionStudioThumb type="custom-plaque" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCollectionModal(COLLECTIONS[3])}
                  className="font-mechanik font-medium text-[36px] sm:text-[54px] md:text-[64px] leading-none tracking-[-0.035em] cursor-pointer"
                >
                  (00)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 7: DARK CONTRAST BRAND STORY & DOWNWARD CURTAIN-WIPE PHOTO (00:14 - 00:15)
           ===================================================================== */}
        <section
          id="about"
          ref={darkStoryRef}
          className={`contain-paint relative z-10 ${storyBg} text-[#FAF9F5] py-16 sm:py-24 px-4 sm:px-8`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="max-w-xl space-y-5 text-[18px] sm:text-[21px] leading-[1.34] mb-14 sm:mb-20 font-mechanik font-medium">
              <p className="text-[#FAF9F5]">
                HMOS® (Hybrid Master Operating System) builds sovereign deep-tech
                infrastructure around a deterministic execution kernel, so mission-critical
                systems behave the same way every time.
              </p>
              <p className="text-[#8FA89E]">
                Founded and architected by Mahammadali Palsaniya in India, HMOS® pairs
                cryptographic verification with zero-trust design for institutions that need
                their systems to last.
              </p>
            </div>

            <blockquote className="font-mechanik font-medium text-[33px] sm:text-[46px] md:text-[54px] leading-[1.06] tracking-[-0.03em] text-[#FAF9F5] mb-10 sm:mb-14 balance-text">
              “Sovereign systems should be mathematically certain, architecturally pure, and
              built to last”
            </blockquote>

            <CurtainRevealImage
              src={IMAGES.vision}
              alt="HMOS® architectural concept study"
              curtainColor={curtainAndFooterHex}
              aspectClass="aspect-[1/1] sm:aspect-[16/10]"
              revealStart="top 74%"
              revealEnd="top 24%"
              initialCoverRatio={0.91}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/65 via-transparent to-transparent pointer-events-none" />
              <figcaption className="absolute bottom-3.5 left-3.5 sm:bottom-5 sm:left-5 text-[13px] sm:text-[14px] font-mechanik font-medium text-[#FAF9F5] leading-snug z-10">
                HMOS® architectural
                <br />
                concept study
              </figcaption>
            </CurtainRevealImage>
          </div>
        </section>

        {/* =====================================================================
            SECTION 8: 3-STEP CRAFT SEQUENCE ("We design", "We build", "We implement") (00:16 - 00:17)
           ===================================================================== */}
        <section
          className={`contain-paint relative z-10 ${canvasBg} ${canvasText} py-16 sm:py-24 px-4 sm:px-8`}
        >
          <div className="max-w-5xl mx-auto space-y-10 sm:space-y-14">
            {CRAFT_STEPS.map((item, idx) => (
              <div key={item.step} className={`border-b ${borderHairline} pb-4 sm:pb-6`}>
                <div className="mb-3.5">
                  <CurtainRevealImage
                    src={item.image}
                    alt={item.step}
                    curtainColor={curtainAndFooterHex}
                    aspectClass="aspect-[16/10]"
                    revealStart={idx === 0 ? 'top 88%' : 'top 74%'}
                    revealEnd={idx === 0 ? 'top 40%' : 'top 22%'}
                    initialCoverRatio={0.91}
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-start pt-1">
                  <h3 className="col-span-5 sm:col-span-4 font-mechanik font-medium text-[17px] sm:text-[20px] tracking-[-0.02em] leading-tight">
                    {item.step}
                  </h3>
                  <p
                    className={`col-span-7 sm:col-span-8 font-mechanik font-medium text-[17px] sm:text-[20px] leading-[1.28] ${canvasMuted}`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
            SECTION 9: ENDURANCE CALLOUT & CLEAN PILL NEWSLETTER FORM (00:18)
           ===================================================================== */}
        <section
          className={`contain-paint relative z-10 ${canvasBg} ${canvasText} pt-2 pb-16 sm:pb-24 px-4 sm:px-8`}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="font-mechanik font-medium text-[35px] sm:text-[52px] leading-[1.06] tracking-[-0.035em] mb-5 whitespace-pre-line">
              {t.enduranceHeadline}
            </h2>

            <p className="font-mechanik font-medium text-[19px] sm:text-[23px] leading-[1.3] mb-7 whitespace-pre-line">
              {t.communitySub}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-xl" noValidate>
              <div className="relative mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
                  }}
                  placeholder="Your email *"
                  aria-label="Your email address"
                  className={`w-full h-[58px] rounded-full border ${
                    isEditorial ? 'border-[#141413]/50' : 'border-[#F8FAFC]/40'
                  } bg-transparent px-6 text-[16px] placeholder:text-[#787772] focus:outline-none transition-colors`}
                />
                {email.trim().length > 0 && (
                  <button
                    type="submit"
                    className="absolute right-2.5 top-2.5 bottom-2.5 px-4 rounded-full bg-[#141413] text-[#FAF9F5] text-xs font-mechanik font-medium tracking-wider uppercase cursor-pointer"
                  >
                    →
                  </button>
                )}
              </div>

              <div
                onClick={() => {
                  setPrivacyAgreed((prev) => !prev);
                  if (newsletterStatus === 'error') setNewsletterStatus('idle');
                }}
                role="checkbox"
                aria-checked={privacyAgreed}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setPrivacyAgreed((prev) => !prev);
                  }
                }}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <span
                  className={`w-[22px] h-[22px] rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    privacyAgreed
                      ? 'border-[#141413] bg-[#141413] text-[#FAF9F5]'
                      : isEditorial
                      ? 'border-[#141413]/55 bg-transparent'
                      : 'border-[#F8FAFC]/50 bg-transparent'
                  }`}
                >
                  {privacyAgreed && <Check className="w-3 h-3 stroke-[2.5]" />}
                </span>
                <span className={`text-[13px] ${canvasMuted} leading-snug`}>
                  By submitting your email you agree to our{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDossier(chap02);
                    }}
                    className={`underline ${canvasText} cursor-pointer`}
                  >
                    Privacy Policy
                  </button>
                  .
                </span>
              </div>

              {newsletterStatus !== 'idle' && (
                <div
                  className={`mt-4 text-xs font-medium px-4 py-2.5 rounded-xl border ${
                    newsletterStatus === 'success'
                      ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
                      : 'bg-red-500/15 border-red-500/40 text-red-500'
                  }`}
                >
                  {newsletterFeedback}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* =====================================================================
          SECTION 10: HIGH-CONTRAST ARCHITECTURAL CAD WIREFRAME FOOTER (00:18 - 00:21)
         ===================================================================== */}
      <footer
        id="footer"
        style={{ backgroundColor: curtainAndFooterHex }}
        className="contain-paint relative z-10 text-[#141413] pt-8 pb-10 px-4 sm:px-8 overflow-hidden transition-colors duration-300"
      >
        <div className="max-w-5xl mx-auto mb-5">
          <AnimatedFooterCadTop className="w-full max-w-[340px] h-auto text-[#141413]" />
        </div>

        <div className="pointer-events-none absolute right-0 top-40 bottom-14 w-[135px] sm:w-[185px]">
          <AnimatedFooterCadSideMonolith className="w-full h-full text-[#141413]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto pr-24 sm:pr-44">
          <div className="space-y-5 mb-8 text-[15px] leading-[1.38] font-mechanik">
            <div>
              <h4 className="font-normal text-[#687528] mb-0.5">Headquarters</h4>
              <p className="text-[#687528]">
                HMOS® Sovereign Systems Studio
                <br />
                DeepTech &amp; Sovereign AI
                <br />
                Infrastructure Division,
                <br />
                India
              </p>
              <p className="text-[#141413] mt-0.5">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline inline-flex items-center gap-1"
                >
                  <span>Mahammadali Palsaniya · LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <br />
                <span>Founder &amp; Principal Systems Architect</span>
              </p>
              <p className="text-[#687528] text-[14px]">
                35/35 steps verified · Zero-trust lock
              </p>
            </div>

            <div>
              <p className="text-[#687528]">Research · Stage 05 &amp; Stage 07</p>
              <p className="text-[#141413]">AST guard-parity compiler · Lamport quorum lock</p>
            </div>

            <div>
              <p className="text-[#141413]">
                Cryptographic verification
                <br />
                8-invariant SHA-256 audit
                <br />
                <a
                  href={STORIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-medium"
                >
                  www.storive.in
                </a>{' '}
                · India
                <br />
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  linkedin.com/in/mhdali-palsaniya
                </a>
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#141413]/35 my-7" />

          <nav className="flex flex-col gap-1.5 text-[19px] sm:text-[21px] font-mechanik font-medium mb-8 text-[#141413]">
            <a href="#showcases" className="hover:opacity-65 transition-opacity w-fit">
              Pillars
            </a>
            <a href="#about" className="hover:opacity-65 transition-opacity w-fit">
              About
            </a>
            <a href="#collections" className="hover:opacity-65 transition-opacity w-fit">
              Collections
            </a>
            <a href="#journal" className="hover:opacity-65 transition-opacity w-fit">
              Journal
            </a>
          </nav>

          <nav className="flex flex-col gap-1.5 text-[14px] sm:text-[15px] font-mechanik text-[#141413] mb-8">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left hover:underline w-fit cursor-pointer"
            >
              Founder on LinkedIn
            </a>
            <button
              type="button"
              onClick={() => setSelectedDossier(chap03)}
              className="text-left hover:underline w-fit cursor-pointer"
            >
              Architecture Dossier
            </button>
            <button
              type="button"
              onClick={() => setSelectedDossier(chap02)}
              className="text-left hover:underline w-fit cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setSelectedDossier(chap02)}
              className="text-left hover:underline w-fit cursor-pointer"
            >
              Terms and Conditions
            </button>
            <button
              type="button"
              onClick={() => setSelectedDossier(chap04)}
              className="text-left hover:underline w-fit cursor-pointer"
            >
              Sovereign License Terms
            </button>
            <button
              type="button"
              onClick={() => setSelectedDossier(chap02)}
              className="text-left hover:underline w-fit cursor-pointer"
            >
              Zero-Trust Verification Channel
            </button>
            <button
              type="button"
              onClick={() => setSelectedDossier(chap03)}
              className="text-left hover:underline w-fit cursor-pointer"
            >
              Management System Policy
            </button>
            <button
              type="button"
              onClick={() => setSelectedDossier(chap01)}
              className="text-left hover:underline w-fit cursor-pointer"
            >
              Cookie Policy
            </button>
          </nav>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto border-t border-[#141413]/35 pt-5">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mahammadali Palsaniya on LinkedIn"
                style={{ color: curtainAndFooterHex }}
                className="w-8 h-8 rounded-full bg-[#141413] flex items-center justify-center text-xs font-bold hover:opacity-80 transition-opacity"
              >
                in
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HMOS Sovereign Profile"
                style={{ color: curtainAndFooterHex }}
                className="w-8 h-8 rounded-full bg-[#141413] flex items-center justify-center text-[10px] font-bold hover:opacity-80 transition-opacity"
              >
                HM
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mahammadali Palsaniya Architect Profile"
                style={{ color: curtainAndFooterHex }}
                className="w-8 h-8 rounded-full bg-[#141413] flex items-center justify-center text-[10px] font-bold hover:opacity-80 transition-opacity"
              >
                MP
              </a>
            </div>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-mechanik font-medium text-[#141413] hover:underline"
            >
              Architected by Mahammadali Palsaniya
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-[9px] font-mechanik font-semibold tracking-wider text-[#141413]/70 uppercase">
            <span>HMOS® 35/35 STEPS</span>
            <span>STAGE 05 GUARD PARITY</span>
            <span>STAGE 07 QUORUM LOCK</span>
            <span>SHA-256 · INDIA</span>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE OVERLAY 1: FULL-SCREEN MENU, SEARCH & WISHLIST DRAWER (≡ Q)
          Curtain-wipe open / reverse close, see components/MenuDrawer.tsx
         ===================================================================== */}
      <MenuDrawer
        open={menuDrawerOpen}
        onClose={() => setMenuDrawerOpen(false)}
        accentHex={curtainAndFooterHex}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        chapters={filteredChapters}
        wishlistIds={wishlist}
        onToggleWishlist={toggleWishlist}
        onOpenDossier={(chap) => {
          setMenuDrawerOpen(false);
          setSelectedDossier(chap);
        }}
        onTogglePalette={() =>
          setPaletteMode((prev) => (prev === 'editorial' ? 'dark-slate' : 'editorial'))
        }
        paletteLabel={isEditorial ? 'Editorial' : 'Dark Slate'}
        onNavigate={handleMenuNavigate}
        linkedinUrl={LINKEDIN_URL}
        storiveUrl={STORIVE_URL}
      />

      {/* =====================================================================
          INTERACTIVE OVERLAY 2: CATALOGUE / DOSSIER MODAL
         ===================================================================== */}
      {selectedDossier && (
        <div
          onClick={() => setSelectedDossier(null)}
          className="fixed inset-0 z-50 bg-[#090D16]/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F2F1EA] text-[#141413] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setSelectedDossier(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#141413]/10 flex items-center justify-center hover:bg-[#141413] hover:text-[#FAF9F5] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#141413] text-[#FAF9F5]">
                {selectedDossier.number} · {selectedDossier.dossierCode}
              </span>
              <span className="font-mechanik text-sm text-[#787772]">
                {selectedDossier.dossierTitle}
              </span>
            </div>

            <h3 className="font-mechanik text-2xl sm:text-3xl leading-tight mb-4">
              {selectedDossier.headline}
            </h3>

            <p className="text-sm text-[#52524E] leading-relaxed mb-6">
              {selectedDossier.summary}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {selectedDossier.specifications.map((spec) => (
                <div
                  key={spec.label}
                  className="p-3 rounded-xl bg-[#ECEAE2] border border-[#141413]/10"
                >
                  <div className="text-[11px] text-[#787772] uppercase tracking-wider">
                    {spec.label}
                  </div>
                  <div className="font-mechanik font-medium text-sm text-[#141413] mt-0.5">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedDossier(null)}
              className="w-full rounded-full bg-[#141413] text-[#FAF9F5] py-3.5 text-xs font-mechanik font-medium uppercase tracking-wider cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          INTERACTIVE OVERLAY 3: INSIGHT / JOURNAL READER MODAL
         ===================================================================== */}
      {selectedInsight && (
        <div
          onClick={() => setSelectedInsight(null)}
          className="fixed inset-0 z-50 bg-[#090D16]/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#ECEAE2] text-[#141413] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[88vh] overflow-y-auto relative"
          >
            <button
              type="button"
              onClick={() => setSelectedInsight(null)}
              className="float-right w-9 h-9 rounded-full bg-[#141413]/10 flex items-center justify-center hover:bg-[#141413] hover:text-[#FAF9F5] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-xs text-[#787772] mb-2">
              {selectedInsight.date} · {selectedInsight.location} · {selectedInsight.readTime}
            </div>

            <h3 className="font-mechanik text-2xl sm:text-3xl leading-tight mb-5">
              {selectedInsight.title}
            </h3>

            <div className="aspect-[16/9] w-full rounded overflow-hidden mb-5 bg-[#181B22]">
              <img
                src={selectedInsight.image}
                alt={selectedInsight.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#272725] leading-relaxed">
              {selectedInsight.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          INTERACTIVE OVERLAY 4: COLLECTION INSPECTOR MODAL
         ===================================================================== */}
      {selectedCollectionModal && (
        <div
          onClick={() => setSelectedCollectionModal(null)}
          className="fixed inset-0 z-50 bg-[#090D16]/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F2F1EA] text-[#141413] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setSelectedCollectionModal(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#141413]/10 flex items-center justify-center hover:bg-[#141413] hover:text-[#FAF9F5] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#141413] text-[#FAF9F5] text-xs font-mechanik mb-4">
              <CategoryIcon type={selectedCollectionModal.iconType} className="w-3.5 h-3.5" />
              <span>
                {selectedCollectionModal.name} ({selectedCollectionModal.count})
              </span>
            </div>

            <h3 className="font-mechanik text-2xl sm:text-3xl mb-2">
              {selectedCollectionModal.tagline}
            </h3>

            <p className="text-sm text-[#52524E] leading-relaxed mb-6">
              {selectedCollectionModal.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {selectedCollectionModal.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3 rounded-xl bg-[#ECEAE2] border border-[#141413]/10"
                >
                  <div className="text-[11px] text-[#787772] uppercase">{m.label}</div>
                  <div className="font-mechanik font-medium text-sm mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedCollectionModal(null)}
              className="w-full rounded-full bg-[#141413] text-[#FAF9F5] py-3.5 text-xs font-mechanik uppercase tracking-wider cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
