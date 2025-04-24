// src/app/(marketing)/page.tsx

import dynamic from 'next/dynamic'; // 1. Importe 'dynamic'

// --- Componentes que CARREGAM NORMALMENTE (Topo da página/Leves) ---
import HeroPage from "./hero/HeroPage";

const DynamicTextReveal01 = dynamic(
  () => import('./hero/TextReveal01'),
  { loading: () => <LoadingPlaceholder />, ssr: false }
);

const DynamicTextReveal03 = dynamic(
  () => import('./hero/TextReveal03'),
  { loading: () => <LoadingPlaceholder />, ssr: false }
);

const DynamicTextReveal04 = dynamic(
  () => import('./hero/TextReveal04'),
  { loading: () => <LoadingPlaceholder />, ssr: false }
);


// --- Placeholder de Carregamento Genérico ---
// Você pode estilizar isso melhor ou criar um componente separado
const LoadingPlaceholder = () => (
  <div className="h-96 w-full animate-pulse rounded-lg bg-muted/30" />
);

// --- Componentes que CARREGAM DINAMICAMENTE (Abaixo da dobra/Otimizados) ---
const DynamicProblemPainSection = dynamic(
  () => import('./hero/ProblemPainSection'), // Caminho correto
  { loading: () => <LoadingPlaceholder />, ssr: false }
);

const DynamicParadigmShiftSection = dynamic(
  () => import('./hero/ParadigmShiftSection'), // <- Usando o nome/caminho do seu import original
  { loading: () => <LoadingPlaceholder />, ssr: false }
  // Se o nome do arquivo for realmente ParadigmShiftSection_Funcionando.tsx, use:
  // () => import('./hero/ParadigmShiftSection_Funcionando'),
);

const DynamicMethodIntroductionSection = dynamic(
  () => import('./hero/MethodIntroductionSection'), // Caminho correto
  { loading: () => <LoadingPlaceholder />, ssr: false }
);

const DynamicBenefitsSection = dynamic(
  () => import('./hero/BenefitsSection'), // Caminho correto
  { loading: () => <LoadingPlaceholder />, ssr: false } // Placeholder pode precisar de altura diferente se a seção for alta
);

const DynamicProductContentSection = dynamic(
  () => import('./hero/ProductContentSection'), // Caminho correto
  { loading: () => <LoadingPlaceholder />, ssr: false }
);

const DynamicSocialProofSection = dynamic(
  () => import('./hero/SocialProofSection'), // Caminho correto
  { loading: () => <LoadingPlaceholder />, ssr: false } // Placeholder pode precisar de altura diferente
);

const DynamicTextRevealBonus02 = dynamic(
  () => import('./hero/TextRevealBonus02'),
  { loading: () => <LoadingPlaceholder />, ssr: false }
);

const DynamicBonusSection = dynamic(
  () => import('./hero/BonusSection'), // Caminho correto
  { loading: () => <LoadingPlaceholder />, ssr: false }
);

// Removido: import PricingPage from "./pricing/page"; // Importar uma 'page' aqui geralmente é um erro

const DynamicPricingSection = dynamic(
  () => import('./hero/PricingSection'), // Caminho correto
  { loading: () => <LoadingPlaceholder />, ssr: false }
);

const DynamicGuaranteeSection = dynamic(
  () => import('./hero/GuaranteeSection'), // Caminho correto
  { loading: () => <LoadingPlaceholder />, ssr: false }
);

const DynamicFaqSection = dynamic(
  () => import('./hero/FaqSection'), // Caminho correto
  { loading: () => <LoadingPlaceholder />, ssr: false }
);

// Note a consistência no nome (lowercase 'c') como no seu import original
const DynamicFinalctasection = dynamic( // Mantido como 'Finalctasection'
  () => import('./hero/FinalCtaSection'), // Caminho correto
  { loading: () => <LoadingPlaceholder />, ssr: false }
);


// --- Componente Principal da Página ---
export default function Home() {
  return (
    <>
      {/* Componentes que carregam imediatamente */}
      <HeroPage />
      {/* <TextReveal01 /> */} {/* Decida se este deve ser dinâmico ou não */}

      <DynamicTextReveal01 />
      {/* Componentes carregados dinamicamente */}
      <DynamicProblemPainSection />
      
      <DynamicParadigmShiftSection />
      <DynamicTextReveal03 />
      <DynamicMethodIntroductionSection />
      <DynamicBenefitsSection />
      <DynamicProductContentSection />
      <DynamicTextReveal04 />
      <DynamicSocialProofSection />
      <DynamicTextRevealBonus02 />
      <DynamicBonusSection />
      <DynamicPricingSection />
      {/* <PricingPage /> */} {/* Removido - Uso incorreto */}
      <DynamicGuaranteeSection />
      <DynamicFaqSection />
      <DynamicFinalctasection />
      {/* <Obrigado /> */} {/* Removido - Uso incorreTo */}
    </>
  );
}