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

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Search through data from data.js
  const searchResults = query
    ? [
      // Search tokens
      ...tokens
        .filter(token =>
          token.name.toLowerCase().includes(query.toLowerCase()) ||
          token.symbol.toLowerCase().includes(query.toLowerCase()) ||
          (token.description && token.description.toLowerCase().includes(query.toLowerCase()))
        )
        .map(token => ({
          id: token.id,
          type: 'token',
          name: token.name,
          symbol: token.symbol,
          description: token.description || '',
          image: token.icon,
          route: `/tokens/${token.id}`,
        })),
      // Search games
      ...games
        .filter(game =>
          game.title.toLowerCase().includes(query.toLowerCase()) ||
          (game.description && game.description.toLowerCase().includes(query.toLowerCase())) ||
          (game.categories && game.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase())))
        )
        .map(game => ({
          id: game.id,
          type: 'game',
          name: game.title,
          description: game.description,
          image: game.image,
          route: `/games/${game.id}`,
        }))
    ]
    : [
      {
        id: "solana",
        type: 'game',
        name: 'solanas',
        description: 'ffff',
        image: "",
        route: `/games/ffff`,
      }
    ];

  searchResults.push({
    id: "solana1",
    type: 'game',
    name: 'solanas2',
    description: 'ffff3',
    image: "",
    route: `/games/ffff4`,
  });

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

      </CommandDialog>
    </>
  );
}