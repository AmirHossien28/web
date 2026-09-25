import * as React from 'react';
import { Activity, LayoutDashboard, MonitorSmartphone, Smartphone, Users } from 'lucide-react';
import type { LocaleKey } from '../../types';
import { localiseDigits, ui } from '../../app/i18n';
import { homeCopy } from '../../app/homeCopy';
import { cx } from '../../design-system/tokens';

/**
 * Device showcase
 * --------------------------------------------------------------------------
 * The hero's visual argument: three CSS-drawn devices (laptop, tablet, phone)
 * with abstract but *truthful* screens — the KPI values are the same numbers
 * the trust strip publishes. No raster images, so it is crisp at any DPI and
 * inherits the theme. Callout pills name the four product lines.
 */

const Bar: React.FC<{ w: string; className?: string }> = ({ w, className }) => (
  <span className={cx('block h-1.5 rounded-full bg-ink/10', className)} style={{ width: w }} />
);

const Sparkline: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 64" preserveAspectRatio="none" aria-hidden="true" className={cx('h-full w-full', className)}>
    <defs>
      <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--ds-primitive-brand-400)" stopOpacity="0.45" />
        <stop offset="1" stopColor="var(--ds-primitive-brand-400)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0 50 C 20 46, 30 38, 45 40 S 70 30, 85 26 S 110 34, 125 22 S 150 14, 165 12 S 190 8, 200 6 L200 64 L0 64 Z"
      fill="url(#spark-fill)"
    />
    <path
      d="M0 50 C 20 46, 30 38, 45 40 S 70 30, 85 26 S 110 34, 125 22 S 150 14, 165 12 S 190 8, 200 6"
      fill="none"
      stroke="var(--ds-primitive-brand-400)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="200" cy="6" r="3" fill="var(--ds-primitive-cyan-400)" />
  </svg>
);

const Callout: React.FC<{ icon: React.ReactNode; label: string; className?: string }> = ({ icon, label, className }) => (
  <span
    className={cx(
      'absolute z-20 hidden h-8 items-center gap-1.5 whitespace-nowrap rounded-full glass px-3 text-[0.75rem] font-semibold text-ink shadow-md sm:inline-flex',
      className,
    )}
  >
    <span className="text-brand-ink">{icon}</span>
    {label}
  </span>
);

const fmt = (value: number, decimals: number | undefined, locale: LocaleKey) => {
  const raw = decimals ? value.toFixed(decimals) : String(value);
  const sep = locale === 'fa' || locale === 'ar' ? '٫' : '.';
  return localiseDigits(raw.replace('.', sep), locale);
};

