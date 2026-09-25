import type { LocaleKey, PageId } from '../types';

/**
 * Interface copy
 * --------------------------------------------------------------------------
 * All chrome, navigation, form and page-header strings. Marketing body copy
 * continues to live in `data/i18n.ts` and `data/sectionsI18n.ts`.
 */

export interface PageMeta {
  title: string;
  description: string;
}

export interface UIStrings {
  dir: 'rtl' | 'ltr';
  /** number rendering mode: fa → ۰۱۲۳, ar → ٠١٢٣, latn → 0123 */
  digits: 'fa' | 'ar' | 'latn';
  nav: {
    home: string;
    services: string;
    work: string;
    templates: string;
    process: string;
    pricing: string;
    insights: string;
    company: string;
    toolsTitle: string;
    about: string;
    aboutHint: string;
    sla: string;
    slaHint: string;
    speedAudit: string;
    speedAuditHint: string;
    cmsSim: string;
    cmsSimHint: string;
    designSystem: string;
    designSystemHint: string;
    badgeFree: string;
    /* service lines + remaining destinations referenced by the sitemap */
    svcCorporate: string;
    svcEcommerce: string;
    svcServices: string;
    svcPortal: string;
    contact: string;
  };
  common: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    chooseLanguage: string;
    toggleTheme: string;
    light: string;
    dark: string;
    home: string;
    breadcrumb: string;
    menu: string;
    allServices: string;
    allWork: string;
    allArticles: string;
    allTemplates: string;
    backToTop: string;
  };
  actions: {
    consult: string;
    consultShort: string;
    proposal: string;
    call: string;
    whatsapp: string;
    viewWork: string;
    viewDetails: string;
    compare: string;
    calculate: string;
    viewPricing: string;
    readMore: string;
    request: string;
    submit: string;
    sending: string;
    sent: string;
    copy: string;
    copied: string;
    openTool: string;
  };
  utility: {
    hotline: string;
    hours: string;
    available: string;
    responseTime: string;
  };
  footer: {
    brandLine: string;
    colServices: string;
    colSolutions: string;
    colCompany: string;
    colResources: string;
    contactTitle: string;
    address: string;
    rights: string;
    legal: string;
    registered: string;
  };
  forms: {
    name: string;
    namePh: string;
    phone: string;
    phonePh: string;
    email: string;
    emailPh: string;
    business: string;
    businessPh: string;
    service: string;
    budget: string;
    details: string;
    detailsPh: string;
    privacy: string;
    successTitle: string;
    successDesc: string;
    close: string;
    optional: string;
  };
  labels: {
    featured: string;
    bestValue: string;
    new: string;
    speed: string;
    seo: string;
    mobile: string;
    industry: string;
    stack: string;
    duration: string;
    result: string;
    languages: string;
    startPrice: string;
    from: string;
    toman: string;
  };
  pages: Record<PageId, PageMeta>;
}

