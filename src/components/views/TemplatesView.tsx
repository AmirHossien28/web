import * as React from 'react';
import { Check, Star } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { TEMPLATES_DATA } from '../../data/templates';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Badge, Button, Section } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { PageHeader } from '../chrome/PageHeader';
import { CtaSection } from '../sections/CtaSection';
import { formatAmountFromLocale, localiseDigits, ui } from '../../app/i18n';

/**
 * Templates
 * --------------------------------------------------------------------------
 * Product-style catalogue: filter by category, compare on facts (delivery time,
 * price, rating, stack) and see the inclusion list before ordering. Facts come
 * before marketing on every card.
 */
export interface TemplatesViewProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  hotline: string;
  whatsapp: string;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  locale,
  onNavigate,
  onOpenConsult,
  hotline,
  whatsapp,
}) => {
  const t = ui(locale);
  const section = SECTIONS_I18N[locale].templatesShowcase;
  const [category, setCategory] = React.useState<string>('all');

  const categories = ['all', ...Array.from(new Set(TEMPLATES_DATA.map(item => item.category)))];
  const visible = category === 'all' ? TEMPLATES_DATA : TEMPLATES_DATA.filter(item => item.category === category);

  return (
    <>
      <PageHeader
        page="templates"
        locale={locale}
        onNavigate={onNavigate}
        actions={
          <Button tone="brand" size="lg" onClick={onOpenConsult}>
            {t.actions.consult}
          </Button>
        }
      />

      <Section level="canvas">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-overline font-semibold uppercase text-ink-3">{section.tag}</p>
            <h2 className="max-w-3xl text-title-1">{section.title}</h2>
            <p className="max-w-3xl text-body-sm text-ink-2">{section.description}</p>
          </div>

          <div role="group" aria-label={t.common.allTemplates} className="flex flex-wrap gap-2">
            {categories.map(key => {
              const active = key === category;
              const label =
                key === 'all'
                  ? t.common.allTemplates
                  : TEMPLATES_DATA.find(item => item.category === key)?.categoryLabel ?? key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(key)}
                  className={cx(
                    'h-9 rounded-sm border px-3.5 text-caption font-medium transition-colors duration-[140ms]',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                    active
                      ? 'border-brand bg-brand-soft text-brand-ink'
                      : 'border-line text-ink-2 hover:bg-neutral-hover hover:text-ink',
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <ul className="grid gap-6 lg:grid-cols-2">
            {visible.map(item => (
              <li key={item.id} className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full border-b border-line bg-muted object-cover object-top"
                />

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="brand" variant="square">
                      {item.categoryLabel}
                    </Badge>
                    <span data-numeric className="inline-flex items-center gap-1 text-caption text-ink-3">
                      <Star size={13} aria-hidden="true" className="fill-current text-warning-ink" />
                      {localiseDigits(item.rating.toFixed(1).replace('.', locale === 'fa' ? '٫' : '.'), locale)}
                      <span className="text-ink-4">
                        ({localiseDigits(item.reviewsCount, locale)})
                      </span>
                    </span>
                  </div>

                  <h3 className="mt-4 text-title-3">{item.title}</h3>
                  <p className="mt-1 text-caption font-medium text-brand-ink">{item.tagline}</p>
                  <p className="mt-3 text-body-sm text-ink-2">{item.description}</p>

                  <ul className="mt-5 flex flex-col gap-2">
                    {item.features.slice(0, 3).map(feature => (
                      <li key={feature} className="flex items-start gap-2 text-caption text-ink-2">
                        <Check size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-ink" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="rounded-xs border border-line px-2 py-1 text-[0.6875rem] text-ink-3">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
                    <div className="flex flex-col">
                      <span data-numeric className="text-caption text-ink-3">
                        {localiseDigits(item.deliveryDays, locale)} {section.deliveryDays}
                      </span>
                      <span data-numeric className="text-title-3 font-bold text-ink">
                        {formatAmountFromLocale(item.price, locale)}{' '}
                        <span className="text-caption font-normal text-ink-3">{t.labels.toman}</span>
                      </span>
                      <span className="text-caption text-ink-4">{item.techStack}</span>
                    </div>
                    <Button tone="brand" size="md" onClick={onOpenConsult}>
                      {section.orderTemplate}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaSection locale={locale} onOpenConsult={onOpenConsult} hotline={hotline} whatsapp={whatsapp} />
    </>
  );
};
