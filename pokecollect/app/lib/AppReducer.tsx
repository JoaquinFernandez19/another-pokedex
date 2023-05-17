import { Reducer } from "react";
import { PokemonList, UserDB } from "./Types";
import { User } from "firebase/auth";
import { AppInitialState } from "./AppInitialState";
import { syncStateDataWithDB } from "./firebase/User";

export enum AppActions {
  SYNC_WITH_DB = "SYNC_WITH_DB",
  NEXT_POKEMON = "NEXT_POKEMON",
  CATCH_POKEMON = "CATCH_POKEMON",
  SET_CLICKED_PKBALL = "SET_CLICKED_PKBALL",
  INIT_APP = "INIT_APP",
  SIGNOUT_USER = "SIGNOUT_USER",
  START_RESET_TIMER = "START_RESET_TIMER",
  SET_CREDITS = "SET_CREDITS",
  SET_POKEMON_COLLECTION = "SET_POKEMON_COLLECTION",
  SET_CURR_POKEMON = "SET_CURR_POKEMON",
  SET_DEVICE = "SET_DEVICE",
  SET_INVENTORY_DISPLAY = "SET_INVENTORY_DISPLAY",
}

export interface AppState {
  credits: number;
  pokemonCollection: PokemonList;
  currPokemon: number;
  ownedPokemons: PokemonList;
  userDataDB: UserDB | null;
  userDataAuth: User | null;
  clickedInitialPokeBall: boolean;
  isMobile: boolean;
  showingInventory: boolean;
  doInitialAnimation: boolean;
}

// An interface for our actions
export interface AppAction {
  type: AppActions;
  payload: any;
}

export const AppReducer: Reducer<AppState, AppAction> = (state: AppState, action: AppAction) => {
  const { type, payload } = action;

  switch (type) {
    case "INIT_APP":
      return payload;
    case "SET_CREDITS":
      return {
        ...state,
        credits: payload.credits,
      };
    case "SET_POKEMON_COLLECTION":
      return {
        ...state,
        pokemonCollection: payload.pokemonCollection,
      };
    case "SET_INVENTORY_DISPLAY":
      return {
        ...state,
        showingInventory: payload.showingInventory,
        doInitialAnimation: false,
      };
    case "SET_CURR_POKEMON":
      return {
        ...state,
        currPokemon: payload.currPokemon,
      };
    case "NEXT_POKEMON":
      if (state.credits > 0) {
        return {
          ...state,
          currPokemon: state.currPokemon + 1,
        };
      }
      return state;
    case "CATCH_POKEMON":
      if (!state.userDataDB) return;

      //In ownPokemons, we add the new pokemon, but if alredy exist, we sum up the amount
      let ownedPokemonsUpdated = [...state.ownedPokemons];
      let alredyCatched = false;
      const catchedPokemonsDBUpdated = state.userDataDB.catched_pokemons.map((poke) => {
        if (poke.pokemon_id === payload.pokemon.id) {
          alredyCatched = true;
          return { ...poke, amount: poke.amount + 1 };
        }
        return poke;
      });
      //If it wasnt catched, we add it to the pokemon list
      //Including the amount :)
      if (!alredyCatched) {
        ownedPokemonsUpdated.push({ ...payload.pokemon, amount: 1 });
        catchedPokemonsDBUpdated.push({
          catch_date: new Date().toISOString(),
          favorite: false,
          pokemon_id: payload.pokemon.id,
          amount: 1,
        });
      } else {
        ownedPokemonsUpdated = state.ownedPokemons.map((poke) => {
          if (poke.id === payload.pokemon.id) return { ...poke, amount: poke.amount + 1 };
          return poke;
        });
      }

      return {
        ...state,
        ownedPokemons: ownedPokemonsUpdated,
        userDataDB: {
          ...state.userDataDB,
          catched_pokemons: catchedPokemonsDBUpdated,
        },
      };
    case "SET_CLICKED_PKBALL":
      return {
        ...state,
        clickedInitialPokeBall: true,
        doInitialAnimation: true,
      };
    case "SET_DEVICE":
      return {
        ...state,
        isMobile: payload.isMobile,
      };
    case "SIGNOUT_USER":
      return AppInitialState;
    case "SYNC_WITH_DB":
      if (!state.userDataDB) return;
      //Executes method will all parameters to update all needed info
      syncStateDataWithDB(
        state.userDataAuth,
        state.credits,
        state.pokemonCollection,
        state.userDataDB.last_reset,
        state.userDataDB.catched_pokemons
      );
      return state;
    case "START_RESET_TIMER":
      return {
        ...state,
        userDataDB: { ...state.userDataDB, last_reset: new Date().toString() },
      };
    default:
      return state;
  }
};
