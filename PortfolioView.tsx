import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../../types';
import { PROJECTS_DATA } from '../../data/projects';

interface PortfolioViewProps {
  isLightMode: boolean;
  onSelectProject: (project: ProjectItem) => void;
  onOpenConsultModal: () => void;
  targetProjectId?: string | null;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  isLightMode,
  onSelectProject,
  onOpenConsultModal,
  targetProjectId,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [highlightedId, setHighlightedId] = useState<string | null>(targetProjectId || null);

  useEffect(() => {
    if (targetProjectId) {
      setHighlightedId(targetProjectId);
      // Ensure the project is visible in category filter
      const targetProj = PROJECTS_DATA.find((p) => p.id === targetProjectId);
      if (targetProj) {
        setFilterCategory('all');
      }

      // Smooth scroll to the project card after render
      const timer = setTimeout(() => {
        const el = document.getElementById(`project-${targetProjectId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);

      // Fade highlight badge after 6 seconds
      const clearTimer = setTimeout(() => {
        setHighlightedId(null);
      }, 6000);

      return () => {
        clearTimeout(timer);
        clearTimeout(clearTimer);
      };
    }
  }, [targetProjectId]);

  const categories = [
    { id: 'all', label: 'همه پروژه‌ها' },
    { id: 'صنعتی و بازرگانی', label: 'صنعتی و کارخانجات' },
    { id: 'فروشگاه اینترنتی B2C / B2B', label: 'فروشگاه‌های آنلاین' },
    { id: 'خدماتی و دکوراسیون', label: 'خدماتی و معماری' },
    { id: 'صادراتی و چندزبانه', label: 'صادراتی و چندزبانه' },
    { id: 'پزشکی و رزرواسیون', label: 'پزشکی و نوبت‌دهی' },
  ];

  const filtered = PROJECTS_DATA.filter((item) => {
    const matchesCat = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.industry.toLowerCase().includes(search.toLowerCase()) ||
      item.domain.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-400/20 text-xs font-bold mb-3">
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          <span>آرشیو نمونه‌کارهای فعال و مهندسی‌شده علاءالدین</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          نمونه‌کارها و پروژه‌های شاخص ما
        </h1>
        <p className="text-sm text-slate-400">
          برای تجربه محیط کاربری واقعی، روی هر کدام از پروژه‌ها کلیک کنید تا در شبیه‌ساز ۳ سایز (دسکتاپ، تبلت و موبایل) اجرا شوند.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap md:flex-wrap pb-1 md:pb-0 w-full md:w-auto -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilterCategory(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
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

        {/* Search */}
        <div className="relative w-full md:w-64 shrink-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در نام، صنف یا دامنه..."
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => {
          const isTarget = highlightedId === project.id;
          return (
            <div
              key={project.id}
              id={`project-${project.id}`}
              onClick={() => onSelectProject(project)}
              className={`group rounded-3xl border overflow-hidden p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-md relative ${
                isTarget
                  ? 'ring-2 ring-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.35)] scale-[1.01]'
                  : ''
              } ${
                isLightMode
                  ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-2xl'
                  : 'bg-[#0b1329] border-white/10 hover:border-sky-400/50 hover:shadow-2xl'
              }`}
            >
              {/* Highlight Ribbon if navigated here from preview */}
              {isTarget && (
                <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[11px] font-bold text-center py-1 z-20 shadow-sm animate-pulse flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">verified</span>
                  <span>نمونه‌کار انتخاب‌شده شما</span>
                </div>
              )}

              <div className="flex flex-col">
                {/* Image Preview Box */}
                <div className={`relative h-56 rounded-2xl overflow-hidden bg-slate-800 mb-4 ${isTarget ? 'mt-4' : ''}`}>
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-transparent opacity-70" />

                  <div className="absolute top-3 start-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111c3d]/90 text-sky-400 font-mono text-[10px] font-bold border border-white/10 backdrop-blur-md">
                    <span className="material-symbols-outlined text-[13px]">speed</span>
                    <span>{project.speed}</span>
                  </div>

                  <div className="absolute top-3 end-3 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold font-mono backdrop-blur-md">
                    Active
                  </div>

                  <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-[11px] text-slate-300 bg-[#050d23]/80 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
                    <span className="truncate">{project.industry}</span>
                    <span className="font-mono text-emerald-400 font-bold" dir="ltr">{project.domain}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-sky-400 font-bold">{project.category}</span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">{project.leadResult}</span>
                </div>

                <h3 className="text-base font-bold mb-2 group-hover:text-sky-400 transition-colors line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">تحویل: {project.executionTime}</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">devices</span>
                  <span>پیش‌نمایش تعاملی</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
