import * as React from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Gauge, Globe, Info, Search, Smartphone, Zap } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Badge, Button, Card, Field, Meter, Section, SectionHeading } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { PageHeader } from '../chrome/PageHeader';
import { CtaSection } from '../sections/CtaSection';
import { localiseDigits, ui } from '../../app/i18n';

/**
 * Speed & technical SEO audit
 * --------------------------------------------------------------------------
 * A working self-assessment: the visitor enters a URL, picks the platform they
 * are on, and immediately sees a scored breakdown with prioritised fixes. The
 * numbers are a transparent benchmark model (not a live crawl), and the page says
 * so — trust is worth more than a fake spinner.
 */

interface Finding {
  id: string;
  title: string;
  detail: string;
  impact: 'high' | 'medium' | 'low';
  fix: string;
}

const PLATFORMS = ['wordpress', 'nextjs', 'custom', 'shopify', 'unknown'] as const;
type Platform = (typeof PLATFORMS)[number];

const PLATFORM_LABEL: Record<Platform, string> = {
  wordpress: 'وردپرس',
  nextjs: 'Next.js',
  custom: 'کد اختصاصی',
  shopify: 'شاپیفای',
  unknown: 'نمی‌دانم',
};

const BASE_SCORE: Record<Platform, number> = {
  wordpress: 58,
  nextjs: 82,
  custom: 74,
  shopify: 66,
  unknown: 62,
};

const FINDINGS: Finding[] = [
  {
    id: 'lcp',
    title: 'بزرگ‌ترین عنصر دیدنی دیر بارگذاری می‌شود',
    detail: 'تصویر شاخص صفحه با فرمت سنگین و بدون اولویت‌بندی بارگذاری می‌شود.',
    impact: 'high',
    fix: 'تبدیل به فرمت AVIF/WebP، تعیین ابعاد صریح و preload برای تصویر اصلی.',
  },
  {
    id: 'cls',
    title: 'جابه‌جایی ناگهانی چیدمان (CLS)',
    detail: 'فونت و بنرها پیش از بارگذاری کامل، جای محتوا را تغییر می‌دهند.',
    impact: 'high',
    fix: 'کنترل اندازه فونت با font-display و رزرو فضای بنر با aspect-ratio.',
  },
  {
    id: 'js',
    title: 'حجم جاوااسکریپت اضافه',
    detail: 'افزونه‌های غیرضروری و کتابخانه‌های تکراری در باندل اصلی قرار دارند.',
    impact: 'medium',
    fix: 'حذف وابستگی‌های تکراری، تقسیم کد (code splitting) و بارگذاری تنبل کامپوننت‌های پایین صفحه.',
  },
  {
    id: 'seo',
    title: 'ساختار سئوی تکنیکال ناقص',
    detail: 'نقشه سایت، داده ساختاریافته و تگ‌های canonical به‌طور کامل پوشش داده نشده‌اند.',
    impact: 'medium',
    fix: 'تکمیل sitemap، افزودن Schema سازمان/محصول و یکسان‌سازی آدرس‌های canonical.',
  },
  {
    id: 'cache',
    title: 'سیاست کش مرورگر تنظیم نشده',
    detail: 'دارایی‌های ایستا با طول عمر کوتاه سرو می‌شوند و بازدید بعدی کند است.',
    impact: 'low',
    fix: 'تنظیم هدرهای Cache-Control برای دارایی‌های نسخه‌دار.',
  },
];

const IMPACT_TONE = {
  high: { tone: 'danger' as const, label: 'اثر بالا' },
  medium: { tone: 'warning' as const, label: 'اثر متوسط' },
  low: { tone: 'neutral' as const, label: 'اثر کم' },
};

export interface SpeedAuditViewProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  hotline: string;
  whatsapp: string;
}

