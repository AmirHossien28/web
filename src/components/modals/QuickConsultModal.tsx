import * as React from 'react';
import { Check, Clock, Phone, ShieldCheck, X } from 'lucide-react';
import type { LocaleKey } from '../../types';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { I18N_DATA } from '../../data/i18n';
import { Badge, Button, Field } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { localiseDigits, ui } from '../../app/i18n';

/**
 * Consultation request
 * --------------------------------------------------------------------------
 * The single conversion surface of the product. Four fields, one required, an
 * inline validation contract and a success state that states exactly what
 * happens next. Nothing else competes for attention inside the dialog.
 */

const BUDGETS = [
  'زیر ۲۰ میلیون تومان',
  '۲۰ تا ۴۰ میلیون تومان',
  '۴۰ تا ۸۰ میلیون تومان',
  'بیش از ۸۰ میلیون تومان',
];

export interface QuickConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: LocaleKey;
}

export const QuickConsultModal: React.FC<QuickConsultModalProps> = ({ isOpen, onClose, currentLocale }) => {
  const locale = currentLocale;
  const t = ui(locale);
  const copy = SECTIONS_I18N[locale].consultModal;
  const contact = I18N_DATA[locale].marketContact;

  const [values, setValues] = React.useState({
    name: '',
    phone: '',
    service: 'corporate',
    budget: BUDGETS[1],
    details: '',
  });
  const [errors, setErrors] = React.useState<{ name?: string; phone?: string }>({});
  const [state, setState] = React.useState<'idle' | 'sending' | 'sent'>('idle');
  const panelRef = React.useRef<HTMLDivElement>(null);

  /* reset the flow each time the dialog opens, and lock the page behind it */
  React.useEffect(() => {
    if (!isOpen) return;
    setState('idle');
    setErrors({});
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter(el => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (values.name.trim().length < 3) next.name = 'نام را کامل وارد کنید.';
    const phone = values.phone.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[\s-]/g, '');
    if (!/^(0\d{10}|\+98\d{10})$/.test(phone)) next.phone = 'شماره تماس معتبر نیست؛ نمونه: ۰۹۱۲۳۴۵۶۷۸۹';
    setErrors(next);
    if (Object.keys(next).length) return;
    setState('sending');
    window.setTimeout(() => setState('sent'), 700);
  };

  return (
    <div className="fixed inset-0 z-modal flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label={copy.closeBtn}
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-overlay animate-fade-in"
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
        className="relative my-6 w-full max-w-lg animate-scale-in overflow-hidden rounded-lg border border-line bg-surface shadow-xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line p-6">
          <div>
            <Badge tone="brand" variant="square" className="w-fit">
              <Clock size={13} aria-hidden="true" />
              {t.utility.responseTime}
            </Badge>
            <h2 id="consult-title" className="mt-3 text-title-3">
              {state === 'sent' ? t.forms.successTitle : copy.title}
            </h2>
            <p className="mt-1 text-caption text-ink-3">
              {state === 'sent' ? t.forms.successDesc : copy.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeBtn}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm border border-line text-ink-3 transition-colors duration-[140ms] hover:bg-neutral-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </header>

        {state === 'sent' ? (
          <div className="flex flex-col items-start gap-4 p-6">
            <span className="inline-flex size-11 items-center justify-center rounded-md border border-success-line bg-success text-success-ink">
              <Check size={20} aria-hidden="true" />
            </span>
            <ul className="flex flex-col gap-2 text-caption text-ink-2">
              <li className="flex items-center gap-2">
                <ShieldCheck size={15} aria-hidden="true" className="text-success-ink" />
                {copy.privacy}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} aria-hidden="true" className="text-brand-ink" />
                <span data-numeric dir="ltr" className="ltr-isolate">
                  {localiseDigits(contact.hotlineFormatted, locale)}
                </span>
              </li>
            </ul>
            <Button tone="neutral" emphasis="outline" size="md" onClick={onClose}>
              {copy.closeBtn}
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className={cx('flex flex-col gap-5 p-6')}>
            <Field id="consult-name" label={copy.nameLabel} required error={errors.name}>
              {fieldProps => (
                <input
                  {...fieldProps}
                  autoComplete="name"
                  placeholder={copy.namePlaceholder}
                  value={values.name}
                  onChange={event => setValues(v => ({ ...v, name: event.target.value }))}
                />
              )}
            </Field>

            <Field id="consult-phone" label={copy.phoneLabel} required ltrInput error={errors.phone} hint={copy.phonePlaceholder}>
              {fieldProps => (
                <input
                  {...fieldProps}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={event => setValues(v => ({ ...v, phone: event.target.value }))}
                />
              )}
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="consult-service" label={copy.serviceLabel}>
                {fieldProps => (
                  <select
                    {...fieldProps}
                    value={values.service}
                    onChange={event => setValues(v => ({ ...v, service: event.target.value }))}
                    className={cx(fieldProps.className, 'appearance-none')}
                  >
                    <option value="corporate">{t.nav.svcCorporate}</option>
                    <option value="ecommerce">{t.nav.svcEcommerce}</option>
                    <option value="services">{t.nav.svcServices}</option>
                    <option value="portal">{t.nav.svcPortal}</option>
                  </select>
                )}
              </Field>

              <Field id="consult-budget" label={copy.budgetLabel}>
                {fieldProps => (
                  <select
                    {...fieldProps}
                    value={values.budget}
                    onChange={event => setValues(v => ({ ...v, budget: event.target.value }))}
                    className={cx(fieldProps.className, 'appearance-none')}
                  >
                    {BUDGETS.map(budget => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            </div>

            <Field id="consult-details" label={`${copy.detailsLabel} (${t.forms.optional})`}>
              {fieldProps => (
                <textarea
                  {...fieldProps}
                  rows={3}
                  placeholder={copy.detailsPlaceholder}
                  value={values.details}
                  onChange={event => setValues(v => ({ ...v, details: event.target.value }))}
                />
              )}
            </Field>

            <Button tone="brand" size="lg" type="submit" block disabled={state === 'sending'}>
              {state === 'sending' ? copy.submitting : copy.submitBtn}
            </Button>

            <p className="border-t border-line pt-4 text-caption text-ink-4">{copy.privacy}</p>
          </form>
        )}
      </div>
    </div>
  );
};
