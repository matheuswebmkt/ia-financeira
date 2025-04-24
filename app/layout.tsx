// Imports essenciais de ambos os arquivos
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Sua fonte desejada
import Script from 'next/script';      // Para o script do Pixel
import { ThemeProvider } from "next-themes";  // Do template
import { TooltipProvider } from "@/components/ui/tooltip"; // Do template
import MetaPixelEvents from '@/components/MetaPixelEvents'; // Seu componente de eventos
import { cn } from "@/lib/utils";       // Utilitário de classe
import "./globals.css";                  // Estilos globais
import OnlineUsersBox from "@/components/ui/online-users-box";
// **** ADICIONADO: Importe o componente FakePurchaseNotification ****
import PurchaseNotification from "@/components/ui/purchase-notification";

// Configuração da sua fonte Inter
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // Define a variável CSS para o Tailwind usar
  display: 'swap',        // Melhora a performance de carregamento da fonte
});

// Metadados: Combina seus dados essenciais com ícones/configurações úteis do template
export const metadata: Metadata = {
  // Seus dados principais
  title: "IA Financeira",
  description: "Inteligência financeira",
  other: { // Sua verificação de domínio do Facebook
    'facebook-domain-verification': 'fkhjt7wou7n6glo7ssdmgmyo4p2zr1',
  },
  // Ícones: Combina o seu principal com os do template para melhor compatibilidade
  icons: [
    { rel: "icon", url: "/icon_ia_financeira_preto.svg" }, // Seu ícone principal
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", }, // Do template
    { rel: "icon", type: "image/png", url: "/favicon-32x32.png", sizes: "32x32", }, // Do template
    { rel: "icon", type: "image/png", url: "/favicon-16x16.png", sizes: "16x16", }, // Do template
    { rel: "icon", type: "image/png", url: "/android-chrome-192x192.png", sizes: "192x192", }, // Do template
    { rel: "icon", type: "image/png", url: "/android-chrome-512x512.png", sizes: "512x512", }, // Do template
  ],
  // Configurações úteis do template
  robots: { index: true, follow: true, },
  manifest: "/site.webmanifest", // Se você tiver um arquivo de manifesto
  // Você pode adicionar/modificar OpenGraph, keywords, etc., se necessário
  // openGraph: { ... },
  // keywords: [ ... ],
};

// Componente RootLayout
export default function RootLayout({
  children,
}: Readonly<{ // Usa Readonly do template, é uma boa prática
  children: React.ReactNode;
}>) {
  // Pega o ID do Pixel das variáveis de ambiente
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    // Define o idioma para pt-BR e adiciona a variável da fonte
    <html lang="pt-BR" className={cn(fontSans.variable)} suppressHydrationWarning>
      {/* <head /> não é necessário, Next.js gerencia */}
      <body
        className={cn(
          // Suas classes base para o body
          "relative flex min-h-screen w-full flex-col justify-center scroll-smooth bg-background font-sans antialiased"
          // A classe 'font-sans' aqui usa a variável CSS definida no <html>
        )}
      >
        {/* Pixel Events Component - Renderiza antes dos providers */}
        <MetaPixelEvents />
        {/* Script Base do Pixel - Renderiza condicionalmente */}
        {pixelId && (
          <Script
            id="fb-pixel-base"
            strategy="afterInteractive" // Carrega após a página ficar interativa
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

        {/* Providers do Template - Envolvem o conteúdo principal */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            {children} {/* Seu conteúdo da página (page.tsx, etc.) será renderizado aqui */}
          </TooltipProvider>
        </ThemeProvider>
        {/* **** Componente OnlineUsersBox adicionado anteriormente **** */}
        <OnlineUsersBox />
          {/* **** ADICIONADO: Componente FakePurchaseNotification **** */}
          <PurchaseNotification />
      </body>
    </html>
  );
}