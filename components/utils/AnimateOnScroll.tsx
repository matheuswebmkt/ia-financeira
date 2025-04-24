// components/utils/AnimateOnScroll.tsx
"use client"; 

import React, { useRef, useEffect, useState, ElementType, RefObject } from 'react'; // Importa RefObject
import { cn } from "@/lib/utils";

// Hook interno com tipagem de retorno corrigida
// Agora retorna RefObject<HTMLElement | null>
function useIntersectionObserver(options: IntersectionObserverInit = {}): [RefObject<HTMLElement | null>, boolean] { // <--- CORREÇÃO AQUI
  const [isIntersecting, setIsIntersecting] = useState(false);
  // useRef tipado como HTMLElement, inicializado com null
  const ref = useRef<HTMLElement>(null); 

  useEffect(() => {
    const element = ref.current; // element é HTMLElement | null
    if (!element) return; // Sai se for null

    const observer = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
      // Verifica se está intersectando E se o estado ainda não é true
      if (entry.isIntersecting && !isIntersecting) { 
        setIsIntersecting(true);
        observer.unobserve(element); 
      }
    }, {
      threshold: options.threshold ?? 0.1, 
      rootMargin: options.rootMargin,
      root: options.root,
    });

    observer.observe(element);

    // Cleanup usa a mesma variável 'element'
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  // Dependências explícitas
  }, [options.root, options.rootMargin, options.threshold, isIntersecting]); // Adiciona isIntersecting aqui para evitar re-checar se já é true

  // Retorna a ref (que pode ser null) e o estado
  return [ref, isIntersecting];
}


// Props do componente (sem mudanças aqui)
interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  as?: ElementType; // ElementType é mais flexível que React.ElementType
  disabled?: boolean;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  rootMargin,
  as: Tag = 'div',
  disabled = false,
}) => {
  const observerOptions = { threshold, rootMargin };
  // Recebe a ref como RefObject<HTMLElement | null>
  const [ref, isVisible] = useIntersectionObserver(observerOptions);

  const style = (!disabled && delay > 0) ? { transitionDelay: `${delay}s` } : undefined;
  const animationClasses = !disabled ? cn("animate-on-scroll", isVisible && "is-visible") : "";

  // O tipo RefObject<HTMLElement | null> é compatível com a prop 'ref' de tags HTML
  return (
    <Tag
      ref={ref}
      className={cn(animationClasses, className)}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default AnimateOnScroll;