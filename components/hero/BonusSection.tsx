// src/app/(marketing)/hero/BonusSection.tsx (CORRIGIDO - Wrapper com Radius/Overflow)
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border";
import {
    Gift, ShieldCheck, FileText, DollarSign, RefreshCw, ArrowRight, LucideIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ShinyButton02 from "@/components/magicui/shiny-button-02";
import { SparklesText } from "@/components/magicui/sparkles-text";

// Hook useIntersectionObserver (mantido)
function useIntersectionObserver(options: IntersectionObserverInit = {}): [React.RefObject<any>, boolean] {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef<any>(null);
    useEffect(() => { const element = ref.current; if (!element) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsIntersecting(true); observer.unobserve(element); } }, { threshold: 0.05, ...options }); observer.observe(element); return () => { if (element) { observer.unobserve(element); } }; }, [options]); return [ref, isIntersecting];
}

// Tipagem e Dados (mantidos)
interface Bonus { badge: string; priceHighlight: string; name: string; description: string; icon: LucideIcon; imgPlaceholder: string; }
const bonuses: Bonus[] = [ /* ... (dados mantidos) ... */
    { badge: "BÔNUS 1 - de R$37 por", priceHighlight: "R$ 0", name: "Renda extra em 24hrs", description: "Manual para ativar a IA na geração de grana — mesmo começando do zero.", icon: DollarSign, imgPlaceholder: "/image/Mockup-capa-ebooks-02_.webp" },
    { badge: "BÔNUS 2 - de R$27 por", priceHighlight: "R$ 0", name: "Checklist anti-dívidas", description: "Pare de entrar em dívidas antes mesmo de começar!", icon: ShieldCheck, imgPlaceholder: "/image/Mockup-capa-ebooks-03_.webp" },
    { badge: "BÔNUS 3 - de R$47 por", priceHighlight: "R$ 0", name: "Guia “Mente Blindada”", description: "Aprenda resistir à tentação de gastar e manter o autocontrole financeiro.", icon: FileText, imgPlaceholder: "/image/Mockup-capa-ebooks-05-_1_-_1_-_1__11zon (1).webp" },
];

export default function BonusSection() {
    // Definido como 8 no código original, corresponde a rounded-lg
    const cardBorderRadius = 8;
    const [titleRef, isTitleVisible] = useIntersectionObserver();
    const [gridRef, isGridVisible] = useIntersectionObserver();
    const [ctaRef, isCtaVisible] = useIntersectionObserver();
    const calculateDelay = (index: number, baseDelay = 0.1) => `${index * baseDelay}s`;

    return (
        <section
            id="bonus"
            className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-muted/10 via-background to-muted/10 relative overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 z-[-1] opacity-5 dark:opacity-[0.04]">
                <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.4),_transparent_70%)] pointer-events-none blur-3xl transform-gpu" />
                <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.5),_transparent_70%)] pointer-events-none blur-3xl transform-gpu" />
            </div>
            <div className="container px-5 space-y-12 md:space-y-16">
                {/* Bloco Título */}
                <div ref={titleRef} className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
                    <h2 className={cn("text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl", "animate-on-scroll", isTitleVisible && "is-visible")} style={{ transitionDelay: calculateDelay(0) }}>
                        Presentes que Potencializam sua <span className="text-primary"><SparklesText>Virada Financeira</SparklesText></span>
                    </h2>
                    
                </div>
                {/* Grid de Bônus */}
                <div ref={gridRef} className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {bonuses.map((bonus, idx) => (
                            // Wrapper principal - Adicionado rounded-lg e overflow-hidden
                            <div
                                key={idx}
                                className={cn(
                                    "h-full flex flex-col", // Layout
                                    "transition-all duration-200 ease-out", // Transição
                                    "hover:scale-[1.03] hover:-translate-y-1", // Hover
                                    "animate-on-scroll", isGridVisible && "is-visible", // Animação entrada
                                    // **** FIX ADICIONADO AQUI ****
                                    "rounded-lg",     // Aplica o mesmo border-radius do ShineBorder/Card
                                    "overflow-hidden" // Garante clipagem
                                    // **** FIM DO FIX ****
                                )}
                                style={{ transitionDelay: calculateDelay(idx, 0.08) }}
                            >
                                {/* ShineBorder */}
                                <ShineBorder
                                    className={cn(
                                        "block h-full overflow-hidden" // Mantém overflow, radius controlado pelo pai
                                    )}
                                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                    borderWidth={1}
                                    duration={7 + idx * 0.6}
                                    borderRadius={cardBorderRadius} // Passa o valor, mas clip é no pai
                                >
                                    {/* Card interno */}
                                    <Card
                                        className={cn(
                                            "relative overflow-hidden w-full h-full flex flex-col", // Mantém overflow/relative
                                            "bg-card dark:bg-zinc-900",
                                            "shadow-sm",
                                            "light-sweep light-mode-sweep", // Mantém light-sweep
                                            "border-0 p-0",
                                            "rounded-lg" // Garante radius no card também
                                        )}
                                    >
                                        {/* Badge Preço */}
                                        <div className="px-4 py-2 bg-muted/50 dark:bg-muted/20 border-b border-border/10 text-center">
                                            <span className="text-base font-medium text-muted-foreground line-through">{bonus.badge}</span>
                                            <span className="ml-1 text-base font-semibold text-primary">{bonus.priceHighlight}</span>
                                        </div>
                                        {/* Imagem Placeholder */}
                                        <div className="aspect-video w-full bg-muted/30 flex items-center justify-center">
                                            <Image src={bonus.imgPlaceholder} alt={`Mockup ${bonus.name}`} width={200} height={112} className="object-contain p-2" loading="lazy"/>
                                        </div>
                                        {/* Conteúdo */}
                                        <CardContent className="p-4 md:p-5 flex flex-col items-start gap-2 flex-grow relative z-[2]">
                                            <bonus.icon className="h-5 w-5 text-primary mb-1" />
                                            <h3 className="text-base font-semibold text-foreground leading-tight">{bonus.name}</h3>
                                            <p className="text-base text-foreground/80 dark:text-foreground/70 leading-relaxed flex-grow">
                                                {bonus.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </ShineBorder>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Bloco Pós-Cards */}
                <div ref={ctaRef} className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center pt-6 md:pt-8">
                    <h4 className={cn("flex items-center gap-2 text-lg font-semibold text-foreground", "animate-on-scroll", isCtaVisible && "is-visible")} style={{ transitionDelay: calculateDelay(0) }}>
                        <RefreshCw className="h-5 w-5 text-primary animate-spin [animation-duration:3s]"/>
                        + Acesso Vitalício às Atualizações 😱
                    </h4>
                    <p className={cn("text-base leading-relaxed text-muted-foreground", "animate-on-scroll", isCtaVisible && "is-visible")} style={{ transitionDelay: calculateDelay(1) }}>
                       Esses bônus, sozinhos, já valem mais que o preço do método completo. E você leva <span className="font-semibold text-foreground">TUDO</span> isso hoje.
                    </p>
                    {/* CTA BUTTON */}
                    <div className={cn("animate-on-scroll", isCtaVisible && "is-visible")} style={{ transitionDelay: calculateDelay(2) }}>
                        <ShinyButton02 text="Quero os bônus agora" />
                    </div>
                </div>
            </div>
        </section>
    );
}
