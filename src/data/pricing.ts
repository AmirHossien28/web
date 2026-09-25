import type { LocaleKey } from '../types';

/**
 * Pricing model
 * --------------------------------------------------------------------------
 * Three tiers, because four or more measurably slows the decision. Each tier
 * states one positioning line, a short list of decision-driving features and an
 * explicit note about what is *not* included, which removes the biggest source
 * of pre-sales friction: ambiguity.
 *
 * Content is authored in Persian (primary market) and English; other locales
 * fall back to the English feature copy while keeping localised chrome.
 */

export interface PricingPlan {
  id: 'starter' | 'growth' | 'enterprise';
  name: string;
  tagline: string;
  /** monthly-equivalent mental anchor is avoided on purpose: one-time project fee */
  priceToman: number;
  /** false → "request a quote" instead of a number */
  publicPrice: boolean;
  deliveryDays: number;
  revisionRounds: number;
  features: string[];
  excludes: string;
  cta: string;
  badge?: string;
}

export interface ComparisonRow {
  label: string;
  /** one value per plan, in the same order as `plans` */
  values: [string, string, string];
}

export interface PricingContent {
  plans: PricingPlan[];
  comparison: ComparisonRow[];
  /** shown under the grid — the transparency promise */
  footnote: string;
  comparisonNote: string;
}

const FA: PricingContent = {
  plans: [
    {
      id: 'starter',
      name: 'پایه',
      tagline: 'برای کسبوکارهایی که میخواهند سریع، درست و قابل اتکا آنلاین شوند.',
      priceToman: 18_500_000,
      publicPrice: true,
      deliveryDays: 7,
      revisionRounds: 2,
      features: [
        'تا ۸ صفحه طراحی اختصاصی واکنشگرا',
        'پنل مدیریت محتوا و آموزش کار با آن',
        'سئوی تکنیکال پایه و نقشه سایت',
        'هاست ابری و دامنه، رایگان برای سال اول',
      ],
      excludes: 'بدون فروشگاه و بدون چندزبانگی',
      cta: 'شروع پروژه پایه',
    },
    {
      id: 'growth',
      name: 'رشد',
      tagline: 'انتخاب اکثر سازمانها؛ طراحی اختصاصی با تمرکز بر جذب سرنخ و فروش.',
      priceToman: 34_000_000,
      publicPrice: true,
      deliveryDays: 18,
      revisionRounds: 4,
      badge: 'مناسبترین انتخاب',
      features: [
        'تا ۲۵ صفحه با معماری اطلاعات سفارشی',
        'پروتوتایپ فیگما و دیزاین سیستم اختصاصی برند',
        'دو زبانه (فارسی + یک زبان) با ساختار سئو',
        'اتصال فرمها، پیامک و ابزار تحلیل رفتار',
        'تضمین سطح خدمت ۶ ماهه طلایی',
      ],
      excludes: 'افزودن فروشگاه، ماژول جداگانه محاسبه میشود',
      cta: 'شروع پروژه رشد',
    },
    {
      id: 'enterprise',
      name: 'سازمانی',
      tagline: 'برای پورتالها، سامانههای داخلی و برندهایی با نیازهای یکپارچهسازی.',
      priceToman: 0,
      publicPrice: false,
      deliveryDays: 45,
      revisionRounds: 6,
      features: [
        'صفحات نامحدود با ساختار ماژولار و مستندسازی',
        'احراز هویت، سطوح دسترسی و داشبورد مدیریتی',
        'یکپارچهسازی API با سامانههای داخلی سازمان',
        'چندزبانه نامحدود با مدیریت ترجمه',
        'تضمین سطح خدمت VIP ۱۲ ماهه و تیم پشتیبانی اختصاصی',
      ],
      excludes: 'هزینه لایسنسهای ثالث جداگانه محاسبه میشود',
      cta: 'درخواست پیشنهاد سازمانی',
    },
  ],
  comparison: [
    { label: 'تعداد صفحات', values: ['تا ۸ صفحه', 'تا ۲۵ صفحه', 'نامحدود'] },
    { label: 'طراحی اختصاصی رابط کاربری', values: ['✓', '✓', '✓'] },
    { label: 'پروتوتایپ تعاملی فیگما', values: ['—', '✓', '✓'] },
    { label: 'دیزاین سیستم اختصاصی برند', values: ['—', '✓', '✓'] },
    { label: 'چندزبانگی', values: ['—', 'دو زبانه', 'نامحدود'] },
    { label: 'فروشگاه و درگاه پرداخت', values: ['اختیاری', 'اختیاری', '✓'] },
    { label: 'یکپارچه‌سازی API سازمانی', values: ['—', 'محدود', '✓'] },
    { label: 'پنل مدیریت محتوا و آموزش', values: ['✓', '✓', '✓'] },
    { label: 'تضمین سطح خدمت (SLA)', values: ['۳ ماه', '۶ ماه طلایی', '۱۲ ماه VIP'] },
    { label: 'دورهای بازبینی طرح', values: ['۲ مرحله', '۴ مرحله', '۶ مرحله'] },
  ],
  footnote: 'قیمتهای اعلامشده پایه و بر اساس دامنه اولیه پروژه است؛ پیشفاکتور نهایی پس از نیازسنجی و بدون هیچ هزینه پنهانی صادر میشود.',
  comparisonNote: 'برای مقایسه جزئیات فنی، جدول کامل امکانات را در محاسبهگر ببینید.',
};

