import * as React from 'react';
import { ArrowUpRight, ExternalLink, Gauge, Search, Smartphone } from 'lucide-react';
import type { LocaleKey, PageId, ProjectItem } from '../../types';
import { PROJECTS_DATA } from '../../data/projects';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Badge, Button, Section, SectionHeading } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { homeCopy } from '../../app/homeCopy';
import { ui } from '../../app/i18n';

/**
 * Work showcase
 * --------------------------------------------------------------------------
 * Case studies as editorial rows: one project per row, the evidence (three
 * measured results) on a hairline baseline, and the two honest actions —
 * open the live site or inspect the responsive preview.
 */

const Thumbnail: React.FC<{ project: ProjectItem; className?: string }> = ({ project, className }) => {
  const [failed, setFailed] = React.useState(false);

  return (
    <div
      className={cx(
        'relative overflow-hidden rounded-md border border-line bg-muted',
        className,
      )}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
          <span data-numeric className="text-title-2 font-bold text-ink-4">
            {project.domain.replace(/^www\./, '').slice(0, 2).toUpperCase()}
          </span>
          <span dir="ltr" className="ltr-isolate text-caption text-ink-4">
            {project.domain}
          </span>
        </div>
      ) : (
        <img
          src={project.img}
          alt={project.title}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)] hover:scale-[1.015]"
        />
      )}
    </div>
  );
};

export interface WorkShowcaseProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenPreview: (project: ProjectItem) => void;
}

export const WorkShowcase: React.FC<WorkShowcaseProps> = ({ locale, onNavigate, onOpenPreview }) => {
  const t = ui(locale);
  const target = '/' + locale;
  const section = SECTIONS_I18N[locale].caseStudies;
  const copy = homeCopy(locale).work;

  const featured = PROJECTS_DATA.filter(project => project.featured).slice(0, 3);

  return (
    <Section level="subtle" bordered>
      <SectionHeading
        overline={section.tag}
        title={section.title}
        description={section.description}
        actions={
          <Button tone="neutral" emphasis="outline" size="md" onClick={() => onNavigate('portfolio')}>
            {t.common.allWork}
          </Button>
        }
      />

      <div className="mt-12 flex flex-col">
        {featured.map((project, index) => (
          <article
            key={project.id}
            className={cx(
              'grid gap-6 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10',
              index > 0 && 'border-t border-line',
            )}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={event => event.preventDefault()}
              onDoubleClick={() => window.open(project.url, '_blank', 'noopener')}
              className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus lg:col-span-5"
              aria-label={`${project.title} — ${section.viewLive}`}
            >
              <Thumbnail project={project} />
            </a>

            <div className="flex flex-col lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="neutral" variant="square">
                  {project.industry}
                </Badge>
                <span data-numeric className="text-caption text-ink-3">
                  {project.executionTime}
                </span>
              </div>

              <h3 className="mt-4 text-title-2">{project.title}</h3>
              <p className="mt-3 text-body-sm text-ink-2">{project.description}</p>

              <dl className="mt-6 grid gap-x-6 gap-y-4 border-t border-line pt-5 sm:grid-cols-3">
                <div>
                  <dt className="flex items-center gap-1.5 text-caption text-ink-3">
                    <Gauge size={14} aria-hidden="true" />
                    {copy.metricsLeadTime}
                  </dt>
                  <dd data-numeric className="mt-1 text-body-sm font-semibold text-ink">
                    {project.speed}
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-caption text-ink-3">
                    <Search size={14} aria-hidden="true" />
                    {copy.metricsSearch}
                  </dt>
                  <dd className="mt-1 text-body-sm font-semibold text-ink">{project.googleRank}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-caption text-ink-3">
                    <Smartphone size={14} aria-hidden="true" />
                    {copy.metricsMobile}
                  </dt>
                  <dd className="mt-1 text-body-sm font-semibold text-ink">{project.mobileScore}</dd>
                </div>
              </dl>

              <p className="mt-5 flex items-center gap-2 text-caption font-medium text-success-ink">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
                {project.leadResult}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button tone="neutral" emphasis="outline" size="sm" onClick={() => onOpenPreview(project)}>
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
                <span className="hidden items-center gap-1.5 text-caption text-ink-4 xl:inline-flex">
                  <ExternalLink size={13} aria-hidden="true" />
                  {project.technologies.slice(0, 2).join(' · ')}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};
