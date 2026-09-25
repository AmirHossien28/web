import * as React from 'react';
import { ArrowRight, CalendarDays, Eye, Timer, X } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { ARTICLES_DATA } from '../../data/articles';
import type { ArticleItem } from '../../types';
import { Badge, Button, Section } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { PageHeader } from '../chrome/PageHeader';
import { CtaSection } from '../sections/CtaSection';
import { homeCopy } from '../../app/homeCopy';
import { localiseDigits, ui } from '../../app/i18n';

/**
 * Insights index
 * --------------------------------------------------------------------------
 * Editorial layout: one lead article, then a two-column list. Reading opens in
 * a focused dialog so the index keeps its position and the reader keeps context.
 */
export interface BlogViewProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  hotline: string;
  whatsapp: string;
}

export const BlogView: React.FC<BlogViewProps> = ({ locale, onNavigate, onOpenConsult, hotline, whatsapp }) => {
  const t = ui(locale);
  const copy = homeCopy(locale).insights;
  const [reading, setReading] = React.useState<ArticleItem | null>(null);

  const [lead, ...rest] = ARTICLES_DATA;

  /* close the reader with Escape, like every other overlay in the product */
  React.useEffect(() => {
    if (!reading) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setReading(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [reading]);

  const Meta: React.FC<{ article: ArticleItem; className?: string }> = ({ article, className }) => (
    <div className={cx('flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-ink-3', className)}>
      <span className="font-medium text-brand-ink">{article.category}</span>
      <span aria-hidden="true" className="h-3 w-px bg-line" />
      <span className="inline-flex items-center gap-1.5">
        <Timer size={13} aria-hidden="true" />
        {article.readTime}
      </span>
      <span aria-hidden="true" className="h-3 w-px bg-line" />
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays size={13} aria-hidden="true" />
        {article.date}
      </span>
      <span aria-hidden="true" className="h-3 w-px bg-line" />
      <span className="inline-flex items-center gap-1.5">
        <Eye size={13} aria-hidden="true" />
        <span data-numeric>{localiseDigits(article.views, locale)}</span>
      </span>
    </div>
  );

  return (
    <>
      <PageHeader
        page="knowledge-blog"
        locale={locale}
        onNavigate={onNavigate}
        actions={
          <Button tone="brand" size="lg" onClick={onOpenConsult}>
            {t.actions.consult}
          </Button>
        }
      />

      <Section level="canvas">
        <div className="flex flex-col gap-3">
          <p className="text-overline font-semibold uppercase text-ink-3">{copy.tag}</p>
          <h2 className="max-w-3xl text-title-1">{copy.title}</h2>
          <p className="max-w-3xl text-body-sm text-ink-2">{copy.description}</p>
        </div>

        {/* lead article */}
        <article className="mt-10 grid gap-6 overflow-hidden rounded-lg border border-line bg-surface lg:grid-cols-12 lg:gap-0">
          <img
            src={lead.img}
            alt={lead.title}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full border-b border-line bg-muted object-cover object-top lg:col-span-6 lg:aspect-auto lg:border-b-0 lg:border-e"
          />
          <div className="flex flex-col justify-center p-6 lg:col-span-6 lg:p-10">
            <Badge tone="brand" variant="square" className="w-fit">
              {t.labels.featured}
            </Badge>
            <h3 className="mt-4 text-title-2">{lead.title}</h3>
            <p className="mt-3 text-body-sm text-ink-2">{lead.summary}</p>
            <Meta article={lead} className="mt-5" />
            <Button
              tone="brand"
              emphasis="outline"
              size="md"
              className="mt-6 w-fit"
              onClick={() => setReading(lead)}
            >
              {t.actions.readMore}
              <ArrowRight size={15} aria-hidden="true" className="rtl:rotate-180" />
            </Button>
          </div>
        </article>

        {/* remaining articles */}
        <ul className="mt-6 grid gap-6 lg:grid-cols-2">
          {rest.map(article => (
            <li key={article.id} className="flex flex-col rounded-lg border border-line bg-surface p-6">
              <Meta article={article} />
              <h3 className="mt-4 text-title-3">{article.title}</h3>
              <p className="mt-3 flex-1 text-body-sm text-ink-2">{article.summary}</p>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-caption text-ink-4">{article.author}</span>
                <Button tone="brand" emphasis="link" size="sm" className="gap-1.5" onClick={() => setReading(article)}>
                  {t.actions.readMore}
                  <ArrowRight size={15} aria-hidden="true" className="rtl:rotate-180" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection locale={locale} onOpenConsult={onOpenConsult} hotline={hotline} whatsapp={whatsapp} />

      {/* reader dialog */}
      {reading && (
        <div className="fixed inset-0 z-modal flex items-start justify-center overflow-y-auto p-4 sm:p-8">
          <button
            type="button"
            aria-label={t.forms.close}
            onClick={() => setReading(null)}
            className="fixed inset-0 cursor-default bg-overlay animate-fade-in"
            tabIndex={-1}
          />
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="reader-title"
            className="relative my-8 w-full max-w-2xl animate-scale-in rounded-lg border border-line bg-surface shadow-xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line p-6">
              <div>
                <Meta article={reading} />
                <h2 id="reader-title" className="mt-3 text-title-2">
                  {reading.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setReading(null)}
                aria-label={t.forms.close}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm border border-line text-ink-3 transition-colors duration-[140ms] hover:bg-neutral-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-6 text-body-sm text-ink-2">
              <p className="text-body text-ink">{reading.summary}</p>
              <p>
                نسخه کامل این تحلیل همراه با داده‌های اجرایی و چک‌لیست پیاده‌سازی، در دانشنامه اختصاصی علاءالدین
                منتشر شده است. برای دریافت متن کامل و نمونه‌های واقعی پروژه، درخواست مشاوره ثبت کنید.
              </p>
              <div className="flex flex-wrap gap-3 border-t border-line pt-5">
                <Button tone="brand" size="md" onClick={onOpenConsult}>
                  {t.actions.consultShort}
                </Button>
                <Button tone="neutral" emphasis="outline" size="md" onClick={() => setReading(null)}>
                  {t.forms.close}
                </Button>
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  );
};
