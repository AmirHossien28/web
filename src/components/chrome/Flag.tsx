import * as React from 'react';
import type { LocaleKey } from '../../types';
import { cx } from '../../design-system/tokens';

/**
 * Flag — small inline SVG flags for the language picker.
 * Drawn by hand (no emoji, no image files) so they render identically on every
 * platform and stay crisp at 20–32px. Flags are decorative: the tile carries
 * the accessible name, so every flag is `aria-hidden`.
 */
const Frame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <svg
    viewBox="0 0 30 20"
    aria-hidden="true"
    className={cx('h-5 w-[30px] shrink-0 overflow-hidden rounded-[3px] shadow-xs ring-1 ring-black/10', className)}
  >
    {children}
  </svg>
);

const Iran = () => (
  <Frame>
    <rect width="30" height="20" fill="#ffffff" />
    <rect width="30" height="6.7" fill="#239f40" />
    <rect y="13.3" width="30" height="6.7" fill="#da0000" />
    <circle cx="15" cy="10" r="2.4" fill="none" stroke="#da0000" strokeWidth="1.1" />
  </Frame>
);

const UnitedKingdom = () => (
  <Frame>
    <rect width="30" height="20" fill="#012169" />
    <path d="M0 0 L30 20 M30 0 L0 20" stroke="#ffffff" strokeWidth="4" />
    <path d="M0 0 L30 20 M30 0 L0 20" stroke="#c8102e" strokeWidth="1.6" />
    <path d="M15 0 V20 M0 10 H30" stroke="#ffffff" strokeWidth="6" />
    <path d="M15 0 V20 M0 10 H30" stroke="#c8102e" strokeWidth="3.4" />
  </Frame>
);

const Emirates = () => (
  <Frame>
    <rect width="30" height="20" fill="#ffffff" />
    <rect width="30" height="6.7" fill="#00732f" />
    <rect y="13.3" width="30" height="6.7" fill="#000000" />
    <rect width="8" height="20" fill="#ff0000" />
  </Frame>
);

const Turkiye = () => (
  <Frame>
    <rect width="30" height="20" fill="#e30a17" />
    <circle cx="11.5" cy="10" r="5" fill="#ffffff" />
    <circle cx="12.8" cy="10" r="4" fill="#e30a17" />
    <polygon
      points="17.6,10 15.3,10.8 15.4,8.4 16.9,10.3 15.4,11.6 15.3,9.2"
      fill="#ffffff"
      transform="translate(1.2 0)"
    />
  </Frame>
);

const Germany = () => (
  <Frame>
    <rect width="30" height="6.7" fill="#000000" />
    <rect y="6.7" width="30" height="6.7" fill="#dd0000" />
    <rect y="13.3" width="30" height="6.7" fill="#ffce00" />
  </Frame>
);

const FLAGS: Record<LocaleKey, React.FC> = {
  fa: Iran,
  en: UnitedKingdom,
  ar: Emirates,
  tr: Turkiye,
  de: Germany,
};

export const Flag: React.FC<{ locale: LocaleKey }> = ({ locale }) => {
  const Component = FLAGS[locale];
  return <Component />;
};

/** Native name + English name + ISO code — the tile's three text rows. */
export const LANGUAGE_META: Record<LocaleKey, { native: string; english: string; code: string }> = {
  fa: { native: 'فارسی', english: 'Persian', code: 'FA' },
  en: { native: 'English', english: 'English', code: 'EN' },
  ar: { native: 'العربية', english: 'Arabic', code: 'AR' },
  tr: { native: 'Türkçe', english: 'Turkish', code: 'TR' },
  de: { native: 'Deutsch', english: 'German', code: 'DE' },
};
