import React from 'react';
import { ProjectItem, PageId } from '../../types';
import { PROJECTS_DATA } from '../../data/projects';

interface LiveTickerProps {
  isLightMode: boolean;
  onSelectProject: (project: ProjectItem) => void;
  onNavigate: (page: PageId) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({
  isLightMode,
  onSelectProject,
  onNavigate,
}) => {
  const showcaseProjects = PROJECTS_DATA.slice(0, 4);

  return (
    <section className="w-full pt-4 pb-14 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border w-fit text-xs backdrop-blur-md ${
              isLightMode ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-[#111c3d] border-white/10 text-slate-300'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sky-400 font-bold">پایش عملکرد زنده وب‌سایت‌های تحویل‌شده</span>
              <span className="text-[10px] font-mono text-slate-400">| Uptime 99.9%</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold">
              خروجی واقعی پروژه‌های علاءالدین در حال سرویس‌دهی آنلاین
            </h3>
            <p className="text-xs text-slate-400">
              مشاهده رفتار واقعی، تست لود زیر ۱ ثانیه و استانداردهای طراحی در پروژه‌های فعال صنعتی، فروشگاهی و صادراتی
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className={`group inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer w-full sm:w-auto shrink-0 active:scale-95 ${
              isLightMode
                ? 'bg-white border-slate-200 text-blue-600 hover:bg-slate-50'
                : 'bg-[#111c3d] border-white/10 text-sky-400 hover:bg-[#182852] hover:text-white'
            }`}
          >
            <span>مشاهده آرشیو ۱۲۰+ پروژه فعال</span>
            <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
          </button>
        </div>

        {/* 4 Live Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {showcaseProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`group relative rounded-2xl border p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-md backdrop-blur-md ${
                isLightMode
                  ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl'
                  : 'bg-[#0b1329]/95 border-white/10 hover:border-sky-400/50 hover:shadow-[0_12px_32px_rgba(0,18,48,0.7)]'
              }`}
            >
              <div className="flex flex-col">
                {/* Simulated Mini Browser Chrome */}
                <div className={`rounded-xl overflow-hidden border shadow-inner ${
                  isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-[#050d23] border-white/10'
                }`}>
                  <div className={`h-7 flex items-center justify-between px-2.5 border-b ${
                    isLightMode ? 'bg-slate-200/80 border-slate-300' : 'bg-[#171f35] border-white/5'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm" />
                      <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />
                    </div>
                    <div className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 border ${
                      isLightMode ? 'bg-white border-slate-200 text-slate-600' : 'bg-[#050d23] border-white/5 text-slate-300'
                    }`}>
                      <span className="material-symbols-outlined text-[11px] text-emerald-400">lock</span>
                      <span dir="ltr">{project.domain}</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative h-44 bg-slate-800 overflow-hidden">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329]/95 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-2 start-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#182852]/90 border border-white/10 backdrop-blur-sm text-sky-400 text-[10px] font-mono font-bold">
                      <span className="material-symbols-outlined text-[12px]">speed</span>
                      <span>{project.speed}</span>
                    </div>

                    <div className="absolute top-2 end-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#182852]/90 border border-white/10 backdrop-blur-sm text-amber-400 text-[10px] font-mono font-bold">
                      <span className="material-symbols-outlined text-[12px]">trending_up</span>
                      <span>Google #1</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="pt-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold truncate group-hover:text-sky-400 transition-colors">
                        {project.title.split(' ').slice(0, 3).join(' ')}
                      </h4>
                      <span className="text-[9px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded font-bold border border-sky-400/20">
                        {project.category.split(' ')[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Online</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          isLightMode ? 'bg-slate-100 text-slate-600' : 'bg-[#171f35] text-slate-400'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between gap-1">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  {project.leadResult}
                </span>

                <button
                  type="button"
                  className="px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-white text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">visibility</span>
                  <span>مشاهده زنده</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
