export interface Pokemon {
  name: string;
  id: number;
  types: PokemonTypeList;
  img: string;
  weight: string;
  height: string;
  mainType: PokemonType;
  stats: Stat[];
  color?: string | undefined;
}

export interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface Stat {
  name: string;
  value: number;
}

export type PokemonList = Pokemon[];
export type PokemonTypeList = PokemonType[];
