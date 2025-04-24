// src/app/(marketing)/hero/ProblemPainSection.tsx ok
"use client";

import React, { useEffect, useRef, useState } from "react"; // Importar hooks do React
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border";
// Framer Motion REMOVIDO
import {
  HeartPulse,
  TrendingDown,
  Flame,
  MessageSquareWarning,
  EyeOff,
  Lock,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ShinyButton02 from "@/components/magicui/shiny-button-02";

// --- Tipagem para os Pain Points --- (MANTIDA)
interface PainPoint {
  text: string;
  icon: LucideIcon;
}

// --- Array Pain Points --- (MANTIDO COM TIPAGEM)
const painPoints: PainPoint[] = [
  { text: "Torna-se refém e presa fácil para o sistema financeiro.", icon: Lock },
  { text: "Sente um peso no peito todo início de mês só de pensar nas contas.", icon: HeartPulse },
  { text: "Vive apagando incêndio, empurrando dívida com dívida.", icon: Flame },
  { text: "Tenta controlar o dinheiro, mas sempre volta pro mesmo buraco.", icon: TrendingDown },
  { text: "Não sabe por onde começar e sente vergonha até de pedir ajuda.", icon: MessageSquareWarning },
  { text: "Desistiu de entender “finanças” porque parece complicado demais.", icon: EyeOff },
];

// Hook customizado para Intersection Observer (CORRIGIDO - sem triggerOnce)
function useIntersectionObserver(options: IntersectionObserverInit = {}): [React.RefObject<any>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        // CORRETO: Desconecta após a primeira vez para animação 'once'
        observer.unobserve(element);
      }
    }, {
      threshold: 0.1, // Pode ser passado via options se necessário
      // triggerOnce: true, // <<< REMOVIDO - Propriedade Inválida
      ...options, // Mantém a capacidade de passar root, rootMargin, threshold
    });

    observer.observe(element);

    // Cleanup
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]); // Dependência correta

  return [ref, isIntersecting];
}


