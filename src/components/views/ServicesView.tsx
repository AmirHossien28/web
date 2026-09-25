import * as React from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  ChevronLeft,
  Clock,
  LayoutDashboard,
  ShoppingCart,
  Sparkles,
} from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { SERVICES_DATA } from '../../data/services';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Badge, Button, Card, IconFrame, Section, SectionHeading } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { PageHeader } from '../chrome/PageHeader';
import { FaqSection } from '../sections/FaqSection';
import { CtaSection } from '../sections/CtaSection';
import { SERVICE_NAV_KEY } from '../../app/navigation';
import { formatAmountFromLocale, ui } from '../../app/i18n';

/**
 * Services hub + service detail
 * --------------------------------------------------------------------------
 * One component serves both: the hub (`services`) shows a comparison strip and
 * the four lines; a service page (`*-web-design`) shows deliverables, a staged
 * process and its own FAQ. Keeping them together guarantees the copy and the
 * layout can never drift apart.
 */

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'corporate-web-design': <Building2 size={20} aria-hidden="true" />,
  'ecommerce-web-design': <ShoppingCart size={20} aria-hidden="true" />,
  'services-web-design': <Sparkles size={20} aria-hidden="true" />,
  'custom-portal-development': <LayoutDashboard size={20} aria-hidden="true" />,
};

