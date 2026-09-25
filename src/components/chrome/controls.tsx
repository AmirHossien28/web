import * as React from 'react';
import { Check, ChevronDown, Globe, Moon, Sun } from 'lucide-react';
import type { LocaleKey } from '../../types';
import { cx } from '../../design-system/tokens';
import { localeLabel } from '../../app/navigation';
import { ui } from '../../app/i18n';

/* ==========================================================================
   ThemeToggle — icon-only control with an accessible name and 44px target
   ========================================================================== */

export const ThemeToggle: React.FC<{
  isLight: boolean;
  onToggle: () => void;
  locale: LocaleKey;
  inverse?: boolean;
}> = ({ isLight, onToggle, locale, inverse }) => {
  const t = ui(locale);
  const label = `${t.common.toggleTheme} — ${isLight ? t.common.dark : t.common.light}`;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      aria-pressed={isLight}
      className={cx(
        'inline-flex size-9 items-center justify-center rounded-sm border transition-colors duration-[140ms]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        inverse
          ? 'border-line-inverse text-ink-inverse-muted hover:bg-white/5 hover:text-ink-inverse'
          : 'border-line text-ink-3 hover:bg-neutral-hover hover:text-ink',
      )}
    >
      {isLight ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
    </button>
  );
};

/* ==========================================================================
   LanguageSwitcher — dialog-free dropdown, keyboard + click-outside aware
   ========================================================================== */

export interface LanguageSwitcherProps {
  locale: LocaleKey;
  onChange: (locale: LocaleKey) => void;
  /** `compact` renders the 2-letter code only (mobile bar / dense header) */
  variant?: 'full' | 'compact';
  inverse?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  locale,
  onChange,
  variant = 'full',
  inverse,
}) => {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const t = ui(locale);
  const locales = Object.keys(localeLabel) as LocaleKey[];

  React.useEffect(() => {
    if (!open) return;
    const onDocClick = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.common.chooseLanguage}: ${localeLabel[locale]}`}
        className={cx(
          'inline-flex h-9 items-center gap-1.5 rounded-sm border px-2.5 text-caption font-medium transition-colors duration-[140ms]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
          inverse
            ? 'border-line-inverse text-ink-inverse-muted hover:bg-white/5 hover:text-ink-inverse'
            : 'border-line text-ink-2 hover:bg-neutral-hover hover:text-ink',
        )}
      >
        <Globe size={15} aria-hidden="true" />
        <span data-numeric className={variant === 'compact' ? 'uppercase' : ''}>
          {variant === 'compact' ? locale : localeLabel[locale]}
        </span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={cx('transition-transform duration-[140ms]', open && 'rotate-180')}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.common.chooseLanguage}
          className="absolute end-0 top-[calc(100%+0.5rem)] z-dropdown w-44 animate-scale-in overflow-hidden rounded-md border border-line bg-surface p-1 text-body-sm shadow-md"
        >
          {locales.map(code => {
            const active = code === locale;
            return (
              <li key={code} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(code);
                    setOpen(false);
                  }}
                  className={cx(
                    'flex w-full items-center justify-between gap-3 rounded-xs px-3 py-2 text-start transition-colors duration-[140ms]',
                    active ? 'bg-brand-soft text-brand-ink' : 'text-ink-2 hover:bg-neutral-hover hover:text-ink',
                  )}
                >
                  <span lang={code}>{localeLabel[code]}</span>
                  {active && <Check size={15} aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
