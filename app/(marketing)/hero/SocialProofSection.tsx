// src/app/(marketing)/hero/SocialProofSection.tsx (CORRIGIDO - light-sweep no Wrapper)
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Star, Quote, ArrowRight, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ShinyButton02 from "@/components/magicui/shiny-button-02";

// Hook useIntersectionObserver (mantido)
function useIntersectionObserver(options: IntersectionObserverInit = {}): [React.RefObject<any>, boolean] {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef<any>(null);
    useEffect(() => { const element = ref.current; if (!element) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsIntersecting(true); observer.unobserve(element); } }, { threshold: 0.1, ...options }); observer.observe(element); return () => { if (element) { observer.unobserve(element); } }; }, [options]); return [ref, isIntersecting];
}

// Tipagem e Dados (mantidos)
interface Testimonial { name: string; location: string; quote: string; avatar: string | null; stars: number; }
const testimonials: Testimonial[] = [ /* ... (dados mantidos) ... */
   { name: "Ana Pinheiro", location: "27 anos, de Rio de Janeiro", quote: "Os bônus são um verdadeiro presente, bizarro, não imaginava que teriam um efeito tão grande em mim! Os comandos prontos me ajudaram a superar bloqueios com a IA em minutos. Obrigado por compartilhar isso comigo", avatar: "/image/Ana Pinheiro - 07.webp", stars: 5 },
   { name: "Victor Ribeiro", location: "34 anos, de Curitiba", quote: "O que a escola e minha família nunca me explicaram... A IA Anti-dívidas me ensinou em uma única madrugada. Não é só sair da dívida, é virar alguém que nunca mais aceita ela.", avatar: "/image/victor - 01.webp", stars: 5 },
   { name: "Gabrielle Ferreira S.", location: "29 anos, de São Paulo", quote: "Eu chorava de desespero com R$12 na conta kkkkk. Em 5 dias, mudei meu plano inteiro. Com IA. Não vou reclamar mais do salário mínimo. 👀", avatar: "/image/Gabrielle - 02.webp", stars: 5 },
   { name: "Antônio", location: "43 anos, de Natal", quote: "Não pensava que IA fosse tão simples de usar para organizar meu dinheiro e dívidas. Indiquei isso para meus filhos e alguns amigos. Obrigado!!!", avatar: "/image/Antônio - 03.webp", stars: 5 },
   { name: "Maria S.", location: "22 anos, de São Paulo", quote: "Nunca imaginei que algo de tão fácil acesso pudesse ter um impacto tão profundo em minha vida financeira. Hoje, vejo o dinheiro com outros olhos e estou conquistando a paz que sempre busquei.", avatar: "/image/Maria_S. - .webp", stars: 5 },
   { name: "Renato", location: "26 anos, de Belo Horizonte", quote: "IA Financeira é o melhor investimento que já fiz. Estou colocando em dia faturas que antes pareciam impossíveis, eu até tentava acreditar, mas no fundo duvidava, agora sei que é real mesmo, pensava que só outros conseguiam.", avatar: "/image/Renato - 05.webp", stars: 5 },
];


