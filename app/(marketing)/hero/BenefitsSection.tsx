// src/app/(marketing)/hero/BenefitsSection.tsx (CORRIGIDO - Wrapper com Radius/Overflow)
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border";
import {
    ShieldCheck, TrendingUp, UserCheck, DollarSign, Lightbulb, SmilePlus, ArrowRight, LucideIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ShinyButton02 from "@/components/magicui/shiny-button-02";

// Hook useIntersectionObserver (mantido)
function useIntersectionObserver(options: IntersectionObserverInit = {}): [React.RefObject<any>, boolean] {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef<any>(null);
    useEffect(() => { const element = ref.current; if (!element) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsIntersecting(true); observer.unobserve(element); } }, { threshold: 0.1, ...options }); observer.observe(element); return () => { if (element) { observer.unobserve(element); } }; }, [options]); return [ref, isIntersecting];
}

// Tipagem e Dados (mantidos)
interface Benefit { Icon: LucideIcon; name: string; description: string; }
const benefits: Benefit[] = [ /* ... (dados mantidos) ... */
    { Icon: ShieldCheck, name: "Adeus Medo do App", description: "Elimine o pavor de abrir o app do banco e recupere confiança." },
    { Icon: TrendingUp, name: "Plano de Saída Inteligente", description: "A IA cria um plano mais eficiente que consultoria de R$3.000." },
    { Icon: UserCheck, name: "Você no Comando com IA", description: "Deixe de ser escravo do salário e vire dono/dona da própria grana." },
    { Icon: DollarSign, name: "Estanque a Hemorragia", description: "A IA te ajuda a fazer o dinheiro parar de escorrer da sua mão." },
    { Icon: Lightbulb, name: "Novas Fontes de Renda", description: "Use a IA para gerar renda extra e fazer dinheiro de verdade." },
    { Icon: SmilePlus, name: "Alívio Imediato", description: "Sinta a paz ao ter um plano claro e executável, passo a passo." },
];

export default function BenefitsSection() {
    const [titleRef, isTitleVisible] = useIntersectionObserver({ threshold: 0.05 });
    const [gridRef, isGridVisible] = useIntersectionObserver({ threshold: 0.05 });
    const [ctaRef, isCtaVisible] = useIntersectionObserver({ threshold: 0.3 });
    const calculateDelay = (index: number, baseDelay = 0.08) => `${index * baseDelay}s`;
    // Definido como 12 no código original, corresponde a rounded-xl do Tailwind
    const cardBorderRadius = 12;

    return (
        <section
            id="beneficios"
            className="w-full py-16 md:py-20 lg:py-24 bg-slate-50 dark:bg-transparent"
        >
            <div className="container px-5 space-y-12 md:space-y-16">
                {/* Bloco Título/Subtítulo */}
                <div ref={titleRef} className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
                    <h2 className={cn("text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl", "animate-on-scroll", isTitleVisible && "is-visible")} style={{ transitionDelay: calculateDelay(0) }}>
                        Sua vida financeira <span className="text-primary">sob controle</span> — finalmente.
                    </h2>
                    <p className={cn("max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7", "animate-on-scroll", isTitleVisible && "is-visible")} style={{ transitionDelay: calculateDelay(1) }}>
                        Liberte-se das correntes que prendem seus sonhos e projetos. Veja o que você vai conquistar:
                    </p>
                </div>
                {/* Bloco de Benefícios */}
                <div ref={gridRef} className="mx-auto max-w-6xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
                    {benefits.map((benefit, index) => (
                        // Wrapper Externo - Adicionado rounded-xl e overflow-hidden
                        <div
                            key={benefit.name}
                            className={cn(
                                "h-full",
                                "transition-all duration-200 ease-out",
                                "hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-primary/20",
                                "animate-on-scroll", isGridVisible && "is-visible",
                                // **** FIX ADICIONADO AQUI ****
                                "rounded-xl",     // Aplica o mesmo border-radius do ShineBorder/Card
                                "overflow-hidden" // Garante clipagem
                                // **** FIM DO FIX ****
                            )}
                            style={{ transitionDelay: calculateDelay(index, 0.05) }}
                        >
                            {/* ShineBorder */}
                            <ShineBorder
                                className={cn(
                                    "block h-full overflow-hidden", // Já tem overflow-hidden
                                    // Removido rounded-xl daqui, pois o pai já controla
                                    "shadow-sm" // Sombra base
                                )}
                                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                borderWidth={1}
                                duration={6 + index * 0.5}
                                borderRadius={cardBorderRadius} // Passa o valor, mas o clip visual é no pai
                            >
                                {/* Card interno */}
                                <Card className={cn(
                                    "flex h-full flex-col overflow-hidden", // Mantém overflow aqui por segurança interna
                                    "bg-card/95 dark:bg-zinc-900/95 backdrop-blur-md",
                                    // Não precisa de shadow aqui, já está no hover do wrapper
                                    // Não precisa de rounded aqui, o pai (div) e ShineBorder já controlam
                                )}>
                                    <CardContent className="flex flex-grow flex-col p-5 md:p-6 z-[2]">
                                        <benefit.Icon className="h-7 w-7 text-primary mb-3" />
                                        <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.name}</h3>
                                        <p className="flex-grow text-base leading-relaxed text-foreground/90">
                                            {benefit.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </ShineBorder>
                        </div>
                    ))}
                </div>
                {/* Bloco CTA Final */}
                <div ref={ctaRef} className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center pt-8 md:pt-10">
                   <p className={cn("text-lg leading-relaxed text-muted-foreground", "animate-on-scroll", isCtaVisible && "is-visible")} style={{ transitionDelay: calculateDelay(0) }}>
                        <span className="font-medium text-foreground">Você vai finalmente sentir o  controle voltar, e quando isso acontece... ninguém mais te segura.</span> 
                    </p>
                    <div className={cn("animate-on-scroll", isCtaVisible && "is-visible")} style={{ transitionDelay: calculateDelay(1) }}>
                        <ShinyButton02 text="Assumir o meu controle" />
                    </div>
                </div>
            </div>
        </section>
    );
}