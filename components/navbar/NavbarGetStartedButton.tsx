// components/navbar/NavbarGetStartedButton.tsx
"use client"; // Necessário para onClick e Pixel/CAPI

import React from 'react';
import { Button } from "@/components/ui/button"; // Importa o botão base
import { sendCapiEvent } from '@/lib/pixel'; // Importa função CAPI

// Declaração global fbq
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Props: Apenas as necessárias para estilização e texto (pode adicionar mais se precisar)
interface NavbarGetStartedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // Não precisa das props de variant/size se for sempre igual
}

const NavbarGetStartedButton: React.FC<NavbarGetStartedButtonProps> = ({ children = "Get Started", className, ...props }) => {

    const handleCheckoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('NavbarGetStartedButton clicked!');

        // Dados do evento (AJUSTE CONFORME NECESSÁRIO)
        const initiateCheckoutEventData = {
            content_name: 'eBook IA Anti-Dívidas + Bônus (Navbar CTA)', // Nome específico
            content_ids: ['IA_ANTI_DIVIDAS_EBOOK_01'],
            content_type: 'product',
            value: 9.90, // << AJUSTAR
            currency: 'BRL', // << AJUSTAR
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
            // Não precisa de event.preventDefault() para button,
            // mas window.open é a forma de ir para nova aba.
            window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
        } else {
            console.warn('NavbarGetStartedButton: NEXT_PUBLIC_CHECKOUT_URL not set.');
        }

        // Chama qualquer onClick original que possa ter sido passado (pouco provável aqui)
         if (props.onClick) {
            props.onClick(event);
        }
    };

    return (
        <Button
            variant="default" // Força a variante default (preto/branco)
            size="default" // Usa o tamanho padrão do botão (ajuste para lg se necessário)
            className={className} // Permite passar classes extras
            onClick={handleCheckoutClick} // Adiciona a lógica de clique
            {...props} // Passa outras props (type, disabled, etc.)
        >
            {children}
        </Button>
    );
};

export default NavbarGetStartedButton;