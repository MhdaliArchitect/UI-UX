export const STANDALONE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HMOS® — Systems for Sovereignty, Made for Certainty</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
  <!-- GSAP & ScrollTrigger for Live Timeline & Curtain Wipe Physics -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
</head>
<body>
  <!-- Fixed Top Navigation Bar (1:1 Parity) -->
  <header class="site-header">
    <a href="#top" class="brand-wordmark" aria-label="HMOS Home">
      <span class="brand-text">HMOS</span><sup class="brand-reg">®</sup>
    </a>

    <div class="header-actions">
      <button class="lang-switch" type="button" aria-label="Select Language">
        <span>EN</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      <button class="menu-search-pill" type="button" aria-label="Open Menu and Search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <line x1="3" y1="7" x2="15" y2="7" />
          <line x1="3" y1="12" x2="11" y2="12" />
          <line x1="3" y1="17" x2="15" y2="17" />
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
    </div>
  </header>

  <!-- Floating Bottom-Left "CO" Badge -->
  <a href="#footer" class="floating-co-badge" title="HMOS Sovereign Emblem">
    <span>CO</span>
  </a>

  <!-- 1. Minimalist Hero Section -->
  <main id="top">
    <section class="hero-canvas">
      <h1 class="hero-title">
        Systems for sovereignty,<br />
        made for certainty.
      </h1>
    </section>

    <!-- 2. 01-05 Sticky Stacking Scroll Showcases -->
    <section class="sticky-stack-section" id="products">
      <!-- 01 Vision (Expanded Sticky Card) -->
      <div class="sticky-track">
        <article class="showcase-panel" style="--bg-img: url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85');">
          <div class="panel-scrim"></div>
          <div class="panel-inner">
            <div class="panel-top-meta">
              <span class="panel-index">01</span>
              <span class="category-chip chip-vision">Vision</span>
            </div>
            <h2 class="panel-headline">
              Architecture, kernels, and equipment for welcoming sovereign spaces
            </h2>
            <a href="#collections" class="see-products-combo">
              <span class="combo-circle"></span>
              <span class="combo-pill">SEE VISION PRODUCTS</span>
            </a>

            <div class="catalogue-card">
              <div class="catalogue-info">
                <h3>Vision Catalogue</h3>
                <a href="#footer" class="download-link">Download Now ↓</a>
              </div>
              <div class="catalogue-cover cover-vision">
                <span class="cover-brand">HMOS®</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- 02 Sovereignty (Sticky Progress-Line Card) -->
      <div class="sticky-track">
        <article class="showcase-panel" style="--bg-img: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85');">
          <div class="panel-scrim"></div>
          <div class="panel-inner progress-mode">
            <span class="panel-index">02</span>
            <div class="scroll-progress-track"><div class="scroll-progress-bar" style="width: 52%;"></div></div>
            <h2 class="ghost-pillar-title">Sovereignty</h2>
          </div>
        </article>
      </div>

      <!-- 03 Architecture (Sticky Progress-Line Card) -->
      <div class="sticky-track">
        <article class="showcase-panel" style="--bg-img: url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=85');">
          <div class="panel-scrim"></div>
          <div class="panel-inner progress-mode">
            <span class="panel-index">03</span>
            <div class="scroll-progress-track"><div class="scroll-progress-bar" style="width: 74%;"></div></div>
            <h2 class="ghost-pillar-title">Architecture</h2>
          </div>
        </article>
      </div>

      <!-- 04 Ecosystem (Expanded Sticky Card) -->
      <div class="sticky-track">
        <article class="showcase-panel" style="--bg-img: url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85');">
          <div class="panel-scrim"></div>
          <div class="panel-inner">
            <div class="panel-top-meta">
              <span class="panel-index">04</span>
              <span class="category-chip chip-ecosystem">Ecosystem</span>
            </div>
            <h2 class="panel-headline">
              Revamp your foundation with best practices sovereign equipment and telemetry
            </h2>
            <a href="#collections" class="see-products-combo">
              <span class="combo-circle"></span>
              <span class="combo-pill">SEE ECOSYSTEM PRODUCTS</span>
            </a>

            <div class="catalogue-card">
              <div class="catalogue-info">
                <h3>Ecosystem Catalogue</h3>
                <a href="#footer" class="download-link">Download Now ↓</a>
              </div>
              <div class="catalogue-cover cover-ecosystem">
                <span class="cover-brand">HMOS®</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- 05 Details (Expanded Sticky Card) -->
      <div class="sticky-track">
        <article class="showcase-panel" style="--bg-img: url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85');">
          <div class="panel-scrim"></div>
          <div class="panel-inner">
            <div class="panel-top-meta">
              <span class="panel-index">05</span>
              <span class="category-chip chip-details">Details</span>
            </div>
            <h2 class="panel-headline">
              Precision-engineered custom sovereign hardware and invariant locks
            </h2>
            <a href="#collections" class="see-products-combo">
              <span class="combo-circle"></span>
              <span class="combo-pill">SEE DETAILS SYSTEMS</span>
            </a>

            <div class="catalogue-card">
              <div class="catalogue-info">
                <h3>Details Catalogue</h3>
                <a href="#footer" class="download-link">Download Now ↓</a>
              </div>
              <div class="catalogue-cover cover-details">
                <span class="cover-brand">HMOS®</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- 3. Editorial Manifesto & Recent News -->
    <section class="editorial-section" id="journal">
      <div class="container">
        <p class="manifesto-copy">
          Sovereignty is our calling. It demands architecture to be aligned with strict mathematical principles and answer to the highest standards. It keeps us on a journey of innovation, crafting each system to keep certainty on our side.
        </p>

        <div class="recent-news-header">
          <a href="#journal" class="recent-news-link">Recent News ↓</a>
        </div>

        <div class="news-grid">
          <article class="news-card">
            <div class="news-img-wrap">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" alt="Sovereign Architecture" referrerpolicy="no-referrer" />
            </div>
            <h3 class="news-title">Why 98% single-step AI wrappers drop to 49.3% survival across 35 enterprise steps—and how HMOS® locks 100%</h3>
            <div class="news-meta">
              <span>October 2026</span>
              <span class="arrow">→</span>
            </div>
          </article>

          <article class="news-card">
            <div class="news-img-wrap">
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80" alt="Diamond Core Architecture" referrerpolicy="no-referrer" />
            </div>
            <h3 class="news-title">Inside Stage 05 &amp; Stage 07: Stripping 41.7% wrapper bloat while locking Shannon Entropy under 0.250 bits</h3>
            <div class="news-meta">
              <span>September 2026</span>
              <span class="arrow">→</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 4. 3D Monolith Turntable Stage (00:12) -->
    <section class="monolith-stage">
      <div class="stage-top-badge">
        <span class="category-chip chip-ecosystem">Ecosystem</span>
      </div>
      <div class="monolith-object">
        <div class="monolith-pillar">
          <div class="monolith-plaque">35</div>
        </div>
        <div class="monolith-shadow"></div>
      </div>
      <div class="stage-cta">
        <a href="#collections" class="explore-btn">EXPLORE →</a>
      </div>
    </section>

    <!-- 5. The Collections Inline Typography (00:13) -->
    <section class="collections-section" id="collections">
      <div class="container">
        <p class="section-kicker">The Collections</p>
        <div class="collections-typography">
          <div class="collection-line">
            <span>Vision</span>
            <span class="col-thumb"></span>
            <span>Kernel (35)</span>
          </div>
          <div class="collection-line">
            <span>Sovereignty (08)</span>
            <span class="col-thumb"></span>
          </div>
          <div class="collection-line">
            <span class="col-thumb"></span>
            <span>Ecosystem (41)</span>
          </div>
          <div class="collection-line">
            <span>Details</span>
            <span class="col-thumb"></span>
            <span>(00)</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Dark Contrast Brand Story with Solid Curtain Wipe (00:14 - 00:15) -->
    <section class="dark-story-section" id="about">
      <div class="container">
        <div class="story-paragraphs">
          <p>HMOS® (Hybrid Master Operating System) architects sovereign deep-tech infrastructure and deterministic execution kernels that eliminate probabilistic drift across mission-critical environments.</p>
          <p>Founded and architected by Mahammadali Palsaniya in India, our systems establish a new benchmark for institutional permanence, cryptographic verification, and zero-trust resilience.</p>
        </div>

        <blockquote class="story-quote">
          “We believe sovereign systems should be mathematically certain, architecturally pure, and built to endure for decades.”
        </blockquote>

        <figure class="curtain-reveal-frame">
          <div class="curtain-wipe-block"></div>
          <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80" alt="HMOS Sovereign Architecture Studio" referrerpolicy="no-referrer" />
          <figcaption>HMOS® Sovereign Architecture Studio, India</figcaption>
        </figure>
      </div>
    </section>

    <!-- 7. Three-Step Craft Sequence with Curtain Wipes (00:16 - 00:17) -->
    <section class="craft-sequence-section">
      <div class="container">
        <div class="craft-item">
          <div class="curtain-reveal-frame"><div class="curtain-wipe-block"></div></div>
          <div class="craft-row">
            <h3 class="craft-title">We design</h3>
            <p class="craft-desc">Every kernel and architectural interface is designed to guarantee 100% deterministic viability</p>
          </div>
        </div>

        <div class="craft-item">
          <div class="curtain-reveal-frame"><div class="curtain-wipe-block"></div></div>
          <div class="craft-row">
            <h3 class="craft-title">We build</h3>
            <p class="craft-desc">Stripping structural wrapper bloat while ensuring 100% safety guard parity stays unaltered</p>
          </div>
        </div>

        <div class="craft-item">
          <div class="curtain-reveal-frame"><div class="curtain-wipe-block"></div></div>
          <div class="craft-row">
            <h3 class="craft-title">We implement</h3>
            <p class="craft-desc">Every deployment is crafted to endure, locked with 7ms SHA-256 verification and zero drift</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. Endurance Callout & Newsletter (00:18) -->
    <section class="newsletter-section">
      <div class="container">
        <h2 class="endurance-title">Made to last,<br />designed to endure.</h2>
        <p class="newsletter-sub">Join our community Sign up for news,<br />updates and more.</p>

        <form class="newsletter-form" onsubmit="event.preventDefault();">
          <input type="email" placeholder="Your email *" required class="newsletter-input" />
          <label class="privacy-check">
            <input type="checkbox" required />
            <span>By submitting your email you agree to our <a href="#footer">Privacy Policy</a>.</span>
          </label>
        </form>
      </div>
    </section>
  </main>

  <!-- 9. High-Contrast Architectural CAD Wireframe Footer (00:18 - 00:21) -->
  <footer class="blueprint-footer" id="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-hq">
          <h4>Headquarters</h4>
          <p>HMOS® Sovereign Systems Studio<br />Founded &amp; Architected by Mahammadali Palsaniya<br />DeepTech &amp; Sovereign AI Infrastructure, India<br /><a href="https://www.linkedin.com/in/mhdali-palsaniya-68233923b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">linkedin.com/in/mhdali-palsaniya</a></p>
        </div>

        <nav class="footer-nav-primary">
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#collections">Sovereignty</a>
          <a href="#journal">Journal</a>
        </nav>

        <nav class="footer-nav-legal">
          <a href="#footer">Careers</a>
          <a href="#footer">Architecture Dossier</a>
          <a href="#footer">Privacy Policy</a>
          <a href="#footer">Terms and Conditions</a>
          <a href="#footer">Sovereign License Terms</a>
          <a href="#footer">Security Verification Channel</a>
          <a href="#footer">Management System Policy</a>
          <a href="#footer">Cookie Policy</a>
        </nav>
      </div>

      <div class="footer-bottom">
        <div class="social-links">
          <a href="https://www.linkedin.com/in/mhdali-palsaniya-68233923b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
          <a href="https://www.linkedin.com/in/mhdali-palsaniya-68233923b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="Founder Profile">mp</a>
        </div>
        <div class="footer-credit">Architected by <a href="https://www.linkedin.com/in/mhdali-palsaniya-68233923b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">Mahammadali Palsaniya</a></div>
      </div>
    </div>
  </footer>
