import * as React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { ARTICLES_DATA } from '../../data/articles';
import { Button, Section, SectionHeading } from '../../design-system/primitives';
import { homeCopy } from '../../app/homeCopy';
import { ui } from '../../app/i18n';

/**
 * Insights teaser
 * --------------------------------------------------------------------------
 * Three articles, ranked by editorially chosen order (featured first). Metadata
 * line carries category, reading time and date in one quiet caption row.
 */
export const InsightsSection: React.FC<{
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
}> = ({ locale, onNavigate }) => {
  const t = ui(locale);
  const copy = homeCopy(locale).insights;
  const articles = [...ARTICLES_DATA].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 3);

  return (
    <Section level="subtle" bordered>
      <SectionHeading
        overline={copy.tag}
        title={copy.title}
        description={copy.description}
        actions={
          <Button tone="neutral" emphasis="outline" size="md" onClick={() => onNavigate('knowledge-blog')}>
            {t.common.allArticles}
          </Button>
        }
      />

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {articles.map(article => (
          <li key={article.id} className="flex flex-col rounded-lg border border-line bg-surface p-6 transition-colors duration-[140ms] hover:border-line-bold">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-ink-3">
              <span className="font-medium text-brand-ink">{article.category}</span>
              <span aria-hidden="true" className="h-3 w-px bg-line" />
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} aria-hidden="true" />
                {article.readTime}
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-line" />
              <span>{article.date}</span>
            </div>

            <h3 className="mt-4 text-title-3">
              <button
                type="button"
                onClick={() => onNavigate('knowledge-blog')}
                className="text-start transition-colors duration-[140ms] hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              >
                {article.title}
              </button>
            </h3>

            <p className="mt-3 flex-1 text-body-sm text-ink-2">{article.summary}</p>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
              <span className="text-caption text-ink-4">{article.author}</span>
              <Button
                tone="brand"
                emphasis="link"
                size="sm"
                className="gap-1.5"
                onClick={() => onNavigate('knowledge-blog')}
              >
                {t.actions.readMore}
                <ArrowRight size={15} aria-hidden="true" className="rtl:rotate-180" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};
