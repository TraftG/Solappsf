import { useCallback, useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';

interface QuoteResponse {
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  priceImpactPct: number;
}

export function useJupiter(inputAmount: string, inputMint: string, outputMint: string, inputDecimals: number) {
  const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const getQuote = useCallback(async () => {
    if (!inputAmount || !inputMint || !outputMint || isNaN(Number(inputAmount))) {
      setQuoteResponse(null);
      return;
    }
    
    try {
      setLoading(true);
      // Конвертируем введенную сумму в минимальные единицы с учетом decimals токена
      const amount = Math.floor(Number(inputAmount) * Math.pow(10, inputDecimals)).toString();
      
      const response = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}` +
        `&outputMint=${outputMint}` +
        `&amount=${amount}` +
        `&slippageBps=50` +
        `&onlyDirectRoutes=true`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }

      const data = await response.json();
      console.log('Quote response:', data); // Для отладки
      setQuoteResponse(data);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuoteResponse(null);
    } finally {
      setLoading(false);
    }
  }, [inputAmount, inputMint, outputMint, inputDecimals]);

  useEffect(() => {
    getQuote();
  }, [getQuote]);

  const executeSwap = useCallback(async () => {
    if (!quoteResponse) return;
    
    try {
      setLoading(true);
      // Здесь будет логика выполнения свапа через Jupiter API
      // 1. Получить транзакцию от API
      // 2. Подписать транзакцию
      // 3. Отправить транзакцию
    } catch (error) {
      console.error('Ошибка при выполнении свапа:', error);
    } finally {
      setLoading(false);
    }
  }, [quoteResponse]);

  return {
    quoteResponse,
    loading,
    executeSwap,
    getQuote
  };
} 