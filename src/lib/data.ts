
// Mock data for the application

export interface Game {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  coverImage?: string;
  categories: string[];
  status: "live" | "development" | "concept";
  hasNft: boolean;
  hasToken: boolean;
  tokenSymbol?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  tvl?: number;
  monthlyRevenue?: number;
  monthlyActiveUsers?: number;
  nftFloorPrice?: number;
  nftVolume?: number;
}

export interface Token {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  totalSupply: number;
  circulatingSupply: number;
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  related?: string[]; // Project IDs related to this token
}

// Sample game/project data
export const games: Game[] = [
  {
    id: "aurory",
    title: "Aurory",
    description: "A play-to-earn JRPG game with PvE and PvP elements.",
    fullDescription: "Aurory is a Free-to-Play Japanese role-playing game with Play-and-Earn mechanics built on the Solana blockchain. Players dive into an immersive fantasy metaverse where they can collect, train, and battle digital creatures called Nefties. The game features both PvE adventure mode and PvP battle arenas, powered by the AURY token ecosystem.",
    image: "/images/aurory-cover.jpg",
    coverImage: "/images/aurory-cover.png",
    categories: ["RPG", "Adventure", "Play-to-Earn"],
    status: "live",
    hasNft: true,
    hasToken: true,
    tokenSymbol: "AURY",
    website: "https://aurory.io",
    twitter: "https://twitter.com/AuroryProject",
    discord: "https://discord.gg/aurory",
    tvl: 12500000,
    monthlyRevenue: 450000,
    monthlyActiveUsers: 50000,
    nftFloorPrice: 3.2,
    nftVolume: 6500000
  },
  {
    id: "star-atlas",
    title: "Star Atlas",
    description: "A space-themed grand strategy MMO built on Unreal Engine 5.",
    fullDescription: "Star Atlas is a massive multiplayer online game set in a virtual gaming metaverse. The game is being built on Unreal Engine 5, offering AAA-quality visuals and immersive gameplay. In the distant future, three major factions have emerged: the MUD Territory governed by humankind, the ONI Region controlled by a consortium of alien races, and the Ustur Sector dominated by sentient androids.",
    image: "/images/star-banner.png",
    coverImage: "/images/staratlas-cover.jpeg",
    categories: ["MMO", "Strategy", "Space"],
    status: "development",
    hasNft: true,
    hasToken: true,
    tokenSymbol: "ATLAS",
    website: "https://staratlas.com",
    twitter: "https://twitter.com/staratlas",
    discord: "https://discord.gg/staratlas",
    tvl: 75000000,
    monthlyRevenue: 1200000,
    monthlyActiveUsers: 180000,
    nftFloorPrice: 45.8,
    nftVolume: 120000000
  },
  {
    id: "stepn",
    title: "STEPN",
    description: "Move-to-earn lifestyle app with gamification elements.",
    fullDescription: "STEPN is a Web3 lifestyle app with Social-Fi and Game-Fi elements. Users equipped with NFT Sneakers – walk, jog or run outdoors to earn GST, which can be used to level up and mint new Sneakers. Players can choose to lease or sell their NFT Sneakers on the in-app Marketplace; users' GST earnings are stored in the in-app Wallet, which can be used to trade on DEXES.",
    image: "/images/stepn-cover.png",
    coverImage: "/images/stepn-banner.jpeg",
    categories: ["Move-to-Earn", "Fitness", "Lifestyle"],
    status: "live",
    hasNft: true,
    hasToken: true,
    tokenSymbol: "GMT",
    website: "https://stepn.com",
    twitter: "https://twitter.com/Stepnofficial",
    discord: "https://discord.gg/stepn",
    tvl: 25000000,
    monthlyRevenue: 3500000,
    monthlyActiveUsers: 500000,
    nftFloorPrice: 2.1,
    nftVolume: 45000000
  },
  {
    id: "genopets",
    title: "Genopets",
    description: "Free-to-play, move-to-earn NFT game on Solana.",
    image: "images/gene-token.jpg",
    coverImage: "/images/genopets-banner.jpeg",
    categories: ["Move-to-Earn", "RPG", "Pets"],
    status: "development",
    hasNft: true,
    hasToken: true,
    tokenSymbol: "GENE",
    website: "https://genopets.me",
    twitter: "https://twitter.com/genopets",
    discord: "https://discord.gg/genopets",
    tvl: 8500000,
    monthlyRevenue: 320000,
    monthlyActiveUsers: 65000,
    nftFloorPrice: 1.8,
    nftVolume: 3200000
  },
  {
    id: "defi-land",
    title: "DeFi Land",
    description: "Gamified decentralized finance aggregator.",
    image: "images/defiland-cover.jpeg",
    coverImage: "/images/defiland-cover.jpeg",
    categories: ["DeFi", "Farming", "Simulation"],
    status: "live",
    hasNft: true,
    hasToken: true,
    tokenSymbol: "DFL",
    website: "https://defiland.app",
    twitter: "https://twitter.com/DeFi_Land",
    discord: "https://discord.gg/defiland",
    tvl: 5600000,
    monthlyRevenue: 180000,
    monthlyActiveUsers: 42000,
    nftFloorPrice: 0.7,
    nftVolume: 1800000
  },
  {
    id: "ton-shaker",
    title: "Ton Shaker",
    description: "Shake your phone, earn real crypto with TON Shaker! Join the Shakeconomy!",
    image: "/images/tonshaker.jpeg",
    coverImage: "/images/shakercover.avif",
    categories: ["Move-to-Earn", "Fitness", "Play-to-Earn"],
    status: "live",
    hasNft: false,
    hasToken: true,
    tokenSymbol: "TOSH",
    website: "https://tonshaker.com",
    twitter: "https://twitter.com/tonshaker",
    telegram: "https://t.me/tonshakerbot",
    tvl: 5600000,
    monthlyRevenue: 180000,
    monthlyActiveUsers: 42000,
    nftFloorPrice: 0.7, 
    nftVolume: 1800000
  },
  {
    id: "cryowar",
    title: "Cryowar",
    description: "Real-time multiplayer PVP arena combat game.",
    image: "/images/cryo.png",
    coverImage: "/images/cryo-logo.png",
    categories: ["PVP", "Battle", "Action"],
    status: "development",
    hasNft: true,
    hasToken: true,
    tokenSymbol: "CWAR",
    website: "https://cryowar.com",
    twitter: "https://twitter.com/cryowardev",
    discord: "https://discord.gg/cryowar",
    tvl: 3200000,
    monthlyRevenue: 90000,
    monthlyActiveUsers: 28000,
    nftFloorPrice: 0.5,
    nftVolume: 950000
  },
  {
    id: "solchicks",
    title: "SolChicks",
    description: "Play-to-earn fantasy RPG with PvP and PvE battles.",
    image: "/images/sol-logo.jpg",
    coverImage: "/images/sol-banner.jpg",
    categories: ["RPG", "PVP", "Fantasy"],
    status: "development",
    hasNft: true,
    hasToken: true,
    tokenSymbol: "CHICKS",
    website: "https://solchicks.io",
    twitter: "https://twitter.com/SolChicksNFT",
    discord: "https://discord.gg/solchicks",
    tvl: 4100000,
    monthlyRevenue: 150000,
    monthlyActiveUsers: 35000,
    nftFloorPrice: 0.85,
    nftVolume: 2100000
  }
];

