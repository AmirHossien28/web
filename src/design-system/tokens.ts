/**
 * Aladdin DXP — Design System
 * Layer 2: TOKEN API
 *
 * The CSS custom properties in `tokens.css` are the source of truth. This module
 * gives TypeScript consumers a typed, autocompletable handle on the same names so
 * that class strings, charts and inline styles cannot drift from the tokens.
 *
 * Naming mirrors the CSS exactly: `ds.space[6]` ↔ `--ds-primitive-space-6`.
 */

/* -------------------------------------------------------------------------- */
/* Scale shapes                                                                */
/* -------------------------------------------------------------------------- */

export const ds = {
  /** 4px base unit — every layout value is a multiple of this scale */
  space: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },
  /** vertical rhythm between sections */
  rhythm: {
    section: 'var(--ds-space-section-y)',
    sectionLg: 'var(--ds-space-section-y-lg)',
    gutter: 'var(--ds-space-gutter)',
  },
  radius: {
    xs: '0.375rem',
    sm: '0.5rem',
    md: '0.625rem',
    lg: '0.875rem',
    xl: '1.125rem',
    full: '999px',
  },
  /** structural grid: 12 columns, 8px rhythm, fixed gutters */
  grid: {
    columnsMobile: 4,
    columnsTablet: 8,
    columnsDesktop: 12,
    container: '78rem',
    prose: '46rem',
  },
  /** breakpoints mirror Tailwind defaults so utilities stay predictable */
  breakpoint: { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },
  duration: { instant: 90, fast: 140, base: 200, slow: 320 },
  /** stacking contract — nothing may invent a z-index outside this list */
  z: { base: 0, sticky: 30, dropdown: 35, drawer: 40, modal: 50, toast: 60 },
} as const;

/* -------------------------------------------------------------------------- */
/* Numeric formatting (Persian / locale aware)                                 */
/* -------------------------------------------------------------------------- */

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const;
const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] as const;

export type DigitMode = 'fa' | 'ar' | 'latn';

export const toLocalDigits = (input: string | number, mode: DigitMode = 'fa'): string => {
  const raw = String(input);
  if (mode === 'latn') return raw;
  const table = mode === 'ar' ? ARABIC_DIGITS : PERSIAN_DIGITS;
  return raw.replace(/[0-9]/g, d => table[Number(d)]);
};

/**
 * Formats an amount for the UI.
 * Persian convention: Latin grouping separators stay in the number, the unit
 * («تومان») follows the digits, and the run is isolated so bidi cannot reorder it.
 */
export const formatAmount = (
  value: number,
  opts: { mode?: DigitMode; unit?: string; compact?: boolean } = {},
): string => {
  const { mode = 'fa', unit, compact = false } = opts;
  let body: string;

  if (compact && value >= 1_000_000_000) body = `${(value / 1_000_000_000).toFixed(1)}B`;
  else if (compact && value >= 1_000_000) body = `${(value / 1_000_000).toFixed(1)}M`;
  else body = value.toLocaleString('en-US');

  const localised = toLocalDigits(body, mode);
  return unit ? `${localised} ${unit}` : localised;
};

export const formatNumber = (value: number, mode: DigitMode = 'fa'): string =>
  toLocalDigits(value.toLocaleString('en-US'), mode);

/** keeps phones, e-mails, codes and URLs readable inside RTL paragraphs */
export const isolateLtr = (value: string): string => `\u2066${value}\u2069`;

/* -------------------------------------------------------------------------- */
/* Shared component contracts                                                  */
/* -------------------------------------------------------------------------- */

export type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
export type Emphasis = 'solid' | 'outline' | 'ghost' | 'link';
export type ControlSize = 'sm' | 'md' | 'lg';
export type HeadingLevel = 1 | 2 | 3 | 4;
export type Direction = 'rtl' | 'ltr';

/** Surface elevation is expressed as intent, mapped to tokens inside components. */
export type SurfaceLevel = 'canvas' | 'surface' | 'subtle' | 'inverse';

/**
 * Every component that renders a "pattern" (the repeating section header used
 * across the site) shares this shape so the rhythm of the page never varies.
 */
export interface SectionHeaderCopy {
  overline?: string;
  title: string;
  /** substring of `title` rendered with the brand accent */
  highlight?: string;
  description?: string;
}

export const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');
