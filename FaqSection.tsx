import React, { useState } from 'react';
import { LocaleKey } from '../../types';
import { I18N_DATA } from '../../data/i18n';
import { SECTIONS_I18N } from '../../data/sectionsI18n';

interface FaqSectionProps {
  currentLocale: LocaleKey;
  isLightMode: boolean;
  onOpenConsultModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  currentLocale,
  isLightMode,
  onOpenConsultModal,
}) => {
  const content = I18N_DATA[currentLocale];
  const t = SECTIONS_I18N[currentLocale].faqSection;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section className={`w-full py-20 transition-colors duration-300 ${
      isLightMode ? 'bg-slate-50' : 'bg-[#050d23]'
    }`} id="faqAccordion">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-3 mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs backdrop-blur-md ${
            isLightMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-[#111c3d] border-white/10 text-slate-300'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sky-400 font-bold">{t.tag}</span>
            <span className="opacity-40">|</span>
            <span>{t.freeConsult}</span>
            <span className="font-mono text-sky-400 font-bold" dir="ltr">{content.marketContact.hotlineFormatted}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {t.title}
            <span className="block text-sky-400 mt-1">{t.titleHighlight}</span>
          </h2>

          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {t.items.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                  isLightMode
                    ? 'bg-white border-slate-200 hover:border-blue-400'
                    : 'bg-[#0b1329] border-white/10 hover:border-sky-400/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className={`w-full p-4 sm:p-5 lg:p-6 text-start flex items-start sm:items-center justify-between gap-4 transition-colors cursor-pointer ${
                    isLightMode ? 'hover:bg-slate-50' : 'hover:bg-[#111c3d]/60'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <span className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center shrink-0 border ${
                      isLightMode ? 'bg-slate-100 text-blue-600 border-slate-200' : 'bg-[#171f35] text-sky-400 border-white/10'
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className={`text-sm sm:text-base font-bold ${
                        isLightMode ? 'text-slate-900' : 'text-white'
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                    isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'
                  }`}>
                    <span className={`material-symbols-outlined text-sky-400 text-[20px] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}>
                      expand_more
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className={`p-4 sm:p-5 lg:p-6 pt-0 text-xs sm:text-sm leading-relaxed border-t animate-in fade-in duration-200 ${
                    isLightMode ? 'text-slate-600 border-slate-100 bg-slate-50/60' : 'text-slate-300 border-white/5 bg-black/10'
                  }`}>
                    <p className="mb-4">{faq.answer}</p>

                    {faq.bulletPoints && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {faq.bulletPoints.map((bp, bidx) => (
                          <div key={bidx} className={`flex items-center gap-2 p-2.5 rounded-xl text-xs ${
                            isLightMode ? 'bg-white border border-slate-200 text-slate-800 shadow-sm' : 'bg-white/5 text-white'
                          }`}>
                            <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                            <span>{bp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Banner */}
        <div className="mt-12 p-5 sm:p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl backdrop-blur-md"
          style={{
            background: 'linear-gradient(135deg, #0f1c3d 0%, #172554 100%)',
          }}
        >
          <div className="flex items-center gap-4 text-start w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sky-300 text-[26px]">contact_support</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-white">سؤالی دارید که اینجا پاسخ داده نشده؟</h4>
              <p className="text-xs text-slate-300">
                همین حالا با کارشناسان ارشد فنی علاءالدین بدون معطلی و رایگان مشورت کنید.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
            <a
              href={`tel:${content.marketContact.hotline}`}
              className="inline-flex items-center justify-center gap-2 px-4 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-sky-400 text-[18px]">call</span>
              <span className="font-mono" dir="ltr">{content.marketContact.hotlineFormatted}</span>
              <span className="text-[10px] opacity-75">{content.marketContact.hotlineNote}</span>
            </a>

            <button
              type="button"
              onClick={onOpenConsultModal}
              className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer w-full sm:w-auto active:scale-95"
            >
              <span>درخواست مشاوره فوری</span>
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
