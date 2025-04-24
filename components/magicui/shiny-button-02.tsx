// src/components/magicui/shiny-button-02.tsx (Adicionando Glow na Borda)

"use client";

import React, { useEffect } from 'react';
import { cn } from "@/lib/utils";
import { sendCapiEvent } from '@/lib/pixel';

// Declaração global do fbq
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

// --- Configuração ---
const BORDER_RADIUS = 9999;
const BORDER_WIDTH = 1;   // Espessura da borda brilhante NÍTIDA
const SPACING_WIDTH = 8;    // Espessura do gap
const GLOW_SPREAD = 3;      // Quão "para fora" o glow deve ir (em pixels) - ajuste
const SHINE_DURATION = 7;   // Duração das animações de brilho/glow
const SHINE_COLORS = ["#A07CFE", "#FE8FB5", "#FFBE7B"];
const SCALE_PULSE_DURATION = 3.5;

// Keyframes (sem sweep-x)
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
  // Usado tanto para o brilho nítido quanto para o glow
  return `radial-gradient(transparent, transparent 50%, ${colorArray.join(",")}, transparent 70%, transparent)`;
};

// Interface de Props
interface ShinyButtonProps {
  text?: string;
}

const ShinyButton02 = ({
  text = "quero minha liberdade",
}: ShinyButtonProps) => {

  // Efeito para injetar as keyframes
  useEffect(() => {
    const styleTagId = 'shiny-button-keyframes-glow'; // Novo ID
    if (document.getElementById(styleTagId)) return;
    const styleElement = document.createElement('style');
    styleElement.id = styleTagId;
    styleElement.innerHTML = keyframesCSS;
    document.head.appendChild(styleElement);
    return () => {
      const el = document.getElementById(styleTagId);
      if (el) document.head.removeChild(el);
    };
  }, []);

  const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Click logic
    const productDataForPixel = { /* ... */ };
    const eventData = { /* ... */ };
    if (typeof window.fbq === 'function') { /* ... */ }
    const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL;
    if (checkoutUrl) {
        event.preventDefault();
        window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
    } else { /* ... */ }
  };

  const fallbackHref = process.env.NEXT_PUBLIC_CHECKOUT_URL || "#";

  // Variáveis CSS
  const cssVariables = {
    "--border-width": `${BORDER_WIDTH}px`,
    "--spacing-width": `${SPACING_WIDTH}px`,
    "--glow-spread": `${GLOW_SPREAD}px`, // Variável para controlar o inset do glow
    "--shine-pulse-duration": `${SHINE_DURATION}s`,
    "--background-radial-gradient": formatShineColors(SHINE_COLORS),
  } as React.CSSProperties;


  return (
    <a
      href={fallbackHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleButtonClick}
      style={cssVariables}
      className={cn(
        // --- Contêiner Externo 'a': Layout, Interação, Animações ---
        "inline-block group", "relative", "cursor-pointer",
        "transition-transform duration-300 ease-in-out",
        `animate-[shinyButtonScalePulse_${SCALE_PULSE_DURATION}s_ease-in-out_infinite]`,
        "active:scale-95"
      )}
    >
      {/* *** Div 0: Camada de Glow (NOVA) *** */}
      <div
        className={cn(
          "absolute -z-20", // Atrás da borda nítida
          // Inset negativo expande para fora baseado no spread desejado
          "inset-[calc(-1*var(--glow-spread))]",
          "rounded-full", // Mantém a forma
          // Mesmo background animado da borda
          "bg-[image:var(--background-radial-gradient)]",
          "bg-[size:300%_300%]",
          "animate-[shinyButtonShineLoop_var(--shine-pulse-duration)_infinite_linear]",
          // *** Efeitos de Glow ***
          "blur-lg",  // Ajuste o blur: blur-sm, blur-md, blur-lg, blur-xl
          "opacity-70" // Ajuste a opacidade: opacity-50, opacity-75, etc.
        )}
        aria-hidden="true"
      />

      {/* Div 1: Borda Brilhante Nítida (Originalmente Fundo) */}
      <div
        className={cn(
          "absolute inset-0 -z-10", // Posição original
          "rounded-full",
          // REMOVIDO overflow-hidden daqui para não cortar o glow da Div 0
          // "overflow-hidden",
          "bg-[image:var(--background-radial-gradient)]",
          "bg-[size:300%_300%]",
          "animate-[shinyButtonShineLoop_var(--shine-pulse-duration)_infinite_linear]"
        )}
        aria-hidden="true"
      />

      {/* Div 2: Revelação da Borda */}
      <div className={cn("relative", "rounded-full", "p-[--border-width]")}>

        {/* Div 3: Gap */}
        <div className={cn("relative", "rounded-full", "p-[--spacing-width]", "bg-white dark:bg-black")}>

          {/* Div 4: Conteúdo Principal */}
          <div
            className={cn(
              "relative",
              "z-10",
              "rounded-full",
              "px-8 py-3.5",
              // Não precisa mais de overflow-hidden aqui
              "bg-black text-white dark:bg-white dark:text-black",
              "font-medium",
              "transition-[box-shadow] duration-300 ease-in-out",
              "group-hover:shadow group-hover:shadow-white/10 dark:group-hover:shadow-black/20"
            )}
          >
            {/* Span de Texto */}
            <span
              className={cn(
                "font-bold block h-full w-full text-sm uppercase tracking-wide",
              )}
            >
              {text}
            </span>
          </div> {/* Fim Div 4 */}
        </div> {/* Fim Div 3 */}
      </div> {/* Fim Div 2 */}
    </a> // Fim 'a'
  );
};

export default ShinyButton02;