import { FC, useEffect, useState } from 'react';
import { useIframeWallet } from '@/hooks/useIframeWallet';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const IframeWalletConnector: FC = () => {
  const { publicKey, connected } = useIframeWallet();
  const [isParentConnected, setIsParentConnected] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли подключенный кошелек в родительском окне
    const checkParentWallet = () => {
      window.parent.postMessage({ type: 'WALLET_REQUEST' }, '*');
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'WALLET_RESPONSE') {
        setIsParentConnected(event.data.data.connected);
      }
    };

    checkParentWallet();
    const interval = setInterval(checkParentWallet, 5000);

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(interval);
    };
  }, []);

  if (isParentConnected) {
    return (
      <div className="p-4 bg-green-100 rounded-lg">
        <p className="text-green-800">
          Кошелек подключен через родительское окно: {publicKey?.toString()}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <p className="mb-4">Подключите кошелек:</p>
      <WalletMultiButton />
    </div>
  );
}; 