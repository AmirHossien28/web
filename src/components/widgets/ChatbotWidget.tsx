import React, { useState } from 'react';
import { LocaleKey, PageId } from '../../types';
import { I18N_DATA } from '../../data/i18n';

interface ChatbotWidgetProps {
  currentLocale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsultModal: () => void;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickActions?: { label: string; action: () => void }[];
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  currentLocale,
  onNavigate,
  onOpenConsultModal,
}) => {
  const content = I18N_DATA[currentLocale];
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const initialGreeting: Message = {
    sender: 'bot',
    text: currentLocale === 'fa'
      ? 'سلام! به پلتفرم طراحی سایت علاءالدین خوش آمدید. چگونه می‌توانم در مسیر طراحی وب‌سایت یا فروشگاه اینترنتی کمکتان کنم؟'
      : currentLocale === 'ar'
      ? 'مرحباً بك في منصة علاء الدين الرقمية DXP. كيف يمكنني مساعدتك في مشروع موقعك الجديد؟'
      : 'Hello! Welcome to Aladdin DXP. How can I assist you with your web or e-commerce platform today?',
    time: 'هم‌اکنون',
    quickActions: [
      { label: 'محاسبه آنلاین قیمت', action: () => onNavigate('pricing-calculator') },
      { label: 'مشاهده نمونه‌کارها', action: () => onNavigate('portfolio') },
      { label: 'درخواست مشاوره فوری', action: () => onOpenConsultModal() },
    ],
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      time: 'لحظاتی پیش',
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    // Automated smart response
    setTimeout(() => {
      let botReply = '';
      const lower = text.toLowerCase();

      if (lower.includes('قیمت') || lower.includes('هزینه') || lower.includes('تعرفه') || lower.includes('price')) {
        botReply = 'تعرفه پکیج‌های پایه از ۱۵,۷۰۰,۰۰۰ تومان آغاز می‌شود. همچنین می‌توانید در محاسبه‌گر هوشمند ما تمام اقلام را آنلاین برآورد بفرمایید.';
      } else if (lower.includes('زمان') || lower.includes('تحویل') || lower.includes('time')) {
        botReply = 'قالب‌های آماده ظرف ۳ الی ۵ روز کاری و طراحی‌های اختصاصی با فیگما بین ۱۵ الی ۲۵ روز کاری تحویل می‌گردند.';
      } else if (lower.includes('تماس') || lower.includes('شماره') || lower.includes('تلفن') || lower.includes('call')) {
        botReply = `می‌توانید با خط سراسری ${content.marketContact.hotlineFormatted} بدون پیش‌شماره تماس بگیرید یا در واتساپ پیام بگذارید.`;
      } else {
        botReply = 'اطلاعات شما با موفقیت ثبت شد. مایلید یک کارشناس ارشد فنی ظرف ۱۵ دقیقه برای راهنمایی رایگان با شما تماس بگیرد؟';
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          time: 'هم‌اکنون',
          quickActions: [
            { label: 'ثبت شماره برای تماس فوری', action: () => onOpenConsultModal() },
            { label: 'باز کردن محاسبه‌گر قیمت', action: () => onNavigate('pricing-calculator') },
          ],
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-20 xl:bottom-6 end-4 sm:end-6 z-40 flex flex-col items-end">
      {/* Chat Window Panel */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-32px)] sm:w-[380px] max-h-[calc(100dvh-150px)] sm:max-h-[75vh] h-[480px] rounded-3xl bg-[#0b1329] border border-white/15 shadow-[0_24px_60px_-15px_rgba(0,18,48,0.95)] flex flex-col overflow-hidden backdrop-blur-2xl animate-in zoom-in-95 duration-200 text-white">
          {/* Header */}
          <div className="h-16 px-4 bg-[#171f35] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 text-sky-400 border border-sky-400/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute bottom-0 end-0 border-2 border-[#171f35]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold">دستیار هوشمند علاءالدین DXP</span>
                <span className="text-[10px] text-emerald-400 font-mono">آنلاین و آماده پاسخگویی</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-xs bg-[#060a14]/60">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col gap-1 max-w-[85%] ${
                  m.sender === 'user' ? 'ms-auto items-end' : 'me-auto items-start'
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-[#171f35] text-slate-200 border border-white/10 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 px-1">{m.time}</span>

                {/* Quick actions chips under bot messages */}
                {m.quickActions && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {m.quickActions.map((qa, qi) => (
                      <button
                        key={qi}
                        type="button"
                        onClick={() => {
                          qa.action();
                          setIsOpen(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-600 text-sky-400 hover:text-white border border-sky-400/20 text-[10px] font-semibold transition-colors cursor-pointer"
                      >
                        {qa.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-[#111c3d] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="سؤال خود را اینجا بنویسید..."
              className="flex-1 h-10 px-3 rounded-xl bg-[#060a14] border border-white/10 text-xs text-white outline-none focus:border-sky-400"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-md cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-[0_0_24px_rgba(37,99,235,0.6)] border-2 border-sky-300 transition-all hover:scale-105 cursor-pointer relative group"
        aria-label="گفتگو با پشتیبانی علاءالدین"
      >
        <span className="material-symbols-outlined text-[28px]">
          {isOpen ? 'close' : 'chat'}
        </span>
        <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white absolute top-0 end-0" />
      </button>
    </div>
  );
};
