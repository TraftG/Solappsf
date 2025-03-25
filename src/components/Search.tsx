import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search as SearchIcon } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { useNavigate } from 'react-router-dom';
import { games, tokens } from '@/lib/data';

interface SearchResult {
  id: string;
  type: 'token' | 'game';
  name: string;
  symbol?: string;
  description: string;
  image?: string;
  route: string;
}

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Поиск по данным из data.ts
  const searchResults: SearchResult[] = query
    ? [
        // Поиск по токенам
        ...tokens
          .filter(token => 
            token.name.toLowerCase().includes(query.toLowerCase()) ||
            token.symbol.toLowerCase().includes(query.toLowerCase()) ||
            token.description.toLowerCase().includes(query.toLowerCase())
          )
          .map(token => ({
            id: token.id,
            type: 'token' as const,
            name: token.name,
            symbol: token.symbol,
            description: token.description || '',
            image: token.icon,
            route: `/tokens/${token.id}`,
          })),
        // Поиск по играм
        ...games
          .filter(game =>
            game.title.toLowerCase().includes(query.toLowerCase()) ||
            game.description.toLowerCase().includes(query.toLowerCase()) ||
            game.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
          )
          .map(game => ({
            id: game.id,
            type: 'game' as const,
            name: game.title,
            description: game.description,
            image: game.image,
            route: `/games/${game.id}`,
          }))
      ]
    : [];

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        <span>Поиск...</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Поиск токенов, игр..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>Ничего не найдено.</CommandEmpty>
          {query && (
            <>
              <CommandGroup heading="Токены">
                {searchResults
                  .filter(result => result.type === 'token')
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => {
                        navigate(result.route);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {result.image && (
                          <img 
                            src={result.image} 
                            alt={result.name} 
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <div>
                          <div className="font-medium">
                            {result.name} {result.symbol && `(${result.symbol})`}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {result.description}
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>

              <CommandGroup heading="Игры">
                {searchResults
                  .filter(result => result.type === 'game')
                  .map(result => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => {
                        navigate(result.route);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {result.image && (
                          <img 
                            src={result.image} 
                            alt={result.name} 
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <div>
                          <div className="font-medium">{result.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {result.description}
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
} 