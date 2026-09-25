import React, { useState } from 'react';
import { LocaleKey, PageId } from '../../types';
import { I18N_DATA } from '../../data/i18n';

interface HeroSectionProps {
  currentLocale: LocaleKey;
  isLightMode: boolean;
  onNavigate: (page: PageId) => void;
  onOpenConsultModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLocale,
  isLightMode,
  onNavigate,
  onOpenConsultModal,
}) => {
  const content = I18N_DATA[currentLocale];
  const [businessName, setBusinessName] = useState('');
  const [websiteType, setWebsiteType] = useState('corporate');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const websiteTypeOptions = [
    { id: 'template', label: 'سایت آماده پرسرعت و اقتصادی (تحویل ۳ روزه)' },
    { id: 'corporate', label: 'طراحی سایت شرکتی و چندزبانه بین‌المللی' },
    { id: 'ecommerce', label: 'فروشگاه اینترنتی پیشرفته و متصل به ترب' },
    { id: 'services', label: 'سایت خدماتی، پزشکی و رزرواسیون آنلاین' },
    { id: 'portal', label: 'پورتال اختصاصی سازمانی / وب‌اپلیکیشن Next.js' },
  ];

  const selectedTypeObj = websiteTypeOptions.find(o => o.id === websiteType) || websiteTypeOptions[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 8) {
      setPhoneError('لطفاً یک شماره تماس معتبر (حداقل ۸ رقم) وارد کنید');
      return;
    }
    setPhoneError('');
    setSubmitted(true);
  };

  return (
    <section className="relative w-full overflow-hidden pt-6 sm:pt-12 pb-14 sm:pb-20">
      {/* Ambient Luminous Glow Orbs */}
      <div className="absolute -top-36 end-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -start-24 w-80 h-80 bg-sky-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Top Editorial Kicker */}
        <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sky-400 font-bold tracking-wide">{content.hero.dxpTag}</span>
          <span className="opacity-30">·</span>
          <span className={isLightMode ? 'text-slate-600' : 'text-slate-300'}>{content.hero.dxpSubtitle}</span>
        </div>

        {/* Hero 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Main Value Proposition (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.25] text-balance">
              {content.hero.titlePart1}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-sky-400 via-blue-400 to-sky-300 drop-shadow-[0_0_18px_rgba(56,189,248,0.4)]">
                {content.hero.highlightVisitors}
              </span>
              {content.hero.titlePart2}
              <span className="text-amber-400 underline decoration-amber-400/40 decoration-wavy decoration-2">
                {content.hero.highlightCustomers}
              </span>
              {content.hero.titlePart3}
            </h1>

            <p className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl ${
              isLightMode ? 'text-slate-600' : 'text-slate-300'
            }`}>
              {content.hero.description}
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenConsultModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>{content.hero.ctaPrimary}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 h-12 rounded-xl border text-sm font-semibold transition-all cursor-pointer active:scale-[0.98] ${
                  isLightMode
                    ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                    : 'bg-[#111c3d] border-white/15 text-slate-200 hover:bg-[#182852] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-sky-400 text-[20px]">visibility</span>
                <span>{content.hero.ctaSecondary}</span>
              </button>
            </div>

            {/* 4 Trust Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2 sm:pt-4">
              <div className={`p-2.5 sm:p-3 rounded-xl border ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
              } flex items-center gap-2.5 shadow-sm min-w-0`}>
                <span className="material-symbols-outlined text-emerald-400 text-[22px] sm:text-[24px] shrink-0">bolt</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold truncate">{content.hero.pillarSpeed}</span>
                  <span className="text-[10px] text-slate-400 truncate">{content.hero.pillarSpeedDesc}</span>
                </div>
              </div>

              <div className={`p-2.5 sm:p-3 rounded-xl border ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
              } flex items-center gap-2.5 shadow-sm min-w-0`}>
                <span className="material-symbols-outlined text-sky-400 text-[22px] sm:text-[24px] shrink-0">verified</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold truncate">{content.hero.pillarCustom}</span>
                  <span className="text-[10px] text-slate-400 truncate">{content.hero.pillarCustomDesc}</span>
                </div>
              </div>

              <div className={`p-2.5 sm:p-3 rounded-xl border ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
              } flex items-center gap-2.5 shadow-sm min-w-0`}>
                <span className="material-symbols-outlined text-amber-400 text-[22px] sm:text-[24px] shrink-0">support_agent</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold truncate">{content.hero.pillarSupport}</span>
                  <span className="text-[10px] text-slate-400 truncate">{content.hero.pillarSupportDesc}</span>
                </div>
              </div>

              <div className={`p-2.5 sm:p-3 rounded-xl border ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
              } flex items-center gap-2.5 shadow-sm min-w-0`}>
                <span className="material-symbols-outlined text-indigo-400 text-[22px] sm:text-[24px] shrink-0">search_insights</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold truncate">{content.hero.pillarAi}</span>
                  <span className="text-[10px] text-slate-400 truncate">{content.hero.pillarAiDesc}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Request & Consultation Form (5 cols) */}
          <div className="lg:col-span-5" id="quick-consult">
            <div className={`relative rounded-3xl border p-6 lg:p-7 shadow-2xl backdrop-blur-xl ${
              isLightMode
                ? 'bg-white/95 border-slate-200 shadow-slate-200/50'
                : 'bg-[#0b1329]/95 border-white/15 shadow-[0_24px_60px_-15px_rgba(0,18,48,0.95)]'
            }`}>
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-400 text-[22px]">tune</span>
                  <span className="text-sm font-bold">{content.hero.formTitle}</span>
                </div>
                <span className="text-[11px] text-amber-400 font-semibold tracking-wide">
                  {content.hero.formFreeTag}
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                {content.hero.formSubtitle}
              </p>

              {submitted ? (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-2 text-center animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-1">
                    <span className="material-symbols-outlined text-[28px]">task_alt</span>
                  </div>
                  <h4 className="text-sm font-bold text-emerald-400">{content.hero.formSuccessTitle}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{content.hero.formSuccessDesc}</p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setBusinessName(''); setPhone(''); }}
                    className="mt-3 text-xs text-sky-400 underline font-semibold"
                  >
                    ثبت درخواست جدید
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold opacity-90">{content.hero.formBusinessLabel}</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute inset-y-0 start-3 my-auto h-fit text-slate-400 text-[18px]">domain</span>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder={content.hero.formBusinessPlaceholder}
                        className={`w-full h-11 ps-10 pe-3 rounded-xl text-xs outline-none border transition-all ${
                          isLightMode
                            ? 'bg-slate-100 border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500'
                            : 'bg-[#060a14] border-white/10 text-white focus:border-sky-400/60'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold opacity-90">{content.hero.formTypeLabel}</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                        className={`w-full h-11 ps-10 pe-9 rounded-xl text-xs outline-none border transition-all text-start flex items-center justify-between cursor-pointer ${
                          isLightMode
                            ? 'bg-slate-100 border-slate-200 text-slate-900'
                            : 'bg-[#060a14] border-white/10 text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined absolute inset-y-0 start-3 my-auto h-fit text-sky-400 text-[18px]">language</span>
                        <span className="truncate">{selectedTypeObj.label}</span>
                        <span className="material-symbols-outlined text-[18px] opacity-60">expand_more</span>
                      </button>

                      {typeDropdownOpen && (
                        <div className={`absolute top-full inset-x-0 mt-1 rounded-2xl border p-1.5 shadow-2xl z-50 flex flex-col gap-1 ${
                          isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#111c3d] border-white/20 text-[#dbe1ff]'
                        }`}>
                          {websiteTypeOptions.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => { setWebsiteType(opt.id); setTypeDropdownOpen(false); }}
                              className={`p-2.5 rounded-xl text-xs text-start transition-colors cursor-pointer ${
                                opt.id === websiteType 
                                  ? 'bg-blue-600 text-white font-bold' 
                                  : isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#1e3266]'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold opacity-90">{content.hero.formPhoneLabel}</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute inset-y-0 start-3 my-auto h-fit text-slate-400 text-[18px]">smartphone</span>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (phoneError) setPhoneError('');
                        }}
                        placeholder={content.hero.formPhonePlaceholder}
                        className={`w-full h-11 ps-10 pe-3 rounded-xl text-xs outline-none border transition-all text-start font-mono ${
                          phoneError
                            ? 'border-rose-500 focus:border-rose-500'
                            : isLightMode
                              ? 'bg-slate-100 border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500'
                              : 'bg-[#060a14] border-white/10 text-white focus:border-sky-400/60'
                        }`}
                      />
                    </div>
                    {phoneError && (
                      <span className="text-[11px] text-rose-400 font-medium">{phoneError}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                    <span>{content.hero.formSubmit}</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-emerald-400 text-[14px]">lock</span>
                      {content.hero.formPrivacy}
                    </span>
                    <span className="text-sky-400 font-medium">{content.hero.formResponseTime}</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
