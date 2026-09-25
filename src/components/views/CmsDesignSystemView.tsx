import * as React from 'react';
import { Check, Copy, Minus, Ruler, Sparkles, Type as TypeIcon } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { Badge, Button, Card, Disclosure, Field, IconFrame, Meter, Section, SectionHeading, Stat } from '../../design-system/primitives';
import { cx, ds } from '../../design-system/tokens';
import { PageHeader } from '../chrome/PageHeader';
import { localiseDigits, ui } from '../../app/i18n';

/**
 * Design system documentation
 * --------------------------------------------------------------------------
 * The system documents itself: every swatch, type specimen and component below
 * is rendered by the same tokens and primitives that ship in the product, so the
 * documentation cannot drift from the implementation.
 */

/* -------------------------------- content -------------------------------- */

const TOKEN_LAYERS = [
  {
    name: 'Primitive',
    pattern: '--ds-primitive-{category}-{scale}',
    example: '--ds-primitive-ink-900: #101828',
    rule: 'ارزش خالص، بدون معنا. فقط در لایه معنایی ارجاع داده می‌شود.',
  },
  {
    name: 'Semantic',
    pattern: '--ds-color-{category}-{role}',
    example: '--ds-color-text-primary: var(--ds-primitive-ink-900)',
    rule: 'نقش و کاربرد را توصیف می‌کند؛ هرگز نام ظاهری (رنگ) در این لایه به‌کار نمی‌رود.',
  },
  {
    name: 'Component',
    pattern: '--ds-{component}-{property}',
    example: 'button-background-primary → --ds-color-bg-brand',
    rule: 'تنها زمانی ساخته می‌شود که یک کامپوننت واقعاً از سیستم جدا شود.',
  },
];

const SEMANTIC_GROUPS: { title: string; tokens: { name: string; className: string; note: string }[] }[] = [
  {
    title: 'سطوح (Surfaces)',
    tokens: [
      { name: 'bg-canvas', className: 'bg-canvas', note: 'پس‌زمینه صفحه' },
      { name: 'bg-surface', className: 'bg-surface', note: 'کارت و شیت' },
      { name: 'bg-subtle', className: 'bg-subtle', note: 'نوار آرام' },
      { name: 'bg-muted', className: 'bg-muted', note: 'قاب داخلی' },
      { name: 'bg-inverse', className: 'bg-inverse', note: 'نوار معکوس' },
      { name: 'bg-brand', className: 'bg-brand', note: 'اقدام اصلی' },
    ],
  },
  {
    title: 'متن (Text)',
    tokens: [
      { name: 'text-ink', className: 'bg-ink', note: 'متن اصلی — کنتراست ۱۵.۹:۱' },
      { name: 'text-ink-2', className: 'bg-ink-2', note: 'متن ثانویه — ۷.۴:۱' },
      { name: 'text-ink-3', className: 'bg-ink-3', note: 'متن کم‌رنگ — ۴.۸:۱' },
      { name: 'text-ink-4', className: 'bg-ink-4', note: 'فقط عناصر غیرمتنی' },
      { name: 'text-brand-ink', className: 'bg-brand-ink', note: 'تأکید برند — ۶.۹:۱' },
    ],
  },
  {
    title: 'وضعیت (Status)',
    tokens: [
      { name: 'success-ink', className: 'bg-success-ink', note: 'موفق / تعهدی' },
      { name: 'warning-ink', className: 'bg-warning-ink', note: 'هشدار / امتیاز متوسط' },
      { name: 'danger-ink', className: 'bg-danger-ink', note: 'خطا / اثر بالا' },
      { name: 'border-line', className: 'bg-line', note: 'حاشیه مویی' },
      { name: 'border-focus', className: 'bg-focus', note: 'حلقه فوکوس ۲ پیکسل' },
    ],
  },
];

