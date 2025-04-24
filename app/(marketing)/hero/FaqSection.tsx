// src/app/(marketing)/hero/FaqSection.tsx ok
"use client";

import React, { useEffect, useRef, useState } from "react"; // Hooks React
import { cn } from "@/lib/utils";
import { HelpCircle, LucideIcon } from "lucide-react"; // Mantido
// Componentes do Accordion Shadcn UI Mantidos
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      threshold: 0.05, // Threshold original da seção
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

// --- Animation Variants --- REMOVIDAS

// --- Tipagem para FAQ Data --- (MANTIDA)
interface FaqItem {
    question: string;
    answer: string;
}

// --- FAQ Data --- (MANTIDO)
const faqItems: FaqItem[] = [
  { question: "Como receberei o material?", answer: "Imediatamente após a confirmação da compra, você recebe um e-mail com o link para acessar todo o material do Método IA Anti-Dívidas e os bônus. Simples, rápido e direto." },
  { question: "Eu preciso pagar por alguma ferramenta de IA pra usar o método?", answer: "Não! O método foi desenhado para usar ferramentas de Inteligência Artificial amplamente disponíveis e gratuitas. Você não terá nenhum custo adicional com ferramentas para aplicar o que aprender." },
  { question: "Esse método serve pra qualquer tipo de dívida?", answer: "Sim! Seja dívida de cartão de crédito, cheque especial, empréstimos pessoais, financiamentos ou outras contas atrasadas, as estratégias e os prompts podem ser adaptados para te ajudar a analisar, negociar e criar um plano de quitação para sua situação específica." },
  { question: "Preciso entender de tecnologia ou saber usar IA?", answer: "De forma alguma! O método é passo a passo, com comandos (prompts) prontos para você copiar e colar. Mesmo que você nunca tenha interagido com uma IA antes, conseguirá seguir as instruções facilmente." },
  { question: "E se eu não gostar?", answer: "Risco zero pra você! Oferecemos uma garantia incondicional de 7 dias. Se dentro desse período você sentir que o método não atendeu às suas expectativas, basta pedir reembolso e receberá 100% do seu investimento de volta, sem perguntas." },
  { question: "Dá pra aplicar mesmo tendo salário baixo?", answer: "Com certeza! O método não depende de quanto você ganha, mas sim de como você usa a inteligência (sua e da IA) para gerenciar o que você tem. Ele te ajuda a otimizar seus recursos, negociar dívidas e encontrar formas de renda extra adaptadas à sua realidade." },
  { question: "Por quanto tempo terei acesso ao material após a compra?", answer: "O acesso é vitalício! Isso inclui o eBook principal, todos os bônus e quaisquer atualizações futuras que fizermos no material. Você paga uma vez e tem acesso para sempre." },
  { question: "Quanto tempo leva para começar a ver resultados?", answer: "Isso varia de pessoa para pessoa e do quanto você se dedica a aplicar o método. Muitos alunos relatam sentir um alívio e clareza imediatos ao criar o primeiro plano com a IA. Resultados concretos na redução de dívidas podem começar a aparecer nos primeiros 30 dias de aplicação consistente." },
  { question: "Por que é tão barato?", answer: "Nosso objetivo é democratizar o acesso à inteligência financeira estratégica usando a IA. Queremos que o máximo de pessoas possa sair do ciclo de dívidas. O preço baixo é para remover qualquer barreira e garantir que esta solução poderosa seja acessível a quem mais precisa." },
];

// --- Componente Otimizado ---
export default function FaqSection() {

    // Hooks de observação
    const [titleRef, isTitleVisible] = useIntersectionObserver();
    const [accordionRef, isAccordionVisible] = useIntersectionObserver();

    const calculateDelay = (index: number, baseDelay = 0.1) => `${index * baseDelay}s`;

  return (
    // Seção principal - removido motion e props
    <section
      id="faq"
      className="w-full py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden"
      // variants, initial, whileInView, viewport REMOVIDOS
    >
      {/* Background sutil - Mantido */}
      <div className="absolute inset-0 z-[-1] opacity-5 dark:opacity-[0.04]">
         <div className="absolute top-10 left-10 w-1/3 h-1/3 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.3),_transparent_70%)] pointer-events-none blur-3xl transform-gpu" />
         <div className="absolute bottom-10 right-10 w-1/3 h-1/3 bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.4),_transparent_80%)] pointer-events-none blur-3xl transform-gpu" />
       </div>

      {/* Container principal - removido motion e props */}
      <div
        className="container px-5 space-y-10 md:space-y-12"
        // variants REMOVIDO
      >
        {/* 1. Bloco Título (Observado) */}
        <div
          ref={titleRef}
          className="mx-auto flex max-w-2xl flex-col items-center space-y-3 text-center"
        >
          <h2
            className={cn(
              "text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl",
              "animate-on-scroll", isTitleVisible && "is-visible"
            )}
            style={{ transitionDelay: calculateDelay(0) }}
            // variants REMOVIDO
          >
            Perguntas Frequentes
          </h2>
          <p
            className={cn(
              "max-w-xl leading-normal text-muted-foreground sm:text-lg sm:leading-7",
              "animate-on-scroll", isTitleVisible && "is-visible"
            )}
            style={{ transitionDelay: calculateDelay(1) }}
            // variants REMOVIDO
          >
            Respostas para as dúvidas mais comuns – para você tomar a decisão com 100% de clareza.
          </p>
        </div>

        {/* 2. Bloco do Accordion (Observado como unidade) */}
        <div
            ref={accordionRef}
            className={cn(
              "mx-auto max-w-3xl w-full",
              "animate-on-scroll", isAccordionVisible && "is-visible"
            )}
            // variants REMOVIDO
        >
            {/* Componente Accordion da Shadcn UI MANTIDO INTACTO */}
            <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    // Não há animação interna nos itens do accordion para não interferir
                    // na funcionalidade de abrir/fechar do Shadcn UI.
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger className="text-left text-base sm:text-lg hover:no-underline">
                             {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                             {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>

        {/* 3. CTA Final Opcional (Mantido comentado) */}
        {/* ... */}

      </div> {/* Fim do container principal */}
    </section>
  );
}