import React, { useState } from 'react';
import { LocaleKey } from '../../types';

interface CmsDesignSystemViewProps {
  isLightMode: boolean;
  currentLocale: LocaleKey;
}

export const CmsDesignSystemView: React.FC<CmsDesignSystemViewProps> = ({
  isLightMode,
  currentLocale,
}) => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'architecture' | 'components' | 'cms-tree'>('tokens');

  // Interactive component states for sandbox
  const [testInputVal, setTestInputVal] = useState('پیش‌نویس شرکت بازرگانی');
  const [btnLoading, setBtnLoading] = useState(false);
  const [demoSwitch, setDemoSwitch] = useState(true);

  return (
    <div className="w-full py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-sky-400 border border-sky-400/20 text-xs font-bold mb-3">
          <span className="material-symbols-outlined text-[16px]">palette</span>
          <span>Aladdin DXP Unified Design System & Content Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          استودیو دیزاین‌سیستم و معماری CMS علاءالدین
        </h1>
        <p className="text-sm text-slate-400">
          مشاهده توکن‌های رنگی، مقیاس تایپوگرافی، مدل چندزبانه و معماری داده‌های ماژولار تعریف‌شده برای سیستم Next.js + React + Node.js
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { id: 'tokens', label: 'توکن‌های دیزاین (Colors & Typography)', icon: 'palette' },
          { id: 'architecture', label: 'معماری داده و چندزبانه (i18n & Market)', icon: 'account_tree' },
          { id: 'components', label: 'جعبه‌ابزار کامپوننت‌ها (Component Sandbox)', icon: 'widgets' },
          { id: 'cms-tree', label: 'ساختار ناوبری CMS اختصاصی', icon: 'dashboard' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : isLightMode
                  ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  : 'bg-[#0b1329] text-slate-300 hover:bg-[#171f35] border border-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: TOKENS */}
      {activeTab === 'tokens' && (
        <div className="flex flex-col gap-10 animate-in fade-in duration-200">
          {/* Colors Section */}
          <div className={`p-6 sm:p-8 rounded-3xl border ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
          }`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>پالت رنگ‌های اصلی (Primary Scale)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
              {[
                { name: 'Primary 50', hex: '#EFF6FF', textDark: true },
                { name: 'Primary 100', hex: '#DBEAFE', textDark: true },
                { name: 'Primary 200', hex: '#BFDBFE', textDark: true },
                { name: 'Primary 300', hex: '#93C5FD', textDark: true },
                { name: 'Primary 400', hex: '#60A5FA', textDark: true },
                { name: 'Primary 500', hex: '#3B82F6', textDark: false },
                { name: 'Primary 600', hex: '#2563EB', textDark: false },
                { name: 'Primary 700', hex: '#1D4ED8', textDark: false },
                { name: 'Primary 800', hex: '#1E40AF', textDark: false },
                { name: 'Primary 900', hex: '#1E3A8A', textDark: false },
              ].map((c) => (
                <div key={c.name} className="flex flex-col gap-1.5">
                  <div
                    className="h-16 rounded-xl border border-black/10 shadow-inner flex items-end p-2"
                    style={{ backgroundColor: c.hex }}
                  >
                    <span className={`text-[10px] font-mono font-bold ${c.textDark ? 'text-black' : 'text-white'}`}>
                      {c.hex}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">{c.name}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/10">
              {/* Brand Navy */}
              <div>
                <h4 className="text-sm font-bold mb-3">سطوح سرمه‌ای برند (Brand / Navy)</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: 'Navy 950', hex: '#0B1329' },
                    { name: 'Navy 900', hex: '#0F172A' },
                    { name: 'Navy 800', hex: '#172033' },
                    { name: 'Navy 700', hex: '#1E293B' },
                  ].map((n) => (
                    <div key={n.name} className="p-3 rounded-xl border border-white/10 text-white" style={{ backgroundColor: n.hex }}>
                      <span className="text-xs font-bold block">{n.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">{n.hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Semantic */}
              <div>
                <h4 className="text-sm font-bold mb-3">رنگ‌های معنایی (Semantic Tokens)</h4>
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <span className="text-xs font-bold block">Success</span>
                    <span className="text-[10px] font-mono">#16A34A</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <span className="text-xs font-bold block">Warning</span>
                    <span className="text-[10px] font-mono">#F59E0B</span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
                    <span className="text-xs font-bold block">Error</span>
                    <span className="text-[10px] font-mono">#DC2626</span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-sky-400">
                    <span className="text-xs font-bold block">Info</span>
                    <span className="text-[10px] font-mono">#2563EB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Typography Scale */}
          <div className={`p-6 sm:p-8 rounded-3xl border ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
          }`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>مقیاس تایپوگرافی (Typography Hierarchy)</span>
            </h3>
            <div className="flex flex-col gap-4 divide-y divide-white/5">
              <div className="pt-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <span className="text-4xl font-extrabold">Display 1 (64px / 72px)</span>
                <span className="text-xs font-mono text-slate-400">Font: Vazirmatn / Space Grotesk (700)</span>
              </div>
              <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <span className="text-2xl font-bold">Headline 1 / H1 (48px / 56px)</span>
                <span className="text-xs font-mono text-slate-400">Font: Vazirmatn / Space Grotesk (700)</span>
              </div>
              <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <span className="text-xl font-bold">Headline 2 / H2 (32px / 40px)</span>
                <span className="text-xs font-mono text-slate-400">Font: Vazirmatn / Space Grotesk (600)</span>
              </div>
              <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <span className="text-base">Body Large (18px / 28px) — متون توضیحات اصلی بخش‌ها و مقالات</span>
                <span className="text-xs font-mono text-slate-400">Font: Vazirmatn / Inter (400)</span>
              </div>
              <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <span className="text-xs font-mono text-sky-400">Code Small (12px / 18px) — tabular-nums; 9000 9830; 0.7s LCP;</span>
                <span className="text-xs font-mono text-slate-400">Font: JetBrains Mono (400)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARCHITECTURE & I18N */}
      {activeTab === 'architecture' && (
        <div className="flex flex-col gap-8 animate-in fade-in duration-200">
          <div className={`p-6 sm:p-8 rounded-3xl border ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
          }`}>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-400 text-[22px]">account_tree</span>
              <span>معماری محتوایی واحد (Content Entity Architecture)</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              طبق بخش ۴۱ مستندات Aladdin، محتوا برای هر زبان از ابتدا بازنویسی نمی‌شود؛ بلکه مدل سه‌سطحی شامل Global Data + Translations + Market Overrides ایجاد شده است.
            </p>

            {/* Tree Diagram Visual */}
            <div className="p-6 rounded-2xl bg-[#060a14] border border-white/10 font-mono text-xs text-slate-300 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span className="material-symbols-outlined text-[18px]">dataset</span>
                <span>Content Entity (مثال: پروژه یا سرویس)</span>
              </div>

              <div className="ms-6 border-s-2 border-white/10 ps-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sky-400">
                  <span className="material-symbols-outlined text-[16px]">globe</span>
                  <span>1. Global Data (تصاویر، مشخصات فنی مشترک، متاتگ‌ها، ID)</span>
                </div>

                <div className="flex flex-col gap-1.5 text-slate-300">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="material-symbols-outlined text-[16px]">translate</span>
                    <span>2. Translations (متون محلی‌سازی‌شده)</span>
                  </div>
                  <div className="ms-6 flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-white/10">FA (فارسی - راست‌به‌چپ)</span>
                    <span className="px-2 py-0.5 rounded bg-white/10">EN (انگلیسی - چپ‌به‌راست)</span>
                    <span className="px-2 py-0.5 rounded bg-white/10">AR (عربی - راست‌به‌چپ)</span>
                    <span className="px-2 py-0.5 rounded bg-white/10">TR (ترکی)</span>
                    <span className="px-2 py-0.5 rounded bg-white/10">DE (آلمانی)</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-slate-300">
                  <div className="flex items-center gap-2 text-purple-400">
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                    <span>3. Market Overrides (تنظیمات بازار هدف)</span>
                  </div>
                  <div className="ms-6 flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-white/10">IR: خط سراسری 9000 9830 | واحد تومان | ترب</span>
                    <span className="px-2 py-0.5 rounded bg-white/10">UAE: خط دبی +971 4... | درهم AED | Stripe</span>
                    <span className="px-2 py-0.5 rounded bg-white/10">DE: خط برلین +49 30... | یورو € | GDPR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMPONENT SANDBOX */}
      {activeTab === 'components' && (
        <div className="flex flex-col gap-8 animate-in fade-in duration-200">
          <div className={`p-6 sm:p-8 rounded-3xl border ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
          }`}>
            <h3 className="text-lg font-bold mb-4">جعبه تست زنده کامپوننت‌ها (UI Library Sandbox)</h3>

            {/* Buttons Row */}
            <div className="flex flex-col gap-3 mb-8">
              <span className="text-xs text-slate-400 font-bold">۱. دکمه‌ها و وضعیت‌های تعاملی (Buttons):</span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setBtnLoading(true);
                    setTimeout(() => setBtnLoading(false), 2000);
                  }}
                  className="px-5 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  {btnLoading ? (
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  ) : (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  )}
                  <span>دکمه اصلی (Primary {btnLoading ? 'در حال پردازش...' : 'تست کلیک'})</span>
                </button>

                <button
                  type="button"
                  className="px-5 h-11 rounded-xl bg-[#111c3d] hover:bg-[#182852] text-white border border-white/20 font-bold text-xs transition-all cursor-pointer"
                >
                  دکمه ثانویه (Secondary)
                </button>

                <button
                  type="button"
                  className="px-5 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium text-xs transition-all cursor-pointer"
                >
                  دکمه شبح (Ghost)
                </button>

                <button
                  type="button"
                  disabled
                  className="px-5 h-11 rounded-xl bg-white/5 text-slate-600 cursor-not-allowed text-xs font-medium"
                >
                  غیرفعال (Disabled)
                </button>
              </div>
            </div>

            {/* Inputs & Form Controls */}
            <div className="flex flex-col gap-3 mb-8 pt-6 border-t border-white/10">
              <span className="text-xs text-slate-400 font-bold">۲. ورودی‌های فرم و اعتبارسنجی (Inputs):</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">اینپوت متنی با استایل فوکوس ۳ پیکسل:</label>
                  <input
                    type="text"
                    value={testInputVal}
                    onChange={(e) => setTestInputVal(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#060a14] border border-white/15 text-xs text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">سوئیچ تعاملی وضعیت (Toggle Switch):</label>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setDemoSwitch(!demoSwitch)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                        demoSwitch ? 'bg-blue-600' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                        demoSwitch ? 'start-6' : 'start-1'
                      }`} />
                    </button>
                    <span className="text-xs text-slate-300">
                      {demoSwitch ? 'سرویس سئو فعال است' : 'سرویس سئو غیرفعال'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <span className="text-xs text-slate-400 font-bold">۳. نشان‌ها و بج‌های وضعیتی (Badges):</span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-600/15 text-sky-400 text-xs font-bold border border-sky-400/30">
                  PRIMARY BADGE
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  SUCCESS / VERIFIED
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/30">
                  WARNING / PENDING
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-bold border border-rose-500/30">
                  ERROR / CRITICAL
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 text-xs font-bold border border-purple-500/30">
                  NEXT.JS 14 MODULAR
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CMS TREE */}
      {activeTab === 'cms-tree' && (
        <div className="flex flex-col gap-8 animate-in fade-in duration-200">
          <div className={`p-6 sm:p-8 rounded-3xl border ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
          }`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-[22px]">dashboard</span>
              <span>معماری ماژول‌های پنل مدیریت اختصاصی (CMS Navigation Architecture)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 rounded-2xl bg-[#060a14] border border-white/10 flex flex-col gap-2">
                <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">article</span>
                  مدیریت محتوا (Content)
                </span>
                <ul className="text-xs text-slate-400 flex flex-col gap-1 list-disc list-inside">
                  <li>صفحات عمومی (Pages)</li>
                  <li>خدمات و پکیج‌ها (Services)</li>
                  <li>نمونه‌کارها (Portfolio)</li>
                  <li>قالب‌های آماده (Templates)</li>
                  <li>وبلاگ و اخبار (Blog)</li>
                  <li>سوالات متداول (FAQ)</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#060a14] border border-white/10 flex flex-col gap-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">public</span>
                  بین‌الملل و بازارها (International)
                </span>
                <ul className="text-xs text-slate-400 flex flex-col gap-1 list-disc list-inside">
                  <li>زبان‌ها (Languages FA/EN/AR/TR/DE)</li>
                  <li>کشورها و مناطق (Regions)</li>
                  <li>پروفایل‌های محلی (Locale Profiles)</li>
                  <li>درگاه‌های پرداخت چندارزی</li>
                  <li>شعب و شماره‌های تماس محلی</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#060a14] border border-white/10 flex flex-col gap-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">manage_search</span>
                  سئو و زیرساخت (SEO & System)
                </span>
                <ul className="text-xs text-slate-400 flex flex-col gap-1 list-disc list-inside">
                  <li>متاتگ‌ها و اسکیما (Schema.org)</li>
                  <li>نقشه سایت داینامیک (Sitemap)</li>
                  <li>کش و بهینه‌سازی سرور (Redis)</li>
                  <li>لاگ‌ها و مانیتورینگ امنیتی</li>
                  <li>سطوح دسترسی ادمین (RBAC)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