export const SpeedAuditView: React.FC<SpeedAuditViewProps> = ({
  locale,
  onNavigate,
  onOpenConsult,
  hotline,
  whatsapp,
}) => {
  const t = ui(locale);
  const section = SECTIONS_I18N[locale].navTools;
  const [url, setUrl] = React.useState('');
  const [platform, setPlatform] = React.useState<Platform>('wordpress');
  const [result, setResult] = React.useState<null | {
    performance: number;
    seo: number;
    mobile: number;
    accessibility: number;
  }>(null);

  const run = (event: React.FormEvent) => {
    event.preventDefault();
    const base = BASE_SCORE[platform];
    const hostBonus = /\.(ir|com)$/.test(url.trim()) ? 0 : 2;
    setResult({
      performance: Math.min(98, base + hostBonus),
      seo: Math.min(97, base + 6),
      mobile: Math.min(99, base + 10),
      accessibility: Math.min(96, base + 8),
    });
  };

  const scoreTone = (value: number) => (value >= 90 ? 'success' : value >= 70 ? 'brand' : 'warning');

  return (
    <>
      <PageHeader
        page="speed-audit"
        locale={locale}
        title={section.speedAudit}
        description={section.speedAuditDesc}
        onNavigate={onNavigate}
        actions={
          <Button tone="brand" size="lg" onClick={onOpenConsult}>
            {t.actions.consult}
          </Button>
        }
      />

      <Section level="canvas">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ------------------------------ input ------------------------------ */}
          <div className="lg:col-span-5">
            <Card padding="lg" className="lg:sticky lg:top-28">
              <h2 className="text-title-3">تحلیل سریع عملکرد</h2>
              <p className="mt-2 text-caption text-ink-3">
                آدرس صفحه را وارد کنید و پلتفرم فعلی را انتخاب کنید؛ برآورد امتیاز و اولویت‌بندی اصلاحات بلافاصله
                نمایش داده می‌شود.
              </p>

              <form onSubmit={run} className="mt-6 flex flex-col gap-5">
                <Field id="audit-url" label="آدرس صفحه" ltrInput hint="نمونه: https://example.com/products">
                  {fieldProps => (
                    <input
                      {...fieldProps}
                      type="url"
                      inputMode="url"
                      placeholder="https://"
                      value={url}
                      onChange={event => setUrl(event.target.value)}
                      required
                    />
                  )}
                </Field>

                <Field id="audit-platform" label="پلتفرم فعلی">
                  {fieldProps => (
                    <select
                      {...fieldProps}
                      value={platform}
                      onChange={event => setPlatform(event.target.value as Platform)}
                      className={cx(fieldProps.className, 'appearance-none')}
                    >
                      {PLATFORMS.map(key => (
                        <option key={key} value={key}>
                          {PLATFORM_LABEL[key]}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>

                <Button tone="brand" size="lg" type="submit" block>
                  <Zap size={16} aria-hidden="true" />
                  تحلیل کن
                </Button>

                <p className="flex items-start gap-2 border-t border-line pt-4 text-caption text-ink-4">
                  <Info size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                  این ابزار یک برآورد آموزشی بر پایه مدل مرجع ما است؛ تحلیل کامل با خزش واقعی سایت در جلسه مشاوره
                  انجام می‌شود.
                </p>
              </form>
            </Card>
          </div>

          {/* ------------------------------ results ------------------------------ */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="flex flex-col gap-8">
                <Card padding="lg">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Globe size={18} aria-hidden="true" className="text-brand-ink" />
                      <span dir="ltr" className="ltr-isolate text-body-sm font-medium text-ink">
                        {url || 'example.com'}
                      </span>
                    </div>
                    <Badge tone="brand" variant="square">
                      {PLATFORM_LABEL[platform]}
                    </Badge>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {[
                      { key: 'performance', label: 'عملکرد', value: result.performance, icon: <Gauge size={15} aria-hidden="true" /> },
                      { key: 'seo', label: 'سئوی تکنیکال', value: result.seo, icon: <Search size={15} aria-hidden="true" /> },
                      { key: 'mobile', label: 'تجربه موبایل', value: result.mobile, icon: <Smartphone size={15} aria-hidden="true" /> },
                      { key: 'accessibility', label: 'دسترس‌پذیری', value: result.accessibility, icon: <CheckCircle2 size={15} aria-hidden="true" /> },
                    ].map(item => (
                      <div key={item.key} className="flex flex-col gap-2 rounded-md border border-line bg-subtle p-4">
                        <span className="flex items-center gap-2 text-caption text-ink-3">
                          {item.icon}
                          {item.label}
                        </span>
                        <span data-numeric className="text-title-2 font-bold text-ink">
                          {localiseDigits(item.value, locale)}
                          <span className="ms-1 text-caption font-normal text-ink-3">/ {localiseDigits(100, locale)}</span>
                        </span>
                        <Meter
                          value={item.value}
                          label={item.label}
                          tone={scoreTone(item.value)}
                          valueText={`${localiseDigits(item.value, locale)}%`}
                        />
                      </div>
                    ))}
                  </div>
                </Card>

                <div>
                  <SectionHeading
                    overline="اولویت‌بندی اصلاحات"
                    title="چه چیزی را اول درست کنیم"
                    description="به ترتیب اثر روی سرعت، تجربه کاربر و رتبه جستجو مرتب شده است."
                  />
                  <ul className="mt-8 flex flex-col gap-4">
                    {FINDINGS.map(finding => {
                      const impact = IMPACT_TONE[finding.impact];
                      return (
                        <li key={finding.id} className="rounded-lg border border-line bg-surface p-5">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="flex items-center gap-2 text-body-sm font-semibold text-ink">
                              <AlertTriangle
                                size={16}
                                aria-hidden="true"
                                className={cx(
                                  'shrink-0',
                                  finding.impact === 'high'
                                    ? 'text-danger-ink'
                                    : finding.impact === 'medium'
                                      ? 'text-warning-ink'
                                      : 'text-ink-3',
                                )}
                              />
                              {finding.title}
                            </h3>
                            <Badge tone={impact.tone} variant="square">
                              {impact.label}
                            </Badge>
                          </div>
                          <p className="mt-2 text-caption text-ink-2">{finding.detail}</p>
                          <p className="mt-3 flex items-start gap-2 border-t border-line pt-3 text-caption text-ink-3">
                            <ArrowRight size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-ink rtl:rotate-180" />
                            <span>
                              <strong className="font-medium text-ink-2">راه‌حل: </strong>
                              {finding.fix}
                            </span>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <Card padding="lg" className="flex h-full flex-col justify-center gap-5 bg-subtle">
                <Gauge size={26} aria-hidden="true" className="text-brand-ink" />
                <h2 className="text-title-2">چهار شاخص کلیدی، در یک نگاه</h2>
                <p className="max-w-prose text-body-sm text-ink-2">
                  عملکرد، سئوی تکنیکال، تجربه موبایل و دسترس‌پذیری؛ همان چهار معیاری که مستقیماً روی نرخ تبدیل و
                  رتبه جستجوی شما اثر می‌گذارد. برای مشاهده برآورد، فرم را تکمیل کنید.
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {[
                    'بودجه LCP زیر ۱.۲ ثانیه',
                    'CLS نزدیک صفر',
                    'پوشش کامل Schema و sitemap',
                    'کنتراست و پیمایش کیبورد مطابق WCAG 2.2',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-caption text-ink-2">
                      <CheckCircle2 size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-success-ink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      </Section>

      <CtaSection locale={locale} onOpenConsult={onOpenConsult} hotline={hotline} whatsapp={whatsapp} />
    </>
  );
};
