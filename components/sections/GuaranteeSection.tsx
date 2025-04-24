// REMOVIDO: "use client"; // <= Pode ser Server Component

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShieldCheck, Lock, CheckCircle, LucideIcon } from "lucide-react";
import AnimateOnScroll from '@/components/utils/AnimateOnScroll'; // Importa wrapper

// REMOVIDO: Hook useIntersectionObserver daqui

// --- Tipagem e Dados (Mantidos) ---
interface ConfidenceBadge {
    text: string;
    icon: LucideIcon;
}
const confidenceBadges: ConfidenceBadge[] = [
    { text: "Compra 100% Segura", icon: Lock },
    { text: "Privacidade Garantida", icon: ShieldCheck },
    { text: "Satisfação ou Reembolso", icon: CheckCircle },
];

// --- Componente Refatorado (Server Component) ---
export default function GuaranteeSection() {
    // REMOVIDO: Lógica de animação
    // REMOVIDO: calculateDelay

    return (
        <section
            id="garantia" // Manter ID
            className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 dark:from-blue-950/30 dark:via-background dark:to-green-950/20 md:py-20 lg:py-24"
        >
            {/* Background */}
            <div className="absolute inset-0 z-[-1] opacity-20 mix-blend-multiply dark:opacity-15 dark:mix-blend-screen">
                <div className="pointer-events-none absolute -top-1/4 left-1/4 h-1/2 w-1/2 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.1),_transparent_70%)] blur-2xl" />
                <ShieldCheck className="absolute bottom-10 right-10 h-40 w-40 rotate-12 transform-gpu text-primary/5 dark:text-primary/10" aria-hidden="true"/>
            </div>

            {/* Container principal */}
            <div className="container mx-auto flex max-w-3xl flex-col items-center gap-8 px-5 text-center md:gap-10">

                {/* Bloco de Texto 1 (Título e Parágrafo) */}
                {/* Envolve o bloco inteiro */}
                <AnimateOnScroll delay={0} className="flex flex-col items-center gap-4">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        Você não tem <span className="text-primary">NADA</span> a perder. <span className="text-primary">ZERO</span> riscos!
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                        Acreditamos tanto no Método IA Anti-Dívidas que te damos uma <span className="font-semibold text-foreground">garantia incondicional de 7 dias</span>. Se por qualquer motivo você achar que o método não é pra você, é só pedir seu dinheiro de volta. Sem perguntas, sem burocracia.
                    </p>
                </AnimateOnScroll>

                {/* Selo de Garantia */}
                <AnimateOnScroll
                    delay={0.1} // Delay após o texto
                    className={cn(
                        "relative my-4", // Margem vertical
                        "transition-transform duration-200 ease-out hover:scale-105" // Hover
                    )}
                >
                    {/* Glow pulsante mantido */}
                    <div className="absolute inset-[-5px] animate-pulse rounded-full bg-green-400/30 blur-lg duration-1000 delay-500 dark:bg-green-500/20" aria-hidden="true" />
                    {/* Imagem do selo mantida */}
                    <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg dark:border-green-700 dark:from-green-900/50 dark:to-emerald-950/50 sm:h-48 sm:w-48">
                        <Image
                            src="/image/garantia-7-dias.webp"
                            alt="Selo de Garantia Incondicional de 7 Dias" // Alt text melhorado
                            width={150} // Tamanho base
                            height={150}
                            className="object-contain" // Não distorcer
                            loading="lazy"
                        />
                    </div>
                </AnimateOnScroll>

                {/* Texto Final */}
                <AnimateOnScroll delay={0.2}> {/* Delay após o selo */}
                    <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                        Você tem <span className="font-semibold text-foreground">7 dias</span> para testar todo o material. Ou você ama e transforma sua vida financeira... ou não paga nada. Simples assim. Você não tem nada a perder (exceto as dívidas 😉).
                    </p>
                </AnimateOnScroll>

                {/* Badges de Confiança */}
                {/* Envolve o container dos badges */}
                <AnimateOnScroll delay={0.3} className="w-full pt-6"> {/* Delay após o texto final */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {confidenceBadges.map((badge, index) => (
                            <AnimateOnScroll
                                key={badge.text} // Usar texto como key
                                delay={index * 0.08} // Stagger relativo dentro dos badges (começa após o delay do container)
                                className={cn(
                                    "relative overflow-hidden rounded-lg", // Wrapper
                                    "border border-border/15 bg-slate-100 dark:bg-zinc-800/50",
                                    "light-sweep light-mode-sweep", // Efeito
                                    "transition-all duration-150 hover:-translate-y-px hover:shadow-md" // Hover
                                )}
                            >
                                {/* Estrutura interna mantida, padding no wrapper */}
                                <div className="relative z-[2] flex items-center justify-center gap-2 px-4 py-3">
                                    <badge.icon className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true"/>
                                    <span className="text-sm font-medium text-muted-foreground">{badge.text}</span> {/* Ajustado tamanho da fonte */}
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </AnimateOnScroll>

            </div> {/* Fim do container principal */}
        </section>
    );
}