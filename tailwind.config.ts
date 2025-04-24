// tailwind.config.ts

import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
// Importa as fontes padrão do Tailwind
import { fontFamily } from "tailwindcss/defaultTheme"; 

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // theme sem extend: Se você precisar de configurações básicas aqui, mantenha.
    // Geralmente, configurações como 'container' ficam aqui se você NÃO quer herdar do padrão.
    // Exemplo (se você customiza o container):
    container: { 
      center: true,
      padding: "2rem", // Ajuste o padding padrão do container se necessário
      screens: {
        "2xl": "1400px", // Ajuste o breakpoint máximo do container se necessário
      },
    },
    extend: { // Configurações que ADICIONAM ou MODIFICAM o tema padrão
      // --- CORREÇÃO DA FONTE APLICADA AQUI ---
      fontFamily: {
        // Define 'sans' para usar a variável CSS --font-sans (da fonte Inter)
        // e inclui as fontes padrão do Tailwind como fallback
        sans: ["var(--font-sans)", ...fontFamily.sans],
        // Você pode adicionar outras famílias aqui se precisar, ex:
        // serif: ["var(--font-serif)", ...fontFamily.serif], 
      },
      // --- FIM DA CORREÇÃO DA FONTE ---
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        xs: "375px",
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        // Adicione outras animações aqui se necessário
        // Ex: "shine-pulse": "shine-pulse var(--shine-pulse-duration) infinite linear",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
         // Adicione outros keyframes aqui se necessário
         // Ex: 'shine-pulse': { /* ... keyframes do shine-pulse ... */ },
      },
    },
  },
  plugins: [animate], // Mantém o plugin tailwindcss-animate
} satisfies Config;