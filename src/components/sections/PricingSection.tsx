import * as React from 'react';
import { ArrowRight, Check, Minus } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { PRICING } from '../../data/pricing';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Badge, Button, Section, SectionHeading } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { formatAmountFromLocale, localiseDigits, ui } from '../../app/i18n';

/**
 * Pricing
 * --------------------------------------------------------------------------
 * Three tiers, one of them recommended. Each card states what is included and
 * what is not, and the price is the most prominent element — the pattern that
 * consistently reduces pre-sales friction.
 */
export interface PricingSectionProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ locale, onNavigate, onOpenConsult }) => {
  const t = ui(locale);
  const section = SECTIONS_I18N[locale].pricingSection;
  const { plans, footnote } = PRICING[locale];

  return (
    <Section level="subtle" bordered>
      <SectionHeading
        overline={section.tag}
        title={section.title}
        description={section.description}
        actions={
          <Button tone="neutral" emphasis="outline" size="md" onClick={() => onNavigate('pricing-calculator')}>
            {section.openCalculator}
          </Button>
        }
      />

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

              <header>
                <h3 className="text-title-3">{plan.name}</h3>
                <p className="mt-2 min-h-12 text-caption text-ink-3">{plan.tagline}</p>
              </header>

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
                  {localiseDigits(plan.deliveryDays, locale)} {SECTIONS_I18N[locale].templatesShowcase.deliveryDays}
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
                <ArrowRight size={16} aria-hidden="true" className="rtl:rotate-180" />
              </Button>
            </article>
          );
        })}
      </div>

      <p className="mt-8 max-w-3xl text-caption text-ink-3">{footnote}</p>
    </Section>
  );
};
