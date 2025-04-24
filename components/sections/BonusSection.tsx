// components/sections/BonusSection.tsx

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border";
import {
    ShieldCheck, FileText, DollarSign, RefreshCw, LucideIcon // Mantém RefreshCw
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import { SparklesText } from "@/components/magicui/sparkles-text"; // Removido - não usado no H2
import AnimateOnScroll from '@/components/utils/AnimateOnScroll';

// --- Tipagem e Dados ---
interface Bonus { badge: string; priceHighlight: string; name: string; description: string; icon: LucideIcon; imgPlaceholder: string; }
const bonuses: Bonus[] = [
    { badge: "BÔNUS 1 - de R$37 por", priceHighlight: "R$ 0", name: "Renda extra em 24hrs", description: "Manual para ativar a IA na geração de grana — mesmo começando do zero.", icon: DollarSign, imgPlaceholder: "/image/Mockup-capa-ebooks-02_.webp" },
    { badge: "BÔNUS 2 - de R$27 por", priceHighlight: "R$ 0", name: "Checklist anti-dívidas", description: "Pare de entrar em dívidas antes mesmo de começar!", icon: ShieldCheck, imgPlaceholder: "/image/Mockup-capa-ebooks-03_.webp" },
    { badge: "BÔNUS 3 - de R$47 por", priceHighlight: "R$ 0", name: "Guia “Mente Blindada”", description: "Aprenda resistir à tentação de gastar e manter o autocontrole financeiro.", icon: FileText, imgPlaceholder: "/image/Mockup-capa-ebooks-05-_1_-_1_-_1__11zon (1).webp" },
];

// --- Componente Refatorado (Server Component) ---
export default function BonusSection() {
    const cardBorderRadius = 8;

    return (
        <section
            id="bonus"
            className="relative w-full overflow-hidden bg-gradient-to-b from-muted/10 via-background to-muted/10 py-16 md:py-20 lg:py-24"
        >
            {/* Background */}
            <div className="absolute inset-0 z-[-1] opacity-5 dark:opacity-[0.04]">
                <div className="pointer-events-none absolute -bottom-1/4 -left-1/4 h-1/2 w-1/2 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.4),_transparent_70%)] blur-3xl" />
                <div className="pointer-events-none absolute -top-1/4 -right-1/4 h-1/2 w-1/2 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.5),_transparent_70%)] blur-3xl" />
            </div>

            <div className="container space-y-12 px-5 md:space-y-16">
                {/* Bloco Título */}
                <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
                    <AnimateOnScroll delay={0}>
                        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"> {/* Adicionado text-balance */}
                            {/* Removido SparklesText do título, ajuste se quiser de volta */}
                            Presentes que Potencializam sua <span className="text-primary">Virada Financeira</span>
                        </h2>
                    </AnimateOnScroll>
                </div>

                {/* Grid de Bônus */}
                <div className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {bonuses.map((bonus, idx) => (
                            <AnimateOnScroll
                                key={bonus.name}
                                delay={(idx + 1) * 0.08}
                                className={cn(
                                    "flex h-full flex-col",
                                    "overflow-hidden rounded-lg",
                                    "transition-all duration-200 ease-out",
                                    "hover:scale-[1.03] hover:-translate-y-1"
                                )}
                            >
                                <ShineBorder
                                    className="block h-full overflow-hidden"
                                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                    borderWidth={1}
                                    duration={7 + idx * 0.6}
                                    borderRadius={cardBorderRadius}
                                >
                                    <Card
                                        className={cn(
                                            "relative flex h-full w-full flex-col overflow-hidden",
                                            "rounded-lg border-0 bg-card p-0 shadow-sm dark:bg-zinc-900",
                                            "light-sweep light-mode-sweep"
                                        )}
                                    >
                                        <div className="border-b border-border/10 bg-muted/50 px-4 py-2 text-center dark:bg-muted/20">
                                            <span className="text-sm font-medium text-muted-foreground line-through">{bonus.badge}</span>
                                            <span className="ml-1 text-sm font-semibold text-primary">{bonus.priceHighlight}</span>
                                        </div>
                                        <div className="flex aspect-video w-full items-center justify-center bg-muted/30">
                                            <Image
                                               src={bonus.imgPlaceholder}
                                               alt={`Mockup ${bonus.name}`}
                                               width={200} height={112}
                                               className="object-contain p-2"
                                               loading="lazy"
                                            />
                                        </div>
                                        <CardContent className="relative z-[2] flex flex-grow flex-col items-start gap-2 p-4 md:p-5">
                                            <bonus.icon className="mb-1 h-5 w-5 text-primary" aria-hidden="true" />
                                            <h3 className="text-base font-semibold leading-tight text-foreground">{bonus.name}</h3>
                                            <p className="flex-grow text-sm leading-relaxed text-foreground/80 dark:text-foreground/70">
                                                {bonus.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </ShineBorder>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>

                {/* Bloco Pós-Cards - Ícone RefreshCw ADICIONADO */}
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 pt-6 text-center md:pt-8">
                    <AnimateOnScroll delay={0}>
                        <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                             {/* --- ÍCONE ADICIONADO AQUI --- */}
                            <RefreshCw className="h-5 w-5 animate-spin text-primary [animation-duration:3s]" aria-hidden="true"/>
                            + Acesso Vitalício às Atualizações <span aria-label="Rosto chocado" role="img">😱</span>
                        </h4>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={0.1}>
                        <p className="text-balance text-base leading-relaxed text-muted-foreground"> {/* Adicionado text-balance */}
                           Esses bônus, sozinhos, já valem mais que o preço do método completo. E você leva <span className="font-semibold text-foreground">TUDO</span> isso hoje.
                        </p>
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
}