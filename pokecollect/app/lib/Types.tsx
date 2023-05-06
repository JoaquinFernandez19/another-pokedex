import { User } from "@firebase/auth";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface Pokemon {
  name: string;
  id: number;
  types: PokemonTypeList;
  img: string;
  weight: string;
  height: string;
  mainType: PokemonType;
  stats: Stat[];
  stars: number;
  color?: string | undefined;
  value: number;
  sm_img: string;
}

export interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface Stat {
  name: string;
  value: number;
}

export interface UserInfoLocal {
  userSnapData?: DocumentData;
  userSnap?: QueryDocumentSnapshot<DocumentData>;
  error?: unknown;
}
export interface UserDB {
  catchedPokemons: CatchedPokemon[];
  credits: number;
  date_started: string;
  id: string;
  last_pokemon_collection: [];
  last_reset: string;
  name: string;
  rank: number;
}
type CatchedPokemon = {
  catch_date: string;
  favorite: boolean;
  pokemon_id: number;
};

export type StateDataToUpdateType = {
  credits?: number;
  catchedPokemons?: number[];
  last_pokemon_collection?: number[];
  last_reset?: Date;
};

export type PokemonList = Pokemon[];
export type PokemonTypeList = PokemonType[];

export interface FrontSprite {
  other: { "official-artwork": { front_default: string } };
  front_default: string;
}

export type PhysicalInfo = number | null;
