/** 24px line icons in the brand's quiet style. Decorative; always paired with text. */
const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const Icon = {
  leaf: () => (
    <svg {...base}>
      <path d="M4 20c0-8 5-14 16-16-1 11-7 16-16 16Z" />
      <path d="M4 20c3-5 7-8 11-10" />
    </svg>
  ),
  flask: () => (
    <svg {...base}>
      <path d="M9 3h6" />
      <path d="M10 3v6L4.5 18.5A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-2.5L14 9V3" />
      <path d="M7.5 15h9" />
    </svg>
  ),
  ship: () => (
    <svg {...base}>
      <path d="M3 17l1.5 3h15L21 17" />
      <path d="M4 17l-1-5 9-2 9 2-1 5" />
      <path d="M7 10V6h10v4" />
      <path d="M12 3v3" />
    </svg>
  ),
  truck: () => (
    <svg {...base}>
      <path d="M2 7h11v9H2z" />
      <path d="M13 10h4l3 3v3h-7" />
      <circle cx="6" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </svg>
  ),
  certificate: () => (
    <svg {...base}>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5 8 21l4-2 4 2-1-7.5" />
    </svg>
  ),
  calendar: () => (
    <svg {...base}>
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  map: () => (
    <svg {...base}>
      <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  ),
  document: () => (
    <svg {...base}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h6" />
    </svg>
  ),
  arrowLeft: () => (
    <svg {...base} width={20} height={20} strokeWidth={1.8}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  ),
  arrowRight: () => (
    <svg {...base} width={20} height={20} strokeWidth={1.8}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};