const TYPE_SCALE = [
  { token: 'text-display-1', className: 'text-display-1', use: 'تیتر اصلی صفحه فرود', size: '۲.۷۵rem / ۱.۲۵' },
  { token: 'text-display-2', className: 'text-display-2', use: 'تیتر صفحه داخلی', size: '۲.۱۲۵rem / ۱.۳' },
  { token: 'text-title-1', className: 'text-title-1', use: 'عنوان بخش', size: '۱.۷۵rem / ۱.۳۵' },
  { token: 'text-title-2', className: 'text-title-2', use: 'زیرعنوان', size: '۱.۳۷۵rem / ۱.۴۵' },
  { token: 'text-title-3', className: 'text-title-3', use: 'عنوان کارت', size: '۱.۱۲۵rem / ۱.۵' },
  { token: 'text-body-lg', className: 'text-body-lg', use: 'متن معرفی', size: '۱.۰۶rem / ۱.۸۵' },
  { token: 'text-body', className: 'text-body', use: 'متن اصلی', size: '۱rem / ۱.۸۵' },
  { token: 'text-body-sm', className: 'text-body-sm', use: 'متن رابط', size: '۰.۹۴rem / ۱.۸' },
  { token: 'text-caption', className: 'text-caption', use: 'توضیح و متادیتا', size: '۰.۸۱rem / ۱.۷' },
  { token: 'text-overline', className: 'text-overline', use: 'برچسب بخش', size: '۰.۷۵rem / ۱.۶' },
];

const MOTION = [
  { token: 'duration-instant', value: '۹۰ms', use: 'فشار دکمه' },
  { token: 'duration-fast', value: '۱۴۰ms', use: 'رنگ و حاشیه در hover' },
  { token: 'duration-base', value: '۲۰۰ms', use: 'ورود پنل و دیالوگ' },
  { token: 'duration-slow', value: '۳۲۰ms', use: 'ورود بخش‌ها' },
];

const A11Y_RULES = [
  'همه متن‌ها حداقل کنتراست ۴.۵:۱ و متن‌های بزرگ ۳:۱ دارند (WCAG 2.2 - 1.4.3).',
  'حلقه فوکوس ۲ پیکسل با فاصله ۲ پیکسل، روی هر پس‌زمینه‌ای قابل تشخیص است (2.4.11/2.4.13).',
  'هدف‌های لمسی حداقل ۴۴ پیکسل ارتفاع دارند؛ حداقل مطلق ۲۴ پیکسل رعایت شده است (2.5.8).',
  'هر کنترل فرم برچسب صریح، aria-invalid در خطا و پیام خطای مرتبط دارد (3.3.1/3.3.3).',
  'هیچ معنایی صرفاً با رنگ منتقل نمی‌شود؛ آیکون یا متن همراه همیشه وجود دارد (1.4.1).',
  'حالت prefers-reduced-motion همه انیمیشن‌ها را غیرفعال می‌کند (2.3.3).',
];

const PRINCIPLES = [
  {
    icon: <Ruler size={18} aria-hidden="true" />,
    title: 'ریتم ۸ پیکسلی',
    body: 'همه فاصله‌ها مضربی از ۴ و در چیدمان‌ها مضربی از ۸ پیکسل‌اند؛ هیچ مقدار تصادفی وارد رابط نمی‌شود.',
  },
  {
    icon: <TypeIcon size={18} aria-hidden="true" />,
    title: 'تایپوگرافی وزیرمتن',
    body: 'ارتفاع خط ۱.۸ برای متن فارسی، letter-spacing صفر و وزن ۴۰۰ به‌عنوان حداقل وزن متن.',
  },
  {
    icon: <Sparkles size={18} aria-hidden="true" />,
    title: 'یک لهجه رنگی',
    body: 'فقط یک رنگ برند برای اقدام؛ رنگ‌های دیگر مخصوص داده و وضعیت‌اند و تزئینی نیستند.',
  },
];

/* --------------------------------- helpers -------------------------------- */

