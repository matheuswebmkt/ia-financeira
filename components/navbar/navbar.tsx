import { Button } from "@/components/ui/button";
import NavbarGetStartedButton from "./NavbarGetStartedButton";
import { Logo } from "./logo";
import ThemeToggle from "../theme-toggle";

const Navbar = () => {
  return (
    <nav className="fixed z-10 top-6 inset-x-4 h-14 xs:h-16 bg-background/50 backdrop-blur-sm border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <NavbarGetStartedButton className="hidden xs:inline-flex">Clique aqui</NavbarGetStartedButton>

          {/* Mobile Menu */}
          <div className="md:hidden">
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
