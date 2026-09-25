import * as React from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  LayoutDashboard,
  ShoppingCart,
  Sparkles,
} from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { SERVICES_DATA } from '../../data/services';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Button, IconFrame, Section, SectionHeading } from '../../design-system/primitives';
import { formatAmountFromLocale, ui } from '../../app/i18n';
import { SERVICE_NAV_KEY } from '../../app/navigation';

/**
 * Services matrix
 * --------------------------------------------------------------------------
 * Four service lines rendered as a hairline matrix rather than four floating
 * cards: it reads as one comparable set, which is exactly the decision the
 * visitor is making at this point.
 */

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'corporate-web-design': <Building2 size={19} aria-hidden="true" />,
  'ecommerce-web-design': <ShoppingCart size={19} aria-hidden="true" />,
  'services-web-design': <Sparkles size={19} aria-hidden="true" />,
  'custom-portal-development': <LayoutDashboard size={19} aria-hidden="true" />,
};

export interface ServicesMatrixProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
}

export const ServicesMatrix: React.FC<ServicesMatrixProps> = ({ locale, onNavigate, onOpenConsult }) => {
  const t = ui(locale);
  const section = SECTIONS_I18N[locale].servicesGrid;

  return (
    <Section level="canvas" bordered>
      <SectionHeading
        overline={section.tag}
        title={section.title}
        description={section.description}
        actions={
          <>
            <Button tone="neutral" emphasis="outline" size="md" onClick={() => onNavigate('pricing-calculator')}>
              {section.compareBtn}
            </Button>
            <Button tone="brand" size="md" onClick={onOpenConsult}>
              {section.requestCustom}
            </Button>
          </>
        }
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {SERVICES_DATA.map(service => {
          const navKey = SERVICE_NAV_KEY[service.pageId];
          const title = t.nav[navKey as keyof typeof t.nav] ?? service.title;

          return (
            <article key={service.id} className="flex flex-col bg-surface p-6 transition-colors duration-[140ms] hover:bg-subtle sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <IconFrame>{SERVICE_ICONS[service.pageId]}</IconFrame>
                <span className="rounded-full border border-line px-2.5 py-1 text-[0.6875rem] font-medium text-ink-3">
                  {service.badge}
                </span>
              </div>

              <h3 className="mt-5 text-title-3">{title}</h3>
              <p className="mt-2 text-body-sm text-ink-2">{service.description}</p>

              <ul className="mt-5 flex flex-col gap-2">
                {service.highlights.slice(0, 3).map(highlight => (
                  <li key={highlight} className="flex items-start gap-2 text-caption text-ink-2">
                    <Check size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-ink" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
                <p className="flex flex-col">
                  <span className="text-caption text-ink-3">{t.labels.startPrice}</span>
                  <span data-numeric className="text-body-sm font-semibold text-ink">
                    {formatAmountFromLocale(service.startingPrice, locale)} {t.labels.toman}
                  </span>
                </p>

                <Button
                  tone="brand"
                  emphasis="link"
                  size="sm"
                  onClick={() => onNavigate(service.pageId)}
                  className="gap-1.5"
                >
                  {section.viewDetails}
                  <ArrowRight size={15} aria-hidden="true" className="rtl:rotate-180" />
                </Button>
              </div>
            </article>
          );
        })}
      </div>

    </Section>
  );
};
