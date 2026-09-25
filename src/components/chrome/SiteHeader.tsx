import * as React from 'react';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { cx } from '../../design-system/tokens';
import { Button } from '../../design-system/primitives';
import { activeNavFor, PAGE_SLUG, PRIMARY_NAV, type NavItem } from '../../app/navigation';
import { ui, localiseDigits } from '../../app/i18n';
import { Logo } from './Logo';
import { ThemeToggle } from './controls';

export interface SiteHeaderProps {
  currentPage: PageId;
  locale: LocaleKey;
  isLight: boolean;
  onNavigate: (page: PageId) => void;
  onThemeToggle: () => void;
  onOpenMobileNav: () => void;
  onOpenConsult: () => void;
  hotline: string;
}

const useScrolled = (threshold = 8) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
};

/** Mega-menu panel: two columns of destinations with a one-line purpose each. */
const NavMenu: React.FC<{
  item: NavItem;
  locale: LocaleKey;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onClose: () => void;
}> = ({ item, locale, activePage, onNavigate, onClose }) => {
  const t = ui(locale);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    const onDocClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) onClose();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDocClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDocClick);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      id={`menu-${item.id}`}
      className="absolute end-0 top-[calc(100%+0.75rem)] z-dropdown w-[26rem] animate-scale-in rounded-lg border border-line bg-surface p-2 shadow-lg"
    >
      <p className="px-3 pb-2 pt-2 text-overline font-semibold uppercase text-ink-3">
        {t.nav[item.childrenTitleKey as keyof typeof t.nav]}
      </p>
      <ul>
        {item.children!.map(child => {
          const active = child.id === activePage;
          return (
            <li key={child.id}>
              <a
                href={PAGE_SLUG[child.id]}
                aria-current={active ? 'page' : undefined}
                onClick={event => {
                  event.preventDefault();
                  onNavigate(child.id);
                  onClose();
                }}
                className={cx(
                  'flex flex-col gap-0.5 rounded-md px-3 py-2.5 transition-colors duration-[140ms]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                  active ? 'bg-brand-soft' : 'hover:bg-neutral-hover',
                )}
              >
                <span className="flex items-center gap-2 text-body-sm font-semibold text-ink">
                  {t.nav[child.key as keyof typeof t.nav]}
                  {child.badgeKey && (
                    <span className="rounded-full border border-info-line bg-brand-soft px-2 py-px text-[0.6875rem] font-medium text-brand-ink">
                      {t.nav[child.badgeKey as keyof typeof t.nav]}
                    </span>
                  )}
                </span>
                {child.hintKey && (
                  <span className="text-caption text-ink-3">{t.nav[child.hintKey as keyof typeof t.nav]}</span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentPage,
  locale,
  isLight,
  onNavigate,
  onThemeToggle,
  onOpenMobileNav,
  onOpenConsult,
  hotline,
}) => {
  const t = ui(locale);
  const scrolled = useScrolled();
  const activeId = activeNavFor(currentPage);
  const [openMenu, setOpenMenu] = React.useState<PageId | null>(null);

  const go = (page: PageId) => (event: React.MouseEvent) => {
    event.preventDefault();
    onNavigate(page);
    setOpenMenu(null);
  };

  return (
    <header
      className={cx(
        'sticky top-0 z-sticky border-b bg-surface/85 backdrop-blur-md transition-[border-color,box-shadow,height] duration-[200ms]',
        scrolled ? 'border-line shadow-xs' : 'border-transparent',
      )}
    >
      <div className="container-page">
        <div
          className={cx(
            'flex items-center justify-between gap-6 transition-[height] duration-[200ms]',
            scrolled ? 'h-16' : 'h-[4.5rem]',
          )}
        >
          {/* brand -------------------------------------------------------- */}
          <a
            href={PAGE_SLUG.home}
            onClick={go('home')}
            aria-label={`${t.nav.home} — ${t.pages.home.title}`}
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          >
            <Logo />
          </a>

          {/* primary navigation ------------------------------------------- */}
          <nav aria-label={t.common.menu} className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {PRIMARY_NAV.map(item => {
                const active = activeId === item.id;
                const hasMenu = Boolean(item.children?.length);
                const expanded = openMenu === item.id;

                return (
                  <li
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => hasMenu && setOpenMenu(item.id)}
                    onMouseLeave={() => hasMenu && setOpenMenu(null)}
                  >
                    <a
                      href={PAGE_SLUG[item.id]}
                      onClick={hasMenu ? (event) => event.preventDefault() : go(item.id)}
                      aria-current={active && !hasMenu ? 'page' : undefined}
                      aria-haspopup={hasMenu ? 'true' : undefined}
                      aria-expanded={hasMenu ? expanded : undefined}
                      aria-controls={hasMenu ? `menu-${item.id}` : undefined}
                      onFocus={() => hasMenu && setOpenMenu(item.id)}
                      onKeyDown={event => {
                        if (hasMenu && event.key === 'Enter') setOpenMenu(item.id);
                      }}
                      className={cx(
                        'relative inline-flex h-9 items-center gap-1 rounded-sm px-3 text-body-sm font-medium transition-colors duration-[140ms]',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                        active ? 'text-brand-ink' : 'text-ink-2 hover:bg-neutral-hover hover:text-ink',
                      )}
                    >
                      {t.nav[item.key as keyof typeof t.nav]}
                      {hasMenu && (
                        <ChevronDown
                          size={14}
                          aria-hidden="true"
                          className={cx('transition-transform duration-[140ms]', expanded && 'rotate-180')}
                        />
                      )}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3 -bottom-[0.4rem] h-0.5 rounded-full bg-brand"
                        />
                      )}
                    </a>

                    {hasMenu && expanded && (
                      <NavMenu
                        item={item}
                        locale={locale}
                        activePage={currentPage}
                        onNavigate={onNavigate}
                        onClose={() => setOpenMenu(null)}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* actions ------------------------------------------------------ */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${hotline}`}
              className="hidden items-center gap-2 rounded-sm px-2.5 py-1.5 text-caption font-semibold text-ink-2 transition-colors duration-[140ms] hover:bg-neutral-hover hover:text-ink xl:inline-flex"
            >
              <Phone size={15} aria-hidden="true" />
              <span data-numeric dir="ltr" className="ltr-isolate">
                {localiseDigits(hotline, locale)}
              </span>
            </a>

            <div className="hidden lg:block">
              <ThemeToggle isLight={isLight} onToggle={onThemeToggle} locale={locale} />
            </div>

            <Button tone="brand" size="md" className="hidden lg:inline-flex" onClick={onOpenConsult}>
              {t.actions.consultShort}
            </Button>

            <button
              type="button"
              onClick={onOpenMobileNav}
              aria-label={t.common.openMenu}
              className="inline-flex size-10 items-center justify-center rounded-sm border border-line text-ink-2 transition-colors duration-[140ms] hover:bg-neutral-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus lg:hidden"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
