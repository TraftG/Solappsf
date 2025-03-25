
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatsCard } from "@/components/ui-custom/stats-card";
import { GameCard } from "@/components/ui-custom/game-card";
import { ValueChange } from "@/components/ui-custom/value-change";
import { getTokenById, getGamesByTokenId } from "@/lib/data";
import { fetchTokenPrice, TokenPrice } from "@/lib/api";
import { 
  ExternalLink, 
  Link as LinkIcon, 
  Twitter, 
  Wallet, 
  TrendingUp,
  BarChart,
  PieChart,
  MessageSquare,
  RefreshCw
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useToast } from "@/components/ui/use-toast";

// Mock price history data
const generatePriceHistory = (currentPrice: number, volatility: number = 0.05) => {
  const history = [];
  let price = currentPrice * 0.7; // Start at 70% of current price
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some randomness to price
    const change = (Math.random() - 0.5) * volatility;
    price = price * (1 + change);
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: price,
    });
  }
  
  // Ensure the last price matches the current price
  history[history.length - 1].price = currentPrice;
  
  return history;
};

const TokenDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [token, setToken] = useState(getTokenById(id || ""));
  const [relatedGames, setRelatedGames] = useState(getGamesByTokenId(id || ""));
  const [priceHistory, setPriceHistory] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState<"1d" | "7d" | "30d">("30d");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();
  
  useEffect(() => {
    if (token) {
      // Generate mock price history data
      const history = generatePriceHistory(token.price, 0.08);
      setPriceHistory(history);
      
      // Fetch current price on component mount
      fetchCurrentPrice();
    }
  }, [token?.id]);
  
  const fetchCurrentPrice = async () => {
    if (!token) return;
    
    setIsRefreshing(true);
    try {
      const priceData = await fetchTokenPrice(token.id);
      
      if (priceData) {
        // Update token with latest price data
        setToken(prev => {
          if (!prev) return prev;
          
          return {
            ...prev,
            price: priceData.price,
            priceChange24h: priceData.priceChange24h
          };
        });
        
        // Update price history to reflect current price
        setPriceHistory(prev => {
          const updatedHistory = [...prev];
          
          if (updatedHistory.length > 0) {
            updatedHistory[updatedHistory.length - 1].price = priceData.price;
          }
          
          return updatedHistory;
        });
        
        setLastUpdated(new Date());
        
        toast({
          title: "Price updated",
          description: `Latest ${token.symbol} price has been loaded from CoinGecko`,
        });
      }
    } catch (error) {
      console.error("Error fetching current price:", error);
      toast({
        title: "Failed to update price",
        description: "Could not fetch the latest price data. Will retry later.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Auto-refresh every 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrentPrice();
    }, 180000); // 3 minutes
    
    return () => clearInterval(interval);
  }, [token?.id]);
  
  const getTimeframeData = () => {
    if (timeframe === "1d") {
      return priceHistory.slice(-2);
    } else if (timeframe === "7d") {
      return priceHistory.slice(-8);
    }
    return priceHistory;
  };
  
  const timeframeData = getTimeframeData();
  const priceChange = timeframeData.length > 1 
    ? ((timeframeData[timeframeData.length - 1].price / timeframeData[0].price) - 1) * 100
    : 0;
  
  if (!token) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Token not found</h1>
        <p className="text-muted-foreground mb-8">
          The token you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <a href="/tokens">Back to Tokens</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Token Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
            <img src={token.icon} alt={token.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{token.name}</h1>
              <span className="text-xl text-muted-foreground">{token.symbol}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-medium">${token.price.toFixed(token.price < 0.01 ? 6 : 2)}</span>
              <ValueChange value={token.priceChange24h} />
              <Button 
                variant="ghost" 
                size="icon"
                className="h-6 w-6"
                onClick={fetchCurrentPrice}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <span className="text-xs text-muted-foreground">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          {token.website && (
            <Button size="sm" variant="outline" className="rounded-full" asChild>
              <a href={token.website} target="_blank" rel="noopener noreferrer">
                <LinkIcon className="h-4 w-4 mr-2" />
                Website
              </a>
            </Button>
          )}
          {token.twitter && (
            <Button size="sm" variant="outline" className="rounded-full" asChild>
              <a href={token.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </a>
            </Button>
          )}
          {token.telegram && (
            <Button size="sm" variant="outline" className="rounded-full" asChild>
              <a href={token.telegram} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-4 w-4 mr-2" />
                Telegram
              </a>
            </Button>
          )}
          <Button className="rounded-full bg-solana" asChild>
            <a href="https://jup.ag" target="_blank" rel="noopener noreferrer">
              <Wallet className="h-4 w-4 mr-2" />
              Buy on Jupiter
            </a>
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Price Chart */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Price Chart</h2>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant={timeframe === "1d" ? "default" : "outline"}
                    onClick={() => setTimeframe("1d")}
                  >
                    1D
                  </Button>
                  <Button 
                    size="sm" 
                    variant={timeframe === "7d" ? "default" : "outline"}
                    onClick={() => setTimeframe("7d")}
                  >
                    7D
                  </Button>
                  <Button 
                    size="sm" 
                    variant={timeframe === "30d" ? "default" : "outline"}
                    onClick={() => setTimeframe("30d")}
                  >
                    30D
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <ValueChange value={priceChange} prefix="$" suffix="" />
                <span className="text-muted-foreground text-sm">in the last {timeframe === "1d" ? "day" : timeframe === "7d" ? "week" : "month"}</span>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={timeframeData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => {
                        if (timeframe === "1d") return "Today";
                        if (timeframe === "7d") {
                          const d = new Date(date);
                          return d.toLocaleDateString(undefined, { weekday: 'short' });
                        }
                        return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                      }}
                    />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip 
                      labelFormatter={(date) => new Date(date).toLocaleDateString()} 
                      formatter={(value: any) => [`$${Number(value).toFixed(4)}`, "Price"]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#9945FF" 
                      fill="#9945FF" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* About */}
          {token.description && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">About {token.name}</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {token.description}
                </p>
              </CardContent>
            </Card>
          )}
          
          {/* Related Projects */}
          {relatedGames.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Related Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedGames.map(game => (
                  <GameCard
                    key={game.id}
                    {...game}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Market Stats */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Market Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-medium">${formatLargeNumber(token.marketCap)}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Volume (24h)</span>
                  <span className="font-medium">${formatLargeNumber(token.volume24h)}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Circulating Supply</span>
                  <span className="font-medium">{formatLargeNumber(token.circulatingSupply)} {token.symbol}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span className="font-medium">{formatLargeNumber(token.totalSupply)} {token.symbol}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Fully Diluted Valuation</span>
                  <span className="font-medium">${formatLargeNumber(token.price * token.totalSupply)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Links */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Links</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://explorer.solana.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Explorer
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://jup.ag" target="_blank" rel="noopener noreferrer">
                    <Wallet className="h-4 w-4 mr-2" />
                    Buy on Jupiter
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://raydium.io" target="_blank" rel="noopener noreferrer">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Raydium Swap
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer">
                    <BarChart className="h-4 w-4 mr-2" />
                    DEX Screener
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://coingecko.com" target="_blank" rel="noopener noreferrer">
                    <PieChart className="h-4 w-4 mr-2" />
                    CoinGecko
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toFixed(value < 0.01 ? 6 : 2);
}

export default TokenDetail;
