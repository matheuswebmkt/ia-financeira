// src/app/(marketing)/page.tsx

import dynamic from 'next/dynamic'; // 1. Importe 'dynamic'

// --- Componentes que CARREGAM NORMALMENTE (Topo da página/Leves) ---
import HeroPage from "./hero/HeroPage";


export default function Home() {
  return (
    <>
      {/* Componentes que carregam imediatamente */}
      <HeroPage />
      {/* <TextReveal01 /> */} {/* Decida se este deve ser dinâmico ou não */}

      
    </>
  );
}