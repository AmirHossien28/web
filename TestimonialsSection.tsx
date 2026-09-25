import React from 'react';

interface TestimonialsSectionProps {
  isLightMode: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ isLightMode }) => {
  const testimonials = [
    {
      quote: '«از زمانی که وبسایت ما توسط تیم علاءالدین بازطراحی شد، سرعت لود به کمتر از یک ثانیه رسید و در استعلام روزانه آهن‌آلات، روزانه ده‌ها لید باکیفیت از طریق گوگل دریافت می‌کنیم. پاسخگویی بخش پشتیبانی فنی واقعاً کم‌نظیر است.»',
      author: 'مهندس رامین صفوی',
      role: 'مدیرعامل بازرگانی فولاد آداک',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYNExKGGTjZFRHvz9fNX7KGAYgrwIcMibynvPnbs_mTeAO8tMWxO8IxE3WVwMkazsb-cH1hZ1msrUllwEyCKMy1H92WvTquaKy3fzXndmFZo08IvOgWhG4_VYwmC9fIR8SF7-bn3ElewIhUR0n2ntuV-ERG79ERItS5LQE_WzVu7pR-lBPJtZSMrH3uOLSDrt2oU7cJiurvZH_lFCoeNobVIJjDA1Cp1EtqCocW0GX0JYrgUqQgeUP',
      rating: 5,
    },
    {
      quote: '«فروشگاه اینترنتی ما تنوع کالایی بسیار بالایی دارد و دغدغه اصلی ما هماهنگی فاکتورها با انبار و درگاه بدون قطعی بود. تیم علاءالدین نه تنها سیستم را بدون نقص تحویل داد، بلکه پنل ساده‌ای در اختیار پرسنل قرار داد.»',
      author: 'کیانوش رستمی',
      role: 'بنیان‌گذار آنلاین‌شاپ آرکابست',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQOSgXGqrNlWSV1IEvOltoOkH211xtFU1uhufHhSQA5MyDXt6NOEh6EgeLCdBXzt6huux8bwKfNpGns4FPgBreghY6OP_MiEbhH7fDoF2ElDxRwvhAFekit7SqOKPtoHCEWUvCXd-R5qdLYsJRm0QCrhmCqblytJqYOJjIfpzoemLa6QO1ACUSEm5nsTy4vc1EtkJMZHAS8wgDDxshQAbkeGD4_bZhFt2YKtGxFa_pjykMVOj36vD5',
      rating: 5,
    },
    {
      quote: '«ما به سایتی چندزبانه برای حضور در نمایشگاه‌های بین‌المللی دبی و استانبول نیاز داشتیم. تیم گرافیک و دِو علاءالدین با رعایت بالاترین استانداردهای بصری و سرعت فوق‌العاده پروژه را دقیقاً در موعد تحویل دادند.»',
      author: 'دکتر احسان فیاض',
      role: 'معاونت بازرگانی بین‌الملل آذرکار',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP-rEh9LjNFVEfWApwYdKWkeiZBa9G_wr82gIeFkeTCMHrLOvg67OZ1fxUlAbkViXdlhNeJmES1bFysBNa7V_Oy-6kXS7auogfmvbKwaB4lN_RuDFBHPWCnAb8ib7nQdDYDMzwqtyYYrzKJx5pqbI1CGq4L3Y2brViQgs2O4d8OQk5OkD_u9M255yl1cb4uXigdsVDlbdIOgsLGa-woiTB6GUbdEXh9QjdgNMGvtV50LSB3P14ScuY',
      rating: 5,
    },
  ];

  return (
    <section className="w-full py-20 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <span className={`text-xs font-bold px-3.5 py-1 rounded-full mb-3 border ${
            isLightMode ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          }`}>
            نظرات موثق مدیران مجموعه‌ها
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
            همراه کسب‌وکار شما در مسیر فروش و رشد آنلاین
          </h2>
          <p className="text-sm text-slate-400">
            رشد واقعی درآمد مشتریان و پایداری سامانه‌ها، اصلی‌ترین شناسه عملکرد مهندسی علاءالدین در طول بیش از یک دهه فعالیت است.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border flex flex-col justify-between shadow-md transition-all ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-[#0b1329] border-white/10'
              }`}
            >
              <div className="flex flex-col">
                <div className="flex items-center text-amber-400 gap-1 mb-3 sm:mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                  ))}
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                  isLightMode ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {item.quote}
                </p>
              </div>

              <div className={`flex items-center gap-3 pt-4 border-t ${
                isLightMode ? 'border-slate-100' : 'border-white/5'
              }`}>
                <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-full overflow-hidden shrink-0 border border-white/10 shadow-sm">
                  <img src={item.avatar} alt={item.author} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    {item.author}
                  </span>
                  <span className="text-[11px] text-slate-400">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
