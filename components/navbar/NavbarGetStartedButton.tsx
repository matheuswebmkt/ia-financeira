// components/navbar/NavbarGetStartedButton.tsx
"use client"; 

import React from 'react';
import { Button } from "@/components/ui/button"; 
import { sendCapiEvent } from '@/lib/pixel'; 

declare global { /* ... window.fbq ... */ }

// --- CORREÇÃO AQUI ---
// Remove a interface vazia e estende diretamente as props do elemento Button do HTML
// Isso inclui onClick, className, children, type, disabled, etc.
interface NavbarGetStartedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    // Pode adicionar props customizadas aqui se precisar no futuro
}

const NavbarGetStartedButton: React.FC<NavbarGetStartedButtonProps> = ({ 
    children = "Get Started", // Mantém o texto padrão
    className, 
    onClick: originalOnClick, // Renomeia prop onClick original para evitar conflito
    ...props // Captura outras props como type, disabled, etc.
}) => {

    const handleCheckoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('NavbarGetStartedButton clicked!');
        const initiateCheckoutEventData = { /* ... dados do evento ... */ };

        if (typeof window.fbq === 'function') { /* ... fbq track ... */ }
        sendCapiEvent('InitiateCheckout', initiateCheckoutEventData, window.location.href);
        
        // Executa o onClick original se ele foi passado
        if (originalOnClick) {
            originalOnClick(event);
        }

        const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL;
        if (checkoutUrl) { window.open(checkoutUrl, '_blank', 'noopener,noreferrer'); } 
        else { console.warn('NavbarGetStartedButton: NEXT_PUBLIC_CHECKOUT_URL not set.'); }
    };

    return (
        <Button
            variant="default" 
            size="default" // Ajuste para 'lg' se preferir
            className={className} 
            onClick={handleCheckoutClick} // Usa o handler customizado
            {...props} // Passa props restantes (type="button", disabled, etc.)
        >
            {children}
        </Button>
    );
};

export default NavbarGetStartedButton;