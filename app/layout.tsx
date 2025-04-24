// app/layout.tsx

// Imports existentes...
import { MainNav } from "@/components/main-nav";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/toggle";
// import { SiteFooter } from "@/components/site-footer"; // REMOVER DAQUI SE ESTIVER NO MarketingLayout
import MobileNav from "@/components/mobile-nav";
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import MetaPixelEvents from '@/components/MetaPixelEvents';

// Font e Metadata existentes...
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "IA Financeira",
  description: "Inteligência financeira",
  icons: {
    icon: "/icon_ia_financeira_preto.svg",
  },
  other: {
    'facebook-domain-verification': 'fkhjt7wou7n6glo7ssdmgmyo4p2zr1',
  },
};


export default function RootLayout({
  children, // Recebe children
}: {
  children: React.ReactNode;
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="pt-BR" className={cn(fontSans.variable)} suppressHydrationWarning>
      <head>
          {/* Scripts que precisam estar no head podem ir aqui se necessário */}
          {/* O script base do Pixel geralmente vai no body, como você fez */}
      </head>
      <body
        className={cn(
          // Mantenha suas classes do body
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        {/* Providers devem envolver os children */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Ou "system" se preferir
          enableSystem
          disableTransitionOnChange
        >
          {/* Conteúdo Principal da Aplicação */}
          {children}

          {/* Componentes Globais como Toaster */}
          <Toaster />

          {/* Scripts e Ferramentas de Análise */}
          <SpeedInsights />
          <Analytics />
          <MetaPixelEvents />
          {pixelId && (
            <Script
              id="fb-pixel-base"
              strategy="afterInteractive" // Boa estratégia para o pixel
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

          {/* REMOVA O SiteFooter daqui se ele já está sendo renderizado no MarketingLayout */}
          {/* <SiteFooter /> */}

        </ThemeProvider>
      </body>
    </html>
  );
}