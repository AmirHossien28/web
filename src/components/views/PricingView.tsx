import * as React from 'react';
import { Check, Info, Minus, Sparkles } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { PRICING } from '../../data/pricing';
import { SERVICES_DATA } from '../../data/services';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Badge, Button, Card, Section, SectionHeading } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { PageHeader } from '../chrome/PageHeader';
import { FaqSection } from '../sections/FaqSection';
import { CtaSection } from '../sections/CtaSection';
import { formatAmountFromLocale, localiseDigits, ui } from '../../app/i18n';

/**
 * Pricing
 * --------------------------------------------------------------------------
 * Three things, in this order: the plans, the full comparison table, and a live
 * estimator. Publishing the comparison *and* the estimator is what removes the
 * "call us to find out" friction that damages trust on pricing pages.
 */

const SLA_OPTIONS = [
  { id: 'none', label: 'بدون پشتیبانی تعهدی', cost: 0 },
  { id: 'gold', label: 'SLA طلایی ۶ ماهه', cost: 3_500_000 },
  { id: 'vip', label: 'SLA اختصاصی VIP ۱۲ ماهه', cost: 6_500_000 },
] as const;

export interface PricingViewProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  hotline: string;
  whatsapp: string;
}

export const PricingView: React.FC<PricingViewProps> = ({
  locale,
  onNavigate,
  onOpenConsult,
  hotline,
  whatsapp,
}) => {
  const t = ui(locale);
  const section = SECTIONS_I18N[locale].pricingSection;
  const { plans, comparison, footnote, comparisonNote } = PRICING[locale];

  /* ------------------------------ estimator ------------------------------ */
  const [typeId, setTypeId] = React.useState(SERVICES_DATA[1].id);
  const [pages, setPages] = React.useState(12);
  const [multilingual, setMultilingual] = React.useState(false);
  const [store, setStore] = React.useState(false);
  const [sla, setSla] = React.useState<(typeof SLA_OPTIONS)[number]['id']>('gold');

  const base = SERVICES_DATA.find(service => service.id === typeId)?.startingPrice ?? 20_000_000;
  const pageCost = Math.max(0, pages - 10) * 1_150_000;
  const languageCost = multilingual ? 4_500_000 : 0;
  const storeCost = store ? 9_000_000 : 0;
  const slaCost = SLA_OPTIONS.find(option => option.id === sla)?.cost ?? 0;
  const estimate = base + pageCost + languageCost + storeCost + slaCost;
  const low = Math.round((estimate * 0.9) / 500_000) * 500_000;
  const high = Math.round((estimate * 1.15) / 500_000) * 500_000;

  const nearestPlan = estimate < 28_000_000 ? plans[0] : estimate < 65_000_000 ? plans[1] : plans[2];

  return (
    <>
      <PageHeader
        page="pricing-calculator"
        locale={locale}
        onNavigate={onNavigate}
        actions={
          <>
            <Button tone="brand" size="lg" onClick={onOpenConsult}>
              {t.actions.proposal}
            </Button>
            <Button
              tone="neutral"
              emphasis="outline"
              size="lg"
              onClick={() => document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {section.openCalculator}
            </Button>
          </>
        }
      />

      {/* ------------------------------- plans ------------------------------- */}
      <Section level="canvas">
        <SectionHeading overline={section.tag} title={section.title} description={section.description} />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map(plan => {
            const featured = plan.id === 'growth';
            return (
              <article
                key={plan.id}
                className={cx(
                  'relative flex flex-col rounded-lg border bg-surface p-6 lg:p-7',
                  featured ? 'border-brand shadow-sm lg:-mt-4 lg:mb-4' : 'border-line',
                )}
              >
                {featured && plan.badge && (
                  <Badge tone="brand" className="absolute -top-3 start-6">
                    {plan.badge}
                  </Badge>
                )}

                <h2 className="text-title-3">{plan.name}</h2>
                <p className="mt-2 min-h-12 text-caption text-ink-3">{plan.tagline}</p>

                <p className="mt-6 flex flex-col gap-1 border-t border-line pt-6">
                  <span className="text-caption text-ink-3">
                    {plan.publicPrice ? t.labels.startPrice : t.actions.proposal}
                  </span>
                  <span className="flex flex-wrap items-baseline gap-2">
                    <span data-numeric className="text-title-1 font-bold text-ink">
                      {plan.publicPrice ? formatAmountFromLocale(plan.priceToman, locale) : '—'}
                    </span>
                    {plan.publicPrice && <span className="text-caption text-ink-3">{t.labels.toman}</span>}
                  </span>
                  <span data-numeric className="mt-1 text-caption text-ink-4">
                    {localiseDigits(plan.deliveryDays, locale)}{' '}
                    {SECTIONS_I18N[locale].templatesShowcase.deliveryDays}
                  </span>
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2 text-body-sm text-ink-2">
                      <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-brand-ink" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-caption text-ink-4">
                  <Minus size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                  {plan.excludes}
                </p>

                <Button
                  tone={featured ? 'brand' : 'neutral'}
                  emphasis={featured ? 'solid' : 'outline'}
                  size="lg"
                  block
                  className="mt-6"
                  onClick={onOpenConsult}
                >
                  {plan.cta}
                </Button>
              </article>
            );
          })}
        </div>

        <p className="mt-8 max-w-3xl text-caption text-ink-3">{footnote}</p>
      </Section>

      {/* --------------------------- comparison table --------------------------- */}
      <Section level="subtle" bordered>
        <SectionHeading
          overline="جدول مقایسه"
          title="تفاوت پلن‌ها، بدون ابهام"
          description={comparisonNote}
        />

        <div className="mt-10 overflow-x-auto rounded-lg border border-line bg-surface">
          <table className="w-full min-w-[46rem] border-collapse text-body-sm">
            <caption className="sr-only">مقایسه امکانات پلن‌های قیمت‌گذاری</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="w-2/5 bg-subtle px-5 py-4 text-start text-caption font-semibold text-ink-3">
                  ویژگی
                </th>
                {plans.map(plan => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={cx(
                      'px-5 py-4 text-start text-body-sm font-semibold',
                      plan.id === 'growth' ? 'bg-brand-soft text-brand-ink' : 'text-ink',
                    )}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map(row => (
                <tr key={row.label} className="border-b border-line last:border-b-0">
                  <th scope="row" className="bg-subtle px-5 py-3.5 text-start text-caption font-medium text-ink-2">
                    {row.label}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.label}-${index}`}
                      data-numeric
                      className={cx(
                        'px-5 py-3.5 text-caption',
                        plans[index].id === 'growth' ? 'bg-brand-soft/60 text-ink' : 'text-ink-2',
                      )}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ------------------------------ estimator ------------------------------ */}
      <Section level="canvas" bordered id="estimator">
        <SectionHeading
          overline="برآورد آنلاین"
          title="هزینه پروژه خود را تخمین بزنید"
          description="پاسخ‌ها را انتخاب کنید؛ محدوده هزینه و پلن پیشنهادی بلافاصله به‌روز می‌شود. پیش‌فاکتور قطعی پس از نیازسنجی صادر می‌شود."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <fieldset className="flex flex-col gap-3">
              <legend className="text-caption font-medium text-ink-2">نوع پروژه</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {SERVICES_DATA.map(service => {
                  const active = service.id === typeId;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setTypeId(service.id)}
                      className={cx(
                        'rounded-sm border px-4 py-3 text-start text-caption transition-colors duration-[140ms]',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                        active
                          ? 'border-brand bg-brand-soft text-brand-ink'
                          : 'border-line bg-surface text-ink-2 hover:bg-neutral-hover hover:text-ink',
                      )}
                    >
                      {service.title}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex flex-col gap-3">
              <label htmlFor="pages" className="flex items-center justify-between text-caption font-medium text-ink-2">
                <span>تعداد صفحات</span>
                <span data-numeric className="tabular-nums text-ink">
                  {localiseDigits(pages, locale)}
                </span>
              </label>
              <input
                id="pages"
                type="range"
                min={5}
                max={60}
                step={1}
                value={pages}
                onChange={event => setPages(Number(event.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-data-track accent-[var(--ds-color-bg-brand)]"
              />
              <p className="text-caption text-ink-4">بازه متعارف پروژه‌های ما بین ۵ تا ۶۰ صفحه است.</p>
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className="text-caption font-medium text-ink-2">ماژول‌های افزودنی</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { id: 'multi', label: 'ساختار چندزبانه', checked: multilingual, toggle: setMultilingual },
                  { id: 'store', label: 'ماژول فروشگاه و پرداخت', checked: store, toggle: setStore },
                ].map(option => (
                  <label
                    key={option.id}
                    className={cx(
                      'flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-caption transition-colors duration-[140ms]',
                      option.checked ? 'border-brand bg-brand-soft text-brand-ink' : 'border-line bg-surface text-ink-2',
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={event => option.toggle(event.target.checked)}
                      className="size-4 accent-[var(--ds-color-bg-brand)]"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-3">
              <legend className="text-caption font-medium text-ink-2">سطح پشتیبانی</legend>
              <div className="flex flex-col gap-2">
                {SLA_OPTIONS.map(option => (
                  <label
                    key={option.id}
                    className={cx(
                      'flex cursor-pointer items-center justify-between gap-3 rounded-sm border px-4 py-3 text-caption transition-colors duration-[140ms]',
                      sla === option.id ? 'border-brand bg-brand-soft text-brand-ink' : 'border-line bg-surface text-ink-2',
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="sla"
                        checked={sla === option.id}
                        onChange={() => setSla(option.id)}
                        className="size-4 accent-[var(--ds-color-bg-brand)]"
                      />
                      {option.label}
                    </span>
                    {option.cost > 0 && (
                      <span data-numeric className="text-ink-3">
                        {formatAmountFromLocale(option.cost, locale)} {t.labels.toman}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {/* live summary */}
          <aside className="lg:col-span-5">
            <Card padding="lg" className="lg:sticky lg:top-28">
              <p className="text-overline font-semibold uppercase text-ink-3">برآورد هزینه</p>
              <p data-numeric className="mt-4 text-title-1 font-bold text-ink">
                {formatAmountFromLocale(low, locale)} — {formatAmountFromLocale(high, locale)}
                <span className="ms-2 text-caption font-normal text-ink-3">{t.labels.toman}</span>
              </p>

              <dl className="mt-6 flex flex-col gap-2 border-t border-line pt-5 text-caption">
                {[
                  { label: 'پایه خدمت', value: base },
                  { label: 'صفحات اضافه', value: pageCost },
                  { label: 'چندزبانگی', value: languageCost },
                  { label: 'فروشگاه', value: storeCost },
                  { label: 'پشتیبانی', value: slaCost },
                ]
                  .filter(row => row.value > 0)
                  .map(row => (
                    <div key={row.label} className="flex items-center justify-between">
                      <dt className="text-ink-3">{row.label}</dt>
                      <dd data-numeric className="text-ink-2">
                        {formatAmountFromLocale(row.value, locale)}
                      </dd>
                    </div>
                  ))}
              </dl>

              <div className="mt-6 flex items-start gap-3 rounded-sm border border-info-line bg-info p-4">
                <Sparkles size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-ink" />
                <p className="text-caption text-ink-2">
                  پلن پیشنهادی برای این دامنه: <strong className="text-ink">{nearestPlan.name}</strong>
                </p>
              </div>

              <Button tone="brand" size="lg" block className="mt-6" onClick={onOpenConsult}>
                {t.actions.proposal}
              </Button>

              <p className="mt-3 flex items-start gap-2 text-caption text-ink-4">
                <Info size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                برآوردها تقریبی و بر پایه پروژه‌های مشابه است؛ قیمت نهایی در پیش‌فاکتور رسمی مشخص می‌شود.
              </p>
            </Card>
          </aside>
        </div>
      </Section>

      <FaqSection locale={locale} onOpenConsult={onOpenConsult} />
      <CtaSection locale={locale} onOpenConsult={onOpenConsult} hotline={hotline} whatsapp={whatsapp} />
    </>
  );
};
