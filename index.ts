export type LocaleKey = 'fa' | 'en' | 'ar' | 'tr' | 'de';

export type PageId = 
  | 'home'
  | 'services'
  | 'corporate-web-design'
  | 'ecommerce-web-design'
  | 'services-web-design'
  | 'custom-portal-development'
  | 'portfolio'
  | 'templates'
  | 'pricing-calculator'
  | 'speed-audit'
  | 'cms-simulator'
  | 'sla-guarantee'
  | 'knowledge-blog'
  | 'about-contact'
  | 'cms-design-system';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  domain: string;
  url: string;
  img: string;
  description: string;
  leadResult: string;
  speed: string;
  googleRank: string;
  mobileScore: string;
  industry: string;
  technologies: string[];
  languages: string[];
  executionTime: string;
  featured?: boolean;
}

export interface TemplateItem {
  id: string;
  title: string;
  category: 'ecommerce' | 'industrial' | 'medical' | 'corporate';
  categoryLabel: string;
  tagline: string;
  description: string;
  img: string;
  rating: number;
  reviewsCount: number;
  deliveryDays: number;
  price: number;
  tags: string[];
  features: string[];
  techStack: string;
}

export interface ServiceItem {
  id: string;
  pageId: PageId;
  title: string;
  badge: string;
  icon: string;
  startingPrice: number;
  description: string;
  highlights: string[];
  deliverables: string[];
  processSteps: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryKey: 'ui-ux' | 'seo-ai' | 'ecommerce' | 'security';
  readTime: string;
  date: string;
  author: string;
  img: string;
  summary: string;
  featured?: boolean;
  views: number;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  bulletPoints?: string[];
}

export interface PricingCalculatorState {
  websiteType: 'template' | 'corporate' | 'ecommerce' | 'services' | 'portal';
  pageCount: number;
  hasEcommerce: boolean;
  hasMultilingual: boolean;
  languagesCount: number;
  hasTorobConnect: boolean;
  hasInstallment: boolean;
  hasSmsNotification: boolean;
  hasCustomApi: boolean;
  seoTier: 'basic' | 'pro' | 'enterprise';
  maintenanceSla: 'none' | 'gold6m' | 'vip12m';
}

export interface MarketContactConfig {
  countryCode: string;
  countryName: string;
  hotline: string;
  hotlineFormatted: string;
  hotlineNote: string;
  directPhone: string;
  whatsapp: string;
  telegram: string;
  officeAddress: string;
  workingHours: string;
  currencySymbol: string;
  currencyRateMultiplier: number;
}
