// src/components/magicui/shiny-button-02.tsx

"use client"; // Mantém client

import React, { useEffect } from 'react';
import { cn } from "@/lib/utils";
import { sendCapiEvent } from '@/lib/pixel'; // Necessário para CAPI call

// Declaração global do fbq (tipagem segura com unknown)
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// --- Configuração ---
// const BORDER_RADIUS = 9999; // Removido - não usado
const BORDER_WIDTH = 1;
const SPACING_WIDTH = 8;
const GLOW_SPREAD = 3;
const SHINE_DURATION = 7;
const SHINE_COLORS = ["#A07CFE", "#FE8FB5", "#FFBE7B"];
const SCALE_PULSE_DURATION = 3.5;

// Keyframes CSS (Mantido DENTRO do componente por enquanto para garantir efeito)
// Idealmente, mova para um arquivo CSS global para melhor performance a longo prazo
const keyframesCSS = `
  @keyframes shinyButtonShineLoop {
    from { background-position: 0% 0%; }
    to { background-position: 200% 200%; }
  }
  @keyframes shinyButtonScalePulse {
    0%, 100% { transform: scale(0.98); }
    50% { transform: scale(1); }
  }
`;

// Helper Function
const formatShineColors = (colors: string | string[]): string => {
  const colorArray = Array.isArray(colors) ? colors : [colors];
  return `radial-gradient(transparent, transparent 50%, ${colorArray.join(",")}, transparent 70%, transparent)`;
};

// Interface de Props
interface ShinyButtonProps {
  text?: string;
  // Opcional: Adicione props para dados do evento se precisar passar dinamicamente
  // eventValue?: number;
  // eventCurrency?: string;
}

const ShinyButton02 = ({
  text = "quero minha liberdade", // Padrão mantido, será sobrescrito pela prop
  // eventValue = 9.90, // Exemplo de prop opcional
  // eventCurrency = "BRL", // Exemplo
}: ShinyButtonProps) => {

  // Efeito para injetar as keyframes (Mantido aqui temporariamente)
  useEffect(() => {
    const styleTagId = 'shiny-button-keyframes-glow';
    // Verifica se a tag já existe antes de adicionar
    if (document.getElementById(styleTagId)) return; 
    const styleElement = document.createElement('style');
    styleElement.id = styleTagId;
    styleElement.innerHTML = keyframesCSS;
    document.head.appendChild(styleElement);
    // Função de cleanup para remover a tag quando o componente desmontar
    return () => {
      const el = document.getElementById(styleTagId);
      if (el) {
        document.head.removeChild(el);
      }
    };
  }, []); // Array de dependências vazio, roda apenas na montagem/desmontagem

  const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    console.log('ShinyButton clicked!');

    // Dados para o evento InitiateCheckout (AJUSTE OS VALORES!)
    const initiateCheckoutEventData = {
      content_name: 'eBook IA Anti-Dívidas + Bônus',
      content_ids: ['IA_ANTI_DIVIDAS_EBOOK_01'],
      content_type: 'product',
      value: 9.90, // <<< AJUSTAR/PASSAR VIA PROP
      currency: 'BRL', // <<< AJUSTAR/PASSAR VIA PROP
    };

    // Dispara Pixel do Navegador
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', initiateCheckoutEventData);
      console.log('Meta Pixel (Browser): InitiateCheckout sent', initiateCheckoutEventData);
    } else {
      console.warn('FB Pixel not loaded when trying to send InitiateCheckout.');
    }

    // Dispara via CAPI (Chamada para sua API interna)
    sendCapiEvent('InitiateCheckout', initiateCheckoutEventData, window.location.href);
    console.log('Meta CAPI (Frontend Trigger): InitiateCheckout event sent to backend API.');


    // Redirecionamento
    const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL;
    if (checkoutUrl) {
      event.preventDefault();
      window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('ShinyButton: NEXT_PUBLIC_CHECKOUT_URL not set.');
    }
  };

  // Fallback href
  const fallbackHref = process.env.NEXT_PUBLIC_CHECKOUT_URL || "#";

  // Variáveis CSS
  const cssVariables = {
    "--border-width": `${BORDER_WIDTH}px`,
    "--spacing-width": `${SPACING_WIDTH}px`,
    "--glow-spread": `${GLOW_SPREAD}px`,
    "--shine-pulse-duration": `${SHINE_DURATION}s`,
    "--background-radial-gradient": formatShineColors(SHINE_COLORS),
    // Adiciona duração do pulse como variável para ser usada no CSS inline
    "--scale-pulse-duration": `${SCALE_PULSE_DURATION}s`,
  } as React.CSSProperties;


  return (
    <a
      href={fallbackHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleButtonClick}
      style={cssVariables} // Aplica variáveis CSS
      className={cn(
        "inline-block group relative cursor-pointer",
        "transition-transform duration-300 ease-in-out",
        // Usa o nome da animação definida no keyframesCSS
        // A duração é controlada pela variável CSS --scale-pulse-duration
        "animate-[shinyButtonScalePulse_var(--scale-pulse-duration)_ease-in-out_infinite]",
        "active:scale-95"
      )}
    >
      {/* Div Glow */}
      <div
        className={cn(
          "absolute -z-20",
          "inset-[calc(-1*var(--glow-spread))]",
          "rounded-full",
          "bg-[image:var(--background-radial-gradient)] bg-[size:300%_300%]",
          "animate-[shinyButtonShineLoop_var(--shine-pulse-duration)_infinite_linear]",
          "blur-lg opacity-70"
        )}
        aria-hidden="true"
      />
      {/* Div Borda */}
      <div
        className={cn(
          "absolute inset-0 -z-10 rounded-full",
          "bg-[image:var(--background-radial-gradient)] bg-[size:300%_300%]",
          "animate-[shinyButtonShineLoop_var(--shine-pulse-duration)_infinite_linear]"
        )}
        aria-hidden="true"
      />
      {/* Div Wrapper 1 */}
      <div className={cn("relative rounded-full p-[--border-width]")}>
        {/* Div Wrapper 2 (Gap) */}
        <div className={cn("relative rounded-full bg-white p-[--spacing-width] dark:bg-black")}>
          {/* Div Conteúdo Principal */}
          <div
            className={cn(
              "relative z-10 rounded-full px-8 py-3.5",
              "bg-black text-white dark:bg-white dark:text-black",
              "font-medium",
              "transition-[box-shadow] duration-300 ease-in-out",
              "group-hover:shadow group-hover:shadow-white/10 dark:group-hover:shadow-black/20"
            )}
          >
            <span className="block h-full w-full text-sm font-bold uppercase tracking-wide">
              {/* Renderiza o texto passado via prop */}
              {text}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ShinyButton02;