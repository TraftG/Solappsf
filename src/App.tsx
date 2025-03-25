import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Tokens from "./pages/Tokens";
import TokenDetail from "./pages/TokenDetail";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Developers from "./pages/Developers";
import Swap from "./pages/swap";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/tokens/:id" element={<TokenDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/profile/:address" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
