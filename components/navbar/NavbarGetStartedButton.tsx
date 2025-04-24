// components/navbar/NavbarGetStartedButton.tsx
"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { sendCapiEvent } from '@/lib/pixel';

declare global { /* ... window.fbq ... */ }

// --- CORREÇÃO AQUI ---
// A interface agora estende as props do botão HTML
interface NavbarGetStartedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // Não precisa de props customizadas aqui, a menos que você queira adicionar
}

// A tipagem do componente usa a interface corrigida
const NavbarGetStartedButton: React.FC<NavbarGetStartedButtonProps> = ({
    children = "Get Started",
    className,
    onClick: originalOnClick, // Renomeia para evitar conflito no handler
    ...props
}) => {

    const handleCheckoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // ... (lógica de clique, pixel, capi, redirect) ...
         console.log('NavbarGetStartedButton clicked!');
        const initiateCheckoutEventData = { /* ... dados do evento ... */ };

        if (typeof window.fbq === 'function') { /* ... fbq track ... */ }
        sendCapiEvent('InitiateCheckout', initiateCheckoutEventData, window.location.href);

        if (originalOnClick) { originalOnClick(event); }

        const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL;
        if (checkoutUrl) { window.open(checkoutUrl, '_blank', 'noopener,noreferrer'); }
        else { console.warn('NavbarGetStartedButton: NEXT_PUBLIC_CHECKOUT_URL not set.'); }
    };

    return (
        <Button
            variant="default"
            size="default" // Ou "lg"
            className={className}
            onClick={handleCheckoutClick} // Handler customizado
            {...props} // Passa outras props (type, disabled...)
        >
            {children}
        </Button>
    );
};

export default NavbarGetStartedButton;