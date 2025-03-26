import React from "react";
import { ArrowUpRight, Clock, AlertCircle, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "success" | "warning" | "info" | "error";
  link?: string;
}

interface RecentActivityProps {
  items: ActivityItem[];
  title?: string;
  viewAllLink?: string;
  className?: string;
  isLoading?: boolean;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  items,
  title = "Recent Activity",
  viewAllLink,
  className,
  isLoading = false,
}) => {
  // Icons for different activity types
  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "success":
        return <Check size={16} className="text-emerald-500" />;
      case "warning":
        return <AlertCircle size={16} className="text-amber-500" />;
      case "error":
        return <AlertCircle size={16} className="text-red-500" />;
      case "info":
      default:
        return <Clock size={16} className="text-blue-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className={cn("glass p-6 rounded-xl h-full", className)}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 bg-muted rounded-full flex-shrink-0"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("glass p-6 rounded-xl h-full", className)}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">{title}</h3>
        {viewAllLink && (
          <a 
            href={viewAllLink} 
            className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
          >
            View all <ArrowUpRight size={14} />
          </a>
        )}
      </div>
      
      <div className="space-y-5">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={cn(
              "group flex items-start gap-4 p-3 -mx-3 rounded-lg transition-colors",
              item.link && "hover:bg-secondary cursor-pointer"
            )}
            onClick={() => item.link && window.open(item.link, "_blank")}
          >
            <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center flex-shrink-0 border">
              {getIcon(item.type)}
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-medium">{item.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              <span className="text-xs text-muted-foreground mt-2 block">{item.timestamp}</span>
            </div>
            
            {item.link && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
