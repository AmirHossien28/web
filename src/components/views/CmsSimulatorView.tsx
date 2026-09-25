import * as React from 'react';
import {
  Check,
  FileText,
  Globe2,
  Image as ImageIcon,
  Layers,
  Lock,
  Plus,
  Search,
  Settings,
  Upload,
} from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { SECTIONS_I18N } from '../../data/sectionsI18n';
import { Badge, Button, Card, Section, SectionHeading } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { PageHeader } from '../chrome/PageHeader';
import { CtaSection } from '../sections/CtaSection';
import { ui } from '../../app/i18n';

/**
 * CMS simulator
 * --------------------------------------------------------------------------
 * A safe, self-contained demo of the admin experience: navigate the sidebar,
 * switch language, toggle a block and publish. Nothing is persisted — the point
 * is to let a buyer feel the panel before committing, which removes the single
 * biggest fear in a CMS project ("can my team actually use it?").
 */

const NAV_SECTIONS = [
  { id: 'content', label: 'محتوا و صفحات', icon: <FileText size={16} aria-hidden="true" /> },
  { id: 'media', label: 'رسانه و فایل‌ها', icon: <ImageIcon size={16} aria-hidden="true" /> },
  { id: 'blocks', label: 'بلوک‌های صفحه', icon: <Layers size={16} aria-hidden="true" /> },
  { id: 'languages', label: 'زبان‌ها', icon: <Globe2 size={16} aria-hidden="true" /> },
  { id: 'seo', label: 'سئو و متادیتا', icon: <Search size={16} aria-hidden="true" /> },
  { id: 'roles', label: 'نقش‌ها و دسترسی', icon: <Lock size={16} aria-hidden="true" /> },
  { id: 'settings', label: 'تنظیمات سایت', icon: <Settings size={16} aria-hidden="true" /> },
];

const BLOCKS = [
  { id: 'hero', label: 'بلوک معرفی اصلی', enabled: true },
  { id: 'services', label: 'شبکه خدمات', enabled: true },
  { id: 'proof', label: 'اعداد و اعتبار', enabled: true },
  { id: 'testimonials', label: 'نظرات کارفرمایان', enabled: false },
  { id: 'cta', label: 'فراخوان نهایی', enabled: true },
];

const LANGS = ['فارسی', 'English', 'العربية', 'Türkçe'];

export interface CmsSimulatorViewProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsult: () => void;
  hotline: string;
  whatsapp: string;
}

