import * as React from 'react';
import type { LocaleKey } from '../../types';
import { PROJECTS_DATA } from '../../data/projects';
import { Section } from '../../design-system/primitives';
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
    <Section level="subtle" spacing="sm" className="border-b border-line">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-3">
          <p className="text-overline font-semibold uppercase text-ink-3">{copy.clients}</p>
          <p className="mt-2 text-body-sm font-medium text-ink">{copy.title}</p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-9">
          {marks.map(mark => (
            <li
              key={mark}
              className="text-body-sm font-semibold lowercase text-ink-4 transition-colors duration-[140ms] hover:text-ink-2"
            >
              <span dir="ltr" className="ltr-isolate">
                {mark}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {copy.stats.map(stat => (
          <div key={stat.label} className="bg-surface p-6">
            <dt className="text-caption text-ink-3">{stat.label}</dt>
            <dd
              data-numeric
              className="mt-2 text-title-1 font-bold leading-none text-ink"
            >
              {renderStatValue(stat, locale)}
            </dd>
            {stat.hint && <p className="mt-2 text-caption text-ink-4">{stat.hint}</p>}
          </div>
        ))}
      </dl>
    </Section>
  );
};
