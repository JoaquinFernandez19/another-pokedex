export interface Pokemon {
  name: string;
  id: Number;
  types: PokemonTypeList;
  img: URL;
  weight: Number;
  height: Number;
  mainType: PokemonType;
  stats: Stat[];
}

export interface PokemonType {
  name: string;
  img: URL;
  color: string;
}

export interface Stat {
  name: string;
  value: Number;
}

export type PokemonList = Pokemon[];
export type PokemonTypeList = PokemonType[];
