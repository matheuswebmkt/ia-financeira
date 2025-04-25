// components/frontpage/hero.tsx 

import React from "react";
import { cn } from "@/lib/utils"; // Mantido caso use cn em outro lugar ou futuramente
import HeroButtonClient from "@/components/frontpage/HeroButtonClient"; 

const Hero = () => {
  return (
    // Div principal: REMOVIDO justify-center, adicionado padding-top responsivo
    <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center px-6 pb-20 pt-16 md:pt-20"> 
    {/*                                                                      ^^^^^^^^^^^^^^^  <<<<< AJUSTE AQUI */}
    {/* pt-16 = Mobile (64px) | md:pt-20 = Desktop (80px) */}
    {/* Para SUBIR no mobile, diminua pt-16 (ex: pt-12) */}
    {/* Para AJUSTAR no desktop, mude md:pt-20 (ex: md:pt-16 para subir, md:pt-28 para descer) ou remova md:pt-20 para usar o valor do mobile */}
      
      {/* Container do conteúdo */}
      <div>
        {/* Container para limitar largura e centralizar texto */}
        {/* Mantido max-w-5xl, ajuste se a largura ainda for um problema */}
        <div className="mx-auto max-w-5xl text-center"> 
          
          {/* Badge */}
          <div className="mb-6"> 
            <div className="relative inline-block overflow-hidden rounded-full border border-border/20 bg-muted/90 px-5 py-2 text-sm font-medium shadow-sm light-sweep">
              Adeus dívidas. Olá liberdade. 🚀
            </div>
          </div>

          {/* Título */}
          {/* max-w removido, largura controlada pelo pai max-w-5xl */}
          <h1 className={cn(
              "mt-6 text-balance text-3xl font-bold !leading-[1.2] tracking-tight", 
              "xs:text-4xl sm:text-5xl md:text-6xl"
              // Não precisa de max-w ou mx-auto aqui se o pai já é text-center e tem max-w
          )}>
            O fim das dívidas começa AGORA, com a IA fazendo por você.
          </h1>

          {/* Parágrafo */}
           {/* Mantido max-w no parágrafo para melhor legibilidade */}
          <p className={cn(
            "mt-6 text-balance xs:text-lg",
            "max-w-[60ch] mx-auto" 
          )}>
            A inteligência artificial tira você do vermelho com um plano de ação que funciona até mesmo no seu pior dia do mês.
          </p>

          {/* Botão */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <HeroButtonClient />
          </div>
        </div> {/* Fim do div com max-w-5xl */}
      </div>
    </div>
  );
};

export default Hero;