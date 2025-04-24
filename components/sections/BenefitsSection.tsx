// REMOVIDO: "use client"; // <= AGORA PODE SER SERVER COMPONENT!

import React from "react";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border";
import {
    ShieldCheck, TrendingUp, UserCheck, DollarSign, Lightbulb, SmilePlus, LucideIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// REMOVIDO: import ShinyButton02 from "@/components/magicui/shiny-button-02";
import AnimateOnScroll from '@/components/utils/AnimateOnScroll'; // Importa o wrapper de animação

// --- Tipagem e Dados (mantidos) ---
interface Benefit { Icon: LucideIcon; name: string; description: string; }
const benefits: Benefit[] = [
    { Icon: ShieldCheck, name: "Adeus Medo do App", description: "Elimine o pavor de abrir o app do banco e recupere confiança." },
    { Icon: TrendingUp, name: "Plano de Saída Inteligente", description: "A IA cria um plano mais eficiente que consultoria de R$3.000." },
    { Icon: UserCheck, name: "Você no Comando com IA", description: "Deixe de ser escravo do salário e vire dono/dona da própria grana." },
    { Icon: DollarSign, name: "Estanque a Hemorragia", description: "A IA te ajuda a fazer o dinheiro parar de escorrer da sua mão." },
    { Icon: Lightbulb, name: "Novas Fontes de Renda", description: "Use a IA para gerar renda extra e fazer dinheiro de verdade." },
    { Icon: SmilePlus, name: "Alívio Imediato", description: "Sinta a paz ao ter um plano claro e executável, passo a passo." },
];

// --- Componente Refatorado (Server Component) ---
export default function BenefitsSection() {
    const cardBorderRadius = 12;

    return (
        <section
            id="beneficios"
            className="w-full bg-slate-50 py-16 dark:bg-transparent md:py-20 lg:py-24"
        >
            <div className="container space-y-12 px-5 md:space-y-16">
                {/* Bloco Título/Subtítulo */}
                <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
                    <AnimateOnScroll delay={0}>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            Sua vida financeira <span className="text-primary">sob controle</span> — finalmente.
                        </h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={0.1}>
                        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
                            Liberte-se das correntes que prendem seus sonhos e projetos. Veja o que você vai conquistar:
                        </p>
                    </AnimateOnScroll>
                </div>

                {/* Bloco de Benefícios */}
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    {benefits.map((benefit, index) => (
                        <AnimateOnScroll
                            key={benefit.name}
                            delay={(index + 1) * 0.05}
                            className={cn(
                                "h-full overflow-hidden rounded-xl",
                                "transition-all duration-200 ease-out",
                                "hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-primary/20"
                            )}
                        >
                            <ShineBorder
                                className="block h-full overflow-hidden shadow-sm"
                                color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                borderWidth={1}
                                duration={6 + index * 0.5}
                                borderRadius={cardBorderRadius}
                            >
                                <Card className={cn(
                                    "flex h-full flex-col overflow-hidden",
                                    "bg-card/95 dark:bg-zinc-900/95 backdrop-blur-md"
                                )}>
                                    <CardContent className="z-[2] flex flex-grow flex-col p-5 md:p-6">
                                        <benefit.Icon className="mb-3 h-7 w-7 text-primary" aria-hidden="true" />
                                        <h3 className="mb-2 text-lg font-semibold text-foreground">{benefit.name}</h3>
                                        <p className="flex-grow text-base leading-relaxed text-foreground/90">
                                            {benefit.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </ShineBorder>
                        </AnimateOnScroll>
                    ))}
                </div>

                {/* Bloco CTA Final REMOVIDO */}
                {/* 
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 pt-8 text-center md:pt-10">
                   <AnimateOnScroll delay={0}>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            <span className="font-medium text-foreground">Você vai finalmente sentir o controle voltar, e quando isso acontece... ninguém mais te segura.</span> 
                        </p>
                   </AnimateOnScroll>
                   // Botão removido daqui
                </div> 
                */}
            </div>
        </section>
    );
}