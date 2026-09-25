import React, { useState, useRef, useEffect } from 'react';
import { PageId, LocaleKey } from '../../types';
import { I18N_DATA } from '../../data/i18n';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { SERVICES_DATA } from '../../data/services';
import { PROJECTS_DATA } from '../../data/projects';
import { ARTICLES_DATA } from '../../data/articles';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  currentLocale: LocaleKey;
  isLightMode: boolean;
  onOpenConsultModal?: () => void;
  onOpenMobileDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  currentLocale,
  isLightMode,
  onOpenConsultModal,
  onOpenMobileDrawer,
}) => {
  const content = I18N_DATA[currentLocale];
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Close mega menu on click outside or Escape
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node)) {
        // keep open only if user is actively searching
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setSearchFocused(false);
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Filtered search results
  const searchResults = searchQuery.trim().length > 1 ? [
    ...SERVICES_DATA.filter(s => s.title.includes(searchQuery) || s.description.includes(searchQuery)).map(s => ({
      type: 'سرویس',
      title: s.title,
      action: () => { onNavigate(s.pageId); setSearchQuery(''); setSearchFocused(false); }
    })),
    ...PROJECTS_DATA.filter(p => p.title.includes(searchQuery) || p.industry.includes(searchQuery)).map(p => ({
      type: 'پروژه',
      title: p.title,
      action: () => { onNavigate('portfolio'); setSearchQuery(''); setSearchFocused(false); }
    })),
    ...ARTICLES_DATA.filter(a => a.title.includes(searchQuery) || a.summary.includes(searchQuery)).map(a => ({
      type: 'مقاله',
      title: a.title,
      action: () => { onNavigate('knowledge-blog'); setSearchQuery(''); setSearchFocused(false); }
    })),
  ].slice(0, 6) : [];

  return (
    <header className={`sticky top-0 inset-x-0 z-40 transition-all duration-300 border-b ${
      isLightMode
        ? 'bg-white/90 border-slate-200 shadow-sm'
        : 'bg-[#0a1228]/90 border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
    } backdrop-blur-xl`}>
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group text-start cursor-pointer focus:outline-none"
          >
            <div className={`h-10 sm:h-11 px-2 sm:px-2.5 py-1 rounded-xl flex items-center justify-center border transition-all ${
              isLightMode
                ? 'bg-slate-100 border-slate-200 group-hover:border-blue-500'
                : 'bg-[#0b1329] border-white/10 group-hover:border-sky-400/50 shadow-sm'
            }`}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXJpoLyiINVvZbI97-JJRX-UkexKP3UwfimN_c4IHv3gz2NozwS3GepL3B1x1C2031EVIMMVDKnT-koknYFpEn-sVhDjSNdL62aoXW3n6oSCrpnuYiWTxxjGz-FEvtVYn9BupdZfZ1KsBBrkFgtsGtfs5wybTi0ee0aDyRYyYPTRziAlsomt8fLo6Rg68TLPTLJKeF_ujEn4fisY55XvSBeWqTG-hq_iNxIt3HI8lt1uP2lLnHjO5NYIjkgYynB5RX9A"
                alt="طراحی سایت علاءالدین"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className={`text-[14px] sm:text-[15px] font-bold tracking-tight transition-colors ${
                  isLightMode ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-sky-400'
                }`}>
                  علاءالدین
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-sky-400 tracking-wider">
                  DXP
                </span>
              </div>
              <span className={`text-[9px] sm:text-[10px] mt-0.5 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                طراحی سایت مهندسی‌شده
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-[13px] font-medium shrink-0 whitespace-nowrap">
          {/* Home */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              currentPage === 'home'
                ? isLightMode
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'bg-[#171f35] text-sky-400 font-bold border border-sky-400/20'
                : isLightMode
                  ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  : 'text-[#cbd5e1] hover:text-white hover:bg-white/5'
            }`}
          >
            {content.nav.home}
          </button>

          {/* Services with Mega Menu */}
          <div className="relative" ref={megaMenuRef}>
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              onMouseEnter={() => setServicesOpen(true)}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                currentPage === 'services' || currentPage.includes('-web-design')
                  ? isLightMode
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'bg-[#171f35] text-sky-400 font-bold'
                  : isLightMode
                    ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                    : 'text-[#cbd5e1] hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{content.nav.services}</span>
              <span className={`material-symbols-outlined text-[17px] transition-transform duration-200 ${
                servicesOpen ? 'rotate-180 text-sky-400' : 'opacity-70'
              }`}>
                expand_more
              </span>
            </button>

            {/* Mega Menu Dropdown */}
            {servicesOpen && (
              <div 
                onMouseLeave={() => setServicesOpen(false)}
                className={`absolute top-full start-0 mt-2 w-80 rounded-2xl border p-2 flex flex-col gap-1 shadow-[0_24px_50px_-10px_rgba(0,18,48,0.95)] backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                  isLightMode
                    ? 'bg-white/95 border-slate-200 text-slate-800'
                    : 'bg-[#111c3d]/95 border-white/20 text-[#dbe1ff]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => { onNavigate('corporate-web-design'); setServicesOpen(false); }}
                  className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between text-start cursor-pointer ${
                    isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#1e3266]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-sky-400 text-[20px]">business</span>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold">{content.nav.servicesDropdown.corporate}</span>
                      <span className="text-[11px] opacity-70">{content.nav.servicesDropdown.corporateDesc}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[14px] opacity-50">arrow_back</span>
                </button>

                <button
                  type="button"
                  onClick={() => { onNavigate('ecommerce-web-design'); setServicesOpen(false); }}
                  className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between text-start cursor-pointer ${
                    isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#1e3266]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-400 text-[20px]">shopping_bag</span>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold">{content.nav.servicesDropdown.ecommerce}</span>
                      <span className="text-[11px] opacity-70">{content.nav.servicesDropdown.ecommerceDesc}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[14px] opacity-50">arrow_back</span>
                </button>

                <button
                  type="button"
                  onClick={() => { onNavigate('services-web-design'); setServicesOpen(false); }}
                  className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between text-start cursor-pointer ${
                    isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#1e3266]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-400 text-[20px]">medical_services</span>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold">{content.nav.servicesDropdown.servicesMedical}</span>
                      <span className="text-[11px] opacity-70">{content.nav.servicesDropdown.servicesMedicalDesc}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[14px] opacity-50">arrow_back</span>
                </button>

                <button
                  type="button"
                  onClick={() => { onNavigate('custom-portal-development'); setServicesOpen(false); }}
                  className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between text-start cursor-pointer ${
                    isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#1e3266]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-sky-400 text-[20px]">hub</span>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold">{content.nav.servicesDropdown.portal}</span>
                      <span className="text-[11px] opacity-70">{content.nav.servicesDropdown.portalDesc}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[14px] opacity-50">arrow_back</span>
                </button>

                <div className="h-px bg-white/10 my-1"></div>

                {/* Interactive Tools & SLA */}
                <button
                  type="button"
                  onClick={() => { onNavigate('speed-audit'); setServicesOpen(false); }}
                  className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between text-start cursor-pointer ${
                    isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#1e3266]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-400 text-[20px]">bolt</span>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold">{SECTIONS_I18N[currentLocale].navTools.speedAudit}</span>
                      <span className="text-[11px] opacity-70">{SECTIONS_I18N[currentLocale].navTools.speedAuditDesc}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">Free</span>
                </button>

                <button
                  type="button"
                  onClick={() => { onNavigate('cms-simulator'); setServicesOpen(false); }}
                  className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between text-start cursor-pointer ${
                    isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#1e3266]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-400 text-[20px]">tune</span>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold">{SECTIONS_I18N[currentLocale].navTools.cmsSimulator}</span>
                      <span className="text-[11px] opacity-70">{SECTIONS_I18N[currentLocale].navTools.cmsSimulatorDesc}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Live</span>
                </button>

                <button
                  type="button"
                  onClick={() => { onNavigate('sla-guarantee'); setServicesOpen(false); }}
                  className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between text-start cursor-pointer ${
                    isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#1e3266]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-400 text-[20px]">verified</span>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold">{SECTIONS_I18N[currentLocale].navTools.slaGuarantee}</span>
                      <span className="text-[11px] opacity-70">{SECTIONS_I18N[currentLocale].navTools.slaGuaranteeDesc}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[14px] opacity-50">arrow_back</span>
                </button>

                <div className="h-px bg-white/10 my-1"></div>

                <button
                  type="button"
                  onClick={() => { onNavigate('knowledge-blog'); setServicesOpen(false); }}
                  className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between text-start cursor-pointer ${
                    isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#1e3266]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-400 text-[20px]">menu_book</span>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold">{content.nav.servicesDropdown.blog}</span>
                      <span className="text-[11px] opacity-70">{content.nav.servicesDropdown.blogDesc}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[14px] opacity-50">arrow_back</span>
                </button>
              </div>
            )}
          </div>

          {/* Portfolio */}
          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              currentPage === 'portfolio'
                ? isLightMode
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'bg-[#171f35] text-sky-400 font-bold border border-sky-400/20'
                : isLightMode
                  ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  : 'text-[#cbd5e1] hover:text-white hover:bg-white/5'
            }`}
          >
            {content.nav.portfolio}
          </button>

          {/* Ready Templates */}
          <button
            type="button"
            onClick={() => onNavigate('templates')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              currentPage === 'templates'
                ? isLightMode
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'bg-[#171f35] text-sky-400 font-bold border border-sky-400/20'
                : isLightMode
                  ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  : 'text-[#cbd5e1] hover:text-white hover:bg-white/5'
            }`}
          >
            {content.nav.templates}
          </button>

          {/* Pricing & Calculator */}
          <button
            type="button"
            onClick={() => onNavigate('pricing-calculator')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              currentPage === 'pricing-calculator'
                ? isLightMode
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'bg-[#171f35] text-sky-400 font-bold border border-sky-400/20'
                : isLightMode
                  ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  : 'text-[#cbd5e1] hover:text-white hover:bg-white/5'
            }`}
          >
            {content.nav.pricing}
          </button>

          {/* Contact */}
          <button
            type="button"
            onClick={() => onNavigate('about-contact')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              currentPage === 'about-contact'
                ? isLightMode
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'bg-[#171f35] text-sky-400 font-bold border border-sky-400/20'
                : isLightMode
                  ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  : 'text-[#cbd5e1] hover:text-white hover:bg-white/5'
            }`}
          >
            {content.nav.contact}
          </button>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Working Search Box */}
          <div className="relative hidden md:block w-40 lg:w-56" ref={searchContainerRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setSearchFocused(true); }}
              onFocus={() => setSearchFocused(true)}
              placeholder={content.nav.searchPlaceholder}
              className={`w-full h-10 ps-9 pe-3 rounded-xl text-xs outline-none border transition-all ${
                isLightMode
                  ? 'bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500'
                  : 'bg-[#050d23] border-white/10 text-white placeholder:text-slate-500 focus:bg-[#131b31] focus:border-sky-400/50'
              }`}
            />
            <span className="material-symbols-outlined text-slate-400 text-[18px] absolute inset-y-0 start-2.5 my-auto h-fit pointer-events-none">
              search
            </span>

            {/* Instant Search Results Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div className={`absolute top-full inset-x-0 mt-1.5 rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl z-50 flex flex-col gap-1 max-h-72 overflow-y-auto ${
                isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#111c3d] border-white/20 text-[#dbe1ff]'
              }`}>
                {searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={item.action}
                    className={`p-2 rounded-xl flex items-center justify-between text-start text-xs transition-colors cursor-pointer ${
                      isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#1e3266]'
                    }`}
                  >
                    <span className="truncate">{item.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600/20 text-sky-400 font-bold shrink-0">
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className={`md:hidden flex items-center justify-center w-10 h-10 rounded-xl border transition-all cursor-pointer ${
              mobileSearchOpen
                ? 'bg-blue-600 border-blue-500 text-white'
                : isLightMode
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  : 'bg-[#111c3d] border-white/10 text-slate-300 hover:bg-[#1b2b54]'
            }`}
            aria-label="جستجو"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileSearchOpen ? 'close' : 'search'}
            </span>
          </button>

          {/* Instant Estimate CTA (Desktop / Tablet) */}
          <button
            type="button"
            onClick={() => onNavigate('pricing-calculator')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-[0_0_16px_rgba(37,99,235,0.35)] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">calculate</span>
            <span>{content.nav.instantEstimate}</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={onOpenMobileDrawer}
            className={`xl:hidden flex items-center justify-center w-10 h-10 rounded-xl border transition-all cursor-pointer active:scale-95 ${
              isLightMode
                ? 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                : 'bg-[#111c3d] border-white/10 text-white hover:bg-[#1b2b54]'
            }`}
            aria-label="باز کردن منو"
          >
            <span className="material-symbols-outlined text-[24px] text-sky-400">menu</span>
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Dropdown Bar */}
      {mobileSearchOpen && (
        <div
          ref={mobileSearchRef}
          className={`md:hidden px-4 py-3 border-t backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200 ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-[#091126] border-white/10'
          }`}
        >
          <div className="relative">
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={content.nav.searchPlaceholder}
              className={`w-full h-11 ps-10 pe-9 rounded-xl text-xs outline-none border transition-all ${
                isLightMode
                  ? 'bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500'
                  : 'bg-[#050d23] border-white/10 text-white placeholder:text-slate-500 focus:bg-[#131b31] focus:border-sky-400/50'
              }`}
            />
            <span className="material-symbols-outlined text-slate-400 text-[18px] absolute inset-y-0 start-3 my-auto h-fit pointer-events-none">
              search
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 end-2.5 my-auto w-6 h-6 flex items-center justify-center rounded-full text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Results List on Mobile */}
          {searchResults.length > 0 && (
            <div className={`mt-2 rounded-xl border p-1.5 flex flex-col gap-1 max-h-60 overflow-y-auto ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#111c3d] border-white/10'
            }`}>
              {searchResults.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    item.action();
                    setMobileSearchOpen(false);
                  }}
                  className={`p-2.5 rounded-lg flex items-center justify-between text-start text-xs transition-colors cursor-pointer ${
                    isLightMode ? 'hover:bg-white text-slate-800' : 'hover:bg-[#1e3266] text-white'
                  }`}
                >
                  <span className="truncate">{item.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600/20 text-sky-400 font-bold shrink-0">
                    {item.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
};
