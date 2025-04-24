// src/app/(marketing)/hero/ProductContentSection.tsx ok
"use client";

import React, { useEffect, useRef, useState } from "react"; // Importar hooks
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border"; // Mantido
// Framer Motion REMOVIDO (motion, Variants)
import {
    MessageSquare, // Mantido no import, mas não usado mais no JSX visível
    ClipboardList, // Mantido no import, mas não usado mais no JSX visível
    Users,
    ListChecks,
    Check,
    LucideIcon
} from "lucide-react"; // Mantido
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Mantido (embora os mini-cards tenham sido removidos)
import ShinyButton02 from "@/components/magicui/shiny-button-02"; // Mantido
import { SparklesText } from "@/components/magicui/sparkles-text"; // Mantido

// Hook customizado para Intersection Observer (importar ou definir aqui)
// (Cole o hook useIntersectionObserver corrigido aqui ou importe-o)
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
      threshold: 0.05, // Threshold original da seção
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

// --- Content Data --- (MANTIDO - topics atualizado)
const topics: string[] = [
    "Você ativa a IA Anti-dívidas.", // Texto atualizado
    "Ela analisa sua situação.", // Texto atualizado
    "Gera um plano automático pra você executar.", // Texto atualizado
    "Elimina os pontos de sabotagem.", // Texto atualizado
    "Guia você, passo a passo, até vencer o jogo.", // Texto atualizado
    "Simples. Inteligente. Possível. Feito pra você.", // Texto atualizado
    "E tudo isso em 15 minutos.", // Texto atualizado
];

