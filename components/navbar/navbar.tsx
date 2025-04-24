// components/navbar/navbar.tsx

"use client"; 

import React from 'react'; 
import { Button } from "@/components/ui/button"; 
import { Logo } from "./logo";
import ThemeToggle from "../theme-toggle"; 
import { sendCapiEvent } from '@/lib/pixel'; 

// Declaração global fbq
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const Navbar = () => {

  // Função de clique para o botão "Get Started"
  // REMOVIDO o parâmetro 'event' pois não é utilizado
  const handleGetStartedClick = (/* event: React.MouseEvent<HTMLButtonElement> */) => { 
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

          <Button
            variant="default" 
            size="sm" 
            onClick={handleGetStartedClick} // Chama o handler corrigido
          >
            Get Started
          </Button>

          {/* Mobile Menu Placeholder */}
          {/* <div className="md:hidden"> ... </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;