  "use client";

  import {
    CSSProperties, // Tipo para estilos inline
    ReactElement,
    useEffect,
    useState,
    FC,
    useRef, // <<< ADICIONADO useRef AQUI
  } from "react";
  import { cn } from "@/lib/utils";

  // --- Definição da Animação CSS ---
  const sparkleAnimation = `
    @keyframes sparkle-pulse {
      0% {
        opacity: 0;
        transform: scale(0) rotate(75deg);
      }
      35% {
        opacity: 1;
        transform: scale(var(--sparkle-scale, 1)) rotate(120deg);
      }
      70% {
          opacity: 1;
          transform: scale(var(--sparkle-scale, 1)) rotate(120deg);
      }
      100% {
        opacity: 0;
        transform: scale(0) rotate(150deg);
      }
    }
  `;

  // --- Tipos ---
  interface SparkleData {
    id: string;
    x: string;
    y: string;
    color: string;
    delay: number;
    scale: number;
    lifespan: number;
    createdAt: number;
  }

  interface SparkleProps extends Omit<SparkleData, 'lifespan' | 'createdAt'> {}

  // --- Componente Sparkle (sem Framer Motion) ---
  const Sparkle: FC<SparkleProps> = ({ id, x, y, color, delay, scale }) => {
    // Estilos inline com a propriedade customizada
    const style = {
      left: x,
      top: y,
      fill: color,
      // <<< CORREÇÃO AQUI: Informa ao TS que '--sparkle-scale' é esperado
      '--sparkle-scale': scale.toString(),
      animation: `sparkle-pulse 1.1s ease-in-out ${delay}s infinite forwards`,
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 20, // Faíscas acima do texto base
      opacity: 0,
    } as CSSProperties; // <<< Type assertion para aceitar a custom property

    return (
      <svg
        key={id}
        style={style}
        width="21"
        height="21"
        viewBox="0 0 21 21"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
          // fill já está no style
        />
      </svg>
    );
  };

  interface SparklesTextProps {
    as?: ReactElement;
    className?: string;
    children: React.ReactNode;
    sparklesCount?: number;
    colors?: { first: string; second: string };
    sparkleLifespanMs?: number;
  }

  export const SparklesText: React.FC<SparklesTextProps> = ({
    children,
    colors = { first: "#9E7AFF", second: "#FE8BBB" },
    className,
    sparklesCount = 10,
    sparkleLifespanMs = 2500,
    as: Tag = <div />, // Use 'div' como padrão se 'as' não for fornecido
    ...props
  }) => {
    const [sparkles, setSparkles] = useState<SparkleData[]>([]);
    // <<< CORREÇÃO AQUI: useRef importado e usado corretamente
    const sparkleRef = useRef<HTMLDivElement>(null); // Usando HTMLDivElement como tipo padrão para a ref

    const generateSparkle = (): SparkleData => {
      const rect = sparkleRef.current?.getBoundingClientRect();
      // Garante que rect.width/height tenham um valor fallback se a ref ainda não estiver pronta
      const containerWidth = rect?.width ?? 100;
      const containerHeight = rect?.height ?? 50;

      const randomX = Math.random() * containerWidth;
      const randomY = Math.random() * containerHeight;

      return {
        id: String(Math.random().toString(36).substring(2, 9) + Date.now()),
        createdAt: Date.now(),
        color: Math.random() > 0.5 ? colors.first : colors.second,
        x: `${randomX}px`,
        y: `${randomY}px`,
        scale: Math.random() * 0.8 + 0.5,
        delay: Math.random() * 0.6,
        lifespan: Math.random() * (sparkleLifespanMs * 0.5) + (sparkleLifespanMs * 0.75),
      };
    };

    useEffect(() => {
      const initialSparkles = Array.from({ length: sparklesCount }).map(generateSparkle);
      setSparkles(initialSparkles);

      const intervalId = setInterval(() => {
        const now = Date.now();
        setSparkles((prevSparkles) =>
          prevSparkles.map((sparkle) => {
            if (now - sparkle.createdAt > sparkle.lifespan) {
              return generateSparkle();
            }
            return sparkle;
          })
        );
      }, 500);

      return () => clearInterval(intervalId);

    }, [sparklesCount, colors.first, colors.second, sparkleLifespanMs]);

    // Renderiza a Tag dinâmica baseada na prop 'as'
    const RenderedTag = Tag.type;

    return (
      <>
        <style>{sparkleAnimation}</style>
        <RenderedTag
          {...props}
          // Garante que a tag seja relativa e inline-block para a ref e posicionamento absoluto funcionarem
          className={cn("relative inline-block", className)}
          ref={sparkleRef}
        >
          {sparkles.map((sparkle) => (
            <Sparkle
              key={sparkle.id}
              id={sparkle.id}
              x={sparkle.x}
              y={sparkle.y}
              color={sparkle.color}
              delay={sparkle.delay}
              scale={sparkle.scale}
            />
          ))}
          {/* Texto principal, com z-index para ficar acima das faíscas se necessário */}
          <strong className="relative z-10">{children}</strong>
        </RenderedTag>
      </>
    );
  };