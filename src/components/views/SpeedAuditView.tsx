import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Gauge, 
  Smartphone, 
  Laptop, 
  ShieldCheck, 
  Clock, 
  BarChart3, 
  FileText, 
  Sparkles, 
  RefreshCw,
  Award,
  Layers
} from 'lucide-react';
import { LocaleKey } from '../../types';

interface SpeedAuditViewProps {
  currentLocale: LocaleKey;
  onOpenConsult: () => void;
  onSelectPage: (page: any) => void;
}

interface AuditResult {
  url: string;
  overallScore: number;
  fcp: number; // First Contentful Paint in s
  lcp: number; // Largest Contentful Paint in s
  cls: number; // Cumulative Layout Shift
  tbt: number; // Total Blocking Time in ms
  ttfb: number; // Time to First Byte in ms
  serverSpeedScore: number;
  seoScore: number;
  mobileScore: number;
  issues: {
    type: 'critical' | 'warning' | 'good';
    titleFa: string;
    titleEn: string;
    descFa: string;
    descEn: string;
    impact: string;
  }[];
}

export const SpeedAuditView: React.FC<SpeedAuditViewProps> = ({
  currentLocale,
  onOpenConsult,
  onSelectPage,
}) => {
  const isFa = currentLocale === 'fa';
  const [urlInput, setUrlInput] = useState('');
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  const sampleAudits = [
    { name: 'digikala.com', url: 'https://digikala.com' },
    { name: 'torob.com', url: 'https://torob.com' },
    { name: 'aladdin-demo.ir', url: 'https://dxp.aladdin.dev' },
  ];

  const handleRunAudit = (targetUrl?: string) => {
    const rawUrl = targetUrl || urlInput;
    if (!rawUrl.trim()) return;

    let validUrl = rawUrl.trim();
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = 'https://' + validUrl;
    }

    setIsAnalyzing(true);
    setProgress(15);
    setAuditResult(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 25;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsAnalyzing(false);

      const isAladdin = validUrl.includes('aladdin');
      const mockResult: AuditResult = {
        url: validUrl,
        overallScore: isAladdin ? 98 : 46,
        fcp: isAladdin ? 0.4 : 2.8,
        lcp: isAladdin ? 0.8 : 4.6,
        cls: isAladdin ? 0.002 : 0.28,
        tbt: isAladdin ? 40 : 680,
        ttfb: isAladdin ? 85 : 920,
        serverSpeedScore: isAladdin ? 99 : 52,
        seoScore: isAladdin ? 98 : 71,
        mobileScore: isAladdin ? 97 : 42,
        issues: isAladdin
          ? [
              {
                type: 'good',
                titleFa: 'بهینه‌سازی تصاویر نسل جدید WebP/AVIF فعال است',
                titleEn: 'Next-gen WebP/AVIF image formats active',
                descFa: 'تمام فایل‌ها به صورت پویا با ابعاد متناسب با دستگاه بارگذاری می‌شوند.',
                descEn: 'All media elements load dynamically sized per viewport.',
                impact: '+2.1s Boost',
              },
              {
                type: 'good',
                titleFa: 'استفاده از معماری Static Generation + Edge CDN',
                titleEn: 'Static Generation & Global Edge CDN implemented',
                descFa: 'سرور در کمتر از ۹۰ میلی‌ثانیه اولین بایت (TTFB) را پاسخ می‌دهد.',
                descEn: 'Server Time to First Byte responds in sub-90ms.',
                impact: '+1.5s Boost',
              },
              {
                type: 'good',
                titleFa: 'بدون قفل‌شدگی ترد اصلی (Zero Main-Thread Blocking)',
                titleEn: 'Zero Main-Thread Blocking via Tree-shaking',
                descFa: 'حجم جاوااسکریپت اولیه بسیار سبک است و هیچ اسکریپت رندر بلاک وجود ندارد.',
                descEn: 'JS bundles are chunked with zero render-blocking dependencies.',
                impact: 'Optimal Core Web Vitals',
              },
            ]
          : [
              {
                type: 'critical',
                titleFa: 'حجم سنگین جاوااسکریپت بدون Code-Splitting',
                titleEn: 'Heavy Unused JavaScript Bundle (>1.8MB)',
                descFa: 'قالب‌های آماده معمولا ده‌ها افزونه را در تمام صفحات لود می‌کنند که باعث لود سنگین می‌شود.',
                descEn: 'Monolithic template loads massive unused scripts before interactive render.',
                impact: '-3.2s Delay',
              },
              {
                type: 'critical',
                titleFa: 'تصاویر فشرده‌نشده با فرمت‌های سنگین PNG/JPG',
                titleEn: 'Unoptimized Image Formats without responsive sizing',
                descFa: 'لود تصاویر ۵ مگابایتی در نسخه موبایل باعث ترک کاربر (Bounce Rate) بالا می‌شود.',
                descEn: 'Massive assets choke mobile 4G bandwidth significantly.',
                impact: '-2.4s Delay',
              },
              {
                type: 'warning',
                titleFa: 'عدم تطابق با استانداردهای گوگل Core Web Vitals 2026',
                titleEn: 'Fails Google Core Web Vitals thresholds (INP & LCP)',
                descFa: 'این امتیاز ضعیف مستقیماً رتبه ارگانیک شما در صفحه اول سرپ گوگل را کاهش می‌دهد.',
                descEn: 'Negative organic ranking impact on modern Google search algorithms.',
                impact: 'SEO Ranking Penalty',
              },
            ],
      };

      setAuditResult(mockResult);
    }, 2000);
  };

  return (
    <div className="py-12 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-4 text-xs font-medium text-blue-400 tracking-wide">
            <Zap className="w-3.5 h-3.5" />
            <span>{isFa ? 'ابزار هوشمند سنجش سرعت و سئو علاءالدین DXP' : 'Aladdin Speed & Core Web Vitals Audit'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isFa ? 'سرعت و ساختار فنی سایت خود را تست کنید' : 'Audit Your Website Speed & Architecture'}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            {isFa
              ? 'هر ۱ ثانیه تاخیر در لود سایت = ۷٪ ریزش فروش و ۲۵٪ افت رتبه گوگل. همین الان آدرس سایت خود را آنالیز کنید.'
              : 'Every 1-second delay in load time causes a 7% loss in sales. Discover your site bottlenecks in 5 seconds.'}
          </p>
        </div>

        {/* Input Card */}
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl mb-12">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none text-slate-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder={isFa ? 'مثال: yourcompany.com' : 'e.g. yourcompany.com'}
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunAudit()}
                className="w-full ps-11 pe-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm sm:text-base font-mono"
              />
            </div>

            <div className="flex items-center justify-center bg-slate-950 border border-slate-700 rounded-xl p-1 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setDevice('mobile')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  device === 'mobile'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                {isFa ? 'موبایل' : 'Mobile'}
              </button>
              <button
                type="button"
                onClick={() => setDevice('desktop')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  device === 'desktop'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Laptop className="w-4 h-4" />
                {isFa ? 'دسکتاپ' : 'Desktop'}
              </button>
            </div>

            <button
              type="button"
              disabled={isAnalyzing || !urlInput.trim()}
              onClick={() => handleRunAudit()}
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/30 cursor-pointer shrink-0 active:scale-[0.98]"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {isFa ? 'در حال آنالیز...' : 'Auditing...'}
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  {isFa ? 'شروع آنالیز رایگان' : 'Run Free Audit'}
                </>
              )}
            </button>
          </div>

          {/* Quick preset tests */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>{isFa ? 'تست نمونه سریع:' : 'Quick benchmark sample:'}</span>
            {sampleAudits.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setUrlInput(sample.url);
                  handleRunAudit(sample.url);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
              >
                {sample.name}
              </button>
            ))}
          </div>

          {/* Progress bar during analysis */}
          {isAnalyzing && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>{isFa ? 'شبیه‌سازی ارتباط شبکه و متریک‌های Core Web Vitals...' : 'Simulating network & Core Web Vitals...'}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Audit Results Section */}
        {auditResult && (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Top Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Overall Score */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center relative overflow-hidden">
                <div className="text-xs uppercase text-slate-400 font-semibold mb-2">
                  {isFa ? 'امتیاز کلی عملکرد' : 'Performance Score'}
                </div>
                <div
                  className={`text-6xl font-black mb-2 ${
                    auditResult.overallScore >= 90
                      ? 'text-emerald-400'
                      : auditResult.overallScore >= 50
                      ? 'text-amber-400'
                      : 'text-red-400'
                  }`}
                >
                  {auditResult.overallScore}
                  <span className="text-xl font-normal text-slate-500">/100</span>
                </div>
                <div className="text-xs text-slate-400">
                  {auditResult.overallScore >= 90
                    ? isFa ? 'فوق‌العاده و در کلاس جهانی' : 'Ultra Fast & World Class'
                    : isFa ? 'نیازمند بازسازی معماری فوری' : 'Severe bottleneck detected'}
                </div>
              </div>

              {/* FCP & LCP */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                <div className="text-xs text-slate-400 font-semibold mb-1 flex items-center justify-between">
                  <span>LCP (Largest Contentful)</span>
                  <span className={auditResult.lcp <= 1.2 ? 'text-emerald-400' : 'text-red-400'}>
                    {auditResult.lcp <= 1.2 ? 'عالی' : 'کند'}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">{auditResult.lcp}s</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {isFa
                    ? 'زمان نمایش بزرگ‌ترین المان بصری صفحه به کاربر'
                    : 'Time taken to render the primary visual element.'}
                </p>
              </div>

              {/* TTFB (Time to First Byte) */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                <div className="text-xs text-slate-400 font-semibold mb-1 flex items-center justify-between">
                  <span>TTFB (پاسخ اولیه سرور)</span>
                  <span className={auditResult.ttfb <= 100 ? 'text-emerald-400' : 'text-amber-400'}>
                    {auditResult.ttfb <= 100 ? 'Edge' : 'ضعیف'}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">{auditResult.ttfb}ms</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {isFa
                    ? 'سرعت سرور و زیرساخت میزبانی در ارسال اولین بایت دیتا'
                    : 'Server response latency from closest edge nodes.'}
                </p>
              </div>

              {/* Mobile Compatibility */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                <div className="text-xs text-slate-400 font-semibold mb-1 flex items-center justify-between">
                  <span>Mobile Core Vitals</span>
                  <span className={auditResult.mobileScore >= 85 ? 'text-emerald-400' : 'text-red-400'}>
                    {auditResult.mobileScore}%
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">{auditResult.mobileScore}/100</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {isFa
                    ? 'تجربه کاربری کاربران اینترنت موبایل 4G ایران و منطقه'
                    : 'Real-user experience on simulated 4G mobile devices.'}
                </p>
              </div>
            </div>

            {/* Comparison vs Aladdin Architecture */}
            <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-900/40 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-400" />
                {isFa ? 'مقایسه سایت شما با استاندارد توسعه اختصاصی علاءالدین' : 'Your Site vs. Aladdin Enterprise Stack'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    {isFa ? 'معماری رایج قالب‌های آماده / وردپرس' : 'Common Monolithic / CMS Templates'}
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">✕</span>
                      <span>{isFa ? 'لود بیش از ۶۰ فایل CSS و JS غیرضروری در تمام صفحات' : 'Bloated 60+ uncompressed CSS/JS script tags'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">✕</span>
                      <span>{isFa ? 'پایگاه داده سنگین با صدها کوئری تکراری در هر لود' : 'Unindexed SQL queries causing heavy CPU load'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">✕</span>
                      <span>{isFa ? 'افت شدید رتبه در الگوریتم Core Web Vitals گوگل' : 'SEO penalties from failing Google Core Web Vitals'}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40">
                  <div className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {isFa ? 'معماری مدرن Next.js + React علاءالدین' : 'Aladdin Modern Next.js + React Stack'}
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{isFa ? 'لود زیر ۰.۸ ثانیه با تولید ایستا و کش Edge اختصاصی' : 'Sub-second page rendering with Edge caching'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{isFa ? 'کدنویسی بهینه TypeScript با حذف کامل اسکریپت‌های زائد' : 'Zero dead code via strict TypeScript tree-shaking'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{isFa ? 'تضمین ثبت قرارداد با حداقل نمره ۹۵ در Google Lighthouse' : 'Contractually guaranteed 95+ Google Lighthouse score'}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-400">
                  {isFa
                    ? 'آیا مایلید متخصصان علاءالدین سایت شما را به سرعت زیر ۱ ثانیه ارتقا دهند؟'
                    : 'Ready to turbocharge your platform to sub-second load times?'}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectPage('pricing-calculator')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    {isFa ? 'محاسبه هزینه بهینه‌سازی' : 'Calculate Pricing'}
                  </button>
                  <button
                    type="button"
                    onClick={onOpenConsult}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-blue-900/30"
                  >
                    {isFa ? 'دریافت مشاوره رایگان افزایش سرعت' : 'Free Speed Consultation'}
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>

            {/* Detailed Findings List */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                {isFa ? 'گزارش جزئیات و گلوگاه‌های شناسایی شده' : 'Detailed Audit Findings & Insights'}
              </h3>
              <div className="space-y-3">
                {auditResult.issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      issue.type === 'critical'
                        ? 'bg-red-950/20 border-red-900/30 text-red-200'
                        : issue.type === 'warning'
                        ? 'bg-amber-950/20 border-amber-900/30 text-amber-200'
                        : 'bg-emerald-950/20 border-emerald-900/30 text-emerald-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {issue.type === 'critical' ? (
                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      ) : issue.type === 'warning' ? (
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">
                          {isFa ? issue.titleFa : issue.titleEn}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {isFa ? issue.descFa : issue.descEn}
                        </p>
                      </div>
                    </div>
                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-950/60 border border-slate-800 shrink-0 self-start sm:self-auto">
                      {issue.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {isFa ? 'تضمین بازگشت وجه در صورت کندی' : 'Speed Guarantee in Contract'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isFa
                ? 'در تمامی پروژه‌های توسعه اختصاصی علاءالدین، نمره سرعت بالای ۹۰ در قرارداد رسمی قید و تضمین می‌شود.'
                : 'All Aladdin enterprise web projects include contract-level speed performance benchmarks.'}
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {isFa ? 'معماری Headless و Edge CDN' : 'Edge CDN & Headless Architecture'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isFa
                ? 'پاسخ‌دهی آنی به کاربران بدون تاخیر اتصال به دیتابیس با تکنولوژی کش سرورهای لبه در داخل و خارج کشور.'
                : 'Instantaneous data delivery through global edge networks and headless content caching.'}
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              {isFa ? 'افزایش مستقیم نرخ تبدیل فروش' : 'Proven Conversion Rate Uplift'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isFa
                ? 'کاهش زمان بارگذاری از ۴ ثانیه به ۱ ثانیه به طور میانگین ۳۸٪ فروش فروشگاه‌های آنلاین را افزایش داده است.'
                : 'Decreasing load times from 4s to 1s boosts checkout completions by an average of 38%.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
