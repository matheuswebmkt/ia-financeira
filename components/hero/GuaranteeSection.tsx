// src/app/(marketing)/hero/GuaranteeSection.tsx ok
"use client";

import React, { useEffect, useRef, useState } from "react"; // Hooks React
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShieldCheck, Lock, CheckCircle, LucideIcon } from "lucide-react"; // Mantido

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

// --- Tipagem para Badge Data --- (MANTIDA)
interface ConfidenceBadge {
    text: string;
    icon: LucideIcon;
}

// --- Badge Data --- (MANTIDO)
const confidenceBadges: ConfidenceBadge[] = [
    { text: "Compra 100% Segura", icon: Lock },
    { text: "Privacidade Garantida", icon: ShieldCheck },
    { text: "Satisfação ou Reembolso", icon: CheckCircle },
];

// --- Componente Otimizado ---
export default function GuaranteeSection() {

    // Hooks de observação
    const [textBlock1Ref, isTextBlock1Visible] = useIntersectionObserver();
    const [sealRef, isSealVisible] = useIntersectionObserver();
    const [textBlock2Ref, isTextBlock2Visible] = useIntersectionObserver();
    const [badgesRef, isBadgesVisible] = useIntersectionObserver();

    const calculateDelay = (index: number, baseDelay = 0.1) => `${index * baseDelay}s`;

  return (
    // Seção principal - removido motion e props
    <section
      id="garantia"
      className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950/30 dark:via-background dark:to-green-950/20 relative overflow-hidden"
      // variants, initial, whileInView, viewport REMOVIDOS
    >
       {/* Background sutil - Mantido */}
        <div className="absolute inset-0 z-[-1] opacity-20 dark:opacity-15 mix-blend-multiply dark:mix-blend-screen">
         <div className="absolute -top-1/4 left-1/4 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.1),_transparent_70%)] pointer-events-none blur-2xl transform-gpu" />
         <ShieldCheck className="absolute bottom-10 right-10 w-40 h-40 text-primary/5 dark:text-primary/10 transform-gpu rotate-12" />
       </div>

      {/* Container principal - removido motion e props */}
      <div
        className="container px-5 flex flex-col items-center gap-8 md:gap-10 text-center max-w-3xl mx-auto"
        // variants REMOVIDO (Stagger agora via delays individuais)
      >
        {/* Bloco de Texto 1 (Título e Parágrafo) - Observado como unidade */}
        <div ref={textBlock1Ref} className="flex flex-col items-center gap-4">
            <h2
                className={cn(
                  "text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl",
                  "animate-on-scroll", isTextBlock1Visible && "is-visible"
                )}
                style={{ transitionDelay: calculateDelay(0) }}
                // variants REMOVIDO
            >
                Você não tem <span className="text-primary">NADA</span> a perder. <span className="text-primary">ZERO</span> riscos!
            </h2>
            <p
                className={cn(
                  "text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8",
                  "animate-on-scroll", isTextBlock1Visible && "is-visible"
                )}
                style={{ transitionDelay: calculateDelay(1) }}
                // variants REMOVIDO
            >
                Acreditamos tanto no Método IA Anti-Dívidas que te damos uma <span className="font-semibold text-foreground">garantia incondicional de 7 dias</span>. Se por qualquer motivo você achar que o método não é pra você, é só pedir seu dinheiro de volta. Sem perguntas, sem burocracia.
            </p>
        </div>

        {/* Selo de Garantia (Observado) */}
        <div
             ref={sealRef}
             className={cn(
                "relative my-4",
                // Animação de entrada (fade + scale)
                "animate-on-scroll", isSealVisible && "is-visible",
                // Hover com Tailwind
                "transition-transform duration-200 ease-out hover:scale-105"
             )}
             // variants, whileHover, transition REMOVIDOS
        >
              {/* Glow pulsante mantido */}
              <div className="absolute inset-[-5px] animate-pulse rounded-full bg-green-400/30 blur-lg dark:bg-green-500/20 duration-1000 delay-500" />
             {/* Imagem do selo mantida */}
             <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/50 dark:to-emerald-950/50 border-2 border-green-300 dark:border-green-700 shadow-lg">
                <Image
                    src="/image/garantia-7-dias.webp"
                    alt="Selo de Garantia 7 Dias"
                    width={150}
                    height={150}
                    className="object-contain"
                    loading="lazy" // Adicionado lazy loading
                />
            </div>
        </div>

        {/* Texto Final (Observado) */}
        <p
            ref={textBlock2Ref}
            className={cn(
              "text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8",
              "animate-on-scroll", isTextBlock2Visible && "is-visible"
            )}
            // variants REMOVIDO
        >
           Você tem <span className="font-semibold text-foreground">7 dias</span> para testar todo o material. Ou você ama e transforma sua vida financeira... ou não paga nada. Simples assim. Você não tem nada a perder (exceto as dívidas 😉).
        </p>

        {/* Badges de Confiança com LightSweep (Observado) */}
        <div
             ref={badgesRef} // Observa o container dos badges
             className="w-full pt-6"
             // variants REMOVIDO
         >
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {confidenceBadges.map((badge, index) => (
                    // Anima cada badge individualmente
                    <div
                        key={index}
                        className={cn(
                            "relative overflow-hidden rounded-lg",
                            "flex items-center justify-center gap-2 px-4 py-3",
                            "bg-slate-100 dark:bg-zinc-800/50",
                            "border border-border/15",
                             // light-sweep MANTIDO
                            "light-sweep light-mode-sweep",
                             // Animação de entrada
                            "animate-on-scroll", isBadgesVisible && "is-visible",
                            // Hover sutil com Tailwind (opcional, adicione se desejar)
                            "transition-all duration-150 hover:shadow-md hover:-translate-y-px"
                        )}
                        style={{ transitionDelay: calculateDelay(index, 0.08) }} // Stagger dos badges
                        // variants REMOVIDO
                    >
                        {/* z-[2] MANTIDO */}
                        <div className="relative z-[2] flex items-center gap-2">
                             <badge.icon className="w-4 h-4 text-primary flex-shrink-0"/>
                             <span className="text-base font-medium text-muted-foreground">{badge.text}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Botão CTA Removido (conforme original) */}

      </div> {/* Fim do container principal */}
    </section>
  );
}