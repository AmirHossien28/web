import type { LocaleKey, PageId } from '../types';

/**
 * Information architecture
 * --------------------------------------------------------------------------
 * Seven primary destinations, one utility cluster. Every destination is a real
 * page (no dead anchors) and the order follows the buying decision:
 *   who we are → what we do → proof → how it works → price → expertise → talk
 */

export interface NavChild {
  id: PageId;
  key: string;
  /** shown as the second line of a mega-menu entry */
  hintKey?: string;
  badgeKey?: string;
}

export interface NavItem {
  id: PageId;
  key: string;
  children?: NavChild[];
  childrenTitleKey?: string;
}

export const PRIMARY_NAV: NavItem[] = [
  { id: 'services', key: 'services' },
  { id: 'portfolio', key: 'work' },
  { id: 'templates', key: 'templates' },
  { id: 'process', key: 'process' },
  { id: 'pricing-calculator', key: 'pricing' },
  { id: 'knowledge-blog', key: 'insights' },
  {
    id: 'about-contact',
    key: 'company',
    childrenTitleKey: 'toolsTitle',
    children: [
      { id: 'about-contact', key: 'about', hintKey: 'aboutHint' },
      { id: 'sla-guarantee', key: 'sla', hintKey: 'slaHint' },
      { id: 'speed-audit', key: 'speedAudit', hintKey: 'speedAuditHint', badgeKey: 'badgeFree' },
      { id: 'cms-simulator', key: 'cmsSim', hintKey: 'cmsSimHint' },
      { id: 'cms-design-system', key: 'designSystem', hintKey: 'designSystemHint' },
    ],
  },
];

/** Primary mobile/desktop action — one conversion goal across the product. */
export const PRIMARY_CTA: PageId = 'about-contact';

/** Service landing pages reachable from the services hub and the footer. */
export const SERVICE_PAGE_IDS: PageId[] = [
  'corporate-web-design',
  'ecommerce-web-design',
  'services-web-design',
  'custom-portal-development',
];

export const SERVICE_NAV_KEY: Record<string, string> = {
  'corporate-web-design': 'svcCorporate',
  'ecommerce-web-design': 'svcEcommerce',
  'services-web-design': 'svcServices',
  'custom-portal-development': 'svcPortal',
};

/** Footer sitemap — four columns, ordered by task not by hierarchy. */
export interface FooterColumn {
  titleKey: string;
  links: { id: PageId; key: string }[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    titleKey: 'colServices',
    links: [
      { id: 'corporate-web-design', key: 'svcCorporate' },
      { id: 'ecommerce-web-design', key: 'svcEcommerce' },
      { id: 'services-web-design', key: 'svcServices' },
      { id: 'custom-portal-development', key: 'svcPortal' },
    ],
  },
  {
    titleKey: 'colSolutions',
    links: [
      { id: 'templates', key: 'templates' },
      { id: 'speed-audit', key: 'speedAudit' },
      { id: 'cms-simulator', key: 'cmsSim' },
      { id: 'sla-guarantee', key: 'sla' },
    ],
  },
  {
    titleKey: 'colCompany',
    links: [
      { id: 'process', key: 'process' },
      { id: 'portfolio', key: 'work' },
      { id: 'knowledge-blog', key: 'insights' },
      { id: 'about-contact', key: 'about' },
    ],
  },
  {
    titleKey: 'colResources',
    links: [
      { id: 'cms-design-system', key: 'designSystem' },
      { id: 'pricing-calculator', key: 'pricing' },
      { id: 'services', key: 'services' },
      { id: 'about-contact', key: 'contact' },
    ],
  },
];

/** Canonical path per page — used for the address bar and share links. */
export const PAGE_SLUG: Record<PageId, string> = {
  home: '/',
  services: '/services',
  'corporate-web-design': '/services/corporate',
  'ecommerce-web-design': '/services/ecommerce',
  'services-web-design': '/services/professional',
  'custom-portal-development': '/services/portal',
  portfolio: '/work',
  templates: '/templates',
  'pricing-calculator': '/pricing',
  process: '/process',
  'speed-audit': '/tools/speed-audit',
  'cms-simulator': '/tools/cms-simulator',
  'sla-guarantee': '/sla',
  'knowledge-blog': '/insights',
  'about-contact': '/contact',
  'cms-design-system': '/design-system',
};

const SLUG_TO_PAGE: Record<string, PageId> = Object.entries(PAGE_SLUG).reduce(
  (acc, [page, slug]) => {
    acc[slug.replace(/^\//, '')] = page as PageId;
    return acc;
  },
  {} as Record<string, PageId>,
);

/** Resolves a page from `window.location.pathname` (production) or `?p=` (preview). */
export const pageFromLocation = (pathname: string, search: string): PageId => {
  try {
    const param = new URLSearchParams(search).get('p') as PageId | null;
    if (param && PAGE_SLUG[param]) return param;

    const clean = pathname.replace(/^\/+|\/+$/g, '');
    if (!clean) return 'home';
    return SLUG_TO_PAGE[clean] ?? 'home';
  } catch {
    return 'home';
  }
};

/** Breadcrumb trail rendered by every inner page header. */
export const breadcrumbFor = (page: PageId): PageId[] => {
  if (page === 'home') return [];
  if (SERVICE_PAGE_IDS.includes(page)) return ['home', 'services'];
  return ['home'];
};

/** Which primary nav item should be marked active for a given page. */
export const activeNavFor = (page: PageId): PageId => {
  if (page === 'home') return 'home';
  if (SERVICE_PAGE_IDS.includes(page)) return 'services';
  if (page === 'cms-design-system' || page === 'sla-guarantee' || page === 'speed-audit' || page === 'cms-simulator')
    return 'about-contact';
  return page;
};

export const localeLabel: Record<LocaleKey, string> = {
  fa: 'فارسی',
  en: 'English',
  ar: 'العربية',
  tr: 'Türkçe',
  de: 'Deutsch',
};
