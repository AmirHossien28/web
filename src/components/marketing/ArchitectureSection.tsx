import React from 'react';

interface ArchitectureSectionProps {
  isLightMode: boolean;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ isLightMode }) => {
  return (
    <section className="w-full py-20 relative overflow-hidden border-b border-white/5">
      {/* Background Subtle Ambient */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Headline */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-3 mb-14">
          <span className={`text-xs font-bold px-3.5 py-1 rounded-full border ${
            isLightMode ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-[#111c3d] text-sky-400 border-white/10'
          }`}>
            SEO & AI Search Engine Readiness
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            سایت از ابتدا برای فهم بهتر گوگل و موتورهای هوش مصنوعی ساخته می‌شود.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            هیچ ساختاری رتبه یا نمایش در پاسخ‌های هوش مصنوعی را تضمین نمی‌کند؛ اما معماری درست، محتوای پاسخ‌محور و داده‌های ساختاریافته باعث می‌شود موضوع و خدمات شما شفاف‌تر و دقیق‌تر درک شوند.
          </p>
        </div>

        {/* Feature Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 4 Architecture Feature Boxes (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Box 1 */}
            <div className={`p-5 rounded-2xl border flex items-start gap-4 transition-all ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b1329] border-white/10'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-sky-400 text-[22px]">format_list_bulleted</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold mb-1">ساختار Heading و پاسخ مستقیم</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  هر صفحه بر یک موضوع اصلی تمرکز دارد و با زیرعنوان‌های دقیق H2/H3 و پاسخ‌های کوتاه ساختاربندی می‌شود تا روبات‌های گوگل دقیقاً متوجه ارزش محتوایی سایت شوند.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className={`p-5 rounded-2xl border flex items-start gap-4 transition-all ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b1329] border-white/10'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-amber-400 text-[22px]">code_blocks</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold mb-1">داده‌های ساختاریافته Schema</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  تزریق خودکار اسکیماهای استاندارد Organization، Service، FAQ، Product و Breadcrumb بر اساس نوع صفحه جهت نمایش ستاره‌ها و نتایج غنی (Rich Snippets) در نتایج سرچ.
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className={`p-5 rounded-2xl border flex items-start gap-4 transition-all ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b1329] border-white/10'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-emerald-400 text-[22px]">speed</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold mb-1">سرعت Core Web Vitals سبز</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  تصاویر بهینه‌شده به فرمت WebP، فونت‌های استاندارد فارسی، سیستم کشینگ چندلایه‌ای سرور و فشرده‌سازی خودکار کدهای استایل و اسکریپت بدون افت کیفیت بصری.
                </p>
              </div>
            </div>

            {/* Box 4 */}
            <div className={`p-5 rounded-2xl border flex items-start gap-4 transition-all ${
              isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b1329] border-white/10'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-indigo-400 text-[22px]">lock</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold mb-1">امنیت چندلایه‌ای و بک‌آپ ابری روزانه</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  مسدودسازی حملات DDoS، گواهی SSL رایگان مادام‌العمر، فایروال اختصاصی دیتابیس و ذخیره نسخه‌های پشتیبان مجزا در سرورهای ابری خارج از هاست اصلی.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pipeline Box & Comparative Table (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Pipeline Visual Box */}
            <div className={`rounded-3xl border p-6 shadow-xl ${
              isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/15'
            }`}>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-sm font-bold text-sky-400">ALADDIN DXP PIPELINE</span>
                </div>
                <span className="font-mono text-xs text-slate-400">Latency: 14ms (IR/Global)</span>
              </div>

              <div className="flex flex-col gap-2.5 font-mono text-xs">
                <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#171f35] border-white/5'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">01. UI/UX Figma</span>
                    <span className="text-slate-400 text-[11px] font-sans">طراحی پروتوتایپ اختصاصی هویت بصری</span>
                  </div>
                  <span className="text-emerald-400 text-[10px] font-bold font-sans">تایید کارفرما</span>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#171f35] border-white/5'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-sky-400 font-bold">02. Clean Code Core</span>
                    <span className="text-slate-400 text-[11px] font-sans">بدون پلاگین سنگین و کدهای زائد</span>
                  </div>
                  <span className="text-sky-400 text-[10px] font-bold">100% Modular</span>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#171f35] border-white/5'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400 font-bold">03. SEO Metadata</span>
                    <span className="text-slate-400 text-[11px] font-sans">تولید داینامیک OpenGraph و Schema</span>
                  </div>
                  <span className="text-emerald-400 text-[10px] font-bold">Google Ready</span>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#171f35] border-white/5'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold">04. Cloud Security</span>
                    <span className="text-slate-400 text-[11px] font-sans">فایروال WAF و بک‌آپ خودکار شبانه</span>
                  </div>
                  <span className="text-emerald-400 text-[10px] font-bold">Active Shield</span>
                </div>
              </div>

              {/* Comparative Table */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <h5 className={`text-xs font-bold mb-3 ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                  قالب آماده یا طراحی اختصاصی؟ کدام برای شما بهتر است؟
                </h5>
                <div className="overflow-x-auto no-scrollbar -mx-2 px-2">
                  <table className="w-full text-start text-xs min-w-[380px]">
                    <thead>
                      <tr className={`border-b text-slate-400 ${
                        isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-[#171f35] border-white/10'
                      }`}>
                        <th className="p-2.5 text-start font-semibold">شاخصه مقایسه‌ای</th>
                        <th className="p-2.5 text-start font-semibold text-sky-400">قالب آماده بهینه</th>
                        <th className="p-2.5 text-start font-semibold text-amber-400">طراحی اختصاصی</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="p-2.5 font-medium">زمان آماده‌سازی و تحویل</td>
                        <td className="p-2.5 text-slate-400">سریع (۳ الی ۷ روز)</td>
                        <td className="p-2.5 text-slate-400">طراحی فیگما (۱۵ الی ۳۰ روز)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium">هزینه اولیه سرمایه‌گذاری</td>
                        <td className="p-2.5 text-emerald-400 font-bold">اقتصادی و مقرون‌به‌صرفه</td>
                        <td className="p-2.5 text-slate-400">بالاتر به‌دلیل تیم طراحی اختصاصی</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium">شخصی‌سازی رابط کاربری</td>
                        <td className="p-2.5 text-slate-400">در چارچوب ساختار قالب</td>
                        <td className="p-2.5 text-amber-400 font-bold">۱۰۰٪ منطبق با سناریوی شما</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium">توسعه در آینده و ماژول‌ها</td>
                        <td className="p-2.5 text-slate-400">قابل قبول برای اصناف معمول</td>
                        <td className="p-2.5 text-sky-400 font-bold">نامحدود بدون سقف فنی</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
