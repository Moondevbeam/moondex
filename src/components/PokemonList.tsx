import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { getPokemonList, getPokemonDetails } from "../api/pokeapi.services";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";
import { PokemonCard } from "./PokemonCard";

export interface Pokemon {
    name: string;
    id: number;
    sprites: {
      front_default: string;
      other: {
        "official-artwork": {
          front_default: string;
        };
      };
    };
    types: {
      type: {
        name: string;
      };
    }[];
  }

export function PokemonList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ['pokemon'],
    queryFn: async () => {
      const data = await getPokemonList(151, 0);
      return Promise.all(
        data.results.map((pokemon: { name: string }) =>
          getPokemonDetails(pokemon.name)
        )
      );
    }
  });

  const filteredPokemon = pokemon?.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? [];

  return (
    <div className="bg-[#DC0A2D] min-h-screen">
      <Header title={"Pokèdex"} />
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <div className="px-1">
        <div className="p-2 mt-4 h-[calc(100vh-106px)] bg-white rounded-xl overflow-auto">
          {isLoading ? (
            <p className="text-center">Caricamento in corso...</p>
          ) : error ? (
            <p className="text-center text-red-500">Errore nel caricamento dei Pokemon: {error.message}</p>
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