</body>
</html>`;

export const STANDALONE_CSS = `/* ==========================================================================
   HMOS® — Standalone Pixel-Perfect Responsive Stylesheet (styles.css)
   Typography: GT Mechanik / Archivo + DM Sans + Space Grotesk
   Live Animations: Sticky Card Stacking, Scroll Progress Lines, Curtain Wipes
   ========================================================================== */

:root {
  --bg-canvas: #F2F3EE;
  --text-dark: #111318;
  --text-muted: #71757E;
  --bg-stage: #E3E2DA;
  --bg-story: #062B22;
  --accent-curtain: #DAF462;
  --font-mechanik: 'Archivo', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Space Grotesk', monospace;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  background-color: var(--bg-canvas);
  color: var(--text-dark);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--bg-canvas);
  color: var(--text-dark);
  overflow-x: hidden;
  line-height: 1.45;
}

.container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

/* 1. Fixed Top Header */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
}

.brand-wordmark {
  text-decoration: none;
  color: var(--text-dark);
  font-family: var(--font-mechanik);
  font-size: 1.85rem;
  font-weight: 600;
  letter-spacing: -0.038em;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.lang-switch {
  background: transparent;
  border: none;
  color: var(--text-dark);
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}

.menu-search-pill {
  background: #FAF9F5;
  color: var(--text-dark);
  border: 1px solid rgba(17, 19, 24, 0.1);
  border-radius: 9999px;
  padding: 0.6rem 1.15rem;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.14);
}

