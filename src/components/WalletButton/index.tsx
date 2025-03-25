import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Wallet } from 'lucide-react';

import '@solana/wallet-adapter-react-ui/styles.css';

export const WalletButton: FC = () => {
  const { connected } = useWallet();

  return (
    <div className="relative inline-block">
      <WalletMultiButton className="wallet-adapter-button">
        {!connected && (
          <Wallet className="h-5 w-5 mr-2" />
        )}
      </WalletMultiButton>
    </div>
  );
};

export default WalletButton; 