import {
  NavigationMenu,
  // NavigationMenuItem, // <= Removido
  // NavigationMenuLink, // <= Removido
  NavigationMenuList, // <= Mantido (estrutura ul)
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
// import Link from "next/link"; // <= Removido

export const NavMenu = (props: NavigationMenuProps) => (
  // A estrutura principal é mantida, mas a lista está vazia
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      {/* Nenhum NavigationMenuItem aqui */}
    </NavigationMenuList>
  </NavigationMenu>
);

// Alternativa ainda mais limpa (se você tem certeza que NUNCA mais vai usar esses links aqui):
// export const NavMenu = (props: NavigationMenuProps) => {
//   // Retorna null pois não há itens a serem exibidos neste componente específico
//   return null;
// };