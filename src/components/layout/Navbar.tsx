import React, { useState, useEffect } from "react";
import { SearchBar } from "../UA/SearchBar";
import { Button } from "../UA/Button";
import { Menu, Bell, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-3",
        scrolled 
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-full hover:bg-secondary transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="hidden md:block">
            <SearchBar className="w-64 lg:w-80" placeholder="Search metrics, reports, API..." />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 rounded-full hover:bg-secondary transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <div className="border-l border-border h-6 mx-1 hidden md:block"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={16} />
            </div>
            <div className="hidden md:flex flex-col text-sm">
              <span className="font-medium">User Name</span>
              <span className="text-xs text-muted-foreground">Administrator</span>
            </div>
            <ChevronDown size={16} className="text-muted-foreground hidden md:block" />
          </div>
        </div>
      </div>
      
      <div className="mt-3 md:hidden px-2">
        <SearchBar placeholder="Search..." />
      </div>
    </header>
  );
};