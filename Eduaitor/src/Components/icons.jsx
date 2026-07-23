import React from "react";

/** Shared stroke icons for Pricing / Ecosystem / Contact pages */
export function Icon({ children, size = 20, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const Icons = {
  school: (
    <Icon>
      <path d="M3 21h18M5 21V8l7-4 7 4v13" />
      <path d="M9 21v-6h6v6M9 12h.01M15 12h.01" />
    </Icon>
  ),
  userPlus: (
    <Icon>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </Icon>
  ),
  book: (
    <Icon>
      <path d="M4 19.5V6a2 2 0 0 1 2-2h12v16H6a2 2 0 0 1-2-2z" />
      <path d="M8 6h8M8 10h8M8 14h5" />
    </Icon>
  ),
  ai: (
    <Icon>
      <rect x="7" y="8" width="10" height="10" rx="2" />
      <path d="M12 4v4M9 6h6M10 12h.01M14 12h.01M10 15h4" />
    </Icon>
  ),
  bot: (
    <Icon>
      <rect x="6" y="8" width="12" height="10" rx="2" />
      <path d="M12 4v4M9 13h.01M15 13h.01M9 16h6" />
    </Icon>
  ),
  users: (
    <Icon>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
  ),
  trending: (
    <Icon>
      <path d="M3 17l6-6 4 4 7-7" />
      <path d="M14 8h7v7" />
    </Icon>
  ),
  chart: (
    <Icon>
      <path d="M3 3v18h18" />
      <path d="M7 14v4M12 10v8M17 6v12" />
    </Icon>
  ),
  rupee: (
    <Icon>
      <path d="M6 5h10M6 9h10M14 5c0 4-4 6-8 6M8 15l6 5" />
    </Icon>
  ),
  chat: (
    <Icon>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </Icon>
  ),
  bus: (
    <Icon>
      <rect x="4" y="4" width="16" height="12" rx="2" />
      <path d="M6 16v2M18 16v2M8 20h.01M16 20h.01M4 12h16" />
    </Icon>
  ),
  library: (
    <Icon>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </Icon>
  ),
  bed: (
    <Icon>
      <path d="M2 18v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" />
      <path d="M2 18h20M4 12V8a2 2 0 0 1 2-2h4v6" />
    </Icon>
  ),
  cart: (
    <Icon>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M3 4h2l2.5 11h11l2-7H7" />
    </Icon>
  ),
  phone: (
    <Icon>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </Icon>
  ),
  lock: (
    <Icon>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Icon>
  ),
  link: (
    <Icon>
      <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
    </Icon>
  ),
  refresh: (
    <Icon>
      <path d="M21 12a9 9 0 1 1-2.6-6.4" />
      <path d="M21 4v6h-6" />
    </Icon>
  ),
  star: (
    <Icon>
      <path d="M12 2l2.8 6.2L22 9.3l-5 4.8 1.3 7L12 17.8 5.7 21l1.3-7-5-4.8 7.2-1.1z" />
    </Icon>
  ),
  eye: (
    <Icon>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  ),
  grid: (
    <Icon>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </Icon>
  ),
  rocket: (
    <Icon>
      <path d="M5 15c-1.5 1.5-2 4-2 4s2.5-.5 4-2c.6-.6 1-1.4 1-2.2V13H7.2c-.8 0-1.6.4-2.2 1z" />
      <path d="M13 9l5-5M9 13l-1 5 5-1 6.5-6.5a2.1 2.1 0 0 0-3-3L9 13z" />
    </Icon>
  ),
  cap: (
    <Icon>
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
    </Icon>
  ),
  calendar: (
    <Icon>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Icon>
  ),
  shield: (
    <Icon>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  ),
  check: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  ),
  globe: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </Icon>
  ),
  clock: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Icon>
  ),
  handshake: (
    <Icon>
      <path d="M11 17l-2 2a2.8 2.8 0 0 1-4-4l2-2" />
      <path d="M13 7l2-2a2.8 2.8 0 0 1 4 4l-2 2" />
      <path d="M8 12l4-4 4 4-4 4z" />
    </Icon>
  ),
  scales: (
    <Icon>
      <path d="M12 3v18M5 7h14" />
      <path d="M5 7l-3 7h6L5 7zM19 7l-3 7h6l-3-7z" />
    </Icon>
  ),
  tag: (
    <Icon>
      <path d="M20.6 13.4 12 22l-8.6-8.6a2 2 0 0 1 0-2.8L10.6 3.4a2 2 0 0 1 1.4-.6H20v7.6a2 2 0 0 1-.4 1.4z" />
      <circle cx="15.5" cy="8.5" r="1.5" />
    </Icon>
  ),
  sparkles: (
    <Icon>
      <path d="M12 3v4M12 17v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3 12h4M17 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
      <circle cx="12" cy="12" r="2.5" />
    </Icon>
  ),
  headset: (
    <Icon>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </Icon>
  ),
  teach: (
    <Icon>
      <path d="M4 19.5V6a2 2 0 0 1 2-2h10" />
      <path d="M8 6h10a2 2 0 0 1 2 2v11.5" />
      <path d="M8 10h8M8 14h5" />
    </Icon>
  ),
  box: (
    <Icon>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
      <path d="M3.3 7.9 12 13l8.7-5.1M12 22V13" />
    </Icon>
  ),
  megaphone: (
    <Icon>
      <path d="M3 11v2a4 4 0 0 0 4 4v-6a4 4 0 0 0-4 4z" />
      <path d="M7 8l13-4v14L7 14" />
    </Icon>
  ),
  award: (
    <Icon>
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 13 7 22l5-3 5 3-1.5-9" />
    </Icon>
  ),
  idCard: (
    <Icon>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <circle cx="8" cy="12" r="2" />
      <path d="M13 10h5M13 14h3" />
    </Icon>
  ),
  door: (
    <Icon>
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M3 21h18M14 12h.01" />
    </Icon>
  ),
  heart: (
    <Icon>
      <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.4l8.8-8.7a5 5 0 0 0 0-7.1z" />
    </Icon>
  ),
  building: (
    <Icon>
      <path d="M4 21V5a2 2 0 0 1 2-2h6v18M12 9h6a2 2 0 0 1 2 2v10" />
      <path d="M8 9h.01M8 13h.01M8 17h.01M16 13h.01M16 17h.01" />
    </Icon>
  ),
};
