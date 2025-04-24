// components/TrackViewContent.tsx (Com array de dependências vazio)
'use client';
import { useEffect } from 'react';
import { sendCapiEvent } from '@/lib/pixel';

// Declaração global do fbq
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Interface para os parâmetros do evento ViewContent
interface ViewContentParams {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  [key: string]: string | number | boolean | string[] | undefined;
}

// Interface para as props do componente
interface TrackViewContentProps {
  eventData: ViewContentParams;
}

const TrackViewContent: React.FC<TrackViewContentProps> = ({ eventData }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.warn(`TRACK_VIEW_CONTENT (useEffect Check): Attempting inside timeout. FBQ type: ${typeof window.fbq}`);
      console.warn('TRACK_VIEW_CONTENT (useEffect Check): Received eventData:', JSON.stringify(eventData));

      if (typeof window.fbq === 'function') {
        // Adicionada verificação explícita de objeto
        if (eventData && typeof eventData === 'object' && Object.keys(eventData).length > 0) {
          console.warn('TRACK_VIEW_CONTENT (useEffect Check): FBQ found, Data valid. Sending events.');
          window.fbq('track', 'ViewContent', eventData);
          console.log('Meta Pixel (Browser): ViewContent sent', eventData);
          const currentUrl = window.location.href;
          sendCapiEvent('ViewContent', eventData, currentUrl);
        } else {
          console.warn('TRACK_VIEW_CONTENT (useEffect Check): FBQ found, but EventData invalid/empty.', eventData);
        }
      } else {
        console.warn('TRACK_VIEW_CONTENT (useEffect Check): FBQ function NOT found inside timeout.');
      }
    }, 750);

    return () => clearTimeout(timer);

  // }, [eventData]); // <<< Linha antiga comentada
  }, []); // <<< ARRAY DE DEPENDÊNCIAS VAZIO: Executa apenas na montagem

  return null;
};

export default TrackViewContent;