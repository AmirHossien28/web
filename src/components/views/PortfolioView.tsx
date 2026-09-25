import * as React from 'react';
import { ArrowUpRight, Gauge, Search, Smartphone } from 'lucide-react';
import type { LocaleKey, PageId, ProjectItem } from '../../types';
import { PROJECTS_DATA } from '../../data/projects';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Badge, Button, Section } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { PageHeader } from '../chrome/PageHeader';
import { CtaSection } from '../sections/CtaSection';
import { homeCopy } from '../../app/homeCopy';
import { ui } from '../../app/i18n';

/**
 * Portfolio
 * --------------------------------------------------------------------------
 * Filterable case-study index. Filters are single-select text chips (never a
 * dropdown) so the current state is always visible; the grid keeps a strict
 * 2-column rhythm on desktop and one column on phones.
 */
export interface PortfolioViewProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  onSelectProject: (project: ProjectItem) => void;
  hotline: string;
  whatsapp: string;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  locale,
  onNavigate,
  onOpenConsult,
  onSelectProject,
  hotline,
  whatsapp,
}) => {
  const t = ui(locale);
  const section = SECTIONS_I18N[locale].caseStudies;
  const metrics = homeCopy(locale).work;
  const [filter, setFilter] = React.useState<string>('all');

  const industries = ['all', ...Array.from(new Set(PROJECTS_DATA.map(project => project.industry)))];
  const visible =
    filter === 'all' ? PROJECTS_DATA : PROJECTS_DATA.filter(project => project.industry === filter);

  return (
    <>
      <PageHeader
        page="portfolio"
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
            <div role="group" aria-label={t.common.allWork} className="flex flex-wrap gap-2">
              {industries.map(industry => {
                const active = industry === filter;
                return (
                  <button
                    key={industry}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(industry)}
                    className={cx(
                      'h-9 rounded-sm border px-3.5 text-caption font-medium transition-colors duration-[140ms]',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                      active
                        ? 'border-brand bg-brand-soft text-brand-ink'
                        : 'border-line text-ink-2 hover:bg-neutral-hover hover:text-ink',
                    )}
                  >
                    {industry === 'all' ? t.common.allWork : industry}
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="grid gap-6 lg:grid-cols-2">
            {visible.map(project => (
              <li
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-[140ms] hover:border-line-bold"
              >
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="block text-start focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus"
                  aria-label={`${project.title} — ${section.interactivePreview}`}
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full border-b border-line bg-muted object-cover object-top"
                  />
                </button>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="neutral" variant="square">
                      {project.industry}
                    </Badge>
                    <Badge tone="brand" variant="square">
                      {project.leadResult}
                    </Badge>
                  </div>

                  <h2 className="mt-4 text-title-3">{project.title}</h2>
                  <p className="mt-2 flex-1 text-caption text-ink-2">{project.description}</p>

                  <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-4">
                    <div>
                      <dt className="flex items-center gap-1 text-caption text-ink-3">
                        <Gauge size={13} aria-hidden="true" />
                        {metrics.metricsLeadTime}
                      </dt>
                      <dd data-numeric className="mt-1 text-caption font-semibold text-ink">
                        {project.speed}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1 text-caption text-ink-3">
                        <Search size={13} aria-hidden="true" />
                        {metrics.metricsSearch}
                      </dt>
                      <dd className="mt-1 text-caption font-semibold text-ink">{project.googleRank}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1 text-caption text-ink-3">
                        <Smartphone size={13} aria-hidden="true" />
                        {metrics.metricsMobile}
                      </dt>
                      <dd className="mt-1 text-caption font-semibold text-ink">{project.mobileScore}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Button tone="neutral" emphasis="outline" size="sm" onClick={() => onSelectProject(project)}>
                      {section.interactivePreview}
                    </Button>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-caption font-medium text-brand-ink underline-offset-4 hover:underline"
                    >
                      <span dir="ltr" className="ltr-isolate">
                        {project.domain}
                      </span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
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
