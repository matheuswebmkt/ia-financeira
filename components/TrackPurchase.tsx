// components/pixel/TrackPurchase.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

interface ProductInfo {
  content_ids: string[];
  content_name: string;
  content_type: string;
  num_items: number;
}

interface TrackPurchaseProps {
  productData: ProductInfo;
}

// --- FUNÇÃO AUXILIAR PARA CHAMAR A API ROUTE ---
// (Colocada fora do componente para clareza)
async function sendCapiEvent(eventName: string, eventData: Record<string, any>, eventSourceUrl: string) {
  try {
    const response = await fetch('/api/meta/pixel', { // Chama nossa API Route interna
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventData,
        eventSourceUrl, // Envia a URL original do navegador
      }),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData.success) {
      console.error('CAPI Call Error (from Frontend): Failed to send event via internal API route.', responseData);
    } else {
      console.log('CAPI Call Success (from Frontend): Event likely sent via backend.', responseData);
    }
  } catch (error) {
    console.error('CAPI Call Fetch Error (from Frontend):', error);
  }
}
// --- FIM DA FUNÇÃO AUXILIAR ---


const TrackPurchase: React.FC<TrackPurchaseProps> = ({ productData }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Log inicial para depuração
    console.log("TrackPurchase useEffect triggered.");

    // Verificação de searchParams e fbq
    if (!searchParams || typeof window.fbq !== 'function') {
      // ... logs de aviso ...
      return;
    }

    // --- Lê os dados dinâmicos da URL ---
    const purchaseValue = searchParams.get('value');
    const currency = searchParams.get('currency');
    const orderId = searchParams.get('order_id');

    // --- Validação Mínima ---
    if (!purchaseValue || !currency) {
      console.warn('Meta Pixel: Missing required parameters (value, currency) in URL for Purchase event.', { purchaseValue, currency });
      return;
    }

    // --- Conversão e Validação do Valor ---
    const numericValue = parseFloat(purchaseValue);
    if (isNaN(numericValue)) {
        console.warn('Meta Pixel: Invalid value parameter for Purchase event.', { purchaseValue });
        return;
    }

    // --- Monta os dados do evento (usados tanto para Pixel quanto para CAPI) ---
    const eventData = {
      ...productData,
      value: numericValue,
      currency: currency,
      ...(orderId && { order_id: orderId }), // Inclui order_id se disponível
    };

    // --- PASSO 1: Dispara o evento do Pixel do Navegador ---
    window.fbq('track', 'Purchase', eventData);
    console.log('Meta Pixel (Browser): Purchase event sent', eventData);


    // --- PASSO 2: Dispara o evento via API de Conversões (CAPI) ---
    const currentUrl = window.location.href; // Pega a URL atual do navegador
    // Chama a função auxiliar para enviar os dados para nossa API Route no backend
    sendCapiEvent('Purchase', eventData, currentUrl);


  }, [searchParams, productData]); // Dependências do useEffect

  return null;
};

export default TrackPurchase;