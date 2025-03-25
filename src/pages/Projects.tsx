
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GameCard } from "@/components/ui-custom/game-card";
import { Badge } from "@/components/ui/badge";
import { games, getGameCategories } from "@/lib/data";
import { Search, X } from "lucide-react";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [showNft, setShowNft] = useState<boolean | null>(null);
  const [showToken, setShowToken] = useState<boolean | null>(null);
  
  const allCategories = getGameCategories();
  const statuses = ["live", "development", "concept"];
  
  // Filter games based on selected filters
  const filteredGames = games.filter((game) => {
    // Filter by search query
    if (searchQuery && !game.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0 && !game.categories.some(cat => selectedCategories.includes(cat))) {
      return false;
    }
    
    // Filter by selected status
    if (selectedStatus.length > 0 && !selectedStatus.includes(game.status)) {
      return false;
    }
    
    // Filter by NFT
    if (showNft !== null && game.hasNft !== showNft) {
      return false;
    }
    
    // Filter by Token
    if (showToken !== null && game.hasToken !== showToken) {
      return false;
    }
    
    return true;
  });
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedStatus([]);
    setShowNft(null);
    setShowToken(null);
  };
  
  // Check if any filter is applied
  const isFilterApplied = 
    searchQuery !== "" || 
    selectedCategories.length > 0 || 
    selectedStatus.length > 0 || 
    showNft !== null || 
    showToken !== null;
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  // Toggle status selection
  const toggleStatus = (status: string) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter(s => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
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
  }, [filteredGames]);
  
  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              {isFilterApplied && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-muted-foreground text-sm"
                >
                  Reset All
                </Button>
              )}
            </div>
            
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="pl-8 pr-4"
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
            </div>
            
            {/* Category Filter */}
            <div className="space-y-2 mb-6">
              <h3 className="text-sm font-medium">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="space-y-2 mb-6">
              <h3 className="text-sm font-medium">Status</h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <Badge
                    key={status}
                    variant={selectedStatus.includes(status) ? "default" : "outline"}
                    className="cursor-pointer capitalize"
                    onClick={() => toggleStatus(status)}
                  >
                    {status}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* NFT Filter */}
            <div className="space-y-2 mb-6">
              <h3 className="text-sm font-medium">Has NFTs</h3>
              <div className="flex gap-2">
                <Badge
                  variant={showNft === true ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setShowNft(showNft === true ? null : true)}
                >
                  Yes
                </Badge>
                <Badge
                  variant={showNft === false ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setShowNft(showNft === false ? null : false)}
                >
                  No
                </Badge>
              </div>
            </div>
            
            {/* Token Filter */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Has Token</h3>
              <div className="flex gap-2">
                <Badge
                  variant={showToken === true ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setShowToken(showToken === true ? null : true)}
                >
                  Yes
                </Badge>
                <Badge
                  variant={showToken === false ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setShowToken(showToken === false ? null : false)}
                >
                  No
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Projects & Games</h1>
            <div className="text-sm text-muted-foreground">
              Showing {filteredGames.length} of {games.length} projects
            </div>
          </div>
          
          {/* Applied Filters */}
          {isFilterApplied && (
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  {category}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 rounded-full"
                    onClick={() => toggleCategory(category)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              
              {selectedStatus.map((status) => (
                <Badge key={status} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1 capitalize">
                  {status}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 rounded-full"
                    onClick={() => toggleStatus(status)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              
              {showNft !== null && (
                <Badge variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  NFT: {showNft ? "Yes" : "No"}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 rounded-full"
                    onClick={() => setShowNft(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {showToken !== null && (
                <Badge variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  Token: {showToken ? "Yes" : "No"}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 rounded-full"
                    onClick={() => setShowToken(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              
              {searchQuery && (
                <Badge variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  "{searchQuery}"
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 rounded-full"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}
          
          {/* Projects Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game, index) => (
                <GameCard
                  key={game.id}
                  {...game}
                  className="reveal-animation"
                  style={{ animationDelay: `${index * 50}ms` }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-muted rounded-full p-6 mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any projects matching your current filters. Try adjusting your search criteria.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;