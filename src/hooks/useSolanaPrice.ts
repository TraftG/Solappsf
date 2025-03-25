import { useEffect, useState } from 'react';

interface JupiterPriceResponse {
  data: {
    So11111111111111111111111111111111111111112: {
      id: string;
      price: string;
      type: string;
    };
  };
  timeTaken: number;
}

export function useSolanaPrice() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as JupiterPriceResponse;
        
        if (data?.data?.So11111111111111111111111111111111111111112?.price) {
          // Конвертируем строку в число
          setPrice(parseFloat(data.data.So11111111111111111111111111111111111111112.price));
        }
      } catch (error) {
        console.error('Error fetching Solana price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);

    return () => clearInterval(interval);
  }, []);

  return { price };
} 