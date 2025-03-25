interface Window {
  solana?: {
    isPhantom?: boolean;
    connect: () => Promise<any>;
    disconnect: () => Promise<void>;
    publicKey?: { toString: () => string };
  };
} 