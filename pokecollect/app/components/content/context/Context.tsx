import { createContext, Dispatch, SetStateAction } from "react";
import { Pokemon, PokemonList } from "../../../utils/Types";

interface UserData {
  id: number;
  name: string;
  ranking: number;
  starting_date: string;
}

export const SessionContext = createContext<{
  ownedPokemons: PokemonList | [];

  setOwnedPokemons: Dispatch<SetStateAction<PokemonList>>;
  isMobile: boolean;
  inited: boolean;
  user: UserData;
}>({
  ownedPokemons: [],

  setOwnedPokemons: () => {},
  isMobile: false,
  inited: false,
  user: {
    id: 0,
    name: "",
    ranking: 0,
    starting_date: "",
  },
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