const FA: UIStrings = {
  dir: 'rtl',
  digits: 'fa',
  nav: {
    home: 'خانه',
    services: 'خدمات',
    work: 'نمونهکارها',
    templates: 'قالبها',
    process: 'فرایند کار',
    pricing: 'تعرفهها',
    insights: 'دانشنامه',
    company: 'شرکت',
    toolsTitle: 'ابزارها و سیستم',
    about: 'درباره علاءالدین',
    aboutHint: 'تیم، ارزشها و سابقه اجرایی',
    sla: 'تضمین سطح خدمت (SLA)',
    slaHint: 'تعهدنامه پشتیبانی و زمان پاسخ',
    speedAudit: 'تست سرعت و سئو',
    speedAuditHint: 'آنالیز رایگان Core Web Vitals',
    cmsSim: 'شبیهساز پنل مدیریت',
    cmsSimHint: 'تجربه پنل پیش از سفارش',
    designSystem: 'دیزاین سیستم',
    designSystemHint: 'توکنها، کامپوننتها و قواعد UI',
    badgeFree: 'رایگان',
    svcCorporate: 'طراحی سایت شرکتی و چندزبانه',
    svcEcommerce: 'طراحی فروشگاه اینترنتی',
    svcServices: 'طراحی سایت خدماتی و رزرو آنلاین',
    svcPortal: 'طراحی پورتال و سامانه سازمانی',
    contact: 'تماس و شروع همکاری',
  },
  common: {
    skipToContent: 'پرش به محتوای اصلی',
    openMenu: 'باز کردن منو',
    closeMenu: 'بستن منو',
    chooseLanguage: 'انتخاب زبان',
    toggleTheme: 'تغییر پوسته روشن و تاریک',
    light: 'روشن',
    dark: 'تاریک',
    home: 'خانه',
    breadcrumb: 'مسیر صفحه',
    menu: 'منو',
    allServices: 'همه خدمات',
    allWork: 'همه نمونهکارها',
    allArticles: 'همه مقالات',
    allTemplates: 'همه قالبها',
    backToTop: 'بازگشت به بالا',
  },
  actions: {
    consult: 'درخواست مشاوره تخصصی',
    consultShort: 'مشاوره رایگان',
    proposal: 'دریافت پیشنهاد قیمت',
    call: 'تماس تلفنی',
    whatsapp: 'گفتوگو در واتساپ',
    viewWork: 'مشاهده نمونهکارها',
    viewDetails: 'جزئیات خدمات',
    compare: 'مقایسه خدمات',
    calculate: 'محاسبه قیمت پروژه',
    viewPricing: 'مشاهده تعرفهها',
    readMore: 'ادامه مطلب',
    request: 'ثبت درخواست',
    submit: 'ارسال درخواست',
    sending: 'در حال ارسال…',
    sent: 'درخواست ثبت شد',
    copy: 'کپی',
    copied: 'کپی شد',
    openTool: 'اجرای ابزار',
  },
  utility: {
    hotline: 'خط ویژه',
    hours: 'شنبه تا پنجشنبه، ۹ تا ۱۸',
    available: 'پاسخگویی فعال',
    responseTime: 'میانگین پاسخ: زیر ۲ ساعت کاری',
  },
  footer: {
    brandLine: 'مهندسی تجربه دیجیتال برای سازمانهایی که به دقت، سرعت و پایداری اهمیت میدهند.',
    colServices: 'خدمات',
    colSolutions: 'راهکارها',
    colCompany: 'شرکت',
    colResources: 'منابع',
    contactTitle: 'ارتباط مستقیم',
    address: 'تهران، خیابان ولیعصر، مرکز فناوری علاءالدین',
    rights: 'تمامی حقوق مادی و معنوی این وبسایت محفوظ است.',
    legal: 'قوانین و شرایط',
    registered: 'شناسه ملی ۱۴۰۲۸۷۴۵'
  },
  forms: {
    name: 'نام و نام خانوادگی',
    namePh: 'مثال: سارا محمدی',
    phone: 'شماره تماس',
    phonePh: '۰۹۱۲۳۴۵۶۷۸۹',
    email: 'پست الکترونیک',
    emailPh: 'name@company.com',
    business: 'نام کسبوکار',
    businessPh: 'مثال: صنایع آداک',
    service: 'خدمت مورد نیاز',
    budget: 'بودجه تقریبی',
    details: 'توضیح کوتاه پروژه',
    detailsPh: 'هدف پروژه، مخاطب و زمانبندی مورد انتظار…',
    privacy: 'اطلاعات شما محرمانه میماند و صرفاً برای تماس کارشناسان استفاده میشود.',
    successTitle: 'درخواست شما ثبت شد',
    successDesc: 'کارشناس ارشد ما در نخستین ساعت کاری با شما تماس میگیرد و پیشنهاد اولیه را ارائه میکند.',
    close: 'بستن',
    optional: 'اختیاری',
  },
  labels: {
    featured: 'شاخص',
    bestValue: 'مناسبترین انتخاب',
    new: 'جدید',
    speed: 'سرعت بارگذاری',
    seo: 'امتیاز سئو',
    mobile: 'تجربه موبایل',
    industry: 'حوزه فعالیت',
    stack: 'تکنولوژی',
    duration: 'زمان اجرا',
    result: 'نتیجه کلیدی',
    languages: 'زبانها',
    startPrice: 'شروع از',
    from: 'از',
    toman: 'تومان',
  },
  pages: {
    home: {
      title: 'طراحی و مهندسی وبسایت سازمانی',
      description: 'طراحی اختصاصی، مهندسی فرانتاند و بهینهسازی سرعت برای سازمانها؛ با تضمین سطح خدمت و شفافیت کامل در قیمت.',
    },
    services: {
      title: 'خدمات طراحی و توسعه وب',
      description: 'چهار خط خدمت مشخص: سایت شرکتی، فروشگاه آنلاین، سایت خدماتی و پورتال سازمانی.',
    },
    'corporate-web-design': {
      title: 'طراحی سایت شرکتی و چندزبانه',
      description: 'معماری اطلاعات، هویت بصری و پیادهسازی چندزبانه برای برندهایی که در بازار بینالمللی رقابت میکنند.',
    },
    'ecommerce-web-design': {
      title: 'طراحی فروشگاه اینترنتی',
      description: 'فروشگاه سریع، قابل اتکا و بهینه برای نرخ تبدیل؛ از معماری کاتالوگ تا یکپارچهسازی پرداخت و انبار.',
    },
    'services-web-design': {
      title: 'طراحی سایت خدماتی و رزرو آنلاین',
      description: 'سایتهایی برای کسبوکارهای خدماتی با تمرکز بر جذب سرنخ، رزرو آنلاین و ارتباط سریع با مشتری.',
    },
    'custom-portal-development': {
      title: 'طراحی پورتال و سامانه سازمانی',
      description: 'پورتالهای سازمانی با احراز هویت، سطوح دسترسی، داشبورد مدیریتی و یکپارچهسازی سامانههای داخلی.',
    },
    portfolio: {
      title: 'نمونهکارها و نتایج',
      description: 'پروژههایی با نتایج اندازهگیریشده در سرعت، رتبه جستجو و نرخ تبدیل.',
    },
    templates: {
      title: 'قالبهای آماده حرفهای',
      description: 'قالبهای بهینه و آماده راهاندازی با کد تمیز و امکان شخصیسازی کامل.',
    },
    'pricing-calculator': {
      title: 'تعرفهها و محاسبهگر شفاف قیمت',
      description: 'پلنهای مشخص، جدول مقایسه کامل و محاسبهگر آنلاین برای برآورد دقیق هزینه پروژه.',
    },
    process: {
      title: 'فرایند کار و معماری فنی',
      description: 'روش چهارمرحلهای ما، استانداردهای کیفیت و معماری فنی که پایداری سایت را تضمین میکند.',
    },
    'speed-audit': {
      title: 'تست سرعت و سئوی تکنیکال',
      description: 'تحلیل Core Web Vitals، گلوگاههای عملکرد و پیشنهادهای اجرایی برای بهبود سرعت.',
    },
    'cms-simulator': {
      title: 'شبیهساز پنل مدیریت محتوا',
      description: 'پنل مدیریت را پیش از سفارش تجربه کنید؛ ساختار صفحات، محصولات و محتوای چندزبانه.',
    },
    'sla-guarantee': {
      title: 'تضمین سطح خدمت (SLA)',
      description: 'تعهدنامه رسمی پشتیبانی: زمان پاسخ، پایداری، پشتیبانگیری و جبران خسارت.',
    },
    'knowledge-blog': {
      title: 'دانشنامه و مقالات تخصصی',
      description: 'تحلیلهای کاربردی درباره طراحی، سئو، سرعت و معماری وب برای تیمهای فنی و مدیران.',
    },
    'about-contact': {
      title: 'درباره ما و راههای ارتباطی',
      description: 'تیم، ارزشها، شمارههای تماس و مسیر شروع همکاری.',
    },
    'cms-design-system': {
      title: 'دیزاین سیستم علاءالدین',
      description: 'توکنهای طراحی، کامپوننتهای پایه، قواعد تایپوگرافی و استانداردهای دسترسپذیری.',
    },
  },
};

