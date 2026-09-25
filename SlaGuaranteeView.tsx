import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  Key, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  PhoneCall, 
  Layers, 
  Server, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { LocaleKey } from '../../types';

interface SlaGuaranteeViewProps {
  currentLocale: LocaleKey;
  onOpenConsult: () => void;
  onSelectPage: (page: any) => void;
}

export const SlaGuaranteeView: React.FC<SlaGuaranteeViewProps> = ({
  currentLocale,
  onOpenConsult,
  onSelectPage,
}) => {
  const isFa = currentLocale === 'fa';
  const [activeTier, setActiveTier] = useState<'standard' | 'enterprise' | 'mission_critical'>('enterprise');

  return (
    <div className="py-12 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isFa ? 'قرارداد حقوقی شفاف و تضمین کیفیت نرم‌افزار' : 'Official SLA & Enterprise Warranty'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isFa ? 'تعهدات سطح کیفیت خدمات (SLA) علاءالدین' : 'Guaranteed 99.98% Uptime & Source Code Ownership'}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            {isFa
              ? 'توسعه نرم‌افزار پایدار همراه با تحویل ۱۰۰٪ سورس‌کد، انتقال مالکیت معنوی، پشتیبانی ۲۴/۷ و جریمه دیرکرد رسمی در قرارداد.'
              : 'Enterprise reliability backed by legal SLA, full IP transfer, sub-second response times, and 24/7 dedicated engineering support.'}
          </p>
        </div>

        {/* 4 Core Pillars of Aladdin Guarantee */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
              <Key className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-white mb-2">
              {isFa ? 'مالکیت ۱۰۰٪ سورس‌کد' : '100% IP & Code Handover'}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isFa
                ? 'مخزن گیت‌لب/گیت‌هاب کامل بدون هیچ‌گونه قفل نرم‌افزاری یا انحصار پلتفرمی به نام کارفرما تحویل داده می‌شود.'
                : 'Zero vendor lock-in. Full production repositories, CI/CD pipelines, and documentation belong to your business.'}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Server className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-white mb-2">
              {isFa ? 'پایداری ۹۹.۹۸٪ (Uptime SLA)' : '99.98% High Availability'}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isFa
                ? 'زیرساخت ابری با قابلیت Self-healing و Failover خودکار تا در پرترافیک‌ترین روزهای سال حتی یک ثانیه قطعی نداشته باشید.'
                : 'Multi-datacenter redundancy and automated health failover to protect continuous commerce.'}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-white mb-2">
              {isFa ? 'پاسخ‌دهی زیر ۱۵ دقیقه در بحران' : 'Sub-15m Incident Response'}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isFa
                ? 'در رخدادهای بحرانی (P1/Severity 1)، مهندسین ارشد DevOps علاءالدین در کمتر از ۱۵ دقیقه در دسترس خواهند بود.'
                : 'Dedicated incident management on-call team for critical business operational emergencies.'}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-white mb-2">
              {isFa ? 'گارانتی و بیمه امنیتی OWASP' : 'OWASP Top 10 Security Guarantee'}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isFa
                ? 'تست نفوذ استاندارد، گواهی SSL اختصاصی، فایروال ضد DDoS لایه ۳، ۴ و ۷ و حفاظت کامل از داده‌های بانکی و اطلاعات کاربران.'
                : 'End-to-end encryption, automated vulnerability scanners, and layered Web Application Firewall.'}
            </p>
          </div>
        </div>

        {/* SLA Incident Matrix Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-16 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">
                {isFa ? 'ماتریس طبقه‌بندی فوریت و زمان پاسخ‌گویی پشتیبانی' : 'Incident Severity & SLA Response Matrix'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isFa
                  ? 'این زمان‌بندی‌ها رسماً ضمیمه قرارداد رسمی طرفین شده و دارای ضمانت اجرایی است.'
                  : 'Binding contractual benchmarks documented in all enterprise master service agreements.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenConsult}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Download className="w-4 h-4" />
              {isFa ? 'دریافت پیش‌نویس قرارداد PDF' : 'Download Sample SLA PDF'}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-slate-300 text-right rtl:text-right ltr:text-left">
              <thead className="bg-slate-950 text-slate-400 uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">{isFa ? 'سطح فوریت' : 'Severity Level'}</th>
                  <th className="py-3 px-4 font-semibold">{isFa ? 'تعریف رخداد' : 'Definition'}</th>
                  <th className="py-3 px-4 font-semibold">{isFa ? 'حداکثر زمان پاسخ اولیه' : 'First Response'}</th>
                  <th className="py-3 px-4 font-semibold">{isFa ? 'حداکثر زمان رفع موقت' : 'Mitigation Time'}</th>
                  <th className="py-3 px-4 font-semibold">{isFa ? 'کانال ارتباطی' : 'Escalation Channel'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-red-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    P1 - Critical
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {isFa ? 'توقف کامل سایت، عدم امکان ثبت سفارش، اختلال درگاه بانکی' : 'Complete service outage, checkout disabled, database failover'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">&lt; 15 دقیقه</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400">&lt; ۲ ساعت</td>
                  <td className="py-3.5 px-4 text-slate-400">{isFa ? 'خط تلفن اضطراری + پیامک DevOps' : 'Direct Dedicated Phone + SMS Alert'}</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    P2 - Major
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {isFa ? 'کندی محسوس سیستم، از کار افتادن یک ماژول فرعی مثل پیامک' : 'Degraded performance, non-blocking module glitch'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">&lt; ۱ ساعت</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400">&lt; ۶ ساعت</td>
                  <td className="py-3.5 px-4 text-slate-400">{isFa ? 'تیکت پرسرعت + اسلک/تلگرام اختصاصی' : 'Priority Ticket + Private Slack'}</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-blue-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    P3 - Moderate
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {isFa ? 'ایرادات ظاهری در برخی مرورگرها، خطای نگارشی محتوا' : 'UI cosmetic alignment bug, minor text rendering'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">&lt; ۴ ساعت</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400">&lt; ۲۴ ساعت</td>
                  <td className="py-3.5 px-4 text-slate-400">{isFa ? 'پورتال پشتیبانی مشتریان علاءالدین' : 'Client Helpdesk Portal'}</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                    P4 - Minor / RFC
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {isFa ? 'درخواست قابلیت جدید، گزارش‌گیری سفارشی، مشاوره توسعه' : 'New feature request, custom export schema, advisory'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">&lt; ۸ ساعت</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{isFa ? 'بر اساس اسپرینت' : 'Sprint Roadmap'}</td>
                  <td className="py-3.5 px-4 text-slate-400">{isFa ? 'جلسه برنامه‌ریزی ماهانه' : 'Monthly Roadmap Review'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Contractual Clauses FAQ / Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-400" />
              {isFa ? 'بندهای کلیدی قرارداد حقوقی علاءالدین' : 'Key Legal Contract Clauses'}
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">{isFa ? 'بند جریمه تاخیر تحویل پروژه: ' : 'Delivery Penalty Clause: '}</strong>
                  {isFa
                    ? 'به ازای هر روز تاخیر غیرموجه از زمانبندی توافق‌شده، ۱٪ از مبلغ فاز به کارفرما عودت داده می‌شود.'
                    : 'A formal daily penalty rate is credited to client if timeline milestones are delayed.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">{isFa ? 'قرارداد عدم افشا (NDA): ' : 'Strict Mutual NDA: '}</strong>
                  {isFa
                    ? 'حفاظت حقوقی کامل از ایده‌ها، لیست مشتریان، منطق مالی و دیتابیس کسب‌وکار شما با امضای رسمی.'
                    : 'Confidential business logic, transactional data, and customer identities legally safeguarded.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">{isFa ? 'گارانتی باگ رایگان ۱۲ ماهه: ' : '12-Month Bug-Free Warranty: '}</strong>
                  {isFa
                    ? 'تا یک سال پس از لانچ، هرگونه باگ احتمالی در منطق پیاده‌سازی شده بدون هزینه و فوری رفع می‌گردد.'
                    : 'Zero-cost remediation for any architectural bugs discovered within the first 12 months.'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 via-slate-900 to-indigo-900/30 border border-blue-800/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                {isFa ? 'نیاز به توافق‌نامه SLA اختصاصی سازمانی دارید؟' : 'Need Custom Enterprise Terms?'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {isFa
                  ? 'تیم حقوقی و فنی علاءالدین آماده برگزاری جلسه حضوری یا آنلاین با مدیران IT و بخش حقوقی شرکت شما برای تدوین دقیق‌ترین جزئیات قرارداد و تست نفوذ است.'
                  : 'Our legal and engineering leads are available to review custom enterprise compliance, data residency, and SLA thresholds.'}
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={onOpenConsult}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/30 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                {isFa ? 'تنظیم جلسه بررسی قرارداد با مدیران پروژه' : 'Schedule Legal & SLA Meeting'}
              </button>
              <button
                type="button"
                onClick={() => onSelectPage('pricing-calculator')}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition-colors"
              >
                {isFa ? 'محاسبه آنلاین هزینه پروژه با پلن‌های SLA' : 'Calculate Package with SLA Tiers'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
