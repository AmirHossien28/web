import * as React from 'react';
import { ArrowUp, MessageSquare, Send, Sparkles, X } from 'lucide-react';
import type { LocaleKey, PageId } from '../../types';
import { Badge, Button } from '../../design-system/primitives';
import { cx } from '../../design-system/tokens';
import { ui } from '../../app/i18n';

/**
 * Assistant
 * --------------------------------------------------------------------------
 * A rule-based helper, not a chat gimmick: it answers the four questions the
 * sales team actually receives, and routes everything else to a human. Quick
 * replies are the primary interface, so the widget is useful without typing.
 */

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
}

export interface ChatbotWidgetProps {
  currentLocale: LocaleKey;
  onNavigate: (page: PageId) => void;
  onOpenConsultModal: () => void;
}

const QUICK_REPLIES: { label: string; answer: string; navigate?: PageId }[] = [
  {
    label: 'هزینه طراحی سایت چقدر است؟',
    answer:
      'هزینه به دامنه پروژه بستگی دارد. پلن پایه از ۱۸.۵ میلیون تومان و پلن رشد از ۳۴ میلیون تومان شروع می‌شود؛ با محاسبهگر آنلاین، برآورد دقیق‌تری دریافت میکنید.',
    navigate: 'pricing-calculator',
  },
  {
    label: 'زمان تحویل پروژه چقدر است؟',
    answer:
      'قالبهای آماده ۳ تا ۷ روز کاری و پروژههای اختصاصی بهطور میانگین ۲۳ روز کاری زمان میبرند. زمانبندی دقیق در سند دامنه پروژه ثبت میشود.',
    navigate: 'process',
  },
  {
    label: 'پشتیبانی و تضمین چه شرایطی دارد؟',
    answer:
      'تضمین سطح خدمت شامل زمان پاسخ زیر ۲ ساعت کاری، پایداری ۹۹.۹۸٪، پشتیبانگیری روزانه و انتقال ۱۰۰٪ سورسکد است.',
    navigate: 'sla-guarantee',
  },
  {
    label: 'میخواهم با کارشناس صحبت کنم',
    answer: 'درخواست مشاوره را ثبت کنید؛ کارشناس ارشد در نخستین ساعت کاری با شما تماس میگیرد.',
  },
];

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  currentLocale,
  onNavigate,
  onOpenConsultModal,
}) => {
  const locale = currentLocale;
  const t = ui(locale);
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [draft, setDraft] = React.useState('');
  const logRef = React.useRef<HTMLDivElement>(null);

  const greeting = `سلام 👋 من دستیار علاءالدین هستم. درباره خدمات، قیمت یا زمانبندی بپرسید — یا از گزینههای زیر انتخاب کنید.`;

  React.useEffect(() => {
    setMessages([{ id: 0, from: 'bot', text: greeting }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  React.useEffect(() => {
    if (open) logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  const push = (message: Omit<Message, 'id'>) =>
    setMessages(current => [...current, { ...message, id: current.length + 1 }]);

  const answer = (reply: (typeof QUICK_REPLIES)[number]) => {
    push({ from: 'user', text: reply.label });
    window.setTimeout(() => {
      push({ from: 'bot', text: reply.answer });
      if (reply.navigate) {
        window.setTimeout(() => {
          onNavigate(reply.navigate!);
          setOpen(false);
        }, 900);
      }
    }, 320);
  };

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    push({ from: 'user', text });
    setDraft('');
    window.setTimeout(
      () =>
        push({
          from: 'bot',
          text: 'برای پاسخ دقیق به این مورد، بهتر است کارشناس ما جزئیات پروژه را ببیند. درخواست مشاوره ثبت میکنید؟',
        }),
      400,
    );
  };

  return (
    <>
      {/* trigger */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={open ? t.common.closeMenu : 'دستیار هوشمند علاءالدین'}
        className={cx(
          'fixed bottom-20 end-4 z-toast inline-flex size-12 items-center justify-center rounded-full border border-line bg-surface text-brand-ink shadow-lg transition-[transform,background-color] duration-[140ms] hover:bg-brand-soft lg:bottom-6 lg:end-6',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        )}
      >
        {open ? <X size={19} aria-hidden="true" /> : <MessageSquare size={19} aria-hidden="true" />}
      </button>

      {open && (
        <section
          aria-label="دستیار علاءالدین"
          className="fixed bottom-36 end-4 z-toast flex max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] animate-scale-in flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-xl lg:bottom-24 lg:end-6"
        >
          <header className="flex items-center justify-between gap-3 border-b border-line bg-subtle px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex size-8 items-center justify-center rounded-xs border border-info-line bg-brand-soft text-brand-ink">
                <Sparkles size={15} aria-hidden="true" />
              </span>
              <div>
                <p className="text-caption font-semibold text-ink">دستیار علاءالدین</p>
                <p className="text-[0.6875rem] text-ink-3">{t.utility.available}</p>
              </div>
            </div>
            <Badge tone="success" variant="square" dot>
              آنلاین
            </Badge>
          </header>

          <div ref={logRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={cx(
                  'max-w-[85%] rounded-md px-3.5 py-2.5 text-caption leading-relaxed',
                  message.from === 'bot'
                    ? 'self-start border border-line bg-subtle text-ink-2'
                    : 'self-end bg-brand text-on-brand',
                )}
              >
                {message.text}
              </div>
            ))}

            <div className="mt-1 flex flex-col gap-2">
              {QUICK_REPLIES.map(reply => (
                <button
                  key={reply.label}
                  type="button"
                  onClick={() => answer(reply)}
                  className="rounded-sm border border-line px-3 py-2 text-start text-caption text-ink-2 transition-colors duration-[140ms] hover:border-line-bold hover:bg-neutral-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {reply.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={send} className="flex items-center gap-2 border-t border-line p-3">
            <label htmlFor="chat-input" className="sr-only">
              پیام شما
            </label>
            <input
              id="chat-input"
              value={draft}
              onChange={event => setDraft(event.target.value)}
              placeholder="پیام خود را بنویسید…"
              className="h-10 flex-1 rounded-sm border border-line-strong bg-surface px-3 text-caption text-ink placeholder:text-ink-4 focus:border-brand focus:outline-2 focus:outline-offset-0 focus:outline-focus"
            />
            <Button tone="brand" size="sm" type="submit" iconOnly aria-label="ارسال پیام" className="size-10">
              <Send size={15} aria-hidden="true" className="rtl:rotate-180" />
            </Button>
          </form>

          <div className="border-t border-line px-4 py-3">
            <Button
              tone="neutral"
              emphasis="ghost"
              size="sm"
              className="w-full justify-between"
              onClick={() => {
                setOpen(false);
                onOpenConsultModal();
              }}
            >
              گفتوگو با کارشناس انسانی
              <ArrowUp size={15} aria-hidden="true" className="rotate-45" />
            </Button>
          </div>
        </section>
      )}
    </>
  );
};
