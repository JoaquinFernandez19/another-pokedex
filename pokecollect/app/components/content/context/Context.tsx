import { createContext, Dispatch, SetStateAction } from "react";
import { Pokemon, PokemonList } from "../../../utils/Types";

export const SessionContext = createContext<{
  coins: number;
  ownedPokemons: PokemonList | [];
  setCoins: Dispatch<SetStateAction<number>>;
  setOwnedPokemons: Dispatch<SetStateAction<PokemonList>>;
  isMobile: boolean;
  inited: boolean;
}>({
  coins: 0,
  ownedPokemons: [],
  setCoins: () => {},
  setOwnedPokemons: () => {},
  isMobile: false,
  inited: false,
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
  sm_img: "",
});
