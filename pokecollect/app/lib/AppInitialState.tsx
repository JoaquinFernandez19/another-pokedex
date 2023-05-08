//This file will define the initial fetching and loadings
//AS well as declaring context and all of that
import { fetchPokemons } from "./PokeApiFetching";
import { createContext, Dispatch } from "react";
import { AppAction, AppState } from "./AppReducer";
import { UserInfo } from "firebase/auth";
import { fetchPokemonList } from "./firebase/Pokemons";
import {
  fetchUserInfo,
  registerUserInDB,
  syncStateDataWithDB,
  shouldResetCheck,
} from "./firebase/User";

export const CREDIT_LIMITS = Number(process.env.NEXT_PUBLIC_CREDITS);
export const AppInitialState: AppState = {
  credits: 0,
  pokemonCollection: [],
  currPokemon: 0,
  ownedPokemons: [],
  userDataDB: null,
  userDataAuth: null,
  clickedInitialPokeBall: false,
  isMobile: false,
};
export const SetAppInitialState = async (authUserObject: UserInfo) => {
  let userDataDB = await fetchUserInfo(authUserObject);
  let recentlyRegister = false;
  if (!userDataDB) {
    userDataDB = await registerUserInDB(authUserObject);
    recentlyRegister = true;
  }
  //Get some data needed
  let ownedPokemons = [];
  if (!recentlyRegister) {
    const ownedPokemonsIdList = userDataDB.catched_pokemons.map(
      (poke: { pokemon_id: number }) => String(poke.pokemon_id)
    );
    ownedPokemons = await fetchPokemonList(ownedPokemonsIdList);
  }
  //Fix date type to  correclty execute code, new users will have Date object
  userDataDB.last_reset = recentlyRegister
    ? userDataDB.last_reset
    : userDataDB.last_reset.toDate();
  //Detects if we can re-fetch pokemon list, re add credits and update last reset date
  const shouldReset = shouldResetCheck(
    userDataDB.last_reset,
    userDataDB.credits,
    recentlyRegister
  );

  let credits;
  let pokemonCollection;
  let lastReset;
  if (shouldReset) {
    credits = CREDIT_LIMITS;
    pokemonCollection = await fetchPokemons();
    lastReset = new Date();
    await syncStateDataWithDB(
      authUserObject,
      credits,
      ownedPokemons,
      pokemonCollection,
      lastReset.toString()
    );
  } else {
    credits = userDataDB.credits;
    pokemonCollection = await fetchPokemons(userDataDB.last_pokemon_collection);
  }

  //Setup correctly showing pokemon based on credits and list length
  const currPokemon = pokemonCollection.length - (credits + 1);

  return {
    credits: credits,
    pokemonCollection,
    currPokemon,
    ownedPokemons,
    userDataDB: userDataDB,
    userDataAuth: authUserObject,
    clickedInitialPokeBall: credits < 5,
    isMobile: checkDevice(),
  };
};
export const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
}>({
  state: AppInitialState,
  dispatch: () => {},
});

function checkDevice() {
  const { innerWidth: width } = window;
  return width <= 768;
}
