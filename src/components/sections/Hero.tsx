import * as React from 'react';
import { ArrowRight, Check, Clock, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { I18N_DATA } from '../../data/i18n';
import { Button } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { localiseDigits, ui } from '../../app/i18n';
import { DeviceShowcase } from './DeviceShowcase';

/**
 * Hero
 * --------------------------------------------------------------------------
 * Centred statement on the atmospheric background — hairline grid, two light
 * sources, faint code fragments — followed by the device showcase and the four
 * value pillars on glass tiles. The conversion device (three-field form) moved
 * to the closing band so the opening reads as a single typographic argument.
 */

const CODE_DECOR: { text: string; className: string }[] = [
  { text: '</>', className: 'start-[4%] top-[14%] text-lg' },
  { text: '{ digital }', className: 'end-[5%] top-[12%]' },
  { text: 'search.optimize()', className: 'start-[2%] top-[42%]' },
  { text: 'cloud.deploy()', className: 'end-[3%] top-[40%]' },
  { text: 'const growth = build();', className: 'start-[6%] top-[62%]' },
  { text: 'AI.connect()', className: 'end-[8%] top-[60%]' },
];

export interface HeroProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  hotline: string;
}

export const Hero: React.FC<HeroProps> = ({ locale, onNavigate, onOpenConsult, hotline }) => {
  const hero = I18N_DATA[locale].hero;
  const t = ui(locale);

  const pillars = [
    { icon: <Clock size={16} aria-hidden="true" />, title: hero.pillarSpeed, desc: hero.pillarSpeedDesc },
    { icon: <Sparkles size={16} aria-hidden="true" />, title: hero.pillarCustom, desc: hero.pillarCustomDesc },
    { icon: <ShieldCheck size={16} aria-hidden="true" />, title: hero.pillarSupport, desc: hero.pillarSupportDesc },
    { icon: <Check size={16} aria-hidden="true" />, title: hero.pillarAi, desc: hero.pillarAiDesc },
  ];

  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      {/* atmosphere --------------------------------------------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-lines" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-56 start-1/2 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-glow-brand blur-3xl rtl:translate-x-1/2"
      />
      <div aria-hidden="true" className="pointer-events-none absolute top-[38%] -end-40 size-[28rem] rounded-full bg-glow-cyan blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-[46%] -start-40 size-[26rem] rounded-full bg-glow-brand opacity-70 blur-3xl" />
      {CODE_DECOR.map(item => (
        <span key={item.text} aria-hidden="true" className={cx('code-decor hidden lg:block', item.className)}>
          {item.text}
        </span>
      ))}

      <div className="container-page relative">
        <div className="flex flex-col items-center pt-16 text-center lg:pt-24">
          {/* eyebrow pill */}
          <span className="inline-flex min-h-8 flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full glass px-3.5 py-1 text-caption font-medium text-ink-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-cyan animate-pulse-dot" />
            {hero.dxpTag}
            <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong sm:block" />
            <span className="hidden text-ink-3 sm:inline">{hero.dxpSubtitle}</span>
          </span>

          <h1 className="mt-7 max-w-4xl text-display-2 sm:text-[3.25rem] sm:leading-[1.18] lg:text-[4rem] lg:leading-[1.15]">
            {hero.titlePart1}
            <span className="text-gradient-brand">{hero.highlightVisitors}</span>
            {hero.titlePart2}
            <span className="text-gradient-brand">{hero.highlightCustomers}</span>
            {hero.titlePart3}
          </h1>

          <p className="mt-6 max-w-2xl text-body text-ink-2 lg:text-body-lg">{hero.description}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button tone="brand" size="lg" onClick={onOpenConsult} className="group">
              {hero.ctaPrimary}
              <ArrowRight
                size={17}
                aria-hidden="true"
                className="transition-transform duration-[200ms] group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              />
            </Button>
            <Button
              tone="neutral"
              emphasis="outline"
              size="lg"
              onClick={() => onNavigate('portfolio')}
              className="glass border-glass-line-strong bg-transparent text-ink hover:bg-neutral-hover"
            >
              {hero.ctaSecondary}
            </Button>
          </div>

          <a
            href={`tel:${hotline}`}
            className="mt-5 inline-flex items-center gap-2 rounded-md px-2 text-caption font-semibold text-ink-3 transition-colors duration-[140ms] hover:text-brand-ink"
          >
            <Phone size={14} aria-hidden="true" />
            <span className="font-normal">{t.utility.hotline}</span>
            <span data-numeric dir="ltr" className="ltr-isolate text-ink">
              {localiseDigits(hotline, locale)}
            </span>
          </a>
        </div>

        {/* devices ------------------------------------------------------------ */}
        <DeviceShowcase locale={locale} className="mt-14 lg:mt-16" />

        {/* value pillars on glass tiles --------------------------------------- */}
        <dl className="relative -mt-2 grid gap-3 pb-14 sm:grid-cols-2 lg:grid-cols-4 lg:pb-20">
          {pillars.map(pillar => (
            <div key={pillar.title} className="flex gap-3 rounded-lg glass p-4">
              <span
                aria-hidden="true"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm border border-info-line bg-brand-soft text-brand-ink"
              >
                {pillar.icon}
              </span>
              <span className="flex flex-col gap-1">
                <dt className="text-body-sm font-semibold text-ink">{pillar.title}</dt>
                <dd className="text-caption text-ink-3">{pillar.desc}</dd>
              </span>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
