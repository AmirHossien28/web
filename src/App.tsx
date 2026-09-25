/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import type { LocaleKey, PageId, ProjectItem } from './types';
import { I18N_DATA } from './data/i18n';
import { PAGE_SLUG, pageFromLocation } from './app/navigation';
import { ui } from './app/i18n';
import { UtilityBar } from './components/chrome/UtilityBar';
import { SiteHeader } from './components/chrome/SiteHeader';
import { SiteFooter } from './components/chrome/SiteFooter';
import { MobileNav } from './components/chrome/MobileNav';
import { MobileActionBar } from './components/chrome/MobileActionBar';
import { HomeView } from './components/views/HomeView';
import { ServicesView } from './components/views/ServicesView';
import { PortfolioView } from './components/views/PortfolioView';
import { TemplatesView } from './components/views/TemplatesView';
import { PricingView } from './components/views/PricingView';
import { ProcessView } from './components/views/ProcessView';
import { BlogView } from './components/views/BlogView';
import { ContactView } from './components/views/ContactView';
import { CmsDesignSystemView } from './components/views/CmsDesignSystemView';
import { SpeedAuditView } from './components/views/SpeedAuditView';
import { CmsSimulatorView } from './components/views/CmsSimulatorView';
import { SlaGuaranteeView } from './components/views/SlaGuaranteeView';
import { PortfolioPreviewModal } from './components/modals/PortfolioPreviewModal';
import { QuickConsultModal } from './components/modals/QuickConsultModal';
import { ChatbotWidget } from './components/widgets/ChatbotWidget';

const THEME_KEY = 'aladdin.theme';
const LOCALE_KEY = 'aladdin.locale';

/**
 * Application shell
 * --------------------------------------------------------------------------
 * Owns exactly four pieces of state — page, locale, theme and the two overlays —
 * and delegates every visual decision to the design system. Navigation writes to
 * the address bar so any view can be shared or bookmarked.
 */