const EN: PricingContent = {
  plans: [
    {
      id: 'starter',
      name: 'Foundation',
      tagline: 'For businesses that need to be online quickly, correctly and reliably.',
      priceToman: 18_500_000,
      publicPrice: true,
      deliveryDays: 7,
      revisionRounds: 2,
      features: [
        'Up to 8 custom responsive pages',
        'Content management panel with training',
        'Technical SEO baseline and sitemap',
        'Cloud hosting and domain, free for year one',
      ],
      excludes: 'No store and no multilingual structure',
      cta: 'Start the Foundation project',
    },
    {
      id: 'growth',
      name: 'Growth',
      tagline: 'Chosen by most organisations: custom design focused on leads and revenue.',
      priceToman: 34_000_000,
      publicPrice: true,
      deliveryDays: 18,
      revisionRounds: 4,
      badge: 'Best value',
      features: [
        'Up to 25 pages with bespoke information architecture',
        'Figma prototype and a brand design system',
        'Bilingual (Persian + one language) with SEO structure',
        'Forms, SMS and analytics integration',
        'Gold six-month service level agreement',
      ],
      excludes: 'Store modules are quoted separately',
      cta: 'Start the Growth project',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'For portals, internal platforms and brands with integration requirements.',
      priceToman: 0,
      publicPrice: false,
      deliveryDays: 45,
      revisionRounds: 6,
      features: [
        'Unlimited pages, modular and documented',
        'Authentication, roles and management dashboards',
        'API integration with internal enterprise systems',
        'Unlimited languages with translation workflow',
        'Twelve-month VIP service level and a dedicated team',
      ],
      excludes: 'Third-party licences are billed separately',
      cta: 'Request an enterprise proposal',
    },
  ],
  comparison: [
    { label: 'Pages included', values: ['Up to 8', 'Up to 25', 'Unlimited'] },
    { label: 'Bespoke interface design', values: ['✓', '✓', '✓'] },
    { label: 'Interactive Figma prototype', values: ['—', '✓', '✓'] },
    { label: 'Brand design system', values: ['—', '✓', '✓'] },
    { label: 'Multilingual structure', values: ['—', 'Bilingual', 'Unlimited'] },
    { label: 'Store & payment gateway', values: ['Optional', 'Optional', '✓'] },
    { label: 'Enterprise API integration', values: ['—', 'Limited', '✓'] },
    { label: 'CMS panel with training', values: ['✓', '✓', '✓'] },
    { label: 'Service level agreement', values: ['3 months', '6 months gold', '12 months VIP'] },
    { label: 'Design revision rounds', values: ['2 rounds', '4 rounds', '6 rounds'] },
  ],
  footnote: 'Prices are baseline for the initial scope; the final quotation follows discovery and never includes hidden costs.',
  comparisonNote: 'For the full technical breakdown, open the estimator and its comparison table.',
};

export const PRICING: Record<LocaleKey, PricingContent> = {
  fa: FA,
  en: EN,
  ar: { ...EN, plans: EN.plans.map(p => ({ ...p })) },
  tr: { ...EN, plans: EN.plans.map(p => ({ ...p })) },
  de: { ...EN, plans: EN.plans.map(p => ({ ...p })) },
};
