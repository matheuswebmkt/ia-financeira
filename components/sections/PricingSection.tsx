"use client"; // <= Mantido client

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CheckCircle, Gift, BookOpen, RefreshCw, Zap, ShieldHalf, Award, Target, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ShinyButton02 from "@/components/magicui/shiny-button-02";
import TrackViewContent from '@/components/TrackViewContent';
import AnimateOnScroll from '@/components/utils/AnimateOnScroll';

interface IncludedItem { name: string; icon: LucideIcon; }
const includedItems: IncludedItem[] = [
    { name: "IA que pensa por você", icon: BookOpen },
    { name: "+3 Bônus Transformadores", icon: Gift },
    { name: "Atualizações Vitalícias", icon: RefreshCw },
    { name: "Plano automático, sem enrolação", icon: CheckCircle },
    { name: "Script pronto pra sair do vermelho", icon: Zap },
    { name: "Estratégias Anti-Gatilho", icon: ShieldHalf },
    { name: "Plano de Ação 15 Dias", icon: Target },
    { name: "Vantagem em 99% das dívidas", icon: Award },
];

export default function PricingSection() {
    const productDataForViewContent = { /* ... dados ... */ };

    return (
        <section
            id="valor"
            // Aplicando container, max-width, centralização (mx-auto), e padding/gap aqui
            className={cn(
                "container relative mx-auto flex flex-col gap-8 overflow-hidden", // <<< mx-auto adicionado
                "py-12 px-5 md:max-w-[64rem] md:py-16 lg:py-20" // Padding e max-width mantidos
             )}
        >
            {/* Componente de Rastreamento */}
            <TrackViewContent eventData={productDataForViewContent} />

            {/* Background */}
            <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-[0.07]">
                <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-1/3 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.4),_transparent_70%)] blur-3xl opacity-60" />
                <div className="pointer-events-none absolute top-0 right-0 h-1/2 w-1/3 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.5),_transparent_80%)] blur-3xl opacity-50" />
            </div>

            {/* 1. Título */}
            {/* mx-auto aqui talvez seja redundante se a section já centraliza, mas não prejudica */}
            <div className="mx-auto flex w-full flex-col items-center gap-3 text-center md:max-w-[58rem]">
                <AnimateOnScroll delay={0}>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        O jogo virou ao seu favor, você está no controle.
                    </h2>
                </AnimateOnScroll>
            </div>

            {/* Bloco "O que você leva" */}
             {/* mx-auto aqui talvez seja redundante, mas não prejudica */}
            <div className="mx-auto max-w-5xl space-y-6 pt-8 text-center md:pt-10">
                <AnimateOnScroll delay={0}>
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                        Você está levando agora:
                    </h3>
                </AnimateOnScroll>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
                    {includedItems.map((item, index) => (
                        <AnimateOnScroll
                            key={item.name}
                            delay={(index + 1) * 0.05}
                            className="transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
                        >
                            <Card className="relative h-full overflow-hidden border border-border/10 bg-card p-4 shadow-sm dark:bg-zinc-900/70 backdrop-blur-sm light-sweep light-mode-sweep">
                                <CardContent className="relative z-[2] flex flex-col items-center gap-2 p-0 text-center">
                                    <item.icon className="mb-1 h-6 w-6 text-primary" aria-hidden="true" />
                                    <p className="text-sm font-medium leading-snug text-muted-foreground">{item.name}</p>
                                </CardContent>
                            </Card>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>

            {/* Card Principal da Oferta */}
            {/* w-full aqui é importante para o AnimateOnScroll ocupar a largura */}
            <AnimateOnScroll delay={0} className="w-full">
                <div
                    className="relative grid grid-cols-1 gap-8 overflow-hidden rounded-xl border bg-white p-8 shadow-sm dark:bg-zinc-900/80 md:grid-cols-2 md:p-10 light-sweep light-mode-sweep"
                >
                    {/* COLUNA ESQUERDA */}
                    <div className="flex flex-col items-center justify-center gap-6 text-center">
                         {/* ... conteúdo coluna esquerda ... */}
                         <div className="flex items-center justify-center gap-2">
                            <p className="text-sm uppercase tracking-wider text-muted-foreground">Valor Total Estimado</p>
                            <p className="text-lg font-semibold text-muted-foreground line-through">R$ 147+</p>
                        </div>
                        <div className="w-full max-w-sm">
                            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted/30">
                                <Image src="/image/Imagem-para-card-de-price.webp" alt="Mockup da Oferta IA Anti-Dívidas com bônus" fill sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 30vw" className="object-cover" loading="lazy"/>
                            </div>
                        </div>
                    </div>
                    {/* COLUNA DIREITA */}
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                         {/* ... conteúdo coluna direita ... */}
                         <div className="flex flex-col items-center gap-2 text-center">
                            <p className="text-sm text-muted-foreground">Oferta exclusiva por apenas 2x de:</p>
                            <div className="flex items-end justify-center gap-1">
                                <span className="text-6xl font-extrabold leading-none text-foreground">R$ 5</span>
                                <span className="text-4xl font-bold text-foreground">,54</span>
                            </div>
                            <p className="text-sm text-muted-foreground">ou pagamento único de R$ 9,90</p>
                        </div>
                        <div><ShinyButton02 text="Quero a IA Anti-dívidas" /></div>
                        <div className="mt-2">
                            <Image src="/image/selos de garantia PRETO 03 - compacto.webp" alt="Selos de Garantia" width={220} height={50} className="hidden object-contain dark:hidden" loading="lazy"/>
                            <Image src="/image/selos de garantia CLARO.webp" alt="Selos de Garantia" width={220} height={50} className="hidden object-contain dark:block" loading="lazy"/>
                        </div>
                    </div>
                </div>
            </AnimateOnScroll>

            {/* Bloco Final */}
            {/* mx-auto aqui talvez seja redundante */}
            <div className="mx-auto max-w-xl space-y-2 pt-8 text-center">
                <AnimateOnScroll delay={0}>
                    <h4 className="text-lg font-semibold tracking-wider text-foreground">
                        Absurdamente barato pra quem quer resultado. Você acessa agora e ativa a IA Anti-dívidas imediatamente.
                    </h4>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.1}>
                    <p className="text-sm text-muted-foreground">
                        Isso por menos do que você gasta em besteira no mercado.
                    </p>
                </AnimateOnScroll>
            </div>
        </section>
    );
}