// Sample token data
export const tokens: Token[] = [
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    icon: "/images/Solana-logo.png",
    price: 128.45,
    priceChange24h: 5.2,
    marketCap: 54800000000,
    volume24h: 3200000000,
    totalSupply: 569800000,
    circulatingSupply: 424500000,
    description: "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale.",
    website: "https://solana.com",
    twitter: "https://twitter.com/solana",
    telegram: "https://t.me/solana"
  },
  {
    id: "aury",
    name: "Aurory",
    symbol: "AURY",
    icon: "/images/aurory-logo.jpg",
    price: 0.45,
    priceChange24h: -2.8,
    marketCap: 45000000,
    volume24h: 4800000,
    totalSupply: 100000000,
    circulatingSupply: 75000000,
    description: "The utility token of the Aurory gaming ecosystem.",
    website: "https://aurory.io",
    twitter: "https://twitter.com/AuroryProject",
    telegram: "https://t.me/aurory_official",
    related: ["aurory"]
  },
  {
    id: "atlas",
    name: "Star Atlas",
    symbol: "ATLAS",
    icon: "images/staratlas-logo.png",
    price: 0.012,
    priceChange24h: 1.5,
    marketCap: 120000000,
    volume24h: 15000000,
    totalSupply: 36000000000,
    circulatingSupply: 10000000000,
    description: "In-game currency used throughout the Star Atlas metaverse.",
    website: "https://staratlas.com",
    twitter: "https://twitter.com/staratlas",
    telegram: "https://t.me/staratlas",
    related: ["star-atlas"]
  },
  {
    id: "gmt",
    name: "STEPN",
    symbol: "GMT",
    icon: "images/stepn-logo.png",
    price: 0.78,
    priceChange24h: 12.4,
    marketCap: 468000000,
    volume24h: 85000000,
    totalSupply: 6000000000,
    circulatingSupply: 600000000,
    description: "Governance token of the STEPN move-to-earn ecosystem.",
    website: "https://stepn.com",
    twitter: "https://twitter.com/Stepnofficial",
    telegram: "https://t.me/STEPNofficial",
    related: ["stepn"]
  },
  {
    id: "gene",
    name: "Genopets",
    symbol: "GENE",
    icon: "/images//genopets-logo.png",
    price: 0.025,
    priceChange24h: -5.3,
    marketCap: 25000000,
    volume24h: 3500000,
    totalSupply: 1000000000,
    circulatingSupply: 450000000,
    description: "GENE is the governance token for the Genopets ecosystem.",
    website: "https://genopets.me",
    twitter: "https://twitter.com/genopets",
    telegram: "https://t.me/genopets",
    related: ["genopets"]
  },
  {
    id: "dfl",
    name: "DeFi Land",
    symbol: "DFL",
    icon: "/images/defiland-logo.png",
    price: 0.008,
    priceChange24h: 3.1,
    marketCap: 8000000,
    volume24h: 1200000,
    totalSupply: 10000000000,
    circulatingSupply: 1000000000,
    description: "DFL is the governance and utility token for the DeFi Land ecosystem.",
    website: "https://defiland.app",
    twitter: "https://twitter.com/DeFi_Land",
    telegram: "https://t.me/defiland_official",
    related: ["defi-land"]
  },
  {
    id: "orca",
    name: "Orca",
    symbol: "ORCA",
    icon: "/images/orca-logo.png",
    price: 1.24,
    priceChange24h: 4.8,
    marketCap: 248000000,
    volume24h: 42000000,
    totalSupply: 200000000,
    circulatingSupply: 100000000,
    description: "Governance token for Orca, a user-friendly DEX on Solana.",
    website: "https://orca.so",
    twitter: "https://twitter.com/orca_so",
    telegram: "https://t.me/orca_so"
  },
  {
    id: "ray",
    name: "Raydium",
    symbol: "RAY",
    icon: "/images/raydium-logo.png",
    price: 0.85,
    priceChange24h: -1.2,
    marketCap: 170000000,
    volume24h: 28000000,
    totalSupply: 555000000,
    circulatingSupply: 200000000,
    description: "RAY is the governance token for Raydium, an AMM and liquidity provider on Solana.",
    website: "https://raydium.io",
    twitter: "https://twitter.com/RaydiumProtocol",
    telegram: "https://t.me/raydiumprotocol"
  },
  {
    id: "bonk",
    name: "Bonk",
    symbol: "BONK",
    icon: "/images/bonk-logo.png",
    price: 0.00002538,
    priceChange24h: 15.7,
    marketCap: 1520000000,
    volume24h: 125000000,
    totalSupply: 100000000000000,
    circulatingSupply: 59876543210987,
    description: "The first Solana dog coin for the people, by the people.",
    website: "https://bonkcoin.com",
    twitter: "https://twitter.com/bonk_inu",
    telegram: "https://t.me/bonk_inu"
  }
];

