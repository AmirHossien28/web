import * as React from 'react';
import { ArrowRight, Check, Clock, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { I18N_DATA } from '../../data/i18n';
import { SERVICES_DATA } from '../../data/services';
import { Badge, Button, Field, IconFrame, Stat } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { localiseDigits, ui } from '../../app/i18n';
import { homeCopy } from '../../app/homeCopy';

/**
 * Hero
 * --------------------------------------------------------------------------
 * Editorial split: the argument on the reading side (start), the conversion
 * device on the other (a short, three-field request form). The value pillars sit
 * on a hairline baseline so the section reads as one typographic block rather
 * than a stack of widgets.
 */

/** Validation copy kept short and non-technical. */
const BAD_PHONE: Record<LocaleKey, string> = {
  fa: 'شماره تماس معتبر نیست؛ نمونه درست: ۰۹۱۲۳۴۵۶۷۸۹',
  en: 'That phone number looks invalid. Example: 0912 345 6789',
  ar: 'رقم الهاتف غير صالح. مثال: 09123456789',
  tr: 'Telefon numarası geçersiz. Örnek: 0912 345 6789',
  de: 'Diese Telefonnummer ist ungültig. Beispiel: 0912 345 6789',
};

const BAD_BUSINESS: Record<LocaleKey, string> = {
  fa: 'نام کسب‌وکار را کامل وارد کنید.',
  en: 'Please enter your business name.',
  ar: 'يرجى إدخال اسم الشركة.',
  tr: 'Lütfen işletme adınızı girin.',
  de: 'Bitte geben Sie Ihren Firmennamen ein.',
};

export interface HeroProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  hotline: string;
}

