import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useJupiter } from '../hooks/useJupiter';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTokenPrice } from '../hooks/useTokenPrice';

const TOKENS = [
  {
    symbol: 'SOL',
    name: 'Solana',
    address: 'So11111111111111111111111111111111111111112',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png',
    coingeckoId: 'solana'
  },
  {
    symbol: 'SAPPS',
    name: 'SAPPS',
    address: 'Grass7B4RdKfBCjTKgSqnXkqjwiGvQyFbuSCUJr3XXjs',
    decimals: 9,
    logoURI: 'https://i.postimg.cc/GpZL5nJ3/SAPPS.jpg',
    coingeckoId: 'grass'
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png',
    coingeckoId: 'tether'
  },
  {
    symbol: 'BONK',
    name: 'Bonk',
    address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    decimals: 5,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png',
    coingeckoId: 'bonk'
  },
  {
    symbol: 'SAMO',
    name: 'Samoyedcoin',
    address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/logo.png',
    coingeckoId: 'samoyedcoin'
  },
  {
    symbol: 'USDS',
    name: 'USDS',
    address: 'USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/39926/standard/usds.webp?1726666683',
    coingeckoId: 'usds'
  },
  {
    symbol: 'TRUMP',
    name: 'Official Trump',
    address: '6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN/logo.png',
    coingeckoId: 'official-trump'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    coingeckoId: 'usd-coin'
  }
];

