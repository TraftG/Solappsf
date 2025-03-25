import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import Index from "@/pages/Index";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Tokens from "@/pages/Tokens";
import TokenDetail from "@/pages/TokenDetail";
import Analytics from "@/pages/Analytics";
import Developers from "@/pages/Developers";
import Swap from "@/components/Swap";
import NotFound from "@/pages/NotFound";

export const AppRoutes = () => {
  return (
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
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 