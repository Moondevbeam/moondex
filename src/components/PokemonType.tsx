import { TYPE_COLORS } from "../constants/pokemonTypes";

interface PokemonTypeProps {
  type: string;
}



export function PokemonType({ type }: PokemonTypeProps) {
  return (
    <span 
      className="px-4 py-1 rounded-full capitalize text-white font-bold"
      style={{ backgroundColor: TYPE_COLORS[type as keyof typeof TYPE_COLORS] || '#777' }}
    >
      {type}
    </span>
  );
} 
