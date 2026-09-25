import React, { useState, useRef, useEffect } from 'react';
import { LocaleKey } from '../../types';
import { I18N_DATA } from '../../data/i18n';

interface TopBarProps {
  currentLocale: LocaleKey;
  onLocaleChange: (locale: LocaleKey) => void;
  isLightMode: boolean;
  onThemeToggle: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentLocale,
  onLocaleChange,
  isLightMode,
  onThemeToggle,
}) => {
  const content = I18N_DATA[currentLocale];
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { key: LocaleKey; label: string; flagCode: string }[] = [
    { key: 'fa', label: 'فارسی', flagCode: 'FA' },
    { key: 'en', label: 'English', flagCode: 'EN' },
    { key: 'ar', label: 'العربية', flagCode: 'AR' },
    { key: 'tr', label: 'Türkçe', flagCode: 'TR' },
    { key: 'de', label: 'Deutsch', flagCode: 'DE' },
  ];

  return (
    <div className={`px-4 lg:px-8 border-b transition-colors duration-300 relative z-50 ${
      isLightMode 
        ? 'bg-slate-100/90 text-slate-700 border-slate-200' 
        : 'bg-[#050d23]/80 text-[#cbd5e1] border-white/5'
    } backdrop-blur-md text-xs`}>
      <div className="max-w-7xl mx-auto h-10 flex items-center justify-between gap-2">
        {/* Left / Start: Hotline & Live Monitoring */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <a
            href={`tel:${content.marketContact.hotline}`}
            className="flex items-center gap-1.5 hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 group"
            title="تماس فوری با کارشناسان علاءالدین"
          >
            <span className="material-symbols-outlined text-sky-400 text-[16px] group-hover:scale-110 transition-transform">call</span>
            <span className="opacity-80 hidden sm:inline">{content.topBar.hotlineLabel}</span>
            <span className="font-mono font-bold tracking-wider text-sky-400 text-xs" dir="ltr">
              {content.marketContact.hotlineFormatted}
            </span>
            <span className="opacity-60 text-[10px] hidden md:inline">
              {content.marketContact.hotlineNote}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-2 opacity-80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{content.topBar.monitoringActive}</span>
          </div>
        </div>

        {/* Right / End: Theme Switcher, Payment trust, Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Day / Night Theme Toggle */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] opacity-75 hidden sm:inline-block">
              {content.topBar.viewMode}
            </span>
            <button
              type="button"
              onClick={onThemeToggle}
              title={isLightMode ? 'تغییر به حالت شب (Dark)' : 'تغییر به حالت روز (Light)'}
              className={`relative flex items-center justify-between w-[62px] h-[30px] px-1 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 active:scale-[0.96] ${
                isLightMode 
                  ? 'bg-slate-200/90 border-white/60 shadow-[inset_2px_2px_4px_-1px_rgba(0,0,0,0.15),inset_-2px_-2px_4px_1px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.06)]' 
                  : 'bg-[#0b1638] border-sky-400/30 shadow-[inset_2px_2px_5px_-2px_rgba(255,255,255,0.35),inset_-2px_-2px_5px_2px_rgba(0,0,0,0.6),0_0_12px_rgba(37,99,235,0.25)]'
              }`}
            >
              <span
                className={`absolute top-0.5 w-[24px] h-[24px] rounded-full border shadow-md transition-transform duration-300 ease-out pointer-events-none ${
                  isLightMode
                    ? 'bg-gradient-to-tr from-amber-400 to-amber-200 border-amber-300 shadow-[0_2px_6px_rgba(245,158,11,0.5)] start-[33px]'
                    : 'bg-gradient-to-tr from-blue-700 to-sky-400 border-sky-300/40 shadow-[0_2px_8px_rgba(56,189,248,0.5)] start-1'
                }`}
              />
              <span className={`relative z-10 w-6 h-6 flex items-center justify-center transition-all ${
                !isLightMode ? 'text-white opacity-100' : 'text-slate-400 opacity-40'
              }`}>
                <span className="material-symbols-outlined text-[15px]">dark_mode</span>
              </span>
              <span className={`relative z-10 w-6 h-6 flex items-center justify-center transition-all ${
                isLightMode ? 'text-slate-900 opacity-100' : 'text-slate-400 opacity-40'
              }`}>
                <span className="material-symbols-outlined text-[15px]">light_mode</span>
              </span>
            </button>
          </div>

          {/* Secure Payment */}
          <div className="hidden lg:flex items-center gap-1.5 opacity-80 whitespace-nowrap">
            <span className="material-symbols-outlined text-amber-400 text-[16px]">verified</span>
            <span className="truncate">{content.topBar.securePayment}</span>
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-semibold transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-sky-400 active:scale-[0.96] ${
                isLightMode
                  ? 'bg-white/90 border-slate-200 hover:border-blue-400 text-slate-800 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.04)]'
                  : 'bg-[#111c3d]/90 border-white/20 hover:border-sky-400/60 text-[#dbe1ff] shadow-[inset_1px_1px_3px_rgba(255,255,255,0.2),0_2px_12px_rgba(0,0,0,0.35)]'
              }`}
              aria-haspopup="true"
              aria-expanded={langMenuOpen}
            >
              <span className="material-symbols-outlined text-sky-400 text-[15px]">language</span>
              <span>{content.langName}</span>
              <span className={`material-symbols-outlined text-[15px] opacity-70 transition-transform duration-200 ${
                langMenuOpen ? 'rotate-180' : ''
              }`}>
                expand_more
              </span>
            </button>

            {langMenuOpen && (
              <div className={`absolute top-full end-0 mt-1.5 w-44 rounded-2xl border p-1.5 flex flex-col gap-1 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                isLightMode 
                  ? 'bg-white/95 border-slate-200 text-slate-800' 
                  : 'bg-[#111c3d]/95 border-white/20 text-[#dbe1ff]'
              }`}>
                {languages.map((item) => {
                  const isSelected = item.key === currentLocale;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        onLocaleChange(item.key);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-medium transition-all text-start cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold shadow-sm'
                          : isLightMode
                            ? 'hover:bg-slate-100 text-slate-700'
                            : 'hover:bg-[#1e3266] text-[#cbd5e1]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]' : 'bg-transparent'
                        }`} />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase opacity-75">{item.flagCode}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
