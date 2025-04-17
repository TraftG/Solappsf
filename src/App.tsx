import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetails";
import Tokens from "./pages/Tokens";
import TokenDetail from "./pages/TokenDetail";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Developers from "./pages/Developers";
import Swap from "./pages/swap";
import Profile from "./pages/Profile";
import PublishDapp from "./pages/PublishDapp";
import Portfolio from "./pages/Portfolio";
import MyDapps from "./pages/MyDapps";
import MyTokens from "./pages/MyTokens";
import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletIframeProvider } from './components/WalletIframeProvider';

const queryClient = new QueryClient();

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl('devnet'), []);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletIframeProvider />
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
                  <Route path="/publish-dapp" element={<PublishDapp />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/dapps/my" element={<MyDapps />} />
                  <Route path="/tokens/my" element={<MyTokens />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </WalletModalProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
};

export default App;
