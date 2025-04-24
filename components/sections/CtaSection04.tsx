"use client"; // <= NECESSÁRIO porque usa ShinyButton02 diretamente

import React from "react";
import ShinyButton02 from "../magicui/shiny-button-02"; // Verifique se o caminho está correto
import AnimateOnScroll from "../utils/AnimateOnScroll"; // Importa o wrapper de animação
import { cn } from "@/lib/utils"; // Importa cn para classes
import { RefreshCw } from "lucide-react";

export default function Ctasection04() {
  return (
    // Usa <section> e adiciona padding, ID opcional e um fundo
    <section
      id="cta-principal" // ID para possível navegação
      className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-muted/20 via-background to-muted/20" // Exemplo de fundo sutil
    >
      {/* Container para centralizar conteúdo e limitar largura */}
      <div className="container mx-auto flex max-w-2xl flex-col items-center gap-6 px-5 text-center">

        {/* Primeiro Parágrafo */}
        <AnimateOnScroll delay={0.1}>
          {/* Aplica estilos de texto e remove código de animação antigo */}
          <h4 className={cn("flex items-center gap-2 text-lg font-semibold text-foreground")}>
            <RefreshCw className="h-5 w-5 animate-spin text-primary [animation-duration:3s]" aria-hidden="true"/>
          + Acesso Vitalício às Atualizações <span aria-label="Rosto chocado" role="img">😱</span>
          </h4>
        </AnimateOnScroll>

        {/* Segundo Parágrafo */}
        <AnimateOnScroll delay={0.2}>
           {/* Aplica estilos de texto e remove código de animação antigo */}
          <p className={cn("text-base leading-relaxed text-muted-foreground")}>
          Esses bônus, sozinhos, já valem mais que o preço do método completo. E você leva <span className="font-semibold text-foreground">TUDO</span> isso hoje.
          </p>
        </AnimateOnScroll>

        {/* Botão */}
        <AnimateOnScroll delay={0.3}>
           {/* Renderiza o ShinyButton02 com o texto desejado */}
           <ShinyButton02 text="QUERO VIVER ISSO AGORA" />
        </AnimateOnScroll>

      </div>
    </section>
  );
}