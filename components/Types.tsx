export interface Pokemon {
  name: string;
  id: Number;
  types: PokemonTypeList;
  img: string;
  weight: Number;
  height: Number;
  mainType: PokemonType;
  stats: Stat[];
}

export interface PokemonType {
  slot: Number;
  type: { name: string; url: string }[];
}

export interface Stat {
  name: string;
  value: Number;
}

export type PokemonList = Pokemon[];
export type PokemonTypeList = PokemonType[];
