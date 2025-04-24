// REMOVIDO: "use client"; // <= Pode ser Server Component

import React from "react";
// import Link from "next/link"; // Removido
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border";
import { Zap, PieChart, LucideIcon } from "lucide-react"; // Ícones não usados removidos
import { Card, CardContent } from "@/components/ui/card";
// import ShinyButton02 from "@/components/magicui/shiny-button-02"; // Removido
import Image from 'next/image';
import AnimateOnScroll from '@/components/utils/AnimateOnScroll'; // Importa o wrapper de animação

// REMOVIDO: Hook useIntersectionObserver daqui

// --- Tipagem e Dados (Mantidos) ---
interface Feature {
  text: string;
  icon: LucideIcon;
}
const features: Feature[] = [
  { text: "Comandos prontos", icon: Zap },
  { text: "Planejamento automático", icon: PieChart },
];

// --- Componente Refatorado (Server Component) ---
export default function ParadigmShiftSectionFuncionando() {
    // REMOVIDO: Lógica de state/ref/effect de animação

    return (
        <section
            id="mudanca-paradigma-final" // Manter ID
            className="relative w-full overflow-hidden bg-background py-16 md:py-20 lg:py-24"
        >
            {/* Background sutil - Mantido */}
            <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-[0.06]">
                <div className="absolute top-1/4 left-0 h-1/2 w-1/3 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.3),_transparent_70%)] pointer-events-none blur-3xl" />
                <div className="absolute bottom-1/4 right-0 h-1/2 w-1/4 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.5),_transparent_80%)] pointer-events-none blur-3xl" />
            </div>

            {/* Container principal */}
            <div className="container space-y-16 px-5 md:space-y-20">

                {/* --- Bloco 1: Título/Subtítulo --- */}
                <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
                    <AnimateOnScroll delay={0}>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            Não é falta de esforço. É falta da <span className="text-primary">ferramenta certa</span>.
                        </h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={0.1}>
                        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
                            {/* Texto do parágrafo aqui, se houver */}
                        </p>
                    </AnimateOnScroll>
                </div>

                {/* --- Bloco 2: Features Grid --- */}
                <div className="mx-auto max-w-5xl space-y-6">
                    <AnimateOnScroll delay={0}>
                        <h3 className="text-center text-xl font-semibold text-foreground">
                            Você não precisa de coach financeiro. Você precisa de:
                        </h3>
                    </AnimateOnScroll>
                    <div className="grid grid-cols-2 gap-4 sm:gap-5"> {/* Grid já está md:grid-cols-2 no original */}
                        {features.map((feature, index) => (
                            <AnimateOnScroll
                                key={feature.text}
                                delay={(index + 1) * 0.08} // Stagger após o h3
                                className="h-full"
                            >
                                <Card className={cn(
                                    "flex h-full p-0",
                                    "border border-border/10 bg-transparent shadow-sm",
                                    "dark:border-border/15"
                                )}>
                                    <CardContent className={cn(
                                        "group flex h-full w-full flex-grow",
                                        "flex-col items-center justify-center gap-3 p-4 text-center sm:p-5",
                                        "relative overflow-hidden rounded-[calc(var(--radius)-1px)]",
                                        "bg-slate-50 dark:bg-zinc-900",
                                        "light-sweep feature-card" // Mantém classes
                                    )}>
                                        <feature.icon
                                            className="z-[2] h-6 w-6 text-primary transition-transform duration-200 ease-out group-hover:scale-110"
                                            strokeWidth={1.75}
                                            aria-hidden="true"
                                        />
                                        <p className={cn(
                                            "z-[2] text-base font-medium leading-normal text-foreground",
                                            "transition-colors group-hover:text-foreground"
                                        )}>
                                            {feature.text}
                                        </p>
                                    </CardContent>
                                </Card>
                            </AnimateOnScroll>
                        ))}
                    </div>
                    <AnimateOnScroll delay={(features.length + 1) * 0.08}>
                        <p className="text-center text-base text-muted-foreground">
                            ...e uma solução que funcione mesmo no seu pior dia. A IA faz isso em minutos.
                        </p>
                    </AnimateOnScroll>
                </div>

                {/* --- Bloco 3: Explicação --- */}
                <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-10">
                    {/* Coluna de Texto */}
                    <AnimateOnScroll delay={0} className="flex flex-col gap-4">
                        <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                            Por que nada que você tentou até agora funcionou?
                        </h3>
                        <p className="text-base leading-relaxed text-muted-foreground">
                            A verdade? Ninguém sai das dívidas só com planilhas e promessas.
                        </p>
                        <p className="text-base leading-relaxed text-muted-foreground">
                            A IA Anti-dívidas não ignora suas particularidades — ela trabalha com elas. Analisa sua própria realidade: renda, gastos, hábitos, gatilhos, baseada nos dados que <span className="font-medium text-foreground">você</span> informa.
                        </p>
                    </AnimateOnScroll>

                    {/* Coluna da Imagem */}
                    <AnimateOnScroll delay={0.1} className="flex items-center justify-center">
                        <ShineBorder
                            className={cn(
                                "relative group block w-full max-w-sm overflow-hidden rounded-xl border border-border/15 bg-muted shadow-lg",
                                "image-shine-border" // Classe hover
                            )}
                            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                            borderWidth={1}
                            duration={8}
                            borderRadius={16}
                        >
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                                <div className="h-full w-full overflow-hidden">
                                    <Image
                                        src="/image/pessoa_segurando_celular.webp"
                                        alt="Pessoa segurando celular e interagindo com interface de IA"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="absolute inset-0 h-full w-full rounded-xl object-cover image-inside" // Classe hover
                                        loading="lazy"
                                    />
                                </div>
                                {/* Overlays */}
                                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-black/5"></div>
                                <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 animate-pulse rounded-full bg-[#A07CFE] opacity-20 blur-2xl" />
                                <div className="pointer-events-none absolute inset-0 z-10 rounded-xl shimmer-overlay" />
                            </div>
                        </ShineBorder>
                    </AnimateOnScroll>
                </div>

                {/* --- Bloco 4: Core Benefits (Steps) --- */}
                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {/* Card 1 */}
                    <AnimateOnScroll delay={0} className="h-full">
                        <Card className={cn("flex h-full", "border border-border/10 bg-transparent shadow-sm", "dark:border-border/15")}>
                            <CardContent className={cn(
                                "flex w-full h-full flex-grow items-start gap-4 p-5",
                                "relative overflow-hidden rounded-[calc(var(--radius)-1px)]",
                                "bg-slate-50 dark:bg-zinc-900",
                                "light-sweep step-card" // Efeito e classe hover
                            )}>
                                <span className="z-[2] mt-1 text-4xl font-bold text-primary" aria-hidden="true">1</span>
                                <p className={cn("z-[2] text-base leading-relaxed text-muted-foreground")}>
                                    A IA entende o que você vive... e responde com lógica, sem julgamento, e com eficiência.
                                </p>
                            </CardContent>
                        </Card>
                    </AnimateOnScroll>
                    {/* Card 2 */}
                    <AnimateOnScroll delay={0.1} className="h-full">
                        <Card className={cn("flex h-full", "border border-border/10 bg-transparent shadow-sm", "dark:border-border/15")}>
                            <CardContent className={cn(
                                "flex w-full h-full flex-grow items-start gap-4 p-5",
                                "relative overflow-hidden rounded-[calc(var(--radius)-1px)]",
                                "bg-slate-50 dark:bg-zinc-900",
                                "light-sweep step-card" // Efeito e classe hover
                            )}>
                                <span className="z-[2] mt-1 text-4xl font-bold text-primary" aria-hidden="true">2</span>
                                <p className={cn("z-[2] text-base leading-relaxed text-muted-foreground")}>
                                    Você deixa de ser refém do caos financeiro e começa a usar uma ferramenta poderosa que trabalha por você.
                                </p>
                            </CardContent>
                        </Card>
                    </AnimateOnScroll>
                </div>

            </div> {/* Fim do container principal */}
        </section>
    );
}