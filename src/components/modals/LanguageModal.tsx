import * as React from 'react';
import { Check, Search, X } from 'lucide-react';
import type { LocaleKey } from '../../types';
import { cx } from '../../design-system/tokens';
import { ui } from '../../app/i18n';
import { Flag, LANGUAGE_META } from '../chrome/Flag';

/**
 * Language dialog
 * --------------------------------------------------------------------------
 * The "Global experience" picker: a glass panel over a blurred page, a search
 * field that filters by native name, English name or ISO code, and a grid of
 * flag tiles. Selecting a tile switches the locale immediately and closes the
 * dialog. Fully keyboard operable: focus is trapped, Escape closes, the current
 * language is announced with `aria-current`.
 */

export const LOCALES: LocaleKey[] = ['fa', 'en', 'ar', 'tr', 'de'];

/* -------------------------------------------------------------------------- */
/* LanguageTile — shared by the dialog and the welcome gate                    */
/* -------------------------------------------------------------------------- */

export const LanguageTile: React.FC<{
  code: LocaleKey;
  active?: boolean;
  onSelect: (code: LocaleKey) => void;
  size?: 'md' | 'lg';
  autoFocus?: boolean;
}> = ({ code, active, onSelect, size = 'md', autoFocus }) => {
  const meta = LANGUAGE_META[code];
  return (
    <button
      type="button"
      lang={code}
      autoFocus={autoFocus}
      aria-current={active ? 'true' : undefined}
      onClick={() => onSelect(code)}
      className={cx(
        'group relative flex w-full items-center gap-3 rounded-md text-start transition-[border-color,background-color,box-shadow,transform] duration-[200ms] ease-[cubic-bezier(0.2,0,0,1)]',
        'glass hover:border-glass-line-strong hover:shadow-glow hover:-translate-y-0.5',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        size === 'lg' ? 'min-h-16 px-4 py-3.5' : 'min-h-14 px-3.5 py-3',
        active && 'border-glass-line-strong bg-brand-soft',
      )}
    >
      <Flag locale={code} />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className={cx('truncate font-semibold text-ink', size === 'lg' ? 'text-body-sm' : 'text-caption')}>
          {meta.native}
        </span>
        <span data-numeric dir="ltr" className="mt-0.5 truncate text-start text-[0.6875rem] text-ink-3">
          {meta.english} · {meta.code}
        </span>
      </span>
      {active && (
        <span className="ms-auto inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-on-brand">
          <Check size={12} aria-hidden="true" />
        </span>
      )}
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/* Dialog                                                                      */
/* -------------------------------------------------------------------------- */

export interface LanguageModalProps {
  isOpen: boolean;
  locale: LocaleKey;
  onClose: () => void;
  onSelect: (locale: LocaleKey) => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, locale, onClose, onSelect }) => {
  const t = ui(locale);
  const [query, setQuery] = React.useState('');
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    setQuery('');
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter(el => el.offsetParent !== null);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const visible = LOCALES.filter(code => {
    if (!q) return true;
    const meta = LANGUAGE_META[code];
    return (
      meta.native.toLowerCase().includes(q) ||
      meta.english.toLowerCase().includes(q) ||
      meta.code.toLowerCase().includes(q) ||
      code.includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <button
        type="button"
        aria-label={t.forms.close}
        onClick={onClose}
        tabIndex={-1}
        className="fixed inset-0 cursor-default animate-fade-in bg-overlay backdrop-blur-md"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="language-title"
        className="relative w-full max-w-3xl animate-scale-in overflow-hidden rounded-xl glass-strong"
      >
        {/* light sources behind the glass */}
        <span aria-hidden="true" className="pointer-events-none absolute -top-24 -start-16 size-72 rounded-full bg-glow-brand blur-2xl" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-32 -end-16 size-80 rounded-full bg-glow-cyan blur-3xl" />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="ds-overline text-brand-ink">{t.language.overline}</p>
              <h2 id="language-title" className="mt-2 text-title-1 sm:text-display-2">
                {t.language.title}
              </h2>
              <p className="mt-2 max-w-xl text-caption text-ink-3">{t.language.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.forms.close}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full glass text-ink-2 transition-colors duration-[140ms] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <label className="relative mt-6 block">
            <span className="sr-only">{t.language.search}</span>
            <Search
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-ink-3"
            />
            <input
              type="search"
              autoFocus
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder={t.language.search}
              className="h-12 w-full rounded-md border border-glass-line-strong bg-glass ps-11 pe-4 text-body-sm text-ink placeholder:text-ink-4 transition-[border-color,box-shadow] duration-[140ms] focus:border-brand focus:outline-2 focus:outline-offset-0 focus:outline-focus"
            />
          </label>

          {visible.length ? (
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label={t.common.chooseLanguage}>
              {visible.map(code => (
                <li key={code}>
                  <LanguageTile
                    code={code}
                    active={code === locale}
                    onSelect={next => {
                      onSelect(next);
                      onClose();
                    }}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p role="status" className="mt-6 rounded-md glass px-4 py-6 text-center text-body-sm text-ink-3">
              {t.language.noResults}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
