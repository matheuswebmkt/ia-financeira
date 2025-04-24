"use client"; // <= NECESSÁRIO porque usa o componente Accordion da Shadcn/UI

import React from "react"; // Não precisa mais de hooks de animação (useEffect, useRef, useState)
import { cn } from "@/lib/utils";
// import { HelpCircle, LucideIcon } from "lucide-react"; // Removido se não usado
// Componentes do Accordion Shadcn UI Mantidos
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimateOnScroll from '@/components/utils/AnimateOnScroll'; // Importa wrapper de animação

// REMOVIDO: Hook useIntersectionObserver daqui

// --- Tipagem e Dados (Mantidos) ---
interface FaqItem {
    question: string;
    answer: string;
}
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

// --- Componente Refatorado (Client Component devido ao Accordion) ---
export default function FaqSection() {
    // REMOVIDO: Logica de state/ref/effect de animação
    // REMOVIDO: calculateDelay

    return (
        <section
            id="faq" // Manter ID
            className="relative w-full overflow-hidden bg-background py-16 md:py-20 lg:py-24"
        >
            {/* Background */}
            <div className="absolute inset-0 z-[-1] opacity-5 dark:opacity-[0.04]">
                <div className="pointer-events-none absolute top-10 left-10 h-1/3 w-1/3 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.3),_transparent_70%)] blur-3xl" />
                <div className="pointer-events-none absolute bottom-10 right-10 h-1/3 w-1/3 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.4),_transparent_80%)] blur-3xl" />
            </div>

            {/* Container principal */}
            <div className="container space-y-10 px-5 md:space-y-12">

                {/* 1. Bloco Título */}
                <div className="mx-auto flex max-w-2xl flex-col items-center space-y-3 text-center">
                    <AnimateOnScroll delay={0}>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            Perguntas Frequentes
                        </h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={0.1}>
                        <p className="max-w-xl leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                            Respostas para as dúvidas mais comuns – para você tomar a decisão com 100% de clareza.
                        </p>
                    </AnimateOnScroll>
                </div>

                {/* 2. Bloco do Accordion */}
                {/* Envolve o Accordion inteiro com AnimateOnScroll */}
                <AnimateOnScroll delay={0.2} className="mx-auto w-full max-w-3xl">
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            // NÃO anima os itens internos para não quebrar o Accordion
                            <AccordionItem key={item.question} value={`item-${index + 1}`}>
                                <AccordionTrigger className="text-left text-base hover:no-underline sm:text-lg">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </AnimateOnScroll>

                {/* 3. CTA Final Opcional (Removido) */}

            </div> {/* Fim do container principal */}
        </section>
    );
}