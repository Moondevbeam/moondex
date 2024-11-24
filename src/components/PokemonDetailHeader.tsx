import { Link } from "@tanstack/react-router";

interface PokemonDetailHeaderProps {
  name: string;
  id: number;
}

export function PokemonDetailHeader({ name, id }: PokemonDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="bg-white duration-300 hover:shadow-custom-inset rounded-full flex items-center justify-center p-2">
        <Link to="/" className="flex items-center justify-center w-full h-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z"/></svg>
        </Link>
      </div>
      <h1 className="text-2xl font-bold capitalize text-white">
        {name}
      </h1>
      <span className="text-white font-bold text-sm">
        #{id.toString().padStart(3, "0")}
      </span>
    </div>
  );
} 