import * as React from 'react';
import { ArrowRight, MapPin, Moon, Phone, Sun, Users } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { I18N_DATA } from '../../data/i18n';
import { localiseDigits, ui } from '../../app/i18n';
import { cx } from '../../design-system/tokens';
import { LogoMark } from '../chrome/Logo';
import { LanguageTile, LOCALES } from '../modals/LanguageModal';

/**
 * Welcome gate
 * --------------------------------------------------------------------------
 * First-visit landing: the emblem, the brand line and the five market tiles on
 * the atmospheric background (grid, light sources, faint code fragments).
 * Picking a language stores the preference and reveals the site; returning
 * visitors never see it again (the header globe re-opens the picker instead).
 */

/** faint monospace fragments — decorative, aria-hidden, never localised */
const CODE_DECOR: { text: string; className: string }[] = [
  { text: '</>', className: 'start-[6%] top-[16%] text-xl' },
  { text: '{ digital }', className: 'end-[7%] top-[18%]' },
  { text: 'search.optimize()', className: 'start-[3%] top-[48%]' },
  { text: 'cloud.deploy()', className: 'end-[4%] top-[50%]' },
  { text: 'const growth = build();', className: 'start-[9%] bottom-[16%]' },
  { text: 'AI.connect()', className: 'end-[9%] bottom-[14%]' },
];

export interface WelcomeGateProps {
  locale: LocaleKey;
  isLight: boolean;
  hotline: string;
  onSelectLocale: (locale: LocaleKey) => void;
  onThemeToggle: () => void;
  onNavigate: (page: PageId) => void;
  onEnter: () => void;
}

export const WelcomeGate: React.FC<WelcomeGateProps> = ({
  locale,
  isLight,
  hotline,
  onSelectLocale,
  onThemeToggle,
  onNavigate,
  onEnter,
}) => {
  const t = ui(locale);
  const contact = I18N_DATA[locale].marketContact;
  const year = new Date().getFullYear();

  const go = (page: PageId) => (event: React.MouseEvent) => {
    event.preventDefault();
    onEnter();
    onNavigate(page);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-canvas px-4 py-16 text-ink">
      {/* atmosphere ------------------------------------------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-lines" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 start-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-glow-brand blur-3xl rtl:translate-x-1/2" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-52 -end-32 size-[30rem] rounded-full bg-glow-cyan blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -start-24 size-[26rem] rounded-full bg-glow-brand blur-3xl opacity-60" />
      {CODE_DECOR.map(item => (
        <span key={item.text} aria-hidden="true" className={cx('code-decor hidden md:block', item.className)}>
          {item.text}
        </span>
      ))}

      {/* emblem + brand ---------------------------------------------------- */}
      <div className="relative flex w-full max-w-5xl flex-col items-center text-center">
        <div className="animate-float-slow">
          <LogoMark size={148} mode="emblem" />
        </div>

        <p className="ds-overline mt-6 text-brand-ink">{t.brand.tagline}</p>
        <h1 className="mt-3 text-display-2 sm:text-[3.5rem] sm:leading-[1.15] lg:text-[4.25rem]">
          {t.brand.name}
        </h1>
        <p className="mt-5 text-body text-ink-2">{t.language.title}</p>

        {/* market tiles ---------------------------------------------------- */}
        <ul className="mt-8 grid w-full gap-3 sm:grid-cols-3 lg:grid-cols-5" aria-label={t.common.chooseLanguage}>
          {LOCALES.map((code, index) => (
            <li key={code}>
              <LanguageTile code={code} size="lg" active={code === locale} onSelect={onSelectLocale} autoFocus={index === 0} />
            </li>
          ))}
        </ul>

        {/* continue in the current language */}
        <button
          type="button"
          onClick={onEnter}
          className="group mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-brand px-6 text-body-sm font-medium text-on-brand shadow-glow transition-[background-color,box-shadow] duration-[140ms] hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          {t.language.enter}
          <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-[200ms] group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
        </button>

        {/* utility row ------------------------------------------------------ */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-caption text-ink-2">
          <a href="/about" onClick={go('about-contact')} className="font-medium underline-offset-4 hover:text-brand-ink hover:underline">
            {t.nav.about}
          </a>
          <a href="/services" onClick={go('services')} className="font-medium underline-offset-4 hover:text-brand-ink hover:underline">
            {t.nav.services}
          </a>
          <a
            href="/cms-simulator"
            onClick={go('cms-simulator')}
            className="inline-flex h-9 items-center gap-1.5 rounded-full glass px-3.5 font-medium text-ink transition-colors duration-[140ms] hover:border-glass-line-strong"
          >
            <Users size={14} aria-hidden="true" />
            {t.nav.cmsSim}
          </a>
          <button
            type="button"
            onClick={onThemeToggle}
            aria-label={`${t.common.toggleTheme} — ${isLight ? t.common.dark : t.common.light}`}
            className="inline-flex size-9 items-center justify-center rounded-full glass text-ink-2 transition-colors duration-[140ms] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {isLight ? <Moon size={15} aria-hidden="true" /> : <Sun size={15} aria-hidden="true" />}
          </button>
          <span aria-hidden="true" className="hidden h-4 w-px bg-line-strong sm:block" />
          <a href={`tel:${hotline}`} className="inline-flex items-center gap-1.5 hover:text-brand-ink">
            <Phone size={13} aria-hidden="true" />
            <span data-numeric dir="ltr" className="ltr-isolate">
              {localiseDigits(contact.hotlineFormatted, locale)}
            </span>
          </a>
          <span className="inline-flex items-center gap-1.5 text-ink-3">
            <MapPin size={13} aria-hidden="true" />
            {contact.officeAddress}
          </span>
        </div>

        <p className="mt-5 text-[0.75rem] text-ink-3">
          © {localiseDigits(`2019–${year}`, locale)} {t.brand.name}. {t.footer.rights}
          <span aria-hidden="true" className="mx-2">·</span>
          <span className="inline-flex items-center gap-1">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-success-ink animate-pulse-dot" />
            {contact.countryName}
          </span>
        </p>
      </div>
    </main>
  );
};