export const Hero: React.FC<HeroProps> = ({ locale, onNavigate, onOpenConsult, hotline }) => {
  const hero = I18N_DATA[locale].hero;
  const t = ui(locale);
  const copy = homeCopy(locale);

  const [values, setValues] = React.useState({ business: '', service: SERVICES_DATA[0].id, phone: '' });
  const [errors, setErrors] = React.useState<{ business?: string; phone?: string }>({});
  const [state, setState] = React.useState<'idle' | 'sending' | 'sent'>('idle');

  const serviceOptions = SERVICES_DATA.map(service => ({
    id: service.id,
    label: t.nav[(service.pageId === 'corporate-web-design'
      ? 'svcCorporate'
      : service.pageId === 'ecommerce-web-design'
        ? 'svcEcommerce'
        : service.pageId === 'services-web-design'
          ? 'svcServices'
          : 'svcPortal') as keyof typeof t.nav],
    pageId: service.pageId,
  }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (values.business.trim().length < 2) nextErrors.business = BAD_BUSINESS[locale];
    /* accepts 09xxxxxxxxx and +98…, in Latin or Persian digits */
    const normalised = values.phone.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[\s-]/g, '');
    if (!/^(0\d{10}|\+98\d{10})$/.test(normalised)) nextErrors.phone = BAD_PHONE[locale];
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setState('sending');
    window.setTimeout(() => setState('sent'), 700);
  };

  return (
    <section className="border-b border-line bg-canvas">
      <div className="container-page">
        <div className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* ---------------- argument ---------------- */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="brand" variant="square">
                <Sparkles size={13} aria-hidden="true" />
                {hero.dxpTag}
              </Badge>
              <span className="text-caption text-ink-3">{hero.dxpSubtitle}</span>
            </div>

            <h1 className="mt-6 text-display-2 lg:text-[3.25rem] lg:leading-[1.2]">
              {hero.titlePart1}
              <span className="text-brand-ink">{hero.highlightVisitors}</span>
              {hero.titlePart2}
              <span className="text-brand-ink">{hero.highlightCustomers}</span>
              {hero.titlePart3}
            </h1>

            <p className="mt-5 max-w-2xl text-body text-ink-2">{hero.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button tone="brand" size="lg" onClick={onOpenConsult}>
                {hero.ctaPrimary}
                <ArrowRight size={17} aria-hidden="true" className="rtl:rotate-180" />
              </Button>
              <Button
                tone="neutral"
                emphasis="outline"
                size="lg"
                onClick={() => onNavigate('portfolio')}
              >
                {hero.ctaSecondary}
              </Button>
              <a
                href={`tel:${hotline}`}
                className="inline-flex items-center gap-2 rounded-md px-2 text-caption font-semibold text-ink-2 transition-colors duration-[140ms] hover:text-brand-ink"
              >
                <Phone size={15} aria-hidden="true" />
                <span data-numeric dir="ltr" className="ltr-isolate">
                  {localiseDigits(hotline, locale)}
                </span>
              </a>
            </div>

            {/* value pillars on a hairline baseline */}
            <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: <Clock size={16} aria-hidden="true" />, title: hero.pillarSpeed, desc: hero.pillarSpeedDesc },
                { icon: <Sparkles size={16} aria-hidden="true" />, title: hero.pillarCustom, desc: hero.pillarCustomDesc },
                { icon: <ShieldCheck size={16} aria-hidden="true" />, title: hero.pillarSupport, desc: hero.pillarSupportDesc },
                { icon: <Check size={16} aria-hidden="true" />, title: hero.pillarAi, desc: hero.pillarAiDesc },
              ].map(pillar => (
                <div key={pillar.title} className="flex flex-col gap-2">
                  <IconFrame size="sm" tone="neutral">
                    {pillar.icon}
                  </IconFrame>
                  <dt className="text-body-sm font-semibold text-ink">{pillar.title}</dt>
                  <dd className="text-caption text-ink-3">{pillar.desc}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------------- conversion device ---------------- */}
          <div className="lg:col-span-5">
            <div className="rounded-lg border border-line bg-surface p-6 shadow-xs lg:sticky lg:top-28 lg:p-7">
              {state === 'sent' ? (
                <div className="flex flex-col items-start gap-4 py-6">
                  <span className="inline-flex size-11 items-center justify-center rounded-md border border-success-line bg-success text-success-ink">
                    <Check size={20} aria-hidden="true" />
                  </span>
                  <h2 className="text-title-3">{hero.formSuccessTitle}</h2>
                  <p className="text-body-sm text-ink-2">{hero.formSuccessDesc}</p>
                  <Button tone="neutral" emphasis="outline" size="sm" onClick={() => setState('idle')}>
                    {t.actions.request}
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Badge tone="success" variant="square" className="w-fit">
                      {hero.formFreeTag}
                    </Badge>
                    <h2 className="text-title-3">{hero.formTitle}</h2>
                    <p className="text-caption text-ink-3">{hero.formSubtitle}</p>
                  </div>

                  <Field
                    id="hero-business"
                    label={hero.formBusinessLabel}
                    required
                    error={errors.business}
                  >
                    {fieldProps => (
                      <input
                        {...fieldProps}
                        name="business"
                        autoComplete="organization"
                        placeholder={hero.formBusinessPlaceholder}
                        value={values.business}
                        onChange={event => setValues(v => ({ ...v, business: event.target.value }))}
                      />
                    )}
                  </Field>

                  <Field id="hero-service" label={hero.formTypeLabel} required>
                    {fieldProps => (
                      <select
                        {...fieldProps}
                        name="service"
                        value={values.service}
                        onChange={event => setValues(v => ({ ...v, service: event.target.value }))}
                        className={cx(fieldProps.className, 'appearance-none')}
                      >
                        {serviceOptions.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>

                  <Field
                    id="hero-phone"
                    label={hero.formPhoneLabel}
                    required
                    ltrInput
                    error={errors.phone}
                    hint={hero.formPhonePlaceholder}
                  >
                    {fieldProps => (
                      <input
                        {...fieldProps}
                        type="tel"
                        name="phone"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder={localiseDigits('0912 345 6789', locale)}
                        value={values.phone}
                        onChange={event => setValues(v => ({ ...v, phone: event.target.value }))}
                      />
                    )}
                  </Field>

                  <Button tone="brand" size="lg" type="submit" block disabled={state === 'sending'}>
                    {state === 'sending' ? t.actions.sending : hero.formSubmit}
                  </Button>

                  <div className="flex flex-col gap-2 border-t border-line pt-4 text-caption text-ink-3">
                    <span className="inline-flex items-center gap-2">
                      <Clock size={14} aria-hidden="true" />
                      {hero.formResponseTime}
                    </span>
                    <p className="text-ink-4">{hero.formPrivacy}</p>
                  </div>
                </form>
              )}
            </div>

            {/* stat pair: proof beside the form, where hesitation happens */}
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
              <Stat
                value={`${localiseDigits(copy.trust.stats[0].value, locale)}${copy.trust.stats[0].suffix ?? ''}`}
                label={copy.trust.stats[0].label}
              />
              <Stat
                value={`${localiseDigits(copy.trust.stats[1].value.toFixed(1).replace('.', t.dir === 'ltr' ? '.' : '٫'), locale)}${copy.trust.stats[1].suffix ?? ''}`}
                label={copy.trust.stats[1].label}
                tone="brand"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
