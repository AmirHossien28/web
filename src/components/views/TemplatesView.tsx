import React, { useState } from 'react';
import { TemplateItem, ProjectItem } from '../../types';
import { TEMPLATES_DATA } from '../../data/templates';

interface TemplatesViewProps {
  isLightMode: boolean;
  onPreviewTemplate: (project: ProjectItem) => void;
  onOpenConsultModal: () => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  isLightMode,
  onPreviewTemplate,
  onOpenConsultModal,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const categories = [
    { id: 'all', label: 'همه قالب‌ها' },
    { id: 'ecommerce', label: 'فروشگاهی و آنلاین‌شاپ' },
    { id: 'corporate', label: 'شرکتی و هلدینگ' },
    { id: 'medical', label: 'پزشکی و کلینیک' },
    { id: 'industrial', label: 'صنعتی و کارخانجات' },
  ];

  const filtered = TEMPLATES_DATA.filter((tmpl) => {
    const matchesCat = filterCategory === 'all' || tmpl.category === filterCategory;
    const matchesSearch = tmpl.title.includes(search) || tmpl.description.includes(search);
    return matchesCat && matchesSearch;
  });

  const handleOpenPreview = (tmpl: TemplateItem) => {
    const simulatedProject: ProjectItem = {
      id: tmpl.id,
      title: tmpl.title,
      category: tmpl.categoryLabel,
      domain: `${tmpl.id}.webaladdin.ir`,
      url: `https://${tmpl.id}.webaladdin.ir`,
      img: tmpl.img,
      description: tmpl.description,
      leadResult: tmpl.tagline,
      speed: '۰.۸ ثانیه',
      googleRank: 'استاندارد سئو ۹۹',
      mobileScore: '۱۰۰٪ ریسپانسیو',
      industry: tmpl.categoryLabel,
      technologies: tmpl.tags,
      languages: ['fa', 'en'],
      executionTime: `${tmpl.deliveryDays} روز کاری`,
    };
    onPreviewTemplate(simulatedProject);
  };

  return (
    <div className="w-full py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-sky-400 border border-sky-400/20 text-xs font-bold mb-3">
          <span className="material-symbols-outlined text-[16px]">web</span>
          <span>کاتالوگ قالب‌های اختصاصی، سریع و تست‌شده</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          قالب‌های آماده با تحویل سریع ۳ تا ۵ روز کاری
        </h1>
        <p className="text-sm text-slate-400">
          تمام قالب‌ها از پیش بهینه‌سازی شده، دارای سئو تکنیکال و بدون کد اضافی بوده و با بارگذاری کامل محتوای شما تحویل می‌گردند.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilterCategory(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterCategory === c.id
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
            placeholder="جستجو در قالب‌ها..."
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tmpl) => (
          <div
            key={tmpl.id}
            className={`group rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-lg ${
              isLightMode ? 'bg-white border-slate-200 hover:shadow-2xl' : 'bg-[#0b1329] border-white/10 hover:shadow-2xl'
            }`}
          >
            <div className="relative h-64 bg-slate-900 overflow-hidden">
              <img
                src={tmpl.img}
                alt={tmpl.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 end-3 flex gap-1">
                <span className="text-[10px] text-white bg-blue-600/90 px-2 py-0.5 rounded font-mono">
                  تحویل {tmpl.deliveryDays} روزه
                </span>
                <span className="text-[10px] text-emerald-400 bg-[#111c3d]/90 px-2 py-0.5 rounded font-mono">
                  {tmpl.techStack.split('/')[0]}
                </span>
              </div>

              <div className="absolute inset-0 bg-[#080d1a]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => handleOpenPreview(tmpl)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  پیش‌نمایش در ۳ دستگاه
                </button>
                <button
                  type="button"
                  onClick={onOpenConsultModal}
                  className="px-3.5 py-2 rounded-xl bg-[#171f35] hover:bg-[#222940] text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer"
                >
                  سفارش این قالب
                </button>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400">{tmpl.categoryLabel}</span>
                <div className="flex items-center text-amber-400 text-xs font-mono font-bold">
                  <span className="material-symbols-outlined text-[16px]">star</span>
                  <span className="ms-1">{tmpl.rating}</span>
                </div>
              </div>

              <h3 className="text-base font-bold group-hover:text-sky-400 transition-colors">
                {tmpl.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {tmpl.description}
              </p>

              <div className="flex flex-col gap-1.5 pt-2 border-t border-white/5 text-[11px] text-slate-300">
                {tmpl.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-400 text-[14px]">check</span>
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 mt-1 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500">قیمت پکیج کامل:</span>
                  <span className="font-mono text-sm font-bold text-sky-400">
                    {tmpl.price.toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenPreview(tmpl)}
                  className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-white font-bold transition-colors cursor-pointer"
                >
                  <span>بررسی آنلاین</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_back</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