// --- Componente Otimizado ---
export default function ProductContentSection() {
    // const MotionCard = motion(Card); // REMOVIDO

    // Hooks de observação (detailsRef agora se refere ao bloco movido)
    const [titleRef, isTitleVisible] = useIntersectionObserver();
    const [gridRef, isGridVisible] = useIntersectionObserver();
    const [detailsRef, isDetailsVisible] = useIntersectionObserver(); // Este ref agora pertence ao bloco que foi movido para DENTRO do grid
    const [ctaRef, isCtaVisible] = useIntersectionObserver();

    const calculateDelay = (index: number, baseDelay = 0.1) => `${index * baseDelay}s`;

  return (
    // Seção principal - removido motion e props de animação
    <section
      id="conteudo-produto"
      className="w-full py-16 md:py-20 lg:py-24 bg-slate-50 dark:bg-transparent relative overflow-hidden"
      // variants, initial, whileInView, viewport REMOVIDOS
    >
      {/* Background sutil - Mantido */}
       <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-[0.07]">
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.4),_transparent_70%)] pointer-events-none blur-3xl transform-gpu opacity-60" />
            <div className="absolute -bottom-1/4 -right-1/4 w-1/3 h-1/3 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.5),_transparent_80%)] pointer-events-none blur-3xl transform-gpu opacity-50" />
       </div>

      {/* Container principal - removido motion e props de animação */}
      <div
        className="container px-5 space-y-16 md:space-y-20"
        // variants REMOVIDO
      >
        {/* 1. Bloco Título/Descrição (Observado e Intacto) */}
        <div
            ref={titleRef}
            className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center"
        >
             <h2 className={cn(
                "text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl",
                "animate-on-scroll", isTitleVisible && "is-visible"
               )}
               style={{ transitionDelay: calculateDelay(0) }}
             >
                {/* SparklesText Mantido */}
                <SparklesText>Inteligência que</SparklesText> <span className="text-primary">vira o jogo.</span>
             </h2>
             <p className={cn(
                "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7",
                "animate-on-scroll", isTitleVisible && "is-visible"
               )}
               style={{ transitionDelay: calculateDelay(1) }}
             >
                Comece agora. Em 15 minutos, você pode ter um novo plano de vida.
             </p>
        </div>

        {/* ================== BLOCO PRINCIPAL (GRID) REESTRUTURADO ================== */}
        <div
            ref={gridRef} // Grid principal ainda é observado
            className="grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 items-center mx-auto"
        >

            {/* Coluna Esquerda: Mockup (Animado e Intacto) */}
            <div
                className={cn(
                    "animate-on-scroll", isGridVisible && "is-visible" // Animação ligada à visibilidade do grid
                )}
                style={{ transitionDelay: calculateDelay(0) }} // Delay 0 para a primeira coluna
            >
                {/* ShineBorder e Image Mantidos */}
                <ShineBorder
                    className="relative group block aspect-video w-full overflow-hidden rounded-xl shadow-xl border border-border/15 bg-background"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                    borderWidth={1}
                    duration={8}
                    borderRadius={16}
                >
                    <div className="relative aspect-video w-full h-full overflow-hidden rounded-xl">
                        <Image
                        src="/image/card_de_fotos_com_3_pessoas.webp"
                        alt="Mockup do Método IA Anti-Dívidas"
                        fill
                        className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.03] opacity-100"
                        loading="lazy"
                        />
                        {/* Overlays visuais mantidos */}
                        <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-t from-black/20 via-transparent to-black/5" />
                        <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.07),transparent)] bg-[length:200%_100%] rounded-xl pointer-events-none" />
                    </div>
                </ShineBorder>
            </div>

            {/* Coluna Direita: Bloco Detalhes MOVIDO com ALINHAMENTO RESPONSIVO */}
             <div
                ref={detailsRef} // O ref original do bloco movido é mantido aqui
                className={cn(
                    // Estilos originais do bloco Detalhes mantidos
                    "w-full h-full",
                    "space-y-6 rounded-lg p-6 md:p-8 border shadow-sm",
                    "relative overflow-hidden", "bg-card dark:bg-zinc-900", "light-sweep light-mode-sweep",
                    // Animação ligada à visibilidade do grid
                    "animate-on-scroll", isGridVisible && "is-visible",
                    // !!!!! CLASSES DE ALINHAMENTO ALTERADAS !!!!!
                    // Default (mobile): Alinha itens (h4, ul) e texto à esquerda
                    "flex flex-col items-start text-left",
                    // A partir de 'md' (desktop): Centraliza itens e texto
                    "md:items-center md:text-center"
                )}
                style={{ transitionDelay: calculateDelay(1) }}
                // variants REMOVIDO
             >
                 {/* Conteúdo (h4 e ul) que estava dentro do bloco Detalhes, agora aqui */}
                 {/* O h4 agora respeitará o text-left (mobile) / md:text-center (desktop) do pai */}
                 <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-3 z-[2] relative">
                     Tudo 100% fácil e prático, direto no seu celular ou computador.
                 </h4>
                  {/* A ul como bloco respeitará o items-start (mobile) / md:items-center (desktop) do pai */}
                 <ul className="space-y-1.5 list-none text-sm text-muted-foreground z-[2] relative">
                    {topics.map((topic, index) => (
                         // O alinhamento interno de cada li (check + texto) continua o mesmo (items-center)
                        <li key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0"/>
                            <span className="text-base">{topic}</span> {/* Textos atualizados */}
                        </li>
                    ))}
                 </ul>
            </div>
            {/* FIM DA Coluna Direita (Bloco Movido) */}

        </div>
        {/* ================== FIM DO BLOCO PRINCIPAL (GRID) REESTRUTURADO ================== */}

        {/* O Bloco Detalhes original FOI REMOVIDO daqui de baixo, pois foi movido para dentro do grid acima */}


        {/* 4. Bloco CTA Final (Observado e Intacto, com texto atualizado) */}
        <div
            ref={ctaRef}
            className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center pt-8 md:pt-10"
            // variants REMOVIDO
        >
             <p
                className={cn(
                    "text-xl font-semibold leading-relaxed text-foreground",
                    "animate-on-scroll", isCtaVisible && "is-visible"
                )}
                style={{ transitionDelay: calculateDelay(0) }}
                // variants REMOVIDO
            >
                Clique no botão abaixo e ative agora a IA Anti-Dívidas. {/* Texto atualizado */}
            </p>
            <div
                className={cn(
                    "animate-on-scroll", isCtaVisible && "is-visible"
                )}
                style={{ transitionDelay: calculateDelay(1) }}
                // variants REMOVIDO
            >
                <ShinyButton02 text="Ativar a IA Anti-dívidas" /> {/* Texto do botão atualizado */}
            </div>
        </div>

      </div> {/* Fim do container principal */}
    </section>
  );
}