import { useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";
import { PokemonCard } from "./PokemonCard";
import { usePokemonStore } from '../store/pokemonStore';
import { PokemonCardSkeleton } from './PokemonCardSkeleton';
import { usePokemonListQuery } from '../hooks/usePokemonQuery';

export function PokemonList() {
  const navigate = useNavigate();
  const { 
    searchTerm, 
    setSearchTerm, 
    showOnlyFavorites, 
    setShowOnlyFavorites,
    isFavorite,
  } = usePokemonStore();

  const { data: pokemonList, isLoading, error } = usePokemonListQuery();

  const filteredPokemon = useMemo(() => {
    if (!pokemonList) return [];
    return pokemonList.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      if (showOnlyFavorites) {
        return matchesSearch && isFavorite(pokemon.id);
      }
      return matchesSearch;
    });
  }, [pokemonList, searchTerm, showOnlyFavorites, isFavorite]);

  return (
    <div className="bg-pokedex-red min-h-screen">
      <Header title={"Pokèdex"} />
      <div className="px-2 space-y-2">
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm}
          showOnlyFavorites={showOnlyFavorites}
          onFavoritesChange={setShowOnlyFavorites}
        />
      </div>
      <div className="px-1">
        <div className="p-2 mt-4 h-[calc(100vh-106px)] bg-white rounded-xl overflow-auto">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
              {[...Array(12)].map((_, index) => (
                <PokemonCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-pokedex-red">Errore nel caricamento dei Pokemon: {error.message}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
              {filteredPokemon.map((poke) => (
                <PokemonCard 
                  key={poke.id} 
                  pokemon={poke} 
                  onClick={() => navigate({
                    to: '/pokemon/$pokemonName',
                    params: { pokemonName: poke.name }
                  })}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 