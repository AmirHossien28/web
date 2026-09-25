import React, { useState } from 'react';
import { PageId, LocaleKey } from '../../types';
import { SECTIONS_I18N } from '../../data/sectionsI18n';

interface EcommerceShowcaseProps {
  currentLocale?: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsultModal: () => void;
}

export const EcommerceShowcase: React.FC<EcommerceShowcaseProps> = ({
  currentLocale = 'fa',
  onNavigate,
  onOpenConsultModal,
}) => {
  const t = SECTIONS_I18N[currentLocale].ecommerceShowcase;
  const isRtl = currentLocale === 'fa' || currentLocale === 'ar';
  const [cartCount, setCartCount] = useState(3);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  const handleAddToCart = (productName: string) => {
    setCartCount(prev => prev + 1);
    setLastAddedItem(productName);
    setTimeout(() => setLastAddedItem(null), 2500);
  };

  return (
    <section
      id="ecommerce-showcase"
      className="w-full py-20 relative overflow-hidden text-white shadow-2xl border-y border-blue-500/20"
      style={{
        background: 'radial-gradient(at center bottom, #102a5c 0%, #061126 100%)',
      }}
    >
      {/* Ambient Orbits & Pulsing Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute top-[8%] start-[12%] w-1.5 h-1.5 rounded-full bg-sky-400 anim-twinkle shadow-[0_0_8px_#7bd0ff]" />
        <div className="absolute top-[18%] start-[28%] w-1 h-1 rounded-full bg-white anim-twinkle-slow" />
        <div className="absolute top-[14%] start-[46%] w-2 h-2 rounded-full bg-amber-400 anim-cosmic-glow shadow-[0_0_10px_#f59e0b]" />
        <div className="absolute top-[22%] start-[64%] w-1.5 h-1.5 rounded-full bg-sky-300 anim-twinkle-fast" />
        <div className="absolute top-[38%] start-[6%] w-1.5 h-1.5 rounded-full bg-amber-400 anim-twinkle-slow" />
        <div className="absolute top-[68%] start-[10%] w-2 h-2 rounded-full bg-sky-400 anim-cosmic-glow" />
        <div className="absolute top-[82%] start-[34%] w-2.5 h-2.5 rounded-full bg-amber-400 anim-cosmic-glow shadow-[0_0_12px_#f59e0b]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Interactive Window Visual (6 cols) */}
          <div className="lg:col-span-6 flex flex-col order-2 lg:order-1">
            <div className="relative rounded-3xl bg-[#050d23]/85 border border-white/15 p-4 sm:p-6 shadow-[0_24px_60px_-15px_rgba(0,18,48,0.95)] backdrop-blur-xl">
              {/* Floating Top Chips */}
              <div className="absolute -top-3 end-6 px-3 py-1.5 rounded-xl bg-[#0b1329]/95 border border-white/20 text-white font-mono text-[11px] font-bold shadow-2xl backdrop-blur-md z-30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>UI/UX Figma Design</span>
              </div>

              <div className="absolute -bottom-3 start-6 px-3 py-1.5 rounded-xl bg-[#0b1329]/95 border border-emerald-500/40 text-white font-mono text-[11px] font-bold shadow-2xl backdrop-blur-md z-30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="material-symbols-outlined text-[15px] text-emerald-400">speed</span>
                <span>Core Web Vitals: 99+</span>
              </div>

              {/* Floating Notification Toast */}
              {lastAddedItem ? (
                <div className="absolute top-12 start-4 px-3 py-1.5 rounded-full bg-emerald-500/95 text-white font-semibold text-xs shadow-2xl backdrop-blur-md z-40 flex items-center gap-1.5 animate-in fade-in zoom-in-90 duration-200">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>{lastAddedItem} {t.cartAdded}</span>
                </div>
              ) : (
                <div className="absolute top-12 start-4 px-3 py-1.5 rounded-full bg-[#111c3d]/95 border border-emerald-500/40 text-white text-xs shadow-2xl backdrop-blur-md z-30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400 font-bold">{t.newOrder}</span>
                  <span className="text-slate-300 text-[10px]">{t.justNow}</span>
                </div>
              )}

              {/* Simulated E-Commerce Browser Window */}
              <div className="rounded-2xl bg-[#0b1329] border border-white/20 shadow-2xl overflow-hidden ecom-window-anim">
                {/* Browser Title Bar */}
                <div className="h-10 bg-[#171f35] border-b border-white/10 flex items-center justify-between px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="px-3 py-0.5 rounded-md bg-[#0b1329] text-slate-300 font-mono text-[11px] flex items-center gap-1.5" dir="ltr">
                    <span className="material-symbols-outlined text-[13px] text-emerald-400">lock</span>
                    <span>store.webaladdin.ir</span>
                    <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1 rounded font-bold">SSL 100%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="hidden sm:inline font-bold">{t.liveOnline}</span>
                  </div>
                </div>

                {/* Window Body Grid */}
                <div className="grid grid-cols-12 min-h-[300px]" dir={isRtl ? 'rtl' : 'ltr'}>
                  {/* Left/Sidebar */}
                  <aside className="col-span-2 bg-[#092657] border-e border-white/10 p-2 flex flex-col gap-2">
                    <div className="w-full h-7 rounded-lg bg-white/20 flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-[16px]">storefront</span>
                    </div>
                    <div className="w-full h-7 rounded-lg bg-white/10 flex items-center justify-center text-sky-400">
                      <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                    </div>
                    <div className="w-full h-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
                      <span className="material-symbols-outlined text-[16px]">payments</span>
                    </div>
                    <div className="w-full h-7 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
                      <span className="material-symbols-outlined text-[16px]">analytics</span>
                    </div>
                  </aside>

                  {/* Content Area */}
                  <div className="col-span-10 p-3 sm:p-4 bg-[#050d23]/90 flex flex-col gap-3">
                    {/* Search & Cart Bar */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 gap-2">
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#171f35] text-slate-400 text-xs flex-1 min-w-0">
                        <span className="material-symbols-outlined text-[14px] shrink-0">search</span>
                        <span className="text-[10px] truncate">{t.searchDemo}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="relative flex items-center justify-center w-7 h-7 rounded bg-[#111c3d] border border-white/10 cursor-pointer">
                          <span className="material-symbols-outlined text-sky-400 text-[16px]">shopping_bag</span>
                          <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">
                            {cartCount}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold whitespace-nowrap">
                          {t.gatewayActive}
                        </span>
                      </div>
                    </div>

                    {/* Promotional Banner */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-blue-600/30 via-sky-500/20 to-blue-600/20 border border-white/15 flex items-center justify-between gap-2">
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded bg-amber-400 text-black text-[9px] font-bold">{t.promoBadge}</span>
                          <span className="text-sky-300 text-[11px] font-bold">{t.promoTitle}</span>
                        </div>
                        <span className="text-[10px] text-slate-300 truncate">{t.promoDesc}</span>
                      </div>
                      <span className="material-symbols-outlined text-amber-400 text-[24px] sm:text-[28px] shrink-0">redeem</span>
                    </div>

                    {/* 3 Interactive Product Cards */}
                    <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-2 pt-1">
                      {/* Product 1 */}
                      <div className="p-2 rounded-xl bg-[#171f35] border border-white/10 flex flex-col justify-between gap-1.5 hover:border-sky-400/50 transition-all">
                        <div className="h-12 sm:h-14 rounded bg-white/5 flex items-center justify-center relative">
                          <span className="material-symbols-outlined text-sky-400 text-[22px] sm:text-[24px]">devices</span>
                          <span className="absolute top-1 start-1 px-1 rounded bg-emerald-500 text-white text-[8px] font-bold">{t.product1Badge}</span>
                        </div>
                        <div className="text-[11px] font-bold truncate">{t.product1Title}</div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                          <span className="text-amber-400 font-bold">۴.۹ ★</span>
                          <span className="text-sky-300">{t.product1Price}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddToCart(t.product1Title)}
                          className="w-full py-1 rounded bg-white/10 hover:bg-sky-500 hover:text-white text-[10px] font-bold text-sky-300 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[12px]">add_shopping_cart</span>
                          <span>{t.addToCart}</span>
                        </button>
                      </div>

                      {/* Product 2 */}
                      <div className="p-2 rounded-xl bg-[#171f35] border border-amber-400/40 flex flex-col justify-between gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                        <div className="h-12 sm:h-14 rounded bg-white/5 flex items-center justify-center relative">
                          <span className="material-symbols-outlined text-amber-400 text-[22px] sm:text-[24px]">watch</span>
                          <span className="absolute top-1 start-1 px-1 rounded bg-rose-500 text-white text-[8px] font-bold">{t.product2Badge}</span>
                        </div>
                        <div className="text-[11px] font-bold truncate">{t.product2Title}</div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                          <span className="text-amber-400 font-bold">۵.۰ ★</span>
                          <span className="text-amber-400">{t.product2Price}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddToCart(t.product2Title)}
                          className="w-full py-1 rounded bg-amber-400 hover:bg-amber-300 text-black text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[12px]">shopping_cart_checkout</span>
                          <span>{t.buyNow}</span>
                        </button>
                      </div>

                      {/* Product 3 */}
                      <div className="p-2 rounded-xl bg-[#171f35] border border-white/10 flex flex-col justify-between gap-1.5 hover:border-sky-400/50 transition-all">
                        <div className="h-12 sm:h-14 rounded bg-white/5 flex items-center justify-center relative">
                          <span className="material-symbols-outlined text-emerald-400 text-[22px] sm:text-[24px]">headphones</span>
                          <span className="absolute top-1 start-1 px-1 rounded bg-sky-400 text-black text-[8px] font-bold">{t.product3Badge}</span>
                        </div>
                        <div className="text-[11px] font-bold truncate">{t.product3Title}</div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                          <span className="text-amber-400 font-bold">۴.۸ ★</span>
                          <span className="text-sky-300">{t.product3Price}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddToCart(t.product3Title)}
                          className="w-full py-1 rounded bg-white/10 hover:bg-sky-500 hover:text-white text-[10px] font-bold text-sky-300 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[12px]">add_shopping_cart</span>
                          <span>{t.addToCart}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Column (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6 order-1 lg:order-2">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight text-balance">
              {t.title}
              <span className="block text-sky-400 mt-2">{t.titleHighlight}</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {t.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400 text-[18px]">hub</span>
                <span>{t.tagTorob}</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-[18px]">credit_card</span>
                <span>{t.tagSnappPay}</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
                <span>{t.tagGateway}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenConsultModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>{t.ctaPreview}</span>
                <span className="material-symbols-outlined text-[18px]">
                  {isRtl ? 'arrow_back' : 'arrow_forward'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('pricing-calculator')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold backdrop-blur-md transition-all cursor-pointer active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-amber-400 text-[18px]">calculate</span>
                <span>{t.ctaCalculate}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
