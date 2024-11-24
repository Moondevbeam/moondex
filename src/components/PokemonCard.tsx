import { Pokemon } from "./PokemonList";


interface PokemonCardProps {
    pokemon: Pokemon;
    onClick: () => void;
  }
  
  export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => (
    <div 
      className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center relative h-44 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <div className="h-2/3 bg-white"></div>
        <div className="h-1/3 bg-[#EFEFEF] rounded-xl"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center w-full h-full">
        <span className="self-end font-semibold text-[#666666] text-sm">
          #{pokemon.id.toString().padStart(3, '0')}
        </span>
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name}
          className="w-28 h-28 -mt-2"
        />
        <p className="capitalize font-medium text-sm mt-auto">
          {pokemon.name}
        </p>
      </div>
    </div>
  );