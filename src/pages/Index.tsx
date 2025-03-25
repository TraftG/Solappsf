
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GameCard } from "@/components/ui-custom/game-card";
import { TokenCard } from "@/components/ui-custom/token-card";
import { StatsCard } from "@/components/ui-custom/stats-card";
import { games, tokens, analyticsData } from "@/lib/data";
import { fetchTokenPrices } from "@/lib/api";
import { ArrowRight, Search, BarChart4, Sparkles, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const featuredGames = games.slice(0, 4);
  const [featuredTokens, setFeaturedTokens] = useState(tokens.slice(0, 4));
  const [isLoadingTokens, setIsLoadingTokens] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Fetch token prices on component mount
  useEffect(() => {
    fetchPrices();
    
    // Auto-refresh every 3 minutes
    const interval = setInterval(() => {
      fetchPrices();
    }, 180000); // 3 minutes
    
    return () => clearInterval(interval);
  }, []);
  
  const fetchPrices = async () => {
    try {
      const priceData = await fetchTokenPrices();
      
      if (priceData.length > 0) {
        // Update tokens with the latest price data
        const updatedTokens = tokens.slice(0, 4).map(token => {
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
        
        setFeaturedTokens(updatedTokens);
      }
    } catch (error) {
      console.error("Error updating prices:", error);
      toast({
        title: "Failed to update prices",
        description: "Could not load the latest market data.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingTokens(false);
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (heroRef.current) {
        // Parallax effect
        heroRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
        // Opacity effect
        const opacity = Math.max(1 - scrollY / 500, 0);
        heroRef.current.style.opacity = opacity.toString();
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  }, [featuredTokens]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-solana/10 to-secondary/30 z-0"
          style={{ 
            backgroundImage: "url('https://dlnftpilklrdy.cloudfront.net/temp/hero-bg.jpg')", 
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
            transform: "scale(1.1)"
          }}
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-0"></div>
        
        <div 
          ref={heroRef} 
          className="container relative z-10 text-center space-y-6 px-4 animate-fade-up"
        >
          <div className="inline-block bg-solana/10 text-solana px-3 py-1 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-solana/20">
            Discover the Solana Gaming Ecosystem
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Explore Solana's <br />
            <span className="text-solana">Gaming Frontier</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your ultimate destination for discovering, analyzing, and tracking games, 
            projects, and tokens in the Solana ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="rounded-full bg-solana hover:bg-solana-dark px-8">
              Explore Projects
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              View Analytics
            </Button>
          </div>
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <div className="rounded-full border-2 border-muted-foreground/30 p-2">
              <ArrowRight className="h-5 w-5 text-muted-foreground/70 rotate-90" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Projects"
              value={analyticsData.totalProjects}
              description="Growing ecosystem"
              icon={<Sparkles className="h-5 w-5" />}
              variant="glass"
              className="reveal-animation"
            />
            <StatsCard
              title="Total Users"
              value={formatLargeNumber(analyticsData.totalUsers)}
              description="Active gamers"
              icon={<Wallet className="h-5 w-5" />}
              variant="glass"
              className="reveal-animation"
            />
            <StatsCard
              title="Monthly Revenue"
              value={`$${formatLargeNumber(analyticsData.monthlyRevenue)}`}
              description="Generated revenue"
              icon={<BarChart4 className="h-5 w-5" />}
              variant="glass"
              className="reveal-animation"
            />
            <StatsCard
              title="NFT Volume"
              value={`$${formatLargeNumber(analyticsData.monthlyNftVolume)}`}
              description="30-day volume"
              icon={<Search className="h-5 w-5" />}
              variant="glass"
              className="reveal-animation"
            />
          </div>
        </div>
      </section>
      
      {/* Featured Games Section */}
      <section className="py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2 mb-6 md:mb-0">
              <h2 className="text-3xl font-neuropol font-bold tracking-tight">Featured Projects</h2>
              <p className="text-muted-foreground">Discover the latest and greatest games on Solana</p>
            </div>
            <Link to="/projects">
              <Button variant="outline" className="group">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGames.map((game, index) => (
              <GameCard
                key={game.id}
                {...game}
                className={`reveal-animation`}
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Tokens Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2 mb-6 md:mb-0">
              <h2 className="text-3xl font-neuropol font-bold tracking-tight">Featured Tokens</h2>
              <p className="text-muted-foreground">Track the performance of top Solana gaming tokens</p>
            </div>
            <Link to="/tokens">
              <Button variant="outline" className="group">
                View All Tokens
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {isLoadingTokens ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse bg-muted rounded-lg h-24"></div>
              ))
            ) : (
              featuredTokens.map((token, index) => (
                <TokenCard
                  key={token.id}
                  {...token}
                  className="reveal-animation"
                />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Why Solana Games Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-neuropol tracking-tight mb-4">Why Solana for Gaming?</h2>
            <p className="text-muted-foreground">
              Solana's high-performance blockchain is revolutionizing the gaming industry
              with fast transactions, low fees, and seamless user experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="reveal-animation border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="m4 15 4-4 4 4 8-8" />
                    <path d="M4 22v-7" />
                    <path d="M22 8V2h-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">High Performance</h3>
                <Separator className="my-3" />
                <p className="text-muted-foreground">
                  Solana delivers up to 65,000 TPS with sub-second finality,
                  enabling smooth gameplay without interruptions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="reveal-animation border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Minimal Fees</h3>
                <Separator className="my-3" />
                <p className="text-muted-foreground">
                  With transaction costs averaging $0.00025, 
                  microtransactions and in-game economies become practical.
                </p>
              </CardContent>
            </Card>
            
            <Card className="reveal-animation border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Developer Friendly</h3>
                <Separator className="my-3" />
                <p className="text-muted-foreground">
                  Rich tooling and support for Rust, C, C++, 
                  and JavaScript make building on Solana accessible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-solana/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8 reveal-animation">
            <h2 className="text-3xl font-neuropol md:text-4xl font-bold">Ready to Dive Into Solana Gaming?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start exploring the vibrant ecosystem of games, projects, and tokens 
              building the future of gaming on Solana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="rounded-full bg-solana hover:bg-solana-dark px-8">
                Explore Projects
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function formatLargeNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
}

export default Index;
