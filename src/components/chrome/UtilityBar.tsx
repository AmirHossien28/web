import * as React from 'react';
import { Clock, Phone } from 'lucide-react';
import type { LocaleKey } from '../../types';
import { ui, localiseDigits } from '../../app/i18n';
import { LanguageButton } from './controls';

/**
 * Utility bar — the quiet strip above the header.
 * It carries exactly three things: how to reach a human, when we answer, and
 * the locale/theme switches. Hidden below `lg`, where the drawer owns them.
 */
export interface UtilityBarProps {
  locale: LocaleKey;
  onOpenLanguage: () => void;
  hotline: string;
}

export const UtilityBar: React.FC<UtilityBarProps> = ({ locale, onOpenLanguage, hotline }) => {
  const t = ui(locale);

  return (
    <div className="hidden border-b border-line bg-subtle/80 backdrop-blur-md lg:block">
      <div className="container-page">
        <div className="flex h-10 items-center justify-between gap-6 text-caption text-ink-3">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${hotline}`}
              className="inline-flex items-center gap-1.5 font-medium text-ink-2 transition-colors duration-[140ms] hover:text-brand-ink"
            >
              <Phone size={14} aria-hidden="true" />
              <span className="text-ink-3">{t.utility.hotline}</span>
              <span data-numeric dir="ltr" className="ltr-isolate font-semibold text-ink">
                {localiseDigits(hotline, locale)}
              </span>
            </a>

            <span className="hidden items-center gap-1.5 xl:inline-flex">
              <Clock size={14} aria-hidden="true" />
              {t.utility.hours}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-success-ink" />
              {t.utility.available}
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-line" />
            <LanguageButton locale={locale} onOpen={onOpenLanguage} />
          </div>
        </div>
      </div>
    </div>
  );
};
