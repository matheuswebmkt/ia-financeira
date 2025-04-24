import { Navbar } from "@/components/navbar"; // <- Mantém estático
import HeroSection from "@/components/sections/HeroSection"; // <- Mantém estático (geralmente)

import dynamic from 'next/dynamic'; // <<< 1. Importa dynamic

// --- 2. Placeholder de Carregamento (Opcional) ---
// Pode ser mais elaborado, mas um div com altura mínima ajuda a evitar layout shift
const LoadingPlaceholder = () => (
  <div className="min-h-[60vh] w-full animate-pulse bg-muted/30" /> 
  // Ajuste min-h-[...] para algo próximo da altura média das suas seções
);

// --- 3. Converte Imports das Seções Abaixo da Dobra ---
const DynamicTextReveal01 = dynamic(
  () => import('@/components/sections/TextReveal01'),
  { loading: () => <LoadingPlaceholder /> } // Mostra placeholder enquanto carrega
);
const DynamicProblemPainSection = dynamic(
  () => import('@/components/sections/ProblemPainSection'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicParadigmShiftSection = dynamic(
  () => import('@/components/sections/ParadigmShiftSection'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicMethodIntroductionSection = dynamic(
  () => import('@/components/sections/MethodIntroductionSection'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicCtaSection01 = dynamic(
  () => import('@/components/sections/CtaSection01'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicCtaSection02 = dynamic(
  () => import('@/components/sections/CtaSection02'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicCtaSection03 = dynamic(
  () => import('@/components/sections/CtaSection03'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicCtaSection04 = dynamic(
  () => import('@/components/sections/CtaSection04'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicTextReveal03 = dynamic(
  () => import('@/components/sections/TextReveal03'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicBenefitsSection = dynamic(
  () => import('@/components/sections/BenefitsSection'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicProductContentSection = dynamic(
  () => import('@/components/sections/ProductContentSection'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicTextReveal04 = dynamic(
  () => import('@/components/sections/TextReveal04'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicSocialProofSection = dynamic(
  () => import('@/components/sections/SocialProofSection'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicTextRevealBonus02 = dynamic(
  () => import('@/components/sections/TextRevealBonus02'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicBonusSection = dynamic(
  () => import('@/components/sections/BonusSection'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicPricingSection = dynamic(
  () => import('@/components/sections/PricingSection'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicGuaranteeSection = dynamic(
  () => import('@/components/sections/GuaranteeSection'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicFaqSection = dynamic(
  () => import('@/components/sections/FaqSection'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicFinalCtaSection = dynamic(
  () => import('@/components/sections/FinalCtaSection'),
  { loading: () => <LoadingPlaceholder /> }
);
const DynamicFooter = dynamic(
  () => import('@/components/sections/FooterSection'),
  { loading: () => <LoadingPlaceholder /> }
);

// --- Componente Principal ---
export default function Home() {
  return (
    <>
      <Navbar /> {/* Mantém estático */}
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <HeroSection /> {/* Mantém estático */}

        {/* --- 4. Usa os Componentes Dinâmicos no JSX --- */}
        <DynamicTextReveal01 />
        <DynamicProblemPainSection />
        <DynamicParadigmShiftSection />
        <DynamicMethodIntroductionSection />
        <DynamicCtaSection01 />
        <DynamicTextReveal03 />
        <DynamicBenefitsSection />
        <DynamicCtaSection02 />
        <DynamicProductContentSection />
        <DynamicTextReveal04 />
        <DynamicSocialProofSection />
        <DynamicCtaSection03 />
        <DynamicTextRevealBonus02 />
        <DynamicBonusSection />
        <DynamicCtaSection04 />
        <DynamicPricingSection />
        <DynamicGuaranteeSection />
        <DynamicFaqSection /> {/* Adicionado o FAQ que faltava */}
        <DynamicFinalCtaSection />
        <DynamicFooter />
        

      </main>
    </>
  );
}