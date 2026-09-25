import React, { useState, useEffect } from 'react';
import { ProjectItem, PageId, LocaleKey } from '../../types';
import { SECTIONS_I18N } from '../../data/sectionsI18n';

interface PortfolioPreviewModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigate?: (page: PageId) => void;
  onGoToProjectPage?: (projectId: string) => void;
  currentLocale?: LocaleKey;
}

export const PortfolioPreviewModal: React.FC<PortfolioPreviewModalProps> = ({
  project,
  onClose,
  onNavigate,
  onGoToProjectPage,
  currentLocale = 'fa',
}) => {
  const t = SECTIONS_I18N[currentLocale].previewModal;
  const isRtl = currentLocale === 'fa' || currentLocale === 'ar';
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleGoToSitePortfolio = () => {
    onClose();
    if (onGoToProjectPage) {
      onGoToProjectPage(project.id);
    } else if (onNavigate) {
      onNavigate('portfolio');
    }
  };

  const viewportWidthClass = {
    desktop: 'w-full max-w-full',
    tablet: 'w-full max-w-[768px]',
    mobile: 'w-full max-w-[390px]',
  }[viewportMode];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#050d23]/85 backdrop-blur-md transition-opacity cursor-pointer"
      />

      {/* Modal Window Container */}
      <div className="relative w-full max-w-6xl h-[95vh] max-h-[940px] flex flex-col rounded-2xl sm:rounded-3xl bg-[#0b1329] border border-white/15 shadow-[0_24px_70px_-15px_rgba(0,18,48,0.95)] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Chrome Toolbar */}
        <div className="h-14 px-3 sm:px-4 bg-[#111c3d]/95 border-b border-white/10 flex items-center justify-between gap-2 shrink-0 backdrop-blur-md z-20">
          
          {/* Left: Window Controls, Title & Direct Button */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* macOS Style Window Controls */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onClose}
                title="بستن پنجره"
                className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors shadow-sm cursor-pointer"
              />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm" />
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm" />
            </div>

            {/* Project Title */}
            <div className="flex flex-col min-w-0">
              <h4 id="preview-title" className="text-xs sm:text-sm font-bold text-white truncate max-w-[160px] sm:max-w-[260px] md:max-w-none">
                {project.title}
              </h4>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 truncate">
                <span className="material-symbols-outlined text-[12px] text-emerald-400">lock</span>
                <span className="font-mono text-slate-300" dir="ltr">{project.domain}</span>
              </div>
            </div>
          </div>

          {/* Center: Device Viewport Switcher */}
          <div className="flex items-center bg-[#070d1e] rounded-xl p-0.5 border border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => setViewportMode('desktop')}
              title={t.desktop}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                viewportMode === 'desktop'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
              <span className="hidden md:inline text-[11px]">{t.desktop}</span>
            </button>

            <button
              type="button"
              onClick={() => setViewportMode('tablet')}
              title={t.tablet}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                viewportMode === 'tablet'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">tablet_mac</span>
              <span className="hidden md:inline text-[11px]">{t.tablet}</span>
            </button>

            <button
              type="button"
              onClick={() => setViewportMode('mobile')}
              title={t.mobile}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                viewportMode === 'mobile'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">smartphone</span>
              <span className="hidden md:inline text-[11px]">{t.mobile}</span>
            </button>
          </div>

          {/* Right: The Requested Button (Go to Sample Work Page in Site) & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* The primary button requested by user: Goes to sample work page in site */}
            <button
              type="button"
              onClick={handleGoToSitePortfolio}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 hover:shadow-blue-500/50 transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isRtl ? 'arrow_forward' : 'arrow_back'}
              </span>
              <span className="hidden xs:inline sm:inline">{t.goToWorkPage}</span>
              <span className="xs:hidden sm:hidden">{t.portfolioShort}</span>
            </button>

            {/* Direct External URL visit (optional secondary) */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              title={t.liveDomain}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 text-xs font-medium transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">open_in_new</span>
              <span>{t.liveDomain}</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              title={t.closeTooltip}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-rose-500 hover:text-white text-slate-300 flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Preview Area (No extra content or description - Pure full website scrollable page!) */}
        <div className="flex-1 bg-[#050914] overflow-y-auto p-2 sm:p-4 md:p-6 flex flex-col items-center justify-start custom-scrollbar">
          <div className={`${viewportWidthClass} transition-all duration-300 ease-out flex flex-col rounded-xl sm:rounded-2xl bg-[#0b1329] border border-white/15 shadow-[0_15px_50px_rgba(0,0,0,0.7)] overflow-hidden shrink-0`}>
            
            {/* Realistic Browser Address Bar */}
            <div className="h-9 px-3 bg-[#111933] border-b border-white/10 flex items-center justify-between gap-2 text-xs text-slate-400 select-none shrink-0" dir="ltr">
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                <span className="material-symbols-outlined text-[14px]">refresh</span>
              </div>
              
              <div className="flex-1 max-w-md mx-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg bg-[#070d1e] text-[11px] font-mono text-slate-300 border border-white/5 truncate">
                <span className="material-symbols-outlined text-[13px] text-emerald-400 shrink-0">lock</span>
                <span className="text-emerald-400">https://</span>
                <span className="text-white font-semibold truncate">{project.domain}</span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-bold shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>100% Responsive</span>
              </div>
            </div>

            {/* Scrollable Website Mockup Page */}
            <div className="w-full bg-[#030712] relative overflow-hidden flex flex-col">
              <img
                src={project.img}
                alt={`طراحی سایت ${project.title}`}
                loading="eager"
                className="w-full h-auto object-top block select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Floating Mobile Bottom Action for Ease of Access on Small Screens */}
        <div className="sm:hidden p-2.5 bg-[#0b1329]/95 border-t border-white/10 backdrop-blur-md flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-xs text-white font-bold truncate">{project.title}</span>
          </div>

          <button
            type="button"
            onClick={handleGoToSitePortfolio}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 text-white text-xs font-bold shrink-0 shadow-md cursor-pointer active:scale-95"
          >
            <span>مشاهده در سایت</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>

      </div>
    </div>
  );
};
