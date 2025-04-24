"use client"; // <= Mantido client por causa do botão

import React from "react";
// import Link from "next/link";
import { cn } from "@/lib/utils";
// import ShineBorder from "@/components/magicui/shine-border";
// import { ArrowRight, Zap } from "lucide-react";
import ShinyButton02 from "@/components/magicui/shiny-button-02";
import AnimateOnScroll from '@/components/utils/AnimateOnScroll';

// REMOVIDO: Hook e lógica de animação interna

export default function FinalCtaSection() {

    return (
        <section
            id="cta-final"
            className="relative w-full overflow-hidden bg-gradient-to-tr from-primary/10 via-background to-accent/10 py-20 dark:from-primary/20 dark:via-background dark:to-accent/20 md:py-28 lg:py-32"
        >
            {/* Background */}
            <div className="absolute inset-0 z-[-1] opacity-15 dark:opacity-20">
                <div className="pointer-events-none absolute -bottom-1/4 -left-1/4 h-2/3 w-2/3 transform-gpu rotate-12 rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.5),_transparent_60%)] blur-3xl" />
                <div className="pointer-events-none absolute -top-1/4 -right-1/4 h-1/2 w-1/2 transform-gpu -rotate-12 rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.6),_transparent_70%)] blur-3xl opacity-70" />
            </div>

            {/* Container centralizado - ADICIONADO mx-auto */}
            <div
                className={cn(
                  "container mx-auto flex max-w-2xl flex-col items-center gap-6 px-5 text-center" // <<< mx-auto adicionado
                )}
            >
                {/* Título Impactante */}
                <AnimateOnScroll delay={0.1}>
                    <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"> {/* Adicionado text-balance */}
                        ÚLTIMA CHANCE <br className="sm:hidden" /> para <span className="text-primary">Mudar Tudo</span> HOJE!
                    </h2>
                </AnimateOnScroll>

                {/* Texto de Reforço */}
                <AnimateOnScroll delay={0.2}>
                    <p className="max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7"> {/* Adicionado text-balance */}
                        Você já viu como a IA pode ser a virada de chave. O Método te entrega o plano, os prompts, os bônus e a garantia. Milhares já saíram do vermelho. <span className="font-medium text-foreground">Você tá esperando o quê?</span>
                    </p>
                </AnimateOnScroll>

                {/* Botão CTA Final */}
                <AnimateOnScroll delay={0.3}>
                    <ShinyButton02 text="Quero a IA Anti-dívidas" />
                </AnimateOnScroll>

                {/* Texto Final Abaixo do Botão */}
                <AnimateOnScroll delay={0.4}>
                    <p className="pt-2 text-balance text-base text-muted-foreground"> {/* Adicionado text-balance */}
                        Não é só sobre pagar contas — é sobre viver sem peso e ter <span className="font-semibold text-primary">liberdade de verdade</span>.
                    </p>
                </AnimateOnScroll>

            </div> {/* Fim do container principal */}
        </section>
    );
}