import { LocaleKey } from '../types';

export interface SectionTranslations {
  navTools: {
    speedAudit: string;
    speedAuditDesc: string;
    cmsSimulator: string;
    cmsSimulatorDesc: string;
    slaGuarantee: string;
    slaGuaranteeDesc: string;
    specializedTitle: string;
  };
  ecommerceShowcase: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    tagTorob: string;
    tagSnappPay: string;
    tagGateway: string;
    ctaPreview: string;
    ctaCalculate: string;
    cartAdded: string;
    newOrder: string;
    justNow: string;
    liveOnline: string;
    product1Title: string;
    product2Title: string;
    product3Title: string;
    product1Price: string;
    product2Price: string;
    product3Price: string;
    addToCart: string;
    buyNow: string;
    searchDemo: string;
    gatewayActive: string;
    promoBadge: string;
    promoTitle: string;
    promoDesc: string;
    product1Badge: string;
    product2Badge: string;
    product3Badge: string;
  };
  servicesGrid: {
    tag: string;
    title: string;
    description: string;
    compareBtn: string;
    viewDetails: string;
    requestCustom: string;
  };
  templatesShowcase: {
    tag: string;
    title: string;
    description: string;
    allTemplates: string;
    deliveryDays: string;
    livePreview: string;
    orderTemplate: string;
  };
  liveTicker: {
    tag: string;
    title: string;
    description: string;
    viewAllProjects: string;
  };
  caseStudies: {
    tag: string;
    title: string;
    description: string;
    viewLive: string;
    interactivePreview: string;
  };
  architecture: {
    tag: string;
    title: string;
    description: string;
    tabPipeline: string;
    tabComparison: string;
  };
  pricingSection: {
    tag: string;
    title: string;
    description: string;
    openCalculator: string;
    orderPlan: string;
    starterPrice: string;
    growthPrice: string;
    enterprisePrice: string;
  };
  faqSection: {
    tag: string;
    title: string;
    titleHighlight: string;
    description: string;
    freeConsult: string;
    items: Array<{
      question: string;
      answer: string;
      bulletPoints: string[];
    }>;
  };
  ctaSection: {
    tag: string;
    title: string;
    description: string;
    btnCall: string;
    btnWhatsapp: string;
  };
  footer: {
    brandDesc: string;
    callNationwide: string;
    directLine: string;
    specializedCol: string;
    corporateWeb: string;
    ecommerceWeb: string;
    medicalWeb: string;
    portalWeb: string;
    portalsCol: string;
    speedAudit: string;
    cmsSim: string;
    slaGuarantee: string;
    rightsReserved: string;
  };
  previewModal: {
    titleSuffix: string;
    closeTooltip: string;
    desktop: string;
    tablet: string;
    mobile: string;
    goToWorkPage: string;
    portfolioShort: string;
    liveDomain: string;
    scrollTip: string;
  };
  consultModal: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    budgetLabel: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    submitBtn: string;
    submitting: string;
    privacy: string;
    successTitle: string;
    successDesc: string;
    closeBtn: string;
  };
}

