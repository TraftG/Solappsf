import { useEffect, useState } from 'react';

// Маппинг фиксированных цен для токенов, которые не правильно отображаются через CoinGecko
const FIXED_PRICES: Record<string, number> = {
  'fartcoin-sol': 0.5267,
  // Можно добавить другие токены при необходимости
};

export function useTokenPrice(coingeckoId: string) {
  const [data, setData] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      // Если есть фиксированная цена, используем её
      if (FIXED_PRICES[coingeckoId]) {
        setData(FIXED_PRICES[coingeckoId]);
        return;
      }

      if (!coingeckoId) return;

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch price');
        }

        const data = await response.json();
        if (data[coingeckoId]?.usd) {
          setData(data[coingeckoId].usd);
        } else {
          console.warn(`Price not found for ${coingeckoId}`);
          // Проверяем есть ли фиксированная цена как запасной вариант
          setData(FIXED_PRICES[coingeckoId] || null);
        }
      } catch (error) {
        console.error('Error fetching token price:', error);
        // При ошибке тоже проверяем фиксированную цену
        setData(FIXED_PRICES[coingeckoId] || null);
      }
    }

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);

    return () => clearInterval(interval);
  }, [coingeckoId]);

  return { data };
} 