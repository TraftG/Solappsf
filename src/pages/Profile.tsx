import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  Activity, 
  Users, 
  Globe, 
  Twitter, 
  MessageSquare,
  Github,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  ChevronRight,
  Verified
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  status: string;
  owner: string;
}

interface Token {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  owner: string;
}

const Profile = () => {
  const { address } = useParams();
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Загрузка проектов
        const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        const userProjects = savedProjects.filter((project: Project) => 
          project.owner === (address || publicKey?.toString())
        );
        setProjects(userProjects);

        // Загрузка токенов
        const savedTokens = JSON.parse(localStorage.getItem('tokens') || '[]');
        const userTokens = savedTokens.filter((token: Token) => 
          token.owner === (address || publicKey?.toString())
        );
        setTokens(userTokens);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [address, publicKey]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  const userAddress = address || publicKey?.toString();
  const shortAddress = userAddress ? `${userAddress.slice(0, 4)}...${userAddress.slice(-4)}` : '';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pt-28 pb-16 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl"></div>
          <div className="relative p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <img 
                  src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${userAddress}`}
                  alt={shortAddress}
                  className="w-32 h-32 rounded-full border-4 border-background shadow-lg"
                />
                <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full">
                  <Wallet size={16} />
                </div>
              </div> 
            
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{shortAddress}</h1>
                  <Badge variant="secondary">Разработчик</Badge>
                  <div className="flex items-center gap-2">
                    <Verified className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Кошелек:</span>
                    <code className="bg-secondary px-2 py-1 rounded">{userAddress}</code>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => copyToClipboard(userAddress || '')}
                    >
                      <Copy size={14} />
                    </Button>
                  </div>
                </div>
              </div>
              
              {publicKey?.toString() === address && (
                <div className="flex gap-2">
                  <Button onClick={() => navigate('/publish-dapp')}>
                    Создать проект
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/tokens/my')}>
                    Мои токены
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Globe size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{projects.length}</div>
                <div className="text-sm text-muted-foreground">Проектов</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Activity size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{tokens.length}</div>
                <div className="text-sm text-muted-foreground">Токенов</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">38.6K</div>
                <div className="text-sm text-muted-foreground">Active Users

                </div>
                </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Activity size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">4.8M</div>
                <div className="text-sm text-muted-foreground">Total Requests</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">Проекты</TabsTrigger>
            <TabsTrigger value="tokens">Токены</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <Card className="p-6">
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-12 h-12 rounded-lg"
                        />
                        <div>
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                          <div className="flex gap-2 mt-2">
                            {project.categories.map((category) => (
                              <Badge key={category} variant="secondary">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">У вас пока нет проектов</p>
                  {publicKey?.toString() === address && (
                    <Button onClick={() => navigate('/publish-dapp')}>
                      Создать первый проект
                    </Button>
                  )}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="tokens">
            <Card className="p-6">
              {tokens.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tokens.map((token) => (
                    <Card key={token.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={token.icon} 
                          alt={token.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-medium">{token.name}</h3>
                          <p className="text-sm text-muted-foreground">{token.symbol}</p>
                          <div className="mt-2">
                            <div className="text-sm">
                              Цена: ${token.price.toFixed(2)}
                              <span className={token.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}>
                                {token.priceChange24h >= 0 ? " +" : " "}{token.priceChange24h.toFixed(2)}%
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Капитализация: ${token.marketCap.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">У вас пока нет токенов</p>
                  {publicKey?.toString() === address && (
                    <Button onClick={() => navigate('/tokens/my')}>
                      Создать первый токен
                    </Button>
                  )}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile; 