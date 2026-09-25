import * as React from 'react';
import type { LocaleKey } from '../../types';
import { PROJECTS_DATA } from '../../data/projects';
import { Section } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { localiseDigits } from '../../app/i18n';
import { homeCopy, type HomeStat } from '../../app/homeCopy';

/**
 * Trust strip
 * --------------------------------------------------------------------------
 * Social proof placed immediately after the hero — the point of highest
 * scepticism. Client marks in a quiet, uniform typographic treatment (no fake
 * logo files), then four hard numbers on a hairline band.
 */

const renderStatValue = (stat: HomeStat, locale: LocaleKey): string => {
  const raw = stat.decimals ? stat.value.toFixed(stat.decimals) : String(stat.value);
  const decimalSeparator = locale === 'fa' || locale === 'ar' ? '٫' : '.';
  const withSeparator = raw.replace('.', decimalSeparator);
  return `${stat.prefix ?? ''}${localiseDigits(withSeparator, locale)}${stat.suffix ?? ''}`;
};

export const TrustStrip: React.FC<{ locale: LocaleKey }> = ({ locale }) => {
  const copy = homeCopy(locale).trust;

  /* unique client domains, deduplicated by brand token */
  const marks = Array.from(
    new Set(
      PROJECTS_DATA.map(project => project.domain.replace(/^www\./, '').split('.')[0]).filter(Boolean),
    ),
  ).slice(0, 6);

  return (
    <Section level="subtle" spacing="sm" className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 start-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-glow-brand opacity-40 blur-3xl rtl:translate-x-1/2" />

      {/* four hard numbers — large value, quiet label, as on an investor page */}
      <dl className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {copy.stats.map((stat, index) => (
          <div key={stat.label} className="relative rounded-lg glass p-6">
            <dd
              data-numeric
              className={cx(
                'text-display-2 font-bold leading-none lg:text-[2.75rem]',
                index === 0 ? 'text-gradient-brand' : 'text-ink',
              )}
            >
              {renderStatValue(stat, locale)}
            </dd>
            <dt className="ds-overline mt-3 text-ink-2">{stat.label}</dt>
            {stat.hint && <p className="mt-1 text-caption text-ink-3">{stat.hint}</p>}
          </div>
        ))}
      </dl>

      {/* client marks as quiet pills */}
      <div className="relative mt-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <p className="text-caption text-ink-3">
          <span className="ds-overline me-2 text-brand-ink">{copy.clients}</span>
          {copy.title}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {marks.map(mark => (
            <li
              key={mark}
              className="inline-flex h-9 items-center gap-2 rounded-full glass px-4 text-caption font-semibold text-ink-2 transition-colors duration-[140ms] hover:text-ink"
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
              <span dir="ltr" className="ltr-isolate lowercase">
                {mark}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
