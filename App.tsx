/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, LocaleKey, ProjectItem } from './types';
import { I18N_DATA } from './data/i18n';
import { TopBar } from './components/layout/TopBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/views/HomeView';
import { ServicesView } from './components/views/ServicesView';
import { PortfolioView } from './components/views/PortfolioView';
import { TemplatesView } from './components/views/TemplatesView';
import { PricingCalculatorView } from './components/views/PricingCalculatorView';
import { BlogView } from './components/views/BlogView';
import { ContactView } from './components/views/ContactView';
import { CmsDesignSystemView } from './components/views/CmsDesignSystemView';
import { SpeedAuditView } from './components/views/SpeedAuditView';
import { CmsSimulatorView } from './components/views/CmsSimulatorView';
import { SlaGuaranteeView } from './components/views/SlaGuaranteeView';
import { PortfolioPreviewModal } from './components/modals/PortfolioPreviewModal';
import { QuickConsultModal } from './components/modals/QuickConsultModal';
import { ChatbotWidget } from './components/widgets/ChatbotWidget';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { MobileDrawer } from './components/layout/MobileDrawer';

export default function App() {
  // Locale State with URL ?lang= parsing and sync
  const [currentLocale, setCurrentLocale] = useState<LocaleKey>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang') as LocaleKey;
      if (langParam && I18N_DATA[langParam]) {
        return langParam;
      }
    } catch {
      // fallback
    }
    return 'fa';
  });

  // Current page routing state
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Light / Dark mode state
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('aladdin_theme') === 'light';
    } catch {
      return false;
    }
  });

  // Modals state
  const [selectedPreviewProject, setSelectedPreviewProject] = useState<ProjectItem | null>(null);
  const [targetProjectId, setTargetProjectId] = useState<string | null>(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Sync HTML attributes (dir, lang, theme class) when locale or theme changes
  useEffect(() => {
    const doc = document.documentElement;
    const isRtl = I18N_DATA[currentLocale].dir === 'rtl';
    doc.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    doc.setAttribute('lang', currentLocale);

    if (isLightMode) {
      doc.classList.remove('dark');
      doc.classList.add('light');
    } else {
      doc.classList.remove('light');
      doc.classList.add('dark');
    }
  }, [currentLocale, isLightMode]);

  const handleLocaleChange = (locale: LocaleKey) => {
    setCurrentLocale(locale);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', locale);
      window.history.pushState({}, '', url.toString());
    } catch {
      // ignore
    }
  };

  const handleThemeToggle = () => {
    setIsLightMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem('aladdin_theme', next ? 'light' : 'dark');
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isLightMode ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-[#0a1228] text-[#dbe1ff]'
    }`}>
      {/* 1. Top Informational Bar */}
      <TopBar
        currentLocale={currentLocale}
        onLocaleChange={handleLocaleChange}
        isLightMode={isLightMode}
        onThemeToggle={handleThemeToggle}
      />

      {/* 2. Main Sticky Header with Mega Menu */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentLocale={currentLocale}
        isLightMode={isLightMode}
        onOpenConsultModal={() => setIsConsultModalOpen(true)}
        onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
      />

      {/* 3. Main Views */}
      <main className="flex-1 w-full pb-24 xl:pb-0">
        {currentPage === 'home' && (
          <HomeView
            currentLocale={currentLocale}
            isLightMode={isLightMode}
            onNavigate={handleNavigate}
            onSelectProject={(proj) => setSelectedPreviewProject(proj)}
            onOpenConsultModal={() => setIsConsultModalOpen(true)}
          />
        )}

        {(currentPage === 'services' || currentPage.includes('-web-design')) && (
          <ServicesView
            pageId={currentPage}
            isLightMode={isLightMode}
            onOpenConsultModal={() => setIsConsultModalOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'portfolio' && (
          <PortfolioView
            isLightMode={isLightMode}
            onSelectProject={(proj) => setSelectedPreviewProject(proj)}
            onOpenConsultModal={() => setIsConsultModalOpen(true)}
            targetProjectId={targetProjectId}
          />
        )}

        {currentPage === 'templates' && (
          <TemplatesView
            isLightMode={isLightMode}
            onPreviewTemplate={(proj) => setSelectedPreviewProject(proj)}
            onOpenConsultModal={() => setIsConsultModalOpen(true)}
          />
        )}

        {currentPage === 'pricing-calculator' && (
          <PricingCalculatorView
            currentLocale={currentLocale}
            isLightMode={isLightMode}
            onOpenConsultModal={() => setIsConsultModalOpen(true)}
          />
        )}

        {currentPage === 'speed-audit' && (
          <SpeedAuditView
            currentLocale={currentLocale}
            onOpenConsult={() => setIsConsultModalOpen(true)}
            onSelectPage={handleNavigate}
          />
        )}

        {currentPage === 'cms-simulator' && (
          <CmsSimulatorView
            currentLocale={currentLocale}
            onOpenConsult={() => setIsConsultModalOpen(true)}
            onSelectPage={handleNavigate}
          />
        )}

        {currentPage === 'sla-guarantee' && (
          <SlaGuaranteeView
            currentLocale={currentLocale}
            onOpenConsult={() => setIsConsultModalOpen(true)}
            onSelectPage={handleNavigate}
          />
        )}

        {currentPage === 'knowledge-blog' && (
          <BlogView
            isLightMode={isLightMode}
            onOpenConsultModal={() => setIsConsultModalOpen(true)}
          />
        )}

        {currentPage === 'cms-design-system' && (
          <CmsDesignSystemView
            isLightMode={isLightMode}
            currentLocale={currentLocale}
          />
        )}

        {currentPage === 'about-contact' && (
          <ContactView
            isLightMode={isLightMode}
            currentLocale={currentLocale}
          />
        )}
      </main>

      {/* 4. Full Footer */}
      <Footer
        onNavigate={handleNavigate}
        currentLocale={currentLocale}
        isLightMode={isLightMode}
      />

      {/* 5. Live Responsive Preview Modal (Desktop / Tablet / Mobile) */}
      <PortfolioPreviewModal
        project={selectedPreviewProject}
        onClose={() => setSelectedPreviewProject(null)}
        onNavigate={handleNavigate}
        currentLocale={currentLocale}
        onGoToProjectPage={(projId) => {
          setSelectedPreviewProject(null);
          setTargetProjectId(projId);
          handleNavigate('portfolio');
        }}
      />

      {/* 6. Quick Consultation / Prototype Request Modal */}
      <QuickConsultModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        currentLocale={currentLocale}
      />

      {/* 7. Floating Intelligent Multilingual Chatbot */}
      <ChatbotWidget
        currentLocale={currentLocale}
        onNavigate={handleNavigate}
        onOpenConsultModal={() => setIsConsultModalOpen(true)}
      />

      {/* 8. Slide-out Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentLocale={currentLocale}
        onLocaleChange={handleLocaleChange}
        isLightMode={isLightMode}
        onThemeToggle={handleThemeToggle}
        onOpenConsultModal={() => setIsConsultModalOpen(true)}
      />

      {/* 9. Persistent Mobile Bottom Navigation Bar */}
      <MobileBottomBar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultModal={() => setIsConsultModalOpen(true)}
        isLightMode={isLightMode}
        currentLocale={currentLocale}
      />
    </div>
  );
}