const EN: UIStrings = {
  ...FA,
  dir: 'ltr',
  digits: 'latn',
  nav: {
    home: 'Home',
    services: 'Services',
    work: 'Work',
    templates: 'Templates',
    process: 'Process',
    pricing: 'Pricing',
    insights: 'Insights',
    company: 'Company',
    toolsTitle: 'Tools & system',
    about: 'About Aladdin',
    aboutHint: 'Team, values and track record',
    sla: 'Service level agreement',
    slaHint: 'Support commitments and response times',
    speedAudit: 'Speed & SEO audit',
    speedAuditHint: 'Free Core Web Vitals analysis',
    cmsSim: 'CMS simulator',
    cmsSimHint: 'Try the admin panel before ordering',
    designSystem: 'Design system',
    designSystemHint: 'Tokens, components and UI rules',
    badgeFree: 'Free',
    svcCorporate: 'Corporate & multilingual sites',
    svcEcommerce: 'E-commerce stores',
    svcServices: 'Service business sites',
    svcPortal: 'Enterprise portals',
    contact: 'Contact & start a project',
  },
  common: {
    skipToContent: 'Skip to main content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    chooseLanguage: 'Choose language',
    toggleTheme: 'Toggle light and dark theme',
    light: 'Light',
    dark: 'Dark',
    home: 'Home',
    breadcrumb: 'Breadcrumb',
    menu: 'Menu',
    allServices: 'All services',
    allWork: 'All case studies',
    allArticles: 'All articles',
    allTemplates: 'All templates',
    backToTop: 'Back to top',
  },
  actions: {
    consult: 'Request a consultation',
    consultShort: 'Free consultation',
    proposal: 'Get a proposal',
    call: 'Call us',
    whatsapp: 'Chat on WhatsApp',
    viewWork: 'View case studies',
    viewDetails: 'Service details',
    compare: 'Compare services',
    calculate: 'Estimate project cost',
    viewPricing: 'View pricing',
    readMore: 'Read more',
    request: 'Send request',
    submit: 'Submit request',
    sending: 'Sending…',
    sent: 'Request received',
    copy: 'Copy',
    copied: 'Copied',
    openTool: 'Open tool',
  },
  utility: {
    hotline: 'Direct line',
    hours: 'Sat–Thu, 9:00–18:00',
    available: 'Support online',
    responseTime: 'Average response: under 2 business hours',
  },
  footer: {
    brandLine: 'Engineering digital experiences for organisations that value precision, speed and stability.',
    colServices: 'Services',
    colSolutions: 'Solutions',
    colCompany: 'Company',
    colResources: 'Resources',
    contactTitle: 'Direct contact',
    address: 'Tehran, Valiasr Ave., Aladdin Technology Center',
    rights: 'All rights reserved.',
    legal: 'Terms & conditions',
    registered: 'National ID 14028745',
  },
  forms: {
    name: 'Full name',
    namePh: 'e.g. Sara Mohammadi',
    phone: 'Phone number',
    phonePh: '+98 912 345 6789',
    email: 'Email',
    emailPh: 'name@company.com',
    business: 'Company',
    businessPh: 'e.g. Adak Steel',
    service: 'Service needed',
    budget: 'Approximate budget',
    details: 'Short project brief',
    detailsPh: 'Goal, audience and expected timeline…',
    privacy: 'Your details stay confidential and are used only for this conversation.',
    successTitle: 'Your request has been received',
    successDesc: 'A senior consultant will contact you within the next business hour with an initial proposal.',
    close: 'Close',
    optional: 'optional',
  },
  labels: {
    featured: 'Featured',
    bestValue: 'Best value',
    new: 'New',
    speed: 'Load time',
    seo: 'SEO score',
    mobile: 'Mobile experience',
    industry: 'Industry',
    stack: 'Stack',
    duration: 'Timeline',
    result: 'Key result',
    languages: 'Languages',
    startPrice: 'Starting at',
    from: 'from',
    toman: 'Toman',
  },
  pages: {
    ...FA.pages,
    home: { title: 'Corporate web design & engineering', description: 'Custom design, front-end engineering and performance work for organisations — with service-level commitments and transparent pricing.' },
    services: { title: 'Web design and development services', description: 'Four defined service lines: corporate sites, e-commerce, professional services and enterprise portals.' },
    portfolio: { title: 'Case studies and results', description: 'Projects with measured outcomes in speed, search ranking and conversion.' },
    templates: { title: 'Professional website templates', description: 'Performance-ready templates with clean code and full customisation options.' },
    'pricing-calculator': { title: 'Pricing and transparent estimator', description: 'Defined plans, a complete comparison table and a live estimator for project cost.' },
    process: { title: 'Process and technical architecture', description: 'Our four-stage method, quality standards and the architecture that keeps sites stable.' },
    'speed-audit': { title: 'Speed and technical SEO audit', description: 'Core Web Vitals analysis, performance bottlenecks and an actionable improvement plan.' },
    'cms-simulator': { title: 'CMS admin panel simulator', description: 'Try the admin panel before ordering: pages, products and multilingual content.' },
    'sla-guarantee': { title: 'Service level agreement', description: 'Formal support commitments: response time, uptime, backups and remedies.' },
    'knowledge-blog': { title: 'Insights and technical articles', description: 'Practical analysis on design, SEO, performance and web architecture.' },
    'about-contact': { title: 'About us and contact', description: 'Team, values, contact numbers and how to start a project.' },
    'cms-design-system': { title: 'Aladdin design system', description: 'Design tokens, base components, typography rules and accessibility standards.' },
    'corporate-web-design': { title: 'Corporate and multilingual websites', description: 'Information architecture, visual identity and multilingual delivery for global brands.' },
    'ecommerce-web-design': { title: 'E-commerce store development', description: 'Fast, reliable, conversion-optimised stores — from catalogue architecture to payments.' },
    'services-web-design': { title: 'Service business websites', description: 'Sites built for lead generation, online booking and quick customer contact.' },
    'custom-portal-development': { title: 'Enterprise portals and platforms', description: 'Portals with authentication, roles, dashboards and internal system integration.' },
  },
};

