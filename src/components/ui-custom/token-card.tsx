
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ValueChange } from "./value-change";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

export interface TokenCardProps {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  className?: string;
  style?: React.CSSProperties;
}

export function TokenCard({
  id,
  name,
  symbol,
  icon,
  price,
  priceChange24h,
  marketCap,
  volume24h,
  className,
  style,
}: TokenCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Format numbers for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 0.01 ? 6 : 2,
      maximumFractionDigits: value < 0.01 ? 6 : 2,
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`;
    } else if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    } else if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <Link to={`/tokens/${id}`}>
      <Card 
        className={cn("hover:shadow-md transition-all duration-300 hover:-translate-y-1", className)}
        style={style}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 flex-shrink-0">
              <div className={cn("w-10 h-10 rounded-full bg-muted animate-pulse", imageLoaded ? "hidden" : "block")} />
              <img
                src={icon}
                alt={name}
                className={cn(
                  "w-full h-full rounded-full object-cover transition-all duration-500",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-1">
                <h3 className="font-medium">{name}</h3>
                <span className="text-sm text-muted-foreground">{symbol}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2 text-lg">{formatCurrency(price)}</span>
                <ValueChange value={priceChange24h} />
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Market Cap</div>
              <div className="font-medium">{formatLargeNumber(marketCap)}</div>
              <div className="text-xs text-muted-foreground mt-1">Vol: {formatLargeNumber(volume24h)}</div>
            </div>
            <ExternalLink size={16} className="text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
