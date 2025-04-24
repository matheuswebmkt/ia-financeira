// components/frontpage/hero.tsx 
// (Pode continuar como Server Component - sem "use client")

import { cn } from "@/lib/utils";
import React from "react";
import HeroButtonClient from "@/components/frontpage/HeroButtonClient"; // Importa o componente do botão

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col overflow-hidden pb-20 pt-12 md:pb-32 md:pt-24"
    >
      {/* Container central - ADICIONADO mx-auto */}
      <div className={cn(
        "container flex max-w-[64rem] flex-col items-center gap-4 px-5 text-center",
        "mx-auto" // <<< ADICIONE ESTA CLASSE AQUI
      )}>
        {/* Tagline */}
        <div>
          <div className="relative inline-block overflow-hidden rounded-full border border-border/20 bg-muted/90 px-5 py-2 text-sm font-medium shadow-sm light-sweep">
            Adeus dívidas. Olá liberdade.
          </div>
        </div>

        {/* Headline principal */}
        <h1 className="text-balance text-left text-[2rem] font-bold leading-[1.2] tracking-tight text-foreground sm:text-center sm:text-4xl md:text-5xl lg:text-6xl">
          O fim das dívidas começa AGORA, com a IA fazendo por você.
        </h1>

        {/* Subheadline */}
        <p className="max-w-[42rem] text-balance text-left text-base leading-relaxed text-muted-foreground sm:text-center sm:text-xl sm:leading-8">
          Use a inteligência artificial pra sair do vermelho com um plano de ação que funciona até mesmo no seu pior dia do mês.
        </p>

        {/* Renderiza o componente Client que contém o botão */}
        <HeroButtonClient />

      </div>
    </section>
  );
}