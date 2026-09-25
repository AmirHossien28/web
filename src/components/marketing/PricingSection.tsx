import React from 'react';
import { PageId } from '../../types';

interface PricingSectionProps {
  isLightMode: boolean;
  onNavigate: (page: PageId) => void;
  onOpenConsultModal: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  isLightMode,
  onNavigate,
  onOpenConsultModal,
}) => {
  return (
    <section className={`w-full py-20 transition-colors duration-300 ${
      isLightMode ? 'bg-slate-50' : 'bg-[#050d23]'
    }`} id="pricing-section">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-3 mb-14">
          <span className={`text-xs font-bold px-3.5 py-1 rounded-full border ${
            isLightMode ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-[#111c3d] text-sky-400 border-white/10'
          }`}>
            تعرفه شفاف، بدون هزینه‌های پنهان بعدی
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            شروع شفاف؛ قیمت نهایی بر اساس امکانات واقعی پروژه
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            مبالغ زیر نقطه شروع پکیج‌ها هستند و تمام حقوق مادی، هاست سال اول، دامنه، آموزش ویدیویی و پشتیبانی فنی در قرارداد رسمی ثبت می‌شود.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Economic Ready */}
          <div className={`rounded-3xl border p-6 lg:p-8 flex flex-col justify-between shadow-lg transition-all ${
            isLightMode ? 'bg-white border-slate-200 hover:shadow-xl' : 'bg-[#0b1329] border-white/10 hover:shadow-xl'
          }`}>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 bg-white/5 px-3 py-1 rounded-full">شروع سریع</span>
                <span className="text-[11px] text-slate-400">تحویل ۳ الی ۵ روزه</span>
              </div>

              <h3 className="text-lg font-bold mb-1">سایت آماده خدماتی / پایه‌ای</h3>
              <p className="text-xs text-slate-400 mb-6">
                مناسب معرفی کسب‌وکارها، شرکت‌های نوپا و مشاغلی که به سرعت نیاز به یک ویترین دیجیتال دارند.
              </p>

              <div className="flex items-baseline gap-1 my-3">
                <span className="font-mono text-3xl font-extrabold">۱۵,۷۰۰,۰۰۰</span>
                <span className="text-xs text-slate-400">تومان / شروع از</span>
              </div>

              <div className={`flex flex-col gap-2.5 pt-4 mb-8 text-xs border-t border-white/5 ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span>دامنه ir و هاست پرسرعت ابری رایگان ۱ سال</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span>طراحی رسپانسیو ۱۰۰٪ سازگار با موبایل</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span>فرم تماس، واتساپ، نقشه و اطلاعات تماس</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span>گواهی امنیتی SSL رایگان مادام‌العمر</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span>پشتیبانی فنی ۶ ماهه و آموزش اختصاصی</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenConsultModal}
              className={`w-full h-12 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-[0.98] ${
                isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-[#171f35] hover:bg-[#222940] text-white'
              }`}
            >
              انتخاب پکیج آماده
            </button>
          </div>

          {/* Plan 2: Custom Professional (Featured) */}
          <div className={`relative rounded-3xl border-2 border-blue-500/80 p-6 lg:p-8 flex flex-col justify-between shadow-2xl shadow-blue-500/10 ${
            isLightMode ? 'bg-white' : 'bg-[#0b1329]'
          }`}>
            <div className="absolute -top-3.5 start-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md">
              محبوب‌ترین انتخاب برندها
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-3 pt-2">
                <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
                  طراحی UI/UX در فیگما
                </span>
                <span className="text-[11px] text-slate-400">تحویل ۱۵ الی ۲۵ روزه</span>
              </div>

              <h3 className="text-lg font-bold mb-1">طراحی اختصاصی شرکتی / فروشگاهی</h3>
              <p className="text-xs text-slate-400 mb-6">
                برای برندهایی که هویت بصری منحصر‌به‌فرد، سفر کاربری بهینه‌شده و رتبه‌بندی قطعی در گوگل می‌خواهند.
              </p>

              <div className="flex items-baseline gap-1 my-3">
                <span className="font-mono text-3xl font-extrabold text-sky-400">۲۳,۷۰۰,۰۰۰</span>
                <span className="text-xs text-slate-400">تومان / شروع از</span>
              </div>

              <div className={`flex flex-col gap-2.5 pt-4 mb-8 text-xs border-t border-white/5 ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-400 text-[18px]">verified</span>
                  <span>طراحی وایرفریم و پروتوتایپ اختصاصی در Figma</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-400 text-[18px]">verified</span>
                  <span>اتصال به درگاه پرداخت بانکی و ترب</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-400 text-[18px]">verified</span>
                  <span>پیکربندی فنی کامل سئو و نشانه‌گذاری Schema</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-400 text-[18px]">verified</span>
                  <span>سرعت بارگذاری لود سبز استاندارد گوگل</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-400 text-[18px]">verified</span>
                  <span>۱ سال پشتیبانی فنی طلایی و بک‌آپ روزانه</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenConsultModal}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>سفارش طراحی اختصاصی</span>
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            </button>
          </div>

          {/* Plan 3: Enterprise Web App & Portal */}
          <div className={`rounded-3xl border p-6 lg:p-8 flex flex-col justify-between shadow-lg transition-all ${
            isLightMode ? 'bg-white border-slate-200 hover:shadow-xl' : 'bg-[#0b1329] border-white/10 hover:shadow-xl'
          }`}>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  انترپرایز و مقیاس‌پذیر
                </span>
                <span className="text-[11px] text-slate-400">قرارداد SLA سازمانی</span>
              </div>

              <h3 className="text-lg font-bold mb-1">پلتفرم سازمانی و وب‌اپلیکیشن</h3>
              <p className="text-xs text-slate-400 mb-6">
                ویژه سامانه‌های دارای بیش از ۲۰,۰۰۰ کاربر همزمان، پورتال‌های استعلامی و نیازمندی‌های پیچیده کدنویسی.
              </p>

              <div className="flex items-baseline gap-1 my-3">
                <span className="font-mono text-3xl font-extrabold text-amber-400">۳۷,۵۰۰,۰۰۰</span>
                <span className="text-xs text-slate-400">تومان / شروع از</span>
              </div>

              <div className={`flex flex-col gap-2.5 pt-4 mb-8 text-xs border-t border-white/5 ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-[18px]">check_circle</span>
                  <span>معماری ماژولار با فریم‌ورک Next.js و Node.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-[18px]">check_circle</span>
                  <span>پایگاه داده مقیاس‌پذیر و پنل مدیریتی سفارشی</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-[18px]">check_circle</span>
                  <span>اتصال به سامانه‌های انبارداری ERP و حسابداری</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-[18px]">check_circle</span>
                  <span>تست نفوذپذیری امنیتی و مستندات کامل سورس کد</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-[18px]">check_circle</span>
                  <span>پشتیبانی VIP مانیتورینگ ۲۴/۷ و خط تلفن مستقیم مدیر فنی</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenConsultModal}
              className={`w-full h-12 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-[0.98] ${
                isLightMode ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-[#171f35] hover:bg-[#222940] text-white'
              }`}
            >
              مشاوره سطح سازمانی
            </button>
          </div>
        </div>

        {/* Banner for Interactive Calculator */}
        <div className={`mt-12 p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-[#111c3d] border-white/10'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-amber-400 text-[26px]">calculate</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold">می‌خواهید قیمت دقیق را آنلاین بر اساس گزینه‌های خود محاسبه کنید؟</h4>
              <p className="text-xs text-slate-400">
                نوع سایت، تعداد صفحات، زبان‌ها و افزونه‌های مورد نیاز را انتخاب کنید و پیش‌فاکتور آنی تحویل بگیرید.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('pricing-calculator')}
            className="w-full sm:w-auto px-5 h-11 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md transition-all cursor-pointer shrink-0 flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span>باز کردن محاسبه‌گر هوشمند قیمت</span>
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          </button>
        </div>
      </div>
    </section>
  );
};
