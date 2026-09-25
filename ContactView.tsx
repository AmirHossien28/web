import React, { useState } from 'react';
import { LocaleKey } from '../../types';
import { I18N_DATA } from '../../data/i18n';

interface ContactViewProps {
  isLightMode: boolean;
  currentLocale: LocaleKey;
}

export const ContactView: React.FC<ContactViewProps> = ({ isLightMode, currentLocale }) => {
  const content = I18N_DATA[currentLocale];
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const branches = [
    {
      city: 'تهران (دفتر مرکزی)',
      address: 'خیابان شریعتی، بالاتر از میرداماد، برج فناوری صبا، طبقه ۸',
      phone: '9000 9830',
      direct: '+98 21 8845 2200',
      status: 'فعال - پذیرش حضوری با هماهنگی',
    },
    {
      city: 'دبی (دفتر بین‌الملل خاورمیانه)',
      address: 'Sheikh Zayed Rd, Trade Centre 1, Dubai, UAE',
      phone: '+971 4 234 5678',
      direct: '+971 4 234 5678',
      status: 'فعال - پشتیبانی پروژه‌های ارزی و چندزبانه',
    },
    {
      city: 'لندن (مرکز زیرساخت ابری اروپا)',
      address: 'Level 14, 1 Canada Square, Canary Wharf, London, UK',
      phone: '+44 20 7946 0912',
      direct: '+44 20 7946 0912',
      status: 'فعال - پشتیبانی DevOps و سرورهای ابری',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPhone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-sky-400 border border-sky-400/20 text-xs font-bold mb-3">
          <span className="material-symbols-outlined text-[16px]">call</span>
          <span>ارتباط مستقیم با مشاوران ارشد و مدیریت فنی</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          تماس با شرکت طراحی سایت علاءالدین
        </h1>
        <p className="text-sm text-slate-400">
          برای برگزاری جلسات حضوری، مشاوره تلفنی، درخواست دمو و بررسی طرح‌های بین‌المللی همراه شما هستیم.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Contact Form (7 cols) */}
        <div className={`lg:col-span-7 rounded-3xl border p-6 sm:p-8 flex flex-col gap-5 shadow-xl ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
        }`}>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400">mail</span>
            <span>ارسال پیام و ثبت درخواست جلسه آنلاین</span>
          </h3>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex flex-col items-center text-center gap-3">
              <span className="material-symbols-outlined text-emerald-400 text-[36px]">mark_email_read</span>
              <h4 className="text-base font-bold text-emerald-400">پیام شما با موفقیت ارسال شد</h4>
              <p className="text-xs text-slate-300">
                کارشناس فنی علاءالدین در سریع‌ترین زمان ممکن با شما تماس حاصل خواهد نمود.
              </p>
              <button
                type="button"
                onClick={() => { setSubmitted(false); setFormMessage(''); }}
                className="mt-2 text-xs text-sky-400 underline font-semibold cursor-pointer"
              >
                ارسال پیام دیگر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="مثلاً: احمد رضایی"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#060a14] border border-white/10 text-xs text-white outline-none focus:border-sky-400"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-300">شماره تماس مستقیم</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="0912..."
                    className="w-full h-11 px-3.5 rounded-xl bg-[#060a14] border border-white/10 text-xs font-mono text-white outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-300">ایمیل کاری (اختیاری جهت ارسال پیش‌فاکتور)</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#060a14] border border-white/10 text-xs text-white outline-none focus:border-sky-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-300">متن پیام یا شرح نیازمندی‌های پروژه</label>
                <textarea
                  rows={4}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="لطفاً زمینه کاری، تعداد زبان‌ها و امکانات مدنظرتان را مرقوم بفرمایید..."
                  className="w-full p-3.5 rounded-xl bg-[#060a14] border border-white/10 text-xs text-white outline-none focus:border-sky-400"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>ارسال پیام به واحد مهندسی</span>
              </button>
            </form>
          )}
        </div>

        {/* Quick Contact Info Sidebar (5 cols) */}
        <div className={`lg:col-span-5 rounded-3xl border p-6 sm:p-8 flex flex-col gap-6 shadow-xl ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
        }`}>
          <h3 className="text-lg font-bold">راه‌های ارتباطی سریع</h3>

          <div className="flex flex-col gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-[#171f35] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sky-400 text-[24px]">call</span>
                <div className="flex flex-col">
                  <span className="font-bold text-white">خط ویژه سراسری (بدون پیش‌شماره)</span>
                  <span className="text-[11px] text-slate-400">پاسخگویی فوری کارشناسان</span>
                </div>
              </div>
              <a href={`tel:${content.marketContact.hotline}`} className="font-mono text-base font-bold text-sky-400" dir="ltr">
                {content.marketContact.hotlineFormatted}
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#171f35] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-400 text-[24px]">chat</span>
                <div className="flex flex-col">
                  <span className="font-bold text-white">پشتیبانی واتساپ و تلگرام</span>
                  <span className="text-[11px] text-slate-400">ارسال فایل و پروپوزال</span>
                </div>
              </div>
              <a href={content.marketContact.whatsapp} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500 hover:text-white transition-all">
                چت آنلاین
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#171f35] border border-white/5 flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-400 text-[24px] shrink-0">schedule</span>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-white">ساعات کاری و پشتیبانی</span>
                <span className="text-slate-400">شنبه تا چهارشنبه: ۹:۰۰ الی ۱۸:۰۰</span>
                <span className="text-emerald-400 font-semibold">تیم مانیتورینگ سرورها: ۲۴ ساعته فعال</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Branches Grid */}
      <div>
        <h3 className="text-xl font-bold mb-6">دفاتر و مراکز منطقه‌ای علاءالدین DXP</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((b, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border flex flex-col justify-between shadow-md ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <h4 className="text-sm font-bold text-white">{b.city}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{b.address}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="font-mono text-sky-400 font-bold" dir="ltr">{b.phone}</span>
                <span className="text-[10px] text-emerald-400">{b.status.split('-')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