const AR: UIStrings = {
  ...FA,
  digits: 'ar',
  nav: {
    ...FA.nav,
    home: 'الرئيسية',
    services: 'الخدمات',
    work: 'أعمالنا',
    templates: 'القوالب',
    process: 'منهجية العمل',
    pricing: 'الأسعار',
    insights: 'المدونة',
    company: 'الشركة',
    toolsTitle: 'الأدوات والنظام',
    about: 'عن علاء الدين',
    aboutHint: 'الفريق والقيم والسجل التنفيذي',
    sla: 'اتفاقية مستوى الخدمة',
    slaHint: 'التزامات الدعم وأوقات الاستجابة',
    speedAudit: 'فحص السرعة والسيو',
    speedAuditHint: 'تحليل مجاني لمؤشرات الويب الأساسية',
    cmsSim: 'محاكي لوحة التحكم',
    cmsSimHint: 'جرّب اللوحة قبل الطلب',
    designSystem: 'نظام التصميم',
    designSystemHint: 'الرموز والمكوّنات وقواعد الواجهة',
    badgeFree: 'مجاني',
    svcCorporate: 'مواقع الشركات متعددة اللغات',
    svcEcommerce: 'المتاجر الإلكترونية',
    svcServices: 'مواقع الشركات الخدمية',
    svcPortal: 'بوابات المؤسسات',
    contact: 'التواصل وبدء المشروع',
  },
  common: {
    ...FA.common,
    skipToContent: 'تخطٍ إلى المحتوى الرئيسي',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    chooseLanguage: 'اختيار اللغة',
    toggleTheme: 'تبديل السمة الفاتحة والداكنة',
    light: 'فاتح',
    dark: 'داكن',
    home: 'الرئيسية',
    breadcrumb: 'مسار الصفحة',
    menu: 'القائمة',
    allServices: 'جميع الخدمات',
    allWork: 'جميع الأعمال',
    allArticles: 'جميع المقالات',
    allTemplates: 'جميع القوالب',
    backToTop: 'العودة إلى الأعلى',
  },
  actions: {
    ...FA.actions,
    consult: 'طلب استشارة متخصصة',
    consultShort: 'استشارة مجانية',
    proposal: 'احصل على عرض سعر',
    call: 'اتصل بنا',
    whatsapp: 'المحادثة على واتساب',
    viewWork: 'استعراض الأعمال',
    viewDetails: 'تفاصيل الخدمة',
    compare: 'مقارنة الخدمات',
    calculate: 'احسب تكلفة المشروع',
    viewPricing: 'استعراض الأسعار',
    readMore: 'اقرأ المزيد',
    request: 'إرسال الطلب',
    submit: 'إرسال الطلب',
    sending: 'جارٍ الإرسال…',
    sent: 'تم استلام الطلب',
    copy: 'نسخ',
    copied: 'تم النسخ',
    openTool: 'فتح الأداة',
  },
  utility: {
    hotline: 'الخط المباشر',
    hours: 'السبت–الخميس، ٩:٠٠–١٨:٠٠',
    available: 'الدعم متاح',
    responseTime: 'متوسط الرد: أقل من ساعتين عمل',
  },
  footer: {
    ...FA.footer,
    brandLine: 'هندسة التجارب الرقمية للمؤسسات التي تقدّر الدقة والسرعة والاستقرار.',
    colServices: 'الخدمات',
    colSolutions: 'الحلول',
    colCompany: 'الشركة',
    colResources: 'المصادر',
    contactTitle: 'تواصل مباشر',
    address: 'طهران، شارع ولي العصر، مركز علاء الدين للتقنية',
    rights: 'جميع الحقوق محفوظة.',
    legal: 'الشروط والأحكام',
  },
  forms: {
    ...FA.forms,
    name: 'الاسم الكامل',
    namePh: 'مثال: سارة محمدي',
    phone: 'رقم الهاتف',
    phonePh: '+98 912 345 6789',
    email: 'البريد الإلكتروني',
    business: 'اسم الشركة',
    service: 'الخدمة المطلوبة',
    budget: 'الميزانية التقريبية',
    details: 'وصف مختصر للمشروع',
    privacy: 'تبقى بياناتك سرية وتُستخدم للتواصل فقط.',
    successTitle: 'تم تسجيل طلبك',
    successDesc: 'سيتواصل معك مستشار أول خلال ساعة العمل القادمة بعرض أولي.',
    close: 'إغلاق',
    optional: 'اختياري',
  },
  labels: {
    ...FA.labels,
    featured: 'مميز',
    bestValue: 'الأنسب',
    new: 'جديد',
    speed: 'سرعة التحميل',
    seo: 'درجة السيو',
    mobile: 'تجربة الجوال',
    industry: 'القطاع',
    stack: 'التقنيات',
    duration: 'المدة',
    result: 'النتيجة الأساسية',
    languages: 'اللغات',
    startPrice: 'يبدأ من',
    from: 'من',
    toman: 'تومان',
  },
  pages: FA.pages,
};

