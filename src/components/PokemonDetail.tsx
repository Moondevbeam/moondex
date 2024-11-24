import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { getPokemonDetails, getPokemonSpecies } from "../api/pokeapi.services";
import { usePokemonStore } from '../store/pokemonStore';
import { Header } from "./Header";
import { PokemonType } from "./PokemonType";
import { PokemonStats } from "./PokemonStats";
import { TYPE_COLORS } from "../constants/pokemonTypes";
import { PokemonAbout } from "./PokemonAbout";
import { PokemonDetailHeader } from "./PokemonDetailHeader";
import { LoadingSpinner } from "./LoadingSpinner";

export function PokemonDetail() {
  const { pokemonName } = useParams({ from: "/pokemon/$pokemonName" });
  const { 
    selectedPokemon,
    pokemonSpecies,
    isLoading,
    error,
    setSelectedPokemon,
    setPokemonSpecies,
    setIsLoading,
    setError 
  } = usePokemonStore();

  useEffect(() => {
    const fetchPokemonData = async () => {
      setIsLoading(true);
      try {
        const pokemon = await getPokemonDetails(pokemonName);
        setSelectedPokemon(pokemon);
        const species = await getPokemonSpecies(pokemon.id);
        setPokemonSpecies(species);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Si è verificato un errore');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonData();
    
    return () => {
      setSelectedPokemon(null);
      setPokemonSpecies(null);
      setError(null);
    };
  }, [pokemonName]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Errore: {error}</div>;
  if (!selectedPokemon || !pokemonSpecies) return null;

  const description = pokemonSpecies.flavor_text_entries
    .find((entry) => entry.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ") || "";

  const mainType = selectedPokemon.types[0].type.name;
  const typeColor = TYPE_COLORS[mainType as keyof typeof TYPE_COLORS] || "#74CB48";

  return (
    <div className="bg-pokedex-red p-1 min-h-screen">
      <Header title={"Pokédex"} />
      <div className=" bg-pokedex-green rounded-xl p-4 h-[calc(100vh-55px)] relative ">
        <PokemonDetailHeader name={selectedPokemon.name} id={selectedPokemon.id} pokemon={selectedPokemon} />


        <div className="relative">
          <img
            src={selectedPokemon.sprites.other["official-artwork"].front_default}
            alt={selectedPokemon.name}
            className="w-56 h-56 absolute left-1/2 -translate-x-1/2 -top-16 z-10 mt-2"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 mt-32">
          <div className="flex justify-center gap-4 mb-2 mt-12">
            {selectedPokemon.types.map(({ type }) => (
              <PokemonType key={type.name} type={type.name} />
            ))}
          </div>

          <h2
            style={{ color: typeColor }}
            className="text-2xl font-bold text-center py-2"
          >
            About
          </h2>

          <PokemonAbout
            weight={selectedPokemon.weight}
            height={selectedPokemon.height}
            abilities={selectedPokemon.abilities}
          />

          <p className="text-left font-medium w-full mb-2 pt-4 text-sm h-20">
            {description}
          </p>

          <PokemonStats stats={selectedPokemon.stats} color={typeColor} />
        </div>
      </div>
    </div>
  );
}
