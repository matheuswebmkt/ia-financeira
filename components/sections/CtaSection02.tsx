"use client"; // <= NECESSÁRIO porque usa ShinyButton02 diretamente

import React from "react";
import ShinyButton02 from "../magicui/shiny-button-02"; // Verifique se o caminho está correto
import AnimateOnScroll from "../utils/AnimateOnScroll"; // Importa o wrapper de animação
import { cn } from "@/lib/utils"; // Importa cn para classes

export default function Ctasection02() {
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
          <h4 className={cn("text-lg font-semibold leading-relaxed text-foreground")}>
          Você vai finalmente sentir o controle voltar, e quando isso acontece...
          </h4>
        </AnimateOnScroll>

        {/* Segundo Parágrafo */}
        <AnimateOnScroll delay={0.2}>
           {/* Aplica estilos de texto e remove código de animação antigo */}
          <p className={cn("text-base leading-relaxed text-muted-foreground")}>
          ninguém mais te segura.
          </p>
        </AnimateOnScroll>

        {/* Botão */}
        <AnimateOnScroll delay={0.3}>
           {/* Renderiza o ShinyButton02 com o texto desejado */}
           <ShinyButton02 text="ASSUMIR MEU CONTROLE" />
        </AnimateOnScroll>

      </div>
    </section>
  );
}