export interface ServicesViewProps {
  pageId: PageId;
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  hotline: string;
  whatsapp: string;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  pageId,
  locale,
  onNavigate,
  onOpenConsult,
  hotline,
  whatsapp,
}) => {
  const t = ui(locale);
  const section = SECTIONS_I18N[locale].servicesGrid;
  const service = SERVICES_DATA.find(item => item.pageId === pageId);

  /* ----------------------------- hub ----------------------------- */
  if (!service) {
    return (
      <>
        <PageHeader page="services" locale={locale} onNavigate={onNavigate} />

        <Section level="canvas">
          <SectionHeading
            overline={section.tag}
            title={section.title}
            description={section.description}
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-2">
            {SERVICES_DATA.map(item => (
              <article key={item.id} className="flex flex-col bg-surface p-6 lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <IconFrame>{SERVICE_ICONS[item.pageId]}</IconFrame>
                  <Badge tone="neutral" variant="square">
                    {item.badge}
                  </Badge>
                </div>

                <h2 className="mt-5 text-title-3">
                  {t.nav[SERVICE_NAV_KEY[item.pageId] as keyof typeof t.nav] ?? item.title}
                </h2>
                <p className="mt-2 text-body-sm text-ink-2">{item.description}</p>

                <ul className="mt-5 flex flex-col gap-2">
                  {item.highlights.map(highlight => (
                    <li key={highlight} className="flex items-start gap-2 text-caption text-ink-2">
                      <Check size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-ink" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 flex items-baseline gap-2 border-t border-line pt-5">
                  <span className="text-caption text-ink-3">{t.labels.startPrice}</span>
                  <span data-numeric className="text-body-sm font-semibold text-ink">
                    {formatAmountFromLocale(item.startingPrice, locale)} {t.labels.toman}
                  </span>
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button tone="brand" emphasis="outline" size="sm" onClick={() => onNavigate(item.pageId)}>
                    {section.viewDetails}
                    <ChevronLeft size={15} aria-hidden="true" className="rtl:rotate-180" />
                  </Button>
                  <Button tone="neutral" emphasis="ghost" size="sm" onClick={onOpenConsult}>
                    {section.requestCustom}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <FaqSection locale={locale} onOpenConsult={onOpenConsult} />
      </>
    );
  }

  /* -------------------------- service detail -------------------------- */
  const title = t.nav[SERVICE_NAV_KEY[service.pageId] as keyof typeof t.nav] ?? service.title;

  return (
    <>
      <PageHeader
        page={service.pageId}
        locale={locale}
        title={title}
        onNavigate={onNavigate}
        actions={
          <>
            <Button tone="brand" size="lg" onClick={onOpenConsult}>
              {t.actions.consult}
            </Button>
            <Button tone="neutral" emphasis="outline" size="lg" onClick={() => onNavigate('portfolio')}>
              {t.actions.viewWork}
            </Button>
          </>
        }
      >
        <dl className="grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <dt className="text-caption text-ink-3">{t.labels.startPrice}</dt>
            <dd data-numeric className="mt-1 text-title-3 font-bold text-ink">
              {formatAmountFromLocale(service.startingPrice, locale)}{' '}
              <span className="text-caption font-normal text-ink-3">{t.labels.toman}</span>
            </dd>
          </div>
          <div>
            <dt className="text-caption text-ink-3">پشتیبانی پس از تحویل</dt>
            <dd className="mt-1 text-body-sm font-semibold text-ink">تضمین سطح خدمت ۶ ماهه</dd>
          </div>
          <div>
            <dt className="text-caption text-ink-3">خروجی نهایی</dt>
            <dd className="mt-1 text-body-sm font-semibold text-ink">سورس‌کد، مستندات و آموزش</dd>
          </div>
        </dl>
      </PageHeader>

      <Section level="canvas">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-body text-ink-2">{service.description}</p>

            <h2 className="mt-10 text-title-2">تحویل‌دادنی‌های این خدمت</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.deliverables.map(item => (
                <li key={item} className="flex items-start gap-2 rounded-sm border border-line bg-surface p-4 text-body-sm text-ink-2">
                  <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-brand-ink" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-title-2">مراحل اجرا</h2>
            <ol className="mt-5 flex flex-col">
              {service.processSteps.map((step, index) => (
                <li key={step.title} className="flex gap-5 border-t border-line py-5 last:border-b">
                  <span
                    data-numeric
                    aria-hidden="true"
                    className="mt-1 size-8 shrink-0 rounded-xs border border-line bg-subtle text-center text-caption font-semibold leading-8 text-ink-3"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-body-sm font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-caption text-ink-2">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="mt-12 text-title-2">پرسش‌های پرتکرار این خدمت</h2>
            <dl className="mt-5 flex flex-col gap-5">
              {service.faq.map(item => (
                <div key={item.q} className="rounded-md border border-line bg-surface p-5">
                  <dt className="text-body-sm font-semibold text-ink">{item.q}</dt>
                  <dd className="mt-2 text-caption text-ink-2">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* sticky commercial rail ------------------------------------- */}
          <aside className="lg:col-span-5">
            <div className="flex flex-col gap-5 lg:sticky lg:top-28">
              <Card padding="md" className="border-line">
                <IconFrame>{SERVICE_ICONS[service.pageId]}</IconFrame>
                <h2 className="mt-4 text-title-3">شروع همکاری</h2>
                <p className="mt-2 text-caption text-ink-2">
                  نیازسنجی اولیه رایگان است و پیش‌فاکتور رسمی بدون هیچ هزینه پنهانی صادر می‌شود.
                </p>
                <ul className="mt-4 flex flex-col gap-2 text-caption text-ink-2">
                  {service.highlights.map(highlight => (
                    <li key={highlight} className="flex items-start gap-2">
                      <Check size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-ink" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <Button tone="brand" size="lg" block className="mt-5" onClick={onOpenConsult}>
                  {t.actions.consultShort}
                </Button>
                <p className="mt-3 flex items-center gap-2 text-caption text-ink-3">
                  <Clock size={14} aria-hidden="true" />
                  {t.utility.responseTime}
                </p>
              </Card>

              <nav aria-label={t.common.allServices} className="rounded-lg border border-line bg-subtle p-4">
                <p className="mb-3 text-overline font-semibold uppercase text-ink-3">{t.common.allServices}</p>
                <ul className="flex flex-col">
                  {SERVICES_DATA.filter(item => item.pageId !== service.pageId).map(item => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onNavigate(item.pageId)}
                        className={cx(
                          'flex w-full items-center justify-between gap-3 border-b border-line py-3 text-start text-body-sm text-ink-2 transition-colors duration-[140ms] last:border-b-0 hover:text-brand-ink',
                          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                        )}
                      >
                        <span>{t.nav[SERVICE_NAV_KEY[item.pageId] as keyof typeof t.nav] ?? item.title}</span>
                        <ArrowRight size={15} aria-hidden="true" className="shrink-0 text-ink-4 rtl:rotate-180" />
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </Section>

      <CtaSection locale={locale} onOpenConsult={onOpenConsult} hotline={hotline} whatsapp={whatsapp} />
    </>
  );
};
