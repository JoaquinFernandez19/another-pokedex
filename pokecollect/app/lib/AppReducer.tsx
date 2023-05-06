import { Reducer, ReducerAction, ReducerState } from "react";
import { PokemonList, UserDB } from "./Types";
import { User } from "firebase/auth";
import { AppInitialState } from "./AppInitialState";
import { catchPokemonDB } from "./firebase/Pokemons";
import { syncStateDataWithDB } from "./firebase/User";

export enum AppActions {
  SYNC_WITH_DB = "SYNC_WITH_DB",
  NEXT_POKEMON = "NEXT_POKEMON",
  CATCH_POKEMON = "CATCH_POKEMON",
  SET_CLICKED_PKBALL = "SET_CLICKED_PKBALL",
  INIT_APP = "INIT_APP",
  SIGNOUT_USER = "SIGNOUT_USER",
  START_RESET_TIMER = "START_RESET_TIMER",
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
    case "NEXT_POKEMON":
      if (state.credits > 0) {
        return {
          ...state,
          currPokemon: state.currPokemon + 1,
          credits: state.credits - 1,
        };
      }
      return state;
    case "CATCH_POKEMON":
      return {
        ...state,
        ownedPokemons: [...state.ownedPokemons, payload.pokemon],
      };
    case "SET_CLICKED_PKBALL":
      return {
        ...state,
        clickedInitialPokeBall: true,
      };
    case "SIGNOUT_USER":
      return AppInitialState;
    case "SYNC_WITH_DB":
      //Executes method will all parameters to update all needed info
      syncStateDataWithDB(
        state.userDataAuth,
        state.credits,
        state.ownedPokemons,
        state.pokemonCollection,
        state.userDataDB?.last_reset
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
