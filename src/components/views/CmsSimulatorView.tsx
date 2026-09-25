import React, { useState } from 'react';
import { 
  Layers, 
  Globe, 
  Search, 
  Image as ImageIcon, 
  Code, 
  CheckCircle, 
  Eye, 
  Sparkles, 
  Sliders, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Terminal,
  ChevronDown,
  LayoutDashboard,
  Briefcase,
  FileText,
  DollarSign,
  HelpCircle,
  MessageSquare,
  Users,
  Database,
  ArrowRight,
  Upload,
  Folder,
  Check,
  AlertCircle,
  BarChart3,
  Server,
  Key,
  Flame
} from 'lucide-react';
import { LocaleKey } from '../../types';

interface CmsSimulatorViewProps {
  currentLocale: LocaleKey;
  onOpenConsult: () => void;
  onSelectPage: (page: any) => void;
}

interface BlockItem {
  id: string;
  type: 'hero' | 'services' | 'portfolio' | 'templates' | 'pricing' | 'faq' | 'cta';
  titleFa: string;
  titleEn: string;
  badgeFa: string;
  badgeEn: string;
  enabled: boolean;
}

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  service: string;
  status: 'NEW' | 'IN_PROGRESS' | 'CONTACTED' | 'ARCHIVED';
  date: string;
  locale: string;
}

