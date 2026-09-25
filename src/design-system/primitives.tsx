/**
 * Aladdin DXP — Design System
 * Layer 3: PRIMITIVES
 *
 * Component primitives. Every visual decision here reads from a semantic token
 * (`bg-surface`, `text-ink-3`, `border-line`) — never from a raw value — so the
 * light/dark switch and any future rebrand happen in `tokens.css` alone.
 */
import * as React from 'react';
import { cx, type ControlSize, type Emphasis, type Tone } from './tokens';

/* ========================================================================== */
/* Button                                                                     */
/* ========================================================================== */

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ' +
  'transition-[background-color,border-color,color,box-shadow] duration-[140ms] ease-[cubic-bezier(0.2,0,0,1)] ' +
  'disabled:pointer-events-none disabled:opacity-45 select-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus';

const BUTTON_SIZES: Record<ControlSize, string> = {
  /* 44 / 40 / 34 px tall — all clear of the 24px WCAG 2.2 target minimum */
  lg: 'h-11 px-6 text-body-sm rounded-md',
  md: 'h-10 px-5 text-body-sm rounded-md',
  sm: 'h-9 px-3.5 text-caption rounded-sm',
};

const BUTTON_EMPHASIS: Record<Emphasis, Record<Tone, string>> = {
  solid: {
    neutral: 'bg-inverse text-ink-inverse hover:opacity-90 border border-transparent',
    brand: 'bg-brand text-on-brand hover:bg-brand-hover border border-transparent',
    success: 'bg-success-ink text-on-brand hover:opacity-90 border border-transparent',
    warning: 'bg-warning-ink text-on-brand hover:opacity-90 border border-transparent',
    danger: 'bg-danger-ink text-on-brand hover:opacity-90 border border-transparent',
    info: 'bg-brand text-on-brand hover:bg-brand-hover border border-transparent',
  },
  outline: {
    neutral: 'bg-surface text-ink border border-line-strong hover:bg-neutral-hover',
    brand: 'bg-surface text-brand-ink border border-brand/35 hover:bg-brand-soft',
    success: 'bg-surface text-success-ink border border-success-line hover:bg-success',
    warning: 'bg-surface text-warning-ink border border-warning-line hover:bg-warning',
    danger: 'bg-surface text-danger-ink border border-danger-line hover:bg-danger',
    info: 'bg-surface text-brand-ink border border-info-line hover:bg-info',
  },
  ghost: {
    neutral: 'bg-transparent text-ink-2 hover:bg-neutral-hover hover:text-ink border border-transparent',
    brand: 'bg-transparent text-brand-ink hover:bg-brand-soft border border-transparent',
    success: 'bg-transparent text-success-ink hover:bg-success border border-transparent',
    warning: 'bg-transparent text-warning-ink hover:bg-warning border border-transparent',
    danger: 'bg-transparent text-danger-ink hover:bg-danger border border-transparent',
    info: 'bg-transparent text-brand-ink hover:bg-info border border-transparent',
  },
  link: {
    neutral: 'bg-transparent text-ink-2 hover:text-brand-ink underline-offset-4 hover:underline p-0 h-auto',
    brand: 'bg-transparent text-brand-ink hover:underline underline-offset-4 p-0 h-auto',
    success: 'bg-transparent text-success-ink hover:underline underline-offset-4 p-0 h-auto',
    warning: 'bg-transparent text-warning-ink hover:underline underline-offset-4 p-0 h-auto',
    danger: 'bg-transparent text-danger-ink hover:underline underline-offset-4 p-0 h-auto',
    info: 'bg-transparent text-brand-ink hover:underline underline-offset-4 p-0 h-auto',
  },
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: Tone;
  emphasis?: Emphasis;
  size?: ControlSize;
  /** square, label-less control: enforces a 44px hit area */
  iconOnly?: boolean;
  /** stretches to the container — the primary action of a stacked mobile form */
  block?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { tone = 'neutral', emphasis = 'solid', size = 'md', iconOnly, block, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      data-ds="button"
      className={cx(
        BUTTON_BASE,
        emphasis !== 'link' && BUTTON_SIZES[size],
        BUTTON_EMPHASIS[emphasis][tone],
        iconOnly && 'aspect-square px-0 w-11',
        block && 'w-full',
        className,
      )}
      {...rest}
    />
  );
});

/* ========================================================================== */
/* Badge — compact metadata label                                             */
/* ========================================================================== */

