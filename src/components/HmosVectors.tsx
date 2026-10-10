import React from 'react';

export const HmosEmblem: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M14 22V14H22L32 24L42 14H50V22L40 32L50 42V50H42L32 40L22 50H14V42L24 32L14 22Z"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinejoin="round"
    />
    <polygon
      points="32,19 45,32 32,45 19,32"
      fill="#1D4ED8"
      stroke="#60A5FA"
      strokeWidth="2"
    />
    <polygon points="32,24 40,32 32,40 24,32" fill="#10B981" />
  </svg>
);

/**
 * Exact Tray Download Icon (↓ into horizontal tray) matching 00:04, 00:07, 00:09 in Video
 */
export const TrayDownloadIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 3v10" />
    <path d="m6 9 4 4 4-4" />
    <path d="M4 16h12" />
  </svg>
);

export const CategoryIcon: React.FC<{
  type: 'vision' | 'sovereignty' | 'architecture' | 'ecosystem' | 'details';
  className?: string;
}> = ({ type, className = 'w-4 h-4' }) => {
  switch (type) {
    case 'vision':
      // Exact twin-building architectural icon from 01 Urban (00:03 & 00:13)
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
          <path d="M3 20V5l8-2v17" />
          <path d="M11 9l9 2v9" />
          <line x1="6" y1="8" x2="8" y2="8" />
          <line x1="6" y1="12" x2="8" y2="12" />
          <line x1="6" y1="16" x2="8" y2="16" />
          <line x1="14" y1="13" x2="17" y2="13" />
          <line x1="14" y1="16" x2="17" y2="16" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );
    case 'sovereignty':
      // Exact 3-arrow recycle/cycle icon from RePlastic (00:13)
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
          <path d="M9 6l3-4 3 4" />
          <path d="M12 2v6" />
          <path d="M19 14l3 4-4 2" />
          <path d="M22 18l-5-3" />
          <path d="M5 14l-3 4 4 2" />
          <path d="M2 18l5-3" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      );
    case 'architecture':
      // Nature leaf / diamond structural icon
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
          <path d="M12 3c5 3 8 8 8 13a8 8 0 0 1-16 0c0-5 3-10 8-13Z" />
          <line x1="12" y1="9" x2="12" y2="21" />
          <path d="M12 14l4-3" />
          <path d="M12 17l-4-3" />
        </svg>
      );
    case 'ecosystem':
      // Exact Golf Flag + Hole Horizon Icon from 04 Golf (00:07 & 00:13)
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
          <line x1="7" y1="3" x2="7" y2="20" />
          <polygon points="7,4 16,8 7,12" fill="currentColor" stroke="none" />
          <path d="M3 19c3-1.2 7-1.2 10 0s6 1.2 8 0" />
          <circle cx="16.5" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'details':
      // Exact Magnifying Glass over Sign Frame Icon from Details (00:08 & 00:13)
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
          <path d="M18 11V4H4v14h7" />
          <circle cx="15.5" cy="15.5" r="4" />
          <line x1="18.5" y1="18.5" x2="22" y2="22" />
        </svg>
      );
  }
};

/**
 * 1:1 Studio Product Thumbnails for Section 6 ("The Collections", 00:13 in Video)
 * Every thumbnail in 00:13 is an isolated 3D architectural object on a light studio grey (#D8D6CE) background
 * with realistic soft studio shading and directional floor shadow.
 */
