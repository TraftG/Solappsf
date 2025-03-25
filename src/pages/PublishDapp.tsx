import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { getGameCategories } from "@/lib/data";
import { v4 as uuidv4 } from "uuid";

interface ProjectData {
  title: string;
  description: string;
  image: string;
  banner: string;
  categories: string[];
  status: "live" | "development" | "concept";
  hasNft: boolean;
  hasToken: boolean;
  website: string;
  twitter: string;
  discord: string;
  tokenAddress?: string;
  nftCollection?: string;
}

export default function PublishDapp() {
  const { connected, publicKey } = useWallet();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectData>({
    title: '',
    description: '',
    image: '',
    banner: '',
    categories: [],
    status: 'development',
    hasNft: false,
    hasToken: false,
    website: '',
    twitter: '',
    discord: '',
  });

  const allCategories = getGameCategories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!publicKey) {
      alert("Пожалуйста, подключите кошелек");
      return;
    }

    const projectData = {
      id: uuidv4(),
      title: formData.title,
      description: formData.description,
      image: formData.image,
      coverImage: formData.banner || formData.image,
      categories: formData.categories,
      status: formData.status,
      hasNft: formData.hasNft,
      hasToken: formData.hasToken,
      website: formData.website,
      twitter: formData.twitter,
      discord: formData.discord,
      owner: publicKey.toString(),
      tvl: 0,
      monthlyRevenue: 0,
      monthlyActiveUsers: 0,
      nftFloorPrice: 0,
      nftVolume: 0,
      tokenSymbol: "",
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:3001/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Не удалось получить данные об ошибке' }));
        throw new Error(errorData.error || `Ошибка сервера: ${response.status}`);
      }

      const result = await response.json();
      console.log('Проект успешно создан:', result);
      navigate('/projects');
    } catch (error) {
      console.error('Подробная ошибка:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        alert('Не удалось подключиться к серверу. Убедитесь, что сервер запущен на порту 3001.');
      } else {
        alert(error instanceof Error ? error.message : 'Произошла ошибка при сохранении проекта');
      }
    }
  };

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Публикация проекта</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Основная информация</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Название проекта</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Логотип проекта (URL)</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="banner">Баннер проекта (URL)</Label>
              <Input
                id="banner"
                type="url"
                value={formData.banner}
                onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                placeholder="Необязательно"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Категории и статус</h2>
          
          <div className="space-y-4">
            <div>
              <Label>Категории</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {allCategories.map((category) => (
                  <Badge
                    key={category}
                    variant={formData.categories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Статус проекта</Label>
              <div className="flex gap-4 mt-2">
                {["live", "development", "concept"].map((status) => (
                  <Badge
                    key={status}
                    variant={formData.status === status ? "default" : "outline"}
                    className="cursor-pointer capitalize"
                    onClick={() => setFormData({ ...formData, status: status as "live" | "development" | "concept" })}
                  >
                    {status === "live" ? "Запущен" : status === "development" ? "В разработке" : "Концепт"}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Функции</h2>
          
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasNft"
                  checked={formData.hasNft}
                  onCheckedChange={(checked) => setFormData({ ...formData, hasNft: checked as boolean })}
                />
                <Label htmlFor="hasNft">Проект имеет NFT</Label>
              </div>

              {formData.hasNft && (
                <div>
                  <Label htmlFor="nftCollection">Адрес NFT коллекции на Magic Eden</Label>
                  <Input
                    id="nftCollection"
                    value={formData.nftCollection}
                    onChange={(e) => setFormData({ ...formData, nftCollection: e.target.value })}
                    placeholder="https://magiceden.io/marketplace/..."
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasToken"
                  checked={formData.hasToken}
                  onCheckedChange={(checked) => setFormData({ ...formData, hasToken: checked as boolean })}
                />
                <Label htmlFor="hasToken">Проект имеет токен</Label>
              </div>

              {formData.hasToken && (
                <div>
                  <Label htmlFor="tokenAddress">Адрес токена на Magic Eden</Label>
                  <Input
                    id="tokenAddress"
                    value={formData.tokenAddress}
                    onChange={(e) => setFormData({ ...formData, tokenAddress: e.target.value })}
                    placeholder="https://magiceden.io/item-details/sol/..."
                  />
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Ссылки</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="website">Веб-сайт</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                type="url"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                placeholder="https://twitter.com/username"
              />
            </div>

            <div>
              <Label htmlFor="discord">Discord</Label>
              <Input
                id="discord"
                type="url"
                value={formData.discord}
                onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                placeholder="https://discord.gg/invite"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-solana hover:bg-solana/90">
            Опубликовать проект
          </Button>
        </div>
      </form>
    </div>
  );
} 