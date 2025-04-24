// components/MetaPixelEvents.tsx 
// (Renomeei a pasta para 'components' conforme o caminho no erro, ajuste se necessário)
'use client'; 

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Declaração global do fbq (Idealmente movida para um arquivo de tipos global, mas corrigida aqui)
declare global {
  interface Window {
    // Usa 'unknown[]' para os argumentos em vez de 'any[]'
    // Isso força checagens se você fosse ler os argumentos, mas é seguro para apenas chamar a função.
    fbq?: (...args: unknown[]) => void; // <--- CORREÇÃO AQUI
  }
}

const MetaPixelEvents = () => {
  const pathname = usePathname();
  const initialized = useRef(false); 

  // Efeito para rastrear PageView em mudanças de rota
  useEffect(() => {
    // Evita disparo duplo no modo strict do React ou HMR (Hot Module Replacement)
    if (!initialized.current) {
        initialized.current = true;
        // Dispara na montagem inicial SE window.fbq já existir (script base carregou)
        if (typeof window.fbq === 'function') {
             console.log(`Meta Pixel Initial PageView detected by component for: ${pathname}`); 
             // O script base já dispara, então este log é mais para debug.
             // Poderia até comentar a chamada window.fbq aqui se o script base já faz.
             // window.fbq('track', 'PageView'); 
        }
        return; 
    }

    // Dispara em mudanças subsequentes de pathname
    if (typeof window.fbq === 'function') {
      console.log(`Meta Pixel PageView triggered by route change to: ${pathname}`); 
      window.fbq('track', 'PageView');
    }
    
    // Nota: A dependência 'pathname' garante que rode em cada mudança de rota.
  }, [pathname]); 

  // Componente não renderiza UI
  return null; 
};

export default MetaPixelEvents;