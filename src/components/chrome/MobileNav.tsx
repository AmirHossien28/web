import * as React from 'react';
import { ChevronDown, Mail, MapPin, MessageCircle, Phone, X } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { cx } from '../../design-system/tokens';
import { Button } from '../../design-system/primitives';
import { activeNavFor, PAGE_SLUG, PRIMARY_NAV } from '../../app/navigation';
import { ui, localiseDigits } from '../../app/i18n';
import { Logo } from './Logo';
import { LanguageButton, ThemeToggle } from './controls';

/**
 * Mobile navigation drawer.
 * Full-height panel anchored to the inline end, with a focus trap, Escape to
 * close, background scroll lock and a real <dialog>-like ARIA contract.
 */
export interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  currentPage: PageId;
  locale: LocaleKey;
  isLight: boolean;
  onNavigate: (page: PageId) => void;
  onOpenLanguage: () => void;
  onThemeToggle: () => void;
  onOpenConsult: () => void;
  hotline: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  open,
  onClose,
  currentPage,
  locale,
  isLight,
  onNavigate,
  onOpenLanguage,
  onThemeToggle,
  onOpenConsult,
  hotline,
}) => {
  const t = ui(locale);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = React.useState<string | null>('about-contact');

  /* scroll lock + escape + focus trap while open */
  React.useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter(el => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
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

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const activeId = activeNavFor(currentPage);

  return (
    <div className="fixed inset-0 z-drawer lg:hidden" role="dialog" aria-modal="true" aria-label={t.common.menu}>
      <button
        type="button"
        aria-label={t.common.closeMenu}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-overlay backdrop-blur-sm animate-fade-in"
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        className="absolute inset-y-0 end-0 flex w-[min(23rem,88vw)] flex-col border-s border-glass-line bg-glass-strong shadow-xl backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <Logo size={28} />
          <div className="flex items-center gap-2">
            <ThemeToggle isLight={isLight} onToggle={onThemeToggle} locale={locale} />
            <button
              type="button"
              onClick={onClose}
              aria-label={t.common.closeMenu}
              className="inline-flex size-9 items-center justify-center rounded-sm border border-line text-ink-2 transition-colors duration-[140ms] hover:bg-neutral-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav aria-label={t.common.menu} className="flex-1 overflow-y-auto overscroll-contain px-2 py-3">
          <ul className="flex flex-col gap-0.5">
            {PRIMARY_NAV.map(item => {
              const active = activeId === item.id;
              const hasMenu = Boolean(item.children?.length);
              const isOpen = expanded === item.id;

              return (
                <li key={item.id}>
                  <div className="flex items-stretch">
                    <a
                      href={PAGE_SLUG[item.id]}
                      aria-current={active && !hasMenu ? 'page' : undefined}
                      onClick={event => {
                        event.preventDefault();
                        if (hasMenu) {
                          setExpanded(isOpen ? null : item.id);
                        } else {
                          onNavigate(item.id);
                          onClose();
                        }
                      }}
                      className={cx(
                        'flex flex-1 items-center rounded-sm px-3 py-3 text-body-sm font-medium transition-colors duration-[140ms]',
                        active ? 'bg-brand-soft text-brand-ink' : 'text-ink-2 hover:bg-neutral-hover hover:text-ink',
                      )}
                    >
                      {t.nav[item.key as keyof typeof t.nav]}
                    </a>
                    {hasMenu && (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`mobile-group-${item.id}`}
                        aria-label={t.nav[item.key as keyof typeof t.nav]}
                        onClick={() => setExpanded(isOpen ? null : item.id)}
                        className="ms-1 inline-flex w-11 items-center justify-center rounded-sm text-ink-3 transition-colors duration-[140ms] hover:bg-neutral-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      >
                        <ChevronDown size={16} aria-hidden="true" className={cx('transition-transform duration-[140ms]', isOpen && 'rotate-180')} />
                      </button>
                    )}
                  </div>

                  {hasMenu && isOpen && (
                    <ul id={`mobile-group-${item.id}`} className="ms-3 border-s border-line ps-2 py-1">
                      {item.children!.map(child => (
                        <li key={child.id}>
                          <a
                            href={PAGE_SLUG[child.id]}
                            aria-current={child.id === currentPage ? 'page' : undefined}
                            onClick={event => {
                              event.preventDefault();
                              onNavigate(child.id);
                              onClose();
                            }}
                            className={cx(
                              'flex flex-col gap-0.5 rounded-sm px-3 py-2.5 transition-colors duration-[140ms]',
                              child.id === currentPage
                                ? 'bg-brand-soft text-brand-ink'
                                : 'text-ink-2 hover:bg-neutral-hover hover:text-ink',
                            )}
                          >
                            <span className="text-body-sm font-medium">
                              {t.nav[child.key as keyof typeof t.nav]}
                            </span>
                            {child.hintKey && (
                              <span className="text-caption text-ink-3">
                                {t.nav[child.hintKey as keyof typeof t.nav]}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex items-center justify-between rounded-md border border-line bg-subtle px-3 py-2.5">
            <span className="text-caption text-ink-3">{t.common.chooseLanguage}</span>
            <LanguageButton locale={locale} onOpen={() => { onClose(); onOpenLanguage(); }} />
          </div>
        </nav>

        <div className="border-t border-line p-4">
          <Button tone="brand" size="lg" block onClick={() => {
            onClose();
            onOpenConsult();
          }}>
            {t.actions.consult}
          </Button>

          <div className="mt-4 flex flex-col gap-2 text-caption text-ink-3">
            <a href={`tel:${hotline}`} className="inline-flex items-center gap-2 hover:text-brand-ink">
              <Phone size={14} aria-hidden="true" />
              <span data-numeric dir="ltr" className="ltr-isolate">
                {localiseDigits(hotline, locale)}
              </span>
            </a>
            <span className="inline-flex items-center gap-2">
              <MessageCircle size={14} aria-hidden="true" />
              {t.utility.responseTime}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} aria-hidden="true" />
              {t.footer.address}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={14} aria-hidden="true" />
              <span dir="ltr" className="ltr-isolate">
                info@aladdinweb.ir
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
