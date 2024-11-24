import { useQuery } from '@tanstack/react-query';
import { getPokemonDetails, getPokemonList, getPokemonSpecies } from '../api/pokeapi.services';

export function usePokemonDetailsQuery(pokemonName: string | undefined) {
  const { data: pokemon, isLoading: isLoadingPokemon, error: pokemonError } = 
    useQuery({
      queryKey: ['pokemon', pokemonName],
      queryFn: () => getPokemonDetails(pokemonName!),
      enabled: !!pokemonName
    });

  const { data: species, isLoading: isLoadingSpecies, error: speciesError } = 
    useQuery({
      queryKey: ['species', pokemon?.id],
      queryFn: () => getPokemonSpecies(pokemon!.id),
      enabled: !!pokemon
    });

  return {
    pokemon,
    species,
    isLoading: isLoadingPokemon || isLoadingSpecies,
    error: pokemonError || speciesError
  };
}

export function usePokemonListQuery() {
  return useQuery({
    queryKey: ['pokemonList'],
    queryFn: async () => {
      const data = await getPokemonList(151, 0);
      const pokemonList = await Promise.all(
        data.results.map((pokemon: { name: string }) =>
          getPokemonDetails(pokemon.name)
        )
      );
      return pokemonList;
    }
  });
} 