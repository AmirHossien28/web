import React, { useState } from 'react';
import { LocaleKey } from '../../types';
import { I18N_DATA } from '../../data/i18n';
import { SECTIONS_I18N } from '../../data/sectionsI18n';

interface QuickConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale: LocaleKey;
}

export const QuickConsultModal: React.FC<QuickConsultModalProps> = ({
  isOpen,
  onClose,
  currentLocale,
}) => {
  const content = I18N_DATA[currentLocale];
  const t = SECTIONS_I18N[currentLocale].consultModal;
  const isRtl = currentLocale === 'fa' || currentLocale === 'ar';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [service, setService] = useState('corporate');
  const [budget, setBudget] = useState('20-40');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 7) {
      setPhoneError(isRtl ? 'شماره تماس باید حداقل ۷ رقم باشد' : 'Please enter a valid phone number');
      return;
    }
    setPhoneError('');
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div className="relative w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl sm:rounded-3xl bg-[#0b1329] border border-white/15 p-5 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-white">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-sky-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">rocket_launch</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-bold">{t.title}</h3>
              <span className="text-[11px] text-slate-400">{t.subtitle}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-rose-500 hover:text-white flex items-center justify-center text-slate-400 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[32px]">task_alt</span>
            </div>
            <h4 className="text-base font-bold text-emerald-400">{t.successTitle}</h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {t.successDesc} <span className="font-mono text-white font-bold" dir="ltr">{phone}</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 px-6 h-10 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              {t.closeBtn}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">{t.nameLabel}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full h-11 px-3.5 rounded-xl bg-[#060a14] border border-white/10 text-xs text-white outline-none focus:border-sky-400 transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">{t.phoneLabel}</label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) setPhoneError('');
                  }}
                  placeholder={t.phonePlaceholder}
                  className={`w-full h-11 px-3.5 rounded-xl bg-[#060a14] border text-xs font-mono text-white outline-none transition-all placeholder:text-slate-500 ${
                    phoneError ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-sky-400'
                  }`}
                />
                {phoneError && (
                  <span className="text-[11px] text-rose-400 font-medium">{phoneError}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">{t.serviceLabel}</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-[#060a14] border border-white/10 text-xs text-white outline-none focus:border-sky-400 transition-all cursor-pointer"
                >
                  <option value="corporate">{content.nav.servicesDropdown.corporate}</option>
                  <option value="ecommerce">{content.nav.servicesDropdown.ecommerce}</option>
                  <option value="services">{content.nav.servicesDropdown.servicesMedical}</option>
                  <option value="portal">{content.nav.servicesDropdown.portal}</option>
                  <option value="template">{content.nav.templates}</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">{t.detailsLabel}</label>
              <textarea
                rows={2}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={t.detailsPlaceholder}
                className="w-full p-3 rounded-xl bg-[#060a14] border border-white/10 text-xs text-white outline-none focus:border-sky-400 transition-all placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 mt-1"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>{t.submitBtn}</span>
            </button>

            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-emerald-400 text-[14px]">lock</span>
                {t.privacy}
              </span>
              <a href={`tel:${content.marketContact.hotline}`} className="text-sky-400 font-mono" dir="ltr">
                {content.marketContact.hotlineFormatted}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
