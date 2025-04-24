// components/TrackViewContent.tsx (Com Timeout para Teste de Timing)
'use client';
import { useEffect } from 'react';
import { sendCapiEvent } from '@/lib/pixel';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

interface ViewContentParams {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}
interface TrackViewContentProps {
  eventData: ViewContentParams;
}

const TrackViewContent: React.FC<TrackViewContentProps> = ({ eventData }) => {
  useEffect(() => {
    // Adiciona um delay para dar mais chance ao script do pixel carregar
    const timer = setTimeout(() => {
      // Usar console.warn para aumentar a chance de aparecer em produção
      console.warn(`TRACK_VIEW_CONTENT (Prod Check): Attempting inside timeout. FBQ type: ${typeof window.fbq}`);

      // Verifica fbq explicitamente DENTRO do timeout
      if (typeof window.fbq === 'function') {
        // Verifica dados do evento
        if (eventData && Object.keys(eventData).length > 0) {
          console.warn('TRACK_VIEW_CONTENT (Prod Check): FBQ found, Data valid. Sending events.', eventData);
          // --- PASSO 1: Dispara o Pixel do Navegador ---
          window.fbq('track', 'ViewContent', eventData);
          console.log('Meta Pixel (Browser): ViewContent sent', eventData); // Log normal

          // --- PASSO 2: Dispara via CAPI ---
          const currentUrl = window.location.href;
          sendCapiEvent('ViewContent', eventData, currentUrl);
        } else {
          console.warn('TRACK_VIEW_CONTENT (Prod Check): FBQ found, but EventData invalid/empty.', eventData);
        }
      } else {
        console.warn('TRACK_VIEW_CONTENT (Prod Check): FBQ function NOT found inside timeout.');
      }
    }, 750); // Aumentei ligeiramente o delay para 750ms para teste

    // Limpa o timeout se o componente desmontar antes
    return () => clearTimeout(timer);

  }, [eventData]); // Dependência mantida

  return null;
};

export default TrackViewContent;