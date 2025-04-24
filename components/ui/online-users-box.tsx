'use client'; // Necessário pois usa useState e useEffect

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; // Importe sua função cn

const OnlineUsersBox: React.FC = () => {
  // Estado para guardar o número de usuários
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Função para gerar o número aleatório na faixa desejada
  const generateRandomCount = () => {
    // Gera número entre 15 e 30 (inclusive)
    return Math.floor(Math.random() * (30 - 15 + 1)) + 15;
  };

  useEffect(() => {
    // Define o número inicial ao montar o componente
    setOnlineCount(generateRandomCount());
    setIsVisible(true); // Torna o componente visível após a montagem

    // Configura o intervalo para atualizar a cada 5 segundos
    const intervalId = setInterval(() => {
      setOnlineCount(generateRandomCount());
    }, 5000); // 5000ms = 5s

    // Função de limpeza: remove o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []); // Array de dependências vazio garante que o efeito rode apenas uma vez na montagem

  // Não renderiza nada se o contador ainda for 0 (antes da primeira atualização)
  if (onlineCount === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        // Estilos base (equivalentes ao seu .online-box)
        "fixed bottom-5 right-5 z-50", // Posicionamento e z-index
        "flex items-center gap-2", // Layout flexível
        "rounded-lg border border-white/20", // Borda e arredondamento
        "bg-black/40 backdrop-blur-md", // Fundo com transparência e blur
        "px-5 py-3", // Padding
        "text-base font-semibold text-white shadow-lg", // Texto e sombra
        // Estilos responsivos
        "max-md:bottom-2.5 max-md:right-2.5", // Posição mobile
        "max-md:px-4 max-md:py-2.5", // Padding mobile
        "max-md:text-sm", // Fonte mobile

        // Animação de entrada e saída
        "transition-all duration-500 ease-in-out", // Transição suave
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5" // Estados de visibilidade
      )}
      style={{
        transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out', // Transição nativa
      }}
    >
      <span>👁️</span>
      <span className="tabular-nums">{onlineCount}</span> {/* tabular-nums ajuda a evitar que a largura mude muito */}
      <span>pessoas agora nessa página</span>
    </div>
  );
};

export default OnlineUsersBox;