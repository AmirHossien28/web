import * as React from 'react';
import { cx } from '../../design-system/tokens';

/**
 * Wordmark: geometric mark + bilingual lockup.
 * The mark is drawn from the 4px grid unit so it optically matches the UI text
 * at every size: an offset square (the "atelier" plate) with a brand-coloured
 * inset corner (the "aligned" pixel).
 */
export interface LogoProps {
  /** rendered size of the glyph */
  size?: number;
  inverse?: boolean;
  /** hides the Persian wordmark (compact headers, footers) */
  compact?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 32, inverse, compact, className }) => (
  <span className={cx('inline-flex items-center gap-2.5', className)}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="1.25"
        y="1.25"
        width="29.5"
        height="29.5"
        rx="8"
        fill={inverse ? 'rgba(255,255,255,0.04)' : 'var(--ds-color-bg-surface)'}
        stroke={inverse ? 'rgba(255,255,255,0.22)' : 'var(--ds-color-border-default)'}
        strokeWidth="1.5"
      />
      <path
        d="M9.5 22.5V12.2c0-1.6 1.3-2.9 2.9-2.9h7.3"
        fill="none"
        stroke="var(--ds-color-text-primary)"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <rect x="13.6" y="17" width="9.9" height="5.5" rx="2.75" fill="var(--ds-color-bg-brand)" />
    </svg>
    {!compact && (
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            'text-[1.0625rem] font-bold leading-tight',
            inverse ? 'text-ink-inverse' : 'text-ink',
          )}
        >
          علاءالدین
        </span>
        <span
          data-numeric
          className={cx(
            'mt-0.5 text-[0.625rem] font-medium leading-none',
            inverse ? 'text-ink-inverse-muted' : 'text-ink-3',
          )}
        >
          ALADDIN DXP
        </span>
      </span>
    )}
  </span>
);
