import * as React from 'react';
import { ExternalLink, Laptop, RotateCw, Smartphone, Tablet, X } from 'lucide-react';
import type { LocaleKey, PageId, ProjectItem } from '../../types';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Badge, Button } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { ui } from '../../app/i18n';

/**
 * Responsive preview
 * --------------------------------------------------------------------------
 * Lets the visitor inspect a real project at three viewport widths without
 * leaving the page. The dialog traps focus, closes on Escape and announces
 * itself as a modal; the iframe keeps its own scroll position per device.
 */

type Device = 'desktop' | 'tablet' | 'mobile';

const DEVICE_WIDTH: Record<Device, string> = {
  desktop: '100%',
  tablet: '834px',
  mobile: '390px',
};

export interface PortfolioPreviewModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigate?: (page: PageId) => void;
  currentLocale?: LocaleKey;
}

export const PortfolioPreviewModal: React.FC<PortfolioPreviewModalProps> = ({
  project,
  onClose,
  onNavigate,
  currentLocale = 'fa',
}) => {
  const locale = currentLocale;
  const t = ui(locale);
  const copy = SECTIONS_I18N[locale].previewModal;
  const caseStudy = SECTIONS_I18N[locale].caseStudies;
  const [device, setDevice] = React.useState<Device>('desktop');
  const [reloadKey, setReloadKey] = React.useState(0);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])') ?? [],
      ).filter(el => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  React.useEffect(() => {
    if (project) setDevice('desktop');
  }, [project]);

  if (!project) return null;

  const devices: { id: Device; label: string; icon: React.ReactNode }[] = [
    { id: 'desktop', label: copy.desktop, icon: <Laptop size={16} aria-hidden="true" /> },
    { id: 'tablet', label: copy.tablet, icon: <Tablet size={16} aria-hidden="true" /> },
    { id: 'mobile', label: copy.mobile, icon: <Smartphone size={16} aria-hidden="true" /> },
  ];

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        aria-label={copy.closeTooltip}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-overlay animate-fade-in"
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        className="relative flex h-full max-h-[92vh] w-full max-w-6xl animate-scale-in flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-xl"
      >
        {/* header */}
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <Badge tone="neutral" variant="square">
              {project.industry}
            </Badge>
            <h2 id="preview-title" className="truncate text-body-sm font-semibold text-ink">
              {project.title}
              <span className="text-ink-3"> — {copy.titleSuffix}</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div role="group" aria-label={copy.titleSuffix} className="hidden items-center gap-1 sm:flex">
              {devices.map(item => {
                const active = device === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    title={item.label}
                    onClick={() => setDevice(item.id)}
                    className={cx(
                      'inline-flex size-9 items-center justify-center rounded-sm border transition-colors duration-[140ms]',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                      active
                        ? 'border-brand bg-brand-soft text-brand-ink'
                        : 'border-line text-ink-3 hover:bg-neutral-hover hover:text-ink',
                    )}
                  >
                    {item.icon}
                    <span className="sr-only">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setReloadKey(key => key + 1)}
              title={copy.scrollTip}
              className="inline-flex size-9 items-center justify-center rounded-sm border border-line text-ink-3 transition-colors duration-[140ms] hover:bg-neutral-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <RotateCw size={15} aria-hidden="true" />
              <span className="sr-only">{copy.scrollTip}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label={copy.closeTooltip}
              className="inline-flex size-9 items-center justify-center rounded-sm border border-line text-ink-3 transition-colors duration-[140ms] hover:bg-neutral-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* viewport */}
        <div className="flex flex-1 justify-center overflow-hidden bg-subtle p-3 sm:p-6">
          <div
            className="h-full overflow-hidden rounded-md border border-line bg-surface transition-[width] duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)]"
            style={{ width: DEVICE_WIDTH[device], maxWidth: '100%' }}
          >
            <iframe
              key={`${device}-${reloadKey}`}
              src={project.url}
              title={`${project.title} — ${copy.liveDomain}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              className="h-full w-full bg-surface"
            />
          </div>
        </div>

        <p className="border-t border-line bg-subtle px-4 py-2 text-caption text-ink-4 sm:px-5">
          {copy.scrollTip}
        </p>

        {/* footer */}
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-5">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-ink-3">
            <span data-numeric>
              {copy.liveDomain}:{' '}
              <span dir="ltr" className="ltr-isolate text-ink-2">
                {project.domain}
              </span>
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-line sm:inline-block" />
            <span className="text-success-ink">{project.leadResult}</span>
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {onNavigate && (
              <Button tone="neutral" emphasis="ghost" size="sm" onClick={() => onNavigate('portfolio')}>
                {copy.portfolioShort}
              </Button>
            )}
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="contents">
              <Button tone="brand" emphasis="outline" size="sm">
                <ExternalLink size={15} aria-hidden="true" />
                {caseStudy.viewLive}
              </Button>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
