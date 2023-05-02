import { Reducer, ReducerAction, ReducerState } from "react";
import { PokemonList, UserDB } from "./Types";
import { User } from "firebase/auth";
import { AppInitialState } from "./AppInitialState";

export enum AppActions {
  SET_USER_DATA = "SET_USER_DATA",
  SET_CREDITS = "SET_CREDITS",
  SET_POKE_LIST = "SET_POKE_LIST",
  NEXT_POKEMON = "NEXT_POKEMON",
  CATCH_POKEMON = "CATCH_POKEMON",
  SET_CLICKED_PKBALL = "SET_CLICKED_PKBALL",
  SET_IS_MOBILE = "SET_IS_MOBILE",
  INIT_APP = "INIT_APP",
  SIGNOUT_USER = "SIGNOUT_USER",
}

export interface AppState {
  credits: number;
  pokemonList: PokemonList;
  currPokemon: number;
  ownedPokemons: PokemonList;
  userData: (User & UserDB) | null;
  clickedInitialPokeBall: boolean;
  isMobile: boolean;
}
// An interface for our actions
export interface AppAction {
  type: AppActions;
  payload: any;
}

export const AppReducer: Reducer<AppState, AppAction> = (
  state: AppState,
  action: AppAction
) => {
  const { type, payload } = action;

  switch (type) {
    case "INIT_APP":
      return payload;
    case "SET_USER_DATA":
      return {
        ...state,
        userData: payload.userData,
      };

    case "SET_CREDITS":
      return {
        ...state,
        credits: payload.credits,
      };
    case "SET_POKE_LIST":
      return {
        ...state,
        pokemonList: payload.pokemonList,
      };
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
        ownedPokemons: [...state.ownedPokemons, payload],
      };
    case "SET_CLICKED_PKBALL":
      return {
        ...state,
        clickedInitialPokeBall: true,
      };
    case "SET_IS_MOBILE":
      return {
        ...state,
        isMobile: true,
      };
    case "SIGNOUT_USER":
      return AppInitialState;
    default:
      return state;
  }
};
