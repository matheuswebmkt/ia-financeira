"use client";

import {
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback, // Adicionado para otimizar o handler de scroll
} from "react";

import { cn } from "@/lib/utils"; // Mantenha sua função de utilidade cn

// --- Funções Auxiliares ---
// Função para prender um valor entre um mínimo e um máximo (clamp)
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Função para mapear um valor de um intervalo de entrada para um intervalo de saída
// (Replica a funcionalidade básica do useTransform para este caso)
function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
): number {
  // Evita divisão por zero se o intervalo de entrada for zero
  if (inputMin === inputMax) {
      // Retorna o valor inicial ou final dependendo de onde 'value' está
       return value <= inputMin ? outputMin : outputMax;
  }
  // Calcula o progresso dentro do intervalo de entrada (0 a 1)
  const progress = clamp((value - inputMin) / (inputMax - inputMin), 0, 1);
  // Mapeia o progresso para o intervalo de saída
  return outputMin + progress * (outputMax - outputMin);
}
// --- Componentes ---

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextRevealOnly: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  // Estado para armazenar o progresso do scroll (0 a 1)
  const [scrollProgress, setScrollProgress] = useState(0);

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  // Handler de scroll memoizado com useCallback
  const handleScroll = useCallback(() => {
    if (!targetRef.current) return;

    const element = targetRef.current;
    const rect = element.getBoundingClientRect();
    const elementHeight = element.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Calcula a distância total de scroll "efetiva" para a animação
    // (Altura do elemento menos a altura da viewport)
    // Isso representa quanto o elemento precisa "passar" pela viewport
    // para ir de totalmente fora de vista na parte inferior para totalmente
    // fora de vista na parte superior.
    const scrollableDistance = elementHeight - viewportHeight;

    // Se o elemento for menor ou igual à viewport, o cálculo padrão não funciona bem.
    // Pode-se definir um comportamento (ex: sempre 0 ou 1) ou ajustar.
    // Por simplicidade, vamos manter o cálculo original que funciona bem
    // para elementos maiores que a viewport (como o h-[200vh]).
    if (scrollableDistance <= 0) {
      // Elemento menor ou igual à viewport. A animação pode não ocorrer como esperado.
      // Poderíamos definir o progresso baseado se está visível ou não.
      // Por enquanto, vamos definir como 0 ou 1 baseado na posição.
      if (rect.top >= 0 && rect.bottom <= viewportHeight) {
         setScrollProgress(1); // Totalmente visível
      } else if (rect.bottom < 0 || rect.top > viewportHeight) {
         setScrollProgress(0); // Fora da vista
      } else {
         // Parcialmente visível, pode tentar um cálculo diferente se necessário
         const progress = clamp(-rect.top / elementHeight, 0, 1); // Progresso baseado na % visível
         setScrollProgress(progress);
      }
      return;
    }


    // Calcula o progresso. Progress = 0 quando o topo do elemento
    // atinge o topo da viewport. Progress = 1 quando o fundo do elemento
    // atinge o fundo da viewport. A fórmula -rect.top / scrollableDistance
    // aproxima este comportamento.
    const currentProgress = -rect.top / scrollableDistance;

    // Prende o progresso entre 0 e 1 e atualiza o estado
    setScrollProgress(clamp(currentProgress, 0, 1));
  }, []); // Sem dependências, pois lê valores atuais do DOM a cada chamada

  // Efeito para adicionar e remover o listener de scroll
  useEffect(() => {
    // Chama o handler uma vez no início para definir o estado inicial
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true }); // Use passive: true para melhor performance

    // Função de limpeza para remover o listener quando o componente desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Re-executa se handleScroll mudar (embora não deva com useCallback e deps vazias)

  return (
    // O targetRef agora está aqui, no container principal que define a área de scroll
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          // Sticky container que mantém o texto fixo enquanto o pai scrolla
          "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
        }
      >
        <p // Usando <p> para semântica, mas pode ser <span> se preferir
          className={
            "flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
          }
        >
          {words.map((word, i) => {
            // Calcula o intervalo de progresso (start, end) para esta palavra
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={i}
                // Passa o progresso atual do scroll (número)
                scrollProgress={scrollProgress}
                // Passa o intervalo específico desta palavra
                range={[start, end]}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  scrollProgress: number; // Recebe o progresso como número
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, scrollProgress, range }) => {
  // Calcula a opacidade usando a função mapRange (réplica do useTransform)
  // Mapeia o scrollProgress (que vai de 0 a 1 geral) para o intervalo [0, 1]
  // mas apenas quando o scrollProgress está dentro do 'range' da palavra.
  const opacity = mapRange(scrollProgress, range[0], range[1], 0, 1);

  return (
    <span className="xl:lg-3 relative mx-1 my-1 lg:mx-1.5"> {/* Adicionado my-1 para espaçamento vertical se quebrar linha */}
      {/* Span "fantasma" com baixa opacidade (igual ao original) */}
      <span className={"absolute opacity-30"} aria-hidden="true">
        {children}
      </span>
      {/* Span principal que terá sua opacidade animada via style */}
      <span
        style={{ opacity: opacity }} // Aplica a opacidade calculada diretamente
        className={"text-black dark:text-white"} // Mantém as classes de cor
      >
        {children}
      </span>
    </span>
  );
};