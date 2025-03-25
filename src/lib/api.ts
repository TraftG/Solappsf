
/**
 * API service for fetching cryptocurrency data
 */

// Using CoinGecko's free API
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Map our token IDs to CoinGecko IDs
const TOKEN_ID_MAP: Record<string, string> = {
  'solana': 'solana',
  'aury': 'aurory', 
  'atlas': 'star-atlas',
  'gmt': 'stepn',
  'gene': 'gene',
  'dfl': 'defiland',
  'orca': 'orca',
  'ray': 'raydium',
  'bonk': 'bonk'
};

interface CoinGeckoPrice {
  [id: string]: {
    usd: number;
    usd_24h_change: number;
  }
}

export interface TokenPrice {
  id: string;
  price: number;
  priceChange24h: number;
  lastUpdated: Date;
}

/**
 * Fetch current prices for tokens
 */
export async function fetchTokenPrices(): Promise<TokenPrice[]> {
  try {
    // Get all CoinGecko IDs we need
    const coinIds = Object.values(TOKEN_ID_MAP).join(',');
    
    // Fetch price data from CoinGecko
    const response = await fetch(
      `${COINGECKO_API_BASE}/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: CoinGeckoPrice = await response.json();
    const now = new Date();
    
    // Map CoinGecko response to our token format
    return Object.entries(TOKEN_ID_MAP).map(([ourId, geckoId]) => {
      const priceData = data[geckoId];
      
      if (!priceData) {
        console.warn(`No price data found for ${geckoId}`);
        return {
          id: ourId,
          price: 0,
          priceChange24h: 0,
          lastUpdated: now
        };
      }
      
      return {
        id: ourId,
        price: priceData.usd || 0,
        priceChange24h: priceData.usd_24h_change || 0,
        lastUpdated: now
      };
    });
  } catch (error) {
    console.error('Error fetching token prices:', error);
    return [];
  }
}

/**
 * Fetch price data for a specific token
 */
export async function fetchTokenPrice(tokenId: string): Promise<TokenPrice | null> {
  const geckoId = TOKEN_ID_MAP[tokenId];
  
  if (!geckoId) {
    console.warn(`No CoinGecko ID mapping for ${tokenId}`);
    return null;
  }
  
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/simple/price?ids=${geckoId}&vs_currencies=usd&include_24hr_change=true`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: CoinGeckoPrice = await response.json();
    const priceData = data[geckoId];
    
    if (!priceData) {
      throw new Error(`No price data for ${geckoId}`);
    }
    
    return {
      id: tokenId,
      price: priceData.usd || 0,
      priceChange24h: priceData.usd_24h_change || 0,
      lastUpdated: new Date()
    };
  } catch (error) {
    console.error(`Error fetching price for ${tokenId}:`, error);
    return null;
  }
}
