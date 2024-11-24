import { useParams} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails, getPokemonSpecies } from "../api/pokeapi.services";
import { Header } from "./Header";
import { PokemonType } from "./PokemonType";
import { PokemonStats } from "./PokemonStats";
import { TYPE_COLORS } from "../constants/pokemonTypes";
import { PokemonAbout } from "./PokemonAbout";
import { PokemonDetailHeader } from "./PokemonDetailHeader";

interface PokemonDetails {
  name: string;
  id: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  weight: number;
  height: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

interface PokemonSpecies {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}

export function PokemonDetail() {
  const { pokemonName } = useParams({ from: "/pokemon/$pokemonName" });

  const { data: pokemon, isLoading: isLoadingPokemon } =
    useQuery<PokemonDetails>({
      queryKey: ["pokemon", pokemonName],
      queryFn: () => getPokemonDetails(pokemonName),
    });

  const { data: species, isLoading: isLoadingSpecies } =
    useQuery<PokemonSpecies>({
      queryKey: ["pokemon-species", pokemon?.id],
      queryFn: () => getPokemonSpecies(pokemon?.id || ""),
      enabled: !!pokemon,
    });

  if (isLoadingPokemon || isLoadingSpecies || !pokemon || !species)
    return <div>Caricamento...</div>;

  const description =
    species.flavor_text_entries
      .find((entry) => entry.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ") || "";

  const mainType = pokemon.types[0].type.name;
  const typeColor =
    TYPE_COLORS[mainType as keyof typeof TYPE_COLORS] || "#74CB48";

  return (
    <div className="bg-[#DC0A2D] p-1">
      <Header title={"Pokédex"} />

      <div className="bg-[#74CB48] rounded-xl p-4 relative ">
        <PokemonDetailHeader name={pokemon.name} id={pokemon.id} />

        <div className="relative">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-56 h-56 absolute left-1/2 -translate-x-1/2 -top-16 z-10 mt-2"
          />
        </div>

        <div className="bg-white rounded-3xl p-8 mt-32">
          <div className="flex justify-center gap-4 mb-2 mt-12">
            {pokemon.types.map(({ type }) => (
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
