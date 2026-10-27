import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

export const Bag = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 8h12l1.2 11.2a1.6 1.6 0 0 1-1.6 1.8H6.4a1.6 1.6 0 0 1-1.6-1.8L6 8Z" />
    <path d="M9.2 8V6.4a2.8 2.8 0 0 1 5.6 0V8" />
  </svg>
);

export const Search = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.2" />
    <path d="m16 16 4.2 4.2" />
  </svg>
);

export const Heart = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 20.2s-7.6-4.5-7.6-9.5A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 7.6 2.9c0 5-7.6 9.5-7.6 9.5Z" />
  </svg>
);

export const HeartFilled = (p: P) => (
  <svg {...base} fill="currentColor" {...p}>
    <path d="M12 20.2s-7.6-4.5-7.6-9.5A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 7.6 2.9c0 5-7.6 9.5-7.6 9.5Z" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 12h15M14 6.5l5.5 5.5L14 17.5" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
);

export const ArrowLeft = (p: P) => (
  <svg {...base} {...p}>
    <path d="M19.5 12h-15M10 6.5 4.5 12 10 17.5" />
  </svg>
);

export const ChevronDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
  </svg>
);

export const Plus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </svg>
);

export const Minus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5.5 12h13" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path d="m4.8 12.4 4.6 4.6L19.2 7.2" />
  </svg>
);

export const Star = ({ filled = true, ...p }: P & { filled?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={1.3}
    aria-hidden
    {...p}
  >
    <path d="M12 3.6l2.53 5.42 5.67.72-4.17 3.94 1.09 5.72L12 16.62l-5.12 2.78 1.09-5.72L3.8 9.74l5.67-.72L12 3.6Z" />
  </svg>
);

export const StarHalf = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <defs>
      <linearGradient id="halfGrad">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      d="M12 3.6l2.53 5.42 5.67.72-4.17 3.94 1.09 5.72L12 16.62l-5.12 2.78 1.09-5.72L3.8 9.74l5.67-.72L12 3.6Z"
      fill="url(#halfGrad)"
      stroke="currentColor"
      strokeWidth={1.3}
    />
  </svg>
);

export const Truck = (p: P) => (
  <svg {...base} {...p}>
    <path d="M2.8 7.2h9.4v9.6H2.8zM12.2 10.4h4l3 3.2v3.2h-7z" />
    <circle cx="6.6" cy="18.4" r="1.6" />
    <circle cx="16.4" cy="18.4" r="1.6" />
  </svg>
);

export const Return = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.4 10.4A8 8 0 1 1 5 16.4" />
    <path d="M4 5.6v5h5" />
  </svg>
);

export const Lock = (p: P) => (
  <svg {...base} {...p}>
    <rect x="4.8" y="10.4" width="14.4" height="9.6" rx="2" />
    <path d="M8.4 10.4V7.8a3.6 3.6 0 0 1 7.2 0v2.6" />
  </svg>
);

export const Menu = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h11" />
  </svg>
);

export const Filter = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.5 6.5h17M6.5 12h11M10 17.5h4" />
  </svg>
);

export const Trash = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 6.8h15M9.4 6.8V4.9h5.2v1.9M6.6 6.8l.9 12.4h9l.9-12.4" />
  </svg>
);

export const Sparkle = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5M6.2 6.2l3 3M14.8 14.8l3 3M17.8 6.2l-3 3M9.2 14.8l-3 3" />
  </svg>
);

export const Globe = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M3.4 12h17.2M12 3.4c2.3 2.4 3.4 5.4 3.4 8.6S14.3 18.2 12 20.6c-2.3-2.4-3.4-5.4-3.4-8.6S9.7 5.8 12 3.4Z" />
  </svg>
);

export const Ruler = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 14.6 14.6 4l5.4 5.4L9.4 20 4 14.6Z" />
    <path d="m9.2 9.4 2 2M12 6.6l2 2M6.4 12.2l2 2" />
  </svg>
);

export const Store = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 9.6V20h16V9.6" />
    <path d="M3.2 9.6 5 4h14l1.8 5.6a3 3 0 0 1-5.8 1.2 3 3 0 0 1-6 0 3 3 0 0 1-5.8-1.2Z" />
  </svg>
);

export const CreditCard = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.8" y="5.4" width="18.4" height="13.2" rx="2.2" />
    <path d="M2.8 10h18.4M6.4 14.6h3.2" />
  </svg>
);

export const Bolt = (p: P) => (
  <svg {...base} {...p}>
    <path d="M13.4 2.8 4.6 13.6h5.6l-.6 7.6 8.8-10.8h-5.6l.6-7.6Z" />
  </svg>
);

export const Info = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 10.8v5.6M12 7.8v.6" />
  </svg>
);

export const Play = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8.5 5.8v12.4L19 12 8.5 5.8Z" />
  </svg>
);

export const Quote = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M9.4 5.4c-3.4 1.4-5.4 4-5.4 7.9 0 3.3 1.8 5.3 4.4 5.3 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.3-1.6 1.6-3 3.4-3.9L9.4 5.4Zm9 0c-3.4 1.4-5.4 4-5.4 7.9 0 3.3 1.8 5.3 4.4 5.3 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.3-1.6 1.6-3 3.4-3.9l-1.9-2.3Z" />
  </svg>
);
