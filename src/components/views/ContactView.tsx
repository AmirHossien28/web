import * as React from 'react';
import { Building2, Check, Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Users } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { Badge, Button, Card, Field, IconFrame, Section, SectionHeading } from '../../design-system/primitives';
import { PageHeader } from '../chrome/PageHeader';
import { homeCopy } from '../../app/homeCopy';
import { localiseDigits, ui } from '../../app/i18n';

/**
 * About & contact
 * --------------------------------------------------------------------------
 * Two jobs on one page: establish who we are (values + numbers), then make it
 * effortless to start a conversation. The form is short by design — three
 * required fields, one optional brief — and validates inline without shouting.
 */

const VALUES = [
  {
    icon: <ShieldCheck size={18} aria-hidden="true" />,
    title: 'شفافیت',
    body: 'قیمت، زمان‌بندی و محدوده پروژه از روز اول مکتوب است؛ هیچ هزینه‌ای در میانه راه اضافه نمی‌شود.',
  },
  {
    icon: <Users size={18} aria-hidden="true" />,
    title: 'تیم ثابت',
    body: 'پروژه شما به تیم ثابت خودمان سپرده می‌شود؛ برون‌سپاری و تغییر مداوم نیرو نداریم.',
  },
  {
    icon: <Building2 size={18} aria-hidden="true" />,
    title: 'مهندسی، نه ادعا',
    body: 'هر ادعای عملکردی با اندازه‌گیری قابل تکرار پشتیبانی می‌شود: سرعت، دسترس‌پذیری و پایداری.',
  },
];

export interface ContactViewProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  hotline: string;
  whatsapp: string;
}

