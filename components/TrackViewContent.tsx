// components/TrackViewContent.tsx
'use client';
import { useEffect } from 'react';
import { sendCapiEvent } from '@/lib/pixel'; // Assume que esta função já está corretamente tipada

// Declaração global do fbq (Idealmente movida, mas corrigida aqui)
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void; // <--- CORREÇÃO AQUI: Usa unknown[]
  }
}

// Interface para os parâmetros do evento ViewContent
interface ViewContentParams {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  // *** ADICIONADO: Assinatura de índice para compatibilidade ***
  [key: string]: string | number | boolean | string[] | undefined;
}

// Interface para as props do componente
interface TrackViewContentProps {
  eventData: ViewContentParams;
}

const TrackViewContent: React.FC<TrackViewContentProps> = ({ eventData }) => {
  useEffect(() => {
    // Timeout para dar tempo ao script do pixel carregar
    const timer = setTimeout(() => {
      console.warn(`TRACK_VIEW_CONTENT (Prod Check): Attempting inside timeout. FBQ type: ${typeof window.fbq}`);

      if (typeof window.fbq === 'function') {
        // Verifica se eventData existe e tem propriedades
        if (eventData && Object.keys(eventData).length > 0) {
          console.warn('TRACK_VIEW_CONTENT (Prod Check): FBQ found, Data valid. Sending events.', eventData);

          // --- PASSO 1: Dispara o Pixel do Navegador ---
          // eventData (ViewContentParams com assinatura) é aceito por fbq
          window.fbq('track', 'ViewContent', eventData);
          console.log('Meta Pixel (Browser): ViewContent sent', eventData);

          // --- PASSO 2: Dispara via CAPI ---
          const currentUrl = window.location.href;
          // Assumindo que sendCapiEvent espera Record<string, unknown> ou similar
          // A interface ViewContentParams com assinatura de índice é compatível.
          sendCapiEvent('ViewContent', eventData, currentUrl);

        } else {
          console.warn('TRACK_VIEW_CONTENT (Prod Check): FBQ found, but EventData invalid/empty.', eventData);
        }
      } else {
        console.warn('TRACK_VIEW_CONTENT (Prod Check): FBQ function NOT found inside timeout.');
      }
    }, 750); // Delay para carregamento do script

    // Limpeza do timeout
    return () => clearTimeout(timer);

  }, [eventData]); // Dependência mantida

  return null; // Componente não renderiza UI
};

export default TrackViewContent;