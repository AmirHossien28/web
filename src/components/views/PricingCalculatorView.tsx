import React, { useState, useMemo } from 'react';
import { PricingCalculatorState, LocaleKey } from '../../types';
import { I18N_DATA } from '../../data/i18n';

interface PricingCalculatorViewProps {
  currentLocale: LocaleKey;
  isLightMode: boolean;
  onOpenConsultModal: () => void;
}

export const PricingCalculatorView: React.FC<PricingCalculatorViewProps> = ({
  currentLocale,
  isLightMode,
  onOpenConsultModal,
}) => {
  const content = I18N_DATA[currentLocale];
  const [calcState, setCalcState] = useState<PricingCalculatorState>({
    websiteType: 'corporate',
    pageCount: 10,
    hasEcommerce: false,
    hasMultilingual: true,
    languagesCount: 2,
    hasTorobConnect: false,
    hasInstallment: false,
    hasSmsNotification: true,
    hasCustomApi: false,
    seoTier: 'pro',
    maintenanceSla: 'gold6m',
  });

  const [copiedQuote, setCopiedQuote] = useState(false);

  // Calculation Math
  const calculation = useMemo(() => {
    let base = 0;
    let days = 5;

    switch (calcState.websiteType) {
      case 'template':
        base = 8900000;
        days = 4;
        break;
      case 'corporate':
        base = 23700000;
        days = 18;
        break;
      case 'ecommerce':
        base = 21500000;
        days = 22;
        break;
      case 'services':
        base = 16800000;
        days = 15;
        break;
      case 'portal':
        base = 38500000;
        days = 30;
        break;
    }

    // Extra pages (above 5 pages, 450,000 per page)
    const extraPages = Math.max(0, calcState.pageCount - 5);
    const pagesCost = extraPages * 450000;
    days += Math.floor(extraPages / 5);

    // E-commerce addon if not e-commerce base
    let ecomCost = 0;
    if (calcState.hasEcommerce && calcState.websiteType !== 'ecommerce') {
      ecomCost = 6500000;
      days += 4;
    }

    // Multilingual
    let langCost = 0;
    if (calcState.hasMultilingual) {
      langCost = Math.max(0, calcState.languagesCount - 1) * 4200000;
      days += (calcState.languagesCount - 1) * 2;
    }

    // Extra features
    let torobCost = calcState.hasTorobConnect ? 1900000 : 0;
    let installmentCost = calcState.hasInstallment ? 2400000 : 0;
    let smsCost = calcState.hasSmsNotification ? 1200000 : 0;
    let apiCost = calcState.hasCustomApi ? 7800000 : 0;

    // SEO tier
    let seoCost = 0;
    if (calcState.seoTier === 'pro') seoCost = 4500000;
    if (calcState.seoTier === 'enterprise') seoCost = 9800000;

    // Maintenance SLA
    let slaCost = 0;
    if (calcState.maintenanceSla === 'gold6m') slaCost = 3500000;
    if (calcState.maintenanceSla === 'vip12m') slaCost = 6900000;

    const total = base + pagesCost + ecomCost + langCost + torobCost + installmentCost + smsCost + apiCost + seoCost + slaCost;

    return {
      base,
      pagesCost,
      ecomCost,
      langCost,
      featuresCost: torobCost + installmentCost + smsCost + apiCost,
      seoCost,
      slaCost,
      total,
      days,
    };
  }, [calcState]);

  const formatPrice = (amountInToman: number) => {
    if (currentLocale === 'fa') {
      return `${amountInToman.toLocaleString('fa-IR')} تومان`;
    }
    const converted = Math.max(1, Math.round(amountInToman * content.marketContact.currencyRateMultiplier));
    return `${content.marketContact.currencySymbol} ${converted.toLocaleString()}`;
  };

  const handleCopyQuote = () => {
    const text = `Aladdin DXP Quote:
Type: ${calcState.websiteType}
Pages: ${calcState.pageCount}
Timeline: ~${calculation.days} business days
Estimated Total: ${formatPrice(calculation.total)}
Contact: ${content.marketContact.hotlineFormatted}`;
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 3000);
  };

  return (
    <div className="w-full py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-400/20 text-xs font-bold mb-3">
          <span className="material-symbols-outlined text-[16px]">calculate</span>
          <span>محاسبه‌گر شفاف و داینامیک تعرفه طراحی وب</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          برآورد دقیق هزینه و زمان‌بندی پروژه شما
        </h1>
        <p className="text-sm text-slate-400">
          امکانات مورد نیاز کسب‌وکارتان را علامت بزنید تا قیمت نهایی به همراه تفکیک هزینه‌ها و روزهای کاری محاسبه گردد.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Config Options (7 cols) */}
        <div className={`lg:col-span-7 rounded-3xl border p-6 sm:p-8 flex flex-col gap-6 shadow-xl ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
        }`}>
          {/* Step 1: Website Architecture Type */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">
              گام ۱: انتخاب نوع پلتفرم و معماری
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'corporate', title: 'طراحی سایت شرکتی و بین‌المللی', desc: 'اعتبارساز برند و چندزبانه' },
                { id: 'ecommerce', title: 'فروشگاه اینترنتی آنلاین', desc: 'متصل به درگاه، ترب و انبار' },
                { id: 'services', title: 'سایت خدماتی و رزرواسیون', desc: 'تقویم نوبت‌دهی و پزشکی' },
                { id: 'portal', title: 'پورتال اختصاصی Next.js', desc: 'سازمانی، مقیاس‌پذیر و اتوماسیون' },
                { id: 'template', title: 'قالب آماده اقتصادی (۳ روزه)', desc: 'تحویل فوری با هزینه اقتصادی' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCalcState(prev => ({ ...prev, websiteType: opt.id as any }))}
                  className={`p-3.5 rounded-2xl border text-start transition-all cursor-pointer ${
                    calcState.websiteType === opt.id
                      ? 'bg-blue-600/15 border-blue-500 shadow-sm'
                      : isLightMode
                        ? 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        : 'bg-[#111c3d] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{opt.title}</span>
                    <span className={`w-3.5 h-3.5 rounded-full border ${
                      calcState.websiteType === opt.id ? 'bg-blue-600 border-blue-400' : 'border-slate-500'
                    }`} />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Page Count Slider */}
          <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">
                گام ۲: تعداد صفحات مورد نیاز
              </span>
              <span className="font-mono text-sm font-bold text-sky-400 px-3 py-0.5 rounded-lg bg-sky-500/10 border border-sky-400/20">
                {calcState.pageCount} صفحه
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={1}
              value={calcState.pageCount}
              onChange={(e) => setCalcState(prev => ({ ...prev, pageCount: Number(e.target.value) }))}
              className="w-full accent-blue-600 h-2 bg-slate-700 rounded-lg cursor-pointer my-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>۵ صفحه پایه</span>
              <span>۲۰ صفحه</span>
              <span>۴۰ صفحه</span>
              <span>۶۰+ صفحه سازمانی</span>
            </div>
          </div>

          {/* Step 3: Add-on Capabilities Toggles */}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">
              گام ۳: قابلیت‌ها و ماژول‌های تکمیلی
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Torob */}
              <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                calcState.hasTorobConnect ? 'bg-blue-600/15 border-blue-500' : 'bg-[#111c3d]/60 border-white/5'
              }`}>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">اتصال به ترب</span>
                  <span className="text-[10px] text-slate-400">وب‌سرویس خودکار قیمت</span>
                </div>
                <input
                  type="checkbox"
                  checked={calcState.hasTorobConnect}
                  onChange={(e) => setCalcState(prev => ({ ...prev, hasTorobConnect: e.target.checked }))}
                  className="accent-blue-600 w-4 h-4 rounded cursor-pointer"
                />
              </label>

              {/* Installment */}
              <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                calcState.hasInstallment ? 'bg-blue-600/15 border-blue-500' : 'bg-[#111c3d]/60 border-white/5'
              }`}>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">پرداخت اقساطی (اسنپ‌پی)</span>
                  <span className="text-[10px] text-slate-400">خرید ۴ قسطه مشتریان</span>
                </div>
                <input
                  type="checkbox"
                  checked={calcState.hasInstallment}
                  onChange={(e) => setCalcState(prev => ({ ...prev, hasInstallment: e.target.checked }))}
                  className="accent-blue-600 w-4 h-4 rounded cursor-pointer"
                />
              </label>

              {/* SMS notifications */}
              <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                calcState.hasSmsNotification ? 'bg-blue-600/15 border-blue-500' : 'bg-[#111c3d]/60 border-white/5'
              }`}>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">سامانه پیامک الگو خدماتی</span>
                  <span className="text-[10px] text-slate-400">ارسال بدون بلک‌لیست</span>
                </div>
                <input
                  type="checkbox"
                  checked={calcState.hasSmsNotification}
                  onChange={(e) => setCalcState(prev => ({ ...prev, hasSmsNotification: e.target.checked }))}
                  className="accent-blue-600 w-4 h-4 rounded cursor-pointer"
                />
              </label>

              {/* Custom API */}
              <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                calcState.hasCustomApi ? 'bg-blue-600/15 border-blue-500' : 'bg-[#111c3d]/60 border-white/5'
              }`}>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">اتصال API حسابداری و ERP</span>
                  <span className="text-[10px] text-slate-400">همگام‌سازی اتوماتیک انبار</span>
                </div>
                <input
                  type="checkbox"
                  checked={calcState.hasCustomApi}
                  onChange={(e) => setCalcState(prev => ({ ...prev, hasCustomApi: e.target.checked }))}
                  className="accent-blue-600 w-4 h-4 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Step 4: Multilingual */}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">
                گام ۴: زبان‌های بین‌المللی
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <span>چندزبانه فعال باشد</span>
                <input
                  type="checkbox"
                  checked={calcState.hasMultilingual}
                  onChange={(e) => setCalcState(prev => ({ ...prev, hasMultilingual: e.target.checked }))}
                  className="accent-blue-600 w-4 h-4 rounded"
                />
              </label>
            </div>

            {calcState.hasMultilingual && (
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs text-slate-300">تعداد کل زبان‌ها:</span>
                <div className="flex items-center gap-2">
                  {[2, 3, 4, 5].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setCalcState(prev => ({ ...prev, languagesCount: cnt }))}
                      className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        calcState.languagesCount === cnt
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#171f35] text-slate-400 hover:text-white'
                      }`}
                    >
                      {cnt}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400">
                  (فارسی + {calcState.languagesCount - 1} زبان خارجی)
                </span>
              </div>
            )}
          </div>

          {/* Step 5: SEO Package */}
          <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">
              گام ۵: سطح پیکربندی سئو
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'basic', label: 'سئو پایه (رایگان)', desc: 'کدهای استاندارد Vitals' },
                { id: 'pro', label: 'سئو پیشرفته', desc: 'اسکیما + تحلیل کلمات' },
                { id: 'enterprise', label: 'سئو سازمانی ۳۶۰', desc: 'استراتژی کامل محتوا' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setCalcState(prev => ({ ...prev, seoTier: tier.id as any }))}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    calcState.seoTier === tier.id
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-[#111c3d]/60 border-white/5 text-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold block">{tier.label}</span>
                  <span className="text-[10px] opacity-75 mt-0.5 block">{tier.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right / Live Quote Invoice Sticky Card (5 cols) */}
        <div className={`lg:col-span-5 lg:sticky lg:top-28 rounded-2xl sm:rounded-3xl border p-5 sm:p-8 flex flex-col gap-5 shadow-2xl ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/15'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-[22px]">receipt_long</span>
              <h3 className="text-base font-bold">پیش‌فاکتور برآورد آنلاین</h3>
            </div>
            <span className="text-xs text-slate-400">
              محاسبه آنی
            </span>
          </div>

          {/* Breakdown Items */}
          <div className={`flex flex-col gap-2.5 text-xs ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
            <div className="flex justify-between items-center">
              <span>پلتفرم پایه انتخابی:</span>
              <span className="font-mono font-semibold">{formatPrice(calculation.base)}</span>
            </div>

            {calculation.pagesCost > 0 && (
              <div className="flex justify-between items-center text-slate-400">
                <span>صفحات تکمیلی ({calcState.pageCount - 5} صفحه):</span>
                <span className="font-mono font-semibold">{formatPrice(calculation.pagesCost)}</span>
              </div>
            )}

            {calculation.langCost > 0 && (
              <div className="flex justify-between items-center text-slate-400">
                <span>ماژول زبان‌های بین‌المللی:</span>
                <span className="font-mono font-semibold">{formatPrice(calculation.langCost)}</span>
              </div>
            )}

            {calculation.featuresCost > 0 && (
              <div className="flex justify-between items-center text-slate-400">
                <span>ماژول‌ها و وب‌سرویس‌ها:</span>
                <span className="font-mono font-semibold">{formatPrice(calculation.featuresCost)}</span>
              </div>
            )}

            {calculation.seoCost > 0 && (
              <div className="flex justify-between items-center text-slate-400">
                <span>پکیج سئو تخصصی:</span>
                <span className="font-mono font-semibold">{formatPrice(calculation.seoCost)}</span>
              </div>
            )}

            {calculation.slaCost > 0 && (
              <div className="flex justify-between items-center text-slate-400">
                <span>گارانتی و SLA پشتیبانی:</span>
                <span className="font-mono font-semibold">{formatPrice(calculation.slaCost)}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-emerald-400 pt-2 border-t border-white/5">
              <span>هاست سال اول، دامنه و SSL:</span>
              <span className="font-bold">رایگان هدیه</span>
            </div>
          </div>

          {/* Delivery Timeline Pill */}
          <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
            isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#171f35] border-white/10'
          }`}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-[18px]">schedule</span>
              <span>مدت زمان تخمینی پیاده‌سازی:</span>
            </div>
            <span className="font-mono text-sm font-bold text-sky-400">
              {calculation.days} روز کاری
            </span>
          </div>

          {/* Grand Total */}
          <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex flex-col gap-1 text-center">
            <span className="text-[11px] text-slate-400">سرمایه‌گذاری تخمینی کل پروژه:</span>
            <div className="flex items-center justify-center gap-1.5 my-1">
              <span className={`font-mono text-3xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                {formatPrice(calculation.total)}
              </span>
            </div>
            <span className="text-[10px] text-slate-400">
              قابلیت پرداخت در ۳ مرحله یا به صورت اقساطی
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={onOpenConsultModal}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              <span>رزرو این برآورد و دریافت پیش‌نویس قرارداد</span>
            </button>

            <button
              type="button"
              onClick={handleCopyQuote}
              className={`w-full h-10 rounded-xl text-xs font-semibold border transition-colors cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] ${
                isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedQuote ? 'done' : 'content_copy'}
              </span>
              <span>{copiedQuote ? 'متن پیش‌فاکتور کپی شد!' : 'کپی خلاصه پیش‌فاکتور'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
