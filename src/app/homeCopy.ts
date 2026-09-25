import type { LocaleKey } from '../types';

/**
 * Home page copy
 * --------------------------------------------------------------------------
 * Only the blocks that do not already exist in `data/i18n.ts` (hero) and
 * `data/sectionsI18n.ts` (services grid, case studies, architecture, pricing,
 * FAQ, CTA) live here: trust proof, process, testimonials and insights.
 *
 * Persian and English are authored; Arabic, Turkish and German reuse the
 * English block copy (the underlying client data is Persian-first) while their
 * section headings stay localised.
 */

export interface HomeStat {
  /** raw number — digits are localised at render time */
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  hint?: string;
}

export interface HomeCopy {
  trust: {
    title: string;
    clients: string;
    stats: HomeStat[];
  };
  process: {
    tag: string;
    title: string;
    description: string;
    steps: { title: string; description: string; deliverable: string }[];
    footnote: string;
  };
  testimonials: {
    tag: string;
    title: string;
    description: string;
    items: { quote: string; author: string; role: string }[];
  };
  insights: {
    tag: string;
    title: string;
    description: string;
  };
  /** case-study section labels that do not exist in sectionsI18n */
  work: {
    metricsLeadTime: string;
    metricsSearch: string;
    metricsMobile: string;
  };
}

const FA: HomeCopy = {
  trust: {
    title: 'مورد اعتماد تیم‌های فنی و مدیریتی سازمان‌ها',
    clients: 'نمونه برندهای همکار',
    stats: [
      { value: 480, suffix: '+', label: 'پروژه تحویل‌شده', hint: 'از سال ۱۳۹۳ تا امروز' },
      { value: 0.7, decimals: 1, suffix: ' ثانیه', label: 'میانگین سرعت بارگذاری', hint: 'سنجش با Core Web Vitals' },
      { value: 99.98, decimals: 2, suffix: '٪', label: 'پایداری سرویس', hint: 'در بازه ۱۲ ماه گذشته' },
      { value: 4.9, decimals: 1, suffix: ' از ۵', label: 'رضایت کارفرمایان', hint: 'میانگین ۱۲۸ نظر ثبت‌شده' },
    ],
  },
  process: {
    tag: 'فرایند چهارمرحله‌ای',
    title: 'روشی که ابهام را از پروژه حذف می‌کند',
    description:
      'در هر مرحله، خروجی مشخص و قابل بازبینی تحویل می‌گیرید. نه جلسه بی‌نتیجه، نه تصمیم‌های سلیقه‌ای، نه تغییر قیمت در میانه راه.',
    steps: [
      {
        title: 'کشف و نیازسنجی',
        description: 'بررسی مدل کسب‌وکار، رقبا و مخاطب؛ تثبیت اهداف قابل اندازه‌گیری پروژه.',
        deliverable: 'سند دامنه پروژه و شاخص‌های موفقیت',
      },
      {
        title: 'معماری و طراحی',
        description: 'تدوین معماری اطلاعات، وایرفریم و طراحی بصری مبتنی بر دیزاین سیستم برند.',
        deliverable: 'پروتوتایپ تعاملی فیگما',
      },
      {
        title: 'توسعه و مهندسی',
        description: 'کدنویسی فرانت‌اند و پنل مدیریت با استانداردهای دسترس‌پذیری و سرعت.',
        deliverable: 'نسخه قابل تست روی سرور آزمایشی',
      },
      {
        title: 'تحویل و پایداری',
        description: 'آزمون نهایی، آموزش تیم کارفرما، انتقال کامل سورس‌کد و شروع پشتیبانی تعهدی.',
        deliverable: 'سورس‌کد، مستندات و عقد SLA',
      },
    ],
    footnote: 'میانگین زمان تحویل پروژه‌های اختصاصی در ۱۲ ماه گذشته: ۲۳ روز کاری.',
  },
  testimonials: {
    tag: 'نظر کارفرمایان',
    title: 'نتیجه‌ای که مدیران مجموعه‌ها تأیید می‌کنند',
    description: 'به‌جای تعریف از خودمان، بگذارید اعداد و تجربه کارفرمایان صحبت کنند.',
    items: [
      {
        quote:
          'از زمان بازطراحی وب‌سایت، سرعت بارگذاری زیر یک ثانیه رسید و در استعلام روزانه آهن‌آلات، ده‌ها سرنخ باکیفیت از گوگل دریافت می‌کنیم. پاسخ‌گویی تیم فنی واقعاً کم‌نظیر است.',
        author: 'مهندس رامین صفوی',
        role: 'مدیرعامل بازرگانی فولاد آداک',
      },
      {
        quote:
          'تنوع کالای فروشگاه ما بسیار بالاست و دغدغه اصلی، هماهنگی فاکتور با انبار و درگاه پرداخت بدون قطعی بود. سیستم بدون نقص تحویل شد و پنل ساده‌ای در اختیار پرسنل قرار گرفت.',
        author: 'کیانوش رستمی',
        role: 'بنیان‌گذار آنلاین‌شاپ آرکابست',
      },
      {
        quote:
          'برای نمایشگاه‌های بین‌المللی دبی و استانبول به سایتی چندزبانه نیاز داشتیم. تیم علاءالدین با بالاترین استاندارد بصری و سرعت فوق‌العاده، پروژه را دقیقاً در موعد تحویل داد.',
        author: 'دکتر احسان فیاض',
        role: 'معاونت بازرگانی بین‌الملل آذرکار',
      },
    ],
  },
  insights: {
    tag: 'دانشنامه علاءالدین',
    title: 'تحلیل‌های کاربردی برای تصمیم‌های بهتر',
    description: 'تجربه اجرایی تیم ما در قالب مقالات کوتاه و قابل عمل، بدون شعار و بدون کلی‌گویی.',
  },
  work: {
    metricsLeadTime: 'زمان بارگذاری',
    metricsSearch: 'رتبه جستجو',
    metricsMobile: 'تجربه موبایل',
  },
};