export const CmsSimulatorView: React.FC<CmsSimulatorViewProps> = ({
  locale,
  onNavigate,
  onOpenConsult,
  hotline,
  whatsapp,
}) => {
  const t = ui(locale);
  const section = SECTIONS_I18N[locale].navTools;

  const [active, setActive] = React.useState('content');
  const [language, setLanguage] = React.useState(LANGS[0]);
  const [blocks, setBlocks] = React.useState(BLOCKS);
  const [published, setPublished] = React.useState(false);

  const toggleBlock = (id: string) =>
    setBlocks(current => current.map(block => (block.id === id ? { ...block, enabled: !block.enabled } : block)));

  return (
    <>
      <PageHeader
        page="cms-simulator"
        locale={locale}
        title={section.cmsSimulator}
        description={section.cmsSimulatorDesc}
        onNavigate={onNavigate}
        actions={
          <Button tone="brand" size="lg" onClick={onOpenConsult}>
            {t.actions.consult}
          </Button>
        }
      />

      <Section level="canvas">
        <SectionHeading
          overline="تجربه پنل مدیریت"
          title="پنل را همان‌طور که تیم شما می‌بیند امتحان کنید"
          description="این یک محیط نمایشی است: بخش‌های کنار را انتخاب کنید، زبان را عوض کنید و بلوک‌ها را روشن یا خاموش کنید. هیچ داده‌ای ذخیره نمی‌شود."
        />

        <div className="mt-10 overflow-hidden rounded-lg border border-line bg-surface">
          {/* fake browser chrome — signals "this is a product, not a screenshot" */}
          <div className="flex items-center gap-3 border-b border-line bg-subtle px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-line-bold" />
              <span className="size-2.5 rounded-full bg-line-bold" />
              <span className="size-2.5 rounded-full bg-line-bold" />
            </div>
            <p dir="ltr" className="ltr-isolate flex-1 rounded-xs border border-line bg-surface px-3 py-1 text-caption text-ink-3">
              admin.aladdinweb.ir / {active}
            </p>
            <Badge tone={published ? 'success' : 'neutral'} variant="square" dot>
              {published ? 'منتشر شده' : 'پیش‌نویس'}
            </Badge>
          </div>

          <div className="grid lg:grid-cols-12">
            {/* sidebar */}
            <nav aria-label="بخش‌های پنل" className="border-b border-line p-3 lg:col-span-3 lg:border-b-0 lg:border-e">
              <ul className="flex flex-wrap gap-1 lg:flex-col">
                {NAV_SECTIONS.map(item => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-current={isActive ? 'true' : undefined}
                        onClick={() => setActive(item.id)}
                        className={cx(
                          'flex w-full items-center gap-2.5 rounded-sm px-3 py-2.5 text-caption font-medium transition-colors duration-[140ms]',
                          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                          isActive ? 'bg-brand-soft text-brand-ink' : 'text-ink-2 hover:bg-neutral-hover hover:text-ink',
                        )}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* work area */}
            <div className="flex flex-col gap-6 p-5 lg:col-span-9 lg:p-6">
              {active === 'blocks' && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-body-sm font-semibold text-ink">بلوک‌های صفحه اصلی</h3>
                  {blocks.map(block => (
                    <label
                      key={block.id}
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-sm border border-line px-4 py-3 text-caption"
                    >
                      <span className="flex items-center gap-3 text-ink-2">
                        <input
                          type="checkbox"
                          checked={block.enabled}
                          onChange={() => toggleBlock(block.id)}
                          className="size-4 accent-[var(--ds-color-bg-brand)]"
                        />
                        {block.label}
                      </span>
                      <Badge tone={block.enabled ? 'success' : 'neutral'} variant="square">
                        {block.enabled ? 'فعال' : 'غیرفعال'}
                      </Badge>
                    </label>
                  ))}
                </div>
              )}

              {active === 'languages' && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-body-sm font-semibold text-ink">زبان‌های سایت</h3>
                  <div className="flex flex-wrap gap-2">
                    {LANGS.map(item => (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={language === item}
                        onClick={() => setLanguage(item)}
                        className={cx(
                          'h-9 rounded-sm border px-3.5 text-caption font-medium transition-colors duration-[140ms]',
                          language === item
                            ? 'border-brand bg-brand-soft text-brand-ink'
                            : 'border-line text-ink-2 hover:bg-neutral-hover hover:text-ink',
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <p className="text-caption text-ink-3">
                    زبان فعال برای ویرایش: <strong className="text-ink">{language}</strong> — تغییر زبان، جهت صفحه و
                    فونت را به‌صورت خودکار تنظیم می‌کند.
                  </p>
                </div>
              )}

              {(active === 'content' || active === 'media' || active === 'seo' || active === 'roles' || active === 'settings') && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-body-sm font-semibold text-ink">
                      {NAV_SECTIONS.find(item => item.id === active)?.label}
                    </h3>
                    <div className="flex gap-2">
                      <Button tone="neutral" emphasis="outline" size="sm">
                        <Upload size={15} aria-hidden="true" />
                        بارگذاری
                      </Button>
                      <Button tone="brand" size="sm" onClick={() => setPublished(true)}>
                        <Plus size={15} aria-hidden="true" />
                        ایجاد مورد جدید
                      </Button>
                    </div>
                  </div>

                  <ul className="flex flex-col divide-y divide-line rounded-sm border border-line">
                    {[
                      { title: 'صفحه اصلی', meta: 'آخرین ویرایش: امروز', state: 'منتشر شده' },
                      { title: 'خدمات — سایت شرکتی', meta: 'آخرین ویرایش: ۲ روز پیش', state: 'منتشر شده' },
                      { title: 'نمونه‌کارها', meta: 'آخرین ویرایش: ۵ روز پیش', state: 'پیش‌نویس' },
                      { title: 'تماس با ما', meta: 'آخرین ویرایش: امروز', state: 'منتشر شده' },
                    ].map(row => (
                      <li key={row.title} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                        <div>
                          <p className="text-caption font-medium text-ink">{row.title}</p>
                          <p className="text-caption text-ink-4">{row.meta}</p>
                        </div>
                        <Badge tone={row.state === 'منتشر شده' ? 'success' : 'warning'} variant="square">
                          {row.state}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                <p className="flex items-center gap-2 text-caption text-ink-3">
                  <Check size={15} aria-hidden="true" className="text-success-ink" />
                  تغییرات شما فقط در همین صفحه نمایشی اعمال می‌شود.
                </p>
                <Button tone="brand" emphasis="outline" size="sm" onClick={onOpenConsult}>
                  درخواست پنل اختصاصی
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { title: 'مدل‌سازی محتوا', body: 'ساختار محتوا پیش از طراحی تعریف می‌شود؛ نتیجه: پنلی که با رشد کسب‌وکار تغییر نمی‌کند.' },
            { title: 'چندزبانه واقعی', body: 'هر زبان نسخه مستقل خود را دارد؛ مدیریت ترجمه با گردش تأیید و پیش‌نمایش.' },
            { title: 'آموزش و تحویل', body: 'جلسه آموزش تیم، ویدئوی راهنما و مستندات پنل همراه با تحویل پروژه.' },
          ].map(item => (
            <Card key={item.title} padding="md">
              <h3 className="text-body-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-caption text-ink-2">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaSection locale={locale} onOpenConsult={onOpenConsult} hotline={hotline} whatsapp={whatsapp} />
    </>
  );
};
