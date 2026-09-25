import * as React from 'react';
import { CheckCircle2, Clock, FileText, RefreshCw, Server, ShieldCheck, Timer } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Badge, Button, Card, IconFrame, Section, SectionHeading, Stat } from '../../design-system/primitives';
import { PageHeader } from '../chrome/PageHeader';
import { FaqSection } from '../sections/FaqSection';
import { CtaSection } from '../sections/CtaSection';
import { localiseDigits, ui } from '../../app/i18n';

/**
 * Service level agreement
 * --------------------------------------------------------------------------
 * The commitments page. Every claim is expressed as a number with a remedy, in
 * the order a buyer evaluates risk: response time → uptime → recovery →
 * ownership → remedies.
 */

interface Commitment {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
}

const COMMITMENTS: Commitment[] = [
  {
    icon: <Timer size={18} aria-hidden="true" />,
    title: 'زمان پاسخ اولیه',
    value: 'زیر ۲ ساعت کاری',
    detail: 'برای تیکت‌های بحرانی، پاسخ اولیه حداکثر ۳۰ دقیقه پس از ثبت درخواست ارسال می‌شود.',
  },
  {
    icon: <Server size={18} aria-hidden="true" />,
    title: 'پایداری سرویس',
    value: '۹۹.۹۸٪',
    detail: 'محاسبه ماهانه بر پایه پایش خارجی؛ در صورت افت، اعتبار خدمات جبرانی اعمال می‌شود.',
  },
  {
    icon: <RefreshCw size={18} aria-hidden="true" />,
    title: 'پشتیبان‌گیری',
    value: 'روزانه، ۳۰ روز نگهداری',
    detail: 'نسخه پشتیبان روی فضای جداگانه ذخیره و بازیابی آن حداکثر ۲ ساعت کاری انجام می‌شود.',
  },
  {
    icon: <ShieldCheck size={18} aria-hidden="true" />,
    title: 'امنیت و به‌روزرسانی',
    value: 'ماهانه',
    detail: 'به‌روزرسانی امنیتی هسته، افزونه‌ها و اسکن بدافزار، همراه با گزارش ماهانه کتبی.',
  },
  {
    icon: <FileText size={18} aria-hidden="true" />,
    title: 'مالکیت کامل',
    value: '۱۰۰٪ به نام کارفرما',
    detail: 'سورس‌کد، دامنه و هاست در پایان پروژه بدون هیچ قید و شرطی منتقل می‌شود.',
  },
  {
    icon: <Clock size={18} aria-hidden="true" />,
    title: 'پنجره تغییرات',
    value: '۲۴ ساعت کاری',
    detail: 'اعمال تغییرات محتوایی خارج از SLA حداکثر تا یک روز کاری پس از تأیید انجام می‌شود.',
  },
];

const TABLE = [
  { tier: 'پایه (۳ ماه)', response: '۸ ساعت کاری', uptime: '۹۹.۵٪', backup: 'هفتگی', channel: 'تیکت' },
  { tier: 'طلایی (۶ ماه)', response: '۲ ساعت کاری', uptime: '۹۹.۹٪', backup: 'روزانه', channel: 'تیکت + تلفن' },
  { tier: 'VIP (۱۲ ماه)', response: '۳۰ دقیقه', uptime: '۹۹.۹۸٪', backup: 'روزانه + بازیابی ساعتی', channel: 'تماس اختصاصی' },
];

export interface SlaGuaranteeViewProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  hotline: string;
  whatsapp: string;
}

