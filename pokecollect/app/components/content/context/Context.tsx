import { createContext, Dispatch, SetStateAction } from "react";
import { Pokemon, PokemonList } from "../../../utils/Types";
import { Auth, User } from "firebase/auth";

export const SessionContext = createContext<{
  ownedPokemons: PokemonList | [];
  setOwnedPokemons: Dispatch<SetStateAction<PokemonList>>;
  isMobile: boolean;
  inited: boolean;
  // user: User | null | undefined;
}>({
  ownedPokemons: [],
  setOwnedPokemons: () => {},
  isMobile: false,
  inited: false,
  // user: null,
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
