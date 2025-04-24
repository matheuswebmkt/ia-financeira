// app/marketing/obrigado/page.tsx
'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react'; // Hooks React adicionados
import TrackPurchase from '@/components/TrackPurchase'; // Mantido
// Framer Motion REMOVIDO
import { CheckCircle } from 'lucide-react'; // Mantido
import { cn } from '@/lib/utils'; // Mantido
import { SparklesText } from "@/components/magicui/sparkles-text"; // Mantido

// Hook customizado para Intersection Observer (importar ou definir aqui)
function useIntersectionObserver(options: IntersectionObserverInit = {}): [React.RefObject<any>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<any>(null);

  // Como esta é uma página inteira, podemos querer que a animação comece quase imediatamente
  // Usando threshold baixo e talvez observando um elemento que aparece rápido.
  // Ou, podemos simplificar e apenas usar um delay pequeno sem observer se a página for simples.
  // Para consistência, manteremos o observer, mas ele ativará muito rapidamente.
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(element);
      }
    }, {
      threshold: 0.01, // Trigger bem cedo
      ...options,
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
}


// --- Declaração global do fbq (Mantida) ---
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

// --- Dados ESTÁTICOS do produto (Mantidos) ---
const purchasedProductInfo = {
  content_ids: ['IA_ANTI_DIVIDAS_EBOOK_01'],
  content_name: 'eBook IA Anti-Dívidas + Bônus',
  content_type: 'product',
  num_items: 1,
};

// --- Componente Wrapper (Mantido) ---
function PurchaseTracker() {
  return <TrackPurchase productData={purchasedProductInfo} />;
}

// --- Animation Variants --- REMOVIDAS

// --- Componente Principal Otimizado ---
export default function ThankYouPage() {

    // Hook de observação para o container principal dos elementos animados
    const [contentRef, isContentVisible] = useIntersectionObserver();

    const calculateDelay = (index: number, baseDelay = 0.1) => `${index * baseDelay}s`;

  return (
    // Seção principal - removido motion e props
    <section
      id="obrigado"
      // light-sweep MANTIDO
      className="w-full min-h-screen flex items-center justify-center py-16 md:py-20 lg:py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950/30 dark:via-gray-950 dark:to-purple-950/30 relative overflow-hidden light-sweep light-mode-sweep"
      // variants, initial, animate REMOVIDOS
    >
        {/* Background com brilhos - Mantido */}
       <div className="absolute inset-0 z-[-1] opacity-15 dark:opacity-[0.1]">
         <div className="absolute top-[-5%] left-[5%] w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.2),_transparent_70%)] pointer-events-none blur-3xl transform-gpu opacity-60 rotate-12" />
         <div className="absolute bottom-[-5%] right-[5%] w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.3),_transparent_80%)] pointer-events-none blur-3xl transform-gpu opacity-50 -rotate-12" />
         <div className="absolute top-[30%] right-[15%] w-1/4 h-1/4 bg-[radial-gradient(ellipse_at_center,_#22c55e60,_transparent_70%)] pointer-events-none blur-2xl transform-gpu opacity-40" />
       </div>

      {/* Container principal - removido motion e props */}
      {/* z-[2] MANTIDO */}
      <div
        ref={contentRef} // Adiciona ref aqui para observar quando o conteúdo entra (rapidamente)
        className="container px-5 relative z-[2]"
        // variants REMOVIDO
      >
         {/* Wrapper Centralizado */}
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">

            {/* Suspense e Tracker - Mantidos */}
            <Suspense fallback={null}>
              <PurchaseTracker />
            </Suspense>

            {/* Ícone (Animado) */}
             <div
                className={cn(
                    "mb-[-1rem]", // Margem mantida
                    "animate-on-scroll", isContentVisible && "is-visible" // Animação controlada pelo container
                )}
                style={{ transitionDelay: calculateDelay(0) }} // Primeiro item a animar
                // variants REMOVIDO
              >
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full border border-green-200 dark:border-green-700 shadow-md inline-block">
                    <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
                </div>
             </div>

            {/* Título Principal com SparklesText (Animado) */}
            <h2
                className={cn(
                  "text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl",
                  "animate-on-scroll", isContentVisible && "is-visible"
                )}
                style={{ transitionDelay: calculateDelay(1) }} // Stagger
                // variants REMOVIDO
            >
                {/* SparklesText Mantido */}
                <SparklesText>Compra Confirmada!🎉</SparklesText>
            </h2>

            {/* Parágrafo de Confirmação (Animado) */}
            <p
                className={cn(
                  "text-base leading-relaxed text-muted-foreground sm:text-lg",
                   "animate-on-scroll", isContentVisible && "is-visible"
                )}
                style={{ transitionDelay: calculateDelay(2) }} // Stagger
                // variants REMOVIDO
            >
                Obrigado por adquirir o <span className="font-semibold text-foreground">{purchasedProductInfo.content_name}</span>! Seu acesso está a caminho.
            </p>

            {/* Parágrafo de Instrução (Animado) */}
            <p
                className={cn(
                  "text-base leading-relaxed text-muted-foreground",
                  "animate-on-scroll", isContentVisible && "is-visible"
                )}
                style={{ transitionDelay: calculateDelay(3) }} // Stagger
                // variants REMOVIDO
            >
                Enviamos um e-mail com todos os detalhes para você começar. Por favor, verifique sua caixa de entrada (e a pasta de spam, por via das dúvidas 😉).
            </p>

             {/* Opcional: Link/Botão sutil (Mantido comentado) */}
             {/* ... */}

        </div>
      </div>
    </section>
  );
}