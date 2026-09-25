import React, { useState } from 'react';
import { ArticleItem } from '../../types';
import { ARTICLES_DATA } from '../../data/articles';

interface BlogViewProps {
  isLightMode: boolean;
  onOpenConsultModal: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  isLightMode,
  onOpenConsultModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const categories = [
    { id: 'all', label: 'همه مقالات' },
    { id: 'ecommerce', label: 'تجارت الکترونیک' },
    { id: 'seo-ai', label: 'سئو و هوش مصنوعی' },
    { id: 'ui-ux', label: 'طراحی سایت و UI/UX' },
  ];

  const filtered = ARTICLES_DATA.filter(a => {
    const matchCat = activeCategory === 'all' || a.categoryKey === activeCategory;
    const matchSearch = a.title.includes(search) || a.summary.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div className="w-full py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-400/20 text-xs font-bold mb-3">
          <span className="material-symbols-outlined text-[16px]">menu_book</span>
          <span>دانشنامه تخصصی طراحی وب و استراتژی رشد دیجیتال</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          آموزش، مقالات و تحلیل‌های تخصصی وب
        </h1>
        <p className="text-sm text-slate-400">
          جدیدترین راهنماهای فنی، استانداردهای سئو تکنیکال و متدهای افزایش فروش آنلاین به قلم تیم مهندسی علاءالدین
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : isLightMode
                    ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    : 'bg-[#0b1329] text-slate-300 hover:bg-[#171f35] border border-white/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در مقالات..."
            className={`w-full h-10 ps-9 pe-3 rounded-xl text-xs outline-none border transition-all ${
              isLightMode
                ? 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                : 'bg-[#0b1329] border-white/10 text-white focus:border-sky-400'
            }`}
          />
          <span className="material-symbols-outlined text-slate-400 text-[18px] absolute inset-y-0 start-2.5 my-auto h-fit pointer-events-none">
            search
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className={`group rounded-3xl border overflow-hidden p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-md ${
              isLightMode
                ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-2xl'
                : 'bg-[#0b1329] border-white/10 hover:border-sky-400/50 hover:shadow-2xl'
            }`}
          >
            <div className="flex flex-col">
              <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-800 mb-4">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 start-2">
                  <span className="text-[10px] font-mono text-sky-400 bg-[#0b1329]/90 px-2.5 py-0.5 rounded-full border border-white/10">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2 text-[11px] text-slate-400">
                <span className="material-symbols-outlined text-sky-400 text-[15px]">schedule</span>
                <span>{article.readTime}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>

              <h3 className="text-base font-bold mb-2 group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                {article.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">{article.views} مطالعه</span>
              <span className="text-sky-400 group-hover:underline font-bold flex items-center gap-1">
                <span>مطالعه کامل</span>
                <span className="material-symbols-outlined text-[15px]">arrow_back</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div onClick={() => setSelectedArticle(null)} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0b1329] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-400/20">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-400">{selectedArticle.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-rose-500 hover:text-white flex items-center justify-center text-slate-400"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-snug">
              {selectedArticle.title}
            </h2>

            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-800 mb-6">
              <img src={selectedArticle.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed flex flex-col gap-4">
              <p className="font-semibold text-white">{selectedArticle.summary}</p>
              <p>
                در دنیای امروز، وب‌سایت‌ها صرفاً یک کاتالوگ آنلاین نیستند؛ بلکه هسته اصلی فروش و جذب سرنخ (Lead Generation) کسب‌وکار شما محسوب می‌شوند. اگر معماری پایه‌ای بر اساس سرعت بالا (LCP زیر ۱ ثانیه) و کدهای معنایی استوار نباشد، بیش از ۵۰٪ کاربران پیش از بارگذاری کامل صفحه، سایت را ترک می‌کنند.
              </p>
              <h4 className="text-base font-bold text-white mt-2">اصول سه‌گانه موفقیت فنی:</h4>
              <ul className="list-disc list-inside flex flex-col gap-1.5 text-slate-300">
                <li>استفاده از سیستم کشینگ هوشمند ابری و فشرده‌سازی خودکار عکس‌ها به WebP</li>
                <li>تزریق تگ‌های اسکیما Schema.org برای درک بهتر موتورهای جستجو و هوش مصنوعی</li>
                <li>بهینه‌سازی کامل نسخه موبایل و فرایند پرداخت تک‌مرحله‌ای بدون اتلاف وقت کاربر</li>
              </ul>
              <p>
                جهت پیاده‌سازی این استانداردها بر روی پروژه خود، می‌توانید با کارشناسان معماری علاءالدین تماس بگیرید.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">نویسنده: {selectedArticle.author}</span>
              <button
                type="button"
                onClick={() => { setSelectedArticle(null); onOpenConsultModal(); }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
              >
                درخواست مشاوره این موضوع
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
