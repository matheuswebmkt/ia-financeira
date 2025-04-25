// REMOVIDO: "use client"; // <= Pode ser Server Component

import React from "react";
// import Link from "next/link"; // Removido
import Image from "next/image"; // <<< IMPORTADO Image do Next.js
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border";
import { Zap, Target, Brain, LucideIcon } from "lucide-react"; // Removidos Sparkles, ArrowRight
import { Card, CardContent } from "@/components/ui/card";
// import ShinyButton02 from "@/components/magicui/shiny-button-02"; // Removido
import AnimateOnScroll from '@/components/utils/AnimateOnScroll'; // Importa wrapper

// REMOVIDO: Hook useIntersectionObserver daqui

// --- Tipagem e Dados (Mantidos) ---
interface Pilar {
    text: string;
    icon: LucideIcon;
}
const pilares: Pilar[] = [
    { text: "Começa em minutos", icon: Zap },
    { text: "Plano estratégico personalizado", icon: Target },
    { text: "Inteligência financeira real", icon: Brain },
];

// --- Componente Refatorado (Server Component) ---
export default function MethodIntroductionSection() {
    // REMOVIDO: Logica de state/ref/effect de animação
    // REMOVIDO: calculateDelay

    return (
        <section
            id="introducao-metodo" // Manter ID
            className="w-full bg-slate-50 py-16 dark:bg-transparent md:py-20 lg:py-24"
        >
            <div className="container space-y-16 px-5 md:space-y-20">

                {/* 1. Bloco Título/Subtítulo */}
                <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
                    <AnimateOnScroll delay={0}>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                             {/* Mantém SparklesText se desejado */}
                            IA Anti-dívidas: SEU ALIADO Nº 1
                        </h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={0.1}>
                        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
                            Chega de promessas vazias e gurus. A IA é Sua expert financeira pessoal — gratuita e 24h sob seu comando.
                        </p>
                    </AnimateOnScroll>
                </div>

                {/* 2. Bloco Grid Principal */}
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">

                    {/* Coluna Esquerda: Visual */}
                    <AnimateOnScroll delay={0}>
                        <ShineBorder
                            className={cn(
                                "relative group block aspect-video w-full overflow-hidden rounded-xl border border-border/15 bg-background shadow-lg",
                                "image-shine-border"
                            )}
                            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                            borderWidth={1}
                            duration={8}
                            borderRadius={16}
                        >
                            <div className="relative aspect-video h-full w-full overflow-hidden rounded-xl">
                                {/* <<< CORRIGIDO: Usa next/image */}
                                <Image
                                    src="/image/aliado_photo.webp"
                                    alt="Demonstração da interface da IA Anti-dívidas" // Alt text mais descritivo
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="rounded-xl object-cover image-inside transition-transform duration-500 group-hover:scale-105" // Classe hover/transition
                                    loading="lazy"
                                />
                                {/* Overlays */}
                                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-900/40 via-transparent to-pink-500/20 mix-blend-lighten" />
                                <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 animate-pulse rounded-full bg-[#A07CFE] opacity-30 blur-3xl" />
                                <div className="pointer-events-none absolute inset-0 rounded-xl shimmer-overlay" />
                            </div>
                        </ShineBorder>
                    </AnimateOnScroll>

                    {/* Coluna Direita: Texto */}
                    <AnimateOnScroll delay={0.1} className="flex flex-col gap-4">
                        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
                            <span className="font-medium text-foreground">Script pronto. Resultados Reais. Sem tempo perdido.</span>
                        </p>
                        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
                        Imagine abrir o celular, colar um comando pronto, e receber um <span className="font-medium text-foreground">plano financeiro inteligente</span>, personalizado e pronto pra te <span className="font-medium text-foreground">tirar do vermelho</span> ou resolver alguma situação complicada...
                        </p>
                        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
                        Agora pare de imaginar. A IA faz isso. E faz em minutos. Uma tecnologia que escuta, entende e responde só a você. <span className="font-medium text-foreground">(Tá tudo pronto!)</span>
                        </p>
                    </AnimateOnScroll>
                </div>

                {/* 3. Bloco Inferior: Pilares */}
                <div className="mx-auto max-w-5xl space-y-6 text-center">
                    <AnimateOnScroll delay={0}>
                        <h3 className="text-xl font-semibold text-foreground">
                            É uma ferramenta de libertação financeira:
                        </h3>
                    </AnimateOnScroll>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
                        {pilares.map((pilar, index) => (
                            <AnimateOnScroll
                                key={pilar.text} // Usa texto como key
                                delay={(index + 1) * 0.08} // Stagger
                                className="h-full"
                            >
                                <Card className={cn(
                                    "flex h-full p-0",
                                    "border border-border/15 bg-transparent shadow-sm",
                                )}>
                                    <CardContent className={cn(
                                        "group flex h-full w-full flex-grow", // Adiciona group
                                        "flex-col items-center justify-center gap-2 p-4 text-center sm:p-5",
                                        "relative overflow-hidden rounded-[calc(var(--radius)-1px)]",
                                        "bg-card dark:bg-zinc-900",
                                        "light-sweep pillar-card" // Efeito
                                    )}>
                                        <pilar.icon className="z-[2] mb-1 h-6 w-6 text-primary" strokeWidth={1.75} aria-hidden="true" />
                                        <p className="z-[2] text-base font-medium leading-normal text-foreground">
                                            {pilar.text}
                                        </p>
                                    </CardContent>
                                </Card>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>

                {/* 4. Bloco Final Reinforcement & CTA REMOVIDO */}

            </div>
        </section>
    );
}