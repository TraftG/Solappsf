
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TokenCard } from "@/components/ui-custom/token-card";
import { tokens } from "@/lib/data";
import { fetchTokenPrices, TokenPrice } from "@/lib/api";
import { Search, X, TrendingUp, TrendingDown, ArrowUpDown, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type SortField = "name" | "price" | "priceChange24h" | "marketCap" | "volume24h";
type SortDirection = "asc" | "desc";

const Tokens = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("marketCap");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [tokensWithPrices, setTokensWithPrices] = useState(tokens);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Fetch token prices on component mount
  useEffect(() => {
    fetchPrices();
  }, []);
  
  // Function to fetch prices and update tokens
  const fetchPrices = async () => {
    setIsRefreshing(true);
    
    try {
      const priceData = await fetchTokenPrices();
      
      if (priceData.length > 0) {
        // Update tokens with the latest price data
        const updatedTokens = tokens.map(token => {
          const latestPrice = priceData.find(p => p.id === token.id);
          if (latestPrice) {
            return {
              ...token,
              price: latestPrice.price,
              priceChange24h: latestPrice.priceChange24h
            };
          }
          return token;
        });
        
        setTokensWithPrices(updatedTokens);
        setLastUpdated(new Date());
        
        toast({
          title: "Prices updated",
          description: "Latest market data has been loaded from CoinGecko",
        });
      }
    } catch (error) {
      console.error("Error updating prices:", error);
      toast({
        title: "Failed to update prices",
        description: "Could not load the latest market data. Will retry later.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };
  
  // Filter tokens based on search query
  const filteredTokens = tokensWithPrices.filter((token) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      token.name.toLowerCase().includes(query) ||
      token.symbol.toLowerCase().includes(query)
    );
  });
  
  // Sort tokens based on sort field and direction
  const sortedTokens = [...filteredTokens].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Special case for name field
    if (sortField === "name") {
      aValue = a.name.toLowerCase();
      bValue = b.name.toLowerCase();
    }
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  
  // Handle sort toggle
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };
  
  // Render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 ml-1 text-muted-foreground/50" />;
    
    return sortDirection === "asc" 
      ? <TrendingUp className="h-4 w-4 ml-1 text-primary" />
      : <TrendingDown className="h-4 w-4 ml-1 text-primary" />;
  };
  
  // Set up reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll(".reveal-animation");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [sortedTokens]);

  // Auto-refresh every 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPrices();
    }, 180000); // 3 minutes
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tokens</h1>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={fetchPrices}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Prices
            </Button>
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>
        
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tokens..."
              className="pl-8 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-9 w-9 text-muted-foreground"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 ml-auto">
            <Button 
              variant="outline" 
              size="sm"
              className={`flex items-center ${sortField === "name" ? "border-primary" : ""}`}
              onClick={() => toggleSort("name")}
            >
              Name
              {renderSortIndicator("name")}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={`flex items-center ${sortField === "price" ? "border-primary" : ""}`}
              onClick={() => toggleSort("price")}
            >
              Price
              {renderSortIndicator("price")}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={`flex items-center ${sortField === "priceChange24h" ? "border-primary" : ""}`}
              onClick={() => toggleSort("priceChange24h")}
            >
              24h %
              {renderSortIndicator("priceChange24h")}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={`flex items-center ${sortField === "marketCap" ? "border-primary" : ""}`}
              onClick={() => toggleSort("marketCap")}
            >
              Market Cap
              {renderSortIndicator("marketCap")}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={`flex items-center ${sortField === "volume24h" ? "border-primary" : ""}`}
              onClick={() => toggleSort("volume24h")}
            >
              Volume
              {renderSortIndicator("volume24h")}
            </Button>
          </div>
        </div>
        
        {/* Tokens List */}
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse bg-muted rounded-lg h-24"></div>
            ))
          ) : sortedTokens.length > 0 ? (
            sortedTokens.map((token, index) => (
              <div 
                key={token.id} 
                className="reveal-animation"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TokenCard {...token} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-muted rounded-full p-6 mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No tokens found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any tokens matching your search. Try adjusting your search criteria.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tokens;
