import React, { useState } from 'react';
import { LocaleKey } from '../../types';
import { I18N_DATA } from '../../data/i18n';

interface CtaSectionProps {
  currentLocale: LocaleKey;
  isLightMode: boolean;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ currentLocale, isLightMode }) => {
  const content = I18N_DATA[currentLocale];
  const [quickPhone, setQuickPhone] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone.trim()) return;
    setCallbackSent(true);
  };

  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className={`rounded-3xl border p-5 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <span className="text-xs font-bold text-amber-400">
                مشاوره کاملاً رایگان بدون هیچ تعهدی برای خرید
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                هنوز مطمئن نیستید کدام ساختار سایت برای کسب‌وکار شما مناسب‌تر است؟
              </h2>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                تلفن را بردارید؛ مشاوران فنی علاءالدین با تحلیل رقبای صنف شما، بهترین و اقتصادی‌ترین مسیر پیاده‌سازی را به رایگان در اختیارتان می‌گذارند.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3 w-full sm:w-auto">
                <a
                  href={`tel:${content.marketContact.hotline}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                  <span className="font-mono" dir="ltr">{content.marketContact.hotlineFormatted}</span>
                  <span className="text-xs opacity-80">{content.marketContact.hotlineNote}</span>
                </a>

                <a
                  href={content.marketContact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 h-12 rounded-xl border text-sm font-semibold transition-colors active:scale-[0.98] ${
                    isLightMode
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                      : 'bg-[#171f35] hover:bg-[#222940] text-white border-white/15'
                  }`}
                >
                  <span className="material-symbols-outlined text-emerald-400 text-[20px]">chat</span>
                  <span>گفتگو و ارسال فایل در واتساپ</span>
                </a>
              </div>
            </div>

            {/* Quick Callback Card (4 cols) */}
            <div className={`lg:col-span-4 rounded-2xl border p-6 flex flex-col gap-3 shadow-lg ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#171f35] border-white/10'
            }`}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400 text-[22px]">support_agent</span>
                <span className="text-sm font-bold">تماس در کمتر از ۵ دقیقه</span>
              </div>

              <p className="text-xs text-slate-400">
                شماره خود را بگذارید تا همین الان کارشناس فنی با شما تماس بگیرد.
              </p>

              {callbackSent ? (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-bold">
                  درخواست شما ثبت شد. تا ۵ دقیقه دیگر تماس می‌گیریم.
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="flex flex-col gap-2.5">
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    placeholder="09..."
                    className={`w-full h-11 px-3 rounded-xl text-xs font-mono outline-none border transition-all ${
                      isLightMode
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                        : 'bg-[#060a14] border-white/15 text-white focus:border-sky-400'
                    }`}
                  />
                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-sky-400 hover:bg-sky-300 text-black font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    درخواست تماس فوری
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
