"use client"; // NECESSÁRIO porque usa useState

import React, { useState } from "react"; // Importa useState
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react"; // Ícone para indicar aberto/fechado

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

// --- Componente FAQ com Accordion Customizado ---
export default function FaqSection() {
    // Estado para controlar qual item está aberto. null = nenhum aberto.
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Função para alternar o estado de um item
    const handleToggle = (index: number) => {
        // Se o item clicado já está aberto, fecha ele (seta para null)
        // Se outro item está aberto ou nenhum está aberto, abre o item clicado (seta para o index)
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="faq"
            className="relative w-full overflow-hidden bg-background py-16 md:py-20 lg:py-24"
        >
            {/* Background (Mantido) */}
            <div className="absolute inset-0 z-[-1] opacity-5 dark:opacity-[0.04]">
                <div className="pointer-events-none absolute top-10 left-10 h-1/3 w-1/3 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.3),_transparent_70%)] blur-3xl" />
                <div className="pointer-events-none absolute bottom-10 right-10 h-1/3 w-1/3 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.4),_transparent_80%)] blur-3xl" />
            </div>

            {/* Container principal */}
            <div className="container space-y-10 px-5 md:space-y-12">

                {/* 1. Bloco Título (Removido AnimateOnScroll) */}
                <div className="mx-auto flex max-w-2xl flex-col items-center space-y-3 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        Perguntas Frequentes
                    </h2>
                    <p className="max-w-xl leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        Respostas para as dúvidas mais comuns – para você tomar a decisão com 100% de clareza.
                    </p>
                </div>

                {/* 2. Bloco do Accordion Customizado (Removido AnimateOnScroll) */}
                <div className="mx-auto w-full max-w-3xl">
                    {faqItems.map((item, index) => {
                        const isOpen = openIndex === index; // Verifica se este item é o que está aberto

                        return (
                            <div key={item.question} className="border-b border-border/20">
                                {/* Trigger (Botão da Pergunta) */}
                                <button
                                    type="button" // Boa prática para botões sem submit
                                    onClick={() => handleToggle(index)}
                                    className="flex w-full items-center justify-between py-5 text-left text-base font-medium text-foreground hover:no-underline sm:text-lg"
                                    aria-expanded={isOpen} // Acessibilidade: indica se está expandido
                                    aria-controls={`faq-content-${index}`} // Acessibilidade: liga ao conteúdo
                                    id={`faq-trigger-${index}`} // Acessibilidade: ID para o labelby do conteúdo
                                >
                                    <span>{item.question}</span>
                                    <ChevronDown
                                        className={cn(
                                            "h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200",
                                            isOpen && "rotate-180" // Gira o ícone quando aberto
                                        )}
                                    />
                                </button>

                                {/* Content (Resposta) - Animação com max-height */}
                                <div
                                    id={`faq-content-${index}`} // Acessibilidade: ID para o controls do botão
                                    role="region" // Acessibilidade: define a região do conteúdo
                                    aria-labelledby={`faq-trigger-${index}`} // Acessibilidade: liga ao botão
                                    className={cn(
                                        "overflow-hidden transition-[max-height] duration-300 ease-in-out",
                                        isOpen ? "max-h-[500px]" : "max-h-0" // Controla a altura para animação
                                        // '[500px]' é um valor arbitrário, ajuste se necessário para respostas muito longas
                                    )}
                                >
                                    {/* Adiciona padding apenas quando está aberto (dentro do div que colapsa) */}
                                    <div className="pb-5 pt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div> {/* Fim do container principal */}
        </section>
    );
}