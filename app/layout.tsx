// app/layout.tsx

// --- Imports Essenciais ---
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script';
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import MetaPixelEvents from '@/components/MetaPixelEvents';
import { cn } from "@/lib/utils";
import "./globals.css";
// REMOVIDO: import dynamic from 'next/dynamic'; // Não é mais necessário aqui
// REMOVIDO: imports estáticos de OnlineUsersBox e PurchaseNotification

// <<< Importa o NOVO componente Wrapper >>>
import ClientOnlyComponents from "@/components/layout/ClientOnlyComponents"; 

// --- Configuração da Fonte ---
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

// --- Metadata ---
export const metadata: Metadata = {
  title: "IA Financeira",
  description: "Inteligência financeira",
  other: { 'facebook-domain-verification': 'fkhjt7wou7n6glo7ssdmgmyo4p2zr1' },
  icons: [
    { rel: "icon", url: "/icon_ia_financeira_preto.svg" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "icon", type: "image/png", url: "/favicon-32x32.png", sizes: "32x32" },
    { rel: "icon", type: "image/png", url: "/favicon-16x16.png", sizes: "16x16" },
    { rel: "icon", type: "image/png", url: "/android-chrome-192x192.png", sizes: "192x192" },
    { rel: "icon", type: "image/png", url: "/android-chrome-512x512.png", sizes: "512x512" },
  ],
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
};

// REMOVIDO: Definições de DynamicOnlineUsersBox e DynamicPurchaseNotification daqui

// --- Componente RootLayout ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="pt-BR" className={cn(fontSans.variable)} suppressHydrationWarning>
      <body
        className={cn(
          "relative flex min-h-screen w-full flex-col scroll-smooth bg-background font-sans antialiased"
        )}
      >
        {/* Pixel e Scripts (Mantidos) */}
        <MetaPixelEvents />
        {pixelId && (
          <Script
            id="fb-pixel-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '${pixelId}'); fbq('track', 'PageView');`,
            }}
          />
        )}

        {/* Providers (Mantidos) */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
             {/* Navbar pode ser renderizada aqui */}
             {/* <Navbar /> */}
            {children}
          </TooltipProvider>
        </ThemeProvider>

        {/* --- Renderiza o Wrapper Client --- */}
        {/* Este wrapper agora contém a lógica dynamic() com ssr: false */}
        <ClientOnlyComponents /> 

      </body>
    </html>
  );
}