import { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useNavigate } from 'react-router-dom';
import { useBalance } from '@/hooks/useBalance';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import '@solana/wallet-adapter-react-ui/styles.css';

const WalletButtonContent: FC = () => {
  const { publicKey, disconnect } = useWallet();
  const navigate = useNavigate();
  const balance = useBalance();

  if (!publicKey) {
    return <WalletMultiButton />;
  }

  const address = publicKey.toString();
  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="h-8 w-8 hover:ring-2 hover:ring-solana transition-all">
            <AvatarImage src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${address}`} alt={shortAddress} />
            <AvatarFallback>{shortAddress}</AvatarFallback>
          </Avatar>



          
        </div>
      </DropdownMenuTrigger>

                {balance !== null && (
            <div className="hidden sm:block text-sm font-medium whitespace-nowrap">
              {balance.toFixed(2)} SOL
            </div>
          )}

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => navigate(`/profile/${address}`)}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`/dapps/my`)}>
          My Dapps
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`/tokens/my`)}>
          My Tokens
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`/portfolio`)}>
          Portfolio
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => disconnect()}>
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const WalletButton: FC = () => {
  const endpoint = useMemo(() => clusterApiUrl('devnet'), []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletButtonContent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletButton;