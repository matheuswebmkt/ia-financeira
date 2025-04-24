'use client';

// Imports necessários mantidos
import React, { Suspense } from 'react'; // REMOVIDO: useEffect, useRef, useState
import TrackPurchase from '@/components/TrackPurchase';
import { CheckCircle } from 'lucide-react';
// import { cn } from "@/lib/utils"; // REMOVIDO: cn não é mais usado aqui
import AnimateOnScroll from '@/components/utils/AnimateOnScroll';
// Import de SparklesText removido se não for usado no título (não estava no JSX anterior)
// import { SparklesText } from "@/components/magicui/sparkles-text"; 

// --- Dados ESTÁTICOS do produto ---
const purchasedProductInfo = {
  content_ids: ['IA_ANTI_DIVIDAS_EBOOK_01'],
  content_name: 'eBook IA Anti-Dívidas + Bônus',
  content_type: 'product',
  num_items: 1,
};

// --- Componente Wrapper ---
function PurchaseTracker() {
  return (
    <Suspense fallback={<div>Rastreando compra...</div>}>
      <TrackPurchase productData={purchasedProductInfo} />
    </Suspense>
  );
}

// --- Componente Principal Otimizado ---
export default function ThankYouPage() {

  return (
    <section
      id="obrigado"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-16 dark:from-green-950/30 dark:via-gray-950 dark:to-purple-950/30 md:py-20 lg:py-24 light-sweep light-mode-sweep"
    >
        {/* Background */}
       <div className="absolute inset-0 z-[-1] opacity-15 dark:opacity-[0.1]">
         <div className="pointer-events-none absolute top-[-5%] left-[5%] h-1/2 w-1/3 rotate-12 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.2),_transparent_70%)] blur-3xl opacity-60" />
         <div className="pointer-events-none absolute bottom-[-5%] right-[5%] h-1/2 w-1/3 -rotate-12 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(var(--accent)/0.3),_transparent_80%)] blur-3xl opacity-50" />
         <div className="pointer-events-none absolute top-[30%] right-[15%] h-1/4 w-1/4 transform-gpu rounded-full bg-[radial-gradient(ellipse_at_center,_#22c55e60,_transparent_70%)] blur-2xl opacity-40" />
       </div>

      {/* Container principal */}
      <div className="container relative z-[2] px-5">
         {/* Wrapper Centralizado */}
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">

            <PurchaseTracker />

            <AnimateOnScroll delay={0.1} className="mb-[-1rem]">
                <div className="inline-block rounded-full border border-green-200 bg-green-100 p-2 shadow-md dark:border-green-700 dark:bg-green-900">
                    <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" aria-hidden="true" />
                </div>
             </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
                {/* Removido SparklesText se não estava sendo usado */}
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                    Compra Confirmada!🎉
                </h2>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.3}>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Obrigado por adquirir o <span className="font-semibold text-foreground">{purchasedProductInfo.content_name}</span>! Seu acesso está a caminho.
                </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.4}>
                <p className="text-base leading-relaxed text-muted-foreground">
                    Enviamos um e-mail com todos os detalhes para você começar. Por favor, verifique sua caixa de entrada (e a pasta de spam, por via das dúvidas 😉).
                </p>
            </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}