export default function App() {
  /* ------------------------------- locale ------------------------------- */
  const [locale, setLocale] = React.useState<LocaleKey>(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('lang') as LocaleKey | null;
      if (fromUrl && I18N_DATA[fromUrl]) return fromUrl;
      const stored = window.localStorage.getItem(LOCALE_KEY) as LocaleKey | null;
      if (stored && I18N_DATA[stored]) return stored;
    } catch {
      /* storage unavailable — fall through to the default locale */
    }
    return 'fa';
  });

  /* ------------------------------- routing ------------------------------ */
  const [page, setPage] = React.useState<PageId>(() =>
    pageFromLocation(window.location.pathname, window.location.search),
  );

  /* -------------------------------- theme ------------------------------- */
  const [isLight, setIsLight] = React.useState<boolean>(() => {
    try {
      const stored = window.localStorage.getItem(THEME_KEY);
      if (stored) return stored === 'light';
      return !window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return true;
    }
  });

  /* ------------------------------- overlays ----------------------------- */
  const [previewProject, setPreviewProject] = React.useState<ProjectItem | null>(null);
  const [consultOpen, setConsultOpen] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);

  const t = ui(locale);

  /* document-level side effects: direction, language, theme, title, history */
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('dir', t.dir);
    root.setAttribute('lang', locale);
    root.classList.toggle('dark', !isLight);
    root.classList.toggle('light', isLight);
  }, [locale, isLight, t.dir]);

  React.useEffect(() => {
    document.title = `${t.pages[page].title} — علاءالدین DXP`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', t.pages[page].description);
  }, [page, t]);

  /* browser back/forward keeps the shell in sync with the address bar */
  React.useEffect(() => {
    const onPopState = () => setPage(pageFromLocation(window.location.pathname, window.location.search));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = React.useCallback((next: PageId) => {
    setPage(current => {
      if (current === next) return current;
      try {
        const url = new URL(window.location.href);
        url.pathname = PAGE_SLUG[next];
        url.searchParams.delete('p');
        window.history.pushState({ page: next }, '', url.toString());
      } catch {
        /* history unavailable (sandboxed preview) — state change is enough */
      }
      return next;
    });
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const changeLocale = (next: LocaleKey) => {
    setLocale(next);
    try {
      window.localStorage.setItem(LOCALE_KEY, next);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      window.history.replaceState({}, '', url.toString());
    } catch {
      /* ignore */
    }
  };

  const toggleTheme = () => {
    setIsLight(current => {
      const next = !current;
      try {
        window.localStorage.setItem(THEME_KEY, next ? 'light' : 'dark');
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const hotline = I18N_DATA[locale].marketContact.hotlineFormatted.replace(/[\s‑-]/g, '');
  const whatsapp = I18N_DATA[locale].marketContact.whatsapp;

  const openPreview = (project: ProjectItem) => setPreviewProject(project);

  /* ------------------------------ rendering ----------------------------- */
  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <HomeView
            locale={locale}
            onNavigate={navigate}
            onOpenConsult={() => setConsultOpen(true)}
            onSelectProject={openPreview}
            hotline={hotline}
            whatsapp={whatsapp}
          />
        );

      case 'services':
      case 'corporate-web-design':
      case 'ecommerce-web-design':
      case 'services-web-design':
      case 'custom-portal-development':
        return (
          <ServicesView
            pageId={page}
            locale={locale}
            onNavigate={navigate}
            onOpenConsult={() => setConsultOpen(true)}
            hotline={hotline}
            whatsapp={whatsapp}
          />
        );

      case 'portfolio':
        return (
          <PortfolioView
            locale={locale}
            onNavigate={navigate}
            onOpenConsult={() => setConsultOpen(true)}
            onSelectProject={openPreview}
            hotline={hotline}
            whatsapp={whatsapp}
          />
        );

      case 'templates':
        return (
          <TemplatesView
            locale={locale}
            onNavigate={navigate}
            onOpenConsult={() => setConsultOpen(true)}
            hotline={hotline}
            whatsapp={whatsapp}
          />
        );

      case 'pricing-calculator':
        return (
          <PricingView
            locale={locale}
            onNavigate={navigate}
            onOpenConsult={() => setConsultOpen(true)}
            hotline={hotline}
            whatsapp={whatsapp}
          />
        );

      case 'process':
        return (
          <ProcessView
            locale={locale}
            onNavigate={navigate}
            onOpenConsult={() => setConsultOpen(true)}
            hotline={hotline}
            whatsapp={whatsapp}
          />
        );

      case 'knowledge-blog':
        return (
          <BlogView
            locale={locale}
            onNavigate={navigate}
            onOpenConsult={() => setConsultOpen(true)}
            hotline={hotline}
            whatsapp={whatsapp}
          />
        );

      case 'speed-audit':
        return (
          <SpeedAuditView
            locale={locale}
            onNavigate={navigate}
            onOpenConsult={() => setConsultOpen(true)}
            hotline={hotline}
            whatsapp={whatsapp}
          />
        );

      case 'cms-simulator':
        return (
          <CmsSimulatorView
            locale={locale}
            onNavigate={navigate}
            onOpenConsult={() => setConsultOpen(true)}
            hotline={hotline}
            whatsapp={whatsapp}
          />
        );

      case 'sla-guarantee':
        return (
          <SlaGuaranteeView
            locale={locale}
            onNavigate={navigate}
            onOpenConsult={() => setConsultOpen(true)}
            hotline={hotline}
            whatsapp={whatsapp}
          />
        );

      case 'cms-design-system':
        return <CmsDesignSystemView locale={locale} onNavigate={navigate} />;

      case 'about-contact':
      default:
        return (
          <ContactView
            locale={locale}
            onNavigate={navigate}
            hotline={hotline}
            whatsapp={whatsapp}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-toast focus:rounded-sm focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2 focus:text-body-sm focus:shadow-md"
      >
        {t.common.skipToContent}
      </a>

      <UtilityBar locale={locale} onLocaleChange={changeLocale} hotline={hotline} />

      <SiteHeader
        currentPage={page}
        locale={locale}
        isLight={isLight}
        onNavigate={navigate}
        onThemeToggle={toggleTheme}
        onOpenMobileNav={() => setNavOpen(true)}
        onOpenConsult={() => setConsultOpen(true)}
        hotline={hotline}
      />

      <main id="main" className="flex-1 pb-16 lg:pb-0">
        {renderPage()}
      </main>

      <SiteFooter
        locale={locale}
        currentPage={page}
        onNavigate={navigate}
        onOpenConsult={() => setConsultOpen(true)}
        hotline={hotline}
        whatsapp={whatsapp}
        year={String(new Date().getFullYear())}
      />

      <MobileActionBar
        currentPage={page}
        locale={locale}
        onNavigate={navigate}
        onOpenMenu={() => setNavOpen(true)}
        onOpenConsult={() => setConsultOpen(true)}
      />

      <MobileNav
        open={navOpen}
        onClose={() => setNavOpen(false)}
        currentPage={page}
        locale={locale}
        isLight={isLight}
        onNavigate={navigate}
        onLocaleChange={changeLocale}
        onThemeToggle={toggleTheme}
        onOpenConsult={() => setConsultOpen(true)}
        hotline={hotline}
      />

      <PortfolioPreviewModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
        onNavigate={navigate}
        currentLocale={locale}
      />

      <QuickConsultModal
        isOpen={consultOpen}
        onClose={() => setConsultOpen(false)}
        currentLocale={locale}
      />

      <ChatbotWidget
        currentLocale={locale}
        onNavigate={navigate}
        onOpenConsultModal={() => setConsultOpen(true)}
      />
    </div>
  );
}