export default function SocialProofSection() {
    const [titleRef, isTitleVisible] = useIntersectionObserver({ threshold: 0.05 });
    const [gridRef, isGridVisible] = useIntersectionObserver({ threshold: 0.05 });
    const [ctaRef, isCtaVisible] = useIntersectionObserver();
    const calculateDelay = (index: number, baseDelay = 0.05) => `${index * baseDelay}s`;

    return (
        <section
            id="provas-sociais"
            className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background via-primary/5 to-background relative"
        >
            {/* Background */}
            <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-[0.07]">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_left,_hsl(var(--primary)/0.2),_transparent_70%)] pointer-events-none blur-3xl transform-gpu opacity-50" />
                <div className="absolute bottom-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,_hsl(var(--accent)/0.3),_transparent_80%)] pointer-events-none blur-3xl transform-gpu opacity-60" />
            </div>
            <div className="container px-5 space-y-12 md:space-y-16">
                {/* Bloco Título */}
                <div ref={titleRef} className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
                    <h2 className={cn("text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl", "animate-on-scroll", isTitleVisible && "is-visible")} style={{ transitionDelay: calculateDelay(0) }}>
                    Método criado com base em consultorias financeiras reais + tecnologia de IA.

                    </h2>
                    <p className={cn("max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7", "animate-on-scroll", isTitleVisible && "is-visible")} style={{ transitionDelay: calculateDelay(1) }}>
                    Usado por +500 pessoas. Com retorno de investimento de até 1.9x já na primeira semana. E você acessa tudo sem pagar uma fortuna.
                    </p>
                </div>
                {/* Container dos Depoimentos */}
                <div ref={gridRef} className="relative mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                    {testimonials.map((testimonial, index) => (
                        // Wrapper Externo - AGORA COM light-sweep
                        <div
                            key={testimonial.name + index}
                            className={cn(
                                "h-full",
                                "transition-all duration-200 ease-out",
                                "hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-primary/20",
                                "animate-on-scroll", isGridVisible && "is-visible",
                                "rounded-lg",
                                "overflow-hidden", // Garante clipagem no wrapper
                                // **** light-sweep MOVIDO PARA CÁ ****
                                "relative light-sweep light-mode-sweep" // position: relative é necessário para pseudo-elementos
                            )}
                            style={{ transitionDelay: calculateDelay(index) }}
                        >
                            {/* Card interno - SEM light-sweep */}
                            <Card className={cn(
                                "flex h-full flex-col", // Removido overflow-hidden daqui se o wrapper já tem
                                "bg-card/90 dark:bg-zinc-900/90 backdrop-blur-md",
                                "border border-border/20 shadow-lg", // Sombra base mantida
                                // **** CLASSES REMOVIDAS DAQUI ****
                                // "relative overflow-hidden light-sweep light-mode-sweep"
                                // Mantém rounded-lg para garantir que o conteúdo interno respeite, se necessário
                                "rounded-lg"
                            )}>
                                {/* z-[2] pode não ser mais necessário se o sweep está no pai, mas pode manter por segurança */}
                                <CardContent className="flex flex-grow flex-col p-5 md:p-6 relative z-[2]">
                                    {/* Estrelas */}
                                    <div className="mb-3 flex items-center">
                                        {Array.from({ length: testimonial.stars }).map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    {/* Citação */}
                                    <blockquote className="flex-grow text-base leading-relaxed text-foreground/90 mb-4 italic relative pl-6">
                                        <Quote className="absolute left-0 top-0 h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
                                        {testimonial.quote}
                                    </blockquote>
                                    {/* Autor */}
                                    <div className="mt-auto flex items-center gap-3 border-t border-border/15 pt-4">
                                        <Image src={testimonial.avatar || "/avatar-placeholder.png"} alt={testimonial.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover bg-muted" loading="lazy"/>
                                        <div>
                                            <p className="text-base font-semibold text-foreground">{testimonial.name}</p>
                                            <p className="text-base text-muted-foreground">{testimonial.location}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                     ))}
                </div>
                {/* Bloco CTA Final */}
                <div ref={ctaRef} className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center pt-4 md:pt-6">
                     <p className={cn("text-lg leading-relaxed", "animate-on-scroll", isCtaVisible && "is-visible")} style={{ transitionDelay: calculateDelay(0) }}>
                     Isso não é um curso, nem mais uma promessa digital. 
                     </p>
                     <p className={cn("text-lg leading-relaxed text-muted-foreground", "animate-on-scroll", isCtaVisible && "is-visible")} style={{ transitionDelay: calculateDelay(0) }}>
                     É uma rebelião silenciosa contra o sistema que lucra com o seu desespero. Você vai se tornar invisível para as dívidas e finalmente respirar com alívio.
                     </p>
                    <div className={cn("animate-on-scroll", isCtaVisible && "is-visible")} style={{ transitionDelay: calculateDelay(1) }}>
                        <ShinyButton02 text="Quero viver isso também" />
                    </div>
                </div>
            </div>
        </section>
    );
}