export const DeviceShowcase: React.FC<{ locale: LocaleKey; className?: string }> = ({ locale, className }) => {
  const t = ui(locale);
  const stats = homeCopy(locale).trust.stats;
  const kpis = stats.slice(0, 3);

  return (
    <div className={cx('relative mx-auto w-full max-w-5xl select-none', className)} aria-hidden="true">
      {/* ground glow ------------------------------------------------------ */}
      <div className="pointer-events-none absolute inset-x-[10%] bottom-0 h-40 rounded-[100%] bg-glow-brand blur-3xl" />

      <div className="relative aspect-[16/10] w-full sm:aspect-[16/8]">
        {/* callouts -------------------------------------------------------- */}
        <Callout icon={<MonitorSmartphone size={13} />} label={t.showcase.web} className="start-[14%] top-[2%] animate-float" />
        <Callout icon={<LayoutDashboard size={13} />} label={t.showcase.dashboard} className="end-[8%] top-[6%] animate-float-slow" />
        <Callout icon={<Smartphone size={13} />} label={t.showcase.mobile} className="start-[1%] bottom-[28%] animate-float-slow" />
        <Callout icon={<Users size={13} />} label={t.showcase.portal} className="end-[2%] bottom-[24%] animate-float" />

        {/* laptop ----------------------------------------------------------- */}
        <div className="absolute inset-x-[16%] top-[12%] bottom-[8%]">
          <div className="relative h-[88%] overflow-hidden rounded-t-xl border border-glass-line-strong bg-raised shadow-xl glow-ring">
            {/* window chrome */}
            <div className="flex h-7 items-center gap-1.5 border-b border-line bg-surface px-3">
              <span className="size-2 rounded-full bg-danger-ink/70" />
              <span className="size-2 rounded-full bg-warning-ink/70" />
              <span className="size-2 rounded-full bg-success-ink/70" />
              <span className="ms-3 h-3.5 w-1/3 rounded-full bg-ink/5" />
              <span className="ms-auto inline-flex items-center gap-1 rounded-full bg-success px-1.5 py-px text-[0.5625rem] font-semibold text-success-ink">
                <span className="size-1 rounded-full bg-current animate-pulse-dot" />
                {t.showcase.live}
              </span>
            </div>
            <div className="flex h-[calc(100%-1.75rem)]">
              {/* sidebar */}
              <div className="hidden w-[15%] flex-col gap-2.5 border-e border-line bg-surface p-3 sm:flex">
                <span className="h-5 w-5 rounded-md bg-brand/80" />
                <Bar w="80%" className="mt-2 bg-brand/50" />
                <Bar w="65%" />
                <Bar w="72%" />
                <Bar w="55%" />
                <Bar w="68%" />
              </div>
              {/* main */}
              <div className="flex flex-1 flex-col gap-2 p-2.5 sm:gap-3 sm:p-4">
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {kpis.map(stat => (
                    <div key={stat.label} className="rounded-md border border-line bg-surface p-2 sm:p-3">
                      <span className="block truncate text-[0.5rem] text-ink-3 sm:text-[0.625rem]">{stat.label}</span>
                      <span data-numeric className="mt-1 block text-[0.75rem] font-bold text-ink sm:text-title-3">
                        {stat.prefix ?? ''}
                        {fmt(stat.value, stat.decimals, locale)}
                        {stat.suffix ?? ''}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-3">
                  <div className="col-span-2 flex flex-col rounded-md border border-line bg-surface p-2 sm:p-3">
                    <div className="flex items-center justify-between">
                      <Bar w="35%" />
                      <span className="inline-flex items-center gap-1 text-[0.5625rem] font-semibold text-success-ink">
                        <Activity size={10} />
                        {localiseDigits('+38%', locale)}
                      </span>
                    </div>
                    <div className="mt-2 min-h-0 flex-1">
                      <Sparkline />
                    </div>
                  </div>
                  <div className="flex flex-col justify-end gap-1.5 rounded-md border border-line bg-surface p-2 sm:p-3">
                    {[38, 62, 48, 80, 66, 92].map((h, i) => (
                      <span key={i} className="flex items-end gap-1">
                        <span
                          className={cx('h-1.5 rounded-full', i === 5 ? 'bg-accent-cyan' : 'bg-brand/70')}
                          style={{ width: `${h}%` }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* base */}
          <div className="mx-[-4%] h-[5%] rounded-b-xl border border-t-0 border-glass-line-strong bg-muted" />
          <div className="mx-[38%] h-[2%] rounded-b-md bg-ink/10" />
        </div>

        {/* tablet ----------------------------------------------------------- */}
        <div className="absolute end-0 top-[26%] bottom-[2%] w-[26%] animate-float-slow">
          <div className="h-full overflow-hidden rounded-xl border border-glass-line-strong bg-raised p-1.5 shadow-xl glow-ring">
            <div className="flex h-full flex-col gap-2 rounded-lg bg-surface p-2.5">
              <div className="flex items-center gap-2">
                <span className="size-6 rounded-full bg-brand/70" />
                <span className="flex flex-col gap-1">
                  <Bar w="3rem" className="bg-ink/20" />
                  <Bar w="2rem" />
                </span>
              </div>
              <span className="mt-1 block text-[0.5625rem] font-semibold text-ink-2">{t.showcase.portal}</span>
              {[72, 45, 88, 60].map((v, i) => (
                <div key={i} className="rounded-md border border-line bg-raised p-1.5">
                  <Bar w="55%" className="bg-ink/15" />
                  <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-data-track">
                    <span className="block h-full rounded-full bg-brand" style={{ width: `${v}%` }} />
                  </span>
                </div>
              ))}
              <div className="mt-auto h-6 rounded-md bg-brand/90" />
            </div>
          </div>
        </div>

        {/* phone ------------------------------------------------------------ */}
        <div className="absolute start-[4%] bottom-0 w-[15%] max-w-[9rem] animate-float">
          <div className="aspect-[9/18] overflow-hidden rounded-[1.25rem] border border-glass-line-strong bg-raised p-1 shadow-xl glow-ring">
            <div className="flex h-full flex-col gap-1.5 rounded-[1rem] bg-surface p-2">
              <span className="mx-auto h-1 w-1/3 rounded-full bg-ink/15" />
              <div className="rounded-md bg-gradient-to-br from-brand to-accent-cyan/80 p-2 text-on-brand">
                <span className="block text-[0.4375rem] opacity-80">{t.showcase.mobile}</span>
                <span data-numeric className="mt-0.5 block text-[0.625rem] font-bold">
                  {localiseDigits('12,680', locale)}
                </span>
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-1.5 rounded-md border border-line p-1.5">
                  <span className="size-3 shrink-0 rounded-full bg-brand/50" />
                  <span className="flex flex-1 flex-col gap-1">
                    <Bar w="80%" className="bg-ink/15" />
                    <Bar w="50%" />
                  </span>
                </div>
              ))}
              <div className="mt-auto flex justify-around border-t border-line pt-1.5">
                {[0, 1, 2, 3].map(i => (
                  <span key={i} className={cx('size-1.5 rounded-full', i === 0 ? 'bg-brand' : 'bg-ink/15')} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
