import React from 'react';
import { PageId, LocaleKey } from '../../types';
import { I18N_DATA } from '../../data/i18n';

interface MobileBottomBarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenConsultModal?: () => void;
  isLightMode: boolean;
  currentLocale: LocaleKey;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentPage,
  onNavigate,
  isLightMode,
  currentLocale,
}) => {
  const content = I18N_DATA[currentLocale];
  const isServicesActive = currentPage === 'services' || currentPage.includes('-web-design');

  const navItems = [
    {
      id: 'home' as PageId,
      isActive: currentPage === 'home',
      label: content.nav.home,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[1.35rem] h-[1.35rem] shrink-0 transition-transform duration-200"
        >
          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
          <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>
      ),
    },
    {
      id: 'services' as PageId,
      isActive: isServicesActive,
      label: content.nav.services,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[1.35rem] h-[1.35rem] shrink-0 transition-transform duration-200"
        >
          <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
        </svg>
      ),
    },
    {
      id: 'pricing-calculator' as PageId,
      isActive: currentPage === 'pricing-calculator',
      label: content.nav.pricing,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[1.35rem] h-[1.35rem] shrink-0 transition-transform duration-200"
        >
          <path
            fillRule="evenodd"
            d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 'portfolio' as PageId,
      isActive: currentPage === 'portfolio',
      label: content.nav.portfolio,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[1.35rem] h-[1.35rem] shrink-0 transition-transform duration-200"
        >
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path
            fillRule="evenodd"
            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 pointer-events-none xl:hidden flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2"
    >
      <nav
        aria-label="ناوبری سریع موبایل"
        className={`pointer-events-auto relative w-full max-w-[480px] p-2 flex items-center justify-center gap-2 rounded-[99rem] transition-all duration-300 ${
          isLightMode
            ? 'bg-blue-600/40 border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.08),inset_2px_2px_5px_-2px_rgba(255,255,255,0.7),inset_-2px_-2px_5px_2px_rgba(255,255,255,0.5),inset_0_-2px_0_rgba(255,255,255,0.4)] backdrop-blur-xl'
            : 'bg-[#007aff]/35 border border-sky-400/35 shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_2px_2px_5px_-2px_rgba(255,255,255,0.45),inset_-2px_-2px_5px_2px_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(255,255,255,0.2)] backdrop-blur-xl'
        }`}
        style={{
          backdropFilter: 'blur(16px) saturate(190%) contrast(150%)',
          WebkitBackdropFilter: 'blur(16px) saturate(190%) contrast(150%)',
        }}
      >
        {navItems.map((item) => {
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`group relative flex flex-1 flex-col items-center justify-center min-w-0 py-2.5 px-1.5 rounded-[999rem] transition-all duration-200 cursor-pointer select-none active:scale-[0.96] ${
                item.isActive
                  ? isLightMode
                    ? 'bg-[#ededed]/95 text-[#0066ff] font-bold shadow-[inset_2px_2px_5px_-2px_rgba(255,255,255,0.8),inset_-2px_-1px_5px_0_rgba(0,0,0,0.1),0_4px_14px_rgba(0,102,255,0.3)]'
                    : 'bg-[#ededed]/90 text-[#0052cc] font-bold shadow-[inset_2px_2px_5px_-2px_rgba(255,255,255,0.9),inset_-2px_-1px_5px_0_rgba(0,0,0,0.15),0_0_20px_rgba(255,255,255,0.45)]'
                  : 'text-white/90 hover:text-[#007aff] hover:bg-white/30 hover:shadow-[inset_2px_2px_5px_-2px_rgba(255,255,255,0.45),inset_-2px_-1px_5px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(255,255,255,0.2)] hover:rotate-[1.5deg]'
              }`}
            >
              {/* Icon Container with subtle scale on hover/active */}
              <div className="relative flex items-center justify-center">
                {item.icon}
                {item.isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] absolute -top-1 -end-1 shadow-[0_0_8px_#0066ff]" />
                )}
              </div>

              {/* Title Text */}
              <span
                className={`text-[0.8rem] font-semibold mt-1 leading-none tracking-tight truncate max-w-full text-center transition-colors duration-200 ${
                  item.isActive ? 'font-bold' : ''
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