export const CmsSimulatorView: React.FC<CmsSimulatorViewProps> = ({
  currentLocale,
  onOpenConsult,
  onSelectPage,
}) => {
  const isFa = currentLocale === 'fa';
  const [activeSection, setActiveSection] = useState<
    'dashboard' | 'pages' | 'services' | 'portfolio' | 'i18n' | 'crm' | 'media' | 'seo' | 'rbac' | 'system'
  >('dashboard');

  const [activeLocaleTab, setActiveLocaleTab] = useState<'fa' | 'en' | 'ar' | 'tr' | 'de'>('fa');
  const [heroHeadingFa, setHeroHeadingFa] = useState('وب‌سایت‌هایی که بازدیدکننده را به مشتری دائم تبدیل می‌کنند.');
  const [heroHeadingEn, setHeroHeadingEn] = useState('Websites Engineered to Convert Visitors into Lifelong Clients.');
  const [heroHeadingAr, setHeroHeadingAr] = useState('مواقع إلكترونية مصممة هندسياً لتحويل الزوار إلى عملاء دائمين.');
  const [seoTitle, setSeoTitle] = useState('طراحی سایت علاءالدین | پلتفرم مهندسی وب و DXP');
  const [seoDescription, setSeoDescription] = useState('طراحی اختصاصی سایت شرکتی، فروشگاه اینترنتی و پورتال‌های سازمانی با سرعت بارگذاری زیر ۱ ثانیه و سئو تکنیکال.');
  const [isSaved, setIsSaved] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [cacheFlushed, setCacheFlushed] = useState(false);

  // Section Blocks
  const [blocks, setBlocks] = useState<BlockItem[]>([
    {
      id: 'b-1',
      type: 'hero',
      titleFa: 'بخش اصلی هیرو (Hero Section)',
      titleEn: 'Main Hero Section',
      badgeFa: 'پویا با فرم استعلام',
      badgeEn: 'Dynamic RFQ Form',
      enabled: true,
    },
    {
      id: 'b-2',
      type: 'services',
      titleFa: 'خدمات تخصصی و راهکارها',
      titleEn: 'Engineering Services Bento',
      badgeFa: 'شبکه ۶ ستونه',
      badgeEn: '6-Card Grid',
      enabled: true,
    },
    {
      id: 'b-3',
      type: 'portfolio',
      titleFa: 'شوکیس پروژه‌ها و آمار زنده',
      titleEn: 'Live Portfolio & LCP Metrics',
      badgeFa: 'نمایشگر Core Web Vitals',
      badgeEn: 'Live Uptime Monitor',
      enabled: true,
    },
    {
      id: 'b-4',
      type: 'templates',
      titleFa: 'قالب‌های آماده تحویل ۳ روزه',
      titleEn: 'Ready-to-Launch Templates',
      badgeFa: 'تب‌بندی موضوعی',
      badgeEn: 'Categorized Tabs',
      enabled: true,
    },
    {
      id: 'b-5',
      type: 'pricing',
      titleFa: 'جدول تعرفه‌ها و ماشین‌حساب',
      titleEn: 'Tiered Pricing & Calculator',
      badgeFa: 'تبدیل چندارزی',
      badgeEn: 'Multi-Currency',
      enabled: true,
    },
    {
      id: 'b-6',
      type: 'faq',
      titleFa: 'پرسش‌های متداول آکاردئونی',
      titleEn: 'Interactive FAQ Accordion',
      badgeFa: 'اسکیما JSON-LD',
      badgeEn: 'Schema Rich Snippets',
      enabled: true,
    },
  ]);

  // CRM Leads State
  const [leads, setLeads] = useState<LeadItem[]>([
    {
      id: 'L-101',
      name: 'شرکت بازرگانی فولاد آداک',
      phone: '09123456789',
      service: 'طراحی سایت شرکتی و چندزبانه',
      status: 'NEW',
      date: '۱۰ دقیقه پیش',
      locale: 'fa-IR',
    },
    {
      id: 'L-102',
      name: 'Arka Best Industrial Spare Parts',
      phone: '+971 50 123 4567',
      service: 'فروشگاه اینترنتی اختصاصی',
      status: 'IN_PROGRESS',
      date: '۱ ساعت پیش',
      locale: 'en-AE',
    },
    {
      id: 'L-103',
      name: 'کلینیک تخصصی دکتر فیاض',
      phone: '09198765432',
      service: 'سامانه نوبت‌دهی و پرتال پزشکی',
      status: 'CONTACTED',
      date: 'دیروز',
      locale: 'fa-IR',
    },
  ]);

  // Currency Rates
  const [currencies, setCurrencies] = useState([
    { code: 'IRR', symbol: 'تومان', rate: 1, name: 'ایران (ریال/تومان)' },
    { code: 'USD', symbol: '$', rate: 0.000016, name: 'ایالات متحده و بین‌الملل' },
    { code: 'EUR', symbol: '€', rate: 0.000015, name: 'اتحادیه اروپا' },
    { code: 'AED', symbol: 'د.إ', rate: 0.000059, name: 'امارات متحده عربی' },
    { code: 'TRY', symbol: '₺', rate: 0.00055, name: 'ترکیه' },
  ]);

  const toggleBlock = (id: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b))
    );
  };

  const handleSaveAndDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3500);
    }, 1000);
  };

  const handleFlushCache = () => {
    setCacheFlushed(true);
    setTimeout(() => setCacheFlushed(false), 3000);
  };

  const updateLeadStatus = (id: string, newStatus: LeadItem['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  return (
    <div className="min-h-screen bg-[#060a14] text-slate-100 font-sans">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 h-16 bg-[#0a1228]/95 border-b border-white/10 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 px-2.5 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
            <span className="font-bold text-xs tracking-wider text-sky-300">ALADDIN DXP COCKPIT</span>
          </div>
          <span className="hidden md:inline-flex text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Production v2.4 (api.aladdinltd.com)
          </span>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Cache Flush */}
          <button
            type="button"
            onClick={handleFlushCache}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              cacheFlushed 
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
            }`}
            title="تخلیه آنی کش ردیس (Redis Invalidate)"
          >
            <Flame className={`w-3.5 h-3.5 ${cacheFlushed ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span>{cacheFlushed ? 'کش با موفقیت خالی شد' : 'تخلیه کش Redis'}</span>
          </button>

          {/* Save / Deploy button */}
          <button
            type="button"
            onClick={handleSaveAndDeploy}
            disabled={isDeploying}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isDeploying ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>در حال انتشار به API...</span>
              </>
            ) : isSaved ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>منتشر شد!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>ذخیره و انتشار تغییرات</span>
              </>
            )}
          </button>

          {/* Exit CMS to Public Site */}
          <button
            type="button"
            onClick={() => onSelectPage('home')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">مشاهده سایت عمومی</span>
          </button>
        </div>
      </header>

      {/* Main CMS Layout (Sidebar + Content Canvas) */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
        {/* Sidebar Menu */}
        <aside className="w-full lg:w-64 bg-[#0a1228] border-b lg:border-b-0 lg:border-e border-white/10 p-3 lg:p-4 flex flex-row lg:flex-col gap-1 overflow-x-auto shrink-0">
          <div className="hidden lg:flex items-center justify-between pb-3 mb-2 border-b border-white/10 px-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            <span>ماژول‌های مدیریت (Modules)</span>
          </div>

          {[
            { id: 'dashboard', label: 'داشبورد سیستم', icon: LayoutDashboard, badge: 'Live' },
            { id: 'pages', label: 'صفحات و سکشن‌ها', icon: Layers, badge: '6 Block' },
            { id: 'services', label: 'خدمات و راهکارها', icon: Briefcase, badge: '6' },
            { id: 'portfolio', label: 'نمونه‌کارها و پروژه‌ها', icon: Sparkles, badge: '4' },
            { id: 'i18n', label: 'بین‌الملل و ارزها', icon: Globe, badge: '5 Lang' },
            { id: 'crm', label: 'استعلام‌ها و فرم‌ها', icon: MessageSquare, badge: `${leads.filter(l=>l.status==='NEW').length} جدید` },
            { id: 'media', label: 'کتابخانه رسانه S3', icon: ImageIcon, badge: 'WebP' },
            { id: 'seo', label: 'سئو و اسکیما', icon: Search, badge: '100%' },
            { id: 'rbac', label: 'کاربران و دسترسی', icon: Users, badge: 'RBAC' },
            { id: 'system', label: 'وضعیت سرور و ردیس', icon: Server, badge: 'OK' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id as any)}
                className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge.includes('جدید')
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold animate-pulse'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#060a14] overflow-y-auto">
          {/* ==========================================
              1. DASHBOARD VIEW
             ========================================== */}
          {activeSection === 'dashboard' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              {/* Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-[#0b1638] to-[#0a1228] border border-white/10 shadow-xl">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-sky-400">خوش آمدید، مدیر ارشد سیستم (SUPER_ADMIN)</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">مرکز فرماندهی و مدیریت محتوای علاءالدین DXP</h2>
                  <p className="text-xs text-slate-400">تمام تغییرات از طریق معماری API-First روی سرورهای ابری و ردیس همگام‌سازی می‌شوند.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                    <Check className="w-4 h-4" />
                    <span>همه سرویس‌ها فعال و پایدار</span>
                  </div>
                </div>
              </div>

              {/* Stats Metrics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>صفحات فعال و منتشرشده</span>
                    <Layers className="w-4 h-4 text-sky-400" />
                  </div>
                  <span className="text-2xl font-bold text-white font-mono">14</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 100% منتشر در API
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>استعلام‌ها و سرنخ‌های جدید</span>
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-2xl font-bold text-amber-400 font-mono">
                    {leads.filter(l => l.status === 'NEW').length}
                  </span>
                  <span className="text-[10px] text-slate-400">پاسخگویی زیر ۱۵ دقیقه</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>نرخ اصابت کش (Redis Hit Ratio)</span>
                    <Flame className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-2xl font-bold text-emerald-400 font-mono">98.4%</span>
                  <span className="text-[10px] text-slate-400">میانگین پاسخ: 12ms</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>فایل‌های رسانه S3</span>
                    <ImageIcon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-2xl font-bold text-white font-mono">142</span>
                  <span className="text-[10px] text-slate-400">فرمت WebP / AVIF فعال</span>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Inquiries List */}
                <div className="lg:col-span-8 p-5 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-sky-400" />
                      <span>آخرین درخواست‌های مشاوره و استعلام قیمت</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveSection('crm')}
                      className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
                    >
                      مشاهده همه
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all"
                      >
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{lead.name}</span>
                            <span className="text-[10px] font-mono text-slate-400" dir="ltr">{lead.phone}</span>
                          </div>
                          <span className="text-[11px] text-slate-400">{lead.service}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            lead.status === 'NEW' 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : lead.status === 'IN_PROGRESS'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {lead.status === 'NEW' ? 'جدید' : lead.status === 'IN_PROGRESS' ? 'در حال بررسی' : 'تماس گرفته شد'}
                          </span>
                          <span className="text-[10px] text-slate-400">{lead.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Infrastructure Card */}
                <div className="lg:col-span-4 p-5 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-white/10">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span>سلامت زیرساخت (Health Probes)</span>
                  </h3>
                  <div className="flex flex-col gap-3 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                      <span className="text-slate-300">PostgreSQL Relational DB</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono">
                        <Check className="w-3.5 h-3.5" /> 100% OK
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                      <span className="text-slate-300">Redis 7 In-Memory Cache</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono">
                        <Check className="w-3.5 h-3.5" /> 1.2ms Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                      <span className="text-slate-300">S3 Object Storage</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono">
                        <Check className="w-3.5 h-3.5" /> Connected
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                      <span className="text-slate-300">REST API Gateway</span>
                      <span className="text-sky-400 font-bold font-mono">/api/v1 (Online)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              2. PAGES & SECTIONS BUILDER
             ========================================== */}
          {activeSection === 'pages' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-bold text-white">مدیریت ساختار صفحه اصلی و سکشن‌های داینامیک</h2>
                  <p className="text-xs text-slate-400">جابجایی چیدمان، فعال/غیرفعال‌سازی سکشن‌ها و ویرایش متون بدون نیاز به بازنویسی کد.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveAndDeploy}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>ذخیره چیدمان</span>
                  </button>
                </div>
              </div>

              {/* Language Switcher Tabs for Content */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0a1228] border border-white/10 w-fit">
                {(['fa', 'en', 'ar', 'tr', 'de'] as LocaleKey[]).map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setActiveLocaleTab(loc)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                      activeLocaleTab === loc
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>

              {/* Editable Hero Heading */}
              <div className="p-5 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-3">
                <label className="text-xs font-bold text-sky-400 flex items-center justify-between">
                  <span>تیتر اصلی سکشن هیرو ({activeLocaleTab.toUpperCase()})</span>
                  <span className="text-[10px] text-slate-400">H1 Headline Tag</span>
                </label>
                <input
                  type="text"
                  value={
                    activeLocaleTab === 'fa'
                      ? heroHeadingFa
                      : activeLocaleTab === 'en'
                      ? heroHeadingEn
                      : heroHeadingAr
                  }
                  onChange={(e) => {
                    if (activeLocaleTab === 'fa') setHeroHeadingFa(e.target.value);
                    else if (activeLocaleTab === 'en') setHeroHeadingEn(e.target.value);
                    else setHeroHeadingAr(e.target.value);
                  }}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#060a14] border border-white/10 text-white text-xs outline-none focus:border-sky-400 transition-colors"
                />
              </div>

              {/* Blocks Reordering and Toggle List */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">سکشن‌های فعال صفحه اصلی</h3>
                {blocks.map((b, idx) => (
                  <div
                    key={b.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      b.enabled
                        ? 'bg-[#0a1228] border-white/15'
                        : 'bg-[#0a1228]/50 border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-white/5 text-slate-400 text-xs font-mono font-bold flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">
                          {activeLocaleTab === 'fa' ? b.titleFa : b.titleEn}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Type: {b.type} · {b.badgeFa}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleBlock(b.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                          b.enabled
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {b.enabled ? 'فعال در خروجی' : 'مخفی'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================
              3. I18N & MULTI-MARKET VIEW
             ========================================== */}
          {activeSection === 'i18n' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-lg font-bold text-white">تنظیمات بین‌الملل، زبان‌ها و نرخ تبدیل ارزهای منطقه‌ای</h2>
                <p className="text-xs text-slate-400">جداسازی کامل مفهوم «زبان (Language)» از «کشور/بازار (Market)» با پشتیبانی از چندارزی زنده.</p>
              </div>

              {/* Currency Rates Editor */}
              <div className="p-5 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-4">
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">نرخ تبدیل ارزها به ازای پایه تومان (IRR)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currencies.map((curr) => (
                    <div key={curr.code} className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{curr.name}</span>
                        <span className="font-mono text-xs text-amber-400 font-bold">{curr.symbol} {curr.code}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400">ضریب محاسبه:</span>
                        <span className="font-mono font-bold text-emerald-400" dir="ltr">{curr.rate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fallback Resolver Preview Box */}
              <div className="p-5 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">موتور هوشمند فال‌بک زبان (Fallback Engine Test)</h3>
                <p className="text-xs text-slate-400">اگر کاربری با لوکال `pt-BR` یا `de-AT` وارد سایت شود، سیستم بدون خطا مناسب‌ترین ترجمه را برمی‌گرداند:</p>
                <div className="p-3 rounded-xl bg-[#060a14] border border-white/10 font-mono text-xs text-slate-300">
                  <span className="text-sky-400">GET</span> /api/v1/pages/home?lang=pt-BR<br />
                  <span className="text-slate-500">→</span> Resolved Locale: <span className="text-amber-400">"en"</span> (Fallback to default system language with zero broken keys).
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              4. CRM & LEADS VIEW
             ========================================== */}
          {activeSection === 'crm' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-bold text-white">مدیریت استعلام‌ها و سرنخ‌های فروش (Inquiries CRM)</h2>
                  <p className="text-xs text-slate-400">مشاهده و پیگیری درخواست‌های پیش‌فاکتور آنلاین و مشاوره ثبت‌شده در سایت.</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-600/20 text-sky-400 border border-blue-500/30 font-bold">
                  {leads.length} سرنخ ثبت‌شده
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a1228]">
                <table className="w-full text-start text-xs">
                  <thead>
                    <tr className="bg-white/5 text-slate-400 border-b border-white/10">
                      <th className="p-3 text-start">کسب‌وکار / کارفرما</th>
                      <th className="p-3 text-start">شماره تماس</th>
                      <th className="p-3 text-start">سرویس درخواستی</th>
                      <th className="p-3 text-start">زمان ثبت</th>
                      <th className="p-3 text-start">وضعیت پیگیری</th>
                      <th className="p-3 text-start">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-bold text-white">{l.name}</td>
                        <td className="p-3 font-mono text-sky-300" dir="ltr">{l.phone}</td>
                        <td className="p-3 text-slate-300">{l.service}</td>
                        <td className="p-3 text-slate-400">{l.date}</td>
                        <td className="p-3">
                          <select
                            value={l.status}
                            onChange={(e) => updateLeadStatus(l.id, e.target.value as any)}
                            className="bg-[#060a14] border border-white/10 text-xs text-white rounded-lg px-2 py-1 outline-none"
                          >
                            <option value="NEW">جدید (NEW)</option>
                            <option value="IN_PROGRESS">در حال بررسی (IN_PROGRESS)</option>
                            <option value="CONTACTED">تماس گرفته شد (CONTACTED)</option>
                            <option value="ARCHIVED">آرشیو (ARCHIVED)</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <a
                            href={`tel:${l.phone}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white transition-colors"
                          >
                            تماس فوری
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==========================================
              5. SEO & SCHEMA VIEW
             ========================================== */}
          {activeSection === 'seo' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-lg font-bold text-white">تنظیمات سئو تکنیکال و پیش‌نمایش زنده در گوگل (SERP Simulator)</h2>
                <p className="text-xs text-slate-400">تولید خودکار اسکیماهای Organization، Service و بررسی ارتباطات Hreflang بین‌المللی.</p>
              </div>

              {/* Google SERP Preview Card */}
              <div className="p-5 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">پیش‌نمایش خروجی در نتایج جستجوی گوگل</span>
                <div className="p-4 rounded-xl bg-white text-slate-900 shadow-lg flex flex-col gap-1 max-w-2xl" dir="rtl">
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-mono" dir="ltr">
                    <span className="text-emerald-700 font-bold">https://aladdinltd.com</span>
                    <span>› fa</span>
                  </div>
                  <h4 className="text-base font-bold text-[#1a0dab] hover:underline cursor-pointer">
                    {seoTitle}
                  </h4>
                  <p className="text-xs text-[#4d5156] leading-relaxed">
                    {seoDescription}
                  </p>
                </div>
              </div>

              {/* SEO Title & Description Inputs */}
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-300">Meta Title (عنوان مرورگر و سرچ)</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#060a14] border border-white/10 text-white text-xs outline-none focus:border-sky-400"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-300">Meta Description (توضیحات متای صفحه)</label>
                  <textarea
                    rows={3}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#060a14] border border-white/10 text-white text-xs outline-none focus:border-sky-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              6. MEDIA LIBRARY VIEW
             ========================================== */}
          {activeSection === 'media' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-bold text-white">کتابخانه رسانه و ذخیره‌سازی شیءمحور S3</h2>
                  <p className="text-xs text-slate-400">تمام تصاویر به‌صورت خودکار به فرمت کم‌حجم WebP و AVIF تبدیل می‌شوند.</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('آپلود تصویر جدید در شبیه‌ساز S3 با موفقیت انجام شد.')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>آپلود فایل جدید</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { name: 'adaksteel-mockup.webp', size: '142 KB', dimensions: '1920x1080', tag: 'Portfolio' },
                  { name: 'arkabast-store.webp', size: '98 KB', dimensions: '1200x800', tag: 'E-commerce' },
                  { name: 'aladdin-brand-logo.svg', size: '12 KB', dimensions: 'Vector SVG', tag: 'Brand' },
                  { name: 'azarkar-bitumen-rfq.webp', size: '180 KB', dimensions: '1920x1080', tag: 'Export' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-2 hover:border-sky-400/40 transition-colors">
                    <div className="h-28 rounded-xl bg-[#060a14] border border-white/5 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-sky-400 opacity-60" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white truncate" dir="ltr">{item.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.size} · {item.dimensions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================
              7. SYSTEM & CACHE VIEW
             ========================================== */}
          {(activeSection === 'system' || activeSection === 'rbac' || activeSection === 'services' || activeSection === 'portfolio') && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-lg font-bold text-white">تنظیمات سیستم، سطوح دسترسی (RBAC) و پایگاه داده</h2>
                <p className="text-xs text-slate-400">تمام درخواست‌های CMS از گارد احراز هویت سرور و رول‌های RBAC عبور می‌کنند.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-3">
                  <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">ماتریس نقش‌های سازمانی (RBAC)</h3>
                  <div className="flex flex-col gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
                      <span className="font-bold text-white">SUPER_ADMIN</span>
                      <span className="text-emerald-400">دسترسی تام به سرور و تنظیمات</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
                      <span className="font-bold text-white">ADMIN</span>
                      <span className="text-slate-300">مدیریت محتوا، رسانه و استعلام‌ها</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
                      <span className="font-bold text-white">EDITOR</span>
                      <span className="text-slate-300">تولید و ویرایش پیش‌نویس مقالات</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
                      <span className="font-bold text-white">SEO_MANAGER</span>
                      <span className="text-slate-300">تنظیم تگ‌ها، ریدایرکت و اسکیما</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0a1228] border border-white/10 flex flex-col gap-3">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">لاگ ممیزی و امنیت (Audit Log)</h3>
                  <div className="flex flex-col gap-2 text-[11px] font-mono">
                    <div className="p-2 rounded-lg bg-white/5 text-slate-300">
                      <span className="text-emerald-400">[2026-09-24 22:50]</span> user:admin@aladdinltd.com ACTION: UPDATE_PRICING IP: 192.168.1.10
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 text-slate-300">
                      <span className="text-emerald-400">[2026-09-24 22:45]</span> user:admin@aladdinltd.com ACTION: FLUSH_REDIS_CACHE IP: 192.168.1.10
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 text-slate-300">
                      <span className="text-emerald-400">[2026-09-24 22:30]</span> user:editor@aladdinltd.com ACTION: DRAFT_PAGE_HERO IP: 192.168.1.14
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
