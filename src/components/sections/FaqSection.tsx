import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import type { LocaleKey } from '../../types';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Button, Disclosure, Section } from '../../design-system/primitives';

/**
 * FAQ
 * --------------------------------------------------------------------------
 * Objection handling, grouped in one column beside a sticky heading. Answers
 * carry short bullet proofs where the claim benefits from specifics.
 * Uses the design-system Disclosure so ARIA wiring is identical everywhere.
 */
export const FaqSection: React.FC<{
  locale: LocaleKey;
  onOpenConsult: () => void;
}> = ({ locale, onOpenConsult }) => {
  const section = SECTIONS_I18N[locale].faqSection;
  const [open, setOpen] = React.useState<string | null>(section.items[0]?.question ?? null);

  return (
    <Section level="canvas" bordered>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-overline font-semibold uppercase text-brand-ink">{section.tag}</p>
            <h2 className="mt-3 text-title-1">
              {section.title}
              <span className="text-brand-ink">{section.titleHighlight}</span>
            </h2>
            <p className="mt-3 text-body-sm text-ink-2">{section.description}</p>
            <Button tone="brand" emphasis="outline" size="md" className="mt-6" onClick={onOpenConsult}>
              {section.freeConsult}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="rounded-lg border border-line bg-surface px-6">
            {section.items.map((item, index) => {
              const id = `faq-${index}`;
              return (
                <Disclosure
                  key={id}
                  id={id}
                  question={item.question}
                  open={open === item.question}
                  onToggle={() => setOpen(current => (current === item.question ? null : item.question))}
                  defaultIcon={<ChevronDown size={18} />}
                >
                  <p>{item.answer}</p>
                  {item.bulletPoints?.length > 0 && (
                    <ul className="mt-3 flex flex-col gap-2">
                      {item.bulletPoints.map(point => (
                        <li key={point} className="flex items-start gap-2 text-caption text-ink-3">
                          <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </Disclosure>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
};
