import React, { useState } from 'react';
import { TemplateItem, ProjectItem } from '../../types';
import { TEMPLATES_DATA } from '../../data/templates';

interface TemplatesShowcaseProps {
  isLightMode: boolean;
  onPreviewTemplate: (project: ProjectItem) => void;
  onOpenConsultModal: () => void;
}

export const TemplatesShowcase: React.FC<TemplatesShowcaseProps> = ({
  isLightMode,
  onPreviewTemplate,
  onOpenConsultModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ecommerce' | 'industrial' | 'medical' | 'corporate'>('all');

  const categories = [
    { key: 'all', label: 'همه دموها' },
    { key: 'ecommerce', label: 'فروشگاهی و آنلاین‌شاپ' },
    { key: 'industrial', label: 'صنعتی و کارخانجات' },
    { key: 'medical', label: 'پزشکی و کلینیک' },
    { key: 'corporate', label: 'شرکتی و بازرگانی' },
  ];

  const filteredTemplates = activeCategory === 'all'
    ? TEMPLATES_DATA
    : TEMPLATES_DATA.filter(t => t.category === activeCategory);

  const handleOpenPreview = (tmpl: TemplateItem) => {
    // Map template to simulated project item for the interactive preview modal
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
    <section className="w-full py-20 border-b border-white/5" id="templateTabs">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          <span className={`text-xs font-bold px-3.5 py-1 rounded-full mb-3 border ${
            isLightMode ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-[#111c3d] text-sky-400 border-white/10'
          }`}>
            تجربه لمس کار قبل از شروع قرارداد
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
            طرح و ظاهر خروجی کار خود را دقیقاً ببینید
          </h2>
          <p className="text-sm text-slate-400">
            شما می‌توانید از بین چیدمان‌های تست‌شده در صنایع مختلف، ظاهر و کاربری مدنظرتان را انتخاب کنید یا درخواست سفارشی‌سازی کامل بدهید.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center mb-8 sm:mb-12 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                activeCategory === cat.key
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

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`group rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg ${
                isLightMode ? 'bg-white border-slate-200 hover:shadow-2xl' : 'bg-[#0b1329] border-white/10 hover:shadow-2xl'
              }`}
            >
              {/* Media Preview Box with Hover Actions */}
              <div className="relative h-64 bg-slate-900 overflow-hidden">
                <img
                  src={template.img}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Top Badges */}
                <div className="absolute top-3 end-3 flex gap-1">
                  <span className="text-[10px] text-white bg-blue-600/90 px-2 py-0.5 rounded backdrop-blur font-mono">
                    {template.tags[0] || 'Next.js 14'}
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-[#111c3d]/90 px-2 py-0.5 rounded backdrop-blur font-mono">
                    {template.tags[1] || 'لود ۰.۸ ثانیه'}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#080d1a]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => handleOpenPreview(template)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  >
                    پیش‌نمایش زنده در ۳ دیوایس
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

              {/* Card Body */}
              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-sky-400">{template.tagline}</span>
                  <div className="flex items-center text-amber-400 text-xs font-mono font-bold">
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    <span className="ms-1">{template.rating}</span>
                    <span className="text-slate-400 text-[10px] ms-1">({template.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="text-base font-bold group-hover:text-sky-400 transition-colors">
                  {template.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {template.description}
                </p>

                {/* Feature Bullets */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-white/5 text-[11px] text-slate-300">
                  {template.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-emerald-400 text-[14px]">check</span>
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 mt-1 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500">قیمت پکیج کامل:</span>
                    <span className="font-mono text-sm font-bold text-sky-400">
                      {template.price.toLocaleString('fa-IR')} تومان
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenPreview(template)}
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
    </section>
  );
};
