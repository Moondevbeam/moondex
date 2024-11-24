import { useParams } from "@tanstack/react-router";
import { Header } from "./Header";
import { PokemonType } from "./PokemonType";
import { PokemonStats } from "./PokemonStats";
import { TYPE_COLORS } from "../constants/pokemonTypes";
import { PokemonAbout } from "./PokemonAbout";
import { PokemonDetailHeader } from "./PokemonDetailHeader";
import { LoadingSpinner } from "./LoadingSpinner";
import { usePokemonDetailsQuery } from "../hooks/usePokemonQuery";
import { PokemonSpecies } from '../types/pokemon';
import { PokemonTypeData } from '../types/pokemon';

export function PokemonDetail() {
  const { pokemonName } = useParams({ from: "/pokemon/$pokemonName" });
  
  const { 
    pokemon, 
    species,
    isLoading, 
    error 
  } = usePokemonDetailsQuery(pokemonName);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Errore: {error instanceof Error ? error.message : 'Errore sconosciuto'}</div>;
  if (!pokemon || !species) return null;

  const description = (species.flavor_text_entries as PokemonSpecies['flavor_text_entries'])
    .find((entry) => entry.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ") || "";

  const mainType = pokemon.types[0].type.name;
  const typeColor = TYPE_COLORS[mainType as keyof typeof TYPE_COLORS] || "#74CB48";

  return (
    <div className="bg-pokedex-red p-2">
      <Header title={"Pokédex"} />
      <div className=" bg-pokedex-green rounded-xl p-4 min-h-screen relative ">
        <PokemonDetailHeader name={pokemon.name} id={pokemon.id} pokemon={pokemon} />


        <div className="relative">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-56 h-56 absolute left-1/2 -translate-x-1/2 -top-16 z-10 mt-2"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 mt-32">
          <div className="flex justify-center gap-4 mb-2 mt-12">
            {pokemon.types.map((typeData: PokemonTypeData) => (
              <PokemonType key={typeData.type.name} type={typeData.type.name} />
            ))}
          </div>

          <h2
            style={{ color: typeColor }}
            className="text-2xl font-bold text-center py-2"
          >
            About
          </h2>

          <PokemonAbout
            weight={pokemon.weight}
            height={pokemon.height}
            abilities={pokemon.abilities}
          />

          <p className="text-left font-medium w-full mb-2 pt-4 text-sm h-20">
            {description}
          </p>

          <PokemonStats stats={pokemon.stats} color={typeColor} />
        </div>
      </div>
    </div>
  );
}
