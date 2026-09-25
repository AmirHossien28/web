import React, { useEffect } from 'react';
import { PageId, LocaleKey } from '../../types';
import { I18N_DATA } from '../../data/i18n';
import { SECTIONS_I18N } from '../../data/sectionsI18n';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  currentLocale: LocaleKey;
  onLocaleChange?: (locale: LocaleKey) => void;
  isLightMode: boolean;
  onThemeToggle?: () => void;
  onOpenConsultModal: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  currentLocale,
  onLocaleChange,
  isLightMode,
  onThemeToggle,
  onOpenConsultModal,
}) => {
  const content = I18N_DATA[currentLocale];

  const languages: { key: LocaleKey; label: string }[] = [
    { key: 'fa', label: 'فارسی' },
    { key: 'en', label: 'EN' },
    { key: 'ar', label: 'العربية' },
    { key: 'tr', label: 'TR' },
    { key: 'de', label: 'DE' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex xl:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className={`relative w-[86%] max-w-[340px] h-full flex flex-col justify-between overflow-y-auto z-10 transition-transform shadow-2xl pb-24 ${
        isLightMode
          ? 'bg-white text-slate-900 border-s border-slate-200'
          : 'bg-[#0a1228] text-white border-s border-white/10'
      }`}>
        <div className="flex flex-col gap-3 p-4 sm:p-5">
          {/* Top Brand & Close Bar */}
          <div className={`flex items-center justify-between pb-3 border-b ${
            isLightMode ? 'border-slate-200' : 'border-white/10'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`h-9 px-2 rounded-xl flex items-center justify-center border shadow-sm ${
                isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-[#171f35] border-white/10'
              }`}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXJpoLyiINVvZbI97-JJRX-UkexKP3UwfimN_c4IHv3gz2NozwS3GepL3B1x1C2031EVIMMVDKnT-koknYFpEn-sVhDjSNdL62aoXW3n6oSCrpnuYiWTxxjGz-FEvtVYn9BupdZfZ1KsBBrkFgtsGtfs5wybTi0ee0aDyRYyYPTRziAlsomt8fLo6Rg68TLPTLJKeF_ujEn4fisY55XvSBeWqTG-hq_iNxIt3HI8lt1uP2lLnHjO5NYIjkgYynB5RX9A"
                  alt="علاءالدین"
                  className="h-6 w-auto"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight">علاءالدین DXP</span>
                <span className={`text-[9px] ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  طراحی وب مهندسی‌شده
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                isLightMode
                  ? 'bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-600'
                  : 'bg-white/10 hover:bg-rose-500 hover:text-white text-slate-300'
              }`}
              aria-label="بستن منو"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Quick Settings Bar: Theme & Language Switcher */}
          <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs ${
            isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#111c3d]/60 border-white/10'
          }`}>
            {/* Theme Toggle */}
            {onThemeToggle && (
              <button
                type="button"
                onClick={onThemeToggle}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  isLightMode
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
                    : 'bg-[#171f35] border-white/10 text-slate-200 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-amber-400">
                  {isLightMode ? 'light_mode' : 'dark_mode'}
                </span>
                <span className="text-[11px]">{isLightMode ? 'روز' : 'شب'}</span>
              </button>
            )}

            {/* Language Chips */}
            {onLocaleChange && (
              <div className="flex items-center gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.key}
                    type="button"
                    onClick={() => onLocaleChange(lang.key)}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                      currentLocale === lang.key
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isLightMode
                          ? 'text-slate-600 hover:bg-slate-200'
                          : 'text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hotline Quick Call Box */}
          <a
            href={`tel:${content.marketContact.hotline}`}
            className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/25 flex items-center justify-between text-xs transition-colors hover:bg-blue-600/15"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-[18px]">call</span>
              <span className={isLightMode ? 'text-slate-700' : 'text-slate-200'}>مشاوره تلفنی رایگان:</span>
            </div>
            <span className="font-mono text-sky-400 font-bold" dir="ltr">
              {content.marketContact.hotlineFormatted}
            </span>
          </a>

          {/* Prominent Consult & Estimate CTA */}
          <button
            type="button"
            onClick={() => { onOpenConsultModal(); onClose(); }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,99,235,0.35)] transition-all cursor-pointer group active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[19px] group-hover:rotate-12 transition-transform">rocket_launch</span>
            <span>درخواست مشاوره و برآورد پروژه</span>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 text-xs sm:text-sm pt-1">
            <button
              type="button"
              onClick={() => { onNavigate('home'); onClose(); }}
              className={`px-3 py-2.5 rounded-xl text-start flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? isLightMode
                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-200'
                    : 'bg-blue-600/20 text-sky-400 font-bold border border-sky-400/20'
                  : isLightMode ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/5 text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-sky-400">home</span>
              <span>{content.nav.home}</span>
            </button>

            {/* Services Submenu */}
            <div className={`p-2.5 rounded-xl border flex flex-col gap-1 text-xs ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#111c3d]/50 border-white/5'
            }`}>
              <div className="px-2 py-1 font-bold text-sky-400 flex items-center justify-between">
                <span>{content.nav.services}</span>
                <span className={`text-[10px] ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {SECTIONS_I18N[currentLocale].navTools.specializedTitle}
                </span>
              </div>

              <button
                type="button"
                onClick={() => { onNavigate('corporate-web-design'); onClose(); }}
                className={`p-2 rounded-lg text-start flex items-center justify-between transition-colors cursor-pointer ${
                  currentPage === 'corporate-web-design'
                    ? 'bg-blue-600 text-white font-bold'
                    : isLightMode ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-200'
                }`}
              >
                <span>{content.nav.servicesDropdown.corporate}</span>
                <span className="text-sky-400 text-[10px]">i18n</span>
              </button>

              <button
                type="button"
                onClick={() => { onNavigate('ecommerce-web-design'); onClose(); }}
                className={`p-2 rounded-lg text-start flex items-center justify-between transition-colors cursor-pointer ${
                  currentPage === 'ecommerce-web-design'
                    ? 'bg-blue-600 text-white font-bold'
                    : isLightMode ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-200'
                }`}
              >
                <span>{content.nav.servicesDropdown.ecommerce}</span>
                <span className="text-amber-400 text-[10px]">B2B/B2C</span>
              </button>

              <button
                type="button"
                onClick={() => { onNavigate('services-web-design'); onClose(); }}
                className={`p-2 rounded-lg text-start flex items-center justify-between transition-colors cursor-pointer ${
                  currentPage === 'services-web-design'
                    ? 'bg-blue-600 text-white font-bold'
                    : isLightMode ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-200'
                }`}
              >
                <span>{content.nav.servicesDropdown.servicesMedical}</span>
                <span className="text-emerald-400 text-[10px]">VIP</span>
              </button>

              <button
                type="button"
                onClick={() => { onNavigate('custom-portal-development'); onClose(); }}
                className={`p-2 rounded-lg text-start flex items-center justify-between transition-colors cursor-pointer ${
                  currentPage === 'custom-portal-development'
                    ? 'bg-blue-600 text-white font-bold'
                    : isLightMode ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-200'
                }`}
              >
                <span>{content.nav.servicesDropdown.portal}</span>
                <span className="text-sky-400 text-[10px]">Next.js</span>
              </button>

              <button
                type="button"
                onClick={() => { onNavigate('speed-audit'); onClose(); }}
                className={`p-2 rounded-lg text-start flex items-center justify-between transition-colors cursor-pointer ${
                  currentPage === 'speed-audit'
                    ? 'bg-blue-600 text-white font-bold'
                    : isLightMode ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-200'
                }`}
              >
                <span className="text-amber-400 font-semibold">{SECTIONS_I18N[currentLocale].navTools.speedAudit}</span>
                <span className="text-amber-400 text-[10px] font-mono">Free</span>
              </button>

              <button
                type="button"
                onClick={() => { onNavigate('cms-simulator'); onClose(); }}
                className={`p-2 rounded-lg text-start flex items-center justify-between transition-colors cursor-pointer ${
                  currentPage === 'cms-simulator'
                    ? 'bg-blue-600 text-white font-bold'
                    : isLightMode ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-200'
                }`}
              >
                <span className="text-emerald-400 font-semibold">{SECTIONS_I18N[currentLocale].navTools.cmsSimulator}</span>
                <span className="text-emerald-400 text-[10px] font-mono">Live Demo</span>
              </button>

              <button
                type="button"
                onClick={() => { onNavigate('sla-guarantee'); onClose(); }}
                className={`p-2 rounded-lg text-start flex items-center justify-between transition-colors cursor-pointer ${
                  currentPage === 'sla-guarantee'
                    ? 'bg-blue-600 text-white font-bold'
                    : isLightMode ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-200'
                }`}
              >
                <span>{SECTIONS_I18N[currentLocale].navTools.slaGuarantee}</span>
                <span className="text-blue-400 text-[10px] font-mono">99.98%</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => { onNavigate('portfolio'); onClose(); }}
              className={`px-3 py-2.5 rounded-xl text-start flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                currentPage === 'portfolio'
                  ? isLightMode
                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-200'
                    : 'bg-blue-600/20 text-sky-400 font-bold border border-sky-400/20'
                  : isLightMode ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/5 text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-sky-400">visibility</span>
              <span>{content.nav.portfolio}</span>
            </button>

            <button
              type="button"
              onClick={() => { onNavigate('templates'); onClose(); }}
              className={`px-3 py-2.5 rounded-xl text-start flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                currentPage === 'templates'
                  ? isLightMode
                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-200'
                    : 'bg-blue-600/20 text-sky-400 font-bold border border-sky-400/20'
                  : isLightMode ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/5 text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-sky-400">web</span>
              <span>{content.nav.templates}</span>
            </button>

            <button
              type="button"
              onClick={() => { onNavigate('pricing-calculator'); onClose(); }}
              className={`px-3 py-2.5 rounded-xl text-start flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                currentPage === 'pricing-calculator'
                  ? isLightMode
                    ? 'bg-amber-50 text-amber-700 font-bold border border-amber-200'
                    : 'bg-amber-500/20 text-amber-400 font-bold border border-amber-400/20'
                  : isLightMode ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/5 text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-amber-400">calculate</span>
              <span>{content.nav.pricing}</span>
            </button>

            <button
              type="button"
              onClick={() => { onNavigate('knowledge-blog'); onClose(); }}
              className={`px-3 py-2.5 rounded-xl text-start flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                currentPage === 'knowledge-blog'
                  ? isLightMode
                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-200'
                    : 'bg-blue-600/20 text-sky-400 font-bold border border-sky-400/20'
                  : isLightMode ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/5 text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-sky-400">menu_book</span>
              <span>مجله تخصصی و مقالات</span>
            </button>

            <button
              type="button"
              onClick={() => { onNavigate('about-contact'); onClose(); }}
              className={`px-3 py-2.5 rounded-xl text-start flex items-center gap-2.5 font-medium transition-colors cursor-pointer ${
                currentPage === 'about-contact'
                  ? isLightMode
                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-200'
                    : 'bg-blue-600/20 text-sky-400 font-bold border border-sky-400/20'
                  : isLightMode ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/5 text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-sky-400">call</span>
              <span>{content.nav.contact}</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