const TR: UIStrings = {
  ...FA,
  digits: 'latn',
  nav: {
    ...FA.nav,
    home: 'Ana sayfa',
    services: 'Hizmetler',
    work: 'Projeler',
    templates: 'Şablonlar',
    process: 'Süreç',
    pricing: 'Fiyatlar',
    insights: 'Bilgi merkezi',
    company: 'Şirket',
    toolsTitle: 'Araçlar ve sistem',
    about: 'Aladdin hakkında',
    aboutHint: 'Ekip, değerler ve referanslar',
    sla: 'Hizmet seviyesi taahhüdü',
    slaHint: 'Destek taahhütleri ve yanıt süreleri',
    speedAudit: 'Hız ve SEO testi',
    speedAuditHint: 'Ücretsiz Core Web Vitals analizi',
    cmsSim: 'CMS panel simülatörü',
    cmsSimHint: 'Sipariş öncesi paneli deneyin',
    designSystem: 'Tasarım sistemi',
    designSystemHint: 'Tokenlar, bileşenler ve arayüz kuralları',
    badgeFree: 'Ücretsiz',
    svcCorporate: 'Kurumsal ve çok dilli siteler',
    svcEcommerce: 'E-ticaret mağazaları',
    svcServices: 'Hizmet işletmesi siteleri',
    svcPortal: 'Kurumsal portallar',
    contact: 'İletişim ve proje başlangıcı',
  },
  common: {
    ...FA.common,
    skipToContent: 'Ana içeriğe geç',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    chooseLanguage: 'Dil seçin',
    toggleTheme: 'Açık/koyu temayı değiştir',
    light: 'Açık',
    dark: 'Koyu',
    home: 'Ana sayfa',
    breadcrumb: 'Sayfa yolu',
    menu: 'Menü',
    allServices: 'Tüm hizmetler',
    allWork: 'Tüm projeler',
    allArticles: 'Tüm yazılar',
    allTemplates: 'Tüm şablonlar',
    backToTop: 'Yukarı dön',
  },
  actions: {
    ...FA.actions,
    consult: 'Uzman danışmanlık talep et',
    consultShort: 'Ücretsiz danışmanlık',
    proposal: 'Teklif alın',
    call: 'Bizi arayın',
    whatsapp: 'WhatsApp ile yazın',
    viewWork: 'Projeleri görün',
    viewDetails: 'Hizmet detayları',
    compare: 'Hizmetleri karşılaştır',
    calculate: 'Proje maliyetini hesapla',
    viewPricing: 'Fiyatları görün',
    readMore: 'Devamını oku',
    request: 'Talep gönder',
    submit: 'Talebi gönder',
    sending: 'Gönderiliyor…',
    sent: 'Talep alındı',
    openTool: 'Aracı aç',
  },
  utility: {
    hotline: 'Direkt hat',
    hours: 'Cmt–Prş, 09:00–18:00',
    available: 'Destek aktif',
    responseTime: 'Ortalama yanıt: 2 iş saatinden kısa',
  },
  footer: {
    ...FA.footer,
    brandLine: 'Kesinlik, hız ve kararlılığa önem veren kurumlar için dijital deneyim mühendisliği.',
    colServices: 'Hizmetler',
    colSolutions: 'Çözümler',
    colCompany: 'Şirket',
    colResources: 'Kaynaklar',
    contactTitle: 'Doğrudan iletişim',
    address: 'Tahran, Valiasr Cad., Aladdin Teknoloji Merkezi',
    rights: 'Tüm hakları saklıdır.',
    legal: 'Şartlar ve koşullar',
  },
  forms: {
    ...FA.forms,
    name: 'Ad soyad',
    phone: 'Telefon',
    email: 'E-posta',
    business: 'Şirket',
    service: 'İhtiyaç duyulan hizmet',
    budget: 'Yaklaşık bütçe',
    details: 'Kısa proje özeti',
    privacy: 'Bilgileriniz gizli kalır ve yalnızca iletişim için kullanılır.',
    successTitle: 'Talebiniz alındı',
    successDesc: 'Kıdemli danışmanımız bir iş saati içinde ilk teklifle dönecek.',
    close: 'Kapat',
    optional: 'isteğe bağlı',
  },
  labels: {
    ...FA.labels,
    featured: 'Öne çıkan',
    bestValue: 'En uygun',
    new: 'Yeni',
    speed: 'Yüklenme süresi',
    seo: 'SEO puanı',
    mobile: 'Mobil deneyim',
    industry: 'Sektör',
    stack: 'Teknoloji',
    duration: 'Süre',
    result: 'Kilit sonuç',
    languages: 'Diller',
    startPrice: 'Başlangıç',
    from: 'itibaren',
    toman: 'Toman',
  },
  pages: FA.pages,
};