const BADGE_TONES: Record<Tone, string> = {
  neutral: 'bg-muted text-ink-2 border-line',
  brand: 'bg-brand-soft text-brand-ink border-info-line',
  success: 'bg-success text-success-ink border-success-line',
  warning: 'bg-warning text-warning-ink border-warning-line',
  danger: 'bg-danger text-danger-ink border-danger-line',
  info: 'bg-info text-brand-ink border-info-line',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** `dot` adds a status pip; `square` drops the pill radius (tabular contexts) */
  variant?: 'pill' | 'square';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  tone = 'neutral',
  variant = 'pill',
  dot,
  className,
  children,
  ...rest
}) => (
  <span
    data-ds="badge"
    className={cx(
      'inline-flex items-center gap-1.5 border px-2.5 h-6 text-caption font-medium leading-none',
      variant === 'pill' ? 'rounded-full' : 'rounded-xs',
      BADGE_TONES[tone],
      className,
    )}
    {...rest}
  >
    {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
    {children}
  </span>
);

/* ========================================================================== */
/* Card — the single container primitive                                      */
/* ========================================================================== */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** surface level, not a look: canvas/surface/subtle/inverse */
  level?: 'surface' | 'subtle' | 'inverse';
  /** hairline by default; elevation is reserved for floating layers */
  elevation?: 'flat' | 'raised' | 'dropdown';
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { level = 'surface', elevation = 'flat', interactive, padding = 'md', className, ...rest },
  ref,
) {
  const levels = {
    surface: 'bg-surface border border-line text-ink',
    subtle: 'bg-subtle border border-line text-ink',
    inverse: 'bg-inverse border border-line-inverse text-ink-inverse',
  };
  const elevations = {
    flat: '',
    raised: 'shadow-xs',
    dropdown: 'shadow-md',
  };
  const paddings = { none: '', sm: 'p-4', md: 'p-5 sm:p-6', lg: 'p-6 sm:p-8' };

  return (
    <div
      ref={ref}
      data-ds="card"
      className={cx(
        'rounded-lg',
        levels[level],
        elevations[elevation],
        paddings[padding],
        interactive &&
          'transition-[border-color,background-color,box-shadow] duration-[140ms] ease-[cubic-bezier(0.2,0,0,1)] hover:border-line-bold hover:shadow-sm',
        className,
      )}
      {...rest}
    />
  );
});

/* ========================================================================== */
/* Section — enforces the page rhythm and the container contract              */
/* ========================================================================== */

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  /** alternating background bands give long pages a scannable structure */
  level?: 'canvas' | 'subtle' | 'surface' | 'inverse';
  spacing?: 'none' | 'sm' | 'md';
  /** `bordered` draws a hairline separator instead of using a background shift */
  bordered?: boolean;
  as?: 'section' | 'div';
}

export const Section: React.FC<SectionProps> = ({
  level = 'canvas',
  spacing = 'md',
  bordered,
  as: Tag = 'section',
  className,
  children,
  ...rest
}) => {
  const levels = {
    canvas: 'bg-canvas',
    subtle: 'bg-subtle',
    surface: 'bg-surface',
    inverse: 'bg-inverse text-ink-inverse',
  };
  const spacings = { none: '', sm: 'py-10 md:py-14', md: 'section-rhythm' };

  return (
    <Tag
      data-ds="section"
      className={cx(levels[level], spacings[spacing], bordered && 'border-t border-line', className)}
      {...rest}
    >
      <div className="container-page">{children}</div>
    </Tag>
  );
};

/* ========================================================================== */
/* SectionHeading — one pattern for every section on the site                 */
/* ========================================================================== */

