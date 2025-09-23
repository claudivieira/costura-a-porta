'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function StoreTokenPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const access = searchParams.get('access_token');
    const refresh = searchParams.get('refresh_token');

    if (access && refresh) {
      // Armazenar localmente
      localStorage.setItem('moloni_access_token', access);
      localStorage.setItem('moloni_refresh_token', refresh);

      // Redirecionar só depois de armazenado
      router.replace('/products/real');
    } else {
      console.warn('⚠️ access_token ou refresh_token ausente.');
      setProcessing(false);
    }
  }, [searchParams, router]);

  return (
    <p className="text-center p-8">
      {processing
        ? 'Autenticando com Moloni...'
        : 'Falha ao autenticar. Por favor, tenta novamente.'}
    </p>
  );
}
