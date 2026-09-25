import * as React from 'react';
import { ArrowUp, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { Button } from '../../design-system/primitives';
import { FOOTER_COLUMNS, PAGE_SLUG } from '../../app/navigation';
import { ui, localiseDigits } from '../../app/i18n';
import { Logo } from './Logo';

/**
 * Site footer — sitemap, contact and legal.
 * Deliberately quiet: hairline separators, no gradients, no decorative art.
 */
export interface SiteFooterProps {
  locale: LocaleKey;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  hotline: string;
  whatsapp: string;
  year: string;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  locale,
  currentPage,
  onNavigate,
  onOpenConsult,
  hotline,
  whatsapp,
  year,
}) => {
  const t = ui(locale);

  const link = (page: PageId, key: string) => {
    const label = t.nav[key as keyof typeof t.nav] ?? t.pages[page].title;
    return (
      <li key={`${page}-${key}`}>
        <a
          href={PAGE_SLUG[page]}
          aria-current={currentPage === page ? 'page' : undefined}
          onClick={event => {
            event.preventDefault();
            onNavigate(page);
          }}
          className="text-caption text-ink-3 transition-colors duration-[140ms] hover:text-brand-ink"
        >
          {label}
        </a>
      </li>
    );
  };

  return (
    <footer className="border-t border-line bg-subtle">
      <div className="container-page">
        <div className="grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-8">
          {/* brand + contact ------------------------------------------------- */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-body-sm text-ink-2">{t.footer.brandLine}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button tone="brand" emphasis="outline" size="sm" onClick={onOpenConsult}>
                {t.actions.proposal}
              </Button>
              <a href={`tel:${hotline}`} className="contents">
                <Button tone="neutral" emphasis="ghost" size="sm">
                  <Phone size={15} aria-hidden="true" />
                  <span data-numeric dir="ltr" className="ltr-isolate">
                    {localiseDigits(hotline, locale)}
                  </span>
                </Button>
              </a>
            </div>

            <address className="mt-6 flex flex-col gap-2 text-caption not-italic text-ink-3">
              <span className="inline-flex items-start gap-2">
                <MapPin size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
                {t.footer.address}
              </span>
              <a href={`mailto:info@aladdinweb.ir`} className="inline-flex items-center gap-2 hover:text-brand-ink">
                <Mail size={15} aria-hidden="true" />
                <span dir="ltr" className="ltr-isolate">
                  info@aladdinweb.ir
                </span>
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-brand-ink"
              >
                <MessageCircle size={15} aria-hidden="true" />
                {t.actions.whatsapp}
              </a>
            </address>
          </div>

          {/* sitemap -------------------------------------------------------- */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:grid-cols-4">
            {FOOTER_COLUMNS.map(column => (
              <nav key={column.titleKey} aria-label={t.footer[column.titleKey as keyof typeof t.footer]}>
                <h2 className="mb-4 text-overline font-semibold uppercase text-ink">
                  {t.footer[column.titleKey as keyof typeof t.footer]}
                </h2>
                <ul className="flex flex-col gap-2.5">{column.links.map(item => link(item.id, item.key))}</ul>
              </nav>
            ))}
          </div>
        </div>

        {/* legal ----------------------------------------------------------- */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-line py-6 md:flex-row md:items-center">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-ink-3">
            <span data-numeric>
              © {localiseDigits(year, locale)} — {'علاءالدین DXP'}
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-line md:inline-block" />
            <span>{t.footer.rights}</span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-line md:inline-block" />
            <span data-numeric>{t.footer.registered}</span>
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#main"
              className="inline-flex items-center gap-1.5 text-caption text-ink-3 transition-colors duration-[140ms] hover:text-brand-ink"
            >
              <ArrowUp size={14} aria-hidden="true" />
              {t.common.backToTop}
            </a>
            <span aria-hidden="true" className="h-3 w-px bg-line" />
            <span className="text-caption text-ink-3">{t.footer.legal}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
