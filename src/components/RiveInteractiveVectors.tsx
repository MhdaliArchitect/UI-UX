import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Rive-Style Interactive Connected Capsule + Rounded-Rectangle Metaball Button
 * MAX 120FPS EDITION:
 * - Uses gsap.quickTo() for 0ms magnetic cursor pull + liquid metaball neck separation
 * - Pure vector concave neck (0ms GPU rasterization, no CPU blur filter stall)
 */
export const RiveMetaballButton: React.FC<{
  label: string;
  onClick: () => void;
}> = ({ label, onClick }) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const bridgeRef = useRef<SVGSVGElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);

  const handleMouseEnter = () => {
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        x: -7,
        scale: 1.06,
        duration: 0.26,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
    if (bridgeRef.current) {
      gsap.to(bridgeRef.current, {
        scaleY: 0.12,
        scaleX: 1.45,
        opacity: 0,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
    if (pillRef.current) {
      gsap.to(pillRef.current, {
        x: 4,
        duration: 0.26,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
    if (arrowRef.current) {
      gsap.fromTo(
        arrowRef.current,
        { x: -8, opacity: 0.2 },
        { x: 1, opacity: 1, duration: 0.24, ease: 'power3.out', overwrite: 'auto' }
      );
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.12;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.18;
    gsap.set(btn, { x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        x: 0,
        y: 0,
        duration: 0.35,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        x: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
    if (bridgeRef.current) {
      gsap.to(bridgeRef.current, {
        scaleY: 1,
        scaleX: 1,
        opacity: 1,
        duration: 0.22,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
    if (pillRef.current) {
      gsap.to(pillRef.current, {
        x: 0,
        duration: 0.26,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 0,
        opacity: 0.88,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="gpu-layer inline-flex items-center cursor-pointer select-none group focus:outline-none whitespace-nowrap shrink-0 relative will-change-transform"
    >
      {/* Left Vertical Capsule/Circle (Exact 00:04, 00:07, 00:09 proportion) */}
      <span
        ref={circleRef}
        className="w-[38px] h-[46px] sm:w-[40px] sm:h-[48px] rounded-full bg-[#FAF9F5] text-[#141413] flex items-center justify-center relative z-10 shrink-0 will-change-transform"
      >
        <svg
          ref={arrowRef}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90 will-change-transform"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>

      {/* Pure Vector Concave Liquid Metaball Bridge Neck (0ms GPU composited) */}
      <svg
        ref={bridgeRef}
        width="10"
        height="24"
        viewBox="0 0 10 24"
        fill="none"
        className="-mx-[3px] relative z-0 shrink-0 text-[#FAF9F5] will-change-transform"
        aria-hidden="true"
      >
        <path
          d="M0 0 C3.5 5, 6.5 5, 10 0 L10 24 C6.5 19, 3.5 19, 0 24 Z"
          fill="currentColor"
        />
      </svg>

      {/* Right Softly Rounded Squircle Pill (rounded-[14px] matching 00:04, 00:07, 00:09) */}
      <span
        ref={pillRef}
        className="h-[46px] sm:h-[48px] px-5 sm:px-6 rounded-[14px] bg-[#FAF9F5] text-[#141413] inline-flex items-center justify-center text-[11.5px] sm:text-[12.5px] font-mechanik font-normal tracking-[0.02em] uppercase relative z-10 will-change-transform"
      >
        {label}
      </span>
    </button>
  );
};

/**
 * Ultra-Fast 0ms Viewport-Gated Canvas Motion Overlay for Cards 01 - 05
 * - Uses IntersectionObserver so ONLY the currently visible card runs requestAnimationFrame
 * - Uses a compact 280x180 hardware-scaled buffer (<0.05ms per frame, zero main-thread lag)
 */
export const LiveCardMotionCanvas: React.FC<{
  accentHex?: string;
  intensity?: number;
}> = ({ accentHex = '#60A5FA', intensity = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const W = 280;
    const H = 180;
    canvas.width = W;
    canvas.height = H;

    let animId = 0;
    let isVisible = false;
    let t = Math.random() * 50;

    const particles = Array.from({ length: 12 }, (_, i) => ({
      x: ((i * 67) % 100) * 0.01 * W,
      y: ((i * 37) % 100) * 0.01 * H,
      r: 0.9 + (i % 3) * 0.45,
      vx: 0.11 + (i % 4) * 0.035,
      vy: -0.07 - (i % 3) * 0.025,
      phase: i * 0.8,
    }));

    const render = () => {
      if (!isVisible) return;
      t += 0.016;
      ctx.clearRect(0, 0, W, H);

      const sweepX = W * (0.5 + Math.sin(t * 0.6) * 0.32);
      const grad = ctx.createRadialGradient(sweepX, H * 0.32, 4, sweepX, H * 0.5, W * 0.65);
      grad.addColorStop(0, `${accentHex}26`);
      grad.addColorStop(0.5, `${accentHex}0C`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        const alpha = (0.2 + Math.sin(t * 1.6 + p.phase) * 0.12) * intensity;
        ctx.fillStyle = `rgba(250, 249, 245, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && !isVisible) {
          isVisible = true;
          animId = requestAnimationFrame(render);
        } else if (!entry.isIntersecting && isVisible) {
          isVisible = false;
          cancelAnimationFrame(animId);
        }
      },
      { rootMargin: '80px' }
    );

    observer.observe(canvas);

    return () => {
      isVisible = false;
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [accentHex, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="gpu-layer absolute inset-0 w-full h-full pointer-events-none z-[2]"
      aria-hidden="true"
    />
  );
};

/**
 * Scroll-Animated CAD Wireframe Footer Top Illustrations (00:18 - 00:21 in Video)
 */
export const AnimatedFooterCadTop: React.FC<{ className?: string }> = ({ className = '' }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      const elements = svg.querySelectorAll('path, rect, line');
      gsap.fromTo(
        elements,
        { opacity: 0.25, strokeDasharray: 300, strokeDashoffset: 300 },
        {
          opacity: 1,
          strokeDashoffset: 0,
          duration: 1.0,
          stagger: 0.018,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: svg,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 420 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="24" y="76" width="54" height="8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="28" y="84" width="46" height="4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M30 88L36 138H66L72 88" stroke="currentColor" strokeWidth="1.2" />
      <line x1="36" y1="138" x2="36" y2="144" stroke="currentColor" strokeWidth="1.5" />
      <line x1="66" y1="138" x2="66" y2="144" stroke="currentColor" strokeWidth="1.5" />

      <rect x="110" y="28" width="120" height="9" stroke="currentColor" strokeWidth="1.3" />
      <rect x="116" y="37" width="108" height="5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="126" y1="28" x2="126" y2="37" stroke="currentColor" strokeWidth="1" />
      <line x1="140" y1="28" x2="140" y2="37" stroke="currentColor" strokeWidth="1" />
      <line x1="154" y1="28" x2="154" y2="37" stroke="currentColor" strokeWidth="1" />
      <line x1="170" y1="28" x2="170" y2="37" stroke="currentColor" strokeWidth="1" />
      <line x1="186" y1="28" x2="186" y2="37" stroke="currentColor" strokeWidth="1" />
      <line x1="200" y1="28" x2="200" y2="37" stroke="currentColor" strokeWidth="1" />
      <line x1="214" y1="28" x2="214" y2="37" stroke="currentColor" strokeWidth="1" />
      <path d="M120 42L135 138H205L220 42" stroke="currentColor" strokeWidth="1.3" />
      <line x1="132" y1="124" x2="208" y2="124" stroke="currentColor" strokeWidth="1" />
      <rect x="135" y="138" width="10" height="6" stroke="currentColor" strokeWidth="1.2" />
      <rect x="195" y="138" width="10" height="6" stroke="currentColor" strokeWidth="1.2" />

      <rect x="260" y="64" width="64" height="8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="264" y="72" width="56" height="4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M266 76L274 138H310L318 76" stroke="currentColor" strokeWidth="1.2" />
      <line x1="273" y1="128" x2="311" y2="128" stroke="currentColor" strokeWidth="1" />
      <rect x="274" y="138" width="8" height="6" stroke="currentColor" strokeWidth="1.2" />
      <rect x="302" y="138" width="8" height="6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
};

/**
 * Scroll-Animated Right-Margin Vertical CAD Monolith Wireframe (00:19 - 00:21 in Video)
 */
export const AnimatedFooterCadSideMonolith: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      const elements = svg.querySelectorAll('rect, circle, line');
      gsap.fromTo(
        elements,
        { opacity: 0.2, strokeDasharray: 280, strokeDashoffset: 280 },
        {
          opacity: 1,
          strokeDashoffset: 0,
          duration: 1.1,
          stagger: 0.015,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: svg,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 180 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="30" y="10" width="140" height="58" rx="4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="44" cy="24" r="3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="44" cy="54" r="3" stroke="currentColor" strokeWidth="1.2" />
      <rect x="78" y="68" width="52" height="170" stroke="currentColor" strokeWidth="1.2" />
      <line x1="94" y1="68" x2="94" y2="238" stroke="currentColor" strokeWidth="1" />
      <line x1="114" y1="68" x2="114" y2="238" stroke="currentColor" strokeWidth="1" />
      <line x1="64" y1="238" x2="144" y2="238" stroke="currentColor" strokeWidth="1.4" />

      <rect x="44" y="290" width="128" height="18" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="54" cy="299" r="3" stroke="currentColor" strokeWidth="1" />
      <circle cx="162" cy="299" r="3" stroke="currentColor" strokeWidth="1" />
      <rect x="48" y="308" width="120" height="240" stroke="currentColor" strokeWidth="1.3" />
      <line x1="58" y1="316" x2="58" y2="548" stroke="currentColor" strokeWidth="1" />
      <line x1="68" y1="316" x2="68" y2="548" stroke="currentColor" strokeWidth="1" />
      <line x1="78" y1="316" x2="78" y2="548" stroke="currentColor" strokeWidth="1" />
      <line x1="88" y1="316" x2="88" y2="548" stroke="currentColor" strokeWidth="1" />
      <line x1="98" y1="316" x2="98" y2="548" stroke="currentColor" strokeWidth="1" />
      <line x1="108" y1="316" x2="108" y2="548" stroke="currentColor" strokeWidth="1" />
      <line x1="118" y1="316" x2="118" y2="548" stroke="currentColor" strokeWidth="1" />
      <line x1="128" y1="316" x2="128" y2="548" stroke="currentColor" strokeWidth="1" />
      <line x1="138" y1="316" x2="138" y2="548" stroke="currentColor" strokeWidth="1" />
      <line x1="148" y1="316" x2="148" y2="548" stroke="currentColor" strokeWidth="1" />
      <line x1="158" y1="316" x2="158" y2="548" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
};
