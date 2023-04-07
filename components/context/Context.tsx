import { createContext, Dispatch, SetStateAction } from "react";
import { PokemonList } from "../Types";



export const isMobileContext  = createContext<boolean>(false);
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