export interface SectionHeadingProps {
  overline?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'start' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  onInverse?: boolean;
  className?: string;
  actions?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  overline,
  title,
  highlight,
  description,
  align = 'start',
  as: Tag = 'h2',
  onInverse,
  className,
  actions,
}) => {
  /* split the title so the highlighted phrase keeps its exact wording/order */
  const idx = highlight ? title.indexOf(highlight) : -1;
  const before = idx >= 0 ? title.slice(0, idx) : title;
  const after = idx >= 0 ? title.slice(idx + (highlight?.length ?? 0)) : '';

  return (
    <div
      className={cx(
        'flex flex-col gap-6',
        align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cx('flex flex-col gap-3', align === 'center' ? 'max-w-3xl items-center' : 'max-w-3xl')}>
        {overline && (
          <span
            className={cx(
              'text-overline font-semibold uppercase tracking-normal',
              onInverse ? 'text-ink-inverse-muted' : 'text-brand-ink',
            )}
          >
            {overline}
          </span>
        )}
        <Tag
          className={cx(
            Tag === 'h1' ? 'text-title-1 md:text-display-2' : 'text-title-1 md:text-title-1',
            'text-balance',
            onInverse && 'text-ink-inverse',
          )}
        >
          {before}
          {idx >= 0 && <span className="text-brand-ink">{highlight}</span>}
          {after}
        </Tag>
        {description && (
          <p className={cx('text-body-sm md:text-body', onInverse ? 'text-ink-inverse-muted' : 'text-ink-2')}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
};

/* ========================================================================== */
/* Stat — the numeric proof unit used in hero, case studies and dashboards     */
/* ========================================================================== */

export interface StatProps {
  value: string;
  label: string;
  hint?: string;
  tone?: 'default' | 'brand' | 'inverse';
  className?: string;
}

export const Stat: React.FC<StatProps> = ({ value, label, hint, tone = 'default', className }) => (
  <div className={cx('flex flex-col gap-1', className)} data-ds="stat">
    <span
      data-numeric
      className={cx(
        'text-title-1 font-bold leading-none',
        tone === 'brand' && 'text-brand-ink',
        tone === 'inverse' && 'text-ink-inverse',
        tone === 'default' && 'text-ink',
      )}
    >
      {value}
    </span>
    <span className={cx('text-caption', tone === 'inverse' ? 'text-ink-inverse-muted' : 'text-ink-3')}>
      {label}
    </span>
    {hint && <span className="text-caption text-ink-3">{hint}</span>}
  </div>
);

/* ========================================================================== */
/* Field — label + control + error, accessible by construction                */
/* ========================================================================== */

export const fieldControlClasses =
  'w-full rounded-sm border bg-surface px-3.5 py-2.5 text-body-sm text-ink ' +
  'border-line-strong transition-[border-color,box-shadow] duration-[140ms] ' +
  'hover:border-line-bold focus:border-brand focus:outline-2 focus:outline-offset-0 focus:outline-focus ' +
  'placeholder:text-ink-4 disabled:opacity-50 disabled:cursor-not-allowed';

export interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  /** LTR runs (phone, e-mail, URL) inside an RTL label — isolates bidi */
  ltrInput?: boolean;
  children: (props: {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    dir?: 'ltr';
    className: string;
  }) => React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ id, label, hint, error, required, ltrInput, children }) => {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-caption font-medium text-ink-2">
        {label}
        {required && (
          <span aria-hidden="true" className="text-danger-ink ms-1">
            *
          </span>
        )}
      </label>
      {children({
        id,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
        dir: ltrInput ? 'ltr' : undefined,
        className: cx(fieldControlClasses, ltrInput && 'text-start', error && 'border-danger-line'),
      })}
      {error ? (
        <p id={errorId} role="alert" className="text-caption text-danger-ink">
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="text-caption text-ink-3">
            {hint}
          </p>
        )
      )}
    </div>
  );
};

/* ========================================================================== */
/* Meter — one bar chart component for scores, speeds and progress            */
/* ========================================================================== */

export interface MeterProps {
  value: number;
  max?: number;
  label: string;
  /** explicit value text keeps the number readable for screen readers */
  valueText?: string;
  tone?: 'brand' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const Meter: React.FC<MeterProps> = ({
  value,
  max = 100,
  label,
  valueText,
  tone = 'brand',
  className,
}) => {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fills = {
    brand: 'bg-data-1',
    success: 'bg-success-ink',
    warning: 'bg-warning-ink',
    danger: 'bg-danger-ink',
  };

  return (
    <div className={cx('flex flex-col gap-2', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-caption text-ink-2">{label}</span>
        {valueText && (
          <span data-numeric className="text-caption font-semibold text-ink">
            {valueText}
          </span>
        )}
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={valueText}
        className="h-1.5 w-full overflow-hidden rounded-full bg-data-track"
      >
        <div
          className={cx('h-full rounded-full transition-[width] duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)]', fills[tone])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

/* ========================================================================== */
/* Disclosure — accordion row with correct ARIA wiring                        */
/* ========================================================================== */

export interface DisclosureProps {
  id: string;
  question: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  defaultIcon?: React.ReactNode;
}

export const Disclosure: React.FC<DisclosureProps> = ({ id, question, children, open, onToggle, defaultIcon }) => (
  <div className="border-b border-line last:border-b-0">
    <h3>
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-start text-body-sm font-semibold text-ink transition-colors duration-[140ms] hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <span>{question}</span>
        <span
          aria-hidden="true"
          className={cx(
            'shrink-0 text-ink-3 transition-transform duration-[200ms] ease-[cubic-bezier(0.2,0,0,1)]',
            open && 'rotate-180 text-brand-ink',
          )}
        >
          {defaultIcon}
        </span>
      </button>
    </h3>
    <div
      id={`${id}-panel`}
      role="region"
      aria-labelledby={`${id}-trigger`}
      hidden={!open}
      className="pb-6 text-body-sm text-ink-2"
    >
      {children}
    </div>
  </div>
);

/* ========================================================================== */
/* Icon_frame — consistent 44px heading glyph for feature/service blocks      */
/* ========================================================================== */

export interface IconFrameProps {
  tone?: 'brand' | 'neutral' | 'inverse';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const IconFrame: React.FC<IconFrameProps> = ({ tone = 'brand', size = 'md', children, className }) => (
  <span
    aria-hidden="true"
    className={cx(
      'inline-flex shrink-0 items-center justify-center border',
      size === 'md' ? 'size-11 rounded-md' : 'size-9 rounded-sm',
      tone === 'brand' && 'bg-brand-soft text-brand-ink border-info-line',
      tone === 'neutral' && 'bg-muted text-ink-2 border-line',
      tone === 'inverse' && 'bg-white/5 text-ink-inverse border-line-inverse',
      className,
    )}
  >
    {children}
  </span>
);
