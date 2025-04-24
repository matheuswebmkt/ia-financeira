// componentes/sections/pricingsection.tsx (COMPLETO E ATUALIZADO)

"use client"; // Diretiva para Componente Cliente

import React from "react"; // Import do React
import Image from "next/image"; // Componente Image do Next.js
import { cn } from "@/lib/utils"; // Utilitário para classes
import { CheckCircle, Gift, BookOpen, RefreshCw, Zap, ShieldHalf, Award, Target, LucideIcon } from "lucide-react"; // Ícones
import { Card, CardContent } from "@/components/ui/card"; // Componentes Card da sua UI lib
import ShinyButton02 from "@/components/magicui/shiny-button-02"; // Seu componente de botão
import TrackViewContent from '@/components/TrackViewContent'; // Componente para rastrear ViewContent (Verifique o caminho)
import AnimateOnScroll from '@/components/utils/AnimateOnScroll'; // Componente para animação (Verifique o caminho)

// Interface para os itens da lista "O que você leva"
interface IncludedItem { name: string; icon: LucideIcon; }

// Dados da lista "O que você leva"
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

// Componente principal da seção de preços
export default function PricingSection() {

    // --- DADOS DO PRODUTO PARA O EVENTO ViewContent ---
    // Este objeto é crucial e é passado para o TrackViewContent
    const productDataForViewContent = {
      content_name: 'eBook IA Anti-Dívidas + Bônus', // CERTIFIQUE-SE que este é o nome correto
      content_ids: ['IA_ANTI_DIVIDAS_EBOOK_01'],     // CERTIFIQUE-SE que este é o ID/SKU correto
      content_type: 'product',                      // Mantenha como 'product'
      value: 9.90,                                  // CERTIFIQUE-SE que este é o preço correto exibido
      currency: 'BRL',                              // Mantenha como 'BRL'
    };
    // --- FIM DOS DADOS DO PRODUTO ---

    return (
        <section
            id="valor" // ID da seção
            // Estilos: container, centralização, espaçamento, padding, largura máxima
            className={cn(
                "container relative mx-auto flex flex-col gap-8 overflow-hidden",
                "py-12 px-5 md:max-w-[64rem] md:py-16 lg:py-20"
             )}
        >
            {/* Componente TrackViewContent: Renderiza no início e recebe os dados do produto */}
            <TrackViewContent eventData={productDataForViewContent} />

            {/* Elementos de Background */}
            <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-[0.07]">
                <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-1/3 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.4),_transparent_70%)] blur-3xl opacity-60" />
                <div className="pointer-events-none absolute top-0 right-0 h-1/2 w-1/3 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.5),_transparent_80%)] blur-3xl opacity-50" />
            </div>

            {/* 1. Título Principal */}
            <div className="mx-auto flex w-full flex-col items-center gap-3 text-center md:max-w-[58rem]">
                <AnimateOnScroll delay={0}>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        O jogo virou ao seu favor, você está no controle.
                    </h2>
                </AnimateOnScroll>
            </div>

            {/* 2. Seção "O que você leva" */}
            <div className="mx-auto max-w-5xl space-y-6 pt-8 text-center md:pt-10">
                <AnimateOnScroll delay={0}>
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                        Você está levando agora:
                    </h3>
                </AnimateOnScroll>
                {/* Grid com os itens incluídos */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
                    {includedItems.map((item, index) => (
                        <AnimateOnScroll
                            key={item.name} // Chave única para itens da lista
                            delay={(index + 1) * 0.05} // Delay escalonado para animação
                            className="transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md" // Efeito ao passar o mouse
                        >
                            {/* Card para cada item */}
                            <Card className="relative h-full overflow-hidden border border-border/10 bg-card p-4 shadow-sm dark:bg-zinc-900/70 backdrop-blur-sm light-sweep light-mode-sweep">
                                <CardContent className="relative z-[2] flex flex-col items-center gap-2 p-0 text-center">
                                    <item.icon className="mb-1 h-6 w-6 text-primary" aria-hidden="true" />
                                    <p className="text-sm font-medium leading-snug text-muted-foreground">{item.name}</p>
                                </CardContent>
                            </Card>
                        </AnimateOnScroll>
                    ))}
                </div>
            </div>

            {/* 3. Card Principal da Oferta */}
            <AnimateOnScroll delay={0} className="w-full">
                <div
                    // Estilos do card principal
                    className="relative grid grid-cols-1 gap-8 overflow-hidden rounded-xl border bg-white p-8 shadow-sm dark:bg-zinc-900/80 md:grid-cols-2 md:p-10 light-sweep light-mode-sweep"
                >
                    {/* Coluna Esquerda: Valor Estimado + Imagem */}
                    <div className="flex flex-col items-center justify-center gap-6 text-center">
                         {/* Valor Estimado */}
                         <div className="flex items-center justify-center gap-2">
                            <p className="text-sm uppercase tracking-wider text-muted-foreground">Valor Total Estimado</p>
                            <p className="text-lg font-semibold text-muted-foreground line-through">R$ 147+</p>
                        </div>
                        {/* Imagem do Produto */}
                        <div className="w-full max-w-sm">
                            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted/30">
                                <Image
                                    src="/image/Imagem-para-card-de-price.webp" // VERIFIQUE ESTE CAMINHO
                                    alt="Mockup da Oferta IA Anti-Dívidas com bônus"
                                    fill // Usa fill para responsividade
                                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 30vw" // Otimização de tamanhos
                                    className="object-cover" // Garante que cubra o espaço
                                    loading="lazy" // Carregamento preguiçoso
                                />
                            </div>
                        </div>
                    </div>
                    {/* Coluna Direita: Preço + Botão + Selos */}
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                         {/* Bloco de Preço */}
                         <div className="flex flex-col items-center gap-2 text-center">
                            <p className="text-sm text-muted-foreground">Oferta exclusiva por apenas 2x de:</p>
                            <div className="flex items-end justify-center gap-1">
                                <span className="text-6xl font-extrabold leading-none text-foreground">R$ 5</span>
                                <span className="text-4xl font-bold text-foreground">,54</span>
                            </div>
                            <p className="text-sm text-muted-foreground">ou pagamento único de R$ 9,90</p>
                        </div>
                        {/* Botão ShinyButton02 */}
                        <div>
                            <ShinyButton02 text="Quero a IA Anti-dívidas" />
                             {/* Nenhuma prop extra necessária, a lógica está dentro do botão */}
                        </div>
                        {/* Selos de Garantia */}
                        <div className="mt-2">
                            <Image
                                src="/image/selos de garantia PRETO 03 - compacto.webp" // VERIFIQUE ESTE CAMINHO
                                alt="Selos de Garantia"
                                width={220} height={50}
                                className="block object-contain dark:hidden" // Mostra em tema claro
                                loading="lazy"
                             />
                            <Image
                                src="/image/selos de garantia CLARO.webp" // VERIFIQUE ESTE CAMINHO
                                alt="Selos de Garantia"
                                width={220} height={50}
                                className="hidden object-contain dark:block" // Mostra em tema escuro
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </AnimateOnScroll>

            {/* 4. Bloco Final de Chamada */}
            <div className="mx-auto max-w-xl space-y-2 pt-8 text-center">
                <AnimateOnScroll delay={0}>
                    <h4 className="text-lg font-semibold tracking-wider text-foreground">
                        Absurdamente barato pra quem quer resultado. Você acessa agora e ativa a IA Anti-dívidas imediatamente.
                    </h4>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.1}>
                    <p className="text-sm text-muted-foreground">
                        Isso por menos do que você gasta em besteira no mercado.
                    </p>
                </AnimateOnScroll>
            </div>
        </section>
    );
}