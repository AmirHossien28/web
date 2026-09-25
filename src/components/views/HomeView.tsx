import * as React from 'react';
import type { LocaleKey, PageId, ProjectItem } from '../../types';
import { Hero } from '../sections/Hero';
import { TrustStrip } from '../sections/TrustStrip';
import { ServicesMatrix } from '../sections/ServicesMatrix';
import { WorkShowcase } from '../sections/WorkShowcase';
import { ProcessSection } from '../sections/ProcessSection';
import { PricingSection } from '../sections/PricingSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { InsightsSection } from '../sections/InsightsSection';
import { FaqSection } from '../sections/FaqSection';
import { CtaSection } from '../sections/CtaSection';

/**
 * Home page
 * --------------------------------------------------------------------------
 * Section order follows the buying decision, not a feature list:
 *   1. argument + immediate way to start a conversation   (Hero)
 *   2. proof that others trusted us                        (TrustStrip)
 *   3. what we sell, comparable side by side               (ServicesMatrix)
 *   4. evidence with measured numbers                      (WorkShowcase)
 *   5. how the work runs                                   (ProcessSection)
 *   6. what it costs                                       (PricingSection)
 *   7. human confirmation                                  (Testimonials)
 *   8. expertise                                           (Insights)
 *   9. remaining objections                                (Faq)
 *  10. one closing action                                  (Cta)
 *
 * Exactly one background change per two sections keeps the page calm to scan.
 */
export interface HomeViewProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  onSelectProject: (project: ProjectItem) => void;
  hotline: string;
  whatsapp: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  locale,
  onNavigate,
  onOpenConsult,
  onSelectProject,
  hotline,
  whatsapp,
}) => (
  <>
    <Hero locale={locale} onNavigate={onNavigate} onOpenConsult={onOpenConsult} hotline={hotline} />
    <TrustStrip locale={locale} />
    <ServicesMatrix locale={locale} onNavigate={onNavigate} onOpenConsult={onOpenConsult} />
    <WorkShowcase locale={locale} onNavigate={onNavigate} onOpenPreview={onSelectProject} />
    <ProcessSection locale={locale} onNavigate={onNavigate} />
    <PricingSection locale={locale} onNavigate={onNavigate} onOpenConsult={onOpenConsult} />
    <TestimonialsSection locale={locale} />
    <InsightsSection locale={locale} onNavigate={onNavigate} />
    <FaqSection locale={locale} onOpenConsult={onOpenConsult} />
    <CtaSection locale={locale} onOpenConsult={onOpenConsult} hotline={hotline} whatsapp={whatsapp} />
  </>
);
