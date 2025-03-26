import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TokenCard } from "@/components/ui-custom/token-card";
import { Plus, Search, Filter } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

interface DevToken {
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

const MyTokens = () => {
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [tokens, setTokens] = useState<DevToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (publicKey) {
      // Загружаем токены из localStorage
      const savedTokens = localStorage.getItem("tokens");
      if (savedTokens) {
        const allTokens: DevToken[] = JSON.parse(savedTokens);
        // Фильтруем только токены текущего пользователя
        const userTokens = allTokens.filter(
          (token) => token.owner === publicKey.toString()
        );
        setTokens(userTokens);
      }
    }
    setLoading(false);
  }, [publicKey]);

  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!publicKey) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Требуется подключение кошелька</h1>
        <p className="text-muted-foreground mb-8">
          Пожалуйста, подключите свой кошелек, чтобы просматривать ваши токены.
        </p>
        <Button onClick={() => navigate("/")}>На главную</Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Мои токены</h1>
          <p className="text-muted-foreground mt-2">
            Управляйте вашими токенами и их распределением
          </p>
        </div>
        <Button onClick={() => navigate("/publish-dapp")}>
          <Plus className="h-4 w-4 mr-2" />
          Создать токен
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск токенов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Фильтры
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : filteredTokens.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTokens.map((token) => (
            <TokenCard
              key={token.id}
              {...token}
              className="reveal-animation"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-muted rounded-full p-6 mb-4">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Токены не найдены</h3>
          <p className="text-muted-foreground max-w-md mb-8">
            У вас пока нет созданных токенов. Создайте свой первый токен прямо сейчас!
          </p>
          <Button onClick={() => navigate("/publish-dapp")}>
            <Plus className="h-4 w-4 mr-2" />
            Создать токен
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyTokens;