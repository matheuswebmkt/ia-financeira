import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    // Div principal que ocupa a altura da tela (menos a navbar)
    // Adicionado justify-center para alinhar verticalmente
    <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center py-20 px-6"> {/* <<< justify-center adicionado */}
      
      {/* Container do conteúdo - removemos o margin-top para permitir a centralização */}
      {/* <div className="md:mt-6 flex items-center justify-center">  <= Comentado/Removido md:mt-6 */}
      <div className="flex items-center justify-center"> {/* Mantém o flex center para segurança */}
        
        {/* Conteúdo textual e botões */}
        <div className="max-w-2xl text-center"> {/* Limita a largura máxima do conteúdo */}
          
          {/* Badge */}
          <Badge className="rounded-full border-none bg-primary py-1"> {/* Simplificado as classes */}
            v1.0.0 is available now! 🚀
          </Badge>
          
          {/* Título */}
          <h1 className="mt-6 max-w-[20ch] text-balance text-3xl font-bold !leading-[1.2] tracking-tight xs:text-4xl sm:text-5xl md:text-6xl"> {/* Adicionado text-balance */}
            Customized Shadcn UI Blocks & Components
          </h1>
          
          {/* Parágrafo */}
          <p className="mt-6 max-w-[60ch] text-balance xs:text-lg"> {/* Adicionado text-balance */}
            Explore a collection of Shadcn UI blocks and components, ready to
            preview and copy. Streamline your development workflow with
            easy-to-implement examples.
          </p>
          
          {/* Container dos Botões */}
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="w-full rounded-full text-base sm:w-auto"
            >
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-full text-base shadow-none sm:w-auto"
            >
              <CirclePlay className="!h-5 !w-5" /> Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;