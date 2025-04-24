// REMOVIDO: "use client"; // <= Pode ser Server Component

import React from "react";
// import Link from "next/link"; // Removido
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Star, Quote } from "lucide-react"; // Removidos ArrowRight, LucideIcon
import { Card, CardContent } from "@/components/ui/card";
// import ShinyButton02 from "@/components/magicui/shiny-button-02"; // Removido
import AnimateOnScroll from '@/components/utils/AnimateOnScroll'; // Importa wrapper

// REMOVIDO: Hook useIntersectionObserver daqui

// Tipagem e Dados (mantidos)
interface Testimonial { name: string; location: string; quote: string; avatar: string | null; stars: number; }
const testimonials: Testimonial[] = [
   { name: "Ana Pinheiro", location: "27 anos, de Rio de Janeiro", quote: "Os bônus são um verdadeiro presente, bizarro, não imaginava que teriam um efeito tão grande em mim! Os comandos prontos me ajudaram a superar bloqueios com a IA em minutos. Obrigado por compartilhar isso comigo", avatar: "/image/Ana Pinheiro - 07.webp", stars: 5 },
   { name: "Victor Ribeiro", location: "34 anos, de Curitiba", quote: "O que a escola e minha família nunca me explicaram... A IA Anti-dívidas me ensinou em uma única madrugada. Não é só sair da dívida, é virar alguém que nunca mais aceita ela.", avatar: "/image/victor - 01.webp", stars: 5 },
   { name: "Gabrielle Ferreira S.", location: "29 anos, de São Paulo", quote: "Eu chorava de desespero com R$12 na conta kkkkk. Em 5 dias, mudei meu plano inteiro. Com IA. Não vou reclamar mais do salário mínimo. 👀", avatar: "/image/Gabrielle - 02.webp", stars: 5 },
   { name: "Antônio", location: "43 anos, de Natal", quote: "Não pensava que IA fosse tão simples de usar para organizar meu dinheiro e dívidas. Indiquei isso para meus filhos e alguns amigos. Obrigado!!!", avatar: "/image/Antônio - 03.webp", stars: 5 },
   { name: "Maria S.", location: "22 anos, de São Paulo", quote: "Nunca imaginei que algo de tão fácil acesso pudesse ter um impacto tão profundo em minha vida financeira. Hoje, vejo o dinheiro com outros olhos e estou conquistando a paz que sempre busquei.", avatar: "/image/Maria_S. - .webp", stars: 5 },
   { name: "Renato", location: "26 anos, de Belo Horizonte", quote: "IA Financeira é o melhor investimento que já fiz. Estou colocando em dia faturas que antes pareciam impossíveis, eu até tentava acreditar, mas no fundo duvidava, agora sei que é real mesmo, pensava que só outros conseguiam.", avatar: "/image/Renato - 05.webp", stars: 5 },
];

// --- Componente Refatorado (Server Component) ---
export default function SocialProofSection() {
    // REMOVIDO: Lógica de animação
    // REMOVIDO: calculateDelay

    return (
        <section
            id="provas-sociais" // Manter ID
            className="relative w-full bg-gradient-to-b from-background via-primary/5 to-background py-16 md:py-20 lg:py-24"
        >
            {/* Background */}
            <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-[0.07]">
                <div className="pointer-events-none absolute top-0 left-0 h-full w-1/2 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_left,_hsl(var(--primary)/0.2),_transparent_70%)] blur-3xl opacity-50" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-full w-1/2 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_right,_hsl(var(--accent)/0.3),_transparent_80%)] blur-3xl opacity-60" />
            </div>

            <div className="container space-y-12 px-5 md:space-y-16">
                {/* Bloco Título */}
                <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
                    <AnimateOnScroll delay={0}>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            Método criado com base em consultorias financeiras reais + tecnologia de IA.
                        </h2>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={0.1}>
                        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-7">
                            Usado por +500 pessoas. Com retorno de investimento de até 1.9x já na primeira semana. E você acessa tudo sem pagar uma fortuna.
                        </p>
                    </AnimateOnScroll>
                </div>

                {/* Container dos Depoimentos */}
                <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <AnimateOnScroll
                            key={testimonial.name + index} // Usar nome + index como key é razoável aqui
                            delay={(index + 1) * 0.05} // Stagger dos cards
                            className={cn(
                                "relative h-full overflow-hidden rounded-lg", // Wrapper com forma e clipagem
                                "transition-all duration-200 ease-out", // Hover effects
                                "hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-primary/20",
                                "light-sweep light-mode-sweep" // Efeito visual no wrapper
                            )}
                        >
                            <Card className={cn(
                                "flex h-full flex-col rounded-lg", // Garante borda interna, mas overflow é do pai
                                "border border-border/20 bg-card/90 shadow-lg dark:bg-zinc-900/90 backdrop-blur-md" // Estilo base
                            )}>
                                <CardContent className="relative z-[2] flex flex-grow flex-col p-5 md:p-6"> {/* z-index pode ser útil */}
                                    {/* Estrelas */}
                                    <div className="mb-3 flex items-center" aria-label={`${testimonial.stars} de 5 estrelas`}>
                                        {Array.from({ length: 5 }).map((_, i) => ( // Renderiza 5 estrelas, preenchendo as corretas
                                            <Star
                                                key={i}
                                                className={cn(
                                                    "h-4 w-4",
                                                    i < testimonial.stars ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    {/* Citação */}
                                    <blockquote className="relative mb-4 flex-grow pl-6 text-base italic leading-relaxed text-foreground/90">
                                        <Quote className="absolute left-0 top-0 h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
                                        {testimonial.quote}
                                    </blockquote>
                                    {/* Autor */}
                                    <div className="mt-auto flex items-center gap-3 border-t border-border/15 pt-4">
                                        <Image
                                           src={testimonial.avatar || "/avatar-placeholder.png"} // Fallback para placeholder
                                           alt={`Foto de ${testimonial.name}`} // Alt text mais descritivo
                                           width={40}
                                           height={40}
                                           className="h-10 w-10 rounded-full bg-muted object-cover" // Garantir object-cover
                                           loading="lazy"
                                        />
                                        <div>
                                            <p className="text-base font-semibold text-foreground">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.location}</p> {/* Tamanho um pouco menor para localização */}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimateOnScroll>
                    ))}
                </div>

                {/* Bloco CTA Final REMOVIDO */}

            </div>
        </section>
    );
}