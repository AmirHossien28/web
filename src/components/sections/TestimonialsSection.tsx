import * as React from 'react';
import { Star } from 'lucide-react';
import type { LocaleKey } from '../../types';
import { Section, SectionHeading } from '../../design-system/primitives';
import { homeCopy } from '../../app/homeCopy';
import { localiseDigits } from '../../app/i18n';

/**
 * Testimonials
 * --------------------------------------------------------------------------
 * Quotes are set as typographic plates: the sentence is the visual, attribution
 * is metadata. No avatars, no cards-in-cards, no carousel that hides content.
 */
export const TestimonialsSection: React.FC<{ locale: LocaleKey }> = ({ locale }) => {
  const copy = homeCopy(locale).testimonials;
  const ratingLabel = `${localiseDigits(5, locale)} / ${localiseDigits(5, locale)}`;

  return (
    <Section level="canvas" bordered>
      <SectionHeading overline={copy.tag} title={copy.title} description={copy.description} />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
        {copy.items.map(item => (
          <li key={item.author} className="flex flex-col bg-surface p-6 lg:p-8">
            <p aria-label={ratingLabel} className="flex items-center gap-0.5 text-warning-ink">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={14} aria-hidden="true" className="fill-current" />
              ))}
            </p>

            <blockquote className="mt-5 flex-1 text-body-sm leading-loose text-ink-2">
              <p>{item.quote}</p>
            </blockquote>

            <footer className="mt-6 flex flex-col gap-0.5 border-t border-line pt-4">
              <cite className="text-body-sm font-semibold not-italic text-ink">{item.author}</cite>
              <span className="text-caption text-ink-3">{item.role}</span>
            </footer>
          </li>
        ))}
      </ul>
    </Section>
  );
};
