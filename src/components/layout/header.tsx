import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { WalletButton } from "../WalletButton";
import { ThemeToggle } from "../theme-toggle";
import { Search } from "../Search";
import { tokens } from "@/lib/data";
import { useSolanaPrice } from '@/hooks/useSolanaPrice';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { price } = useSolanaPrice();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-neuropol text-xl block">Solapps</span>
        </Link>

        {!isMobile && (
          <div className="hidden md:flex items-center space-x-6 mx-4 flex-grow justify-center">
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/tokens">Tokens</NavLink>
            <NavLink to="/developers">Developers</NavLink>
            <NavLink to="/swap">Swap</NavLink>
            {price !== null && (
              <div className="flex items-center gap-2 text-sm -ml-4">
                <span className="font-medium">SOL: ${price.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center space-x-3">
          <div className="w-full max-w-[200px] lg:max-w-[280px]">
            <Search />
          </div>
          <ThemeToggle />
          {isMobile ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link 
                    to="/projects" 
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Projects
                  </Link>
                  <Link 
                    to="/tokens" 
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Tokens
                  </Link>
                  <Link 
                    to="/developers" 
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Developers
                  </Link>
                  <Link 
                    to="/swap" 
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Swap
                  </Link>
                  {price !== null && (
                    <div className="text-lg font-medium">
                      SOL: ${price.toFixed(2)}
                    </div>
                  )}
                  <WalletButton />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <WalletButton />
          )}
        </div>
      </div>
    </header>
  );
}
interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

function NavLink({ to, children, className }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "text-foreground/70 hover:text-foreground transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-solana after:scale-x-0 after:origin-center after:transition-transform hover:after:scale-x-100",
        className
      )}
    >
      {children}
    </Link>
  );
}