// --- Componente com Animações Nativas ---
export default function ProblemPainSection() {
  // Refs para os containers principais que vão disparar animações
  const [sectionRef, isSectionVisible] = useIntersectionObserver();
  const [titleRef, isTitleVisible] = useIntersectionObserver();
  const [gridRef, isGridVisible] = useIntersectionObserver();
  const [consequencesRef, isConsequencesVisible] = useIntersectionObserver();
  const [ctaRef, isCtaVisible] = useIntersectionObserver();

  const calculateDelay = (index: number, baseDelay = 0.1) => `${index * baseDelay}s`;

  return (
    // Adiciona ref à seção principal, mas a classe .is-visible será usada nos filhos
    <section
      id="dor-identificacao"
      ref={sectionRef} // Ref para observar a seção inteira se necessário
      className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Fundo sutil - Mantido */}
      <div className="absolute inset-0 z-[-1] opacity-15 dark:opacity-20">
        <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.5),_transparent_60%)] pointer-events-none blur-3xl transform-gpu rotate-12" />
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.6),_transparent_70%)] pointer-events-none blur-3xl transform-gpu -rotate-12 opacity-70" />
      </div>

      {/* Container */}
      <div className="container px-5 space-y-16 md:space-y-20">
        {/* Título/Subtítulo - Observa este bloco */}
        <div
          ref={titleRef}
          className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center"
        >
          <h2
            className={cn(
              "text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl",
              "animate-on-scroll", // Classe base da animação
              isTitleVisible && "is-visible" // Adiciona 'is-visible' quando o bloco entra na view
            )}
             // Delay pode ser aplicado aqui ou no CSS se for sempre o mesmo
             style={{ transitionDelay: calculateDelay(0) }}
          >
            Um vilão <span className="text-primary">impiedoso</span>
          </h2>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7",
              "animate-on-scroll",
              isTitleVisible && "is-visible"
            )}
             style={{ transitionDelay: calculateDelay(1) }} // Stagger simples
          >
            Você já sabe como é: O salário cai. A dívida engole.
          </p>
        </div>

        {/* Grid principal - Observa este bloco */}
        <div
          ref={gridRef}
          className="grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 items-center mx-auto"
        >
          {/* Imagem */}
          <div
            className={cn("animate-on-scroll", isGridVisible && "is-visible")}
             style={{ transitionDelay: calculateDelay(0) }} // Primeiro item do grid
          >
            <ShineBorder
              className="relative group block aspect-video w-full overflow-hidden rounded-xl shadow-lg border border-border/15 bg-background"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              borderWidth={1}
              duration={8}
              borderRadius={16}
            >
              {/* ... conteúdo interno do ShineBorder e Image ... */}
              <div className="relative aspect-video w-full h-full overflow-hidden rounded-xl">
                <div className="w-full h-full overflow-hidden">
                  <Image
                    src="/image/vilao_photo.webp"
                    alt="Robô ameaçador representando o sistema financeiro"
                    fill
                    className="object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/5 pointer-events-none rounded-xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FE8FB5] opacity-20 blur-2xl animate-pulse pointer-events-none" />
                <div className="absolute inset-0 shimmer-overlay rounded-xl pointer-events-none z-10" />
              </div>
            </ShineBorder>
          </div>

          {/* Texto */}
          <div
            className={cn("flex flex-col gap-4", "animate-on-scroll", isGridVisible && "is-visible")}
             style={{ transitionDelay: calculateDelay(1) }} // Segundo item do grid
          >
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
            O banco oferece &quot;ajuda&quot;,
              <span className="font-medium text-foreground"> mas empurra mais juros.</span>
               — criando um labirinto financeiro sem fim e sem saída.
            </p>
            <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground">
            A cada mês, você corre — mas o vermelho corre mais rápido.

            </blockquote>
            <p className="mt-2 text-base font-medium text-foreground/90">
            E no fim, sobra cansaço, cobrança e a sensação de estar desperdiçando a própria vida.
            </p>
          </div>
        </div>

        {/* Consequências (Cards) - Observa este bloco */}
        <div
          ref={consequencesRef}
          className="mx-auto max-w-5xl space-y-6"
        >
          <h3
            className={cn(
              "text-2xl font-semibold text-center text-foreground flex flex-wrap items-center justify-center gap-x-2",
              "animate-on-scroll",
              isConsequencesVisible && "is-visible"
            )}
             style={{ transitionDelay: calculateDelay(0) }} // Primeiro item desta seção
          >
            <span>As consequências?</span>
            <span className="text-2xl inline-block">😩</span>
          </h3>

          {/* Cards mapeados */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className={cn(
                  "h-full",
                  "animate-on-scroll", // Animação individual para cada card
                  isConsequencesVisible && "is-visible"
                )}
                // Stagger dos cards dentro da seção Consequences
                style={{ transitionDelay: calculateDelay(index + 1, 0.08) }} // Começa depois do H3, delay menor
              >
                {/* Adiciona a classe para o hover CSS */}
                <Card
                  className={cn(
                    "h-full overflow-hidden pain-point-card", // Classe para o hover CSS
                    "bg-card dark:bg-zinc-900",
                    "border border-border/15",
                    // Removido group-hover aqui, hover direto no card
                    "dark:hover:bg-zinc-800" // Exemplo de mudança no hover
                  )}
                >
                  <CardContent className="p-5">
                    {/* Adiciona a classe para o hover CSS no wrapper */}
                    <div className="flex items-center gap-3 icon-text-wrapper">
                      <point.icon
                        className="h-5 w-5 text-primary flex-shrink-0 transition-colors group-hover:text-foreground" // Pode manter group-hover se card tiver 'group' ou usar hover direto
                        strokeWidth={1.75}
                      />
                      <p className="text-base leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                        {point.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        
        </div>
   
    </section>
  );
}