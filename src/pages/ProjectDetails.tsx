"use client";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/ui-custom/stats-card";
import { GameCard } from "@/components/ui-custom/game-card";
import { ValueChange } from "@/components/ui-custom/value-change";
import { getGameById, getTokensByGameId, games } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  ExternalLink,
  Link,
  Users,
  Wallet,
  TrendingUp,
  Image as ImageIcon,
  Twitter,
  MessageCircle,
} from "lucide-react";

const formatLargeNumber = (num: number) => {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState(getGameById(id || ""));
  const [relatedTokens, setRelatedTokens] = useState(getTokensByGameId(id || ""));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [similarGames, setSimilarGames] = useState<typeof games>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showIframe, setShowIframe] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    
    if (game) {
      const similar = games
        .filter((g) => g.id !== game.id && g.categories.some((cat) => game.categories.includes(cat)))
        .slice(0, 3);
      setSimilarGames(similar);
    }
    
  }, [game]);

  

  const handleOpenApp = () => {
    setShowSplash(true);
    setShowIframe(true);
  };

  const handleCloseIframe = () => {
    setShowIframe(false);
    setShowSplash(false);  // Скрыть заставку при закрытии iframe
  };
  

  if (!game) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <p className="text-muted-foreground mb-8">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <a href="/projects">Back to Projects</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
          <div className="text-center p-6 max-w-md">
            <h1 className="text-6xl font-bold font-neuropol  text-white mb-6 animate-pulse">Solapps</h1>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden h-[300px] mb-6">
        <div className={cn("w-full h-full bg-muted animate-pulse", imageLoaded ? "hidden" : "block")} />
        <img
          src={game.coverImage || game.image}
          alt={game.title}
          className={cn("w-full h-full object-cover", imageLoaded ? "opacity-100" : "opacity-0")}
          style={{ transition: "opacity 0.5s ease-in-out" }}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <div className="flex gap-2 mb-2">
                {game.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {category}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{game.title}</h1>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              {game.website && (
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={handleOpenApp}
                >
                  Open App
                </Button>
              )}
              {game.twitter && (
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                  asChild
                >
                  <a href={game.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4 mr-2" />
                  </a>
                </Button>
              )}
              {game.discord && (
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full bg-background/80 backdrop-blur-sm"
                  asChild
                >
                  <a href={game.discord} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">About {game.title}</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {game.fullDescription || game.description}
              </p>
            </CardContent>
          </Card>

          {/* Stats */}
          <div>
            <h2 className="text-xl font-bold mb-4">Key Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {game.monthlyActiveUsers && (
                <StatsCard
                  title="Monthly Active Users"
                  value={formatLargeNumber(game.monthlyActiveUsers)}
                  description="Active players"
                  icon={<Users className="h-5 w-5" />}
                  variant="outline"
                />
              )}
              {game.monthlyRevenue && (
                <StatsCard
                  title="Monthly Revenue"
                  value={`$${formatLargeNumber(game.monthlyRevenue)}`}
                  description="Last 30 days"
                  icon={<Wallet className="h-5 w-5" />}
                  variant="outline"
                />
              )}
              {game.tvl && (
                <StatsCard
                  title="Total Value Locked"
                  value={`$${formatLargeNumber(game.tvl)}`}
                  description="In-game assets"
                  icon={<TrendingUp className="h-5 w-5" />}
                  variant="outline"
                />
              )}
            </div>
          </div>

          {/* NFT Section */}
          {game.hasNft && (
            <div>
              <h2 className="text-xl font-bold mb-4">NFT Collection</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {game.nftFloorPrice && (
                  <StatsCard title="Floor Price" value={`${game.nftFloorPrice} SOL`} variant="outline" />
                )}
                {game.nftVolume && (
                  <StatsCard
                    title="Total Volume"
                    value={`$${formatLargeNumber(game.nftVolume)}`}
                    variant="outline"
                  />
                )}
              </div>
              <div className="mt-4">
                <Button className="rounded-full bg-solana" asChild>
                  <a href="https://magiceden.io" target="_blank" rel="noopener noreferrer">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    View on Magic Eden
                  </a>
                </Button>
              </div>
            </div>
          )}

          {/* Similar Projects */}
          {similarGames.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Similar Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarGames.map((similarGame) => (
                  <GameCard key={similarGame.id} {...similarGame} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Project Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className="capitalize">{game.status}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Has NFTs</span>
                  <Badge variant={game.hasNft ? "default" : "outline"}>{game.hasNft ? "Yes" : "No"}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Has Token</span>
                  <Badge variant={game.hasToken ? "default" : "outline"}>
                    {game.hasToken ? game.tokenSymbol || "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Iframe Modal */}
      {showIframe && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
          <button
            onClick={handleCloseIframe}  // Теперь вызываем функцию, которая закроет оба состояния
            className="absolute top-4 right-4 z-50 bg-white/80 text-black px-4 py-2 rounded-full shadow-lg transition opacity-80 hover:bg-white/70"
          >
            ✕ Close
          </button>
          <iframe
            src={game.website}
            className="w-full h-full"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;