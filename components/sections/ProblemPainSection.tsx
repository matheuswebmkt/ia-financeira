// REMOVIDO: "use client"; // <= Pode ser Server Component

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border";
import {
  HeartPulse,
  TrendingDown,
  Flame,
  MessageSquareWarning,
  EyeOff,
  Lock,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import ShinyButton02 from "@/components/magicui/shiny-button-02"; // Removido - Não utilizado
import AnimateOnScroll from '@/components/utils/AnimateOnScroll'; // Importa o componente de animação

// --- Tipagem e Dados (Mantidos) ---
interface PainPoint {
  text: string;
  icon: LucideIcon;
}
const painPoints: PainPoint[] = [
    { text: "Torna-se refém e presa fácil para o sistema financeiro.", icon: Lock },
    { text: "Sente um peso no peito todo início de mês só de pensar nas contas.", icon: HeartPulse },
    { text: "Vive apagando incêndio, empurrando dívida com dívida.", icon: Flame },
    { text: "Tenta controlar o dinheiro, mas sempre volta pro mesmo buraco.", icon: TrendingDown },
    { text: "Não sabe por onde começar e sente vergonha até de pedir ajuda.", icon: MessageSquareWarning },
    { text: "Desistiu de entender “finanças” porque parece complicado demais.", icon: EyeOff },
];

// REMOVIDO: Hook useIntersectionObserver daqui

// --- Componente Refatorado (Server Component) ---
export default function ProblemPainSection() {
  // REMOVIDO: Logica de state/ref/effect de animação

  return (
    <section
      id="dor-identificacao" // Manter ID se usado para navegação
      className="relative w-full overflow-hidden py-16 md:py-20 lg:py-24"
    >
      {/* Fundo sutil - Mantido */}
      <div className="absolute inset-0 z-[-1] opacity-15 dark:opacity-20">
        <div className="absolute -bottom-1/4 -left-1/4 h-2/3 w-2/3 transform-gpu rotate-12 rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.5),_transparent_60%)] pointer-events-none blur-3xl" />
        <div className="absolute -top-1/4 -right-1/4 h-1/2 w-1/2 transform-gpu -rotate-12 rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.6),_transparent_70%)] pointer-events-none blur-3xl opacity-70" />
      </div>

      {/* Container */}
      <div className="container space-y-16 px-5 md:space-y-20">

        {/* Título/Subtítulo */}
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
          <AnimateOnScroll delay={0}>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Um vilão <span className="text-primary">impiedoso</span>
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
              Você já sabe como é: O salário cai. A dívida engole.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Grid principal */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">

          {/* Imagem */}
          <AnimateOnScroll delay={0}>
            <ShineBorder
              className="relative group block aspect-video w-full overflow-hidden rounded-xl border border-border/15 bg-background shadow-lg"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              borderWidth={1}
              duration={8}
              borderRadius={16}
            >
              <div className="relative aspect-video h-full w-full overflow-hidden rounded-xl">
                <div className="h-full w-full overflow-hidden">
                  <Image
                    src="/image/vilao_photo.webp"
                    alt="Robô ameaçador representando o sistema financeiro"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-xl object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Overlays */}
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/15 via-transparent to-black/5" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 animate-pulse rounded-full bg-[#FE8FB5] opacity-20 blur-2xl" />
                <div className="pointer-events-none absolute inset-0 z-10 rounded-xl shimmer-overlay" />
              </div>
            </ShineBorder>
          </AnimateOnScroll>

          {/* Texto */}
          <AnimateOnScroll delay={0.1} className="flex flex-col gap-4">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
              O banco oferece "ajuda",
              <span className="font-medium text-foreground"> mas empurra mais juros.</span>
              — criando um labirinto financeiro sem fim e sem saída.
            </p>
            <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground">
              A cada mês, você corre — mas o vermelho corre mais rápido.
            </blockquote>
            <p className="mt-2 text-base font-medium text-foreground/90">
              E no fim, sobra cansaço, cobrança e a sensação de estar desperdiçando a própria vida.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Consequências (Cards) */}
        <div className="mx-auto max-w-5xl space-y-6">
          <AnimateOnScroll delay={0}>
            <h3 className="flex flex-wrap items-center justify-center gap-x-2 text-center text-2xl font-semibold text-foreground">
              <span>As consequências?</span>
              <span className="inline-block text-2xl" aria-hidden="true">😩</span>
            </h3>
          </AnimateOnScroll>

          {/* Cards mapeados */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {painPoints.map((point, index) => (
              <AnimateOnScroll
                key={point.text}
                delay={(index + 1) * 0.08} // Stagger dos cards
                className="h-full"
              >
                <Card
                  className={cn(
                    "h-full overflow-hidden pain-point-card", // Classe hover
                    "border border-border/15 bg-card dark:bg-zinc-900",
                    "dark:hover:bg-zinc-800 transition-colors duration-200"
                  )}
                >
                  <CardContent className="p-5">
                    <div className="group flex items-center gap-3 icon-text-wrapper"> {/* group para hover interno */}
                      <point.icon
                        className="h-5 w-5 flex-shrink-0 text-primary transition-colors duration-200 group-hover:text-foreground"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <p className="text-base leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                        {point.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}