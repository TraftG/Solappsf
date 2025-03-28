import { useState, useEffect, useMemo } from 'react';
import { Input } from './ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { games, tokens } from '@/lib/data';

type TokenSearchResult = {
  id: string;
  type: 'token';
  name: string;
  symbol: string;
  description: string;
  image: string;
  route: string;
};

type GameSearchResult = {
  id: string;
  type: 'game';
  name: string;
  description: string;
  image: string;
  route: string;
};

type SearchResult = TokenSearchResult | GameSearchResult;

export function Search() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const searchResults = useMemo(() => {
    if (!debouncedQuery) return [];
    const searchTerm = debouncedQuery.toLowerCase().trim();

    const tokenResults = tokens
      .filter(token =>
        token.name.toLowerCase().includes(searchTerm) ||
        token.symbol.toLowerCase().includes(searchTerm) ||
        (token.description && token.description.toLowerCase().includes(searchTerm))
      )
      .map(token => ({
        id: token.id,
        type: 'token' as const,
        name: token.name,
        symbol: token.symbol,
        description: token.description || '',
        image: token.icon,
        route: `/tokens/${token.id}`,
      }));

    const gameResults = games
      .filter(game =>
        game.title.toLowerCase().includes(searchTerm) ||
        (game.description && game.description.toLowerCase().includes(searchTerm)) ||
        (game.categories && game.categories.some(cat => cat.toLowerCase().includes(searchTerm)))
      )
      .map(game => ({
        id: game.id,
        type: 'game' as const,
        name: game.title,
        description: game.description,
        image: game.image,
        route: `/projects/${game.id}`,
      }));

    return [...tokenResults, ...gameResults];
  }, [debouncedQuery]);

  const handleSelect = (route: string) => {
    navigate(route);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center border rounded-lg p-2 w-full">
        <SearchIcon className="mr-2 h-4 w-4" />
        <Input
          placeholder="Поиск токенов, игр..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none"
        />
      </div>
      {searchResults.length > 0 && (
        <div className="absolute w-full mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-300">
          {searchResults.map(result => (
            <div
              key={result.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all"
              onClick={() => handleSelect(result.route)}
            >
              {result.image && (
                <img src={result.image} alt={result.name} className="w-8 h-8 rounded-md" />
              )}
              <div>
                <div className="font-semibold text-gray-800 dark:text-gray-200">{result.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{result.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
