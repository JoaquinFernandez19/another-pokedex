import { createContext, Dispatch, SetStateAction } from "react";
import { Pokemon, PokemonList } from "../Types";

export const isMobileContext = createContext<boolean>(false);
export const UserContext = createContext<{
  userName: string;
  userId: number;
  coins: number;
  ownedPokemons: PokemonList | [];
  setCoins: Dispatch<SetStateAction<number>>;
  setOwnedPokemons: Dispatch<SetStateAction<PokemonList>>;
}>({
  userName: "",
  userId: 1,
  coins: 0,
  ownedPokemons: [],
  setCoins: () => {},
  setOwnedPokemons: () => {},
});
export const CurrentPokemonContext = createContext<Pokemon>({
  name: "",
  id: 0,
  types: [],
  img: "",
  weight: "",
  stars: 0,
  height: "",
  mainType: { slot: 0, type: { name: "none", url: "none" } },
  stats: [],
  value: 0,
});
