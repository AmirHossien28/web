import React from 'react';
import { PageId } from '../../types';

interface ServicesGridProps {
  isLightMode: boolean;
  onNavigate: (page: PageId) => void;
  onOpenConsultModal: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  isLightMode,
  onNavigate,
  onOpenConsultModal,
}) => {
  return (
    <section className={`w-full py-20 transition-colors duration-300 ${
      isLightMode ? 'bg-slate-50' : 'bg-[#050d23]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">
                خدمات مهندسی وب و DXP علاءالدین
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              برای هر مدل کسب‌وکار، معماری مناسب همان صنف
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              هیچ نسخه یکسانی برای همه وجود ندارد. ساختار فنی و سفر کاربری یک سایت فروشگاهی با یک سامانه هلدینگی شرکتی یا مرکز پزشکی کاملاً متفاوت است.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('pricing-calculator')}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer w-full sm:w-auto shrink-0 active:scale-95 ${
              isLightMode
                ? 'bg-white border-slate-200 text-blue-600 hover:bg-slate-50'
                : 'bg-[#111c3d] border-white/10 text-sky-400 hover:bg-[#182852] hover:text-white'
            }`}
          >
            <span>جدول مقایسه کامل امکانات</span>
            <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
          </button>
        </div>

        {/* 6 Bento Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Corporate */}
          <div className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md ${
            isLightMode
              ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl'
              : 'bg-[#0b1329] border-white/10 hover:border-sky-400/50 hover:shadow-xl'
          }`}>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sky-400 text-[26px]">business</span>
                </div>
                <span className="text-[11px] font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-400/20">
                  اعتبارساز برند
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-sky-400 transition-colors">
                طراحی سایت شرکتی و چندزبانه
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                معرفی قدرتمند دستاوردها، خدمات، کاتالوگ محصولات، اخبار سازمانی و شبکه نمایندگی‌ها با قابلیت پشتیبانی از چند زبان برای صادرات و پرستیژ بین‌المللی.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">معماری بین‌المللی i18n</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">کاتالوگ دانلودی امن</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">سرعت ۹۹+ گوگل</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500">شروع تعرفه استاندارد از:</span>
                <span className="font-mono text-sm font-bold text-sky-400">۲۳,۷۰۰,۰۰۰ تومان</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('corporate-web-design')}
                className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>مشاهده پکیج</span>
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              </button>
            </div>
          </div>

          {/* Card 2: E-Commerce */}
          <div className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md ${
            isLightMode
              ? 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-xl'
              : 'bg-[#0b1329] border-white/10 hover:border-amber-400/50 hover:shadow-xl'
          }`}>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-400 text-[26px]">shopping_cart</span>
                </div>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                  حداکثر نرخ تبدیل
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-amber-400 transition-colors">
                فروشگاه اینترنتی آنلاین پیشرفته
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                مدیریت انبار و تنوع کالا، اتصال به درگاه‌های پرداخت، محاسبه خودکار هزینه پست و پیک، فاکتور رسمی، کیف پول و سیستم وفاداری مشتریان بدون افت سرعت.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">اتصال به درگاه و ترب</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">پیامک خودکار وضعیت سفارش</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">سبد خرید تک‌مرحله‌ای</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500">شروع تعرفه فروشگاهی از:</span>
                <span className="font-mono text-sm font-bold text-amber-400">۱۹,۵۰۰,۰۰۰ تومان</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('ecommerce-web-design')}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>مشاهده پکیج</span>
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              </button>
            </div>
          </div>

          {/* Card 3: Medical & Services */}
          <div className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md ${
            isLightMode
              ? 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-xl'
              : 'bg-[#0b1329] border-white/10 hover:border-emerald-400/50 hover:shadow-xl'
          }`}>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-400 text-[26px]">medical_services</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                  نوبت‌دهی هوشمند
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                سایت خدماتی، پزشکی و نوبت‌دهی
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                معرفی تیم متخصصین، فرم‌های رزرو و مشاوره آنلاین، پرونده بیماران و مراجعین، نمایش پیش و پس از خدمات با گالری اختصاصی و لندینگ‌های جذب سرنخ تبلیغاتی.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">تقویم آنلاین نوبت</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">تاییدیه پیامکی</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">سازگار با قوانین پزشکی</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500">شروع تعرفه خدماتی از:</span>
                <span className="font-mono text-sm font-bold text-emerald-400">۱۵,۷۰۰,۰۰۰ تومان</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('services-web-design')}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>مشاهده پکیج</span>
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              </button>
            </div>
          </div>

          {/* Card 4: Enterprise Next.js Portals */}
          <div className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md ${
            isLightMode
              ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl'
              : 'bg-[#0b1329] border-white/10 hover:border-sky-400/50 hover:shadow-xl'
          }`}>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sky-400 text-[26px]">terminal</span>
                </div>
                <span className="text-[11px] font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-400/20">
                  توسعه اختصاصی Next.js
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-sky-400 transition-colors">
                پورتال‌های سازمانی و وب‌اپلیکیشن
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                کدنویسی بدون محدودیت برای نیازمندی‌های پیچیده کسب‌وکار، پنل‌های کاربری اختصاصی، سامانه‌های استعلام قیمت آنی، اتوماسیون داخلی و معماری مدرن Headless.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">معماری ماژولار React/Next</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">اتصال RESTful API</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">دیتابیس مقیاس‌پذیر ابری</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500">شروع تعرفه اختصاصی از:</span>
                <span className="font-mono text-sm font-bold text-sky-400">۳۷,۵۰۰,۰۰۰ تومان</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('custom-portal-development')}
                className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>برآورد امکانات</span>
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              </button>
            </div>
          </div>

          {/* Card 5: Fast Launch Templates */}
          <div className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md ${
            isLightMode
              ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl'
              : 'bg-[#0b1329] border-white/10 hover:border-sky-400/50 hover:shadow-xl'
          }`}>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-400 text-[26px]">speed</span>
                </div>
                <span className="text-[11px] font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-400/20">
                  تحویل سریع ۳ روزه
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                سایت‌های آماده و قالب‌های اقتصادی
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                راهکاری سریع و مقرون‌به‌صرفه با قالب‌های از پیش تست‌شده و بومی‌سازی شده توسط تیم مهندسی علاءالدین، مناسب استارتاپ‌ها و کسب‌وکارهایی که زمان برایشان حیاتی است.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">نصب و بارگذاری محتوا</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">هاست و دامنه رایگان سال اول</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">ویدیو آموزشی کاربری</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500">تعرفه پکیج آماده:</span>
                <span className="font-mono text-sm font-bold text-sky-400">۸,۹۰۰,۰۰۰ تومان</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('templates')}
                className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>کاتالوگ قالب‌ها</span>
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              </button>
            </div>
          </div>

          {/* Card 6: Technical SEO & AI Search */}
          <div className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md ${
            isLightMode
              ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl'
              : 'bg-[#0b1329] border-white/10 hover:border-sky-400/50 hover:shadow-xl'
          }`}>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-indigo-400 text-[26px]">manage_search</span>
                </div>
                <span className="text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-400/20">
                  صفحه اول گوگل
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                سئو تکنیکال و رتبه‌بندی در گوگل
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                معماری ساختار URLها، تگ‌های داده‌محور، ساخت فایل نقشه سایت داینامیک، بهینه‌سازی کدهای JS/CSS و تدوین استراتژی کلمات کلیدی برای جذب ترافیک ارگانیک بدون توقف.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">Core Web Vitals سبز</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">پاسخ‌دهی به ربات‌های AI</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">گزارش‌دهی ماهانه Search Console</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500">پلن جامع سئو پایه:</span>
                <span className="font-mono text-sm font-bold text-indigo-400">رایگان در طراحی اختصاصی</span>
              </div>
              <button
                type="button"
                onClick={onOpenConsultModal}
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>مشاوره سئو</span>
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