const EN: HomeCopy = {
  trust: {
    title: 'Trusted by technical and executive teams',
    clients: 'A selection of client brands',
    stats: [
      { value: 480, suffix: '+', label: 'Projects delivered', hint: 'Since 2014' },
      { value: 0.7, decimals: 1, suffix: 's', label: 'Average load time', hint: 'Measured with Core Web Vitals' },
      { value: 99.98, decimals: 2, suffix: '%', label: 'Service uptime', hint: 'Over the last 12 months' },
      { value: 4.9, decimals: 1, suffix: '/5', label: 'Client satisfaction', hint: 'Average of 128 reviews' },
    ],
  },
  process: {
    tag: 'Four-stage process',
    title: 'A method that removes ambiguity from the project',
    description:
      'Every stage produces a reviewable artefact. No inconclusive meetings, no taste-based decisions, no price change halfway through.',
    steps: [
      {
        title: 'Discovery',
        description: 'Business model, competitors and audience analysis; measurable goals agreed and fixed.',
        deliverable: 'Scope document and success metrics',
      },
      {
        title: 'Architecture & design',
        description: 'Information architecture, wireframes and visual design built on a brand design system.',
        deliverable: 'Interactive Figma prototype',
      },
      {
        title: 'Engineering',
        description: 'Front-end and admin development to accessibility and performance standards.',
        deliverable: 'Testable build on a staging server',
      },
      {
        title: 'Delivery & stability',
        description: 'Final QA, team training, full source handover and the start of committed support.',
        deliverable: 'Source code, documentation and signed SLA',
      },
    ],
    footnote: 'Average delivery time for custom projects over the last 12 months: 23 business days.',
  },
  testimonials: {
    tag: 'Client voices',
    title: 'Outcomes that executive teams confirm',
    description: 'Instead of describing ourselves, we let the numbers and our clients speak.',
    items: [
      {
        quote:
          'Since the redesign, load time dropped below one second and our daily steel quotation service brings dozens of qualified leads from Google. The engineering support is remarkable.',
        author: 'Ramin Safavi',
        role: 'CEO, Adak Steel Trading',
      },
      {
        quote:
          'Our catalogue is huge and our main concern was keeping invoices, warehouse and payments in sync without downtime. The system was delivered flawlessly with a simple panel for staff.',
        author: 'Kianoush Rostami',
        role: 'Founder, Arkabest Online Store',
      },
      {
        quote:
          'We needed a multilingual site for international exhibitions in Dubai and Istanbul. The team delivered on schedule with outstanding visual standards and exceptional speed.',
        author: 'Dr. Ehsan Fayyaz',
        role: 'International Trade Director, Azarkar',
      },
    ],
  },
  insights: {
    tag: 'Aladdin knowledge base',
    title: 'Practical analysis for better decisions',
    description: 'Our engineering experience, written as short and actionable articles — no slogans, no generalities.',
  },
  work: {
    metricsLeadTime: 'Load time',
    metricsSearch: 'Search ranking',
    metricsMobile: 'Mobile experience',
  },
};

