// components/frontpage/hero.tsx 

import { Badge } from "@/components/ui/badge";
import React from "react";
import { cn } from "@/lib/utils";
import HeroButtonClient from "@/components/frontpage/HeroButtonClient"; 

const Hero = () => {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-6 py-20">
      {/* Container do conteúdo */}
      <div>
        {/* ESTE É O CONTAINER PAI DO H1 */}
        {/* A classe max-w-2xl aqui está limitando TUDO dentro dele, incluindo o h1 */}
        <div className="mx-auto max-w-5xl text-center"> 
          {/* Badge */}
          <div className="mb-6"> 
            <div className="relative inline-block overflow-hidden rounded-full border border-border/20 bg-muted/90 px-5 py-2 text-sm font-medium shadow-sm light-sweep">
              Adeus dívidas. Olá liberdade. 🚀
            </div>
          </div>

          {/* Título */}
          {/* Removendo max-w daqui, pois o pai controla */}
          <h1 className={cn(
              "mt-6 text-balance text-3xl font-bold !leading-[1.2] tracking-tight", 
              "xs:text-4xl sm:text-5xl md:text-6xl",
              // "max-w-[20ch] mx-auto", // << REMOVIDO daqui
              // "md:max-w-none" // << REMOVIDO daqui
          )}>
            O fim das dívidas começa AGORA, com a IA fazendo por você.
          </h1>

          {/* Parágrafo */}
           {/* Removendo max-w daqui também, se quiser que o pai controle */}
          <p className={cn(
            "mt-6 text-balance xs:text-lg",
            "max-w-[60ch] mx-auto" // Pode manter ou remover dependendo do design
          )}>
            A inteligência artificial tira você do vermelho com um plano de ação que funciona até mesmo no seu pior dia do mês.
          </p>

          {/* Botão */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <HeroButtonClient />
          </div>
        </div> {/* Fim do div com max-w-2xl */}
      </div>
    </div>
  );
};

export default Hero;