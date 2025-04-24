// src/app/(marketing)/hero/PricingSection.tsx ok
"use client";

// --- Imports ---
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
// Framer Motion REMOVIDO
import { CheckCircle, Gift, BookOpen, RefreshCw, Zap, ShieldHalf, Award, Target, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ShinyButton02 from "@/components/magicui/shiny-button-02";
import TrackViewContent from '@/components/TrackViewContent';
import { SparklesText } from "@/components/magicui/sparkles-text";

// Hook customizado para Intersection Observer (importar ou definir aqui)
function useIntersectionObserver(options: IntersectionObserverInit = {}): [React.RefObject<any>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(element);
      }
    }, {
      threshold: 0.05,
      ...options,
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
}

// --- Declaração global do fbq --- (MANTIDA)
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

// --- Tipagem para Itens Incluídos --- (MANTIDA)
interface IncludedItem {
    name: string;
    icon: LucideIcon;
}

// --- Itens Incluídos --- (MANTIDO)
const includedItems: IncludedItem[] = [
    { name: "IA que pensa por você", icon: BookOpen },
    { name: "+3 Bônus Transformadores", icon: Gift },
    { name: "Atualizações Vitalícias", icon: RefreshCw },
    { name: "Plano automático, sem enrolação", icon: CheckCircle },
    { name: "Script pronto pra sair do vermelho", icon: Zap },
    { name: "Estratégias Anti-Gatilho", icon: ShieldHalf },
    { name: "Plano de Ação 15 Dias", icon: Target },
    { name: "Vantagem em 99% das dívidas", icon: Award },
];

