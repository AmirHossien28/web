import React, { useState } from 'react';
import { PageId, ArticleItem } from '../../types';
import { ARTICLES_DATA } from '../../data/articles';

interface BlogSectionProps {
  isLightMode: boolean;
  onNavigate: (page: PageId) => void;
  onSelectArticle?: (article: ArticleItem) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  isLightMode,
  onNavigate,
  onSelectArticle,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ui-ux' | 'seo-ai' | 'ecommerce'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const categories = [
    { key: 'all', label: 'همه مقالات' },
    { key: 'ui-ux', label: 'طراحی سایت و UI/UX' },
    { key: 'seo-ai', label: 'سئو و هوش مصنوعی' },
    { key: 'ecommerce', label: 'فروشگاه اینترنتی' },
  ];

  const filteredArticles = activeTab === 'all'
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter(a => a.categoryKey === activeTab);

  const featuredArticle = filteredArticles[0] || ARTICLES_DATA[0];
  const secondaryArticles = filteredArticles.slice(1);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
  };

  return (
    <section className="w-full py-20 border-b border-white/5" id="insights-blog">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border w-fit text-xs backdrop-blur-md ${
              isLightMode ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-[#111c3d] text-amber-400 border-white/10'
            }`}>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-bold">مجله تخصصی و مقالات علاءالدین</span>
              <span className="opacity-40">|</span>
              <span>بینش‌های رشد کسب‌وکار آنلاین</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              دانش، استراتژی و ترندهای روز طراحی وب و DXP
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              تحلیل‌های عمیق فنی، تکنیک‌های عملی سئو، راهنمای افزایش نرخ تبدیل فروشگاه‌ها و کاربرد هوش مصنوعی در وب به قلم تیم مهندسی علاءالدین.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('knowledge-blog')}
            className={`group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer w-full sm:w-auto shrink-0 active:scale-95 ${
              isLightMode
                ? 'bg-white border-slate-200 text-blue-600 hover:bg-slate-50'
                : 'bg-[#111c3d] border-white/10 text-sky-400 hover:bg-[#182852] hover:text-white'
            }`}
          >
            <span>مشاهده همه مقالات (۸۵+)</span>
            <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap mb-8 sm:mb-10 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveTab(cat.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                activeTab === cat.key
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : isLightMode
                    ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    : 'bg-[#0b1329] text-slate-300 hover:bg-[#171f35] border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2-Column Layout: Articles (8 cols) + Sidebar Trending & Newsletter (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Articles Area (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Featured Article Card */}
            {featuredArticle && (
              <div className={`group rounded-3xl border p-5 lg:p-6 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
              }`}>
                <div className="flex flex-col">
                  <div className="relative rounded-2xl overflow-hidden h-64 sm:h-72 bg-slate-800 mb-5">
                    <img
                      src={featuredArticle.img}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-transparent opacity-75" />

                    <div className="absolute top-3 start-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-bold shadow-lg flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">hotel_class</span>
                        <span>مقاله منتخب ماه</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#111c3d]/90 text-sky-400 text-[10px] font-mono border border-white/10">
                        {featuredArticle.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-xs text-slate-300 bg-[#050d23]/80 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sky-400 text-[16px]">schedule</span>
                        <span>زمان مطالعه: {featuredArticle.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-400 text-[16px]">verified</span>
                        <span>بروزرسانی: {featuredArticle.date}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-sky-400 transition-colors leading-snug">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#171f35] flex items-center justify-center border border-white/10">
                      <span className="material-symbols-outlined text-sky-400 text-[16px]">edit_note</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{featuredArticle.author}</span>
                      <span className="text-[10px] text-slate-400 font-mono">توسعه محصول و سئو</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectArticle) onSelectArticle(featuredArticle);
                      onNavigate('knowledge-blog');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>مطالعه کامل مقاله</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  </button>
                </div>
              </div>
            )}

            {/* Secondary Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {secondaryArticles.map((article) => (
                <div
                  key={article.id}
                  className={`group rounded-2xl border p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md ${
                    isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="relative rounded-xl overflow-hidden h-40 bg-slate-800 mb-3">
                      <img
                        src={article.img}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 start-2">
                        <span className="text-[10px] font-mono text-sky-400 bg-[#0b1329]/90 px-2 py-0.5 rounded border border-white/10">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-1.5 text-[11px] text-slate-400">
                      <span className="material-symbols-outlined text-sky-400 text-[14px]">schedule</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h4 className="text-sm font-bold group-hover:text-sky-400 transition-colors mb-2 leading-snug line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {article.views} بازدید
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectArticle) onSelectArticle(article);
                        onNavigate('knowledge-blog');
                      }}
                      className="text-xs text-sky-400 hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>مطالعه</span>
                      <span className="material-symbols-outlined text-[14px]">chevron_left</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Trending Articles & Newsletter (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Trending Articles List */}
            <div className={`rounded-3xl border p-6 shadow-xl ${
              isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
            }`}>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400 text-[20px]">trending_up</span>
                  <h3 className="text-sm font-bold">پربازدیدترین مقالات هفته</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">Hot</span>
              </div>

              <div className="flex flex-col gap-3">
                {ARTICLES_DATA.map((article, idx) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => {
                      if (onSelectArticle) onSelectArticle(article);
                      onNavigate('knowledge-blog');
                    }}
                    className={`flex items-start gap-3 p-2 rounded-xl transition-all text-start cursor-pointer group ${
                      isLightMode ? 'hover:bg-slate-100' : 'hover:bg-[#171f35]'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#171f35] text-sky-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {idx + 1}
                    </span>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h4 className="text-xs font-semibold group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {article.views} بازدید · {article.readTime}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Weekly Newsletter Widget */}
            <div className="rounded-3xl border border-blue-500/30 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between gap-4"
              style={{
                background: 'linear-gradient(135deg, #111c3d 0%, #0b1329 50%, #171f35 100%)',
              }}
            >
              <div className="flex flex-col gap-2 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sky-400 text-[22px]">mark_email_read</span>
                </div>
                <h4 className="text-sm font-bold text-white">خبرنامه تخصصی رشد وب</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  هفته‌ای یک‌بار، گزیده‌ای از بهترین ترفندهای عملی طراحی، سئو و توسعه فروشگاه را در ایمیل خود دریافت کنید.
                </p>
              </div>

              {newsletterSubscribed ? (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-semibold">
                  ایمیل شما با موفقیت در خبرنامه ثبت گردید!
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col gap-2 relative z-10">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="ایمیل کاری خود را وارد کنید..."
                    className="w-full h-11 px-3 rounded-xl bg-[#060a14] border border-white/15 text-white text-xs outline-none focus:border-sky-400 transition-all placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>عضویت در خبرنامه علاءالدین</span>
                  </button>
                  <span className="text-[10px] text-slate-400 text-center">
                    بدون ارسال پیام‌های تبلیغاتی مزاحم یا هرزنامه.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