.floating-co-badge {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 45;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background: var(--accent-curtain);
  color: var(--text-dark);
  font-family: var(--font-mechanik);
  font-weight: 700;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

/* 2. Minimalist Hero Canvas */
.hero-canvas {
  min-height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 1.5rem;
}

.hero-title {
  font-family: var(--font-mechanik);
  font-size: clamp(2.25rem, 5.2vw, 4.25rem);
  font-weight: 400;
  line-height: 1.06;
  letter-spacing: -0.035em;
}

/* 3. Sticky Stacking Cards (01 - 05) */
.sticky-track {
  position: relative;
  height: 105vh;
}

.showcase-panel {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  background-image: var(--bg-img);
  background-size: cover;
  background-position: center;
  color: #FAF9F5;
  display: flex;
  align-items: flex-end;
  padding: 6rem 1.25rem 2.25rem;
  overflow: hidden;
}

.panel-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(9, 13, 22, 0.28) 0%, rgba(9, 13, 22, 0.78) 100%);
}

.panel-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
}

.panel-inner.progress-mode {
  align-self: flex-start;
  margin-top: 3.5rem;
}

.scroll-progress-track {
  width: 100%;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.3);
  margin: 0.75rem 0 1.5rem;
}

.scroll-progress-bar {
  height: 100%;
  background: #FFFFFF;
}

.ghost-pillar-title {
  font-family: var(--font-mechanik);
  font-size: 2.35rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.45);
}

.see-products-combo {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  margin-bottom: 2rem;
}

.combo-circle {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  background: #FAF9F5;
}

.combo-pill {
  background: #FAF9F5;
  color: var(--text-dark);
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  font-family: var(--font-mechanik);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.03em;
}

.catalogue-card {
  background: #FAF9F5;
  color: var(--text-dark);
  border-radius: 1.15rem;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 390px;
}

/* 4. Curtain Wipe Frame (00:14 & 00:16) */
.curtain-reveal-frame {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 3px;
}

.curtain-wipe-block {
  position: absolute;
  inset: 0;
  background: var(--accent-curtain);
  transform-origin: bottom center;
  transition: transform 0.9s cubic-bezier(0.77, 0, 0.175, 1);
}

.curtain-reveal-frame:hover .curtain-wipe-block {
  transform: scaleY(0);
}

/* 5. High-Contrast Blueprint Footer */
.blueprint-footer {
  background: var(--accent-curtain);
  color: var(--text-dark);
  padding: 4rem 0 3rem;
}
`;
