import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

// Sample data structure
interface DataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

interface ActivityChartProps {
  data: DataPoint[];
  title: string;
  description?: string;
  height?: number;
  className?: string;
  areaColor?: string;
  isLoading?: boolean;
}

export const ActivityChart: React.FC<ActivityChartProps> = ({
  data,
  title,
  description,
  height = 300,
  className,
  areaColor = "hsl(var(--primary))",
  isLoading = false,
}) => {
  // Generating gradient id to avoid conflicts with multiple charts
  const gradientId = `chartGradient-${Math.random().toString(36).substring(2, 9)}`;

  if (isLoading) {
    return (
      <div className={cn("glass p-6 rounded-xl", className)}>
        <div className="mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-[200px] bg-muted rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("glass p-6 rounded-xl", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      
      <div className="w-full animate-fade-in" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={areaColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={areaColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="hsl(var(--border))" 
            />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              }}
              itemStyle={{ color: 'hsl(var(--card-foreground))' }}
              labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={areaColor} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#${gradientId})`} 
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
