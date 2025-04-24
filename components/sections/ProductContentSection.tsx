// REMOVIDO: "use client"; // <= AGORA PODE SER SERVER COMPONENT!

import React from "react";
// import Link from "next/link"; // Removido
import Image from "next/image";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border"; // Mantido
import { Check } from "lucide-react"; // Só importa Check
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Removido se não usado mais
// import ShinyButton02 from "@/components/magicui/shiny-button-02"; // Removido
import AnimateOnScroll from '@/components/utils/AnimateOnScroll'; // Importa wrapper

// REMOVIDO: Hook useIntersectionObserver daqui

// --- Content Data --- (Mantido)
const topics: string[] = [
    "Você ativa a IA Anti-dívidas.",
    "Ela analisa sua situação.",
    "Gera um plano automático pra você executar.",
    "Elimina os pontos de sabotagem.",
    "Guia você, passo a passo, até vencer o jogo.",
    "Simples. Inteligente. Possível. Feito pra você.",
    "E tudo isso em 15 minutos.",
];

// --- Componente Refatorado (Server Component) ---
export default function ProductContentSection() {
    // REMOVIDO: Logica de state/ref/effect de animação
    // REMOVIDO: calculateDelay

    return (
        <section
            id="conteudo-produto" // Manter ID
            className="relative w-full overflow-hidden bg-slate-50 py-16 dark:bg-transparent md:py-20 lg:py-24"
        >
            {/* Background sutil - Mantido */}
            <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-[0.07]">
                <div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.4),_transparent_70%)] pointer-events-none blur-3xl opacity-60" />
                <div className="absolute -bottom-1/4 -right-1/4 h-1/3 w-1/3 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.5),_transparent_80%)] pointer-events-none blur-3xl opacity-50" />
            </div>

            {/* Container principal */}
            <div className="container space-y-16 px-5 md:space-y-20">

                {/* 1. Bloco Título/Descrição */}
                <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
                    <AnimateOnScroll delay={0}>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            Inteligência que <span className="text-primary">vira o jogo.</span>
                        </h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={0.1}>
                        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
                            Comece agora. Em 15 minutos, você pode ter um novo plano de vida.
                        </p>
                    </AnimateOnScroll>
                </div>

                {/* ================== BLOCO PRINCIPAL (GRID) ================== */}
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">

                    {/* Coluna Esquerda: Mockup */}
                    <AnimateOnScroll delay={0}>
                        <ShineBorder
                            className="relative group block aspect-video w-full overflow-hidden rounded-xl border border-border/15 bg-background shadow-xl"
                            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                            borderWidth={1}
                            duration={8}
                            borderRadius={16}
                        >
                            <div className="relative aspect-video h-full w-full overflow-hidden rounded-xl">
                                <Image
                                    src="/image/card_de_fotos_com_3_pessoas.webp"
                                    alt="Mockup visual do Método IA Anti-Dívidas" // Alt text
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.03] opacity-100"
                                    loading="lazy"
                                />
                                {/* Overlays */}
                                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 via-transparent to-black/5" />
                                <div className="pointer-events-none absolute inset-0 animate-shimmer rounded-xl bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.07),transparent)] bg-[length:200%_100%]" />
                            </div>
                        </ShineBorder>
                    </AnimateOnScroll>

                    {/* Coluna Direita: Bloco Detalhes */}
                    <AnimateOnScroll
                        delay={0.1} // Delay para a segunda coluna
                        className={cn(
                            // Estilos do bloco
                            "relative h-full w-full space-y-6 overflow-hidden rounded-lg border bg-card p-6 shadow-sm dark:bg-zinc-900",
                            // Efeitos visuais
                            "light-sweep light-mode-sweep",
                            // Alinhamento responsivo
                            "flex flex-col items-start text-left", // Mobile: à esquerda
                            "md:items-center md:text-center" // Desktop: centralizado
                        )}
                    >
                        <h4 className="relative z-[2] mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                            Tudo 100% fácil e prático, direto no seu celular ou computador.
                        </h4>
                        <ul className="relative z-[2] list-none space-y-1.5 text-sm text-muted-foreground">
                            {topics.map((topic) => ( // Não precisa de index aqui
                                <li key={topic} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 flex-shrink-0 text-green-500" aria-hidden="true"/>
                                    <span className="text-base">{topic}</span>
                                </li>
                            ))}
                        </ul>
                    </AnimateOnScroll>
                    {/* FIM DA Coluna Direita */}
                </div>
                {/* ================== FIM DO BLOCO PRINCIPAL (GRID) ================== */}

                {/* REMOVIDO: Bloco CTA Final */}

            </div> {/* Fim do container principal */}
        </section>
    );
}