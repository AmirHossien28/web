import { LocaleKey, MarketContactConfig } from '../types';

export interface I18nContent {
  dir: 'rtl' | 'ltr';
  langName: string;
  code: LocaleKey;
  marketContact: MarketContactConfig;
  nav: {
    home: string;
    services: string;
    servicesDropdown: {
      corporate: string;
      corporateDesc: string;
      ecommerce: string;
      ecommerceDesc: string;
      servicesMedical: string;
      servicesMedicalDesc: string;
      portal: string;
      portalDesc: string;
      blog: string;
      blogDesc: string;
    };
    portfolio: string;
    templates: string;
    pricing: string;
    contact: string;
    cmsStudio: string;
    instantEstimate: string;
    searchPlaceholder: string;
  };
  topBar: {
    hotlineLabel: string;
    monitoringActive: string;
    viewMode: string;
    securePayment: string;
  };
  hero: {
    dxpTag: string;
    dxpSubtitle: string;
    titlePart1: string;
    highlightVisitors: string;
    titlePart2: string;
    highlightCustomers: string;
    titlePart3: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    pillarSpeed: string;
    pillarSpeedDesc: string;
    pillarCustom: string;
    pillarCustomDesc: string;
    pillarSupport: string;
    pillarSupportDesc: string;
    pillarAi: string;
    pillarAiDesc: string;
    formTitle: string;
    formFreeTag: string;
    formSubtitle: string;
    formBusinessLabel: string;
    formBusinessPlaceholder: string;
    formTypeLabel: string;
    formPhoneLabel: string;
    formPhonePlaceholder: string;
    formSubmit: string;
    formPrivacy: string;
    formResponseTime: string;
    formSuccessTitle: string;
    formSuccessDesc: string;
  };
}

