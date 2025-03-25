
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValueChangeProps {
  value: number;
  prefix?: string;
  suffix?: string;
  showIcon?: boolean;
  iconOnly?: boolean;
  className?: string;
  reverseColors?: boolean;
}

export function ValueChange({
  value,
  prefix = "",
  suffix = "%",
  showIcon = true,
  iconOnly = false,
  className,
  reverseColors = false
}: ValueChangeProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;
  
  // Determine color based on value and reverse setting
  const colorClass = reverseColors
    ? isPositive
      ? "text-red-500"
      : isNegative
      ? "text-green-500"
      : "text-muted-foreground"
    : isPositive
    ? "text-green-500"
    : isNegative
    ? "text-red-500"
    : "text-muted-foreground";

  // Format value for display
  const displayValue = Math.abs(value).toFixed(2);
  
  // Icon component based on trend
  const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  
  return (
    <span className={cn("inline-flex items-center", colorClass, className)}>
      {showIcon && (
        <Icon size={iconOnly ? 18 : 14} className={iconOnly ? "" : "mr-1"} />
      )}
      {!iconOnly && (
        <>
          {isPositive && "+"}
          {prefix}
          {displayValue}
          {suffix}
        </>
      )}
    </span>
  );
}
