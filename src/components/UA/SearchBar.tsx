import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, onSearch, placeholder = "Search...", ...props }, ref) => {
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      if (onSearch) {
        onSearch(newValue);
      }
    };

    const clearSearch = () => {
      setValue("");
      if (onSearch) {
        onSearch("");
      }
    };

    return (
      <div className={cn(
        "relative flex items-center w-full max-w-md",
        className
      )}>
        <div className="absolute left-3 text-muted-foreground">
          <Search size={18} className="transition-colors" />
        </div>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          className={cn(
            "w-full h-10 pl-10 pr-10 rounded-full bg-secondary border-transparent transition-all duration-200 outline-none",
            "text-foreground placeholder:text-muted-foreground",
            "focus:ring-1 focus:ring-primary/20 focus:border-primary/20",
            "hover:border-primary/10"
          )}
          placeholder={placeholder}
          {...props}
        />
        {value && (
          <button
            onClick={clearSearch}
            className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";