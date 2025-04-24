// src/app/(marketing)/layout.tsx

// Imports de Componentes de UI e Utilitários (Mantidos)
import { MainNav } from "@/components/main-nav";
import MobileNav from "@/components/mobile-nav";
import { SiteFooter } from "@/components/site-footer";
import { ModeToggle } from "@/components/toggle";
import { Button, buttonVariants } from "@/components/ui/button"; // Importe Button se for usar em outros lugares
import { cn } from "@/lib/utils";
import Link from "next/link"; // Mantido para links internos se houver
import { ThemeProvider } from "@/components/theme-provider"; // Remova se já estiver no layout raiz (app/layout.tsx)



// Metadata (Assumindo que você tenha, pode precisar ajustar se usava dados do usuário)
// import type { Metadata } from "next";
// export const metadata: Metadata = { ... };

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // REMOVIDO: Busca de usuário e lógica de autenticação
  // const user = await getCurrentUser();
  // const isAuthenticated = !!user;

  // Agora retorna APENAS o layout de marketing, sempre
  return (
    <>
      {/* ThemeProvider geralmente pertence ao layout raiz (app/layout.tsx)
          Se você já tem lá, remova daqui. Se não, descomente e ajuste.
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
      <div className="flex min-h-screen flex-col">
        <header className="h-16 container sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between py-6 w-full">
            {/* Componentes de Navegação (MobileNav pode precisar de ajustes se tinha itens de usuário) */}
            <MobileNav />
            <MainNav />
            <nav>
              <div className="md:flex">
                <div className="flex gap-4 items-center">
                  <ModeToggle />
                  {/* Link externo (Mantido) */}
                  <a
                    href="https://pay.cakto.com.br/sgh6rzk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" }),
                      "px-4"
                    )}
                  >
                    Clique aqui
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </header>

        {/* Conteúdo da página específica */}
        <main className="flex-1">{children}</main>

        {/* Rodapé */}
        <SiteFooter />
      </div>

      

      {/* Fechamento do ThemeProvider se iniciado aqui */}
      {/* </ThemeProvider> */}
    </>
  );
}