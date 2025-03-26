import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface GameCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  banner?: string;
  categories: string[];
  status: "live" | "development" | "concept";
  hasNft: boolean;
  hasToken: boolean;
  website?: string;
  twitter?: string;
  discord?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function GameCard({
  id,
  title,
  description,
  image,
  banner,
  categories,
  status,
  hasNft,
  hasToken,
  className,
  style,
}: GameCardProps) {
  return (
    <Link to={`/project/${id}`}>
      <Card className={cn("group overflow-hidden transition-all hover:shadow-lg", className)} style={style}>
        {/* Баннер */}
        <div className="relative h-48 w-full">
          <img 
            src={banner || image} 
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            <Badge variant={status === "live" ? "default" : "outline"}>
              {status === "live" ? "Запущен" : status === "development" ? "В разработке" : "Концепт"}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {categories.slice(0, 3).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {categories.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{categories.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            {hasNft && (
              <Badge variant="secondary" className="text-xs">NFT</Badge>
            )}
            {hasToken && (
              <Badge variant="secondary" className="text-xs">Токен</Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