export const SlaGuaranteeView: React.FC<SlaGuaranteeViewProps> = ({
  locale,
  onNavigate,
  onOpenConsult,
  hotline,
  whatsapp,
}) => {
  const t = ui(locale);
  const section = SECTIONS_I18N[locale].navTools;

  return (
    <>
      <PageHeader
        page="sla-guarantee"
        locale={locale}
        title={section.slaGuarantee}
        description={`${section.slaGuaranteeDesc} — این صفحه، متن تعهدنامه رسمی ما را به زبان ساده توضیح می‌دهد.`}
        onNavigate={onNavigate}
        actions={
          <>
            <Button tone="brand" size="lg" onClick={onOpenConsult}>
              {t.actions.proposal}
            </Button>
            <Button tone="neutral" emphasis="outline" size="lg" onClick={() => onNavigate('pricing-calculator')}>
              {t.actions.viewPricing}
            </Button>
          </>
        }
      />

      <Section level="canvas">
        <div className="grid gap-6 sm:grid-cols-3">
          <Card padding="md">
            <Stat value={`${localiseDigits('99.98', locale)}٪`} label="پایداری تضمین‌شده سالانه" tone="brand" />
          </Card>
          <Card padding="md">
            <Stat value={`${localiseDigits(30, locale)} دقیقه`} label="حداکثر زمان پاسخ بحرانی" />
          </Card>
          <Card padding="md">
            <Stat value={`${localiseDigits(100, locale)}٪`} label="انتقال مالکیت به کارفرما" />
          </Card>
        </div>

        <SectionHeading
          className="mt-16"
          overline="تعهدات ما"
          title="شش تعهد مشخص و قابل پیگیری"
          description="هر تعهد با معیار سنجش و مسیر جبران همراه است؛ در قرارداد نیز به همین شکل درج می‌شود."
        />

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {COMMITMENTS.map(item => (
            <article key={item.title} className="flex flex-col gap-4 bg-surface p-6">
              <div className="flex items-start justify-between gap-4">
                <IconFrame>{item.icon}</IconFrame>
                <Badge tone="success" variant="square" dot>
                  تعهدی
                </Badge>
              </div>
              <h3 className="text-body-sm font-semibold text-ink">{item.title}</h3>
              <p data-numeric className="text-title-3 font-bold text-brand-ink">
                {item.value}
              </p>
              <p className="text-caption text-ink-2">{item.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section level="subtle" bordered>
        <SectionHeading
          overline="سطوح پشتیبانی"
          title="کدام سطح پشتیبانی به شم­ا می‌خورد"
          description="سطوح پشتیبانی با پلن پروژه انتخاب می‌شوند و در قرارداد درج می‌گردند."
        />

        <div className="mt-10 overflow-x-auto rounded-lg border border-line bg-surface">
          <table className="w-full min-w-[42rem] border-collapse text-body-sm">
            <caption className="sr-only">مقایسه سطوح تضمین سطح خدمت</caption>
            <thead>
              <tr className="border-b border-line bg-subtle">
                <th scope="col" className="px-5 py-4 text-start text-caption font-semibold text-ink-3">
                  سطح پشتیبانی
                </th>
                <th scope="col" className="px-5 py-4 text-start text-caption font-semibold text-ink-3">
                  زمان پاسخ
                </th>
                <th scope="col" className="px-5 py-4 text-start text-caption font-semibold text-ink-3">
                  پایداری
                </th>
                <th scope="col" className="px-5 py-4 text-start text-caption font-semibold text-ink-3">
                  پشتیبان‌گیری
                </th>
                <th scope="col" className="px-5 py-4 text-start text-caption font-semibold text-ink-3">
                  کانال ارتباط
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map(row => (
                <tr key={row.tier} className="border-b border-line last:border-b-0">
                  <th scope="row" className="px-5 py-4 text-start text-body-sm font-semibold text-ink">
                    {row.tier}
                  </th>
                  <td data-numeric className="px-5 py-4 text-caption text-ink-2">
                    {row.response}
                  </td>
                  <td data-numeric className="px-5 py-4 text-caption text-ink-2">
                    {row.uptime}
                  </td>
                  <td className="px-5 py-4 text-caption text-ink-2">{row.backup}</td>
                  <td className="px-5 py-4 text-caption text-ink-2">{row.channel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 flex items-start gap-2 text-caption text-ink-3">
          <CheckCircle2 size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-success-ink" />
          گزارش عملکرد ماهانه (زمان پاسخ، رخدادها و اقدامات اصلاحی) به‌صورت کتبی برای کارفرما ارسال می‌شود.
        </p>
      </Section>

      <FaqSection locale={locale} onOpenConsult={onOpenConsult} />
      <CtaSection locale={locale} onOpenConsult={onOpenConsult} hotline={hotline} whatsapp={whatsapp} />
    </>
  );
};
