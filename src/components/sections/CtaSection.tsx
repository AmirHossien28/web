import * as React from 'react';
import { Clock, Mail, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import type { LocaleKey } from '../../types';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Button } from '../../design-system/primitives';
import { localiseDigits, ui } from '../../app/i18n';

/**
 * Closing call to action
 * --------------------------------------------------------------------------
 * One band, one decision, three ways to reach a human. Rendered on the inverse
 * surface so it reads as the end of the page without relying on colour blocking.
 */
export interface CtaSectionProps {
  locale: LocaleKey;
  onOpenConsult: () => void;
  hotline: string;
  whatsapp: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ locale, onOpenConsult, hotline, whatsapp }) => {
  const t = ui(locale);
  const section = SECTIONS_I18N[locale].ctaSection;

  return (
    <section className="bg-deep">
      <div className="container-page">
        <div className="grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-20">
          <div className="lg:col-span-7">
            <p className="text-overline font-semibold uppercase text-on-deep-muted">{section.tag}</p>
            <h2 className="mt-3 text-title-1 text-on-deep lg:text-display-2">{section.title}</h2>
            <p className="mt-4 max-w-2xl text-body-sm text-on-deep-muted lg:text-body">{section.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button tone="brand" size="lg" onClick={onOpenConsult} className="shadow-sm">
                {t.actions.consult}
              </Button>
              <a href={`tel:${hotline}`} className="contents">
                <Button
                  tone="neutral"
                  emphasis="outline"
                  size="lg"
                  className="border-deep-line bg-transparent text-on-deep hover:bg-white/10"
                >
                  <Phone size={16} aria-hidden="true" />
                  <span data-numeric dir="ltr" className="ltr-isolate">
                    {localiseDigits(hotline, locale)}
                  </span>
                </Button>
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contents"
              >
                <Button
                  tone="neutral"
                  emphasis="ghost"
                  size="lg"
                  className="text-on-deep-muted hover:bg-white/10 hover:text-on-deep"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  {section.btnWhatsapp}
                </Button>
              </a>
            </div>
          </div>

          <ul className="flex flex-col gap-4 border-t border-deep-line pt-8 lg:col-span-5 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
            {[
              { icon: <Clock size={16} aria-hidden="true" />, text: t.utility.responseTime },
              { icon: <ShieldCheck size={16} aria-hidden="true" />, text: SECTIONS_I18N[locale].navTools.slaGuaranteeDesc },
              { icon: <Mail size={16} aria-hidden="true" />, text: t.utility.hours },
            ].map(item => (
              <li key={item.text} className="flex items-start gap-3 text-body-sm text-on-deep-muted">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-on-deep-accent">
                  {item.icon}
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
