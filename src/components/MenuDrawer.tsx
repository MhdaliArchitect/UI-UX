import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Search, X, Download, Bookmark, ExternalLink, Code2, ArrowUpRight } from 'lucide-react';
import { HmosEmblem } from './HmosVectors';
import type { ChapterItem } from '../data/hmosContent';

/**
 * Full-screen menu, search & wishlist drawer (the ≡ Q button).
 *
 * Opens with the same language as the page: a downward curtain wipe (accent colour
 * first, then the dark panel behind it), then masked headline reveals, hairlines that
 * draw in, and staggered catalogue cards. All GSAP, transform / opacity / clip-path
 * only, so it stays on the compositor like the rest of the site. Closing plays the
 * same timeline in reverse, a little faster. Honours prefers-reduced-motion.
 */

const NAV_ITEMS = [
  { n: '01', label: 'Sovereign Pillars', hash: '#showcases' },
  { n: '02', label: 'The Collections', hash: '#collections' },
  { n: '03', label: 'Brand Story', hash: '#about' },
  { n: '04', label: 'Journal & Benchmarks', hash: '#journal' },
];

export interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
  accentHex: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  chapters: ChapterItem[];
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onOpenDossier: (chapter: ChapterItem) => void;
  onDownloadDossier: (chapter: ChapterItem) => void;
  onOpenCode: () => void;
  onTogglePalette: () => void;
  paletteLabel: string;
  onNavigate: (hash: string) => void;
  linkedinUrl: string;
  storiveUrl: string;
  keynoteImage: string;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  open,
  onClose,
  accentHex,
  searchQuery,
  onSearchChange,
  chapters,
  wishlistIds,
  onToggleWishlist,
  onOpenDossier,
  onDownloadDossier,
  onOpenCode,
  onTogglePalette,
  paletteLabel,
  onNavigate,
  linkedinUrl,
  storiveUrl,
  keynoteImage,
}) => {
  // Stay mounted while the closing animation plays.
  const [mounted, setMounted] = useState(open);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  // Build the timeline once the drawer DOM exists.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!mounted || !root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => setMounted(false),
      });

      tl.fromTo(
        '[data-d="accent"]',
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.62, ease: 'power4.inOut' },
        0
      )
        .fromTo(
          '[data-d="panel"]',
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.68, ease: 'power4.inOut' },
          0.1
        )
        .fromTo(
          '[data-d="glow"]',
          { opacity: 0, scale: 0.82 },
          { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out' },
          0.3
        )
        .fromTo(
          '[data-d="fade"]',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.055 },
          0.42
        )
        .fromTo(
          '[data-d="mask"]',
          { yPercent: 112 },
          { yPercent: 0, duration: 0.95, ease: 'power4.out', stagger: 0.085 },
          0.46
        )
        .fromTo(
          '[data-d="line"]',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.05, ease: 'power3.inOut', stagger: 0.09 },
          0.5
        )
        .fromTo(
          '[data-d="card"]',
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.07 },
          0.62
        );

      tlRef.current = tl;
    }, root);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, [mounted]);

  // Drive the timeline from the `open` prop.
  useEffect(() => {
    const tl = tlRef.current;
    if (!mounted || !tl) return;
    const reduce = prefersReducedMotion();

    if (open) {
      if (reduce) tl.progress(1);
      else tl.timeScale(1).play();
      if (window.matchMedia('(pointer: fine)').matches) {
        const id = window.setTimeout(
          () => searchRef.current?.focus({ preventScroll: true }),
          reduce ? 0 : 700
        );
        return () => window.clearTimeout(id);
      }
    } else if (reduce) {
      setMounted(false);
    } else {
      tl.timeScale(1.7).reverse();
    }
  }, [open, mounted]);

  // Escape closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!mounted) return null;

  const accent = accentHex;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="HMOS navigation, search and catalogues"
      data-lenis-prevent
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain text-[#FAF9F5]"
      style={{ pointerEvents: open ? 'auto' : 'none' }}
    >
      {/* Curtain 1: accent colour, wipes down first (same curtain the page sections use) */}
      <div
        data-d="accent"
        aria-hidden="true"
        className="gpu-layer fixed inset-0"
        style={{ backgroundColor: accent }}
      />
      {/* Curtain 2: the dark panel that follows it */}
      <div
        data-d="panel"
        aria-hidden="true"
        className="gpu-layer fixed inset-0 bg-[#090D16]"
      >
        <div className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: accent }} />
        <div
          data-d="glow"
          className="absolute -top-1/3 -right-1/4 w-[80vw] h-[80vw] max-w-[1100px] max-h-[1100px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(closest-side, ${accent}2e, ${accent}00 72%)`,
          }}
        />
        <HmosEmblem
          size={620}
          className="absolute -bottom-40 -left-32 text-[#FAF9F5] opacity-[0.035] pointer-events-none hidden md:block"
        />
      </div>

      <div className="relative min-h-full flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-6 sm:py-9">
        <div className="max-w-6xl w-full mx-auto">
          {/* Top bar */}
          <div className="relative flex items-center justify-between pb-7">
            <div data-d="fade" className="flex items-center gap-3">
              <HmosEmblem size={30} className="text-[#FAF9F5]" />
              <span className="text-2xl font-mechanik font-medium tracking-tight">HMOS®</span>
            </div>
            <button
              type="button"
              data-d="fade"
              onClick={onClose}
              className="group w-11 h-11 rounded-full bg-[#FAF9F5] text-[#090D16] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:rotate-90 hover:bg-[color:var(--accent)]"
              style={{ ['--accent' as string]: accent }}
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
            <span
              data-d="line"
              aria-hidden="true"
              className="absolute left-0 right-0 bottom-0 h-px bg-[#FAF9F5]/20"
            />
          </div>

          {/* Search */}
          <div data-d="fade" className="my-8 relative">
            <Search className="w-5 h-5 text-[#94A3B8] absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search HMOS pillars, catalogues, Three.js monoliths..."
              className="w-full rounded-full bg-[#0F172A]/80 border border-[#FAF9F5]/15 pl-13 pr-6 py-4 text-base font-medium text-[#FAF9F5] placeholder:text-[#94A3B8] focus:outline-none transition-colors"
              onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = '')}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 pb-10">
            {/* ---- Left: navigation + actions ---- */}
            <div>
              <p
                data-d="fade"
                className="text-xs font-mono uppercase tracking-widest text-[#94A3B8] mb-5"
              >
                Navigation &amp; Founder Profile
              </p>

              <nav className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <div key={item.hash} className="relative">
                    <a
                      href={item.hash}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.hash);
                      }}
                      className="group flex items-baseline gap-4 sm:gap-6 py-3.5 sm:py-4 cursor-pointer"
                    >
                      <span
                        data-d="fade"
                        className="font-mono text-xs sm:text-sm tracking-widest text-[#94A3B8] w-7 shrink-0 transition-colors duration-300 group-hover:text-[color:var(--accent)]"
                        style={{ ['--accent' as string]: accent }}
                      >
                        {item.n}
                      </span>
                      <span className="block overflow-hidden pb-1">
                        <span
                          data-d="mask"
                          className="block font-mechanik font-medium text-[34px] sm:text-[52px] lg:text-[60px] leading-[1.05] tracking-[-0.035em] transition-[transform,color] duration-500 ease-out group-hover:translate-x-3 group-hover:text-[color:var(--accent)]"
                          style={{ ['--accent' as string]: accent }}
                        >
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="w-6 h-6 sm:w-7 sm:h-7 -translate-x-2 translate-y-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 self-center shrink-0"
                        style={{ color: accent }}
                      />
                    </a>
                    <span
                      data-d="line"
                      aria-hidden="true"
                      className="absolute left-0 right-0 bottom-0 h-px bg-[#FAF9F5]/15"
                    />
                  </div>
                ))}
              </nav>

              <div data-d="fade" className="mt-9 flex flex-wrap gap-3">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[#141413] text-xs font-mechanik font-semibold uppercase tracking-wider cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: accent }}
                >
                  <span>LinkedIn · Mahammadali Palsaniya</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={onOpenCode}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1D4ED8] text-[#FAF9F5] text-xs font-mechanik font-medium uppercase tracking-wider cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Deploy to storive.in / Code</span>
                </button>

                <button
                  type="button"
                  onClick={onTogglePalette}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#FAF9F5]/25 hover:border-[#FAF9F5]/60 text-xs font-mechanik font-medium uppercase tracking-wider cursor-pointer transition-colors duration-300"
                >
                  <span>Palette: {paletteLabel}</span>
                </button>
              </div>

              {/* LinkedIn Live Launch Kit (1-click share live URL + download 16:9 visual) */}
              <div
                data-d="fade"
                className="mt-8 p-4 rounded-2xl bg-[#0F172A]/80 border space-y-3"
                style={{ borderColor: `${accent}4d` }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-mono uppercase tracking-widest"
                    style={{ color: accent }}
                  >
                    LinkedIn Live Launch Studio
                  </span>
                  <span className="text-[11px] font-mono text-[#94A3B8]">16:9 + Live Link</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      storiveUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0A66C2] text-white text-xs font-mechanik font-medium cursor-pointer hover:opacity-90"
                  >
                    <span>Post www.storive.in on LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={keynoteImage}
                    download="HMOS-Keynote-16x9-LinkedIn.jpg"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FAF9F5]/10 hover:bg-[#FAF9F5]/20 text-[#FAF9F5] text-xs font-mechanik font-medium cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download 16:9 Visual (.JPG)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ---- Right: catalogues + wishlist ---- */}
            <div>
              <p
                data-d="fade"
                className="text-xs font-mono uppercase tracking-widest text-[#94A3B8] mb-5"
              >
                Catalogues &amp; Saved Wishlist ({wishlistIds.length})
              </p>
              <div className="space-y-3">
                {chapters.length === 0 && (
                  <div
                    data-d="card"
                    className="p-5 rounded-xl border border-dashed border-[#FAF9F5]/20 text-sm text-[#94A3B8]"
                  >
                    No catalogue matches “{searchQuery}”.
                  </div>
                )}
                {chapters.map((chap) => {
                  const isSaved = wishlistIds.includes(chap.id);
                  return (
                    <div
                      key={chap.id}
                      data-d="card"
                      className="group/card p-3 pr-4 rounded-2xl bg-[#0F172A]/80 border border-[#FAF9F5]/10 hover:border-[#FAF9F5]/30 flex items-center justify-between gap-3 transition-colors duration-300"
                    >
                      <button
                        type="button"
                        onClick={() => onOpenDossier(chap)}
                        className="flex items-center gap-4 text-left cursor-pointer min-w-0"
                      >
                        <span className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-[#181B22]">
                          <img
                            src={chap.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs text-[#94A3B8] font-mono truncate">
                            {chap.number} · {chap.dossierCode}
                          </span>
                          <span className="block text-base font-mechanik font-medium text-[#FAF9F5] truncate">
                            {chap.dossierTitle}
                          </span>
                        </span>
                      </button>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => onToggleWishlist(chap.id)}
                          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                            isSaved ? 'text-[#141413]' : 'border-[#FAF9F5]/20 text-[#94A3B8]'
                          }`}
                          style={isSaved ? { backgroundColor: accent, borderColor: accent } : undefined}
                          title="Save to Wishlist"
                          aria-pressed={isSaved}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDownloadDossier(chap)}
                          className="p-2 rounded-lg bg-[#FAF9F5]/10 hover:bg-[#FAF9F5]/20 text-[#FAF9F5] cursor-pointer transition-colors"
                          title="Download Catalogue"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl w-full mx-auto">
          <div className="relative pt-5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-widest text-[#94A3B8]">
            <span
              data-d="line"
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 h-px bg-[#FAF9F5]/15"
            />
            <span data-d="fade">© 2026 HMOS® · Made to last, designed to endure.</span>
            <span data-d="fade">storive.in · India</span>
          </div>
        </div>
      </div>
    </div>
  );
};
