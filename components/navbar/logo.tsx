import React from 'react';
import Link from 'next/link'; // Importa o componente Link do Next.js
import { cn } from '@/lib/utils'; // Para combinar classes (opcional aqui, mas bom manter)

export const Logo = () => {
  return (
    // Link que envolve o texto e aponta para a página inicial "/"
    <Link
      href="/"
      // Aplica estilos diretamente ao Link para parecer um elemento clicável
      // Use text-foreground para que a cor se adapte ao tema
      // Ajuste o tamanho/peso da fonte conforme seu design
      className={cn(
        "text-xl font-bold text-foreground hover:text-foreground/80 transition-colors duration-200", // Exemplo de estilo
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-sm" // Estilos de foco para acessibilidade
      )}
      aria-label="Página Inicial IA Financeira" // Melhora acessibilidade
    >
      IA Financeira
    </Link>
  );
};
