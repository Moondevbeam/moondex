export type PokemonType = 
  | 'normal' 
  | 'fire' 
  | 'water' 
  | 'electric' 
  | 'grass' 
  | 'ice' 
  | 'fighting' 
  | 'poison' 
  | 'ground' 
  | 'flying' 
  | 'psychic' 
  | 'bug' 
  | 'rock' 
  | 'ghost' 
  | 'dragon' 
  | 'dark' 
  | 'steel' 
  | 'fairy';

export type TypeColors = Record<PokemonType, string>;

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

export interface PokemonSpecies {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}

export interface PokemonListResponse {
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonStatsProps {
  stats: Stat[];
  color: string;
}

export type PokemonResponse = {
  results: Array<{
    name: string
    url: string
  }>
}

export type SafePokemon = Omit<Pokemon, 'sprites'> & {
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
}

export interface PokemonTypeData {
  type: {
    name: string;
  };
}