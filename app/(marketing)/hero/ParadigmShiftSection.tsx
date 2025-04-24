// src/app/(marketing)/hero/ParadigmShiftSection_Funcionando.tsx ok
"use client";

import React, { useEffect, useRef, useState } from "react"; // Importar hooks
import Link from "next/link";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border";
import {
    Zap,
    PieChart,
    Puzzle, // Mantido no import, mas não usado no array abaixo
    BrainCircuit, // Mantido no import, mas não usado no array abaixo
    LucideIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import { TextRevealOnly } from "@/components/TextRevealOnly"; // Removido se não for mais usado em nenhum outro lugar (ou mantenha se usar em outros locais do projeto)
import ShinyButton02 from "@/components/magicui/shiny-button-02";
import Image from 'next/image';

// Hook customizado para Intersection Observer (importar ou definir aqui)
// (Cole o hook useIntersectionObserver corrigido da resposta anterior aqui ou importe-o)
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
      threshold: 0.05, // Ajustado para 5% como no original viewport amount
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


// --- Tipagem para Feature Data --- (MANTIDA)
interface Feature {
  text: string;
  icon: LucideIcon;
}

// --- Feature Data --- (MODIFICADO - REMOVIDOS OS DOIS ÚLTIMOS)
const features: Feature[] = [
  { text: "Comandos prontos", icon: Zap },
  { text: "Planejamento automático", icon: PieChart },
  // { text: "Método fácil e prático", icon: Puzzle }, // REMOVIDO
  // { text: "Baseado em neuroeconomia", icon: BrainCircuit }, // REMOVIDO
];

// --- Componente com Animações Nativas ---
export default function ParadigmShiftSectionFuncionando() {
    const [containerRef, isContainerVisible] = useIntersectionObserver(); // Observer para o container principal
    const [titleRef, isTitleVisible] = useIntersectionObserver();
    const [featuresRef, isFeaturesVisible] = useIntersectionObserver();
    const [explanationRef, isExplanationVisible] = useIntersectionObserver();
    const [stepsRef, isStepsVisible] = useIntersectionObserver();
    const [textRevealOnlyRef, isTextRevealVisible] = useIntersectionObserver(); // Ref mantido, mas TextRevealOnly removido
    const [ctaRef, isCtaVisible] = useIntersectionObserver();

    const calculateDelay = (index: number, baseDelay = 0.1) => `${index * baseDelay}s`;

  return (
    // Adiciona ref ao container principal para observar toda a seção se necessário,
    // mas as classes serão adicionadas aos blocos internos
    <section
      id="mudanca-paradigma-final"
      ref={containerRef} // Pode usar este para um fade geral se quiser
      className="w-full py-16 md:py-20 lg:py-24 bg-background relative"
    >
       {/* Background sutil - Mantido */}
       <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-[0.06]">
          <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.3),_transparent_70%)] pointer-events-none blur-3xl transform-gpu" />
          <div className="absolute bottom-1/4 right-0 w-1/4 h-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.5),_transparent_80%)] pointer-events-none blur-3xl transform-gpu" />
       </div>

       {/* Container principal com padding - Adiciona ref para observar */}
       <div
          className="container px-5 space-y-16 md:space-y-20"
       >
            {/* --- Bloco 1: Título/Subtítulo --- Observa este bloco */}
            <div
              ref={titleRef}
              className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center"
            >
                 <h2 className={cn(
                    "text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl",
                    "animate-on-scroll",
                    isTitleVisible && "is-visible"
                   )}
                   style={{ transitionDelay: calculateDelay(0) }}
                 >
                   Não é falta de esforço. É falta da <span className="text-primary">ferramenta certa</span>.
                 </h2>
                 <p className={cn(
                    "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7",
                    "animate-on-scroll",
                    isTitleVisible && "is-visible"
                    )}
                   style={{ transitionDelay: calculateDelay(1) }}
                 >
                 </p>
            </div>

            {/* --- Bloco 2: Features Grid --- Observa este bloco */}
            <div ref={featuresRef} className="mx-auto max-w-5xl space-y-6">
                 <h3 className={cn(
                    "text-xl font-semibold text-center text-foreground",
                    "animate-on-scroll",
                    isFeaturesVisible && "is-visible"
                    )}
                    style={{ transitionDelay: calculateDelay(0) }}
                 >
                   Você não precisa de coach financeiro. Você precisa de:
                 </h3>
                 {/* MODIFICADO: md:grid-cols-4 para md:grid-cols-2 para centralizar os 2 cards restantes */}
                 <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-2">
                   {features.map((feature, index) => (
                         // Anima o wrapper de cada card
                         <div
                            key={index}
                            className={cn(
                                "h-full",
                                "animate-on-scroll",
                                isFeaturesVisible && "is-visible"
                            )}
                            style={{ transitionDelay: calculateDelay(index + 1, 0.08) }} // Stagger após o h3
                         >
                            {/* Card externo sem background/padding, apenas hover de sombra/escala se necessário */}
                            <Card className={cn(
                                "h-full flex p-0",
                                "bg-transparent",
                                "border border-border/10 shadow-sm", // Sombra inicial leve
                                // Transições movidas para .feature-card no CardContent
                                "dark:border-border/15"
                                )}>
                                {/* CardContent interno recebe o hover e a classe .feature-card */}
                                <CardContent className={cn(
                                    "p-4 flex flex-col items-center justify-center text-center gap-3 flex-grow sm:p-5 group",
                                    "relative overflow-hidden light-sweep", // Efeito mantido
                                    "bg-slate-50 dark:bg-zinc-900",
                                    "rounded-[calc(var(--radius)-1px)]",
                                    "w-full h-full",
                                    "feature-card" // Classe para aplicar hover CSS
                                    )}>
                                    <feature.icon className="h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110 z-[2]" strokeWidth={1.75} />
                                    <p className={cn(
                                        "text-base font-medium text-foreground leading-normal transition-colors group-hover:text-foreground z-[2]"
                                        )}>
                                            {feature.text}
                                    </p>
                                </CardContent>
                            </Card>
                         </div>
                    ))}
                 </div>
                 <p className={cn(
                    "text-center text-base text-muted-foreground",
                    "animate-on-scroll",
                    isFeaturesVisible && "is-visible"
                    )}
                    // MODIFICADO: features.length agora é 2
                    style={{ transitionDelay: calculateDelay(features.length + 1, 0.08) }} // Após os cards (agora calcula delay baseado em 2 cards)
                  >
                    ...e uma solução que funcione mesmo no seu pior dia. A IA faz isso em minutos.
                 </p>
            </div>

            {/* --- Bloco 3: Explicação --- Observa este bloco */}
            <div ref={explanationRef} className="grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:gap-10 items-center mx-auto">
                {/* Coluna de Texto */}
                <div className={cn(
                    "flex flex-col gap-4",
                    "animate-on-scroll",
                    isExplanationVisible && "is-visible"
                    )}
                    style={{ transitionDelay: calculateDelay(0) }}
                 >
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Por que nada que você tentou até agora funcionou?</h3>
                    <p className="text-base leading-relaxed text-muted-foreground">A verdade? Ninguém sai das dívidas só com planilhas e promessas.</p>
                    <p className="text-base leading-relaxed text-muted-foreground">A IA Anti-dívidas não ignora suas particularidades — ela trabalha com elas. Analisa sua própria realidade: renda, gastos, hábitos, gatilhos, baseada nos dados que <span className="font-medium text-foreground">você</span> informa.</p>
                    
                </div>
                {/* Coluna da Imagem */}
                <div className={cn(
                    "flex items-center justify-center",
                    "animate-on-scroll",
                    isExplanationVisible && "is-visible"
                    )}
                    style={{ transitionDelay: calculateDelay(1) }}
                >
                <ShineBorder
                      className={cn(
                        "relative group block w-full max-w-sm overflow-hidden rounded-xl shadow-lg border border-border/15 bg-muted",
                        "image-shine-border" // Adiciona classe para hover CSS da imagem interna
                      )}
                      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                      borderWidth={1}
                      duration={8}
                      borderRadius={16}
                    >
                    <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                        <div className="w-full h-full overflow-hidden">
                        <Image
                            src="/image/pessoa_segurando_celular.webp"
                            alt="Imagem IA explicando"
                            fill
                            className="absolute inset-0 w-full h-full object-cover rounded-xl image-inside" // Classe para hover CSS
                            loading="lazy"
                        />
                        </div>
                        {/* Overlays mantidos */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none rounded-xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#A07CFE] opacity-20 blur-2xl animate-pulse pointer-events-none" />
                        <div className="absolute inset-0 shimmer-overlay rounded-xl pointer-events-none z-10" />
                    </div>
                    </ShineBorder>
                </div>
            </div>

            {/* --- Bloco 4: Core Benefits (Steps) --- Observa este bloco */}
             <div ref={stepsRef} className="mx-auto max-w-4xl grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                 {/* Card 1 */}
                 <div className={cn(
                    "h-full",
                    "animate-on-scroll",
                    isStepsVisible && "is-visible"
                    )}
                    style={{ transitionDelay: calculateDelay(0) }}
                 >
                     <Card className={cn("h-full flex","bg-transparent","border border-border/10 shadow-sm","dark:border-border/15")}>
                        {/* Adiciona classe .step-card para hover */}
                        <CardContent className={cn("p-5 flex items-start gap-4 flex-grow","relative overflow-hidden light-sweep","bg-slate-50 dark:bg-zinc-900","rounded-[calc(var(--radius)-1px)]","w-full h-full", "step-card")}>
                            <span className="text-4xl font-bold text-primary mt-1 z-[2]">1</span>
                            <p className={cn("text-muted-foreground text-base leading-relaxed z-[2]")}>A IA entende o que você vive... e responde com lógica, sem julgamento, e com eficiência.</p>
                        </CardContent>
                     </Card>
                 </div>
                 {/* Card 2 */}
                 <div className={cn(
                    "h-full",
                    "animate-on-scroll",
                    isStepsVisible && "is-visible"
                    )}
                    style={{ transitionDelay: calculateDelay(1) }}
                 >
                     <Card className={cn("h-full flex","bg-transparent","border border-border/10 shadow-sm","dark:border-border/15")}>
                        {/* Adiciona classe .step-card para hover */}
                        <CardContent className={cn("p-5 flex items-start gap-4 flex-grow","relative overflow-hidden light-sweep","bg-slate-50 dark:bg-zinc-900","rounded-[calc(var(--radius)-1px)]","w-full h-full", "step-card")}>
                            <span className="text-4xl font-bold text-primary mt-1 z-[2]">2</span>
                            <p className={cn("text-muted-foreground text-base leading-relaxed z-[2]")}>Você deixa de ser refém do caos financeiro e começa a usar uma ferramenta poderosa que trabalha por você.</p>
                        </CardContent>
                      </Card>
                 </div>
            </div>

            

           

       </div> {/* Fim do container principal */}
    </section>
  );
}