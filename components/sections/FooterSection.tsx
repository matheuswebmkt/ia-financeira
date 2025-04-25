// components/Footer.tsx (ou o caminho correto)

import React from "react";
import Link from "next/link"; // Para links
import { InstagramIcon } from "lucide-react"; // Importa só o ícone do Instagram
import { Button } from "@/components/ui/button"; // Para o botão Voltar ao Topo

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t bg-background text-foreground dark:border-t">
      <div className="container mx-auto max-w-screen-xl px-6 py-8">
        
        {/* Informações da Empresa/Nome e Direitos Reservados */}
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between">
          {/* Ícone do Instagram, Nome da Empresa e Descrição em linha */}
          <div className="flex items-center gap-2">
            <Link
              href="https://instagram.com/iafinanceira"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-foreground"
            >
              <InstagramIcon className="h-4 w-4" />
            </Link>
            <Link href="/" className="text-lg font-semibold">
              IA Financeira
            </Link>
            <span className="hidden sm:inline">-</span>
            <p className="text-sm text-muted-foreground">
              Inteligência financeira
            </p>
          </div>

          {/* Direitos Reservados */}
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;