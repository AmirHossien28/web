import React from 'react';
import { PageId, LocaleKey } from '../../types';
import { I18N_DATA } from '../../data/i18n';
import { SECTIONS_I18N } from '../../data/sectionsI18n';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  currentLocale: LocaleKey;
  isLightMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  currentLocale,
  isLightMode,
}) => {
  const content = I18N_DATA[currentLocale];
  const t = SECTIONS_I18N[currentLocale].footer;

  return (
    <footer className={`w-full transition-colors duration-300 border-t ${
      isLightMode
        ? 'bg-slate-900 text-slate-300 border-slate-800'
        : 'bg-[#050d23] text-[#cbd5e1] border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-12 sm:pt-16 pb-28 xl:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Introduction (Span 2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 px-3 py-1.5 rounded-xl bg-[#0b1329] border border-white/15 flex items-center justify-center shadow-md">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdA7MvGOn7GU2A6AhphQTtkPVEIQitHSLeNLZ4vRrZWNAlkpOwYAsulIu8TJS1IfKQQGCC5cYlBXIhPC82V5l6rWysTliNF9ddqH-lMOJszZDcyKOzCdmmZjyOR8Zi5MqnKAXY2Ailzvf9w_4iI-GKN7CSE-7ujoCNnJTl4-AiGOwDaS-W_FRgF1in8_3006h2NDczPuJ2-pSBOnOR8CL3Bcu5NQ0hYjoa8OZxc7UBIa3oBGptMHd4DcgMPehONS1XFw"
                  alt="طراحی سایت علاءالدین"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight">طراحی سایت علاءالدین</span>
                <span className="text-[11px] text-sky-400 font-semibold">پلتفرم DXP و راهکارهای تحت وب سازمانی</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              {t.brandDesc}
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-2 pt-4 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400">{t.callNationwide}</span>
                <a href={`tel:${content.marketContact.hotline}`} className="font-mono text-xl text-sky-400 font-bold tracking-wider hover:underline" dir="ltr">
                  {content.marketContact.hotlineFormatted}
                </a>
              </div>
              <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400">{t.directLine}</span>
                <span className="font-mono text-sm text-white font-bold" dir="ltr">
                  {content.marketContact.directPhone}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Specialized Services */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-white mb-1">{t.specializedCol}</span>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => onNavigate('corporate-web-design')}
                className="hover:text-sky-400 transition-colors text-start cursor-pointer"
              >
                {t.corporateWeb}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('ecommerce-web-design')}
                className="hover:text-sky-400 transition-colors text-start cursor-pointer"
              >
                {t.ecommerceWeb}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('services-web-design')}
                className="hover:text-sky-400 transition-colors text-start cursor-pointer"
              >
                {t.medicalWeb}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('custom-portal-development')}
                className="hover:text-sky-400 transition-colors text-start cursor-pointer"
              >
                {t.portalWeb}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('templates')}
                className="hover:text-sky-400 transition-colors text-start cursor-pointer"
              >
                {content.nav.templates}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('pricing-calculator')}
                className="hover:text-sky-400 transition-colors text-start cursor-pointer"
              >
                {content.nav.pricing}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('speed-audit')}
                className="hover:text-amber-400 transition-colors text-start cursor-pointer flex items-center justify-between"
              >
                <span>{t.speedAudit}</span>
                <span className="text-[10px] text-amber-400 font-mono">Free</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('cms-simulator')}
                className="hover:text-emerald-400 transition-colors text-start cursor-pointer flex items-center justify-between"
              >
                <span>{t.cmsSim}</span>
                <span className="text-[10px] text-emerald-400 font-mono">Live</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('sla-guarantee')}
                className="hover:text-sky-400 transition-colors text-start cursor-pointer"
              >
                {t.slaGuarantee}
              </button>
            </div>
          </div>

          {/* Column 3: Fast Navigation */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-white mb-1">دسترسی سریع</span>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="hover:text-sky-400 transition-colors text-start cursor-pointer"
              >
                نمونه‌کارها و پروژه‌های شاخص
              </button>
              <button
                type="button"
                onClick={() => onNavigate('knowledge-blog')}
                className="hover:text-sky-400 transition-colors text-start cursor-pointer"
              >
                وبلاگ تخصصی و مقالات سئو
              </button>
              <button
                type="button"
                onClick={() => onNavigate('cms-design-system')}
                className="hover:text-sky-400 transition-colors text-start cursor-pointer"
              >
                استودیو دیزاین‌سیستم و CMS
              </button>
              <button
                type="button"
                onClick={() => onNavigate('about-contact')}
                className="hover:text-sky-400 transition-colors text-start cursor-pointer"
              >
                درباره مجموعه و چارت مهندسی
              </button>
              <a
                href={content.marketContact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors text-start"
              >
                پشتیبانی واتساپ و ارسال فایل
              </a>
            </div>
          </div>

          {/* Column 4: Trust & Certification */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-white mb-1">نمادهای اعتماد و صلاحیت</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              دارای تاییدیه شرکت‌های دانش‌بنیان، مجوز رسمی از سازمان نظام صنفی رایانه‌ای کشور و نماد اعتماد الکترونیکی دو ستاره.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="h-20 rounded-xl bg-[#171f35] border border-white/5 flex flex-col items-center justify-center p-2 text-center shadow-sm">
                <span className="material-symbols-outlined text-sky-400 text-[24px]">verified_user</span>
                <span className="text-[10px] text-slate-300 mt-1 font-semibold">اینماد ۲ ستاره</span>
              </div>
              <div className="h-20 rounded-xl bg-[#171f35] border border-white/5 flex flex-col items-center justify-center p-2 text-center shadow-sm">
                <span className="material-symbols-outlined text-amber-400 text-[24px]">workspace_premium</span>
                <span className="text-[10px] text-slate-300 mt-1 font-semibold">دانش‌بنیان</span>
              </div>
              <div className="h-20 rounded-xl bg-[#171f35] border border-white/5 flex flex-col items-center justify-center p-2 text-center shadow-sm">
                <span className="material-symbols-outlined text-emerald-400 text-[24px]">security</span>
                <span className="text-[10px] text-slate-300 mt-1 font-semibold">ساماندهی ملی</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Socials */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center md:text-start">
            © {t.rightsReserved}
          </div>
          <div className="flex items-center gap-5">
            <a href="https://t.me/aladdin_dxp" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[17px]">send</span>
              <span>تلگرام</span>
            </a>
            <a href={content.marketContact.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[17px]">chat</span>
              <span>واتساپ</span>
            </a>
            <a href="#" className="hover:text-rose-400 transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[17px]">photo_camera</span>
              <span>اینستاگرام</span>
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[17px]">share</span>
              <span>لینکدین</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
