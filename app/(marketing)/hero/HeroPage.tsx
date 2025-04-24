// src/app/(marketing)/hero/HeroSection.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";
import ShinyButton02 from "@/components/magicui/shiny-button-02";

export default function HeroSection() {
  return (
    <section
      // **** ALTERAÇÃO AQUI: Adicionado min-h-screen ****
      className="relative flex w-full flex-col min-h-screen overflow-hidden pt-12 md:pt-24 pb-20 md:pb-32"
    >
      {/* Container central */}
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center px-5">
        {/* Tagline */}
        <div>
          <div className="relative inline-block overflow-hidden rounded-full border border-border/20 bg-muted/90 px-5 py-2 text-sm font-medium shadow-sm light-sweep">
            Adeus dívidas. Olá liberdade.
          </div>
        </div>

        {/* Headline principal SEM animação nem Sparkles */}
        <h1 className="text-left sm:text-center text-[2rem] leading-[1.2] font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
        O fim das dívidas começa AGORA, com a IA fazendo por você.
        </h1>

        {/* Subheadline */}
        <p className="text-left sm:text-center max-w-[42rem] text-base leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
        Use a inteligência artificial pra sair do vermelho com um plano de ação que funciona até mesmo no seu pior dia do mês.
        </p>

        {/* Botão CTA */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <ShinyButton02 text="Quero a IA Anti-dívidas" />
        </div>
      </div>
    </section>
  );
}