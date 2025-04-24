// components/pixel/MetaPixelEvents.tsx
'use client'; // Essencial para usar hooks como usePathname e useEffect

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Declaração de tipo para a função fbq (opcional, mas bom para type safety)
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const MetaPixelEvents = () => {
  const pathname = usePathname();
  const initialized = useRef(false); // Para evitar disparo duplicado no carregamento inicial

  useEffect(() => {
    // O snippet base no layout já dispara o PageView inicial.
    // Este useEffect vai disparar em *mudanças* de pathname.
    if (!initialized.current) {
        initialized.current = true; // Marca como inicializado na primeira renderização
        return; // Sai sem disparar na primeira vez que o useEffect roda
    }

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
      console.log(`Meta Pixel PageView sent for: ${pathname}`); // Para depuração
    }
  }, [pathname]); // Dispara quando o pathname muda

  // Este componente não renderiza nada visível
  return null; 
};

export default MetaPixelEvents;