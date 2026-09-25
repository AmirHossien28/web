import * as React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Button, Section, SectionHeading } from '../../design-system/primitives';
import { homeCopy } from '../../app/homeCopy';
import { localiseDigits, ui } from '../../app/i18n';

/**
 * Process
 * --------------------------------------------------------------------------
 * Four numbered stages, each with the artefact it produces. Naming the
 * deliverable is what turns a process section from decoration into reassurance.
 */
export interface ProcessSectionProps {
  locale: LocaleKey;
  variant?: 'compact' | 'full';
  onNavigate?: (page: PageId) => void;
  onOpenConsult?: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  locale,
  variant = 'compact',
  onNavigate,
  onOpenConsult,
}) => {
  const t = ui(locale);
  const copy = homeCopy(locale).process;
  const architecture = SECTIONS_I18N[locale].architecture;
  const full = variant === 'full';

  return (
    <Section level="canvas" bordered>
      <SectionHeading
        overline={copy.tag}
        title={copy.title}
        description={copy.description}
        actions={
          full && onOpenConsult ? (
            <Button tone="brand" size="md" onClick={onOpenConsult}>
              {t.actions.consultShort}
            </Button>
          ) : onNavigate ? (
            <Button tone="neutral" emphasis="outline" size="md" onClick={() => onNavigate('process')}>
              {architecture.tag}
              <ArrowRight size={16} aria-hidden="true" className="rtl:rotate-180" />
            </Button>
          ) : undefined
        }
      />

      <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
        {copy.steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-4 bg-surface p-6 lg:p-7">
            <div className="flex items-center justify-between">
              <span
                data-numeric
                className="text-title-2 font-bold leading-none text-ink-4"
                aria-hidden="true"
              >
                {localiseDigits(String(index + 1).padStart(2, '0'), locale)}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>

            <div>
              <h3 className="text-title-3">{step.title}</h3>
              <p className="mt-2 text-body-sm text-ink-2">{step.description}</p>
            </div>

            <p className="mt-auto flex items-start gap-2 border-t border-line pt-4 text-caption text-ink-3">
              <CheckCircle2 size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-success-ink" />
              {step.deliverable}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-caption text-ink-3">{copy.footnote}</p>
    </Section>
  );
};
