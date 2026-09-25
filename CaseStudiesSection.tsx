import React from 'react';
import { ProjectItem } from '../../types';
import { PROJECTS_DATA } from '../../data/projects';

interface CaseStudiesSectionProps {
  isLightMode: boolean;
  onSelectProject: (project: ProjectItem) => void;
  onOpenConsultModal: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  isLightMode,
  onSelectProject,
  onOpenConsultModal,
}) => {
  const adakProject = PROJECTS_DATA[0];
  const secondaryProjects = PROJECTS_DATA.slice(1, 4);

  return (
    <section className={`w-full py-20 transition-colors duration-300 ${
      isLightMode ? 'bg-slate-50' : 'bg-[#050d23]'
    }`} id="projects-showcase">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                پروژه‌های شاخص اجراشده
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              قبل از تصمیم‌گیری، کیفیت اجرا را ببینید
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              نمونه‌کارهای ما برای حوزه‌های مختلف صنعتی، خدماتی و شرکتی اجرا شده‌اند و می‌توانید دید بهتری از سطح طراحی و ساختار پروژه بدهند.
            </p>
          </div>

          <div className={`p-3 rounded-2xl border flex items-center gap-3 w-full sm:w-auto shrink-0 shadow-sm ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
          }`}>
            <span className="material-symbols-outlined text-sky-400 text-[28px]">workspace_premium</span>
            <div className="flex flex-col">
              <span className={`font-mono text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>۱,۲۴۰+</span>
              <span className="text-[10px] text-slate-400">پروژه موفق از سال ۱۳۹۲</span>
            </div>
          </div>
        </div>

        {/* Bento Grid: 1 Big Spotlight (7 cols) + 3 Mosaics (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Big Spotlight: Adak Steel */}
          <div className={`lg:col-span-7 rounded-3xl border p-6 lg:p-8 flex flex-col justify-between shadow-2xl transition-all ${
            isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/15'
          }`}>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-400/20">
                    {adakProject.category}
                  </span>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="font-mono text-xs text-slate-400" dir="ltr">{adakProject.domain}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  {adakProject.leadResult}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                {adakProject.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                {adakProject.description}
              </p>

              {/* Main Visual Image Banner */}
              <div
                onClick={() => onSelectProject(adakProject)}
                className="relative rounded-2xl overflow-hidden shadow-xl h-72 sm:h-80 bg-slate-800 mb-6 cursor-pointer group"
              >
                <img
                  src={adakProject.img}
                  alt={adakProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-transparent opacity-60" />

                {/* Floating Metrics Pill Bar */}
                <div className="absolute bottom-2 sm:bottom-4 inset-x-2 sm:inset-x-4 p-2 sm:p-3 rounded-xl bg-[#111c3d]/95 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-around text-center">
                  <div className="flex flex-col min-w-0 px-1">
                    <span className="font-mono text-base sm:text-lg font-bold text-sky-400">{adakProject.speed}</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 truncate">زمان لود صفحه</span>
                  </div>
                  <div className="h-6 w-px bg-white/10 shrink-0" />
                  <div className="flex flex-col min-w-0 px-1">
                    <span className="font-mono text-base sm:text-lg font-bold text-amber-400">رتبه ۱ گوگل</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 truncate">استعلام میلگرد</span>
                  </div>
                  <div className="h-6 w-px bg-white/10 shrink-0" />
                  <div className="flex flex-col min-w-0 px-1">
                    <span className="font-mono text-base sm:text-lg font-bold text-emerald-400">۱۰۰٪ سازگار</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 truncate">موبایل و تبلت</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-400">مدت اجرای پروژه: {adakProject.executionTime}</span>
              <button
                type="button"
                onClick={() => onSelectProject(adakProject)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>مشاهده جزئیات کامل و تست دمو</span>
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              </button>
            </div>
          </div>

          {/* 3 Secondary Case Studies Mosaic (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {secondaryProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group rounded-2xl border p-4 shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${
                  isLightMode
                    ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl'
                    : 'bg-[#0b1329] border-white/10 hover:border-sky-400/50 hover:shadow-xl'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-800">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-400/20">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 truncate" dir="ltr">
                        {project.domain}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold truncate group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h4>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-emerald-400">
                    {project.leadResult}
                  </span>
                  <span className="text-xs text-sky-400 group-hover:underline flex items-center gap-0.5 font-semibold">
                    <span>بررسی آنلاین کیس</span>
                    <span className="material-symbols-outlined text-[14px]">chevron_left</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
