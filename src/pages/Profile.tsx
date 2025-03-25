import { useWallet } from '@solana/wallet-adapter-react';
import { useBalance } from '@/hooks/useBalance';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  owner: string;
}

export default function Profile() {
  const { publicKey } = useWallet();
  const balance = useBalance();
  const [userProjects, setUserProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (publicKey) {
      const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const filtered = allProjects.filter(
        (project: Project) => project.owner === publicKey.toString()
      );
      setUserProjects(filtered);
    }
  }, [publicKey]);

  if (!publicKey) {
    return (
      <div className="container py-24">
        <Card className="p-6 max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Wallet</h1>
          <p className="text-muted-foreground">Please connect your wallet to view your profile</p>
        </Card>
      </div>
    );
  }

  const address = publicKey.toString();
  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <div className="container py-24">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`} />
              <AvatarFallback>{shortAddress}</AvatarFallback>
            </Avatar>
            
            <h1 className="text-2xl font-bold">{shortAddress}</h1>
            
            {balance !== null && (
              <div className="text-lg">
                Balance: {balance.toFixed(4)} SOL
              </div>
            )}
          </div>

          <Tabs defaultValue="projects" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="projects">My Projects</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="mt-4">
              {userProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userProjects.map(project => (
                    <Card key={project.id} className="p-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={project.logo} 
                          alt={project.name} 
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.category}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                  <Card className="p-4 flex items-center justify-center">
                    <Button asChild>
                      <Link to="/publish-dapp">
                        + Add New Project
                      </Link>
                    </Button>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't published any projects yet</p>
                  <Button asChild>
                    <Link to="/publish-dapp">Publish Your First Project</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="text-center py-8 text-muted-foreground">
                No recent activity
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
} 