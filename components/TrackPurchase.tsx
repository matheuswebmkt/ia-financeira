// components/pixel/TrackPurchase.tsx (ou components/TrackPurchase.tsx)
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Declaração global do fbq (Idealmente movida)
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void; // Mantém unknown[]
  }
}

// Interface para os dados estáticos do produto
interface ProductInfo {
  content_ids: string[];
  content_name: string;
  content_type: string;
  num_items: number;
  // value?: number; // Pode adicionar valor base opcional aqui se fizer sentido
  // currency?: string; // Pode adicionar moeda base opcional aqui se fizer sentido
}

// Interface para os dados completos do evento Purchase
interface PurchaseEventData extends ProductInfo {
    value: number;
    currency: string;
    order_id?: string;
    // *** CORREÇÃO DO ERRO TS2345 ABAIXO ***
    // Adiciona uma assinatura de índice para compatibilidade com Record<string, unknown>
    [key: string]: string | number | boolean | string[] | undefined; 
}

// Interface para as props do componente
interface TrackPurchaseProps {
  productData: ProductInfo;
}

// --- FUNÇÃO AUXILIAR PARA CHAMAR A API ROUTE ---
// Mantém a tipagem segura com Record<string, unknown>
async function sendCapiEvent(eventName: string, eventData: Record<string, unknown>, eventSourceUrl: string) {
  try {
    const response = await fetch('/api/meta/pixel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName, eventData, eventSourceUrl }),
    });

    interface ApiResponse { success: boolean; message?: string; error?: string; }
    const responseData: ApiResponse = await response.json();

    if (!response.ok || !responseData.success) {
      console.error('CAPI Call Error (from Frontend): Failed to send event via internal API route.', responseData);
    } else {
      console.log('CAPI Call Success (from Frontend): Event likely sent via backend.', responseData);
    }
  } catch (error: unknown) {
    console.error('CAPI Call Fetch Error (from Frontend):', error instanceof Error ? error.message : error);
  }
}
// --- FIM DA FUNÇÃO AUXILIAR ---

const TrackPurchase: React.FC<TrackPurchaseProps> = ({ productData }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("TrackPurchase useEffect triggered.");

    if (!searchParams || typeof window.fbq !== 'function') {
       if (!searchParams) console.warn('TrackPurchase: searchParams not ready yet.');
       if (typeof window.fbq !== 'function') console.warn('TrackPurchase: window.fbq not available yet.');
      return;
    }

    const purchaseValue = searchParams.get('value');
    const currency = searchParams.get('currency');
    const orderId = searchParams.get('order_id');

    if (!purchaseValue || !currency) {
      console.warn('Meta Pixel: Missing required parameters (value, currency) in URL for Purchase event.', { urlValue: purchaseValue, urlCurrency: currency });
      return;
    }
    const numericValue = parseFloat(purchaseValue);
    if (isNaN(numericValue)) {
        console.warn('Meta Pixel: Invalid value parameter for Purchase event.', { purchaseValue });
        return;
    }

    // Monta os dados completos do evento usando a interface CORRIGIDA
    const eventData: PurchaseEventData = {
      ...productData,
      value: numericValue,
      currency: currency,
      ...(orderId && { order_id: orderId }),
    };

    // --- PASSO 1: Dispara o evento do Pixel do Navegador ---
    // A tipagem de fbq como (...args: unknown[]) aceita o objeto eventData
    window.fbq('track', 'Purchase', eventData);
    console.log('Meta Pixel (Browser): Purchase event sent', eventData);


    // --- PASSO 2: Dispara o evento via API de Conversões (CAPI) ---
    const currentUrl = window.location.href;
    // Agora eventData (PurchaseEventData com assinatura de índice) é atribuível a Record<string, unknown>
    sendCapiEvent('Purchase', eventData, currentUrl);


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, productData]);

  return null;
};

export default TrackPurchase;