const useCopy = () => {
  const [copied, setCopied] = React.useState<string | null>(null);
  const copy = (value: string) => {
    navigator.clipboard?.writeText(value).catch(() => undefined);
    setCopied(value);
    window.setTimeout(() => setCopied(null), 1400);
  };
  return { copied, copy };
};

export interface CmsDesignSystemViewProps {
  locale: LocaleKey;
  onNavigate: (page: PageId) => void;
}

export const CmsDesignSystemView: React.FC<CmsDesignSystemViewProps> = ({ locale, onNavigate }) => {
  const t = ui(locale);
  const { copied, copy } = useCopy();
  const [openRule, setOpenRule] = React.useState<string | null>('چرا سه لایه؟');

  return (
    <>
      <PageHeader
        page="cms-design-system"
        locale={locale}
        onNavigate={onNavigate}
        actions={
          <Button tone="brand" size="lg" onClick={() => onNavigate('about-contact')}>
            {t.actions.consult}
          </Button>
        }
      />

      {/* ------------------------------ principles ------------------------------ */}
      <Section level="canvas">
        <SectionHeading
          overline="اصول"
          title="سه قاعده‌ای که همه تصمیم‌ها را تعیین می‌کند"
          description="هر مقدار در این سیستم قابل ردیابی است: از توکن اولیه تا نقش معنایی و در نهایت کامپوننت."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
          {PRINCIPLES.map(item => (
            <article key={item.title} className="flex flex-col gap-4 bg-surface p-6 lg:p-8">
              <IconFrame>{item.icon}</IconFrame>
              <h3 className="text-title-3">{item.title}</h3>
              <p className="text-body-sm text-ink-2">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* -------------------------------- tokens -------------------------------- */}
      <Section level="subtle" bordered>
        <SectionHeading
          overline="توکن‌ها"
          title="معماری سه‌لایه و نام‌گذاری یکدست"
          description="نام‌ها با خط تیره جدا می‌شوند، از کلی به خاص می‌روند و در لایه معنایی هرگز به ظاهر اشاره نمی‌کنند."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {TOKEN_LAYERS.map(layer => (
            <Card key={layer.name} padding="md" className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-body-sm font-semibold text-ink">{layer.name}</h3>
                <Badge tone="neutral" variant="square">
                  {layer.name === 'Primitive' ? 'لایه ۱' : layer.name === 'Semantic' ? 'لایه ۲' : 'لایه ۳'}
                </Badge>
              </div>
              <code dir="ltr" className="ltr-isolate rounded-xs border border-line bg-subtle px-3 py-2 text-caption text-ink-2">
                {layer.pattern}
              </code>
              <code dir="ltr" className="ltr-isolate break-all text-caption text-brand-ink">
                {layer.example}
              </code>
              <p className="text-caption text-ink-3">{layer.rule}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {SEMANTIC_GROUPS.map(group => (
            <div key={group.title}>
              <h3 className="text-body-sm font-semibold text-ink">{group.title}</h3>
              <ul className="mt-4 flex flex-col divide-y divide-line border-y border-line">
                {group.tokens.map(token => (
                  <li key={token.name} className="flex items-center gap-3 py-3">
                    <span
                      aria-hidden="true"
                      className={cx('size-8 shrink-0 rounded-xs border border-line', token.className)}
                    />
                    <span className="flex flex-1 flex-col">
                      <code dir="ltr" className="ltr-isolate text-caption font-medium text-ink">
                        {token.name}
                      </code>
                      <span className="text-caption text-ink-4">{token.note}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => copy(token.name)}
                      aria-label={`${t.actions.copy} ${token.name}`}
                      className="inline-flex size-8 items-center justify-center rounded-xs border border-line text-ink-4 transition-colors duration-[140ms] hover:bg-neutral-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    >
                      {copied === token.name ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------ typography ------------------------------ */}
      <Section level="canvas" bordered>
        <SectionHeading
          overline="تایپوگرافی"
          title="مقیاس ثابت با ارتفاع خط مناسب فارسی"
          description="ده سطح تایپوگرافی، هر کدام با کاربرد مشخص. هیچ اندازه خارج از این مقیاس در رابط استفاده نمی‌شود."
        />

        <div className="mt-10 overflow-hidden rounded-lg border border-line bg-surface">
          <ul className="divide-y divide-line">
            {TYPE_SCALE.map(step => (
              <li key={step.token} className="flex flex-col gap-2 p-6 lg:flex-row lg:items-center lg:gap-8">
                <div className="lg:w-56 lg:shrink-0">
                  <code dir="ltr" className="ltr-isolate text-caption font-medium text-brand-ink">
                    {step.token}
                  </code>
                  <p data-numeric className="text-caption text-ink-4">
                    {step.size}
                  </p>
                </div>
                <p className={cx(step.className, 'flex-1 text-ink')}>
                  مهندسی تجربه دیجیتال، دقیق‌تر از یک ظاهر خوب است
                </p>
                <p className="text-caption text-ink-3 lg:w-48 lg:shrink-0">{step.use}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* --------------------------- spacing and grid --------------------------- */}
      <Section level="subtle" bordered>
        <SectionHeading
          overline="چیدمان"
          title="شبکه، فاصله و ارتفاع"
          description="واحد پایه ۴ پیکسل و ریتم عمودی ۸ پیکسل است؛ گرید ۱۲ ستونه با پدینگ ثابت ۱۶ پیکسل در موبایل."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="text-body-sm font-semibold text-ink">مقیاس فاصله (px)</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {[4, 8, 12, 16, 24, 32, 48, 64].map(step => (
                <li key={step} className="flex items-center gap-4">
                  <span data-numeric className="w-10 shrink-0 text-caption text-ink-3">
                    {localiseDigits(step, locale)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-3 rounded-xs bg-brand-soft"
                    style={{ width: `${step * 2}px` }}
                  />
                  <code dir="ltr" className="ltr-isolate text-caption text-ink-4">
                    space-{step / 4}
                  </code>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-body-sm font-semibold text-ink">مقادیر ساختاری</h3>
            <dl className="mt-4 flex flex-col divide-y divide-line border-y border-line text-caption">
              {[
                { label: 'گرید دسکتاپ', value: `${ds.grid.columnsDesktop} ستون` },
                { label: 'گرید تبلت', value: `${ds.grid.columnsTablet} ستون` },
                { label: 'گرید موبایل', value: `${ds.grid.columnsMobile} ستون` },
                { label: 'عرض محتوا', value: '۱۲۴۸ پیکسل' },
                { label: 'عرض متن بلند', value: '۷۳۶ پیکسل' },
                { label: 'شعاع کارت', value: '۱۴ پیکسل' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between py-3">
                  <dt className="text-ink-3">{row.label}</dt>
                  <dd className="text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ------------------------------- components ------------------------------- */}
      <Section level="canvas" bordered>
        <SectionHeading
          overline="کامپوننت‌ها"
          title="کامپوننت‌های پایه، در همه حالت‌ها"
          description="هر کامپوننت فقط از توکن‌های معنایی استفاده می‌کند؛ به همین دلیل تغییر پوسته روشن و تاریک هیچ کدی در کامپوننت‌ها لازم ندارد."
        />

        <div className="mt-10 flex flex-col gap-8">
          {/* buttons */}
          <Card padding="lg">
            <h3 className="text-body-sm font-semibold text-ink">دکمه‌ها</h3>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button tone="brand">اقدام اصلی</Button>
              <Button tone="neutral" emphasis="outline">
                اقدام ثانویه
              </Button>
              <Button tone="neutral" emphasis="ghost">
                بی‌حاشیه
              </Button>
              <Button tone="brand" emphasis="link">
                پیوند برند
              </Button>
              <Button tone="neutral" emphasis="outline" disabled>
                غیرفعال
              </Button>
              <Button tone="brand" size="sm">
                کوچک
              </Button>
              <Button tone="brand" size="lg">
                بزرگ
              </Button>
            </div>
          </Card>

          {/* badges + fields */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card padding="lg">
              <h3 className="text-body-sm font-semibold text-ink">نشان‌ها و وضعیت‌ها</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge tone="brand">برند</Badge>
                <Badge tone="success" dot>
                  موفق
                </Badge>
                <Badge tone="warning">هشدار</Badge>
                <Badge tone="danger">خطا</Badge>
                <Badge tone="neutral" variant="square">
                  خنثی
                </Badge>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Stat value="۹۹.۹۸٪" label="پایداری" tone="brand" />
                <Stat value="۴۸۰+" label="پروژه تحویل‌شده" />
              </div>
              <div className="mt-6 flex flex-col gap-5">
                <Meter value={92} label="امتیاز عملکرد" valueText="۹۲٪" tone="success" />
                <Meter value={68} label="امتیاز سئو" valueText="۶۸٪" tone="warning" />
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-body-sm font-semibold text-ink">فیلدهای فرم</h3>
              <div className="mt-5 flex flex-col gap-5">
                <Field id="ds-demo-name" label="نام کسب‌وکار" required>
                  {fieldProps => <input {...fieldProps} placeholder="صنایع آداک" />}
                </Field>
                <Field id="ds-demo-phone" label="شماره تماس" ltrInput hint="نمونه: ۰۹۱۲۳۴۵۶۷۸۹">
                  {fieldProps => <input {...fieldProps} type="tel" inputMode="tel" dir="ltr" />}
                </Field>
                <Field id="ds-demo-error" label="فیلد با خطا" error="این فیلد الزامی است.">
                  {fieldProps => <input {...fieldProps} />}
                </Field>
              </div>
            </Card>
          </div>

          {/* disclosure */}
          <Card padding="lg">
            <h3 className="text-body-sm font-semibold text-ink">آکاردئون محتوا</h3>
            <div className="mt-4">
              {[
                { id: 'ds-acc-1', q: 'چرا سه لایه؟', a: 'جداسازی ارزش خالص از نقش، این امکان را می‌دهد که پوسته یا برند تغییر کند بدون آنکه نام توکن‌ها دروغ شوند.' },
                { id: 'ds-acc-2', q: 'چطور پوسته تاریک فعال می‌شود؟', a: 'تنها با افزودن کلاس dark به ریشه سند؛ همه کامپوننت‌ها به‌صورت خودکار مقادیر معنایی جدید را می‌خوانند.' },
              ].map(item => (
                <Disclosure
                  key={item.id}
                  id={item.id}
                  question={item.q}
                  open={openRule === item.q}
                  onToggle={() => setOpenRule(current => (current === item.q ? null : item.q))}
                  defaultIcon={<Minus size={16} />}
                >
                  {item.a}
                </Disclosure>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* ----------------------------- accessibility ----------------------------- */}
      <Section level="subtle" bordered>
        <SectionHeading
          overline="دسترس‌پذیری"
          title="قواعد غیرقابل مذاکره"
          description="این موارد در سطح توکن و کامپوننت تضمین شده‌اند، نه با بازبینی دستی در پایان پروژه."
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {A11Y_RULES.map(rule => (
            <li key={rule} className="flex items-start gap-3 rounded-lg border border-line bg-surface p-5 text-body-sm text-ink-2">
              <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-success-ink" />
              {rule}
            </li>
          ))}
        </ul>

        <Card padding="lg" className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-body-sm font-semibold text-ink">حرکت و انیمیشن</h3>
            <p className="mt-1 text-caption text-ink-2">
              انیمیشن فقط برای بیان تغییر وضعیت استفاده می‌شود؛ با prefers-reduced-motion کاملاً غیرفعال می‌گردد.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {MOTION.map(item => (
              <li key={item.token} className="rounded-xs border border-line px-3 py-2 text-caption text-ink-3">
                <code dir="ltr" className="ltr-isolate">
                  {item.token}
                </code>
                <span data-numeric className="ms-2 text-ink-4">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </Section>
    </>
  );
};
