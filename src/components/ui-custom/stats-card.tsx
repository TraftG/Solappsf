
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cva, type VariantProps } from "class-variance-authority";

const statsCardVariants = cva("transition-all duration-300", {
  variants: {
    variant: {
      default: "",
      glass: "glass-card",
      outline: "border",
      gradient: "gradient-border",
    },
    size: {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

interface StatsCardProps extends VariantProps<typeof statsCardVariants> {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  valueClassName?: string;
  onClick?: () => void;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  variant,
  size,
  className,
  valueClassName,
  onClick,
}: StatsCardProps) {
  const trendColor = 
    trend === "up" ? "text-green-500" : 
    trend === "down" ? "text-red-500" : 
    "text-muted-foreground";
  
  return (
    <Card 
      className={cn(
        statsCardVariants({ variant, size }),
        className,
        onClick ? "cursor-pointer hover:shadow-lg" : ""
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col">
          <div className={cn("text-2xl font-bold", valueClassName)}>
            {value}
          </div>
          {(description || trendValue) && (
            <div className="flex items-center mt-1">
              {trendValue && (
                <span className={cn("text-xs font-medium mr-2", trendColor)}>
                  {trendValue}
                </span>
              )}
              {description && (
                <span className="text-xs text-muted-foreground">{description}</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
