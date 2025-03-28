import React from "react";
import { ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  isLoading?: boolean;
  prefix?: string;
  suffix?: string;
  description?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  trend,
  isLoading = false,
  prefix,
  suffix,
  description,
  className,
}) => {
  // Define color based on trend
  const getTrendColor = () => {
    if (trend === "up") return "text-emerald-500";
    if (trend === "down") return "text-red-500";
    
    return "text-muted-foreground";
  };

  const getTrendIcon = () => {
    if (trend === "up") return <ArrowUp size={14} className="text-emerald-500" />;
    if (trend === "down") return <ArrowDown size={14} className="text-red-500" />;
    return null;
  };

  return (
    <div 
      className={cn(
        "glass p-6 rounded-xl card-hover",
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      
      {isLoading ? (
        <div className="flex items-center space-x-2 animate-pulse h-10">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          <div className="h-8 w-24 bg-muted rounded"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="text-3xl font-semibold tracking-tight flex items-baseline">
            {prefix && <span className="text-xl mr-1">{prefix}</span>}
            <span className="animate-fade-in">{value}</span>
            {suffix && <span className="text-xl ml-1">{suffix}</span>}
          </div>
          
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={cn("text-sm font-medium", getTrendColor())}>
                {change > 0 ? "+" : ""}
                {change}%
              </span>
              <span className="text-sm text-muted-foreground ml-1">vs last period</span>
            </div>
          )}
          
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};