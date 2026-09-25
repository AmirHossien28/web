import * as React from 'react';
import { Check, Clock } from 'lucide-react';
import type { LocaleKey } from '../../types';
import { I18N_DATA } from '../../data/i18n';
import { SERVICES_DATA } from '../../data/services';
import { Badge, Button, Field } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { localiseDigits, ui } from '../../app/i18n';

/**
 * Quick request form
 * --------------------------------------------------------------------------
 * The three-field conversion device (business, service, phone). Lives inside a
 * glass card wherever a page needs an immediate way to start a conversation —
 * the closing band of the home page and the service pages.
 */

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

export const QuickRequestForm: React.FC<{ locale: LocaleKey; className?: string }> = ({ locale, className }) => {
  const hero = I18N_DATA[locale].hero;
  const t = ui(locale);

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
    <div className={cx('rounded-xl glass-strong p-6 lg:p-7', className)}>
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
  );
};