export const I18N_DATA: Record<LocaleKey, I18nContent> = {
  fa: {
    dir: 'rtl',
    langName: 'فارسی (FA)',
    code: 'fa',
    marketContact: {
      countryCode: 'IR',
      countryName: 'ایران',
      hotline: '90009830',
      hotlineFormatted: '9000 9830',
      hotlineNote: '(بدون کد و پیش‌شماره)',
      directPhone: '+98 21 8845 2200',
      whatsapp: 'https://wa.me/989125347119',
      telegram: 'https://t.me/aladdin_dxp',
      officeAddress: 'تهران، خیابان شریعتی، برج فناوری صبا، طبقه ۸',
      workingHours: 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰ | پشتیبانی ۲۴/۷',
      currencySymbol: 'تومان',
      currencyRateMultiplier: 1,
    },
    nav: {
      home: 'صفحه اصلی',
      services: 'طراحی سایت',
      servicesDropdown: {
        corporate: 'طراحی سایت شرکتی',
        corporateDesc: 'چندزبانه و اعتبارساز برند',
        ecommerce: 'فروشگاه اینترنتی',
        ecommerceDesc: 'متصل به ترب و درگاه آنلاین',
        servicesMedical: 'سایت خدماتی و پزشکی',
        servicesMedicalDesc: 'نوبت‌دهی و رزرو آنلاین',
        portal: 'پورتال‌های سازمانی',
        portalDesc: 'توسعه مدرن با Next.js',
        blog: 'آموزش و مقالات',
        blogDesc: 'راهنما، ترفندها و سئو',
      },
      portfolio: 'نمونه‌کارها',
      templates: 'قالب‌های آماده',
      pricing: 'تعرفه و قیمت',
      contact: 'تماس با ما',
      cmsStudio: 'استودیو دیزاین‌سیستم',
      instantEstimate: 'استعلام آنلاین',
      searchPlaceholder: 'جستجو در خدمات و مقالات...',
    },
    topBar: {
      hotlineLabel: 'خط ویژه سراسری:',
      monitoringActive: 'پشتیبانی فنی و مانیتورینگ ۲۴/۷ فعال',
      viewMode: 'حالت نمایش:',
      securePayment: 'درگاه پرداخت امن بانکی',
    },
    hero: {
      dxpTag: 'پلتفرم تحول دیجیتال علاءالدین DXP',
      dxpSubtitle: 'طراحی سایت مهندسی‌شده و تبدیل‌گرا',
      titlePart1: 'وب‌سایت‌هایی که ',
      highlightVisitors: 'بازدیدکننده',
      titlePart2: ' را به ',
      highlightCustomers: 'مشتری دائم',
      titlePart3: ' تبدیل می‌کنند.',
      description: 'ارائه‌دهنده راهکارهای جامع طراحی وبسایت شرکتی، پلتفرم‌های پرسرعت فروشگاهی و پورتال‌های سازمانی با سئو تکنیکال از خشت اول و معماری ماژولار ابری برای بیش از ۱۲۰۰ برند معتبر.',
      ctaPrimary: 'دریافت پیش‌نمایش و مشاوره فوری',
      ctaSecondary: 'مشاهده نمونه‌کارهای آنلاین',
      pillarSpeed: 'زیر ۱ ثانیه',
      pillarSpeedDesc: 'سرعت بارگذاری Core Web Vitals',
      pillarCustom: '۱۰۰٪ اختصاصی',
      pillarCustomDesc: 'بدون قالب قفل‌شده یا نال‌شده',
      pillarSupport: 'پشتیبانی ۲۴/۷',
      pillarSupportDesc: 'تیکتینگ و تماس آنی VIP',
      pillarAi: 'آماده سئو و هوش مصنوعی',
      pillarAiDesc: 'Schema Markup و کدهای معنایی',
      formTitle: 'سایت جدیدت را قبل از سفارش ببین!',
      formFreeTag: 'مشاوره رایگان',
      formSubtitle: 'نام کسب‌وکار و شماره تماس خود را وارد نمایید تا طرح اولیه پیشنهادی را ظرف ۲ ساعت برایتان آماده و ارسال کنیم.',
      formBusinessLabel: 'نام کسب‌وکار یا زمینه کاری شما',
      formBusinessPlaceholder: 'مثلاً: شرکت بازرگانی پارس، فروشگاه پوشاک، کلینیک...',
      formTypeLabel: 'نوع وب‌سایت درخواستی',
      formPhoneLabel: 'شماره همراه جهت هماهنگی دمو',
      formPhonePlaceholder: '0912...',
      formSubmit: 'ثبت درخواست و مشاهده نمونه‌های مرتبط',
      formPrivacy: 'اطلاعات شما کاملاً محفوظ است',
      formResponseTime: 'پاسخگویی کمتر از ۱۵ دقیقه',
      formSuccessTitle: 'درخواست شما با موفقیت دریافت شد!',
      formSuccessDesc: 'کارشناسان ارشد معماری نرم‌افزار علاءالدین به زودی جهت هماهنگی دمو با شما تماس می‌گیرند.',
    },
  },
  en: {
    dir: 'ltr',
    langName: 'English (EN)',
    code: 'en',
    marketContact: {
      countryCode: 'GLOBAL',
      countryName: 'International',
      hotline: '+442079460912',
      hotlineFormatted: '+44 20 7946 0912',
      hotlineNote: '(Toll-free / Worldwide)',
      directPhone: '+44 20 7946 0912',
      whatsapp: 'https://wa.me/442079460912',
      telegram: 'https://t.me/aladdin_dxp',
      officeAddress: 'Level 14, 1 Canada Square, Canary Wharf, London, UK',
      workingHours: 'Mon-Fri 08:00 - 18:00 GMT | 24/7 Support',
      currencySymbol: '$',
      currencyRateMultiplier: 0.000017,
    },
    nav: {
      home: 'Home',
      services: 'Services',
      servicesDropdown: {
        corporate: 'Corporate Web Design',
        corporateDesc: 'Multilingual & Brand Authority',
        ecommerce: 'E-Commerce Platform',
        ecommerceDesc: 'Ultra-fast checkout & marketplace API',
        servicesMedical: 'Medical & Booking Portals',
        servicesMedicalDesc: 'Live appointment scheduling',
        portal: 'Enterprise Next.js Portals',
        portalDesc: 'Custom cloud architecture',
        blog: 'Insights & Blog',
        blogDesc: 'Engineering guides & SEO tips',
      },
      portfolio: 'Portfolio',
      templates: 'Ready Templates',
      pricing: 'Pricing & Calculator',
      contact: 'Contact Us',
      cmsStudio: 'Design System & CMS',
      instantEstimate: 'Instant Quote',
      searchPlaceholder: 'Search services and articles...',
    },
    topBar: {
      hotlineLabel: 'Worldwide Line:',
      monitoringActive: '24/7 DevOps & Uptime Monitoring Active',
      viewMode: 'Theme Mode:',
      securePayment: 'Verified Secure Escrow & Payment',
    },
    hero: {
      dxpTag: 'Aladdin DXP Digital Experience Platform',
      dxpSubtitle: 'Engineered Web Solutions & Conversion UX',
      titlePart1: 'Websites that transform ',
      highlightVisitors: 'visitors',
      titlePart2: ' into ',
      highlightCustomers: 'loyal customers',
      titlePart3: ' effortlessly.',
      description: 'End-to-end digital architecture for international corporate brands, high-velocity e-commerce stores, and enterprise cloud portals with sub-second performance and built-in technical SEO.',
      ctaPrimary: 'Request Live Prototype & Demo',
      ctaSecondary: 'Explore Live Portfolio',
      pillarSpeed: 'Sub-Second',
      pillarSpeedDesc: 'Google Core Web Vitals 99+',
      pillarCustom: '100% Bespoke Code',
      pillarCustomDesc: 'Zero nulled scripts or generic locks',
      pillarSupport: '24/7 Dedicated SLA',
      pillarSupportDesc: 'Direct DevOps ticketing & hotlines',
      pillarAi: 'AI & Semantic Ready',
      pillarAiDesc: 'Structured Schema.org & machine readability',
      formTitle: 'Preview your new site before ordering!',
      formFreeTag: 'Free Consultation',
      formSubtitle: 'Enter your business name and contact info to receive an interactive preliminary wireframe within 2 hours.',
      formBusinessLabel: 'Your Business Name or Industry',
      formBusinessPlaceholder: 'e.g. Apex Global Logistics, FinTech Portal...',
      formTypeLabel: 'Desired Platform Architecture',
      formPhoneLabel: 'Phone / WhatsApp for Demo Sync',
      formPhonePlaceholder: '+1 (555) 019-2834',
      formSubmit: 'Submit Request & View Live Samples',
      formPrivacy: 'Enterprise-grade NDA & privacy guaranteed',
      formResponseTime: 'Average callback time: < 15 mins',
      formSuccessTitle: 'Request received successfully!',
      formSuccessDesc: 'Our senior solutions architect will contact you shortly with preliminary assets.',
    },
  },
  ar: {
    dir: 'rtl',
    langName: 'العربية (AR)',
    code: 'ar',
    marketContact: {
      countryCode: 'AE',
      countryName: 'الإمارات العربية المتحدة',
      hotline: '+97142345678',
      hotlineFormatted: '+971 4 234 5678',
      hotlineNote: '(دبي - مجاني)',
      directPhone: '+971 4 234 5678',
      whatsapp: 'https://wa.me/97142345678',
      telegram: 'https://t.me/aladdin_dxp',
      officeAddress: 'برج التجارة العالمي، شارع الشيخ زايد، دبي، الإمارات',
      workingHours: 'الأحد إلى الخميس ٠٩:٠٠ - ١٨:٠٠ | دعم فني ٢٤/٧',
      currencySymbol: 'AED',
      currencyRateMultiplier: 0.000062,
    },
    nav: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      servicesDropdown: {
        corporate: 'تصميم مواقع الشركات',
        corporateDesc: 'متعدد اللغات وهيبة تجارية',
        ecommerce: 'المتاجر الإلكترونية',
        ecommerceDesc: 'دفع فوري وسرعة قصوى',
        servicesMedical: 'المواقع الطبية والخدمية',
        servicesMedicalDesc: 'حجز مواعيد متقدم',
        portal: 'البوابات المؤسسية',
        portalDesc: 'برمجة خاصة بنظام Next.js',
        blog: 'المدونة والمقالات',
        blogDesc: 'دليل السيو وأحدث التقنيات',
      },
      portfolio: 'الأعمال',
      templates: 'القوالب الجاهزة',
      pricing: 'الأسعار والتقدير',
      contact: 'اتصل بنا',
      cmsStudio: 'نظام التصميم CMS',
      instantEstimate: 'عرض سعر فوري',
      searchPlaceholder: 'ابحث في الخدمات والمقالات...',
    },
    topBar: {
      hotlineLabel: 'الخط الدولي الموحد:',
      monitoringActive: 'دعم فني ومراقبة حية على مدار الساعة',
      viewMode: 'المظهر:',
      securePayment: 'بوابات دفع إلكترونية معتمدة',
    },
    hero: {
      dxpTag: 'منصة علاء الدين DXP للتحول الرقمي',
      dxpSubtitle: 'تصميم مواقع هندسية موجهة لرفع المبيعات',
      titlePart1: 'مواقع إلكترونية تحول ',
      highlightVisitors: 'الزائرين',
      titlePart2: ' إلى ',
      highlightCustomers: 'عملاء دائمين',
      titlePart3: ' بكل ثقة.',
      description: 'حلول برمجية متطورة لتصميم مواقع الشركات الكبرى، المنصات التجارية فائقة السرعة، والبوابات السحابية مع سيو تقني احترافي وأداء استثنائي.',
      ctaPrimary: 'طلب معاينة ونموذج أولي مجاني',
      ctaSecondary: 'استعراض المشاريع الحية',
      pillarSpeed: 'أقل من ثانية',
      pillarSpeedDesc: 'سرعة خضراء بمعايير جوجل القياسية',
      pillarCustom: '١٠٠٪ برمجة خاصة',
      pillarCustomDesc: 'بدون قوالب معطلة أو رديئة',
      pillarSupport: 'دعم فني ٢٤/٧',
      pillarSupportDesc: 'خط ساخن وتذاكر فورية لكبار العملاء',
      pillarAi: 'جاهزية للذكاء الاصطناعي',
      pillarAiDesc: 'بيانات Schema المنظمة لمحركات البحث',
      formTitle: 'شاهد تصميم موقعك الجديد قبل التعاقد!',
      formFreeTag: 'استشارة مجانية',
      formSubtitle: 'أدخل اسم نشاطك ورقم الهاتف لإعداد نموذج أولي مخصص وإرساله خلال ساعتين.',
      formBusinessLabel: 'اسم المنشأة أو مجال العمل',
      formBusinessPlaceholder: 'مثال: شركة تجارية، متجر عطور، مجمع طبي...',
      formTypeLabel: 'نوع المنصة المطلوبة',
      formPhoneLabel: 'رقم الجوال لتنسيق العرض التوضيحي',
      formPhonePlaceholder: '050...',
      formSubmit: 'إرسال الطلب واستعراض النماذج',
      formPrivacy: 'بياناتك مشفرة ومحمية بالكامل',
      formResponseTime: 'وقت الاستجابة: أقل من ١٥ دقيقة',
      formSuccessTitle: 'تم استلام طلبكم بنجاح!',
      formSuccessDesc: 'سيتواصل معكم مهندس النظم التقنية في أقرب وقت لإطلاعكم على الخطة.',
    },
  },
  tr: {
    dir: 'ltr',
    langName: 'Türkçe (TR)',
    code: 'tr',
    marketContact: {
      countryCode: 'TR',
      countryName: 'Türkiye',
      hotline: '+902123456789',
      hotlineFormatted: '+90 212 345 67 89',
      hotlineNote: '(İstanbul Ofisi)',
      directPhone: '+90 212 345 67 89',
      whatsapp: 'https://wa.me/902123456789',
      telegram: 'https://t.me/aladdin_dxp',
      officeAddress: 'Levent 199, Büyükdere Cad., Şişli, İstanbul',
      workingHours: 'Pzt-Cum 09:00 - 18:00 | 7/24 Teknik Destek',
      currencySymbol: 'TL',
      currencyRateMultiplier: 0.00055,
    },
    nav: {
      home: 'Ana Sayfa',
      services: 'Hizmetler',
      servicesDropdown: {
        corporate: 'Kurumsal Web Tasarım',
        corporateDesc: 'Çok dilli & Prestijli Kurumsal Kimlik',
        ecommerce: 'E-Ticaret Platformları',
        ecommerceDesc: 'Işık hızında ödeme ve pazar yeri API',
        servicesMedical: 'Klinik ve Randevu Siteleri',
        servicesMedicalDesc: 'Canlı takvim ve online randevu',
        portal: 'Kurumsal Next.js Portalları',
        portalDesc: 'Özel bulut mimarisi',
        blog: 'Akademi & Blog',
        blogDesc: 'Teknik rehberler ve SEO ipuçları',
      },
      portfolio: 'Projeler',
      templates: 'Hazır Şablonlar',
      pricing: 'Fiyatlandırma',
      contact: 'İletişim',
      cmsStudio: 'Tasarım Sistemi CMS',
      instantEstimate: 'Hızlı Fiyat Teklifi',
      searchPlaceholder: 'Hizmet ve makalelerde arayın...',
    },
    topBar: {
      hotlineLabel: 'Müşteri Hattı:',
      monitoringActive: '7/24 Kesintisiz Sunucu & Sistem Takibi',
      viewMode: 'Tema:',
      securePayment: 'Güvenli 3D Ödeme Altyapısı',
    },
    hero: {
      dxpTag: 'Aladdin DXP Dijital Deneyim Platformu',
      dxpSubtitle: 'Yüksek Dönüşümlü Mühendislik Web Çözümleri',
      titlePart1: 'Ziyaretçileri ',
      highlightVisitors: 'sadık müşterilere',
      titlePart2: ' dönüştüren ',
      highlightCustomers: 'üstün web siteleri',
      titlePart3: ' tasarlıyoruz.',
      description: 'Kurumsal markalar, e-ticaret devleri ve endüstriyel işletmeler için 1 saniyenin altında açılan, teknik SEO uyumlu ve Next.js tabanlı modern web mimarisi.',
      ctaPrimary: 'Ücretsiz Demo ve Taslak İsteyin',
      ctaSecondary: 'Canlı Projeleri İnceleyin',
      pillarSpeed: '1 Saniyenin Altı',
      pillarSpeedDesc: 'Google Core Web Vitals 99+',
      pillarCustom: '%100 Özel Kodlama',
      pillarCustomDesc: 'Korsan veya kilitli tema yok',
      pillarSupport: '7/24 Canlı Destek',
      pillarSupportDesc: 'Hızlı VIP biletleme ve çağrı',
      pillarAi: 'Yapay Zeka ve SEO Uyumlu',
      pillarAiDesc: 'Schema.org ve anlamsal kod yapısı',
      formTitle: 'Sipariş vermeden önce yeni sitenizi görün!',
      formFreeTag: 'Ücretsiz Danışmanlık',
      formSubtitle: 'İşletme adı ve telefon numaranızı girin, 2 saat içinde ilk taslak demo bağlantınızı iletelim.',
      formBusinessLabel: 'İşletme Adınız veya Sektörünüz',
      formBusinessPlaceholder: 'Örn: Lojistik A.Ş., E-Ticaret Giyim, Klinik...',
      formTypeLabel: 'İstenen Web Sitesi Türü',
      formPhoneLabel: 'Görüşme için Cep Telefonunuz',
      formPhonePlaceholder: '05...',
      formSubmit: 'Talebi Gönder ve Örnekleri Gör',
      formPrivacy: 'Bilgileriniz KVKK kapsamında korunmaktadır',
      formResponseTime: 'Ortalama yanıt: 15 dakikadan az',
      formSuccessTitle: 'Talebiniz başarıyla alındı!',
      formSuccessDesc: 'Kıdemli yazılım mimarımız detaylı taslak ile kısa sürede sizinle iletişime geçecektir.',
    },
  },
  de: {
    dir: 'ltr',
    langName: 'Deutsch (DE)',
    code: 'de',
    marketContact: {
      countryCode: 'DE',
      countryName: 'Deutschland',
      hotline: '+493012345678',
      hotlineFormatted: '+49 30 12345678',
      hotlineNote: '(Berlin Zentrale)',
      directPhone: '+49 30 12345678',
      whatsapp: 'https://wa.me/493012345678',
      telegram: 'https://t.me/aladdin_dxp',
      officeAddress: 'Potsdamer Platz 1, 10785 Berlin, Deutschland',
      workingHours: 'Mo-Fr 08:30 - 17:30 Uhr | 24/7 Notfallsupport',
      currencySymbol: '€',
      currencyRateMultiplier: 0.000015,
    },
    nav: {
      home: 'Startseite',
      services: 'Leistungen',
      servicesDropdown: {
        corporate: 'Corporate Webdesign',
        corporateDesc: 'Mehrsprachig & Markenpräsenz',
        ecommerce: 'E-Commerce Plattformen',
        ecommerceDesc: 'Sub-Sekunden Checkout & API Anbindung',
        servicesMedical: 'Medizin- & Terminportale',
        servicesMedicalDesc: 'Online Buchung & Terminkalender',
        portal: 'Next.js Unternehmensportale',
        portalDesc: 'Modulare Cloud-Architektur',
        blog: 'Magazin & Ratgeber',
        blogDesc: 'Entwicklungs-Guides & SEO-Tipps',
      },
      portfolio: 'Portfolio',
      templates: 'Vorlagen',
      pricing: 'Preise & Kalkulator',
      contact: 'Kontakt',
      cmsStudio: 'Design-System CMS',
      instantEstimate: 'Online-Kalkulation',
      searchPlaceholder: 'Leistungen und Artikel suchen...',
    },
    topBar: {
      hotlineLabel: 'Service-Hotline:',
      monitoringActive: '24/7 Server- und Leistungsüberwachung aktiv',
      viewMode: 'Ansicht:',
      securePayment: 'TÜV-geprüfte sichere Zahlungsabwicklung',
    },
    hero: {
      dxpTag: 'Aladdin DXP Digitale Plattform',
      dxpSubtitle: 'Ingenieurmäßiges Webdesign mit hoher Konversionsrate',
      titlePart1: 'Websites, die ',
      highlightVisitors: 'Besucher',
      titlePart2: ' in treue ',
      highlightCustomers: 'Kunden',
      titlePart3: ' verwandeln.',
      description: 'Maßgeschneiderte digitale Plattformen für Industrieunternehmen, exportorientierte Betriebe und hochperformante Online-Shops mit kompromissloser Geschwindigkeit unter einer Sekunde.',
      ctaPrimary: 'Live-Prototyp & Beratung anfordern',
      ctaSecondary: 'Portfolio entdecken',
      pillarSpeed: 'Unter 1 Sekunde',
      pillarSpeedDesc: 'Google Core Web Vitals 99+',
      pillarCustom: '100% Eigener Code',
      pillarCustomDesc: 'Keine gesperrten Vorlagen oder Ballast',
      pillarSupport: '24/7 SLA Support',
      pillarSupportDesc: 'Direkte VIP-Hotline und Ticketing',
      pillarAi: 'KI & SEO Optimiert',
      pillarAiDesc: 'Strukturierte Schema-Daten für Suchmaschinen',
      formTitle: 'Sehen Sie Ihre neue Website vor Auftragsvergabe!',
      formFreeTag: 'Kostenlose Erstberatung',
      formSubtitle: 'Geben Sie Unternehmensnamen und Telefonnummer ein – wir bereiten innerhalb von 2 Stunden einen Vorentwurf vor.',
      formBusinessLabel: 'Unternehmensname oder Branche',
      formBusinessPlaceholder: 'z.B. Maschinenbau GmbH, Fachklinik...',
      formTypeLabel: 'Gewünschte Plattform-Architektur',
      formPhoneLabel: 'Telefonnummer für Demo-Rückruf',
      formPhonePlaceholder: '+49 170...',
      formSubmit: 'Anfrage absenden & Demos ansehen',
      formPrivacy: 'Ihre Daten sind 100% DSGVO-konform geschützt',
      formResponseTime: 'Rückrufzeit im Schnitt: < 15 Minuten',
      formSuccessTitle: 'Anfrage erfolgreich eingegangen!',
      formSuccessDesc: 'Unser technischer Projektleiter wird sich zeitnah mit dem Prototyp bei Ihnen melden.',
    },
  },
};