/** Localised section headers; block copy falls back to English. */
const AR: HomeCopy = {
  ...EN,
  trust: { ...EN.trust, title: 'موثوق به من الفرق التقنية والإدارية', clients: 'نماذج من عملائنا' },
  process: {
    ...EN.process,
    tag: 'منهجية من أربع مراحل',
    title: 'منهجية تُزيل الغموض من المشروع',
    description: 'في كل مرحلة تحصل على مخرج واضح قابل للمراجعة؛ بلا اجتماعات عقيمة وبلا تغيّر في السعر.',
  },
  testimonials: { ...EN.testimonials, tag: 'آراء العملاء', title: 'نتائج يؤكدها مدراء المؤسسات' },
  insights: { ...EN.insights, tag: 'قاعدة معرفة علاء الدين', title: 'تحليلات عملية لقرارات أفضل' },
};

const TR: HomeCopy = {
  ...EN,
  trust: { ...EN.trust, title: 'Teknik ve yönetici ekiplerin tercihi', clients: 'Birlikte çalıştığımız markalardan bazıları' },
  process: {
    ...EN.process,
    tag: 'Dört aşamalı süreç',
    title: 'Projedeki belirsizliği ortadan kaldıran yöntem',
    description: 'Her aşamada incelenebilir bir çıktı alırsınız; sonuçsuz toplantı ve ortada değişen fiyat yok.',
  },
  testimonials: { ...EN.testimonials, tag: 'Müşteri görüşleri', title: 'Yöneticilerin doğruladığı sonuçlar' },
  insights: { ...EN.insights, tag: 'Aladdin bilgi merkezi', title: 'Daha iyi kararlar için uygulamalı analizler' },
};

const DE: HomeCopy = {
  ...EN,
  trust: { ...EN.trust, title: 'Vertraut von Fach- und Führungsteams', clients: 'Eine Auswahl unserer Kundenmarken' },
  process: {
    ...EN.process,
    tag: 'Vierstufiger Prozess',
    title: 'Eine Methode, die Unklarheit aus dem Projekt nimmt',
    description: 'Jede Phase liefert ein prüfbares Ergebnis — keine ergebnislosen Meetings, keine Preisänderung mittendrin.',
  },
  testimonials: { ...EN.testimonials, tag: 'Kundenstimmen', title: 'Ergebnisse, die Führungsteams bestätigen' },
  insights: { ...EN.insights, tag: 'Aladdin Wissensbasis', title: 'Praxisnahe Analysen für bessere Entscheidungen' },
};

export const HOME_COPY: Record<LocaleKey, HomeCopy> = { fa: FA, en: EN, ar: AR, tr: TR, de: DE };

export const homeCopy = (locale: LocaleKey): HomeCopy => HOME_COPY[locale] ?? FA;
