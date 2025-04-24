// components/utils/AnimateOnScroll.tsx
"use client"; // ESSENCIAL: Este componente usa hooks

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Hook interno (ou importe se já o tiver em outro lugar)
function useIntersectionObserver(options: IntersectionObserverInit = {}): [React.RefObject<any>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Atualiza o estado APENAS quando muda para intersecting=true
      if (entry.isIntersecting && !isIntersecting) { // Adicionado '!isIntersecting' para evitar re-renders desnecessários se já estiver visível
        setIsIntersecting(true);
        // Desconecta após a primeira vez para animação 'once'
        observer.unobserve(element); 
      }
      // Não faz nada se sair da view ou já estiver visível
    }, {
      threshold: 0.1, // Default threshold, pode ser sobrescrito via props
      ...options,
    });

    observer.observe(element);

    // Cleanup
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.root, options.rootMargin, options.threshold]); // Dependências mais explícitas

  return [ref, isIntersecting];
}


// Props do componente
interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string; // Para classes adicionais no wrapper
  delay?: number;     // Delay em segundos (ex: 0.1, 0.2)
  threshold?: number; // Threshold do observer (0 a 1)
  rootMargin?: string; // Root margin do observer
  as?: React.ElementType; // Tag HTML a ser usada (default: div)
  disabled?: boolean; // Para desabilitar a animação se necessário
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className,
  delay = 0, // Default sem delay
  threshold = 0.1,
  rootMargin,
  as: Tag = 'div', // Usa 'div' como padrão
  disabled = false,
}) => {
  const observerOptions = { threshold, rootMargin };
  const [ref, isVisible] = useIntersectionObserver(observerOptions);

  // Calcula o estilo de delay apenas se houver delay e não estiver desabilitado
  const style = (!disabled && delay > 0) ? { transitionDelay: `${delay}s` } : undefined;

  // Define as classes de animação
  const animationClasses = !disabled ? cn("animate-on-scroll", isVisible && "is-visible") : "";

  return (
    <Tag
      ref={ref}
      className={cn(animationClasses, className)} // Combina classes de animação com as passadas
      style={style}
    >
      {children}
    </Tag>
  );
};

export default AnimateOnScroll;