export const ContactView: React.FC<ContactViewProps> = ({ locale, onNavigate, hotline, whatsapp }) => {
  const t = ui(locale);
  const trust = homeCopy(locale).trust;

  const [values, setValues] = React.useState({
    name: '',
    phone: '',
    email: '',
    details: '',
    service: 'corporate',
  });
  const [errors, setErrors] = React.useState<{ name?: string; phone?: string }>({});
  const [state, setState] = React.useState<'idle' | 'sending' | 'sent'>('idle');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (values.name.trim().length < 3) next.name = 'نام و نام خانوادگی را کامل وارد کنید.';
    const phone = values.phone.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[\s-]/g, '');
    if (!/^(0\d{10}|\+98\d{10})$/.test(phone)) next.phone = 'شماره تماس معتبر نیست؛ نمونه: ۰۹۱۲۳۴۵۶۷۸۹';
    setErrors(next);
    if (Object.keys(next).length) return;
    setState('sending');
    window.setTimeout(() => setState('sent'), 700);
  };

  return (
    <>
      <PageHeader
        page="about-contact"
        locale={locale}
        onNavigate={onNavigate}
        actions={
          <a href={`tel:${hotline}`} className="contents">
            <Button tone="brand" size="lg">
              <Phone size={16} aria-hidden="true" />
              <span data-numeric dir="ltr" className="ltr-isolate">
                {localiseDigits(hotline, locale)}
              </span>
            </Button>
          </a>
        }
      />

      <Section level="canvas">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trust.stats.map(stat => (
            <div key={stat.label} className="rounded-lg border border-line bg-surface p-6">
              <p data-numeric className="text-title-1 font-bold text-ink">
                {localiseDigits(
                  stat.decimals ? stat.value.toFixed(stat.decimals).replace('.', locale === 'fa' ? '٫' : '.') : stat.value,
                  locale,
                )}
                {stat.suffix ?? ''}
              </p>
              <p className="mt-2 text-caption text-ink-3">{stat.label}</p>
              {stat.hint && <p className="mt-1 text-caption text-ink-4">{stat.hint}</p>}
            </div>
          ))}
        </div>

        <SectionHeading
          className="mt-16"
          overline="ارزش‌های کاری ما"
          title="سه اصلی که در همه پروژه‌ها رعایت می‌شود"
          description="این اصول، معیار تصمیم‌گیری تیم ما در هر مرحله از پروژه است."
        />

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
          {VALUES.map(value => (
            <article key={value.title} className="flex flex-col gap-4 bg-surface p-6 lg:p-8">
              <IconFrame>{value.icon}</IconFrame>
              <h3 className="text-title-3">{value.title}</h3>
              <p className="text-body-sm text-ink-2">{value.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ------------------------------ contact ------------------------------ */}
      <Section level="subtle" bordered>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-overline font-semibold uppercase text-brand-ink">شروع همکاری</p>
            <h2 className="mt-3 text-title-1">{t.actions.consult}</h2>
            <p className="mt-3 text-body-sm text-ink-2">
              فرم را پر کنید یا مستقیم تماس بگیرید؛ کارشناس ارشد ما در نخستین ساعت کاری پاسخ می‌دهد.
            </p>

            <ul className="mt-8 flex flex-col divide-y divide-line border-y border-line">
              <li className="flex items-start gap-3 py-4">
                <IconFrame tone="neutral" size="sm">
                  <Phone size={16} aria-hidden="true" />
                </IconFrame>
                <div>
                  <p className="text-caption text-ink-3">{t.utility.hotline}</p>
                  <a
                    href={`tel:${hotline}`}
                    dir="ltr"
                    className="ltr-isolate text-body-sm font-semibold text-ink hover:text-brand-ink"
                  >
                    {localiseDigits(hotline, locale)}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 py-4">
                <IconFrame tone="neutral" size="sm">
                  <MessageCircle size={16} aria-hidden="true" />
                </IconFrame>
                <div>
                  <p className="text-caption text-ink-3">{t.actions.whatsapp}</p>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="ltr-isolate text-body-sm font-semibold text-ink hover:text-brand-ink"
                  >
                    {whatsapp}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 py-4">
                <IconFrame tone="neutral" size="sm">
                  <Mail size={16} aria-hidden="true" />
                </IconFrame>
                <div>
                  <p className="text-caption text-ink-3">{t.forms.email}</p>
                  <a href="mailto:info@aladdinweb.ir" dir="ltr" className="ltr-isolate text-body-sm font-semibold text-ink hover:text-brand-ink">
                    info@aladdinweb.ir
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 py-4">
                <IconFrame tone="neutral" size="sm">
                  <Clock size={16} aria-hidden="true" />
                </IconFrame>
                <div>
                  <p className="text-caption text-ink-3">ساعات پاسخ‌گویی</p>
                  <p className="text-body-sm font-semibold text-ink">{t.utility.hours}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 py-4">
                <IconFrame tone="neutral" size="sm">
                  <MapPin size={16} aria-hidden="true" />
                </IconFrame>
                <div>
                  <p className="text-caption text-ink-3">نشانی دفتر</p>
                  <p className="text-body-sm text-ink-2">{t.footer.address}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <Card padding="lg">
              {state === 'sent' ? (
                <div className="flex flex-col items-start gap-4 py-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-md border border-success-line bg-success text-success-ink">
                    <Check size={20} aria-hidden="true" />
                  </span>
                  <h3 className="text-title-3">{t.forms.successTitle}</h3>
                  <p className="text-body-sm text-ink-2">{t.forms.successDesc}</p>
                  <Button tone="neutral" emphasis="outline" size="sm" onClick={() => setState('idle')}>
                    {t.forms.close}
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <Badge tone="brand" variant="square" className="w-fit">
                      {t.utility.responseTime}
                    </Badge>
                    <h3 className="text-title-3">{t.actions.proposal}</h3>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="contact-name" label={t.forms.name} required error={errors.name}>
                      {fieldProps => (
                        <input
                          {...fieldProps}
                          autoComplete="name"
                          placeholder={t.forms.namePh}
                          value={values.name}
                          onChange={event => setValues(v => ({ ...v, name: event.target.value }))}
                        />
                      )}
                    </Field>

                    <Field
                      id="contact-phone"
                      label={t.forms.phone}
                      required
                      ltrInput
                      error={errors.phone}
                      hint={t.forms.phonePh}
                    >
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
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="contact-email" label={`${t.forms.email} (${t.forms.optional})`} ltrInput>
                      {fieldProps => (
                        <input
                          {...fieldProps}
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder={t.forms.emailPh}
                          value={values.email}
                          onChange={event => setValues(v => ({ ...v, email: event.target.value }))}
                        />
                      )}
                    </Field>

                    <Field id="contact-service" label={t.forms.service}>
                      {fieldProps => (
                        <select
                          {...fieldProps}
                          value={values.service}
                          onChange={event => setValues(v => ({ ...v, service: event.target.value }))}
                          className={`${fieldProps.className} appearance-none`}
                        >
                          <option value="corporate">{t.nav.svcCorporate}</option>
                          <option value="ecommerce">{t.nav.svcEcommerce}</option>
                          <option value="services">{t.nav.svcServices}</option>
                          <option value="portal">{t.nav.svcPortal}</option>
                        </select>
                      )}
                    </Field>
                  </div>

                  <Field id="contact-details" label={`${t.forms.details} (${t.forms.optional})`}>
                    {fieldProps => (
                      <textarea
                        {...fieldProps}
                        rows={4}
                        placeholder={t.forms.detailsPh}
                        value={values.details}
                        onChange={event => setValues(v => ({ ...v, details: event.target.value }))}
                      />
                    )}
                  </Field>

                  <Button tone="brand" size="lg" type="submit" disabled={state === 'sending'}>
                    {state === 'sending' ? t.actions.sending : t.actions.submit}
                  </Button>

                  <p className="border-t border-line pt-4 text-caption text-ink-4">{t.forms.privacy}</p>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
};
