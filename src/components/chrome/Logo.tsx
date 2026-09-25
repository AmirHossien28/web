import * as React from 'react';
import { cx } from '../../design-system/tokens';

/**
 * Brand mark
 * --------------------------------------------------------------------------
 * A monogram "A" built from two wedges and a crown dot, wrapped in two tilted
 * orbit rings with a light node on each — the "creative digital solutions"
 * emblem. Every colour is a token so the mark inverts with the theme:
 *   · wedges  → text-primary + brand gradient
 *   · orbits  → border-glass-strong
 *   · nodes   → brand / cyan
 * `mode="emblem"` renders the large standalone version used by the welcome
 * gate and the language dialog; `size` controls the compact header glyph.
 */
export interface LogoProps {
  /** rendered size of the glyph (px) */
  size?: number;
  inverse?: boolean;
  /** hides the wordmark (compact headers, footers) */
  compact?: boolean;
  /** `emblem` = orbit rings animate and the mark is drawn with more detail */
  mode?: 'glyph' | 'emblem';
  className?: string;
}

const gradientId = (seed: string) => `aladdin-mark-${seed}`;

export const LogoMark: React.FC<{ size?: number; mode?: 'glyph' | 'emblem'; className?: string }> = ({
  size = 32,
  mode = 'glyph',
  className,
}) => {
  const id = React.useId().replace(/:/g, '');
  const grad = gradientId(id);
  const emblem = mode === 'emblem';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      className={cx('shrink-0 overflow-visible', className)}
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--ds-primitive-brand-400)" />
          <stop offset="1" stopColor="var(--ds-primitive-brand-700)" />
        </linearGradient>
        <radialGradient id={`${grad}-halo`}>
          <stop offset="0" stopColor="rgb(var(--ds-glow-brand) / 0.45)" />
          <stop offset="1" stopColor="rgb(var(--ds-glow-brand) / 0)" />
        </radialGradient>
      </defs>

      {emblem && <circle cx="32" cy="32" r="30" fill={`url(#${grad}-halo)`} />}

      {/* orbit rings ------------------------------------------------------- */}
      <g className={emblem ? 'animate-orbit' : undefined} style={{ transformBox: 'fill-box' }}>
        <ellipse
          cx="32"
          cy="32"
          rx="30"
          ry="13"
          transform="rotate(-24 32 32)"
          fill="none"
          stroke="var(--ds-color-border-glass-strong)"
          strokeWidth={emblem ? 0.9 : 1.4}
        />
        <circle cx="4.4" cy="39.4" r={emblem ? 1.9 : 2.6} fill="var(--ds-primitive-cyan-400)" />
      </g>
      <g
        className={emblem ? 'animate-orbit' : undefined}
        style={{ transformBox: 'fill-box', animationDirection: 'reverse', animationDuration: '38s' }}
      >
        <ellipse
          cx="32"
          cy="32"
          rx="30"
          ry="13"
          transform="rotate(28 32 32)"
          fill="none"
          stroke="var(--ds-color-border-glass-strong)"
          strokeWidth={emblem ? 0.9 : 1.4}
          opacity={emblem ? 0.8 : 0.6}
        />
        <circle cx="54.8" cy="49.2" r={emblem ? 1.9 : 2.6} fill="var(--ds-primitive-brand-400)" />
      </g>

      {/* monogram ---------------------------------------------------------- */}
      {/* left wedge — solid ink */}
      <path
        d="M31 15.5 L17 46.5 Q16 49 18.8 49 L26.4 49 Q28.6 49 29.4 46.9 L34 34.4 Z"
        fill="var(--ds-color-text-primary)"
      />
      {/* right wedge — brand gradient */}
      <path
        d="M33 15.5 L47 46.5 Q48 49 45.2 49 L37.6 49 Q35.4 49 34.6 46.9 L30 34.4 Z"
        fill={`url(#${grad})`}
      />
      {/* crown dot */}
      <circle cx="32" cy="11.5" r="3.6" fill={`url(#${grad})`} />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({ size = 34, inverse, compact, mode = 'glyph', className }) => (
  <span className={cx('inline-flex items-center gap-2.5', className)}>
    <LogoMark size={size} mode={mode} />
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
          dir="ltr"
          className={cx(
            'mt-0.5 text-[0.625rem] font-semibold uppercase leading-none tracking-[0.22em]',
            inverse ? 'text-ink-inverse-muted' : 'text-brand-ink',
          )}
        >
          ALADDIN DXP
        </span>
      </span>
    )}
  </span>
);
