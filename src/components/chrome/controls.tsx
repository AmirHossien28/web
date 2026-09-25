import * as React from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { Flag } from './Flag';
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
   LanguageButton — opens the "Global experience" dialog (LanguageModal)
   ========================================================================== */

export interface LanguageButtonProps {
  locale: LocaleKey;
  onOpen: () => void;
  /** `compact` renders the 2-letter code only (mobile bar / dense header) */
  variant?: 'full' | 'compact' | 'icon';
  inverse?: boolean;
}

export const LanguageButton: React.FC<LanguageButtonProps> = ({ locale, onOpen, variant = 'full', inverse }) => {
  const t = ui(locale);
  const label = `${t.common.chooseLanguage}: ${localeLabel[locale]}`;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={label}
      title={label}
      className={cx(
        'inline-flex h-9 items-center gap-1.5 rounded-sm border text-caption font-medium transition-colors duration-[140ms]',
        variant === 'icon' ? 'px-2' : 'px-2.5',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        inverse
          ? 'border-line-inverse text-ink-inverse-muted hover:bg-white/5 hover:text-ink-inverse'
          : 'border-line text-ink-2 hover:bg-neutral-hover hover:text-ink',
      )}
    >
      <Flag locale={locale} />
      {variant !== 'icon' && (
        <span data-numeric className={variant === 'compact' ? 'uppercase' : ''}>
          {variant === 'compact' ? locale : localeLabel[locale]}
        </span>
      )}
      {variant !== 'icon' && <Globe size={14} aria-hidden="true" className="text-ink-3" />}
    </button>
  );
};
