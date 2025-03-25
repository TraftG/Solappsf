import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, Code, Shield, Rocket, CheckCircle, AlertCircle, Info, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Developers = () => {
  const [activeTab, setActiveTab] = useState('publish');
  const [formStep, setFormStep] = useState(1);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep < 4) {
      setFormStep(formStep + 1);
    } else {
      toast({
        title: "Требуется подключение кошелька",
        description: "Для завершения публикации необходимо подключить кошелек Solana",
      });
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Для разработчиков</h1>
          <p className="text-muted-foreground">
            Публикуйте свои dApps и игры на Solana, получайте новых пользователей и прямую монетизацию
          </p>
        </div>
        
        {/* Tabs navigation */}
        <Tabs defaultValue="publish" onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-lg grid-cols-3">
              <TabsTrigger value="publish">Публикация</TabsTrigger>
              <TabsTrigger value="docs">Документация</TabsTrigger>
              <TabsTrigger value="support">Поддержка</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Publish dApp Tab */}
          <TabsContent value="publish">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Публикация dApp</CardTitle>
                  <CardDescription>
                    Заполните информацию о вашем приложении и опубликуйте его на платформе SolApps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Progress Indicator */}
                  <div className="mb-8">
                    <div className="flex justify-between">
                      <div className="text-center">
                        <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${formStep >= 1 ? 'bg-solana-purple text-white' : 'bg-muted text-muted-foreground'}`}>
                          1
                        </div>
                        <span className="text-xs mt-1 block">Информация</span>
                      </div>
                      <div className="flex-1 flex items-center px-2">
                        <div className={`h-1 w-full ${formStep >= 2 ? 'bg-solana-purple' : 'bg-muted'}`}></div>
                      </div>
                      <div className="text-center">
                        <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${formStep >= 2 ? 'bg-solana-purple text-white' : 'bg-muted text-muted-foreground'}`}>
                          2
                        </div>
                        <span className="text-xs mt-1 block">Медиа</span>
                      </div>
                      <div className="flex-1 flex items-center px-2">
                        <div className={`h-1 w-full ${formStep >= 3 ? 'bg-solana-purple' : 'bg-muted'}`}></div>
                      </div>
                      <div className="text-center">
                        <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${formStep >= 3 ? 'bg-solana-purple text-white' : 'bg-muted text-muted-foreground'}`}>
                          3
                        </div>
                        <span className="text-xs mt-1 block">Интеграция</span>
                      </div>
                      <div className="flex-1 flex items-center px-2">
                        <div className={`h-1 w-full ${formStep >= 4 ? 'bg-solana-purple' : 'bg-muted'}`}></div>
                      </div>
                      <div className="text-center">
                        <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${formStep >= 4 ? 'bg-solana-purple text-white' : 'bg-muted text-muted-foreground'}`}>
                          4
                        </div>
                        <span className="text-xs mt-1 block">Публикация</span>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Basic Information */}
                    {formStep === 1 && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="app-name">Название приложения</Label>
                          <Input id="app-name" placeholder="Введите название dApp" required />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="app-category">Категория</Label>
                            <select id="app-category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required>
                              <option value="">Выберите категорию</option>
                              <option value="games">Игры</option>
                              <option value="defi">DeFi</option>
                              <option value="nft">NFT</option>
                              <option value="social">Социальные</option>
                              <option value="tools">Инструменты</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="app-website">Сайт</Label>
                            <Input id="app-website" type="url" placeholder="https://" required />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="app-short-description">Краткое описание</Label>
                          <Input id="app-short-description" placeholder="Краткое описание (до 150 символов)" maxLength={150} required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="app-description">Полное описание</Label>
                          <Textarea id="app-description" placeholder="Подробное описание вашего приложения" rows={6} required />
                        </div>
                      </div>
                    )}
                    
                    {/* Step 2: Media */}
                    {formStep === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>Иконка приложения</Label>
                          <div className="border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center">
                            <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-2">PNG, JPG или SVG (1:1)</p>
                            <Button type="button" variant="outline" size="sm">
                              Загрузить иконку
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Скриншоты</Label>
                          <div className="border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center">
                            <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-2">PNG или JPG (рекомендуется 16:9)</p>
                            <p className="text-xs text-muted-foreground mb-4">Загрузите не менее 3 скриншотов</p>
                            <Button type="button" variant="outline" size="sm">
                              Загрузить скриншоты
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="app-video">Демо-видео (необязательно)</Label>
                          <Input id="app-video" type="url" placeholder="Ссылка на YouTube или Vimeo" />
                        </div>
                      </div>
                    )}
                    
                    {/* Step 3: Integration */}
                    {formStep === 3 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="app-url">URL dApp</Label>
                          <Input id="app-url" type="url" placeholder="https://" required />
                          <p className="text-xs text-muted-foreground mt-1">
                            Ссылка на ваше dApp, которое будет открываться при запуске
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="app-program-id">Program ID (необязательно)</Label>
                          <Input id="app-program-id" placeholder="Solana program ID" />
                          <p className="text-xs text-muted-foreground mt-1">
                            Идентификатор смарт-контракта вашего dApp в сети Solana
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="app-supports-mobile">Поддержка мобильных устройств</Label>
                            <input 
                              type="checkbox" 
                              id="app-supports-mobile"
                              className="h-4 w-4 rounded border-gray-300 text-solana-purple focus:ring-solana-purple"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Подтвердите, что ваше dApp адаптировано для мобильных устройств
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="app-supports-wallet">Интеграция с Wallet Adapter</Label>
                            <input 
                              type="checkbox" 
                              id="app-supports-wallet"
                              className="h-4 w-4 rounded border-gray-300 text-solana-purple focus:ring-solana-purple"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Подтвердите поддержку подключения кошельков через Solana Wallet Adapter
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Step 4: Publish */}
                    {formStep === 4 && (
                      <div className="space-y-6">
                        <div className="bg-secondary/50 rounded-lg p-4 flex items-start space-x-3 mb-4">
                          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-sm">Требуется верификация</h4>
                            <p className="text-sm text-muted-foreground">
                              Для завершения публикации необходимо подключить кошелек Solana и подписать транзакцию верификации
                            </p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg divide-y">
                          <div className="p-4 flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="font-medium">Информация о dApp</p>
                              <p className="text-sm text-muted-foreground">Заполнена базовая информация</p>
                            </div>
                          </div>
                          <div className="p-4 flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="font-medium">Медиа-контент</p>
                              <p className="text-sm text-muted-foreground">Загружены иконка и скриншоты</p>
                            </div>
                          </div>
                          <div className="p-4 flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="font-medium">Интеграция</p>
                              <p className="text-sm text-muted-foreground">Настроены параметры запуска</p>
                            </div>
                          </div>
                          <div className="p-4 flex items-center space-x-3">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                            <div>
                              <p className="font-medium">Верификация</p>
                              <p className="text-sm text-muted-foreground">Требуется подключение кошелька</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              id="app-terms"
                              className="h-4 w-4 rounded border-gray-300 text-solana-purple focus:ring-solana-purple"
                              required
                            />
                            <Label htmlFor="app-terms" className="text-sm">
                              Я принимаю <a href="#" className="text-solana-purple hover:underline">условия использования</a> и подтверждаю, что имею права на публикацию
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-8 flex justify-between">
                      {formStep > 1 && (
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setFormStep(formStep - 1)}
                        >
                          Назад
                        </Button>
                      )}
                      
                      <Button 
                        type="submit" 
                        className={`bg-gradient-solana ${formStep === 1 ? 'ml-auto' : ''}`}
                      >
                        {formStep < 4 ? 'Продолжить' : 'Опубликовать dApp'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Documentation Tab */}
          <TabsContent value="docs">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 hover-card-effect">
                  <CardHeader>
                    <CardTitle>Документация</CardTitle>
                    <CardDescription>
                      Подробные руководства и справочная информация
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-solana-purple hover:underline flex items-center">
                          <Info className="h-4 w-4 mr-2" />
                          Начало работы
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-solana-purple hover:underline flex items-center">
                          <Code className="h-4 w-4 mr-2" />
                          SDK и API
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-solana-purple hover:underline flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          Требования безопасности
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-solana-purple hover:underline flex items-center">
                          <Rocket className="h-4 w-4 mr-2" />
                          Процесс публикации
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Начало работы</CardTitle>
                    <CardDescription>
                      Руководство по интеграции вашего dApp с платформой SolApps
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="prose prose-sm">
                    <h3>Установка SDK</h3>
                    <p>
                      Для начала установите наш SDK для интеграции вашего dApp с платформой SolApps.
                    </p>
                    
                    <div className="bg-secondary/50 rounded-md p-3 mb-4 overflow-hidden">
                      <code className="text-xs block text-muted-foreground">
                        <span className="text-blue-500">npm</span> <span className="text-green-500">install</span> @solana/solapp-adapter
                      </code>
                    </div>
                    
                    <h3>Интеграция с кошельком</h3>
                    <p>
                      SolApps SDK расширяет стандартный Wallet Adapter от Solana и позволяет легко интегрировать вашу dApp с кошельками и функциями платформы.
                    </p>
                    
                    <div className="bg-secondary/50 rounded-md p-3 mb-4 overflow-hidden">
                      <code className="text-xs block text-muted-foreground">
                        <span className="text-blue-500">import</span> {'{ SolAppProvider, useSolApp }'} <span className="text-blue-500">from</span> <span className="text-amber-500">'@solana/solapp-adapter'</span>;
                        <br /><br />
                        <span className="text-blue-500">const</span> <span className="text-purple-500">App</span> = () {'=> ('}<br />
                        {'  '}<span className="text-cyan-500">&lt;SolAppProvider&gt;</span><br />
                        {'    '}<span className="text-cyan-500">&lt;YourApp /&gt;</span><br />
                        {'  '}<span className="text-cyan-500">&lt;/SolAppProvider&gt;</span><br />
                        {');'}
                      </code>
                    </div>
                    
                    <h3>Аналитика и монетизация</h3>
                    <p>
                      SDK также предоставляет инструменты для аналитики использования вашего dApp и возможности монетизации через встроенные платежные функции.
                    </p>
                    
                    <div className="mt-6">
                      <Button size="sm" variant="outline" className="mr-2" asChild>
                        <a href="#">
                          Полная документация
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href="#">
                          Примеры кода
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Support Tab */}
          <TabsContent value="support">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Поддержка разработчиков</CardTitle>
                  <CardDescription>
                    Получите помощь с интеграцией и публикацией вашего dApp
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-4 rounded-lg border border-border">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-solana-purple" />
                        Сообщество
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Присоединяйтесь к нашему сообществу разработчиков и получайте помощь от экспертов
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Discord сообщество
                      </Button>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-border">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Info className="h-5 w-5 mr-2 text-solana-purple" />
                        Партнёрская программа
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Особые условия для разработчиков, ранние доступы и дополнительные возможности
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Подробнее о программе
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Остались вопросы?</h3>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input id="contact-email" type="email" placeholder="ваш@email.com" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contact-subject">Тема</Label>
                        <Input id="contact-subject" placeholder="Кратко опишите ваш вопрос" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contact-message">Сообщение</Label>
                        <Textarea id="contact-message" placeholder="Подробно опишите ваш вопрос" rows={5} required />
                      </div>
                      
                      <Button type="submit" className="bg-gradient-solana">
                        Отправить запрос
                      </Button>
                    </form>
                  </div>
                  
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h3 className="font-semibold mb-2">Время ответа</h3>
                    <p className="text-sm text-muted-foreground">
                      Мы обычно отвечаем в течение 24 часов в рабочие дни. Для более быстрой помощи рекомендуем использовать Discord.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Developers;