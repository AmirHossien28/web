import * as React from 'react';
import { Home, LayoutGrid, Menu, MessageSquare } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { cx } from '../../design-system/tokens';
import { ui } from '../../app/i18n';

/**
 * Mobile action bar — the four things a visitor does on a phone:
 * go home, browse services, start a conversation, open the menu.
 * 56px tall with safe-area padding so nothing collides with OS gestures.
 */
export interface MobileActionBarProps {
  currentPage: PageId;
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenMenu: () => void;
  onOpenConsult: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  currentPage,
  locale,
  onNavigate,
  onOpenMenu,
  onOpenConsult,
}) => {
  const t = ui(locale);

  const items: Array<{
    key: string;
    label: string;
    icon: React.ReactNode;
    active?: boolean;
    onClick: () => void;
  }> = [
    {
      key: 'home',
      label: t.nav.home,
      icon: <Home size={19} aria-hidden="true" />,
      active: currentPage === 'home',
      onClick: () => onNavigate('home'),
    },
    {
      key: 'services',
      label: t.nav.services,
      icon: <LayoutGrid size={19} aria-hidden="true" />,
      active: currentPage === 'services' || currentPage.includes('-web-design'),
      onClick: () => onNavigate('services'),
    },
    {
      key: 'consult',
      label: t.actions.consultShort,
      icon: <MessageSquare size={19} aria-hidden="true" />,
      onClick: onOpenConsult,
    },
    {
      key: 'menu',
      label: t.common.menu,
      icon: <Menu size={19} aria-hidden="true" />,
      onClick: onOpenMenu,
    },
  ];

  return (
    <nav
      aria-label={t.common.menu}
      className="fixed inset-x-0 bottom-0 z-sticky border-t border-line bg-surface/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-4">
        {items.map(item => (
          <li key={item.key}>
            <button
              type="button"
              onClick={item.onClick}
              aria-current={item.active ? 'page' : undefined}
              className={cx(
                'flex h-14 w-full flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium transition-colors duration-[140ms]',
                'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus',
                item.active ? 'text-brand-ink' : 'text-ink-3 hover:text-ink',
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
