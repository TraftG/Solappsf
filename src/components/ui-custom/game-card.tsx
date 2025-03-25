
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tag } from "./tag";
import { Link } from "react-router-dom";

export interface GameCardProps {
  id: string;
  title: string;
  description?: string;
  image: string;
  categories?: string[];
  status?: "live" | "development" | "concept";
  hasNft?: boolean;
  hasToken?: boolean;
  className?: string;
}

export function GameCard({
  id,
  title,
  description,
  image,
  categories = [],
  status = "live",
  hasNft = false,
  hasToken = false,
  className,
}: GameCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const statusColors = {
    live: "success",
    development: "warning",
    concept: "info",
  } as const;

  return (
    <Link to={`/projects/${id}`}>
      <Card className={cn("game-card overflow-hidden", className)}>
        <div className="h-full flex flex-col">
          <div className="relative">
            <AspectRatio ratio={16 / 9}>
              <div className={cn("w-full h-full bg-muted animate-pulse", imageLoaded ? "hidden" : "block")} />
              <img
                src={image}
                alt={title}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
              />
            </AspectRatio>
            <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end">
              {status && (
                <Tag color={statusColors[status]} size="sm">
                  {status === "live" ? "Live" : status === "development" ? "In Development" : "Concept"}
                </Tag>
              )}
            </div>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-medium text-lg mb-1">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
            )}
            <div className="mt-auto flex flex-wrap gap-1">
              {categories.slice(0, 3).map((category) => (
                <Badge key={category} variant="outline" className="bg-secondary">
                  {category}
                </Badge>
              ))}
              {hasNft && (
                <Badge variant="outline" className="bg-secondary/50 text-foreground/80">
                  NFT
                </Badge>
              )}
              {hasToken && (
                <Badge variant="outline" className="bg-secondary/50 text-foreground/80">
                  Token
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