// --- Componente PricingSection Otimizado e CORRIGIDO ---
export default function PricingSection() {

  const productDataForViewContent = {
    content_name: 'eBook IA Anti-Dívidas + Bônus',
    content_ids: ['IA_ANTI_DIVIDAS_EBOOK_01'],
    content_type: 'product',
    value: 9.90,
    currency: 'BRL',
  };

   const [titleRef, isTitleVisible] = useIntersectionObserver();
   const [includedItemsRef, isIncludedItemsVisible] = useIntersectionObserver();
   const [pricingCardRef, isPricingCardVisible] = useIntersectionObserver();
   const [finalTextRef, isFinalTextVisible] = useIntersectionObserver();

   const calculateDelay = (index: number, baseDelay = 0.1) => `${index * baseDelay}s`;

  return (
    <section
      id="valor"
      className="container px-5 flex flex-col gap-8 py-12 md:max-w-[64rem] md:py-16 lg:py-20 relative overflow-hidden"
    >
       <TrackViewContent eventData={productDataForViewContent} />
       <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-[0.07]">
         <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.4),_transparent_70%)] pointer-events-none blur-3xl transform-gpu opacity-60" />
         <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.5),_transparent_80%)] pointer-events-none blur-3xl transform-gpu opacity-50" />
       </div>

      {/* 1. Título/Subtítulo */}
      <div
        ref={titleRef}
        className="mx-auto flex w-full flex-col gap-3 md:max-w-[58rem] items-center text-center"
      >
        <h2
          className={cn(
            "text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl",
            "animate-on-scroll", isTitleVisible && "is-visible"
          )}
          style={{ transitionDelay: calculateDelay(0) }}
        >
          O jogo virou ao seu favor, você está no controle.
        </h2>
        
      </div>

      {/* Bloco "O que você leva" */}
      <div
            ref={includedItemsRef}
            className="mx-auto max-w-5xl text-center space-y-6 pt-8 md:pt-10"
        >
            <h3 className={cn(
                  "text-2xl font-semibold tracking-tight text-foreground",
                   "animate-on-scroll", isIncludedItemsVisible && "is-visible"
                )}
                style={{ transitionDelay: calculateDelay(0) }}
             >
                Você está levando agora:
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
                {includedItems.map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        "animate-on-scroll", isIncludedItemsVisible && "is-visible",
                        "transition-all duration-200 ease-out hover:shadow-md hover:-translate-y-1"
                      )}
                      style={{ transitionDelay: calculateDelay(index + 1, 0.05) }}
                    >
                         <Card className={cn(
                             "relative overflow-hidden h-full p-4",
                             "bg-card dark:bg-zinc-900/70 backdrop-blur-sm",
                             "border border-border/10 shadow-sm",
                             "light-sweep light-mode-sweep"
                          )}>
                             <CardContent className="p-0 flex flex-col items-center text-center gap-2 relative z-[2]">
                                 <item.icon className="h-6 w-6 text-primary mb-1" />
                                 <p className="text-sm font-medium text-muted-foreground leading-snug">{item.name}</p>
                             </CardContent>
                         </Card>
                    </div>
                ))}
            </div>
        </div>

      {/* Card Principal da Oferta */}
      <div
        ref={pricingCardRef}
        className={cn(
          "relative w-full rounded-xl border p-8 md:p-10 shadow-sm overflow-hidden",
          "grid grid-cols-1 md:grid-cols-2 gap-8",
          "bg-white dark:bg-zinc-900/80",
          "light-sweep light-mode-sweep",
          "animate-on-scroll", isPricingCardVisible && "is-visible"
        )}
      >
        {/* COLUNA ESQUERDA */}
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          {/* **** CORREÇÃO APLICADA AQUI **** */}
          {/* Restaurado o div com classes flex para manter na mesma linha */}
          <div className="flex items-center gap-2 justify-center">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">Valor Total Estimado</p>
            <p className="text-lg font-semibold text-muted-foreground line-through">R$ 147+</p>
          </div>
          {/* **** FIM DA CORREÇÃO **** */}
          <div className="w-full max-w-sm">
            <div className="aspect-video w-full bg-muted/30 rounded-md overflow-hidden">
              <Image src="/image/Imagem-para-card-de-price.webp" alt="Mockup Oferta IA Anti-Dívidas" width={400} height={225} style={{ borderRadius: 8 }} className="object-cover w-full h-full" loading="lazy" />
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA */}
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="flex flex-col items-center text-center gap-2">
            <p className="text-sm text-muted-foreground">Oferta exclusiva por apenas 2x de:</p>
            <div className="flex items-end gap-1 justify-center">
              <span className="text-6xl font-extrabold text-foreground leading-none">R$ 5</span>
              <span className="text-4xl font-bold text-foreground">,54</span>
            </div>
            <p className="text-sm text-muted-foreground">ou pagamento único de R$ 9,90</p>
          </div>
          <div>
            <ShinyButton02 text="Quero a IA Anti-dívidas" />
          </div>
          <div className="mt-2">
            <Image src="/image/selos de garantia PRETO 03 - compacto.webp" alt="Selos de Garantia (Light)" width={220} height={50} className="object-contain block dark:hidden" loading="lazy" />
            <Image src="/image/selos de garantia CLARO.webp" alt="Selos de Garantia (Dark)" width={220} height={50} className="object-contain hidden dark:block" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Bloco Final */}
      <div
            ref={finalTextRef}
            className="mx-auto max-w-xl text-center space-y-2 pt-8"
        >
             <h4 className={cn(
                    "text-lg font-semibold text-foreground tracking-wider",
                     "animate-on-scroll", isFinalTextVisible && "is-visible"
                  )}
                  style={{ transitionDelay: calculateDelay(0) }}
              >
                Absurdamente barato pra quem quer resultado. Você acessa agora e ativa a IA Anti-dívidas imediatamente.
            </h4>
            <p className={cn(
                  "text-sm text-muted-foreground",
                  "animate-on-scroll", isFinalTextVisible && "is-visible"
                )}
                style={{ transitionDelay: calculateDelay(1) }}
             >
                Isso por menos do que você gasta em besteira no mercado.
            </p>
        </div>
    </section>
  );
}