export function SwapForm() {
  const { connected } = useWallet();
  const [amount, setAmount] = useState<string>('');
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  
  const { quoteResponse, loading } = useJupiter(
    amount,
    fromToken.address,
    toToken.address,
    fromToken.decimals
  );

  const { data: fromTokenPrice } = useTokenPrice(fromToken.coingeckoId);
  const { data: toTokenPrice } = useTokenPrice(toToken.coingeckoId);

  const formatAmount = (amount: string | number, decimals: number) => {
    if (!amount) return '0.00';
    const value = typeof amount === 'string' ? Number(amount) : amount;
    if (isNaN(value)) return '0.00';
    
    const formatted = (value / Math.pow(10, decimals));
    
    if (formatted >= 1) {
      return formatted.toFixed(2);
    } else {
      return formatted.toFixed(6);
    }
  };

  const getOutputAmount = () => {
    if (!quoteResponse?.outAmount) return '0.00';
    console.log('Raw output amount:', quoteResponse.outAmount);
    console.log('Output token decimals:', toToken.decimals);
    return formatAmount(quoteResponse.outAmount, toToken.decimals);
  };

  // Обновленная функция получения курса обмена
  const getRate = () => {
    if (!quoteResponse?.outAmount || !amount || Number(amount) === 0) return '0.00';
    
    const inputAmount = Number(amount);
    const outputAmount = Number(quoteResponse.outAmount) / Math.pow(10, toToken.decimals);
    
    return (outputAmount / inputAmount).toFixed(6);
  };

  const getFromValueUSD = () => {
    if (!amount || !fromTokenPrice) return '0.00';
    return (Number(amount) * fromTokenPrice).toFixed(2);
  };

  const getToValueUSD = () => {
    if (!quoteResponse || !toTokenPrice) return '0.00';
    const toAmount = Number(quoteResponse.outAmount) / (10 ** toToken.decimals);
    return (toAmount * toTokenPrice).toFixed(2);
  };

  return (
    <div className="w-full bg-background border rounded-xl p-6">
      {/* From секция */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">От</span>
          <div className="text-sm text-right">
            <div className="text-muted-foreground">Баланс: 0.00 {fromToken.symbol}</div>
            <div className="text-muted-foreground">≈ ${getFromValueUSD()}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-muted rounded-lg p-3">
          <Select value={fromToken.symbol} onValueChange={(value) => setFromToken(TOKENS.find(t => t.symbol === value)!)}>
            <SelectTrigger className="w-[140px] h-[48px]">
              <div className="flex items-center gap-2">
                <img 
                  src={fromToken.logoURI} 
                  alt={fromToken.symbol} 
                  className="w-6 h-6 rounded-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png';
                  }}
                />
                <SelectValue>{fromToken.symbol}</SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent>
              {TOKENS.filter(t => t.symbol !== toToken.symbol).map((token) => (
                <SelectItem key={token.symbol} value={token.symbol}>
                  <div className="flex items-center gap-2">
                    <img 
                      src={token.logoURI} 
                      alt={token.symbol} 
                      className="w-6 h-6 rounded-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png';
                      }}
                    />
                    <span>{token.symbol}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex-1">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-none bg-transparent text-xl"
              placeholder="0.00"
            />
            <div className="text-xs text-muted-foreground mt-1">
              1 {fromToken.symbol} = ${fromTokenPrice?.toFixed(2) || '0.00'}
            </div>
          </div>
        </div>
      </div>

      {/* Стрелка и курс обмена */}
      <div className="my-4 flex flex-col items-center gap-2">
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {quoteResponse && (
          <div className="text-sm text-muted-foreground">
            1 {fromToken.symbol} = {formatAmount(quoteResponse.outAmount / (Number(amount) * 10 ** toToken.decimals), 6)} {toToken.symbol}
          </div>
        )}
      </div>

      {/* To секция с улучшенным отображением */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">К получению</span>
          <div className="text-sm text-right">
            <div className="text-foreground">
              {loading ? (
                'Загрузка...'
              ) : quoteResponse ? (
                `${getOutputAmount()} ${toToken.symbol}`
              ) : (
                `0.00 ${toToken.symbol}`
              )}
            </div>
            <div className="text-muted-foreground">≈ ${getToValueUSD()}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-accent/10 rounded-lg p-3">
          <Select value={toToken.symbol} onValueChange={(value) => setToToken(TOKENS.find(t => t.symbol === value)!)}>
            <SelectTrigger className="w-[140px] h-[48px]">
              <div className="flex items-center gap-2">
                <img 
                  src={toToken.logoURI} 
                  alt={toToken.symbol} 
                  className="w-6 h-6 rounded-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png';
                  }}
                />
                <SelectValue>{toToken.symbol}</SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent>
              {TOKENS.filter(t => t.symbol !== fromToken.symbol).map((token) => (
                <SelectItem key={token.symbol} value={token.symbol}>
                  <div className="flex items-center gap-2">
                    <img 
                      src={token.logoURI} 
                      alt={token.symbol} 
                      className="w-6 h-6 rounded-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png';
                      }}
                    />
                    <span>{token.symbol}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex-1">
            <div className="text-xl font-medium">
              {loading ? 'Загрузка...' : getOutputAmount()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {loading ? '' : `≈ ${getRate()} ${toToken.symbol} за 1 ${fromToken.symbol}`}
            </div>
          </div>
        </div>
      </div>

      {/* Детальная информация с обновленным отображением */}
      <div className="mt-4 p-3 bg-accent/10 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Вы отправляете</span>
          <div className="text-right">
            <div>{amount || '0.00'} {fromToken.symbol}</div>
            <div className="text-muted-foreground">≈ ${getFromValueUSD()}</div>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Вы получите</span>
          <div className="text-right">
            <div className="font-medium">
              {loading ? 'Загрузка...' : `${getOutputAmount()} ${toToken.symbol}`}
            </div>
            <div className="text-muted-foreground">≈ ${getToValueUSD()}</div>
          </div>
        </div>
      </div>

      <Button
        className="w-full mt-6"
        size="lg"
        disabled={!connected || !amount || loading}
        onClick={() => {}}
      >
        {!connected 
          ? 'Подключите кошелек'
          : loading 
          ? 'Загрузка...' 
          : 'Обменять'}
      </Button>
    </div>
  );
} 