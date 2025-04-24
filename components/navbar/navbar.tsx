// components/navbar/navbar.tsx

"use client"; // <<< ADICIONADO: Necessário para o onClick com lógica client-side

import React from 'react'; // Importa React
import { Button } from "@/components/ui/button"; // Importa o Button padrão
import { Logo } from "./logo";
import ThemeToggle from "../theme-toggle"; // Assume que este já é client ou não precisa ser
import { sendCapiEvent } from '@/lib/pixel'; // Importa função CAPI

// Declaração global fbq
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const Navbar = () => {

  // Função de clique para o botão "Get Started"
  const handleGetStartedClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Navbar Get Started clicked!');

    // Dados do evento (AJUSTE CONFORME NECESSÁRIO!)
    const initiateCheckoutEventData = {
      content_name: 'eBook IA Anti-Dívidas + Bônus (Navbar CTA)',
      content_ids: ['IA_ANTI_DIVIDAS_EBOOK_01'],
      content_type: 'product',
      value: 9.90,
      currency: 'BRL',
    };

    // Dispara Pixel
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', initiateCheckoutEventData);
      console.log('Meta Pixel (Browser - Navbar): InitiateCheckout sent', initiateCheckoutEventData);
    } else {
      console.warn('FB Pixel not loaded (Navbar CTA).');
    }

    // Dispara CAPI
    sendCapiEvent('InitiateCheckout', initiateCheckoutEventData, window.location.href);
    console.log('Meta CAPI (Frontend Trigger - Navbar): InitiateCheckout sent to backend API.');

    // Redirecionamento
    const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL;
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('Get Started Button: NEXT_PUBLIC_CHECKOUT_URL not set.');
    }
  };

  return (
    // Sua estrutura de Navbar
    <nav className="fixed top-6 inset-x-4 z-10 mx-auto h-14 max-w-screen-xl rounded-full border bg-background/50 backdrop-blur-sm dark:border-slate-700/70 xs:h-16">
      <div className="mx-auto flex h-full items-center justify-between px-4">
        <Logo />

        {/* Itens à direita */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Botão "Get Started" usando o componente Button e o handler */}
          {/* Removido 'hidden xs:inline-flex' para sempre mostrar, ajuste se necessário */}
          <Button
            variant="default" // Usa o estilo preto/branco
            size="sm" // Tamanho sm pode ficar melhor na navbar, ajuste se preferir 'default'
            onClick={handleGetStartedClick} // Adiciona a lógica de clique aqui
          >
            Get Started
          </Button>

          {/* Mobile Menu Placeholder (se precisar implementar) */}
          {/* <div className="md:hidden"> ... </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;