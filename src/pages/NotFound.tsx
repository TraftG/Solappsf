
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="mb-8 relative w-24 h-24 mx-auto">
          <div className="rounded-full bg-solana/10 w-24 h-24 absolute animate-pulse"></div>
          <div className="rounded-full bg-solana/20 w-16 h-16 absolute top-4 left-4 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="rounded-full bg-solana w-8 h-8 absolute top-8 left-8 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! This page seems to have gone off-chain.
        </p>
        <Button className="rounded-full bg-solana hover:bg-solana-dark" asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