// Analytics data
export const analyticsData = {
  totalProjects: 85,
  liveProjects: 42,
  totalUsers: 1850000,
  totalRevenue: 25600000,
  monthlyActiveUsers: 950000,
  monthlyRevenue: 5800000,
  totalNftVolume: 245000000,
  monthlyNftVolume: 28000000,
  topCategories: [
    { name: "Play-to-Earn", value: 32 },
    { name: "RPG", value: 25 },
    { name: "Metaverse", value: 18 },
    { name: "Strategy", value: 15 },
    { name: "Action", value: 12 }
  ],
  monthlyStats: [
    { month: "Jan", users: 650000, revenue: 4200000, nftVolume: 22000000 },
    { month: "Feb", users: 720000, revenue: 4500000, nftVolume: 24000000 },
    { month: "Mar", users: 810000, revenue: 5100000, nftVolume: 25500000 },
    { month: "Apr", users: 880000, revenue: 5400000, nftVolume: 26000000 },
    { month: "May", users: 920000, revenue: 5600000, nftVolume: 27500000 },
    { month: "Jun", users: 950000, revenue: 5800000, nftVolume: 28000000 }
  ]
};

// Helper functions
export function getGameById(id: string): Game | undefined {
  return games.find(game => game.id === id);
}

export function getTokenById(id: string): Token | undefined {
  return tokens.find(token => token.id === id);
}

export function getTokensByGameId(gameId: string): Token[] {
  return tokens.filter(token => token.related?.includes(gameId));
}

export function getGamesByTokenId(tokenId: string): Game[] {
  const token = getTokenById(tokenId);
  if (!token || !token.related) return [];
  return token.related.map(id => getGameById(id)).filter(Boolean) as Game[];
}

export function getGameCategories(): string[] {
  const categories = new Set<string>();
  games.forEach(game => {
    game.categories.forEach(category => {
      categories.add(category);
    });
  });
  return Array.from(categories);
}
