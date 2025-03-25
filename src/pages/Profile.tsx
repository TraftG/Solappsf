import { useParams } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { address } = useParams();
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  const isOwnProfile = publicKey?.toString() === address;

  if (!address) {
    return <div>Invalid profile</div>;
  }

  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <div className="container py-24">
      <div className="flex flex-col items-center space-y-8">
        <Avatar className="h-32 w-32">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`} alt={shortAddress} />
          <AvatarFallback className="text-2xl">{shortAddress}</AvatarFallback>
        </Avatar>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">{address}</p>
        </div>

        {isOwnProfile && (
          <Button onClick={() => navigate('/settings')}>
            Edit Profile
          </Button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0 SOL</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NFTs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 