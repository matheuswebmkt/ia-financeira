// src/app/(marketing)/hero/FinalCtaSection.tsx ok
"use client";

import React, { useEffect, useRef, useState } from "react"; // Hooks React
import Link from "next/link";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border"; // Mantido
import { ArrowRight, Zap } from "lucide-react"; // Mantido
import ShinyButton02 from "@/components/magicui/shiny-button-02"; // Mantido

// Hook customizado para Intersection Observer (importar ou definir aqui)
function useIntersectionObserver(options: IntersectionObserverInit = {}): [React.RefObject<any>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(element);
      }
    }, {
      threshold: 0.1, // Threshold original da seção
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

// --- Animation Variants --- REMOVIDAS

// --- Componente Otimizado ---
export default function FinalCtaSection() {

    // Hooks de observação
    // Observa o container para controlar o stagger dos filhos
    const [containerRef, isContainerVisible] = useIntersectionObserver();

    const calculateDelay = (index: number, baseDelay = 0.1) => `${index * baseDelay}s`;

  return (
    // Seção principal - removido motion e props
    <section
      id="cta-final"
      className="relative w-full overflow-hidden py-20 md:py-28 lg:py-32 bg-gradient-to-tr from-primary/10 via-background to-accent/10 dark:from-primary/20 dark:via-background dark:to-accent/20"
      // variants, initial, whileInView, viewport REMOVIDOS
    >
       {/* Background sutil - Mantido */}
        <div className="absolute inset-0 z-[-1] opacity-15 dark:opacity-20">
         <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.5),_transparent_60%)] pointer-events-none blur-3xl transform-gpu rotate-12" />
         <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.6),_transparent_70%)] pointer-events-none blur-3xl transform-gpu -rotate-12 opacity-70" />
       </div>


      {/* Container centralizado - Observado */}
      <div
        ref={containerRef} // Ref no container para ativar animação dos filhos
        className="container px-5 flex max-w-2xl flex-col items-center gap-6 text-center"
        // variants REMOVIDO
      >
        {/* Título Impactante */}
        <h2
            className={cn(
              "text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl",
              // Animação aplicada diretamente
              "animate-on-scroll", isContainerVisible && "is-visible"
            )}
            style={{ transitionDelay: calculateDelay(0, 0.1) }} // Delay base para o primeiro item
            // variants REMOVIDO
        >
            ÚLTIMA CHANCE <br className="sm:hidden"/> para <span className="text-primary">Mudar Tudo</span> HOJE!
        </h2>

        {/* Texto de Reforço */}
        <p
            className={cn(
              "max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7",
              "animate-on-scroll", isContainerVisible && "is-visible"
            )}
            style={{ transitionDelay: calculateDelay(1, 0.1) }} // Stagger
            // variants REMOVIDO
        >
            Você já viu como a IA pode ser a virada de chave. O Método te entrega o plano, os prompts, os bônus e a garantia. Milhares já saíram do vermelho. <span className="font-medium text-foreground">Você tá esperando o quê?</span>
        </p>

        {/* Botão CTA Final */}
        <div
           className={cn(
              "animate-on-scroll", isContainerVisible && "is-visible"
           )}
           style={{ transitionDelay: calculateDelay(2, 0.1) }} // Stagger
           // variants REMOVIDO
        >
            <ShinyButton02 text="Quero a IA Anti-dívidas" />
          </div>

         {/* Texto Final Abaixo do Botão */}
        <p
            className={cn(
              "text-base text-muted-foreground pt-2",
               "animate-on-scroll", isContainerVisible && "is-visible"
            )}
            style={{ transitionDelay: calculateDelay(3, 0.1) }} // Stagger
            // variants REMOVIDO
        >
           Não é só sobre pagar contas — é sobre viver sem peso e ter <span className="font-semibold text-primary">liberdade de verdade</span>.
        </p>

      </div> {/* Fim do container principal */}
    </section>
  );
}