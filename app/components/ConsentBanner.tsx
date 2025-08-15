'use client';
import { useEffect, useState } from 'react';

const LS_KEY = 'cap-consent';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY);
    if (!stored) setVisible(true);
  }, []);

  const acceptAll = () => {
    window.gtag?.('consent', 'update', {
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      ad_storage: 'granted',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      security_storage: 'granted',
    });
    localStorage.setItem(LS_KEY, 'accepted');
    setVisible(false);
  };

  const rejectAll = () => {
    window.gtag?.('consent', 'update', {
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    });
    localStorage.setItem(LS_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-3xl rounded-t-2xl border border-white/10 bg-[#1a425f] px-5 py-4 text-white shadow-2xl">
      <p className="text-sm">
        Usamos cookies para analisar o tráfego e melhorar a tua experiência. Podes aceitar ou recusar.
      </p>
      <div className="mt-3 flex gap-3">
        <button onClick={rejectAll} className="rounded-xl border border-white/30 px-4 py-2 text-sm hover:bg-white/10">
          Recusar
        </button>
        <button onClick={acceptAll} className="ml-auto rounded-xl bg-[#f2c45a] px-4 py-2 text-sm font-semibold text-[#1a425f] hover:opacity-90">
          Aceitar todos
        </button>
      </div>
    </div>
  );
}
