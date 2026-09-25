import React from 'react';
import { PageId } from '../../types';
import { SERVICES_DATA } from '../../data/services';

interface ServicesViewProps {
  pageId: PageId;
  isLightMode: boolean;
  onOpenConsultModal: () => void;
  onNavigate: (page: PageId) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  pageId,
  isLightMode,
  onOpenConsultModal,
  onNavigate,
}) => {
  const currentService = SERVICES_DATA.find(s => s.pageId === pageId) || SERVICES_DATA[0];

  return (
    <div className="w-full py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <button type="button" onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer">
          صفحه اصلی
        </button>
        <span>/</span>
        <button type="button" onClick={() => onNavigate('services')} className="hover:text-white cursor-pointer">
          خدمات تخصصی
        </button>
        <span>/</span>
        <span className="text-sky-400 font-bold">{currentService.title}</span>
      </div>

      {/* Hero Header for Service */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-3.5 py-1 rounded-full border border-sky-400/20 w-fit">
            {currentService.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {currentService.title}
          </h1>
          <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
            {currentService.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {currentService.highlights.map((h, i) => (
              <div key={i} className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenConsultModal}
              className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>درخواست پیش‌نمایش و مشاوره فنی</span>
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('pricing-calculator')}
              className="inline-flex items-center gap-2 px-5 h-12 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-amber-400 text-[18px]">calculate</span>
              <span>محاسبه آنلاین هزینه</span>
            </button>
          </div>
        </div>

        {/* Pricing Card */}
        <div className={`lg:col-span-4 rounded-3xl border p-6 flex flex-col gap-4 shadow-xl ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/15'
        }`}>
          <span className="text-xs text-slate-400">سرمایه‌گذاری پایه این خدمت:</span>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-3xl font-extrabold text-sky-400">
              {currentService.startingPrice.toLocaleString('fa-IR')}
            </span>
            <span className="text-xs text-slate-400">تومان</span>
          </div>

          <div className="flex flex-col gap-2 pt-3 border-t border-white/5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-[16px]">verified</span>
              <span>شامل دامنه، هاست ابری و SSL رایگان ۱ سال</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-[16px]">verified</span>
              <span>گارانتی عملکرد و سرعت زیر ۱ ثانیه</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-[16px]">verified</span>
              <span>واگذاری ۱۰۰٪ مالکیت سورس کد به کارفرما</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deliverables & What is Included */}
      <div className="mb-16">
        <h3 className="text-xl font-bold mb-6">اقلام تحویلی و ویژگی‌های اختصاصی این پکیج</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentService.deliverables.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">done_all</span>
              </div>
              <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Process Steps */}
      <div className="mb-16">
        <h3 className="text-xl font-bold mb-6">مراحل اجرای پروژه تا رونمایی نهایی</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentService.processSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border flex flex-col justify-between ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
              }`}
            >
              <span className="w-8 h-8 rounded-xl bg-[#171f35] text-sky-400 font-mono font-bold text-xs flex items-center justify-center mb-3">
                0{idx + 1}
              </span>
              <h4 className="text-sm font-bold mb-2">{step.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Service FAQ */}
      <div>
        <h3 className="text-xl font-bold mb-6">پرسش‌های پرتکرار درباره {currentService.title}</h3>
        <div className="flex flex-col gap-3">
          {currentService.faq.map((faq, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border flex flex-col gap-2 ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
              }`}
            >
              <h5 className="text-sm font-bold text-sky-400">{faq.q}</h5>
              <p className="text-xs text-slate-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
