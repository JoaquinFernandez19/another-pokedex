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
  amount: number;
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
  catched_pokemons: CatchedPokemon[];
  credits: number;
  date_started: string;
  id: string;
  last_pokemon_collection: [];
  last_reset: string;
  name: string;
  rank: number;
}
export type CatchedPokemon = {
  catch_date: string;
  favorite: boolean;
  pokemon_id: number;
  amount: number;
};

export type StateDataToUpdateType = {
  credits?: number;
  catched_pokemons?: {
    favorite: boolean;
    pokemon_id: number;
    catch_date: string;
  }[];
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
