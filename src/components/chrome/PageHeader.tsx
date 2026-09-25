import * as React from 'react';
import { ChevronLeft } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { cx } from '../../design-system/tokens';
import { breadcrumbFor, PAGE_SLUG } from '../../app/navigation';
import { ui } from '../../app/i18n';

/**
 * Page header used by every inner page.
 * Provides the h1, the breadcrumb trail (with correct RTL chevrons) and keeps a
 * consistent band height so pages feel like one product rather than a set of
 * templates.
 */
export interface PageHeaderProps {
  page: PageId;
  locale: LocaleKey;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  onNavigate: (page: PageId) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  page,
  locale,
  title,
  description,
  actions,
  children,
  onNavigate,
}) => {
  const t = ui(locale);
  const meta = t.pages[page];
  const crumbs = breadcrumbFor(page);
  const rtl = t.dir === 'rtl';

  return (
    <div className="border-b border-line bg-subtle">
      <div className="container-page">
        <div className="flex flex-col gap-6 py-10 md:py-14">
          {crumbs.length > 0 && (
            <nav aria-label={t.common.breadcrumb}>
              <ol className="flex flex-wrap items-center gap-1.5 text-caption text-ink-3">
                <li>
                  <a
                    href={PAGE_SLUG.home}
                    onClick={event => {
                      event.preventDefault();
                      onNavigate('home');
                    }}
                    className="transition-colors duration-[140ms] hover:text-brand-ink"
                  >
                    {t.common.home}
                  </a>
                </li>
                {crumbs
                  .filter(crumb => crumb !== 'home')
                  .map(crumb => (
                    <li key={crumb} className="flex items-center gap-1.5">
                      <ChevronLeft
                        size={14}
                        aria-hidden="true"
                        className={cx('text-ink-4', !rtl && 'rotate-180')}
                      />
                      <span className="text-ink-2">{t.nav[crumb as keyof typeof t.nav] ?? t.pages[crumb].title}</span>
                    </li>
                  ))}
              </ol>
            </nav>
          )}

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-title-1 md:text-display-2">{title ?? meta.title}</h1>
              <p className="mt-3 text-body-sm text-ink-2 md:text-body">
                {description ?? meta.description}
              </p>
            </div>
            {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
