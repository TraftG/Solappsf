import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, Code, Shield, Rocket, CheckCircle, AlertCircle, Info, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

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
    <div className="container py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Developer Portal</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Build and publish your dApps on Solana. Join our growing ecosystem of developers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 text-left">
            <h2 className="text-2xl font-semibold mb-4">Publish Your dApp</h2>
            <p className="text-muted-foreground mb-6">
              Share your project with the Solana community. Get visibility and attract users.
            </p>
            <Button asChild>
              <Link to="/publish-dapp">Publish Now</Link>
                      </Button>
                </Card>
                
          <Card className="p-6 text-left">
            <h2 className="text-2xl font-semibold mb-4">Developer Resources</h2>
            <p className="text-muted-foreground mb-6">
              Access documentation, tools, and guides to build on Solana.
            </p>
            <Button variant="outline" asChild>
              <a href="https://docs.solana.com" target="_blank" rel="noopener noreferrer">
                View Resources
                        </a>
                      </Button>
                </Card>
              </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Why Build on Solana?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-medium mb-3">Fast & Scalable</h3>
              <p className="text-muted-foreground">
                Up to 65,000 TPS with sub-second finality.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-medium mb-3">Low Cost</h3>
              <p className="text-muted-foreground">
                Transaction fees as low as $0.00025.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-medium mb-3">Growing Ecosystem</h3>
              <p className="text-muted-foreground">
                Join thousands of developers building the future.
              </p>
              </Card>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;