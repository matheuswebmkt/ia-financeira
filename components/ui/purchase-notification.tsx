// src/components/ui/fake-purchase-notification.tsx
'use client'; // Essencial para useState, useEffect

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils'; // Mantemos o cn para classes condicionais

// --- Configurações ---
const VISIBILITY_DURATION = 5000;    // 5 segundos visível
const NOTIFICATION_INTERVAL = 10000; // 10 segundos de intervalo entre o FIM de uma e o INÍCIO da próxima
const INITIAL_DELAY = 5000;          // 5 segundos de espera inicial
const ANIMATION_DURATION = 500;      // Duração da animação CSS em ms (deve corresponder a duration-500)

// --- Lista de Nomes (Usando a lista do seu último exemplo) ---
const Names = [
  "Carlos S.", "Juliana M.", "Ricardo P.", "Fernanda A.", "Lucas B.",
  "Mariana C.", "Gustavo L.", "Beatriz F.", "Rafael G.", "Larissa R.",
  "Thiago O.", "Camila V.", "Rodrigo T.", "Amanda N.", "Daniel K.",
  "Sofia D.", "Eduardo J.", "Isabela Q.", "Felipe W.", "Laura X.",
  "Bruno Z.", "Gabriela Y."
];

const PurchaseNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentName, setCurrentName] = useState<string | null>(null);

  // Refs para armazenar os IDs dos timers
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref para o timeout de limpeza do nome

  // Função para mostrar uma nova notificação
  const showNotification = () => {
    // Limpa qualquer timeout anterior para esconder E para limpar o nome
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    if (cleanupTimeoutRef.current) {
      clearTimeout(cleanupTimeoutRef.current);
    }

    // Seleciona um nome aleatório
    const randomName = Names[Math.floor(Math.random() * Names.length)];
    setCurrentName(randomName); // Define o nome ANTES de tornar visível
    setIsVisible(true);      // Torna visível, iniciando a animação de entrada (via CSS)

    // Configura um timeout para INICIAR o processo de esconder
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false); // Inicia a animação de saída (via CSS)

      // Configura um timeout para limpar o nome APÓS a animação de saída terminar
      cleanupTimeoutRef.current = setTimeout(() => {
        setCurrentName(null); // Limpa o nome somente após a animação de 500ms
      }, ANIMATION_DURATION); // Usa a constante da duração da animação

    }, VISIBILITY_DURATION);
  };

  useEffect(() => {
    // Inicia após o delay inicial
    const initialTimeoutId = setTimeout(() => {
      showNotification(); // Mostra a primeira notificação

      // Configura o intervalo para as próximas notificações
      // O intervalo começa APÓS a primeira notificação ter sido mostrada (e seu ciclo de visibilidade iniciado)
      intervalRef.current = setInterval(() => {
        showNotification();
      }, NOTIFICATION_INTERVAL + VISIBILITY_DURATION); // Intervalo entre o INÍCIO de uma e o INÍCIO da próxima

    }, INITIAL_DELAY);

    // Função de limpeza ESSENCIAL
    return () => {
      clearTimeout(initialTimeoutId); // Limpa o timeout inicial
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current); // Limpa o timeout de visibilidade/início da saída
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Limpa o intervalo principal
      }
      if (cleanupTimeoutRef.current) { // Limpa o timeout de limpeza do nome
        clearTimeout(cleanupTimeoutRef.current);
      }
    };
  }, []); // Roda apenas uma vez na montagem

  return (
    // Usamos um div normal agora, sem AnimatePresence ou motion.div
    <div
      className={cn(
        // --- Estilos Base ---
        "fixed z-50", // Posicionamento e Z-index
        "bottom-20 right-5", // Posição Desktop
        "w-[350px] max-w-[90%]", // Largura
        "flex flex-col items-center justify-center gap-1", // Layout flex
        "rounded-lg border border-white/20", // Borda
        "bg-black/40 backdrop-blur-md", // Fundo
        "px-5 py-4", // Padding
        "text-base font-semibold text-white text-center shadow-lg", // Texto
        // Responsividade
        "max-md:bottom-16 max-md:right-4", // Posição Mobile
        "max-md:px-4 max-md:py-3",         // Padding Mobile
        "max-md:text-sm",                  // Fonte Mobile
        "max-md:max-w-[90%]",              // Garantir max-width mobile
        "max-md:w-auto",                   // Permitir largura automática mobile

        // --- Transição CSS ---
        "transition-all ease-in-out", // Habilita a transição para todas as propriedades
        `duration-${ANIMATION_DURATION}`, // Define a duração da animação (500ms)

        // --- Estados da Animação (controlados por isVisible) ---
        // Estado Visível: Opaco 100, Posição Y normal
        // Estado Oculto (Inicial e Final): Opaco 0, Deslocado para baixo (translate-y-5 = 20px)
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
      // Atributos de acessibilidade
      aria-live="polite"
      aria-hidden={!isVisible && !currentName} // Esconde de leitores de tela quando animando para fora ou oculto
    >
      {/* Renderiza o conteúdo interno apenas se houver um nome.
          Isso garante que o texto só desapareça após a animação de saída,
          pois currentName só se torna null após ANIMATION_DURATION. */}
      {currentName && (
        <>
          <span className="flex items-center gap-1.5">
            <span className="text-[#C4FF02]">{currentName}</span>
            <span>acabou de comprar! ✅</span>
          </span>
          <span>+1 IA Anti-dívidas foi ativada!</span>
        </>
      )}
    </div>
  );
};

export default PurchaseNotification;