export const SECTIONS_I18N: Record<LocaleKey, SectionTranslations> = {
  fa: {
    navTools: {
      speedAudit: 'تست آنلاین سرعت و سئو',
      speedAuditDesc: 'آنالیز Core Web Vitals و مقایسه معماری',
      cmsSimulator: 'شبیه‌ساز پنل CMS اختصاصی',
      cmsSimulatorDesc: 'تست زنده بلوک‌ها، چندزبانه و API',
      slaGuarantee: 'تعهدات و گارانتی رسمی SLA',
      slaGuaranteeDesc: '۹۹.۹۸٪ آپ‌تایم و انتقال ۱۰۰٪ سورس‌کد',
      specializedTitle: 'معماری‌های تخصصی',
    },
    ecommerceShowcase: {
      badge: 'فروشگاه اختصاصی و مقیاس‌پذیر علاءالدین DXP',
      title: 'فروشگاه اینترنتی شما؛',
      titleHighlight: 'آماده برای فروش بیشتر و تبدیل حداکثری',
      description: 'یک فروشگاه سریع، امن و موبایل‌محور که از معرفی محصول تا پرداخت و پیگیری سفارش، مسیر خرید را برای مشتری کوتاه و لذت‌بخش می‌کند.',
      tagTorob: 'اتصال مستقیم به ترب',
      tagSnappPay: 'پرداخت اقساطی اسنپ‌پی',
      tagGateway: 'تسویه آنی درگاه بانکی',
      ctaPreview: 'دریافت پیش‌نمایش و مشاوره فوری',
      ctaCalculate: 'محاسبه آنلاین هزینه فروشگاه',
      cartAdded: 'به سبد خرید اضافه شد!',
      newOrder: '+۱ سفارش جدید',
      justNow: 'همین حالا ثبت شد',
      liveOnline: 'Live: ۱,۴۲۰ آنلاین',
      product1Title: 'ایرپاد پرو ۲ نسل جدید',
      product2Title: 'ساعت هوشمند اولترا تیتانیوم',
      product3Title: 'هدفون بی‌سیم استودیویی',
      product1Price: '۲.۴ م',
      product2Price: '۱.۸ م',
      product3Price: '۸۹۰ ت',
      addToCart: 'افزودن',
      buyNow: 'خرید فوری',
      searchDemo: 'جستجو در ۱۲,۴۰۰ کالا...',
      gatewayActive: 'درگاه فعال',
      promoBadge: 'جشنواره طلایی',
      promoTitle: 'ارسال فوری رایگان',
      promoDesc: 'تخفیف ویژه سفارش‌های بالای ۵۰۰ هزار تومان',
      product1Badge: 'ویژه',
      product2Badge: '۳۰٪-',
      product3Badge: 'اصل',
    },
    servicesGrid: {
      tag: 'خدمات مهندسی وب و DXP علاءالدین',
      title: 'برای هر مدل کسب‌وکار، معماری مناسب همان صنف',
      description: 'هیچ نسخه یکسانی برای همه وجود ندارد. ساختار فنی و سفر کاربری یک سایت فروشگاهی با یک سامانه هلدینگی شرکتی یا مرکز پزشکی کاملاً متفاوت است.',
      compareBtn: 'جدول مقایسه کامل امکانات',
      viewDetails: 'مشاهده جزئیات و فیچرها',
      requestCustom: 'سفارش معماری اختصاصی',
    },
    templatesShowcase: {
      tag: 'قالب‌های مهندسی‌شده و آماده استقرار',
      title: 'طرح‌های آماده فوق‌سریع با تحویل ۳ تا ۵ روزه',
      description: 'طراحی مدرن، کدنویسی تمیز و بهینه‌سازی فنی کامل بدون کدهای سنگین یا وابستگی‌های آسیب‌پذیر.',
      allTemplates: 'مشاهده همه قالب‌ها',
      deliveryDays: 'روز کاری',
      livePreview: 'پیش‌نمایش تعاملی',
      orderTemplate: 'سفارش آنلاین قالب',
    },
    liveTicker: {
      tag: 'پایش عملکرد زنده وب‌سایت‌های تحویل‌شده',
      title: 'خروجی واقعی پروژه‌های علاءالدین در حال سرویس‌دهی آنلاین',
      description: 'مشاهده رفتار واقعی، تست لود زیر ۱ ثانیه و استانداردهای طراحی در پروژه‌های فعال صنعتی، فروشگاهی و صادراتی',
      viewAllProjects: 'مشاهده آرشیو ۱۲۰+ پروژه فعال',
    },
    caseStudies: {
      tag: 'پروژه‌های اجرایی و کیس‌استادی‌های موفق',
      title: 'نمونه‌کارهایی که معیار صنعت خود شده‌اند',
      description: 'از هلدینگ‌های فولاد و پتروشیمی تا بزرگ‌ترین برندهای خرده‌فروشی آنلاین؛ پروژه‌هایی با نتایج مستند و ترافیک بالا.',
      viewLive: 'مشاهده سایت زنده',
      interactivePreview: 'پیش‌نمایش تعاملی',
    },
    architecture: {
      tag: 'معماری فنی بدون مصالحه',
      title: 'تفاوت کدنویسی مهندسی با قالب‌های تجاری معمولی',
      description: 'ترکیب Next.js، زیرساخت ابری توزیع‌شده و امنیت چندلایه برای تضمین بالاترین سرعت و دسترس‌پذیری.',
      tabPipeline: 'پایپ‌لاین فنی و جریان داده',
      tabComparison: 'جدول مقایسه با روش‌های سنتی',
    },
    pricingSection: {
      tag: 'تعرفه شفاف، بدون هزینه‌های پنهان بعدی',
      title: 'شروع شفاف؛ قیمت نهایی بر اساس امکانات واقعی پروژه',
      description: 'مبالغ زیر نقطه شروع پکیج‌ها هستند و تمام حقوق مادی، هاست سال اول، دامنه، آموزش ویدیویی و پشتیبانی فنی در قرارداد رسمی ثبت می‌شود.',
      openCalculator: 'محاسبه‌گر پیشرفته تعرفه آنلاین',
      orderPlan: 'سفارش و شروع این پکیج',
      starterPrice: '۱۵,۷۰۰,۰۰۰ تومان',
      growthPrice: '۲۸,۵۰۰,۰۰۰ تومان',
      enterprisePrice: '۴۵,۰۰۰,۰۰۰+ تومان',
    },
    faqSection: {
      tag: 'شفاف‌سازی قرارداد و روال کار',
      title: 'سؤال‌هایی که قبل از سفارش طراحی سایت',
      titleHighlight: 'باید پاسخشان کاملاً روشن باشد',
      description: 'پاسخ شفاف به پرتکرارترین ابهامات کارفرمایان درباره هزینه‌ها، سورس‌کد، زمان‌بندی و پشتیبانی فنی بدون هیچ شرط پنهان',
      freeConsult: 'مشاوره تلفنی رایگان:',
      items: [
        {
          question: 'هزینه طراحی سایت چقدر است و به چه عواملی بستگی دارد؟',
          answer: 'هزینه بر پایه نوع پروژه (تعداد صفحات، امکانات، سیستم‌های اختصاصی و قالب آماده یا اختصاصی) تعیین می‌شود. قیمت‌ها در جدول تعرفه‌ها شفاف درج شده‌اند و پیش‌فاکتور رسمی بدون هزینه پنهانی صادر خواهد شد.',
          bulletPoints: ['صدور پیش‌فاکتور رسمی با جزئیات کامل فنی', 'تضمین کتبی عدم دریافت هرگونه هزینه پنهان بعدی'],
        },
        {
          question: 'طراحی سایت چقدر زمان می‌برد؟',
          answer: 'سایت‌های آماده و اقتصادی ظرف ۳ الی ۷ روز کاری تحویل می‌گردند. پروژه‌های اختصاصی شامل طراحی فیگما و کدنویسی سفارشی بین ۱۵ الی ۳۰ روز کاری زمان نیاز دارند.',
          bulletPoints: ['سایت‌های آماده اقتصادی: ۳ الی ۷ روز کاری', 'پروژه‌های مهندسی و سفارشی DXP: ۱۵ الی ۳۰ روز کاری'],
        },
        {
          question: 'مالکیت دامنه، هاست و سورس کد با کیست؟',
          answer: 'تمامی موارد اعم از پنل دامنه، کنترل‌پنل هاست و سورس کدهای پروژه ۱۰۰٪ به نام کارفرما ثبت شده و دسترسی فول ادمین تسلیم شما می‌گردد.',
          bulletPoints: ['ثبت رسمی دامنه و هاست به نام مستقیم کارفرما', 'تحویل کامل سورس بدون قفل یا وابستگی به لایسنس ثالث'],
        },
        {
          question: 'آیا پس از تحویل سایت، نحوه کار و مدیریت آن آموزش داده می‌شود؟',
          answer: 'بله؛ یک جلسه آموزشی کامل به همراه ویدیوهای ضبط‌شده اختصاصی از پنل خودتان در اختیارتان قرار می‌گیرد تا نیازی به استخدام برنامه‌نویس نداشته باشید.',
          bulletPoints: ['ویدیوهای گام‌به‌گام از پنل اختصاصی مشتری', 'پشتیبانی مستقیم تلفنی و تیکتینگ برای رفع هرگونه ابهام'],
        },
        {
          question: 'شرایط پرداخت به چه صورت است؟ آیا امکان اقساطی وجود دارد؟',
          answer: 'پرداخت در ۳ مرحله بر اساس پیشرفت واقعی کار صورت می‌گیرد (پیش‌پرداخت اولیه، تایید طراحی گرافیکی و تسویه نهایی هنگام رونمایی). امکان پرداخت اقساطی نیز فراهم است.',
          bulletPoints: ['پرداخت مرحله‌ای متناسب با پیشرفت پروژه', 'امکان تسویه اقساطی در قراردادهای شرکتی و سازمانی'],
        },
      ],
    },
    ctaSection: {
      tag: 'مشاوره کاملاً رایگان بدون هیچ تعهدی برای خرید',
      title: 'هنوز مطمئن نیستید کدام ساختار سایت برای کسب‌وکار شما مناسب‌تر است؟',
      description: 'تلفن را بردارید؛ مشاوران فنی علاءالدین با تحلیل رقبای صنف شما، بهترین و اقتصادی‌ترین مسیر پیاده‌سازی را به رایگان در اختیارتان می‌گذارند.',
      btnCall: 'تماس فوری با کارشناس ارشد',
      btnWhatsapp: 'گفتگو در واتس‌اپ',
    },
    footer: {
      brandDesc: 'پلتفرم تخصصی طراحی سایت علاءالدین با بیش از یک دهه تجربه در خلق سیستم‌های مقیاس‌پذیر، پورتال‌های چندمنطقه‌ای و فروشگاه‌های پرسرعت سازمانی.',
      callNationwide: 'تماس سراسری و مشاوره رایگان',
      directLine: 'دفتر مرکزی و مدیریت فنی',
      specializedCol: 'خدمات تخصصی',
      corporateWeb: 'طراحی سایت شرکتی',
      ecommerceWeb: 'فروشگاه اینترنتی آنلاین',
      medicalWeb: 'سایت خدماتی و رزرو پزشکی',
      portalWeb: 'پورتال‌های سازمانی Next.js',
      portalsCol: 'ابزارهای مهندسی',
      speedAudit: 'تست سرعت و Core Web Vitals',
      cmsSim: 'شبیه‌ساز پنل CMS اختصاصی',
      slaGuarantee: 'تعهدات و گارانتی رسمی SLA',
      rightsReserved: 'تمامی حقوق مادی و معنوی برای پلتفرم طراحی وب علاءالدین DXP محفوظ است.',
    },
    previewModal: {
      titleSuffix: '— پیش‌نمایش زنده',
      closeTooltip: 'بستن پنجره',
      desktop: 'دسکتاپ',
      tablet: 'تبلت',
      mobile: 'موبایل',
      goToWorkPage: 'صفحه این نمونه‌کار در سایت',
      portfolioShort: 'نمونه‌کارها',
      liveDomain: 'آدرس اینترنتی زنده',
      scrollTip: 'می‌توانید داخل پنجره اسکرول کنید و المان‌ها را بررسی نمایید.',
    },
    consultModal: {
      title: 'درخواست مشاوره تخصصی و پیش‌نمایش رایگان',
      subtitle: 'طرح اولیه وب‌سایت ظرف ۲ ساعت آماده و برایتان ارسال می‌شود',
      nameLabel: 'نام و نام خانوادگی یا نام شرکت',
      namePlaceholder: 'مثال: مهندس رنجبر / شرکت بازرگانی پارس',
      phoneLabel: 'شماره تماس همراه (جهت تماس و واتس‌اپ)',
      phonePlaceholder: '0912...',
      serviceLabel: 'نوع وب‌سایت یا خدمت مدنظر',
      budgetLabel: 'بازه بودجه مدنظر شما',
      detailsLabel: 'توضیحات تکمیلی یا امکانات خاص (اختیاری)',
      detailsPlaceholder: 'مثلاً: اتصال به سیستم حسابداری، چندزبانه عربی و انگلیسی...',
      submitBtn: 'ثبت درخواست مشاوره و دریافت پیش‌نمایش',
      submitting: 'در حال ارسال...',
      privacy: 'اطلاعات شما محرمانه تلقی شده و صرفاً برای هماهنگی فنی پروژه استفاده می‌گردد.',
      successTitle: 'درخواست شما با موفقیت دریافت شد!',
      successDesc: 'کارشناسان فنی علاءالدین DXP به زودی با شما تماس خواهند گرفت.',
      closeBtn: 'بستن پنجره',
    },
  },

  en: {
    navTools: {
      speedAudit: 'Speed & SEO Audit',
      speedAuditDesc: 'Core Web Vitals test & architecture review',
      cmsSimulator: 'Live Headless CMS Simulator',
      cmsSimulatorDesc: 'Interactive block builder, i18n & API sync',
      slaGuarantee: 'Enterprise SLA Guarantee',
      slaGuaranteeDesc: '99.98% uptime SLA & 100% full source code ownership',
      specializedTitle: 'Engineered Solutions',
    },
    ecommerceShowcase: {
      badge: 'Aladdin DXP Scalable E-Commerce Engine',
      title: 'Your Next-Gen E-Commerce;',
      titleHighlight: 'Engineered for Maximum Conversions',
      description: 'An ultra-fast, mobile-first shopping experience that streamlines product exploration, instant checkout, and automated fulfillment.',
      tagTorob: 'Direct Marketplace API',
      tagSnappPay: 'Flexible Split & BNPL Payments',
      tagGateway: 'Instant Escrow & Multi-Currency',
      ctaPreview: 'Request Live Prototype & Demo',
      ctaCalculate: 'Calculate E-Commerce Cost',
      cartAdded: 'Added to cart successfully!',
      newOrder: '+1 New Order',
      justNow: 'Placed just now',
      liveOnline: 'Live: 1,420 Shoppers Online',
      product1Title: 'AirPods Pro 2nd Gen',
      product2Title: 'Smart Watch Ultra Titanium',
      product3Title: 'Studio Wireless Headphones',
      product1Price: '$249',
      product2Price: '$189',
      product3Price: '$89',
      addToCart: 'Add to Cart',
      buyNow: 'Quick Buy',
      searchDemo: 'Search over 12,400 products...',
      gatewayActive: 'Gateway Active',
      promoBadge: 'Flash Offer',
      promoTitle: 'Free Express Shipping',
      promoDesc: 'Special discount on all orders above $100',
      product1Badge: 'Featured',
      product2Badge: '-30%',
      product3Badge: 'Original',
    },
    servicesGrid: {
      tag: 'Aladdin Web & DXP Solutions',
      title: 'Architectures Engineered for Your Business Model',
      description: 'One size does not fit all. Corporate authority platforms, transaction-heavy marketplaces, and clinic scheduling systems require completely distinct codebases.',
      compareBtn: 'Complete Tech Comparison',
      viewDetails: 'View Details & Specs',
      requestCustom: 'Request Bespoke Architecture',
    },
    templatesShowcase: {
      tag: 'Engineered Pre-Built Templates',
      title: 'Blazing Fast Deployable Blueprints in 3-5 Days',
      description: 'Modern aesthetics, clean TypeScript architecture, and pristine Core Web Vitals with zero bloated plugins or third-party locks.',
      allTemplates: 'Browse All Templates',
      deliveryDays: 'Business Days',
      livePreview: 'Interactive Preview',
      orderTemplate: 'Order Template Setup',
    },
    liveTicker: {
      tag: 'Live Uptime & Health Monitoring',
      title: 'Real-Time Deployed Aladdin DXP Client Projects',
      description: 'Experience sub-second load times and high-availability architecture across enterprise, industrial, and global brands.',
      viewAllProjects: 'Explore 120+ Active Projects',
    },
    caseStudies: {
      tag: 'Production Case Studies & Client Wins',
      title: 'Websites That Defined Their Industry Standards',
      description: 'From steel exporters and medical giants to retail e-commerce innovators; proven results, high SEO ranks, and measurable ROI.',
      viewLive: 'Visit Live Site',
      interactivePreview: 'Interactive Preview',
    },
    architecture: {
      tag: 'Zero Compromise Architecture',
      title: 'Engineered Codebase vs Typical Legacy Themes',
      description: 'Harnessing Next.js, distributed edge networks, and multi-tier security to achieve unrivaled sub-second response times.',
      tabPipeline: 'DevOps Pipeline & Data Flow',
      tabComparison: 'Comparative Architecture Analysis',
    },
    pricingSection: {
      tag: 'Transparent Pricing, Zero Hidden Fees',
      title: 'Clear Investment; Exact Scope & Measurable Value',
      description: 'All packages include full source code ownership, first-year cloud hosting, domain setup, team training, and written SLA.',
      openCalculator: 'Interactive Dynamic Calculator',
      orderPlan: 'Choose This Plan',
      starterPrice: '$490',
      growthPrice: '$890',
      enterprisePrice: '$1,490+',
    },
    faqSection: {
      tag: 'Clarity, Contracts & Transparency',
      title: 'Essential Questions Before Contracting',
      titleHighlight: 'Every Web Agency Must Answer Clearly',
      description: 'Direct, honest explanations regarding costs, source code ownership, delivery timetables, and SLA support.',
      freeConsult: 'Toll-free Technical Sync:',
      items: [
        {
          question: 'How is web design cost calculated, and what factors affect it?',
          answer: 'Cost is based strictly on project architecture: page count, custom features, microservice integrations, and bespoke versus ready blueprint foundations. Our written quotes feature fixed pricing with zero hidden add-ons.',
          bulletPoints: ['Formal enterprise quote with transparent line-item breakdown', 'Contractually guaranteed price protection with zero surprise fees'],
        },
        {
          question: 'What is the turnaround time for website delivery?',
          answer: 'Ready-to-deploy blueprints take 3 to 7 business days. Custom enterprise DXP projects involving Figma design systems, frontend reviews, and QA testing take 15 to 30 business days.',
          bulletPoints: ['Turnkey blueprint platforms: 3 to 7 business days', 'Bespoke enterprise Next.js portals: 15 to 30 business days'],
        },
        {
          question: 'Who owns the domain, hosting, and application source code?',
          answer: 'You maintain 100% legal ownership of your domain names, cloud hosting consoles, and Git repositories. You receive full administrative credentials upon handover with zero vendor locks.',
          bulletPoints: ['Direct ownership registered in your company name', 'Clean, documented source code repository with MIT-level freedom'],
        },
        {
          question: 'Do you provide onboarding and content management training?',
          answer: 'Yes. Upon completion, we provide comprehensive live walkthrough sessions along with high-definition customized video guides tailored to your exact CMS dashboard.',
          bulletPoints: ['Tailored HD video tutorials for non-technical team members', 'Direct technical support via ticketing and dedicated WhatsApp channel'],
        },
        {
          question: 'What are the payment terms and schedule?',
          answer: 'Payments are milestone-based (initial kickoff deposit, UI/UX approval, and final settlement upon public deployment). Corporate phased invoicing is fully supported.',
          bulletPoints: ['Clear milestone-based stage billing tied to tangible deliverables', 'Flexible corporate contracts and international escrow support'],
        },
      ],
    },
    ctaSection: {
      tag: 'Complimentary Architectural Consultation',
      title: 'Unsure which platform architecture best suits your business?',
      description: 'Connect directly with our solutions architects for an honest technical breakdown and competitive benchmark at zero cost.',
      btnCall: 'Speak to Senior Architect',
      btnWhatsapp: 'Chat on WhatsApp',
    },
    footer: {
      brandDesc: 'Aladdin DXP is an enterprise web engineering platform with over a decade of excellence designing scalable portals, multilingual brands, and sub-second e-commerce systems.',
      callNationwide: 'Global Hotline & Free Consultation',
      directLine: 'Headquarters & Technical Operations',
      specializedCol: 'Core Solutions',
      corporateWeb: 'Corporate Web Engineering',
      ecommerceWeb: 'Scalable E-Commerce',
      medicalWeb: 'Healthcare & Live Booking',
      portalWeb: 'Custom Next.js Portals',
      portalsCol: 'Engineering Tools',
      speedAudit: 'Core Web Vitals Speed Test',
      cmsSim: 'Interactive CMS Simulator',
      slaGuarantee: 'Written SLA & Uptime Guarantee',
      rightsReserved: 'All rights reserved. Aladdin DXP Digital Experience Platform.',
    },
    previewModal: {
      titleSuffix: '— Live Responsive Preview',
      closeTooltip: 'Close Window (Esc)',
      desktop: 'Desktop',
      tablet: 'Tablet',
      mobile: 'Mobile',
      goToWorkPage: 'View in Portfolio Catalog',
      portfolioShort: 'Portfolio',
      liveDomain: 'Live Domain URL',
      scrollTip: 'Interactive window: scroll inside to inspect responsive layout and assets.',
    },
    consultModal: {
      title: 'Request Expert Consultation & Live Wireframe',
      subtitle: 'Your custom preliminary prototype delivered within 2 hours',
      nameLabel: 'Your Full Name or Company Name',
      namePlaceholder: 'e.g. Alexander Vance / Global Logistics Ltd',
      phoneLabel: 'Phone / WhatsApp Number',
      phonePlaceholder: '+1 (555) 019-2834',
      serviceLabel: 'Desired Platform Architecture',
      budgetLabel: 'Target Budget Range',
      detailsLabel: 'Project Requirements & Integrations (Optional)',
      detailsPlaceholder: 'e.g. ERP integration, multi-currency checkout, Arabic & English...',
      submitBtn: 'Submit Request & Receive Wireframe',
      submitting: 'Processing...',
      privacy: 'Protected under strict enterprise NDA and privacy standards.',
      successTitle: 'Consultation request received!',
      successDesc: 'Our senior solutions architect will contact you within 15 minutes with initial assets.',
      closeBtn: 'Close Window',
    },
  },

  ar: {
    navTools: {
      speedAudit: 'فحص السرعة وسيو جوجل',
      speedAuditDesc: 'اختبار Core Web Vitals ومقارنة البنية التقنية',
      cmsSimulator: 'محاكي لوحة التحكم CMS',
      cmsSimulatorDesc: 'بناء الصفحات، دعم اللغات وتجربة الواجهة الحية',
      slaGuarantee: 'ضمان الجودة الرسمي SLA',
      slaGuaranteeDesc: 'جاهزية ٩٩.٩٨٪ ونقل ملكية الكود البرمجي بالكامل',
      specializedTitle: 'معماريات متخصصة',
    },
    ecommerceShowcase: {
      badge: 'منصة علاء الدين DXP للتجارة الإلكترونية المتطورة',
      title: 'متجرك الإلكتروني الحديث؛',
      titleHighlight: 'مصمم لتحقيق أعلى معدل تحويل ومبيعات',
      description: 'تجربة تسوق فائقة السرعة وسلسة عبر الجوال، تختصر خطوات الشراء من استعراض المنتجات وحتى الدفع وتتبع الشحنات.',
      tagTorob: 'ربط مباشر بأنظمة المقارنة',
      tagSnappPay: 'دفع بالتقسيط والدفع الآجل',
      tagGateway: 'بوابات دفع آمنة ومعتمدة',
      ctaPreview: 'طلب نموذج أولي واستشارة مجانية',
      ctaCalculate: 'حساب تكلفة المتجر إلكترونياً',
      cartAdded: 'تمت الإضافة إلى سلة الشراء بنجاح!',
      newOrder: '+١ طلب جديد',
      justNow: 'تم تسجيله الآن',
      liveOnline: 'مباشر: ١,٤٢٠ متسوق متصل',
      product1Title: 'سماعات إيربودز برو الجيل الثاني',
      product2Title: 'ساعة ذكية ألترا تيتانيوم',
      product3Title: 'سماعات رأس استوديو لاسلكية',
      product1Price: '٨٩٠ ر.س',
      product2Price: '٦٥٠ ر.س',
      product3Price: '٣٢٠ ر.س',
      addToCart: 'إضافة للسلة',
      buyNow: 'شراء فوري',
      searchDemo: 'ابحث في أكثر من ١٢,٤٠٠ منتج...',
      gatewayActive: 'البوابة نشطة',
      promoBadge: 'عروض حصرية',
      promoTitle: 'شحن سريع مجاني',
      promoDesc: 'خصم خاص للطلبات التي تتجاوز ٥٠٠ ريال',
      product1Badge: 'مميز',
      product2Badge: '٣٠٪-',
      product3Badge: 'أصلي',
    },
    servicesGrid: {
      tag: 'حلول الويب والتحول الرقمي من علاء الدين',
      title: 'بنية برمجية مخصصة لكل قطاع ونموذج عمل',
      description: 'لا توجد صيغة واحدة تناسب الجميع. منصات الشركات الكبرى تختلف كلياً في بنيتها وسرعتها عن المتاجر الضخمة والمراكز الطبية.',
      compareBtn: 'جدول المقارنة التقنية الشاملة',
      viewDetails: 'تفاصيل ومميزات المنظومة',
      requestCustom: 'طلب بنية برمجية مخصصة',
    },
    templatesShowcase: {
      tag: 'قوالب جاهزة ومبرمجة بأعلى المعايير',
      title: 'نماذج جاهزة فائقة السرعة مع تسليم خلال ٣-٥ أيام',
      description: 'تصميم عصري متطور، كود نظيف وسرعة قياسية بمعايير جوجل دون برمجيات ثقيلة أو إضافات مشبوهة.',
      allTemplates: 'استعراض كافة القوالب',
      deliveryDays: 'أيام عمل',
      livePreview: 'معاينة تفاعلية حية',
      orderTemplate: 'طلب تهيئة القالب',
    },
    liveTicker: {
      tag: 'مراقبة حية للأداء والاستقرار',
      title: 'مشاريع حية ومباشرة تعمل على منصة علاء الدين',
      description: 'شاهد الأداء الفعلي وسرعة الفتح الاستثنائية (أقل من ثانية) عبر مشاريع تجارية وصناعية قائمة.',
      viewAllProjects: 'استعراض أرشيف +١٢٠ مشروعاً نشطاً',
    },
    caseStudies: {
      tag: 'دراسات حالة وقصص نجاح حقيقية',
      title: 'مواقع وضعت معايير الريادة في قطاعاتها',
      description: 'من كبرى المجموعات الصناعية والمراكز الصحية إلى رواد التجارة الإلكترونية؛ نتائج موثقة وأداء مبهر.',
      viewLive: 'زيارة الموقع المباشر',
      interactivePreview: 'معاينة تفاعلية',
    },
    architecture: {
      tag: 'معمارية برمجية متطورة بدون مساومات',
      title: 'الفرق بين الكود المتقن والقوالب الجاهزة التقليدية',
      description: 'اعتماد Next.js والبنية السحابية الموزعة لتحقيق أعلى سرعة واستقرار وحماية متعددة الطبقات.',
      tabPipeline: 'سير العمل البرمجي وتدفق البيانات',
      tabComparison: 'مقارنة فنية تفصيلية',
    },
    pricingSection: {
      tag: 'أسعار واضحة بدون أي تكاليف خفية',
      title: 'شفافية كاملة وتحديد دقيق للميزانية والمخرجات',
      description: 'تشمل جميع الباقات تسليم كامل الكود المصدري، استضافة سحابية للسنة الأولى، تدريب الفريق وضمان SLA الموثق.',
      openCalculator: 'حاسبة التكلفة التفاعلية',
      orderPlan: 'اختيار هذه الباقة',
      starterPrice: '١,٨٠٠ د.إ',
      growthPrice: '٣,٢٠٠ د.إ',
      enterprisePrice: '٥,٥٠٠+ د.إ',
    },
    faqSection: {
      tag: 'عقود واضحة وإجراءات شفافة',
      title: 'أسئلة جوهرية قبل التعاقد',
      titleHighlight: 'يجب أن تكون إجاباتها واضحة تماماً',
      description: 'إجابات مباشرة وصريحة حول التكاليف، ملكية الكود، فترات التسليم والدعم الفني دون شروط مبهمة.',
      freeConsult: 'استشارة فنية مجانية:',
      items: [
        {
          question: 'كيف يتم احتساب تكلفة تصميم الموقع؟',
          answer: 'تُحدد التكلفة بناءً على نوع المشروع (عدد الصفحات، الميزات الخاصة، والربط بالأنظمة الخارجية). يتم إصدار عرض سعر رسمي ومفصل دون أي مصاريف مفاجئة.',
          bulletPoints: ['عرض أسعار رسمي مفصل بجميع البنود التقنية', 'ضمان تعاقدي بعدم طلب أي رسوم إضافية لاحقة'],
        },
        {
          question: 'كم يستغرق تسليم الموقع كاملاً؟',
          answer: 'القوالب الجاهزة تسلم خلال ٣ إلى ٧ أيام عمل. أما المشاريع المخصصة التي تشمل تصميم فيجما وبرمجة خاصة فتستغرق من ١٥ إلى ٣٠ يوم عمل.',
          bulletPoints: ['المنصات الجاهزة: من ٣ إلى ٧ أيام عمل', 'المشاريع المؤسسية المخصصة: من ١٥ إلى ٣٠ يوم عمل'],
        },
        {
          question: 'من يملك النطاق والاستضافة والكود المصدري؟',
          answer: 'أنت المالك الوحيد والشرعي بنسبة ١٠٠٪ للنطاق وحسابات الاستضافة ومستودع الكود البرمجي، وتتسلم صلاحيات الإدارة الكاملة دون قيود.',
          bulletPoints: ['تسجيل رسمي مباشر باسم شركتكم', 'تسليم الكود البرمجي كاملاً دون أي تشفير أو احتكار'],
        },
        {
          question: 'هل توفرون تدريباً على إدارة الموقع بعد الإطلاق؟',
          answer: 'نعم؛ نوفر جلسة تدريبية مباشرة مع فيديوهات تعليمية مسجلة ومخصصة للوحة التحكم الخاصة بموقعكم لتمكين فريقكم من إدارته بسهولة.',
          bulletPoints: ['فيديوهات عالية الدقة مخصصة لنظام إدارة محتواكم', 'دعم فني مباشر للإجابة عن استفساراتكم عبر الواتس وتذاكر الدعم'],
        },
        {
          question: 'ما هي آلية الدفع والمراحل المالية؟',
          answer: 'يتم سداد المبلغ على ٣ دفعات مرتبطة بمراحل الإنجاز الفعلية (دفعة أولى عند البدء، دفعة عند اعتماد التصميم، ودفعة نهائية عند الإطلاق).',
          bulletPoints: ['دفعات مرحلية ترتبط بتسليم المخرجات', 'إمكانية الدفع المرن للمشاريع المؤسسية الكبرى'],
        },
      ],
    },
    ctaSection: {
      tag: 'استشارة هندسية مجانية بدون التزام بالشراء',
      title: 'لست متأكداً أي بنية برمجية هي الأنسب لنشاطك التجاري؟',
      description: 'تواصل معنا الآن؛ سيقوم مهندس النظم بتحليل منافسيك وتحديد المسار الأفضل والأكثر توفيراً لمشروعك مجاناً.',
      btnCall: 'اتصال مباشر بمهندس النظم',
      btnWhatsapp: 'محادثة عبر الواتساب',
    },
    footer: {
      brandDesc: 'منصة علاء الدين DXP لتطوير وبرمجة المواقع والمنصات السحابية للشركات والمتاجر المتقدمة بخبرة تمتد لأكثر من عقد في المنطقة.',
      callNationwide: 'الخط الموحد والاستشارة المجانية',
      directLine: 'المقر الرئيسي والإدارة التقنية',
      specializedCol: 'الخدمات المتخصصة',
      corporateWeb: 'تصميم مواقع الشركات',
      ecommerceWeb: 'المتاجر الإلكترونية المتطورة',
      medicalWeb: 'المواقع الطبية وحجز المواعيد',
      portalWeb: 'البوابات المؤسسية Next.js',
      portalsCol: 'أدوات مهندسي الويب',
      speedAudit: 'فحص سرعة الموقع وسيو جوجل',
      cmsSim: 'محاكي لوحة التحكم CMS',
      slaGuarantee: 'اتفاقية مستوى الخدمة SLA',
      rightsReserved: 'جميع الحقوق محفوظة لمنصة علاء الدين DXP لتصميم وتطوير المواقع.',
    },
    previewModal: {
      titleSuffix: '— معاينة تفاعلية حية',
      closeTooltip: 'إغلاق النافذة (Esc)',
      desktop: 'كمبيوتر',
      tablet: 'جهاز لوحي',
      mobile: 'هاتف ذكي',
      goToWorkPage: 'صفحة هذا النموذج في الموقع',
      portfolioShort: 'الأعمال',
      liveDomain: 'رابط الموقع المباشر',
      scrollTip: 'يمكنك التمرير والتفاعل داخل النافذة لاختبار الاستجابة.',
    },
    consultModal: {
      title: 'طلب استشارة متخصصة ونموذج أولي مجاني',
      subtitle: 'يتم تجهيز المخطط التفاعلي المبدئي خلال ساعتين',
      nameLabel: 'الاسم الكريم أو اسم الشركة',
      namePlaceholder: 'مثال: م. أحمد / شركة الخليج للتجارة',
      phoneLabel: 'رقم الهاتف / الواتساب',
      phonePlaceholder: '+971 50...',
      serviceLabel: 'نوع الموقع أو المنصة المطلوبة',
      budgetLabel: 'الميزانية المتوقعة للمشروع',
      detailsLabel: 'ملاحظات أو متطلبات خاصة (اختياري)',
      detailsPlaceholder: 'مثلاً: ربط مع نظام ERP، لغات متعددة (عربي وإنجليزي)...',
      submitBtn: 'إرسال الطلب واستلام النموذج المبدئي',
      submitting: 'جاري الإرسال...',
      privacy: 'بياناتكم مشفرة ومحمية باتفاقية سرية مهنية تامة.',
      successTitle: 'تم استلام طلبكم بنجاح!',
      successDesc: 'سيتواصل معكم مهندس النظم التقنية خلال ١٥ دقيقة لموافاتكم بالنموذج.',
      closeBtn: 'إغلاق',
    },
  },

  tr: {
    navTools: {
      speedAudit: 'Hız ve SEO Analizi',
      speedAuditDesc: 'Core Web Vitals testi ve mimari incelemesi',
      cmsSimulator: 'Canlı Headless CMS Simülatörü',
      cmsSimulatorDesc: 'Blok editörü, çoklu dil ve API testi',
      slaGuarantee: 'Resmi SLA ve Garanti',
      slaGuaranteeDesc: '%99.98 kesintisiz çalışma ve %100 kaynak kod mülkiyeti',
      specializedTitle: 'Uzmanlık Mimarileri',
    },
    ecommerceShowcase: {
      badge: 'Aladdin DXP Ölçeklenebilir E-Ticaret Altyapısı',
      title: 'Yeni Nesil E-Ticaret Siteniz;',
      titleHighlight: 'Yüksek Dönüşüm ve Satış İçin Hazır',
      description: 'Ürün keşfinden hızlı ödeme ve kargo takibine kadar satın alma yolculuğunu kısaltan ışık hızında mobil odaklı e-ticaret.',
      tagTorob: 'Pazaryeri ve Fiyat Karşılaştırma API',
      tagSnappPay: 'Taksitli ve Esnek Ödeme Entegrasyonu',
      tagGateway: 'Güvenli 3D PayTR & İyzico',
      ctaPreview: 'Ücretsiz Demo ve Taslak İsteyin',
      ctaCalculate: 'E-Ticaret Maliyetini Hesapla',
      cartAdded: 'Sepete başarıyla eklendi!',
      newOrder: '+1 Yeni Sipariş',
      justNow: 'Az önce verildi',
      liveOnline: 'Canlı: 1.420 Ziyaretçi Çevrimiçi',
      product1Title: 'AirPods Pro 2. Nesil',
      product2Title: 'Ultra Titanyum Akıllı Saat',
      product3Title: 'Stüdyo Kablosuz Kulaklık',
      product1Price: '6.490 TL',
      product2Price: '4.890 TL',
      product3Price: '2.190 TL',
      addToCart: 'Ekle',
      buyNow: 'Hemen Al',
      searchDemo: '12.400 ürün arasında arayın...',
      gatewayActive: 'Ödeme Aktif',
      promoBadge: 'Fırsat',
      promoTitle: 'Ücretsiz Hızlı Kargo',
      promoDesc: '500 TL üzeri tüm siparişlerde geçerli',
      product1Badge: 'Özel',
      product2Badge: '%30 İndirim',
      product3Badge: 'Orijinal',
    },
    servicesGrid: {
      tag: 'Aladdin Web ve DXP Çözümleri',
      title: 'İş Modelinize Özel Mühendislik Mimarisi',
      description: 'Herkese uyan tek bir şablon yoktur. Kurumsal prestij siteleri, yoğun e-ticaret platformları ve klinik randevu sistemleri tamamen farklı kod temelleri gerektirir.',
      compareBtn: 'Teknik Karşılaştırma Tablosu',
      viewDetails: 'Detayları ve Özellikleri Gör',
      requestCustom: 'Özel Mimari Talep Et',
    },
    templatesShowcase: {
      tag: 'Mühendislik Harikası Hazır Şablonlar',
      title: '3-5 Günde Yayına Hazır Işık Hızında Şablonlar',
      description: 'Modern tasarım, temiz kodlama ve sıfır hantal eklenti yüküyle Google standartlarında zirve performans.',
      allTemplates: 'Tüm Şablonları İncele',
      deliveryDays: 'İş Günü',
      livePreview: 'Canlı Önizleme',
      orderTemplate: 'Şablon Kurulumunu Başlat',
    },
    liveTicker: {
      tag: 'Canlı Sistem ve Performans Takibi',
      title: 'Aladdin DXP ile Yayında Olan Gerçek Müşteri Projeleri',
      description: '1 saniyenin altında açılış hızını ve kurumsal standartları aktif sanayi ve e-ticaret sitelerimizde test edin.',
      viewAllProjects: '120+ Aktif Projeyi İnceleyin',
    },
    caseStudies: {
      tag: 'Gerçek Başarı Hikayeleri',
      title: 'Kendi Sektöründe Çıtayı Belirleyen Web Siteleri',
      description: 'Büyük sanayi devlerinden e-ticaret liderlerine kadar yüksek trafik ve ölçülebilir başarı sağlayan projeler.',
      viewLive: 'Canlı Siteyi Gör',
      interactivePreview: 'İnteraktif Önizleme',
    },
    architecture: {
      tag: 'Tavizsiz Modern Mimari',
      title: 'Mühendislik Kodu ile Standart Şablonların Farkı',
      description: 'Next.js, dağıtık uç sunucular ve çok katmanlı güvenlik ile en yüksek hız ve kesintisiz erişim.',
      tabPipeline: 'DevOps ve Veri Akışı',
      tabComparison: 'Detaylı Karşılaştırma',
    },
    pricingSection: {
      tag: 'Şeffaf Fiyatlar, Sıfır Gizli Maliyet',
      title: 'Net Yatırım; Şeffaf Kapsam ve Ölçülebilir Değer',
      description: 'Tüm paketlere tam kaynak kod mülkiyeti, ilk yıl bulut barındırma, alan adı ve sözleşmeli SLA dahildir.',
      openCalculator: 'İnteraktif Fiyat Hesaplayıcı',
      orderPlan: 'Bu Paketi Seç',
      starterPrice: '14.900 TL',
      growthPrice: '26.900 TL',
      enterprisePrice: '44.900+ TL',
    },
    faqSection: {
      tag: 'Net Sözleşmeler ve Şeffaf Süreç',
      title: 'Sipariş Öncesinde Cevaplanması Gereken',
      titleHighlight: 'En Önemli Temel Sorular',
      description: 'Fiyatlar, kaynak kod mülkiyeti, teslimat süreleri ve teknik destek hakkında net ve açık yanıtlar.',
      freeConsult: 'Ücretsiz Danışma Hattı:',
      items: [
        {
          question: 'Web tasarım maliyeti nasıl hesaplanır ve nelere bağlıdır?',
          answer: 'Maliyet, proje mimarisine (sayfa sayısı, özel modüller ve entegrasyonlara) göre şeffafça belirlenir. Resmi teklifimizde hiçbir gizli masraf yer almaz.',
          bulletPoints: ['Tüm teknik kalemleri içeren kurumsal teklif', 'Sonradan ek ücret çıkarılmayacağına dair yazılı garanti'],
        },
        {
          question: 'Web sitesi ne kadar sürede teslim edilir?',
          answer: 'Hazır şablonlar 3 ila 7 iş gününde teslim edilir. Figma tasarımı ve özel yazılım içeren kurumsal projeler 15 ila 30 iş günü sürer.',
          bulletPoints: ['Hazır altyapılı şablonlar: 3 - 7 iş günü', 'Özel kodlanan Next.js portalları: 15 - 30 iş günü'],
        },
        {
          question: 'Alan adı, hosting ve kaynak kodların sahibi kimdir?',
          answer: 'Alan adı, hosting ve yazılım kaynak kodlarının %100 yasal sahibi sizsiniz. Proje bitiminde tüm yönetici şifreleri eksiksiz teslim edilir.',
          bulletPoints: ['Doğrudan firmanız adına tescil', 'Hiçbir lisans kilidi olmadan tam kaynak kod teslimi'],
        },
        {
          question: 'Teslimat sonrasında yönetim eğitimi veriliyor mu?',
          answer: 'Evet; sitenizin yönetim paneline özel olarak kaydedilmiş adım adım video eğitimler ve canlı destek oturumu sağlıyoruz.',
          bulletPoints: ['Yönetim panelinize özel HD video rehberler', 'Telefon ve bilet üzerinden doğrudan teknik destek'],
        },
        {
          question: 'Ödeme koşulları ve takvim nasıl işler?',
          answer: 'Ödemeler aşamalı olarak alınır (başlangıç avansı, tasarım onayı ve yayına alma aşamasında kalan bakiye).',
          bulletPoints: ['Aşamalara bağlı güvenli ödeme planı', 'Kurumsal şirketler için esnek faturalandırma'],
        },
      ],
    },
    ctaSection: {
      tag: 'Taahhütsüz Ücretsiz Teknik Danışmanlık',
      title: 'Hangi web altyapısının işletmeniz için en iyisi olduğundan emin değil misiniz?',
      description: 'Hemen arayın; kıdemli yazılım mimarlarımız rakiplerinizi inceleyerek sizin için en ekonomik ve doğru çözümü ücretsiz sunsun.',
      btnCall: 'Teknik Mimarla Görüşün',
      btnWhatsapp: 'WhatsApp ile Yazışın',
    },
    footer: {
      brandDesc: 'Aladdin DXP; 10 yılı aşkın tecrübesiyle kurumsal firmalar, e-ticaret markaları ve global şirketler için yüksek performanslı web sistemleri üretir.',
      callNationwide: 'Müşteri Hattı ve Ücretsiz Danışma',
      directLine: 'Merkez Ofis ve Teknik Operasyon',
      specializedCol: 'Uzmanlık Çözümleri',
      corporateWeb: 'Kurumsal Web Tasarım',
      ecommerceWeb: 'E-Ticaret Platformları',
      medicalWeb: 'Klinik ve Randevu Siteleri',
      portalWeb: 'Özel Next.js Portalları',
      portalsCol: 'Mühendislik Araçları',
      speedAudit: 'Hız ve Core Web Vitals Testi',
      cmsSim: 'İnteraktif CMS Simülatörü',
      slaGuarantee: 'Resmi SLA ve Uptime Sözleşmesi',
      rightsReserved: 'Tüm hakları saklıdır. Aladdin DXP Dijital Deneyim Platformu.',
    },
    previewModal: {
      titleSuffix: '— Canlı Önizleme',
      closeTooltip: 'Pencereyi Kapat (Esc)',
      desktop: 'Masaüstü',
      tablet: 'Tablet',
      mobile: 'Mobil',
      goToWorkPage: 'Sitedeki Proje Sayfası',
      portfolioShort: 'Projeler',
      liveDomain: 'Canlı Web Adresi',
      scrollTip: 'Pencere içinde kaydırarak duyarlı tasarımı ve detayları inceleyebilirsiniz.',
    },
    consultModal: {
      title: 'Uzman Danışmanlık ve Ücretsiz Taslak Talebi',
      subtitle: 'Ön taslak linkiniz 2 saat içinde hazırlanıp gönderilir',
      nameLabel: 'Adınız Soyadınız veya Şirket Ünvanı',
      namePlaceholder: 'Örn: Mehmet Yılmaz / Atlas Dış Ticaret A.Ş.',
      phoneLabel: 'Telefon Numaranız (WhatsApp dahil)',
      phonePlaceholder: '05...',
      serviceLabel: 'İstenen Platform veya Hizmet Türü',
      budgetLabel: 'Hedef Bütçe Aralığı',
      detailsLabel: 'Ek Notlar veya Özel Entegrasyonlar (İsteğe bağlı)',
      detailsPlaceholder: 'Örn: ERP entegrasyonu, Türkçe & İngilizce çoklu dil...',
      submitBtn: 'Talebi Gönder ve Taslak Al',
      submitting: 'İletiliyor...',
      privacy: 'Bilgileriniz KVKK kapsamında gizli tutulur ve yalnızca teknik değerlendirme için kullanılır.',
      successTitle: 'Talebiniz başarıyla alındı!',
      successDesc: 'Kıdemli çözüm mimarımız 15 dakika içinde detaylı taslak ile sizinle iletişime geçecektir.',
      closeBtn: 'Kapat',
    },
  },

  de: {
    navTools: {
      speedAudit: 'Speed- & SEO-Audit',
      speedAuditDesc: 'Core Web Vitals Test & Architektur-Analyse',
      cmsSimulator: 'Live Headless CMS Simulator',
      cmsSimulatorDesc: 'Interaktiver Block-Builder, Mehrsprachigkeit & API',
      slaGuarantee: 'Offizielle SLA-Garantie',
      slaGuaranteeDesc: '99,98% Uptime & 100% Quellcode-Eigentum',
      specializedTitle: 'Spezialisierte Architekturen',
    },
    ecommerceShowcase: {
      badge: 'Aladdin DXP Skalierbare E-Commerce Plattform',
      title: 'Ihr High-End Online-Shop;',
      titleHighlight: 'Entwickelt für maximale Conversion-Raten',
      description: 'Ein kompromisslos schneller, mobiler Online-Shop, der von der Produktdarstellung bis zur Kasse den Einkaufsweg verkürzt und optimiert.',
      tagTorob: 'Marktplatz- & Preisvergleichs-API',
      tagSnappPay: 'Ratenkauf & Flexible Zahlungsarten',
      tagGateway: 'TÜV-geprüfte Zahlungsabwicklung',
      ctaPreview: 'Live-Prototyp & Beratung anfordern',
      ctaCalculate: 'Shop-Kosten online berechnen',
      cartAdded: 'Erfolgreich zum Warenkorb hinzugefügt!',
      newOrder: '+1 Neue Bestellung',
      justNow: 'Gerade eben eingegangen',
      liveOnline: 'Live: 1.420 Käufer online',
      product1Title: 'AirPods Pro 2. Generation',
      product2Title: 'Smart Watch Ultra Titanium',
      product3Title: 'Studio Wireless Kopfhörer',
      product1Price: '249 €',
      product2Price: '189 €',
      product3Price: '89 €',
      addToCart: 'In den Warenkorb',
      buyNow: 'Sofort-Kauf',
      searchDemo: 'In über 12.400 Artikeln suchen...',
      gatewayActive: 'Gateway Aktiv',
      promoBadge: 'Sonderaktion',
      promoTitle: 'Kostenloser Expressversand',
      promoDesc: 'Sonderrabatt auf alle Bestellungen ab 100 €',
      product1Badge: 'Top',
      product2Badge: '-30%',
      product3Badge: 'Original',
    },
    servicesGrid: {
      tag: 'Aladdin Web- & DXP-Engineering',
      title: 'Architektur maßgeschneidert für Ihr Geschäftsmodell',
      description: 'Keine Standardvorlagen von der Stange. Unternehmensportale, Transaktions-Marktplätze und Terminbuchungs-Systeme benötigen jeweils spezifische Codebases.',
      compareBtn: 'Vollständiger Technologie-Vergleich',
      viewDetails: 'Details & Spezifikationen',
      requestCustom: 'Individuelle Architektur anfragen',
    },
    templatesShowcase: {
      tag: 'Ingenieurmäßige Vorlagen',
      title: 'Einsatzbereite High-Speed Blueprints in 3-5 Tagen',
      description: 'Modernste Ästhetik, sauberer TypeScript-Code und Spitzenwerte bei Google Core Web Vitals ohne träge Plugins.',
      allTemplates: 'Alle Vorlagen ansehen',
      deliveryDays: 'Werktage',
      livePreview: 'Interaktive Vorschau',
      orderTemplate: 'Vorlage beauftragen',
    },
    liveTicker: {
      tag: 'Live Uptime- & Performance-Überwachung',
      title: 'Aktive Produktivsysteme auf Basis von Aladdin DXP',
      description: 'Erleben Sie Ladezeiten unter einer Sekunde und höchste Verfügbarkeit bei aktiven Industrie- und E-Commerce-Kunden.',
      viewAllProjects: '120+ aktive Projekte ansehen',
    },
    caseStudies: {
      tag: 'Erfolgreiche Kundenprojekte',
      title: 'Websites, die Maßstäbe in ihrer Branche setzen',
      description: 'Von Stahlkonzernen und Kliniken bis zu stark wachsenden Online-Händlern – messbare Ergebnisse und Top-Google-Rankings.',
      viewLive: 'Live-Website besuchen',
      interactivePreview: 'Interaktive Vorschau',
    },
    architecture: {
      tag: 'Kompromisslose Web-Architektur',
      title: 'Ingenieurmäßiger Code im Vergleich zu Standard-Templates',
      description: 'Next.js, weltweites Edge-Netzwerk und mehrschichtige Absicherung für garantierte Sub-Sekunden-Geschwindigkeit.',
      tabPipeline: 'DevOps-Pipeline & Datenfluss',
      tabComparison: 'Detaillierter Systemvergleich',
    },
    pricingSection: {
      tag: 'Transparente Festpreise ohne versteckte Kosten',
      title: 'Klare Investition; exakter Projektumfang & messbarer Wert',
      description: 'Alle Pakete beinhalten das volle Quellcode-Eigentum, Cloud-Hosting im 1. Jahr, Domain-Einrichtung und SLA-Garantie.',
      openCalculator: 'Interaktiver Tarif-Kalkulator',
      orderPlan: 'Dieses Paket wählen',
      starterPrice: '490 €',
      growthPrice: '890 €',
      enterprisePrice: '1.490+ €',
    },
    faqSection: {
      tag: 'Vertragssicherheit & Transparenz',
      title: 'Grundlegende Fragen vor Auftragserteilung',
      titleHighlight: 'die jede Agentur klar beantworten muss',
      description: 'Eindeutige Antworten zu Projektkosten, Quellcode-Eigentum, Lieferzeiten und technischem Support.',
      freeConsult: 'Kostenlose Erstberatung:',
      items: [
        {
          question: 'Wie setzen sich die Kosten für das Webdesign zusammen?',
          answer: 'Die Kosten richten sich nach der Projektarchitektur (Seitenumfang, Schnittstellen, individuelle Module). Unser offizielles Angebot enthält verbindliche Festpreise ohne versteckte Nachforderungen.',
          bulletPoints: ['Detailliertes Festpreisangebot mit vollständiger Spezifikation', 'Vertragliche Garantie gegen jegliche versteckte Mehrkosten'],
        },
        {
          question: 'Wie lange dauert die Fertigstellung der Website?',
          answer: 'Einsatzbereite Vorlagen stehen innerhalb von 3 bis 7 Werktagen bereit. Individuelle DXP-Projekte mit Figma-Entwurf und maßgeschneiderter Programmierung dauern 15 bis 30 Werktage.',
          bulletPoints: ['Vorlagen-Systeme: 3 bis 7 Werktage', 'Individuelle Next.js Portale: 15 bis 30 Werktage'],
        },
        {
          question: 'Wem gehören Domain, Hosting und der Quellcode?',
          answer: 'Sie sind zu 100% alleiniger Eigentümer von Domain, Hosting-Account und Git-Repository. Alle Administratorrechte werden bei Projektabschluss übergeben.',
          bulletPoints: ['Vollständige Registrierung direkt auf Ihr Unternehmen', 'Kompletter Quellcode ohne Verschlüsselung oder Hersteller-Bindung'],
        },
        {
          question: 'Gibt es nach dem Launch eine Einschulung für das CMS?',
          answer: 'Ja; wir schulen Ihr Team in einer Live-Session und stellen maßgeschneiderte Video-Tutorials für Ihr Dashboard bereit.',
          bulletPoints: ['Individuelle HD-Videoanleitungen für Ihr Redaktionsteam', 'Direkter Support via Ticketsystem und Telefon'],
        },
        {
          question: 'Wie sind die Zahlungsmodalitäten geregelt?',
          answer: 'Die Zahlung erfolgt meilensteinbasiert (Anzahlung, Freigabe des UI-Designs und Schlussrate bei erfolgreichem Livegang).',
          bulletPoints: ['Transparente Zahlungsstufen gekoppelt an Teillieferungen', 'Rechnungskauf und flexible Modelle für Unternehmen'],
        },
      ],
    },
    ctaSection: {
      tag: 'Unverbindliche technische Erstberatung',
      title: 'Unsicher, welche Web-Architektur optimal für Ihr Unternehmen ist?',
      description: 'Rufen Sie uns an – unsere Systemarchitekten analysieren Ihre Wettbewerber und zeigen Ihnen kostenlos den wirtschaftlichsten Weg auf.',
      btnCall: 'Mit Senior-Architekt sprechen',
      btnWhatsapp: 'Über WhatsApp anfragen',
    },
    footer: {
      brandDesc: 'Aladdin DXP ist eine spezialisierte Plattform für Web-Engineering mit über zehn Jahren Erfahrung in der Entwicklung skalierbarer Unternehmens- und E-Commerce-Systeme.',
      callNationwide: 'Bundesweite Hotline & kostenlose Beratung',
      directLine: 'Zentrale & Technische Leitung',
      specializedCol: 'Kernkompetenzen',
      corporateWeb: 'Corporate Webdesign',
      ecommerceWeb: 'Skalierbare E-Commerce Plattformen',
      medicalWeb: 'Klinik- & Buchungsportale',
      portalWeb: 'Maßgeschneiderte Next.js Portale',
      portalsCol: 'Engineering-Tools',
      speedAudit: 'Speed & Core Web Vitals Test',
      cmsSim: 'Interaktiver CMS-Simulator',
      slaGuarantee: 'Offizielle SLA & Uptime-Garantie',
      rightsReserved: 'Alle Rechte vorbehalten. Aladdin DXP Digital Experience Platform.',
    },
    previewModal: {
      titleSuffix: '— Live-Vorschau',
      closeTooltip: 'Fenster schließen (Esc)',
      desktop: 'Desktop',
      tablet: 'Tablet',
      mobile: 'Mobil',
      goToWorkPage: 'Projektseite im Portfolio',
      portfolioShort: 'Portfolio',
      liveDomain: 'Live Webadresse',
      scrollTip: 'Interaktives Fenster: Scrollen Sie im Fenster, um das responsive Layout zu testen.',
    },
    consultModal: {
      title: 'Expertenberatung & kostenlosen Vorentwurf anfordern',
      subtitle: 'Ihr individueller interaktiver Prototyp innerhalb von 2 Stunden fertiggestellt',
      nameLabel: 'Ihr vollständiger Name oder Firmenname',
      namePlaceholder: 'z.B. Markus Weber / Weber Maschinenbau GmbH',
      phoneLabel: 'Telefonnummer / WhatsApp',
      phonePlaceholder: '+49 170...',
      serviceLabel: 'Gewünschte Plattform-Architektur',
      budgetLabel: 'Geplanter Budgetrahmen',
      detailsLabel: 'Zusatzwünsche oder spezifische Schnittstellen (Optional)',
      detailsPlaceholder: 'z.B. ERP-Anbindung, Mehrsprachigkeit Deutsch & Englisch...',
      submitBtn: 'Anfrage absenden & Prototyp erhalten',
      submitting: 'Wird übermittelt...',
      privacy: 'Ihre Daten sind zu 100% DSGVO-konform geschützt und werden vertraulich behandelt.',
      successTitle: 'Anfrage erfolgreich eingegangen!',
      successDesc: 'Unser technischer Projektleiter wird sich innerhalb von 15 Minuten mit ersten Entwürfen bei Ihnen melden.',
      closeBtn: 'Fenster schließen',
    },
  },
};