const DE: UIStrings = {
  ...FA,
  dir: 'ltr',
  digits: 'latn',
  nav: {
    ...FA.nav,
    home: 'Start',
    services: 'Leistungen',
    work: 'Referenzen',
    templates: 'Vorlagen',
    process: 'Ablauf',
    pricing: 'Preise',
    insights: 'Wissen',
    company: 'Unternehmen',
    toolsTitle: 'Tools & System',
    about: 'Über Aladdin',
    aboutHint: 'Team, Werte und Referenzen',
    sla: 'Service-Level-Vereinbarung',
    slaHint: 'Support-Zusagen und Reaktionszeiten',
    speedAudit: 'Speed- & SEO-Audit',
    speedAuditHint: 'Kostenlose Core-Web-Vitals-Analyse',
    cmsSim: 'CMS-Simulator',
    cmsSimHint: 'Admin-Panel vor der Bestellung testen',
    designSystem: 'Designsystem',
    designSystemHint: 'Tokens, Komponenten und UI-Regeln',
    badgeFree: 'Kostenlos',
    svcCorporate: 'Corporate- und mehrsprachige Websites',
    svcEcommerce: 'E-Commerce-Shops',
    svcServices: 'Dienstleister-Websites',
    svcPortal: 'Unternehmensportale',
    contact: 'Kontakt & Projektstart',
  },
  common: {
    ...FA.common,
    skipToContent: 'Zum Hauptinhalt springen',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    chooseLanguage: 'Sprache wählen',
    toggleTheme: 'Hell-/Dunkelmodus wechseln',
    light: 'Hell',
    dark: 'Dunkel',
    home: 'Start',
    breadcrumb: 'Seitenpfad',
    menu: 'Menü',
    allServices: 'Alle Leistungen',
    allWork: 'Alle Referenzen',
    allArticles: 'Alle Beiträge',
    allTemplates: 'Alle Vorlagen',
    backToTop: 'Nach oben',
  },
  actions: {
    ...FA.actions,
    consult: 'Fachberatung anfordern',
    consultShort: 'Kostenlose Beratung',
    proposal: 'Angebot erhalten',
    call: 'Anrufen',
    whatsapp: 'Per WhatsApp schreiben',
    viewWork: 'Referenzen ansehen',
    viewDetails: 'Leistungsdetails',
    compare: 'Leistungen vergleichen',
    calculate: 'Projektkosten schätzen',
    viewPricing: 'Preise ansehen',
    readMore: 'Weiterlesen',
    request: 'Anfrage senden',
    submit: 'Anfrage senden',
    sending: 'Wird gesendet…',
    sent: 'Anfrage erhalten',
    openTool: 'Tool öffnen',
  },
  utility: {
    hotline: 'Direktleitung',
    hours: 'Sa–Do, 9:00–18:00',
    available: 'Support aktiv',
    responseTime: 'Durchschnittliche Antwort: unter 2 Geschäftsstunden',
  },
  footer: {
    ...FA.footer,
    brandLine: 'Engineering digitaler Erlebnisse für Organisationen, die Präzision, Tempo und Stabilität schätzen.',
    colServices: 'Leistungen',
    colSolutions: 'Lösungen',
    colCompany: 'Unternehmen',
    colResources: 'Ressourcen',
    contactTitle: 'Direkter Kontakt',
    address: 'Teheran, Valiasr-Str., Aladdin Technologiezentrum',
    rights: 'Alle Rechte vorbehalten.',
    legal: 'AGB',
  },
  forms: {
    ...FA.forms,
    name: 'Vollständiger Name',
    phone: 'Telefonnummer',
    email: 'E-Mail',
    business: 'Unternehmen',
    service: 'Benötigte Leistung',
    budget: 'Ungefähres Budget',
    details: 'Kurzes Projektbriefing',
    privacy: 'Ihre Daten bleiben vertraulich und werden nur für die Kontaktaufnahme genutzt.',
    successTitle: 'Ihre Anfrage ist eingegangen',
    successDesc: 'Ein Senior-Berater meldet sich innerhalb der nächsten Geschäftsstunde mit einem Erstangebot.',
    close: 'Schließen',
    optional: 'optional',
  },
  labels: {
    ...FA.labels,
    featured: 'Empfohlen',
    bestValue: 'Bestes Angebot',
    new: 'Neu',
    speed: 'Ladezeit',
    seo: 'SEO-Wert',
    mobile: 'Mobile Erfahrung',
    industry: 'Branche',
    stack: 'Technologie',
    duration: 'Dauer',
    result: 'Kernergebnis',
    languages: 'Sprachen',
    startPrice: 'Ab',
    from: 'ab',
    toman: 'Toman',
  },
  pages: FA.pages,
};

export const UI: Record<LocaleKey, UIStrings> = { fa: FA, en: EN, ar: AR, tr: TR, de: DE };

export const ui = (locale: LocaleKey): UIStrings => UI[locale] ?? FA;

/** Localises an already-grouped number string, e.g. 18500000 → ۱۸,۵۰۰,۰۰۰ */
export const formatAmountFromLocale = (value: number, locale: LocaleKey): string =>
  localiseDigits(value.toLocaleString('en-US'), locale);

/** Localised digits for any value, following the locale's convention. */
export const localiseDigits = (value: string | number, locale: LocaleKey): string => {
  const mode = ui(locale).digits;
  const table =
    mode === 'fa'
      ? '۰۱۲۳۴۵۶۷۸۹'
      : mode === 'ar'
        ? '٠١٢٣٤٥٦٧٨٩'
        : null;
  if (!table) return String(value);
  return String(value).replace(/[0-9]/g, d => table[Number(d)]);
};
