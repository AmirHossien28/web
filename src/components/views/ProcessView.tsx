import * as React from 'react';
import { CheckCircle2, Download, GitBranch, Lock, Server, ShieldCheck, Timer, Users } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Button, Card, IconFrame, Section, SectionHeading } from '../../design-system/primitives';
import { PageHeader } from '../chrome/PageHeader';
import { ProcessSection } from '../sections/ProcessSection';
import { FaqSection } from '../sections/FaqSection';
import { CtaSection } from '../sections/CtaSection';
import { homeCopy } from '../../app/homeCopy';
import { localiseDigits, ui } from '../../app/i18n';

/**
 * Process & architecture
 * --------------------------------------------------------------------------
 * The "how we work" page: the four-stage method, the technical architecture in
 * plain language, the quality standards we hold ourselves to, and the SLA.
 * Everything the buyer needs before committing, on one page.
 */

const STANDARDS = [
  {
    icon: <Timer size={18} aria-hidden="true" />,
    title: 'بودجه عملکردی',
    body: 'هدف پروژه، LCP زیر ۱.۲ ثانیه در موبایل و امتیاز Lighthouse بالای ۹۵ است.',
  },
  {
    icon: <ShieldCheck size={18} aria-hidden="true" />,
    title: 'دسترس‌پذیری WCAG 2.2 AA',
    body: 'کنتراست ۴.۵:۱، پیمایش کامل با کیبورد، برچسب‌های فرم و هدف لمسی حداقل ۲۴ پیکسل.',
  },
  {
    icon: <Lock size={18} aria-hidden="true" />,
    title: 'امنیت و مالکیت',
    body: 'انتقال ۱۰۰٪ سورس‌کد، پشتیبان‌گیری روزانه و مالکیت کامل دامنه و هاست به نام کارفرما.',
  },
  {
    icon: <GitBranch size={18} aria-hidden="true" />,
    title: 'تحویل نسخه‌بندی‌شده',
    body: 'هر مرحله روی سرور آزمایشی قابل بازبینی است؛ تغییرات مستند و قابل بازگشت‌اند.',
  },
];

const ARCHITECTURE = [
  {
    icon: <Server size={18} aria-hidden="true" />,
    title: 'لایه ارائه',
    body: 'فرانت‌اند سبک با رندر سمت سرور، تصاویر بهینه و کش لبه‌ای برای پاسخ زیر یک ثانیه.',
  },
  {
    icon: <Users size={18} aria-hidden="true" />,
    title: 'لایه محتوا و کسب‌وکار',
    body: 'پنل مدیریت با مدل‌سازی محتوا، نقش‌ها و گردش تأیید؛ بدون وابستگی به یک افزونه خاص.',
  },
  {
    icon: <Download size={18} aria-hidden="true" />,
    title: 'لایه یکپارچه‌سازی',
    body: 'اتصال امن به درگاه پرداخت، سامانه پیامک، انبار و سامانه‌های داخلی سازمان از طریق API.',
  },
];

export interface ProcessViewProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  hotline: string;
  whatsapp: string;
}

export const ProcessView: React.FC<ProcessViewProps> = ({
  locale,
  onNavigate,
  onOpenConsult,
  hotline,
  whatsapp,
}) => {
  const t = ui(locale);
  const architecture = SECTIONS_I18N[locale].architecture;
  const copy = homeCopy(locale).process;
  const sla = SECTIONS_I18N[locale].navTools;

  return (
    <>
      <PageHeader
        page="process"
        locale={locale}
        title={architecture.title}
        description={architecture.description}
        onNavigate={onNavigate}
        actions={
          <>
            <Button tone="brand" size="lg" onClick={onOpenConsult}>
              {t.actions.consult}
            </Button>
            <Button tone="neutral" emphasis="outline" size="lg" onClick={() => onNavigate('sla-guarantee')}>
              {t.nav.sla}
            </Button>
          </>
        }
      />

      <ProcessSection locale={locale} variant="full" onOpenConsult={onOpenConsult} />

      <Section level="subtle" bordered>
        <SectionHeading
          overline={sla.specializedTitle}
          title="معماری فنی، به زبان روشن"
          description="سه لایه‌ای که پایداری، سرعت و قابلیت توسعه سایت شما را تضمین می‌کند."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
          {ARCHITECTURE.map(layer => (
            <article key={layer.title} className="flex flex-col gap-4 bg-surface p-6 lg:p-8">
              <IconFrame>{layer.icon}</IconFrame>
              <h3 className="text-title-3">{layer.title}</h3>
              <p className="text-body-sm text-ink-2">{layer.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section level="canvas" bordered>
        <SectionHeading
          overline="استانداردهای کیفیت"
          title="چه چیزی را تضمین می‌کنیم"
          description="این‌ها تعهدات قابل سنجش ما هستند، نه شعار تبلیغاتی."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {STANDARDS.map(item => (
            <Card key={item.title} padding="md" className="flex gap-4">
              <IconFrame tone="neutral">{item.icon}</IconFrame>
              <div>
                <h3 className="text-body-sm font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-caption text-ink-2">{item.body}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-subtle p-6">
          <p className="flex items-center gap-3 text-body-sm text-ink-2">
            <CheckCircle2 size={18} aria-hidden="true" className="shrink-0 text-success-ink" />
            {copy.footnote}
          </p>
          <p data-numeric className="text-caption text-ink-3">
            {localiseDigits('99.98', locale)}٪ {t.labels.result} — {sla.slaGuaranteeDesc}
          </p>
        </div>
      </Section>

      <FaqSection locale={locale} onOpenConsult={onOpenConsult} />
      <CtaSection locale={locale} onOpenConsult={onOpenConsult} hotline={hotline} whatsapp={whatsapp} />
    </>
  );
};