export const CollectionStudioThumb: React.FC<{
  type: 'monolith-post' | 'slatted-planter' | 'clock-totem' | 'custom-plaque';
}> = ({ type }) => {
  if (type === 'monolith-post') {
    // Row 1 (00:13): Warm ochre top band + soft blue-grey backdrop with tall dark monolith post & live pulsing plaque
    return (
      <svg viewBox="0 0 96 128" className="w-full h-full block">
        <rect x="0" y="0" width="96" height="28" fill="#EAB344" />
        <rect x="0" y="28" width="96" height="44" fill="#9BBCE0" />
        <rect x="0" y="72" width="96" height="56" fill="#E3E1DA" />
        {/* Soft floor shadow */}
        <ellipse cx="56" cy="118" rx="22" ry="4" fill="#141413" fillOpacity="0.18" />
        {/* Twin-slat dark monolith post */}
        <rect x="33" y="10" width="14" height="112" fill="#523728" />
        <rect x="49" y="10" width="14" height="112" fill="#3D271C" />
        <rect x="47" y="10" width="2" height="112" fill="#1A120E" />
        {/* Upper white plaque */}
        <rect x="37" y="16" width="22" height="36" rx="1" fill="#F5F3EC" />
        <circle cx="48" cy="25" r="4.5" fill="#1D4ED8" className="animate-pulse" />
        <line x1="41" y1="36" x2="55" y2="36" stroke="#141413" strokeWidth="1.8" />
        <line x1="41" y1="41" x2="52" y2="41" stroke="#787772" strokeWidth="1.4" />
        {/* Lower circular badge */}
        <circle cx="48" cy="70" r="5.5" fill="#EAB344" />
      </svg>
    );
  }

  if (type === 'slatted-planter') {
    // Row 2 (00:13): Sky-blue backdrop with slatted horizontal dark planter/vault box & live gently swaying fronds
    return (
      <svg viewBox="0 0 112 118" className="w-full h-full block">
        <rect x="0" y="0" width="112" height="72" fill="#B8D4EE" />
        <rect x="0" y="72" width="112" height="46" fill="#D5D3CB" />
        {/* Live swaying palm/architectural fronds rising from box */}
        <g className="origin-[56px_68px] animate-[pulse_3.5s_ease-in-out_infinite]">
          <path
            d="M56 68C44 48 26 36 14 34M56 68C48 42 36 22 24 14M56 68C56 40 56 18 56 8M56 68C66 42 78 22 90 14M56 68C70 48 86 36 98 34"
            stroke="#2E5A36"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M56 68C40 54 22 48 10 48M56 68C72 54 90 48 102 48"
            stroke="#437A4C"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>
        {/* Slatted horizontal dark planter/vault box */}
        <rect x="14" y="66" width="84" height="48" fill="#593E31" />
        <line x1="14" y1="77" x2="98" y2="77" stroke="#2B1D16" strokeWidth="2.2" />
        <line x1="14" y1="89" x2="98" y2="89" stroke="#2B1D16" strokeWidth="2.2" />
        <line x1="14" y1="101" x2="98" y2="101" stroke="#2B1D16" strokeWidth="2.2" />
        <line x1="22" y1="66" x2="22" y2="114" stroke="#3D291F" strokeWidth="1.5" />
        <line x1="90" y1="66" x2="90" y2="114" stroke="#3D291F" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === 'clock-totem') {
    // Row 3 (00:13): Light studio grey (#E5E4DE) backdrop with vertical twin-slat post & live sweeping clock hands
    return (
      <svg viewBox="0 0 96 124" className="w-full h-full bg-[#E5E4DE] block">
        {/* Vertical dark-slate fluted post */}
        <rect x="37" y="48" width="22" height="76" fill="#3B312B" />
        <line x1="42" y1="48" x2="42" y2="124" stroke="#221C18" strokeWidth="1.5" />
        <line x1="48" y1="48" x2="48" y2="124" stroke="#221C18" strokeWidth="1.8" />
        <line x1="54" y1="48" x2="54" y2="124" stroke="#221C18" strokeWidth="1.5" />
        {/* Large circular clock head */}
        <circle cx="48" cy="36" r="23" fill="#3B312B" />
        <circle cx="48" cy="36" r="19.5" fill="#FAF9F5" stroke="#141413" strokeWidth="1" />
        {/* Clock hour ticks */}
        <line x1="48" y1="19" x2="48" y2="22" stroke="#141413" strokeWidth="1.5" />
        <line x1="48" y1="50" x2="48" y2="53" stroke="#141413" strokeWidth="1.5" />
        <line x1="31" y1="36" x2="34" y2="36" stroke="#141413" strokeWidth="1.5" />
        <line x1="62" y1="36" x2="65" y2="36" stroke="#141413" strokeWidth="1.5" />
        {/* Hour hand */}
        <line x1="48" y1="36" x2="42" y2="26" stroke="#141413" strokeWidth="1.8" strokeLinecap="round" />
        {/* Live sweeping minute hand (GPU CSS transform) */}
        <line
          x1="48"
          y1="36"
          x2="57"
          y2="36"
          stroke="#141413"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="origin-[48px_36px] animate-[spin_10s_linear_infinite]"
        />
        <circle cx="48" cy="36" r="2" fill="#141413" />
      </svg>
    );
  }

  // Row 4 (00:13): Full-bleed rich brown/slate bespoke engraved plaque with circular emblem & 3 directional rows
  return (
    <svg viewBox="0 0 108 124" className="w-full h-full bg-[#D8D6CE] block">
      <rect x="8" y="4" width="92" height="116" rx="2" fill="#6E4730" />
      {/* Side fastener bolts */}
      <circle cx="15" cy="14" r="2.2" fill="#271810" />
      <circle cx="93" cy="14" r="2.2" fill="#271810" />
      <circle cx="15" cy="108" r="2.2" fill="#271810" />
      <circle cx="93" cy="108" r="2.2" fill="#271810" />
      {/* Top circular architectural emblem */}
      <circle cx="54" cy="36" r="14" fill="none" stroke="#FAF9F5" strokeWidth="1.6" />
      <polygon
        points="54,25 65,36 54,47 43,36"
        fill="none"
        stroke="#FAF9F5"
        strokeWidth="1.4"
        className="origin-[54px_36px] animate-[spin_16s_linear_infinite]"
      />
      {/* 3 engraved horizontal channels + white directional labels */}
      <line x1="8" y1="68" x2="100" y2="68" stroke="#3D2517" strokeWidth="2" />
      <text x="16" y="79" fontSize="6.5" fontWeight="600" fill="#FAF9F5" fontFamily="sans-serif">
        ← KERNEL 01
      </text>
      <line x1="8" y1="84" x2="100" y2="84" stroke="#3D2517" strokeWidth="2" />
      <text x="16" y="95" fontSize="6.5" fontWeight="600" fill="#FAF9F5" fontFamily="sans-serif">
        GUARD LOCK →
      </text>
      <line x1="8" y1="100" x2="100" y2="100" stroke="#3D2517" strokeWidth="2" />
      <text x="16" y="111" fontSize="6.5" fontWeight="600" fill="#FAF9F5" fontFamily="sans-serif">
        QUORUM 07 →
      </text>
    </svg>
  );
};

/**
 * 3D Hardcover Book Catalogue Cover (Exact 1:1 with 00:04, 00:07, 00:09 in Video)
 * Includes realistic left vertical book spine crease, top page-edge highlight,
 * soft book shadow, and hover 3D tilt!
 */
export const CatalogueBookCover: React.FC<{
  type: 'vision' | 'sovereignty' | 'architecture' | 'ecosystem' | 'details';
}> = ({ type }) => {
  if (type === 'vision') {
    // 1:1 with 00:04 Red-Orange Catalogue Hardcover Book
    return (
      <div className="relative w-[80px] h-[110px] sm:w-[86px] sm:h-[118px] rounded-[2px] bg-[#E54D2E] text-[#141413] p-2 pl-3 flex flex-col justify-between overflow-hidden shadow-[4px_6px_14px_rgba(0,0,0,0.22)] group-hover:rotate-[-2deg] group-hover:scale-[1.03] transition-transform duration-300 shrink-0 select-none">
        {/* Realistic Left Book Spine Crease */}
        <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-gradient-to-r from-black/25 via-black/10 to-white/15" />
        <div className="text-[7px] font-mechanik font-semibold tracking-tight text-[#141413] relative z-10">
          HMOS®
        </div>
        <svg
          viewBox="0 0 80 80"
          className="w-16 h-16 self-end -mr-2 -mb-2 text-[#141413] relative z-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
        >
          <path d="M12 76V18L44 8V76" />
          <path d="M44 34L74 26V76" />
          <rect x="20" y="24" width="6" height="8" fill="currentColor" stroke="none" />
          <rect x="30" y="21" width="6" height="8" fill="currentColor" stroke="none" />
          <rect x="20" y="38" width="6" height="8" fill="currentColor" stroke="none" />
          <rect x="30" y="35" width="6" height="8" fill="currentColor" stroke="none" />
          <rect x="20" y="52" width="16" height="7" fill="currentColor" stroke="none" />
          <line x1="52" y1="44" x2="66" y2="44" strokeWidth="4" />
          <line x1="52" y1="56" x2="66" y2="56" strokeWidth="4" />
        </svg>
      </div>
    );
  }

  if (type === 'ecosystem') {
    // 1:1 with 00:07 Sage-Mint Catalogue Hardcover Book
    return (
      <div className="relative w-[80px] h-[110px] sm:w-[86px] sm:h-[118px] rounded-[2px] bg-[#C5E8B7] text-[#141413] p-2 pl-3 flex flex-col justify-between overflow-hidden shadow-[4px_6px_14px_rgba(0,0,0,0.22)] group-hover:rotate-[-2deg] group-hover:scale-[1.03] transition-transform duration-300 shrink-0 select-none">
        <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-gradient-to-r from-black/20 via-black/10 to-white/20" />
        <div className="text-[7px] font-mechanik font-semibold tracking-tight text-[#141413] relative z-10">
          HMOS®
        </div>
        <svg
          viewBox="0 0 80 80"
          className="w-16 h-16 self-end -mr-1 -mb-1 text-[#141413] relative z-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
        >
          <line x1="30" y1="8" x2="30" y2="72" />
          <polygon points="30,10 60,24 30,38" fill="currentColor" stroke="none" />
          <circle cx="58" cy="54" r="6.5" fill="currentColor" stroke="none" />
          <path d="M6 68C22 60 46 60 76 68" strokeWidth="4" />
        </svg>
      </div>
    );
  }

  if (type === 'details') {
    // 1:1 with 00:09 Warm Silver-Grey Details Catalogue Hardcover Book
    return (
      <div className="relative w-[80px] h-[110px] sm:w-[86px] sm:h-[118px] rounded-[2px] bg-[#D1D1CD] text-[#141413] p-2 pl-3 flex flex-col justify-between overflow-hidden shadow-[4px_6px_14px_rgba(0,0,0,0.22)] group-hover:rotate-[-2deg] group-hover:scale-[1.03] transition-transform duration-300 shrink-0 select-none">
        <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-gradient-to-r from-black/20 via-black/10 to-white/20" />
        <div className="text-[7px] font-mechanik font-semibold tracking-tight text-[#141413] relative z-10">
          HMOS®
        </div>
        <svg
          viewBox="0 0 80 80"
          className="w-16 h-16 self-end -mr-1 -mb-1 text-[#141413] relative z-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        >
          <path d="M62 36V14H14V62H36" />
          <circle cx="50" cy="50" r="14" />
          <line x1="60" y1="60" x2="74" y2="74" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative w-[80px] h-[110px] sm:w-[86px] sm:h-[118px] rounded-[2px] bg-[#60A5FA] text-[#141413] p-2 pl-3 flex flex-col justify-between overflow-hidden shadow-[4px_6px_14px_rgba(0,0,0,0.22)] group-hover:rotate-[-2deg] group-hover:scale-[1.03] transition-transform duration-300 shrink-0 select-none">
      <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-gradient-to-r from-black/20 via-black/10 to-white/20" />
      <div className="text-[7px] font-mechanik font-semibold tracking-tight text-[#141413] relative z-10">
        HMOS®
      </div>
      <svg
        viewBox="0 0 80 80"
        className="w-16 h-16 self-end -mr-1 -mb-1 text-[#141413] relative z-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
      >
        <polygon points="40,10 70,40 40,70 10,40" />
        <polygon points="40,24 56,40 40,56 24,40" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
};

export const FooterCadTopIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
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

export const FooterCadSideMonolith: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
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
